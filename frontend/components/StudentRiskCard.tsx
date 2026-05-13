"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { StudentPrediction } from "@/types"
import { AlertTriangle } from "lucide-react"

export default function StudentRiskCard({ student }: { student: StudentPrediction }) {
  return (
    <Card className={`border-l-4 ${student.risk_badge === "red" ? "border-l-rose-500" : student.risk_badge === "yellow" ? "border-l-amber-500" : "border-l-accent-500"}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{student.name || student.student_id}</CardTitle>
          <Badge variant={student.risk_badge === "red" ? "danger" : student.risk_badge === "yellow" ? "warning" : "success"}>
            {student.risk_score}% Risk
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={student.risk_score} max={100} variant={student.risk_badge === "red" ? "danger" : "default"} />
        <div className="flex items-start gap-2 text-sm text-ink-400">
          <AlertTriangle size={16} className="shrink-0 mt-0.5 text-rose-400" />
          <span>{student.predicted_reason}</span>
        </div>
        <p className="text-xs text-ink-500">{student.recommended_intervention}</p>
      </CardContent>
    </Card>
  )
}
