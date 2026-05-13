"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { LearningPathData } from "@/types"
import { Sparkles } from "lucide-react"

export default function PathExplanation({ data }: { data: LearningPathData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-brand-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl pointer-events-none" />
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2">
            <Sparkles size={20} className="text-brand-400" />
            Why This Path?
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-ink-300 leading-relaxed text-lg">{data.explanation}</p>
          {data.dominant_style && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm">
              Cognitive fit: {data.dominant_style} learner
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
