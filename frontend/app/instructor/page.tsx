"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import DatasetUploader from "@/components/DatasetUploader"
import CohortOverview from "@/components/CohortOverview"
import RiskTable from "@/components/RiskTable"
import InterventionPanel from "@/components/InterventionPanel"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Download, Info, BarChart3 } from "lucide-react"

export default function InstructorPage() {
  const [analysis, setAnalysis] = useState<any>(null)
  const [filePath, setFilePath] = useState<string>("")

  const handleExport = async () => {
    try {
      const res = await fetch("http://localhost:8002/export-interventions", {
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
    } catch (e) {
      alert("Export failed")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-rose-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="text-rose-400" size={28} />
          <h1 className="text-3xl font-bold">Instructor Intelligence</h1>
        </div>
        <p className="text-ink-400">Upload a cohort CSV to surface at-risk students and model insights.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DatasetUploader onUpload={(path, data) => { setFilePath(path); setAnalysis(data) }} />
      </motion.div>

      {analysis && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 space-y-8"
        >
          <CohortOverview students={analysis.students} modelInfo={analysis.model_info} />

          <InterventionPanel students={analysis.students} />

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Risk Breakdown</h2>
            <Button variant="outline" onClick={handleExport}>
              <Download size={16} className="mr-2" /> Export Interventions
            </Button>
          </div>
          <RiskTable students={analysis.students} />
        </motion.div>
      )}

      {!analysis && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mt-8 p-6 flex items-start gap-4 text-ink-400">
            <Info className="text-brand-400 shrink-0 mt-1" size={20} />
            <p>No dataset loaded. Upload a CSV above or the demo data will load automatically after upload.</p>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
