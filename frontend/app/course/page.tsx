"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import CourseCatalog from "@/components/CourseCatalog"
import CoursePurchase from "@/components/CoursePurchase"
import { LearningStyle } from "@/types"

const CourseDashboard = dynamic(() => import("@/components/CourseDashboard"), { ssr: false })
const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), { ssr: false })

type ViewState = "catalog" | "purchase" | "learning"

function CourseContent() {
  const searchParams = useSearchParams()
  const styleParam = searchParams.get("style") as LearningStyle | null

  const [view, setView] = useState<ViewState>("catalog")
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(styleParam || "visual")
  const [isPurchased, setIsPurchased] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("course_purchased")
    if (saved === "true") {
      setIsPurchased(true)
      setView("learning")
    }
    const savedStyle = localStorage.getItem("learning_style") as LearningStyle
    if (savedStyle) {
      setLearningStyle(savedStyle)
    } else if (styleParam) {
      setLearningStyle(styleParam)
      localStorage.setItem("learning_style", styleParam)
    }
  }, [styleParam])

  const handleEnroll = () => {
    setView("purchase")
  }

  const handlePurchaseComplete = () => {
    setIsPurchased(true)
    localStorage.setItem("course_purchased", "true")
    setView("learning")
  }

  const handleBackToCatalog = () => {
    setView("catalog")
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
                onBack={handleBackToCatalog}
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
              <CourseDashboard learningStyle={learningStyle} />
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
