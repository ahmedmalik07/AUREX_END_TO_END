-- ============================================================
-- AtomCamp Smart LMS — Supabase Schema
-- Run this entire file in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ─── PROFILES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id           UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email        TEXT NOT NULL,
  full_name    TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles: select own"  ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles: insert own"  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles: update own"  ON profiles FOR UPDATE USING (auth.uid() = id);

-- ─── TEST RESULTS (VARK) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS test_results (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  vark_scores     JSONB NOT NULL,
  dominant_style  TEXT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "test_results: select own"  ON test_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "test_results: insert own"  ON test_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ─── COURSE PROGRESS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS course_progress (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id              UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id            TEXT NOT NULL,
  completed_lessons    TEXT[]   DEFAULT '{}',
  quiz_scores          JSONB    DEFAULT '{}',
  total_time_minutes   INTEGER  DEFAULT 0,
  updated_at           TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, course_id)
);

ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "course_progress: select own"  ON course_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "course_progress: insert own"  ON course_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "course_progress: update own"  ON course_progress FOR UPDATE USING (auth.uid() = user_id);

-- ─── AUTO-CREATE PROFILE ON SIGNUP ───────────────────────────
-- This function runs automatically whenever a user signs up,
-- so the profile row always exists even if the frontend insert fails.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── INSTRUCTOR: COHORTS ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.cohorts (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  instructor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name          TEXT DEFAULT 'My Cohort',
  file_path     TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cohorts: instructor owns" ON public.cohorts
  FOR ALL USING (auth.uid() = instructor_id);

-- ─── INSTRUCTOR: COHORT STUDENTS ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.cohort_students (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cohort_id    UUID REFERENCES public.cohorts(id) ON DELETE CASCADE NOT NULL,
  student_data JSONB NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cohort_students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cohort_students: owner only" ON public.cohort_students
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.cohorts WHERE id = cohort_id AND instructor_id = auth.uid())
  );

-- ─── INSTRUCTOR: ATTENDANCE SESSIONS ─────────────────────────
CREATE TABLE IF NOT EXISTS public.attendance_sessions (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cohort_id     UUID REFERENCES public.cohorts(id) ON DELETE CASCADE NOT NULL,
  session_date  DATE NOT NULL,
  records       JSONB NOT NULL,
  present_count INT NOT NULL,
  total         INT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (cohort_id, session_date)
);

ALTER TABLE public.attendance_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "attendance: owner only" ON public.attendance_sessions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.cohorts WHERE id = cohort_id AND instructor_id = auth.uid())
  );
