"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { StudentPrediction } from "@/types"
import { ArrowUpDown, MessageCircle } from "lucide-react"

type SortKey = "risk_score" | "name" | "course_enrolled"

export default function RiskTable({
  students,
  onAlert,
}: {
  students: StudentPrediction[]
  onAlert?: (student: StudentPrediction) => void
}) {
  const [sortKey, setSortKey] = useState<SortKey>("risk_score")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  const sorted = useMemo(() => {
    const arr = [...students]
    arr.sort((a, b) => {
      let av: any = a[sortKey]
      let bv: any = b[sortKey]
      if (typeof av === "string") av = av.toLowerCase()
      if (typeof bv === "string") bv = bv.toLowerCase()
      if (av < bv) return sortDir === "asc" ? -1 : 1
      if (av > bv) return sortDir === "asc" ? 1 : -1
      return 0
    })
    return arr
  }, [students, sortKey, sortDir])

  return (
    <Card>
      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer whitespace-nowrap" onClick={() => toggleSort("name")}>
                Name <ArrowUpDown size={12} className="inline ml-1" />
              </TableHead>
              <TableHead className="cursor-pointer whitespace-nowrap" onClick={() => toggleSort("course_enrolled")}>
                Course <ArrowUpDown size={12} className="inline ml-1" />
              </TableHead>
              <TableHead className="cursor-pointer whitespace-nowrap" onClick={() => toggleSort("risk_score")}>
                Risk Score <ArrowUpDown size={12} className="inline ml-1" />
              </TableHead>
              <TableHead>Badge</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Intervention</TableHead>
              {onAlert && <TableHead className="text-center">Alert</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((s, i) => {
              const riskPct = s.risk_score > 1 ? s.risk_score : Math.round(s.risk_score * 100)
              const isAtRisk = s.risk_badge === "red" || s.risk_badge === "yellow"
              return (
                <TableRow key={i} className={s.risk_badge === "red" ? "bg-rose-500/[0.02]" : ""}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {(s.name as string) || (s.student_id as string) || `Student ${i + 1}`}
                  </TableCell>
                  <TableCell className="text-ink-400">{(s.course_enrolled as string) || "—"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3 min-w-[130px]">
                      <span className="text-sm font-semibold w-10 text-right tabular-nums">{riskPct}%</span>
                      <Progress
                        value={riskPct}
                        max={100}
                        variant={s.risk_badge === "red" ? "danger" : s.risk_badge === "yellow" ? "default" : "success"}
                        className="w-20"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={s.risk_badge === "red" ? "danger" : s.risk_badge === "yellow" ? "warning" : "success"}>
                      {s.risk_badge.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] text-xs text-ink-400">{s.predicted_reason}</TableCell>
                  <TableCell className="max-w-[200px] text-xs text-ink-300">{s.recommended_intervention}</TableCell>
                  {onAlert && (
                    <TableCell className="text-center">
                      {isAtRisk ? (
                        <button
                          onClick={() => onAlert(s)}
                          title="Send WhatsApp dropout alert"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-[#25D366] text-xs font-medium transition-all whitespace-nowrap"
                        >
                          <MessageCircle size={11} /> Alert
                        </button>
                      ) : (
                        <span className="text-xs text-ink-600">—</span>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
