"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { StudentPrediction } from "@/types"
import { AlertTriangle, MessageCircle } from "lucide-react"

export default function StudentRiskCard({
  student,
  onAlert,
}: {
  student: StudentPrediction
  onAlert?: (student: StudentPrediction) => void
}) {
  const riskPct = student.risk_score > 1
    ? student.risk_score
    : Math.round(student.risk_score * 100)

  return (
    <Card className={`border-l-4 ${student.risk_badge === "red" ? "border-l-rose-500" : student.risk_badge === "yellow" ? "border-l-amber-500" : "border-l-brand-500"}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base truncate">{(student.name as string) || (student.student_id as string)}</CardTitle>
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant={student.risk_badge === "red" ? "danger" : student.risk_badge === "yellow" ? "warning" : "success"}>
              {riskPct}% Risk
            </Badge>
            {(student.risk_badge === "red" || student.risk_badge === "yellow") && onAlert && (
              <button
                onClick={() => onAlert(student)}
                title="Send WhatsApp dropout alert"
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-[#25D366] text-xs font-medium transition-all"
              >
                <MessageCircle size={11} />
                Alert
              </button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={riskPct} max={100} variant={student.risk_badge === "red" ? "danger" : "default"} />
        <div className="flex items-start gap-2 text-sm text-ink-400">
          <AlertTriangle size={16} className="shrink-0 mt-0.5 text-rose-400" />
          <span>{student.predicted_reason}</span>
        </div>
        <p className="text-xs text-ink-500">{student.recommended_intervention}</p>
      </CardContent>
    </Card>
  )
}
