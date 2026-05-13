"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import LessonPlayer from "./LessonPlayer"
import { WeeklyProgressChart, StatCard } from "./ProgressStats"
import { supabase } from "@/lib/supabase"
import {
  ALL_WEEKS,
  getLessonCount,
  getProgressPercentage,
  getCompletedCount,
  getDefaultProgress,
} from "@/lib/courseData"
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Trophy,
  Flame,
  Target,
  BarChart3,
  ChevronRight,
  Award,
  Zap,
  Play,
  Loader2,
} from "lucide-react"
import { CourseProgress as CourseProgressType, LearningStyle, Week } from "@/types"

export default function CourseDashboard({
  learningStyle,
}: {
  learningStyle: LearningStyle
}) {
  const [progress, setProgress] = useState<CourseProgressType>(getDefaultProgress())
  const [selectedLesson, setSelectedLesson] = useState<{
    weekIndex: number
    dayIndex: number
    lessonIndex: number
  } | null>(null)
  const [user, setUser] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const totalLessons = getLessonCount(ALL_WEEKS)
  const completedCount = getCompletedCount(progress)
  const progressPercent = getProgressPercentage(ALL_WEEKS, progress)

  const currentWeek = ALL_WEEKS[progress.weekIndex]
  const currentDay = currentWeek?.days[progress.dayIndex]
  const currentLesson = currentDay?.lessons[progress.lessonIndex]

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user)
        loadProgress(data.user.id)
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  const loadProgress = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("course_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("course_id", "python-basics")
        .single()

      if (error && error.code !== "PGRST116") {
        console.error("Error loading progress:", error)
      }

      if (data) {
        setProgress({
          weekIndex: 0,
          dayIndex: 0,
          lessonIndex: 0,
          completedLessons: data.completed_lessons || [],
          quizScores: data.quiz_scores || {},
          totalTimeMinutes: data.total_time_minutes || 0,
        })
      }
    } catch (err) {
      console.error("Failed to load progress:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const saveProgress = async (newProgress: CourseProgressType) => {
    if (!user) return
    setSaving(true)
    try {
      await supabase.from("course_progress").upsert({
        user_id: user.id,
        course_id: "python-basics",
        completed_lessons: newProgress.completedLessons,
        quiz_scores: newProgress.quizScores,
        total_time_minutes: newProgress.totalTimeMinutes,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id,course_id" })
    } catch (err) {
      console.error("Failed to save progress:", err)
    } finally {
      setSaving(false)
    }
  }

  const handleLessonComplete = (lessonId: string) => {
    if (!progress.completedLessons.includes(lessonId)) {
      const newProgress = {
        ...progress,
        completedLessons: [...progress.completedLessons, lessonId],
        totalTimeMinutes: progress.totalTimeMinutes + (currentLesson?.duration || 0),
      }
      setProgress(newProgress)
      saveProgress(newProgress)
    }
  }

  const navigateLesson = (direction: "next" | "prev") => {
    if (!selectedLesson) return
    const { weekIndex, dayIndex, lessonIndex } = selectedLesson
    const week = ALL_WEEKS[weekIndex]
    const day = week.days[dayIndex]

    if (direction === "next") {
      if (lessonIndex + 1 < day.lessons.length) {
        setSelectedLesson({ weekIndex, dayIndex, lessonIndex: lessonIndex + 1 })
      } else if (dayIndex + 1 < week.days.length) {
        setSelectedLesson({ weekIndex, dayIndex: dayIndex + 1, lessonIndex: 0 })
      } else if (weekIndex + 1 < ALL_WEEKS.length) {
        setSelectedLesson({ weekIndex: weekIndex + 1, dayIndex: 0, lessonIndex: 0 })
      }
    } else {
      if (lessonIndex > 0) {
        setSelectedLesson({ weekIndex, dayIndex, lessonIndex: lessonIndex - 1 })
      } else if (dayIndex > 0) {
        setSelectedLesson({
          weekIndex,
          dayIndex: dayIndex - 1,
          lessonIndex: week.days[dayIndex - 1].lessons.length - 1,
        })
      } else if (weekIndex > 0) {
        const prevWeek = ALL_WEEKS[weekIndex - 1]
        setSelectedLesson({
          weekIndex: weekIndex - 1,
          dayIndex: prevWeek.days.length - 1,
          lessonIndex: prevWeek.days[prevWeek.days.length - 1].lessons.length - 1,
        })
      }
    }
  }

  const weeklyData = [
    { day: "Mon", minutes: 45 },
    { day: "Tue", minutes: 60 },
    { day: "Wed", minutes: 30 },
    { day: "Thu", minutes: 75 },
    { day: "Fri", minutes: 50 },
    { day: "Sat", minutes: 90 },
    { day: "Sun", minutes: 40 },
  ]

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand-400" />
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-80 border-r border-white/[0.06] bg-white/[0.02] overflow-y-auto hidden lg:block">
        <div className="p-5 space-y-6">
          {/* Course Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-ink-300">Course Progress</span>
              <span className="text-sm font-bold text-brand-300">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
            <p className="text-xs text-ink-500 mt-1">
              {completedCount} of {totalLessons} lessons completed
            </p>
          </div>

          {/* Stats Mini */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/[0.03] rounded-lg p-3 text-center">
              <Flame size={16} className="text-amber-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-ink-100">{Math.floor(progress.totalTimeMinutes / 60)}h</p>
              <p className="text-xs text-ink-500">Time spent</p>
            </div>
            <div className="bg-white/[0.03] rounded-lg p-3 text-center">
              <Trophy size={16} className="text-brand-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-ink-100">{completedCount}</p>
              <p className="text-xs text-ink-500">Completed</p>
            </div>
          </div>

          {/* Saving indicator */}
          {saving && (
            <div className="flex items-center gap-2 text-xs text-brand-400">
              <Loader2 size={12} className="animate-spin" />
              Saving progress...
            </div>
          )}

          {/* Week/Day/Lesson Tree */}
          <div className="space-y-3">
            {ALL_WEEKS.map((week, wi) => (
              <div key={week.id}>
                <button
                  onClick={() => setSelectedLesson({ weekIndex: wi, dayIndex: 0, lessonIndex: 0 })}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedLesson?.weekIndex === wi
                      ? "bg-brand-500/10 text-brand-300"
                      : "text-ink-400 hover:bg-white/[0.04]"
                  }`}
                >
                  {week.title}
                </button>
                <div className="ml-3 mt-1 space-y-1">
                  {week.days.map((day, di) => (
                    <div key={day.id}>
                      <p className="text-xs text-ink-500 px-3 py-1">{day.title}</p>
                      <div className="space-y-0.5">
                        {day.lessons.map((lesson, li) => {
                          const isActive =
                            selectedLesson?.weekIndex === wi &&
                            selectedLesson?.dayIndex === di &&
                            selectedLesson?.lessonIndex === li
                          const isCompleted = progress.completedLessons.includes(lesson.id)
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => setSelectedLesson({ weekIndex: wi, dayIndex: di, lessonIndex: li })}
                              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                isActive
                                  ? "bg-brand-500/10 text-brand-300"
                                  : "text-ink-400 hover:bg-white/[0.04]"
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                              ) : (
                                <Circle size={12} className="text-ink-600 shrink-0" />
                              )}
                              <span className="truncate">{lesson.title}</span>
                              <span className="ml-auto text-ink-600 shrink-0">{lesson.duration}m</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          {!selectedLesson ? (
            <div className="space-y-8">
              {/* Welcome Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-3xl font-bold mb-2">
                  <span className="gradient-text">Your Learning Dashboard</span>
                </h1>
                <p className="text-ink-400">
                  Continue where you left off. Your content is adapted for{" "}
                  <span className="text-brand-300 font-medium capitalize">{learningStyle}</span> learning.
                </p>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Progress" value={`${progressPercent}%`} icon={Target} color="text-brand-400" />
                <StatCard label="Lessons Done" value={completedCount} suffix={`/${totalLessons}`} icon={BookOpen} color="text-emerald-400" />
                <StatCard label="Time Spent" value={`${Math.floor(progress.totalTimeMinutes / 60)}h`} suffix={` ${progress.totalTimeMinutes % 60}m`} icon={Clock} color="text-amber-400" />
                <StatCard label="Current Streak" value="3" suffix=" days" icon={Flame} color="text-rose-400" />
              </div>

              {/* Continue Learning */}
              {currentLesson && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 border-brand-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                      <Badge className="mb-3 bg-brand-500/10 text-brand-300 border-brand-500/20">
                        <Zap size={10} className="mr-1" /> Continue Learning
                      </Badge>
                      <h2 className="text-xl font-bold mb-1">{currentLesson.title}</h2>
                      <p className="text-sm text-ink-400 mb-4">
                        {currentWeek.title} → {currentDay.title}
                      </p>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-xs text-ink-400">
                          <Clock size={12} />
                          {currentLesson.duration} min
                        </div>
                        <Badge variant={currentLesson.difficulty === "beginner" ? "success" : "warning"} className="text-xs">
                          {currentLesson.difficulty}
                        </Badge>
                      </div>
                      <Button
                        className="gap-2"
                        onClick={() =>
                          setSelectedLesson({
                            weekIndex: progress.weekIndex,
                            dayIndex: progress.dayIndex,
                            lessonIndex: progress.lessonIndex,
                          })
                        }
                      >
                        <Play size={16} /> Resume Lesson
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Weekly Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6 border-white/[0.06]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <BarChart3 size={18} className="text-brand-400" />
                      Weekly Activity
                    </h2>
                  </div>
                  <WeeklyProgressChart data={weeklyData} />
                </Card>
              </motion.div>

              {/* Week Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-bold">Course Content</h2>
                {ALL_WEEKS.map((week, wi) => {
                  const weekLessons = week.days.reduce((acc, d) => acc + d.lessons.length, 0)
                  const weekCompleted = week.days.reduce(
                    (acc, d) => acc + d.lessons.filter((l) => progress.completedLessons.includes(l.id)).length,
                    0
                  )
                  const weekPercent = Math.round((weekCompleted / weekLessons) * 100)

                  return (
                    <Card
                      key={week.id}
                      className="p-5 border-white/[0.06] hover:border-brand-500/20 transition-all cursor-pointer"
                      onClick={() => setSelectedLesson({ weekIndex: wi, dayIndex: 0, lessonIndex: 0 })}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-ink-100">{week.title}</h3>
                        <Badge variant="default" className="text-xs">
                          {weekCompleted}/{weekLessons} done
                        </Badge>
                      </div>
                      <p className="text-sm text-ink-400 mb-3">{week.description}</p>
                      <Progress value={weekPercent} className="h-1.5 mb-3" />
                      <div className="flex items-center gap-2 text-xs text-ink-500">
                        <BookOpen size={12} />
                        {week.days.length} days • {weekLessons} lessons
                        <ChevronRight size={12} className="ml-auto" />
                      </div>
                    </Card>
                  )
                })}
              </motion.div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedLesson.weekIndex}-${selectedLesson.dayIndex}-${selectedLesson.lessonIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="flex items-center gap-2 text-sm text-ink-400 hover:text-ink-200 mb-6 transition-colors"
                >
                  <ChevronRight size={16} className="rotate-180" /> Back to dashboard
                </button>

                <LessonPlayer
                  lesson={ALL_WEEKS[selectedLesson.weekIndex].days[selectedLesson.dayIndex].lessons[selectedLesson.lessonIndex]}
                  learningStyle={learningStyle}
                  onComplete={() => {
                    const lesson =
                      ALL_WEEKS[selectedLesson.weekIndex].days[selectedLesson.dayIndex].lessons[
                        selectedLesson.lessonIndex
                      ]
                    handleLessonComplete(lesson.id)
                  }}
                  onNext={() => navigateLesson("next")}
                  onPrev={() => navigateLesson("prev")}
                  hasNext={
                    selectedLesson.lessonIndex + 1 <
                      ALL_WEEKS[selectedLesson.weekIndex].days[selectedLesson.dayIndex].lessons.length ||
                    selectedLesson.dayIndex + 1 < ALL_WEEKS[selectedLesson.weekIndex].days.length ||
                    selectedLesson.weekIndex + 1 < ALL_WEEKS.length
                  }
                  hasPrev={
                    selectedLesson.lessonIndex > 0 ||
                    selectedLesson.dayIndex > 0 ||
                    selectedLesson.weekIndex > 0
                  }
                  isCompleted={
                    progress.completedLessons.includes(
                      ALL_WEEKS[selectedLesson.weekIndex].days[selectedLesson.dayIndex].lessons[
                        selectedLesson.lessonIndex
                      ].id
                    )
                  }
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  )
}
