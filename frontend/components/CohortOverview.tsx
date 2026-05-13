"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Progress } from "@/components/ui/Progress"
import { StudentPrediction, ModelInfo } from "@/types"
import { Users, Activity, BrainCircuit, TrendingUp } from "lucide-react"

export default function CohortOverview({ students, modelInfo }: { students: StudentPrediction[]; modelInfo: ModelInfo }) {
  const total = students.length
  const atRisk = students.filter((s) => s.risk_badge === "red").length
  const yellow = students.filter((s) => s.risk_badge === "yellow").length
  const completed = students.filter((s) => s.drop_out_actual === 0).length
  const completionRate = total ? Math.round((completed / total) * 100) : 0
  const women = students.filter((s) => String(s.gender).toLowerCase() === "female").length
  const womenPct = total ? Math.round((women / total) * 100) : 0

  const cards = [
    {
      title: "Total Students",
      value: total,
      icon: Users,
      color: "text-brand-400",
      extra: `${womenPct}% Women`,
      progress: womenPct,
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "text-accent-400",
      progress: completionRate,
      variant: "success" as const,
    },
    {
      title: "At-Risk (Red)",
      value: atRisk,
      icon: Activity,
      color: "text-rose-400",
      extra: `+${yellow} yellow flagged`,
    },
    {
      title: "Model Accuracy",
      value: `${modelInfo.accuracy}%`,
      icon: BrainCircuit,
      color: "text-brand-400",
      extra: `F1 ${modelInfo.f1_score}% • ${modelInfo.features_used} features`,
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="tilt-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-ink-400">{card.title}</CardTitle>
              <card.icon size={18} className={card.color} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              {card.progress !== undefined && (
                <Progress
                  value={card.progress}
                  max={100}
                  variant={card.variant || "default"}
                  className="mt-2"
                />
              )}
              {card.extra && <p className="text-xs text-ink-500 mt-1">{card.extra}</p>}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
