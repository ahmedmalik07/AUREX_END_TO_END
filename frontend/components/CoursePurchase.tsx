"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import confetti from "canvas-confetti"
import {
  CreditCard,
  Lock,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react"
import { COURSE_PRICE, COURSE_TITLE } from "@/lib/courseData"
import { LearningStyle } from "@/types"

export default function CoursePurchase({
  dominantStyle,
  onComplete,
  onBack,
}: {
  dominantStyle: LearningStyle
  onComplete: () => void
  onBack: () => void
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePurchase = async () => {
    setIsProcessing(true)
    await new Promise((r) => setTimeout(r, 2000))
    setIsProcessing(false)
    setStep(3)

    // Epic confetti
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#00ED64", "#4dffa8", "#1aff8c", "#ffffff"],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#00ED64", "#4dffa8", "#1aff8c", "#ffffff"],
      })
      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-ink-400 hover:text-ink-200 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to course
      </button>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-8 border-brand-500/20">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={28} className="text-brand-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Complete Your Enrollment</h2>
                <p className="text-ink-400">
                  Your learning style: <span className="text-brand-300 font-medium capitalize">{dominantStyle}</span>
                </p>
              </div>

              <div className="bg-white/[0.03] rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/[0.06]">
                  <div>
                    <p className="font-medium text-ink-200">{COURSE_TITLE}</p>
                    <p className="text-sm text-ink-500">Full course access • Lifetime</p>
                  </div>
                  <p className="font-bold text-ink-100">PKR {COURSE_PRICE.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-ink-400">Subtotal</span>
                  <span className="text-ink-200">PKR {COURSE_PRICE.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-ink-400">Discount</span>
                  <span className="text-emerald-400">-PKR 20,001</span>
                </div>
                <div className="flex items-center justify-between font-bold text-lg pt-4 border-t border-white/[0.06]">
                  <span className="text-ink-100">Total</span>
                  <span className="text-brand-300">PKR {COURSE_PRICE.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-ink-400">
                  <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                  <span>4 weeks of structured learning</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-ink-400">
                  <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                  <span>Content adapted for {dominantStyle} learners</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-ink-400">
                  <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-ink-400">
                  <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                  <span>Lifetime access & updates</span>
                </div>
              </div>

              <Button size="lg" className="w-full gap-2" onClick={() => setStep(2)}>
                <Lock size={16} /> Proceed to Payment
              </Button>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-8 border-brand-500/20">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-accent-500/10 flex items-center justify-center mx-auto mb-4">
                  <CreditCard size={28} className="text-accent-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Secure Payment</h2>
                <p className="text-ink-400 text-sm">Your payment information is encrypted</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-ink-300 mb-1.5 block">Cardholder Name</label>
                  <Input placeholder="Zara Khan" />
                </div>
                <div>
                  <label className="text-sm font-medium text-ink-300 mb-1.5 block">Card Number</label>
                  <Input placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-ink-300 mb-1.5 block">Expiry</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ink-300 mb-1.5 block">CVC</label>
                    <Input placeholder="123" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-ink-500 mb-6">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>256-bit SSL encryption. We never store your card details.</span>
              </div>

              <div className="flex items-center justify-between bg-white/[0.03] rounded-lg p-4 mb-6">
                <span className="text-sm text-ink-400">Total to pay</span>
                <span className="text-xl font-bold text-brand-300">
                  PKR {COURSE_PRICE.toLocaleString()}
                </span>
              </div>

              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handlePurchase}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Zap size={18} />
                  </motion.div>
                ) : (
                  <Lock size={16} />
                )}
                {isProcessing ? "Processing..." : "Pay & Enroll Now"}
              </Button>
            </Card>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={48} className="text-emerald-400" />
            </motion.div>

            <h2 className="text-3xl font-bold mb-3">Welcome Aboard! 🎉</h2>
            <p className="text-ink-400 max-w-md mx-auto mb-8">
              You are now enrolled in <span className="text-ink-200 font-medium">{COURSE_TITLE}</span>. 
              Your personalized learning journey starts now.
            </p>

            <div className="bg-white/[0.03] rounded-xl p-6 max-w-sm mx-auto mb-8">
              <p className="text-sm text-ink-400 mb-2">Your learning style</p>
              <p className="text-xl font-bold text-brand-300 capitalize">{dominantStyle} Learner</p>
              <p className="text-xs text-ink-500 mt-2">
                All content is now optimized for how you learn best.
              </p>
            </div>

            <Button size="lg" className="gap-2 px-8" onClick={onComplete}>
              <Zap size={18} /> Start Learning
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
