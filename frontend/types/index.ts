export interface Course {
  id: string
  name: string
  price: number
  duration: string
  level: string
  tags: string[]
  modules: string[]
}

export interface Milestone {
  order: number
  course: string
  duration: string
  deliverable: string
  badge: string
  modules: string[]
}

export interface LearningPathData {
  learner_name: string
  path: Course[]
  milestones: Milestone[]
  total_cost: number
  total_duration: string
  confidence: number
  explanation: string
  vark_profile: VarkScores
  dominant_style: string
}

export interface StudentPrediction {
  index: number
  risk_score: number
  risk_badge: "green" | "yellow" | "red"
  predicted_reason: string
  recommended_intervention: string
  drop_out_actual: number
  [key: string]: any
}

export interface ModelInfo {
  model_name: string
  model_type: string
  accuracy: number
  f1_score: number
  dataset_size: number
  features_used: number
}

export interface VarkScores {
  visual: number
  auditory: number
  reading: number
  kinesthetic: number
}

export interface AssessmentQuestion {
  id: number
  text: string
  options: {
    label: string
    style: keyof VarkScores
    points: number
  }[]
}

// Course content types
export type LearningStyle = "visual" | "auditory" | "reading" | "kinesthetic"

export interface LessonContent {
  visual: string
  auditory: string
  reading: string
  kinesthetic: string
}

export interface CodeExample {
  title: string
  code: string
  explanation: string
  output?: string
}

export interface Lesson {
  id: string
  title: string
  description: string
  duration: number // minutes
  difficulty: "beginner" | "medium" | "advanced"
  content: LessonContent
  codeExamples: CodeExample[]
  diagram?: string // mermaid diagram
  quiz: QuizQuestion[]
  resources: Resource[]
  interactive?: InteractiveExercise
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Resource {
  title: string
  type: "article" | "video" | "cheatsheet" | "exercise"
  url?: string
}

export interface InteractiveExercise {
  type: "fill-blank" | "code-trace" | "match" | "build"
  instructions: string
  items: ExerciseItem[]
  solution: string
}

export interface ExerciseItem {
  id: string
  prompt: string
  answer: string
  hint?: string
}

export interface Week {
  id: string
  title: string
  description: string
  days: Day[]
}

export interface Day {
  id: string
  title: string
  lessons: Lesson[]
}

export interface CourseProgress {
  weekIndex: number
  dayIndex: number
  lessonIndex: number
  completedLessons: string[]
  quizScores: Record<string, number>
  totalTimeMinutes: number
}

export interface AdaptationHints {
  visual: string[]
  auditory: string[]
  reading: string[]
  kinesthetic: string[]
}
