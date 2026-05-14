"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DatasetUploader from "@/components/DatasetUploader"
import CohortOverview from "@/components/CohortOverview"
import RiskTable from "@/components/RiskTable"
import StudentRiskCard from "@/components/StudentRiskCard"
import WhatsAppAlertModal from "@/components/WhatsAppAlertModal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts"
import {
  Download,
  BarChart3,
  Users,
  AlertTriangle,
  CheckCircle2,
  BrainCircuit,
  Layers,
  Wrench,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  UserMinus,
  UserCheck,
  UserX,
  Check,
  X as XIcon,
  MessageCircle,
} from "lucide-react"
import { StudentPrediction } from "@/types"
import { supabase } from "@/lib/supabase"

type Tab = "overview" | "students" | "attendance" | "dropout" | "interventions" | "model"

const TABS = [
  { id: "overview"      as Tab, label: "Overview",      icon: BarChart3 },
  { id: "students"      as Tab, label: "All Students",  icon: Users },
  { id: "attendance"    as Tab, label: "Attendance",    icon: CalendarDays },
  { id: "dropout"       as Tab, label: "Dropout",       icon: UserMinus },
  { id: "interventions" as Tab, label: "Interventions", icon: Wrench },
  { id: "model"         as Tab, label: "Model Info",    icon: BrainCircuit },
]

const RISK_COLORS = { green: "#00ED64", yellow: "#f59e0b", red: "#f43f5e" }

function getRiskCategory(reason: string): string {
  const r = reason.toLowerCase()
  if (r.includes("attendance")) return "Low Attendance"
  if (r.includes("quiz") || r.includes("score") || r.includes("grade")) return "Poor Quiz Performance"
  if (r.includes("assignment") || r.includes("submission")) return "Missing Assignments"
  if (r.includes("engagement") || r.includes("participation")) return "Low Engagement"
  return "Multiple Risk Factors"
}

export default function InstructorPage() {
  const [analysis, setAnalysis] = useState<any>(null)
  const [filePath, setFilePath] = useState<string>("")
  const [activeTab, setActiveTab] = useState<Tab>("overview")

  /* Auth + persistence */
  const [user, setUser] = useState<any>(null)
  const [cohortId, setCohortId] = useState<string | null>(null)
  const [loadingCohort, setLoadingCohort] = useState(true)

  /* WhatsApp alert state */
  const [alertStudent, setAlertStudent] = useState<StudentPrediction | null>(null)
  const [alertsSent, setAlertsSent] = useState(0)
  const [toast, setToast] = useState<string | null>(null)

  const handleAlertSent = (student: StudentPrediction) => {
    setAlertsSent((n) => n + 1)
    const name = (student.name as string) || (student.student_id as string) || "Student"
    setToast(`WhatsApp alert queued to +92 319 3608483 for ${name}`)
    setTimeout(() => setToast(null), 4500)
    setAlertStudent(null)
  }

  /* Attendance state */
  const [sessionDate, setSessionDate] = useState(() => new Date().toISOString().split("T")[0])
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>({})
  const [attendanceSaved, setAttendanceSaved] = useState(false)
  const [sessionHistory, setSessionHistory] = useState<Array<{ date: string; presentCount: number; total: number }>>([])

  /* Load auth user + their latest cohort on mount */
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { setLoadingCohort(false); return }
      setUser(data.user)

      const { data: cohort } = await supabase
        .from("cohorts")
        .select("id, cohort_students(student_data)")
        .eq("instructor_id", data.user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (cohort) {
        setCohortId(cohort.id)
        const students = (cohort.cohort_students as any[]).map((r) => r.student_data)
        setAnalysis({ students, model_info: null })
        setActiveTab("overview")

        const { data: sessions } = await supabase
          .from("attendance_sessions")
          .select("session_date, present_count, total")
          .eq("cohort_id", cohort.id)
          .order("session_date", { ascending: false })
          .limit(5)

        if (sessions) {
          setSessionHistory(sessions.map((s: any) => ({
            date: s.session_date,
            presentCount: s.present_count,
            total: s.total,
          })))
        }
      }
      setLoadingCohort(false)
    })
  }, [])

  /* Persist new cohort upload to Supabase */
  const handleUpload = async (path: string, data: any) => {
    setFilePath(path)
    setAnalysis(data)
    setActiveTab("overview")

    if (!user) return

    // Delete old cohort for this instructor (replace strategy)
    if (cohortId) {
      await supabase.from("cohorts").delete().eq("id", cohortId)
    }

    const { data: cohort } = await supabase
      .from("cohorts")
      .insert({
        instructor_id: user.id,
        name: `Cohort ${new Date().toLocaleDateString("en-PK")}`,
        file_path: path,
      })
      .select()
      .single()

    if (cohort) {
      setCohortId(cohort.id)
      const rows = (data.students as any[]).map((s) => ({
        cohort_id: cohort.id,
        student_data: s,
      }))
      await supabase.from("cohort_students").insert(rows)
    }
  }

  const toggleAttendance = (id: string) => {
    setAttendanceSaved(false)
    setAttendanceMap((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const markAll = (present: boolean) => {
    const map: Record<string, boolean> = {}
    students.forEach((s: any) => { map[s.student_id] = present })
    setAttendanceMap(map)
    setAttendanceSaved(false)
  }

  const saveAttendance = async () => {
    const presentCount = Object.values(attendanceMap).filter(Boolean).length
    const total = students.length
    setSessionHistory((prev) => [{ date: sessionDate, presentCount, total }, ...prev.slice(0, 4)])
    setAttendanceSaved(true)

    if (cohortId) {
      await supabase.from("attendance_sessions").upsert({
        cohort_id: cohortId,
        session_date: sessionDate,
        records: attendanceMap,
        present_count: presentCount,
        total,
      }, { onConflict: "cohort_id,session_date" })
    }
  }

  const handleExport = async () => {
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8002"
      const res = await fetch(`${API_BASE}/export-interventions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_path: filePath || undefined }),
      })
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "interventions.csv"
      a.click()
    } catch {
      alert("Export failed — make sure the backend is running.")
    }
  }

  const students = analysis?.students ?? []
  const modelInfo = analysis?.model_info

  const green  = students.filter((s: any) => s.risk_badge === "green").length
  const yellow = students.filter((s: any) => s.risk_badge === "yellow").length
  const red    = students.filter((s: any) => s.risk_badge === "red").length
  const total  = students.length

  const riskBarData = [
    { level: "Low Risk",    count: green,  fill: "#00ED64" },
    { level: "Medium Risk", count: yellow, fill: "#f59e0b" },
    { level: "High Risk",   count: red,    fill: "#f43f5e" },
  ]

  const riskPieData = [
    { name: "Low",    value: green,  fill: "#00ED64" },
    { name: "Medium", value: yellow, fill: "#f59e0b" },
    { name: "High",   value: red,    fill: "#f43f5e" },
  ].filter((d) => d.value > 0)

  const healthScore = total > 0
    ? Math.round(((green * 1 + yellow * 0.5) / total) * 100)
    : 0

  const atRiskStudents = students.filter(
    (s: any) => s.risk_badge === "red" || s.risk_badge === "yellow"
  )

  /* Attendance analysis */
  const lowAttendance = students.filter((s: any) => (s.attendance ?? 100) < 70)
  const avgAttendance = total > 0
    ? Math.round(students.reduce((acc: number, s: any) => acc + (s.attendance ?? 0), 0) / total)
    : 0
  const attendanceBuckets = [
    { label: "< 50%",  count: students.filter((s: any) => (s.attendance ?? 100) < 50).length,            fill: "#f43f5e" },
    { label: "50–70%", count: students.filter((s: any) => (s.attendance ?? 100) >= 50 && (s.attendance ?? 100) < 70).length, fill: "#f59e0b" },
    { label: "70–90%", count: students.filter((s: any) => (s.attendance ?? 100) >= 70 && (s.attendance ?? 100) < 90).length, fill: "#4dffa8" },
    { label: "90%+",   count: students.filter((s: any) => (s.attendance ?? 100) >= 90).length,            fill: "#00ED64" },
  ]

  /* Dropout analysis */
  const highRisk = students.filter((s: any) => s.risk_badge === "red")
  const reasonGroups: Record<string, number> = {}
  atRiskStudents.forEach((s: any) => {
    const cat = getRiskCategory(s.predicted_reason || "")
    reasonGroups[cat] = (reasonGroups[cat] || 0) + 1
  })
  const reasonBarData = Object.entries(reasonGroups)
    .map(([reason, count]) => ({ reason, count }))
    .sort((a, b) => b.count - a.count)

  const topReason = reasonBarData[0]?.reason ?? "N/A"
  const dropoutRate = total > 0 ? Math.round((red / total) * 100) : 0

  if (loadingCohort) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-ink-400">
          <BrainCircuit size={20} className="animate-pulse text-brand-400" />
          <span className="text-sm">Loading instructor data…</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-sm w-full text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
            <AlertTriangle size={28} className="text-rose-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink-100 mb-2">Sign In Required</h2>
            <p className="text-sm text-ink-400">
              The Instructor Intelligence dashboard is restricted to authenticated instructors.
              Sign in to access your cohort, attendance records, and risk predictions.
            </p>
          </div>
          <button
            onClick={() => document.dispatchEvent(new CustomEvent("open-auth-modal"))}
            className="w-full py-3 rounded-xl bg-[#00ED64] hover:bg-[#00c853] text-black font-semibold text-sm transition-colors"
          >
            Sign In / Sign Up
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-rose-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <BarChart3 className="text-rose-400" size={28} />
              <h1 className="text-2xl sm:text-3xl font-bold">Instructor Intelligence</h1>
            </div>
            <p className="text-ink-400 text-sm sm:text-base">Upload a cohort CSV to surface at-risk students and model insights.</p>
          </div>
          {analysis && (
            <div className="flex items-center gap-3 flex-wrap">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${
                healthScore >= 75
                  ? "bg-brand-500/10 border-brand-500/20 text-brand-300"
                  : healthScore >= 50
                  ? "bg-amber-500/10 border-amber-500/20 text-amber-300"
                  : "bg-rose-500/10 border-rose-500/20 text-rose-300"
              }`}>
                <TrendingUp size={14} />
                Class Health: {healthScore}%
              </div>
              {alertsSent > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-[#25D366]/10 border-[#25D366]/20 text-[#25D366] text-sm font-semibold">
                  <MessageCircle size={14} />
                  {alertsSent} Alert{alertsSent !== 1 ? "s" : ""} Sent
                </div>
              )}
              <Button variant="outline" onClick={handleExport} className="gap-2">
                <Download size={16} /> Export CSV
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Uploader */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <DatasetUploader onUpload={handleUpload} />
      </motion.div>

      {/* Empty state */}
      {!analysis && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card className="mt-8 p-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                <Layers size={24} className="text-brand-400" />
              </div>
              <div>
                <h3 className="font-semibold text-ink-200 mb-1">No dataset loaded yet</h3>
                <p className="text-sm text-ink-500 max-w-md">
                  Upload a cohort CSV with columns like{" "}
                  <code className="text-brand-300 bg-brand-500/10 px-1 rounded">student_id</code>,{" "}
                  <code className="text-brand-300 bg-brand-500/10 px-1 rounded">attendance</code>,{" "}
                  <code className="text-brand-300 bg-brand-500/10 px-1 rounded">quiz_scores</code>, and{" "}
                  <code className="text-brand-300 bg-brand-500/10 px-1 rounded">drop_out</code>.{" "}
                  The Random Forest model trains instantly.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {["attendance", "quiz_scores", "assignments_submitted", "gender", "course_enrolled", "drop_out"].map((col) => (
                  <Badge key={col} variant="default" className="text-xs font-mono">{col}</Badge>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* ── Tabs + content ── */}
      {analysis && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-8 space-y-6">
          {/* Tab bar — scrollable on mobile */}
          <div className="overflow-x-auto pb-1">
            <div className="flex items-center gap-1 p-1 bg-white/[0.03] rounded-xl w-max min-w-full sm:w-fit">
              {TABS.map((tab) => {
                const Icon = tab.icon
                const badge = tab.id === "interventions" ? (red + yellow > 0 ? red + yellow : 0)
                            : tab.id === "dropout"       ? (red > 0 ? red : 0)
                            : tab.id === "attendance"    ? (lowAttendance.length > 0 ? lowAttendance.length : 0)
                            : 0
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-white/[0.08] text-ink-100 ring-1 ring-white/10"
                        : "text-ink-500 hover:text-ink-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon size={14} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {badge > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold">
                        {badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ── OVERVIEW TAB ── */}
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <CohortOverview students={students} modelInfo={modelInfo} />

                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <CardTitle className="text-base font-semibold mb-4 flex items-center gap-2">
                      <BarChart3 size={16} className="text-brand-400" /> Risk Distribution
                    </CardTitle>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={riskBarData} barSize={40}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                          <XAxis dataKey="level" tick={{ fill: "#8585a3", fontSize: 12 }} axisLine={false} />
                          <YAxis tick={{ fill: "#8585a3", fontSize: 12 }} axisLine={false} allowDecimals={false} />
                          <Tooltip contentStyle={{ backgroundColor: "#1e1e2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#e2e8f0" }} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                            {riskBarData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <CardTitle className="text-base font-semibold mb-4 flex items-center gap-2">
                      <Users size={16} className="text-brand-400" /> Risk Breakdown
                    </CardTitle>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={riskPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                            {riskPieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: "#1e1e2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#e2e8f0" }} />
                          <Legend formatter={(v) => <span className="text-ink-300 text-xs">{v}</span>} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: "Low Risk",    count: green,  pct: total ? Math.round((green/total)*100)  : 0, color: "text-brand-300", bg: "bg-brand-500/10", border: "border-brand-500/20", icon: CheckCircle2 },
                    { label: "Medium Risk", count: yellow, pct: total ? Math.round((yellow/total)*100) : 0, color: "text-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: AlertTriangle },
                    { label: "High Risk",   count: red,    pct: total ? Math.round((red/total)*100)    : 0, color: "text-rose-300",  bg: "bg-rose-500/10",  border: "border-rose-500/20",  icon: AlertTriangle },
                  ].map((item) => (
                    <Card key={item.label} className={`p-5 border ${item.border} ${item.bg}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${item.color}`}>{item.label}</span>
                        <item.icon size={16} className={item.color} />
                      </div>
                      <p className={`text-3xl font-bold ${item.color}`}>{item.count}</p>
                      <p className="text-xs text-ink-500 mt-1">{item.pct}% of cohort</p>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── ALL STUDENTS TAB ── */}
            {activeTab === "students" && (
              <motion.div key="students" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="text-lg font-semibold">All Students ({total})</h2>
                  <div className="flex items-center gap-2 text-xs">
                    {[["green","Low","#00ED64"],["yellow","Medium","#f59e0b"],["red","High","#f43f5e"]].map(([badge,label,color]) => (
                      <span key={badge} className="flex items-center gap-1.5 text-ink-400">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color as string }} />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <RiskTable students={students} onAlert={setAlertStudent} />
              </motion.div>
            )}

            {/* ── ATTENDANCE TAB ── */}
            {activeTab === "attendance" && (
              <motion.div key="attendance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                {/* Summary */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: "Avg Attendance",   value: `${avgAttendance}%`,        color: avgAttendance >= 75 ? "text-brand-300" : "text-amber-300",  bg: avgAttendance >= 75 ? "bg-brand-500/10 border-brand-500/20" : "bg-amber-500/10 border-amber-500/20",   icon: UserCheck },
                    { label: "Low Attendance",   value: lowAttendance.length,        color: "text-rose-300",  bg: "bg-rose-500/10 border-rose-500/20",   icon: UserX },
                    { label: "Fully Attending",  value: students.filter((s: any) => (s.attendance ?? 0) >= 90).length, color: "text-brand-300", bg: "bg-brand-500/10 border-brand-500/20", icon: CheckCircle2 },
                  ].map((item) => (
                    <Card key={item.label} className={`p-5 border ${item.bg}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${item.color}`}>{item.label}</span>
                        <item.icon size={16} className={item.color} />
                      </div>
                      <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
                    </Card>
                  ))}
                </div>

                {/* Attendance distribution chart */}
                <Card className="p-6">
                  <CardTitle className="text-base font-semibold mb-4 flex items-center gap-2">
                    <CalendarDays size={16} className="text-brand-400" /> Attendance Distribution
                  </CardTitle>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={attendanceBuckets} barSize={48}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                        <XAxis dataKey="label" tick={{ fill: "#8585a3", fontSize: 12 }} axisLine={false} />
                        <YAxis tick={{ fill: "#8585a3", fontSize: 12 }} axisLine={false} allowDecimals={false} />
                        <Tooltip contentStyle={{ backgroundColor: "#1e1e2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#e2e8f0" }} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                          {attendanceBuckets.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Mark today's session */}
                <Card className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <CalendarDays size={16} className="text-teal-400" /> Mark Today's Session
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={sessionDate}
                        onChange={(e) => setSessionDate(e.target.value)}
                        className="text-xs bg-white/[0.05] border border-white/[0.08] rounded-lg px-2 py-1.5 text-ink-300 focus:outline-none focus:border-teal-500/40"
                      />
                      <Button size="sm" variant="outline" onClick={() => markAll(true)} className="text-xs gap-1">
                        <UserCheck size={12} /> All Present
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => markAll(false)} className="text-xs gap-1">
                        <UserX size={12} /> All Absent
                      </Button>
                    </div>
                  </div>

                  {/* Student list */}
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {students.map((s: any) => {
                      const isPresent = attendanceMap[s.student_id] ?? true
                      return (
                        <div key={s.student_id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full shrink-0 ${s.risk_badge === "red" ? "bg-rose-400" : s.risk_badge === "yellow" ? "bg-amber-400" : "bg-brand-400"}`} />
                            <span className="text-sm text-ink-200">{s.name || s.student_id}</span>
                            {(s.attendance ?? 100) < 70 && (
                              <Badge className="text-xs bg-rose-500/10 text-rose-300 border-rose-500/20">Low {s.attendance}%</Badge>
                            )}
                          </div>
                          <button
                            onClick={() => toggleAttendance(s.student_id)}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                              isPresent
                                ? "bg-brand-500/10 text-brand-300 border border-brand-500/20"
                                : "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                            }`}
                          >
                            {isPresent ? <><Check size={11} /> Present</> : <><XIcon size={11} /> Absent</>}
                          </button>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
                    <p className="text-sm text-ink-400">
                      <span className="text-brand-300 font-semibold">
                        {Object.values(attendanceMap).filter(Boolean).length + (students.length - Object.keys(attendanceMap).length)}
                      </span>{" "}
                      / {total} students marked present
                    </p>
                    <Button
                      size="sm"
                      onClick={saveAttendance}
                      className={attendanceSaved ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-[#00ED64] text-black font-semibold"}
                      disabled={attendanceSaved}
                    >
                      {attendanceSaved ? <><Check size={12} /> Saved</> : "Save Session"}
                    </Button>
                  </div>
                </Card>

                {/* Session history */}
                {sessionHistory.length > 0 && (
                  <Card className="p-6">
                    <CardTitle className="text-base font-semibold mb-4">Session History</CardTitle>
                    <div className="space-y-2">
                      {sessionHistory.map((sess, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                          <span className="text-sm text-ink-300">{sess.date}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-ink-400">{sess.presentCount}/{sess.total} present</span>
                            <Badge className={`text-xs ${Math.round((sess.presentCount/sess.total)*100) >= 75 ? "bg-brand-500/10 text-brand-300 border-brand-500/20" : "bg-amber-500/10 text-amber-300 border-amber-500/20"}`}>
                              {Math.round((sess.presentCount/sess.total)*100)}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </motion.div>
            )}

            {/* ── DROPOUT TAB ── */}
            {activeTab === "dropout" && (
              <motion.div key="dropout" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                {/* Summary cards */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: "High-Risk Students", value: red,           color: "text-rose-300",  bg: "bg-rose-500/10 border-rose-500/20",   icon: UserMinus,   desc: "likely to drop out" },
                    { label: "Dropout Rate",       value: `${dropoutRate}%`, color: "text-amber-300", bg: "bg-amber-500/10 border-amber-500/20", icon: TrendingDown, desc: "of cohort flagged" },
                    { label: "Top Risk Factor",    value: topReason,      color: "text-ink-200",   bg: "bg-white/[0.04] border-white/[0.08]",  icon: AlertTriangle, desc: "most common reason" },
                  ].map((item) => (
                    <Card key={item.label} className={`p-5 border ${item.bg}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${item.color}`}>{item.label}</span>
                        <item.icon size={16} className={item.color} />
                      </div>
                      <p className={`text-2xl font-bold ${item.color} truncate`}>{item.value}</p>
                      <p className="text-xs text-ink-500 mt-1">{item.desc}</p>
                    </Card>
                  ))}
                </div>

                {/* Dropout reasons chart */}
                {reasonBarData.length > 0 && (
                  <Card className="p-6">
                    <CardTitle className="text-base font-semibold mb-4 flex items-center gap-2">
                      <TrendingDown size={16} className="text-rose-400" /> Dropout Reasons
                    </CardTitle>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={reasonBarData} layout="vertical" barSize={20}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                          <XAxis type="number" tick={{ fill: "#8585a3", fontSize: 12 }} axisLine={false} allowDecimals={false} />
                          <YAxis dataKey="reason" type="category" width={160} tick={{ fill: "#8585a3", fontSize: 11 }} axisLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: "#1e1e2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#e2e8f0" }} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                          <Bar dataKey="count" radius={[0, 6, 6, 0]} fill="#f43f5e" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                )}

                {/* High-risk student list */}
                <div>
                  <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
                    <UserMinus size={16} className="text-rose-400" /> Students at Highest Risk
                    <Badge className="bg-rose-500/10 text-rose-300 border-rose-500/20">{red}</Badge>
                  </h2>
                  {highRisk.length === 0 ? (
                    <Card className="p-8 text-center">
                      <CheckCircle2 size={32} className="text-brand-400 mx-auto mb-3" />
                      <p className="font-semibold text-ink-200">No students at critical risk!</p>
                    </Card>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {highRisk.map((s: any, i: number) => (
                        <Card key={i} className="p-4 border-rose-500/20 bg-rose-500/[0.03] space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-ink-100 truncate">{s.name || s.student_id}</span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <Badge className="bg-rose-500/10 text-rose-300 border-rose-500/20">
                                {Math.round(s.risk_score > 1 ? s.risk_score : s.risk_score * 100)}% risk
                              </Badge>
                              <button
                                onClick={() => setAlertStudent(s)}
                                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-[#25D366] text-xs font-medium transition-all"
                                title="Send WhatsApp alert"
                              >
                                <MessageCircle size={10} /> Alert
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-rose-300/80 bg-rose-500/10 px-2 py-1.5 rounded-lg">{s.predicted_reason}</p>
                          <div className="grid grid-cols-3 gap-2 text-center text-xs">
                            {[
                              { label: "Attendance", value: s.attendance != null ? `${s.attendance}%` : "—" },
                              { label: "Quiz Avg",   value: s.quiz_scores != null ? `${s.quiz_scores}%` : "—" },
                              { label: "Submitted",  value: s.assignments_submitted != null ? s.assignments_submitted : "—" },
                            ].map((m) => (
                              <div key={m.label} className="bg-white/[0.03] rounded p-1.5">
                                <p className="text-ink-200 font-bold">{m.value}</p>
                                <p className="text-ink-600">{m.label}</p>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-amber-300/80 italic">{s.recommended_intervention}</p>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── INTERVENTIONS TAB ── */}
            {activeTab === "interventions" && (
              <motion.div key="interventions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">Students Needing Intervention</h2>
                    <p className="text-sm text-ink-400 mt-0.5">{atRiskStudents.length} students flagged for action</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-rose-500/10 text-rose-300 border-rose-500/20">{red} High</Badge>
                    <Badge className="bg-amber-500/10 text-amber-300 border-amber-500/20">{yellow} Medium</Badge>
                  </div>
                </div>

                {atRiskStudents.length === 0 ? (
                  <Card className="p-8 text-center">
                    <CheckCircle2 size={32} className="text-brand-400 mx-auto mb-3" />
                    <p className="font-semibold text-ink-200">All students are on track!</p>
                    <p className="text-sm text-ink-400 mt-1">No interventions needed at this time.</p>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {atRiskStudents.map((s: any, i: number) => (
                      <StudentRiskCard key={i} student={s} onAlert={setAlertStudent} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── MODEL INFO TAB ── */}
            {activeTab === "model" && modelInfo && (
              <motion.div key="model" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <h2 className="text-lg font-semibold">ML Model Performance</h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Model",    value: modelInfo.model_name || "Random Forest", icon: BrainCircuit, color: "text-brand-400" },
                    { label: "Accuracy", value: `${modelInfo.accuracy}%`,                icon: TrendingUp,   color: "text-emerald-400" },
                    { label: "F1 Score", value: `${modelInfo.f1_score}%`,                icon: BarChart3,    color: "text-teal-400" },
                    { label: "Dataset",  value: `${modelInfo.dataset_size} rows`,         icon: Users,        color: "text-amber-400" },
                  ].map((item) => (
                    <Card key={item.label} className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-ink-400 font-medium uppercase tracking-wide">{item.label}</p>
                        <item.icon size={16} className={item.color} />
                      </div>
                      <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                    </Card>
                  ))}
                </div>

                <Card className="p-6">
                  <CardTitle className="text-base font-semibold mb-4">Model Details</CardTitle>
                  <div className="space-y-3">
                    {[
                      ["Model Type",    modelInfo.model_type || "RandomForestClassifier"],
                      ["Features Used", `${modelInfo.features_used} features`],
                      ["Training Size", `${modelInfo.dataset_size} samples`],
                      ["Accuracy",      `${modelInfo.accuracy}%`],
                      ["F1 Score",      `${modelInfo.f1_score}%`],
                    ].map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                        <span className="text-sm text-ink-400">{key}</span>
                        <span className="text-sm font-medium text-ink-200">{val}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* WhatsApp Alert Modal */}
      <WhatsAppAlertModal
        student={alertStudent}
        isOpen={!!alertStudent}
        onClose={() => setAlertStudent(null)}
        onSent={handleAlertSent}
      />

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl bg-[#1a2a1a] border border-[#25D366]/30 text-sm font-medium text-white whitespace-nowrap"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#25D366] text-black shrink-0">
              <Check size={13} strokeWidth={3} />
            </span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
