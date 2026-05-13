"use client"

import StudentRiskCard from "./StudentRiskCard"
import { StudentPrediction } from "@/types"
import { Wrench } from "lucide-react"

export default function InterventionPanel({ students }: { students: StudentPrediction[] }) {
  const atRisk = students.filter((s) => s.risk_badge === "red").slice(0, 3)
  if (atRisk.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Wrench size={20} className="text-rose-400" />
        <span>Top Interventions Needed</span>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {atRisk.map((s, i) => (
          <StudentRiskCard key={i} student={s} />
        ))}
      </div>
    </div>
  )
}
