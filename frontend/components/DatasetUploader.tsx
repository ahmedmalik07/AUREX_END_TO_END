"use client"

import { useCallback, useState, useEffect } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useApi } from "@/hooks/useApi"
import { Upload, FileText, Loader2 } from "lucide-react"

export default function DatasetUploader({ onUpload }: { onUpload: (path: string, data: any) => void }) {
  const { upload, post, loading } = useApi()
  const [dragActive, setDragActive] = useState(false)
  const [uploadedPath, setUploadedPath] = useState<string>("")

  const analyzeDemo = async () => {
    const res = await post("/analyze", {})
    if (res) {
      setUploadedPath("demo")
      onUpload("demo", res)
    }
  }

  useEffect(() => {
    analyzeDemo()
  }, [])

  const handleFile = async (file: File) => {
    const res = await upload("/upload-dataset", file)
    if (res) {
      setUploadedPath(res.path)
      const analysis = await post("/analyze", { file_path: res.path })
      if (analysis) onUpload(res.path, analysis)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
  }, [])

  return (
    <Card
      className={`p-8 text-center border-dashed ${dragActive ? "border-brand-400 bg-brand-500/5" : "border-white/20"}`}
      onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="p-3 rounded-full bg-white/5 text-brand-400">
          {loading ? <Loader2 className="animate-spin" size={28} /> : <Upload size={28} />}
        </div>
        <div>
          <p className="font-medium text-ink-200">Drag & drop your cohort CSV here</p>
          <p className="text-sm text-ink-500 mt-1">or use the demo data already loaded below</p>
        </div>
        <input
          type="file"
          accept=".csv"
          className="hidden"
          id="csv-upload"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        <label htmlFor="csv-upload">
          <Button variant="outline" asChild>
            <span>Select File</span>
          </Button>
        </label>
        {uploadedPath && (
          <div className="flex items-center gap-2 text-sm text-accent-400 mt-2">
            <FileText size={16} />
            <span>{uploadedPath === "demo" ? "Demo dataset loaded" : "Analysis ready"}</span>
          </div>
        )}
      </div>
    </Card>
  )
}
