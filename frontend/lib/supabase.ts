import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://rghnpixkvwstdnqulhef.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnaG5waXhrdndzdGRucXVsaGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NzIxNTYsImV4cCI6MjA5NDI0ODE1Nn0.3iAaVnJGuu_Fg_odN41Sxf7OtC1NnT0qUTQ7T0NkBFI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  email: string
  full_name: string
  created_at: string
}

export type TestResult = {
  id?: string
  user_id: string
  vark_scores: { visual: number; auditory: number; reading: number; kinesthetic: number }
  dominant_style: string
  created_at?: string
}

export type CourseProgress = {
  id?: string
  user_id: string
  course_id: string
  completed_lessons: string[]
  quiz_scores: Record<string, number>
  total_time_minutes: number
  updated_at?: string
}

export type Cohort = {
  id: string
  instructor_id: string
  name: string
  file_path?: string
  created_at: string
}

export type AttendanceSession = {
  id?: string
  cohort_id: string
  session_date: string
  records: Record<string, boolean>
  present_count: number
  total: number
}
