"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import OnboardingForm, { BasicInfo } from "@/components/OnboardingForm"
import CognitiveAssessment from "@/components/CognitiveAssessment"
import VarkRadar from "@/components/VarkRadar"
import LearningPath from "@/components/LearningPath"
import PathExplanation from "@/components/PathExplanation"
import { useApi } from "@/hooks/useApi"
import { Button } from "@/components/ui/Button"
import { Loader2, Sparkles, RotateCcw, BookOpen, ArrowRight } from "lucide-react"
import confetti from "canvas-confetti"
import { supabase } from "@/lib/supabase"
import { VarkScores, LearningPathData } from "@/types"

export default function LearnerPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [basic, setBasic] = useState<BasicInfo | null>(null)
  const [vark, setVark] = useState<VarkScores | null>(null)
  const [pathData, setPathData] = useState<LearningPathData | null>(null)
  const [user, setUser] = useState<any>(null)
  const { post, loading } = useApi()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user)
    })
  }, [])

  const handleBasicNext = (data: BasicInfo) => {
    setBasic(data)
    setStep(2)
  }

  const handleAssessmentComplete = (scores: VarkScores) => {
    setVark(scores)
    setStep(3)
    if (basic) {
      generatePath(basic, scores)
    }
  }

  const saveTestResult = async (scores: VarkScores, dominant: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase.from("test_results").insert({
        user_id: user.id,
        vark_scores: scores,
        dominant_style: dominant,
      })
    } catch (err) {
      console.error("Failed to save test result:", err)
    }
  }

  const generatePath = async (info: BasicInfo, scores: VarkScores) => {
    const payload = {
      ...info,
      vark_scores: scores,
    }
    const res = await post("/generate-path", payload)
    if (res) {
      setPathData(res)
      
      // Save to Supabase
      await saveTestResult(scores, res.dominant_style)
      
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#00ED64", "#4dffa8", "#ffffff"],
      })
      setStep(4)
    }
  }

  const reset = () => {
    setStep(1)
    setBasic(null)
    setVark(null)
    setPathData(null)
  }

  const getDominantStyle = (scores: VarkScores): string => {
    const entries = Object.entries(scores)
    const max = Math.max(...entries.map(([, v]) => v))
    const dominant = entries.find(([, v]) => v === max)?.[0] || "visual"
    return dominant
  }

  const dominantStyle = vark ? getDominantStyle(vark) : ""

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-500/[0.06] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
            <span className="gradient-text">
              AI-Powered Onboarding
            </span>
          </h1>
          <p className="text-ink-400 max-w-xl mx-auto">
            We assess your cognitive profile and goals to build a hyper-personalized learning sprint.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-500 ${
                s <= step ? "w-8 bg-brand-500" : "w-2 bg-white/10"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <OnboardingForm onNext={handleBasicNext} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <CognitiveAssessment onComplete={handleAssessmentComplete} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center py-20">
              <Loader2 className="animate-spin mx-auto text-brand-400 mb-4" size={40} />
              <p className="text-lg text-ink-300">Analyzing your Learning DNA...</p>
              <p className="text-sm text-ink-500 mt-2">Gemini is generating your personalized path</p>
            </motion.div>
          )}

          {step === 4 && pathData && (
            <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-brand-400" size={20} />
                  <h2 className="text-xl font-bold">Your Personalized Sprint</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={reset}>
                  <RotateCcw size={14} className="mr-2" /> Restart
                </Button>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <LearningPath data={pathData} />
                  <PathExplanation data={pathData} />
                </div>
                <div className="space-y-6">
                  <VarkRadar scores={pathData.vark_profile} dominant={pathData.dominant_style} />
                  <div className="glass p-5 rounded-xl">
                    <h3 className="text-sm font-semibold text-ink-300 mb-2">Path Confidence</h3>
                    <div className="text-3xl font-bold text-brand-400">{pathData.confidence}%</div>
                    <p className="text-xs text-ink-500 mt-1">Based on profile + cognitive fit</p>
                  </div>
                </div>
              </div>

              {/* Course Purchase CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="glass p-8 rounded-2xl border border-brand-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-brand-500/10">
                        <BookOpen size={24} className="text-brand-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Ready to Start Learning?</h3>
                        <p className="text-sm text-ink-400">
                          We have created a complete <span className="text-brand-300 font-medium">Programming Basics with Python</span> course
                          optimized for <span className="text-brand-300 font-medium capitalize">{pathData.dominant_style}</span> learners.
                        </p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3 mb-6">
                      <div className="bg-white/[0.03] rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-ink-100">4 Weeks</p>
                        <p className="text-xs text-ink-500">Structured Learning</p>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-ink-100">40 Lessons</p>
                        <p className="text-xs text-ink-500">In-Depth Content</p>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-ink-100">60+ Hours</p>
                        <p className="text-xs text-ink-500">Of Content</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <Link href={`/course?style=${pathData.dominant_style}`} className="w-full sm:w-auto">
                        <Button size="lg" className="w-full gap-2 px-8">
                          <Sparkles size={18} /> View My Course <ArrowRight size={16} />
                        </Button>
                      </Link>
                      <p className="text-xs text-ink-500">
                        PKR 24,999 • 30-day money-back guarantee
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
