export type Lang = "en" | "ur"

export const STRINGS: Record<string, Record<Lang, string>> = {
  /* Navbar */
  nav_learner:     { en: "Learner",           ur: "Talib-e-Ilm" },
  nav_course:      { en: "Course",            ur: "Course" },
  nav_instructor:  { en: "Instructor",        ur: "Ustaad" },
  nav_alumni:      { en: "Alumni",            ur: "Faarig" },
  nav_signin:      { en: "Sign In",           ur: "Login Karein" },

  /* Homepage hero */
  hero_badge:      { en: "AUREX AI 2026 Showcase", ur: "AUREX AI 2026 Showcase" },
  hero_h1_line1:   { en: "Learning That Adapts",   ur: "Seekhna Jo Dhalta Hai" },
  hero_h1_line2:   { en: "To Every Mind",           ur: "Har Zehan Ke Liye" },
  hero_subtitle:   { en: "An intelligent LMS that personalizes curricula based on cognitive profiles and predicts at-risk students before they fall behind.", ur: "Ek zahen mand LMS jo cognitive profiles ke mutabiq curriculum tayyar karta hai aur khatre mein pare students ko pehle hi pehchan leta hai." },
  hero_start:      { en: "Start Onboarding",        ur: "Shuru Karein" },
  hero_dashboard:  { en: "Instructor Dashboard",    ur: "Ustaad Dashboard" },

  /* Features */
  features_heading: { en: "Built for Real Impact",  ur: "Haqeeqi Asar Ke Liye Bana" },
  features_sub:     { en: "Not just another EdTech demo. Every feature solves a real problem atomcamp instructors face daily.", ur: "Sirf ek demo nahin. Har feature atomcamp ke rozmarra masail hal karta hai." },
  feat_cognitive:   { en: "Cognitive Profiling",    ur: "Zehan Ki Pehchaan" },
  feat_paths:       { en: "Hyper-Personalized Paths", ur: "Aapke Liye Khas Raah" },
  feat_risk:        { en: "Risk Prediction",         ur: "Khatre Ki Pesh-Goi" },
  feat_offline:     { en: "Offline-First ML",        ur: "Internet Ke Baghair ML" },

  /* Stats */
  stat_learners:    { en: "Learners Trained",  ur: "Talaba Tarbiyat Yafta" },
  stat_women:       { en: "Women in Tech",     ur: "Tech Mein Khawateen" },
  stat_graduation:  { en: "Graduation Rate",   ur: "Faraaghat Ki Shorah" },
  stat_cohorts:     { en: "Cohorts Completed", ur: "Batch Mukammal" },

  /* Two Paths section */
  paths_heading:   { en: "Choose Your Portal",         ur: "Apna Darwaza Chunein" },
  paths_sub:       { en: "Two interfaces, one unified intelligence engine.", ur: "Do chehra, ek zahen." },
  learner_title:   { en: "Learner Onboarding",          ur: "Talaba Onboarding" },
  learner_desc:    { en: "Answer 6 questions + a 12-question cognitive assessment. Get a visual learning path built from atomcamp's real catalog.", ur: "6 sawalaat + 12 cognitive sawalaat. Atomcamp ke catalog se khud ke liye raah tayyar karein." },
  learner_cta:     { en: "Start Your Journey",          ur: "Safar Shuru Karein" },
  instructor_title: { en: "Instructor Intelligence",    ur: "Ustaad Intelligence" },
  instructor_desc:  { en: "Upload a cohort CSV. Our Random Forest model trains instantly and surfaces at-risk students.", ur: "CSV upload karein. Hamaara Random Forest model fauri train hota hai aur khatre wale students dikhaata hai." },
  instructor_cta:  { en: "Open Dashboard",              ur: "Dashboard Kholein" },

  /* Footer */
  footer_built:    { en: "Built for AUREX AI 2026 • AtomCamp Adaptive LMS", ur: "AUREX AI 2026 ke liye • AtomCamp Adaptive LMS" },
  footer_offline:  { en: "Offline ML • No external AI APIs", ur: "Offline ML • Koi bairi API nahin" },

  /* Alumni page */
  alumni_heading:  { en: "Alumni Job Board",     ur: "Faarig Tab Kaam" },
  alumni_sub:      { en: "Jobs curated for AtomCamp graduates — matched to your skills.", ur: "AtomCamp faarigeen ke liye khaas jobs — aapki skills ke mutabiq." },
  alumni_apply:    { en: "Apply Now",             ur: "Abhi Apply Karein" },
  alumni_connect:  { en: "Connect",               ur: "Rab ta" },

  /* Course */
  course_complete: { en: "Course Complete!",     ur: "Course Mukammal!" },
  course_finish:   { en: "Finish Course",         ur: "Course Khatam Karein" },
  mark_complete:   { en: "Mark Complete",         ur: "Mukammal Karein" },
  lesson_next:     { en: "Next",                  ur: "Agla" },
  lesson_prev:     { en: "Previous",              ur: "Pichla" },
}

export function t(key: string, lang: Lang): string {
  return STRINGS[key]?.[lang] ?? STRINGS[key]?.en ?? key
}
