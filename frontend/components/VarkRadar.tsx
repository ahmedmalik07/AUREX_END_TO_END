"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { VarkScores } from "@/types"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { Dna } from "lucide-react"

export default function VarkRadar({ scores, dominant }: { scores: VarkScores; dominant: string }) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1
  const data = [
    { subject: "Visual", A: Math.round((scores.visual / total) * 100), fullMark: 100 },
    { subject: "Auditory", A: Math.round((scores.auditory / total) * 100), fullMark: 100 },
    { subject: "Reading", A: Math.round((scores.reading / total) * 100), fullMark: 100 },
    { subject: "Kinesthetic", A: Math.round((scores.kinesthetic / total) * 100), fullMark: 100 },
  ]

  const percentages = data.map((d) => `${d.A}% ${d.subject}`).join(" · ")

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-brand-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Dna size={20} className="text-brand-400" />
            Your Learning DNA
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#8585a3", fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Learning Style"
                  dataKey="A"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="#8b5cf6"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-brand-300 font-medium mt-2">
            {percentages}
          </p>
          <p className="text-center text-xs text-ink-500 mt-1 capitalize">
            Dominant: {dominant} learner
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
