"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import CourseCatalog from "@/components/CourseCatalog"
import CoursePurchase from "@/components/CoursePurchase"
import { LearningStyle } from "@/types"
import { supabase } from "@/lib/supabase"

const CourseDashboard = dynamic(() => import("@/components/CourseDashboard"), { ssr: false })
const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), { ssr: false })

type ViewState = "catalog" | "purchase" | "learning"

function CourseContent() {
  const searchParams = useSearchParams()
  const styleParam = searchParams.get("style") as LearningStyle | null

  const [view, setView] = useState<ViewState>("catalog")
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(styleParam || "visual")
  const [selectedCourseId, setSelectedCourseId] = useState("python-basics")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const savedStyle = localStorage.getItem("learning_style") as LearningStyle
    if (savedStyle) setLearningStyle(savedStyle)
    else if (styleParam) {
      setLearningStyle(styleParam)
      localStorage.setItem("learning_style", styleParam)
    }

    // Check any enrollment in Supabase, go straight to learning
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        const { data: progress } = await supabase
          .from("course_progress")
          .select("course_id")
          .eq("user_id", data.user.id)
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle()
        if (progress) {
          setSelectedCourseId(progress.course_id)
          setView("learning")
          return
        }
      }
      if (localStorage.getItem("course_purchased") === "true") {
        setView("learning")
      }
    })
  }, [styleParam])

  const handleEnroll = (courseId: string) => {
    setSelectedCourseId(courseId)
    setView("purchase")
  }

  const handlePurchaseComplete = async () => {
    setView("learning")
    localStorage.setItem("course_purchased", "true")

    const { data } = await supabase.auth.getUser()
    if (data.user) {
      await supabase.from("course_progress").upsert({
        user_id: data.user.id,
        course_id: selectedCourseId,
        completed_lessons: [],
        quiz_scores: {},
        total_time_minutes: 0,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id,course_id" })
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-ink-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <ThreeBackground />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {view === "catalog" && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-5xl mx-auto px-6 py-12"
            >
              <CourseCatalog
                dominantStyle={learningStyle}
                onEnroll={handleEnroll}
              />
            </motion.div>
          )}

          {view === "purchase" && (
            <motion.div
              key="purchase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto px-6 py-12"
            >
              <CoursePurchase
                dominantStyle={learningStyle}
                onComplete={handlePurchaseComplete}
                onBack={() => setView("catalog")}
              />
            </motion.div>
          )}

          {view === "learning" && (
            <motion.div
              key="learning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CourseDashboard learningStyle={learningStyle} courseId={selectedCourseId} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function CoursePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-ink-400">Loading...</div>
      </div>
    }>
      <CourseContent />
    </Suspense>
  )
}
