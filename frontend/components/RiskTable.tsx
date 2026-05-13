"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { StudentPrediction } from "@/types"
import { ArrowUpDown } from "lucide-react"

type SortKey = "risk_score" | "name" | "course_enrolled"

export default function RiskTable({ students }: { students: StudentPrediction[] }) {
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
      let av = a[sortKey]
      let bv = b[sortKey]
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
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => toggleSort("name")}>Name <ArrowUpDown size={14} className="inline ml-1"/></TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort("course_enrolled")}>Course <ArrowUpDown size={14} className="inline ml-1"/></TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort("risk_score")}>Risk Score <ArrowUpDown size={14} className="inline ml-1"/></TableHead>
              <TableHead>Badge</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Intervention</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((s, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{s.name || s.student_id || `Student ${i+1}`}</TableCell>
                <TableCell>{s.course_enrolled || "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold w-12 text-right">{s.risk_score}%</span>
                    <Progress value={s.risk_score} max={100} variant={s.risk_badge === "red" ? "danger" : s.risk_badge === "yellow" ? "default" : "success"} className="w-24" />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={s.risk_badge === "red" ? "danger" : s.risk_badge === "yellow" ? "warning" : "success"}>
                    {s.risk_badge.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs text-xs text-ink-400">{s.predicted_reason}</TableCell>
                <TableCell className="max-w-xs text-xs text-ink-300">{s.recommended_intervention}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
