"use client"

import { useEffect, useRef, useState } from "react"

export default function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    if (!chart || !containerRef.current) return

    let cancelled = false

    const renderChart = async () => {
      try {
        const mermaid = (await import("mermaid")).default
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            primaryColor: "#8b5cf6",
            primaryTextColor: "#e2e8f0",
            primaryBorderColor: "#a78bfa",
            lineColor: "#a78bfa",
            secondaryColor: "#22d3ee",
            tertiaryColor: "#1e1e2e",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
          },
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: "basis",
          },
        })

        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
        const { svg } = await mermaid.render(id, chart.trim())
        if (!cancelled) {
          setSvg(svg)
          setError("")
        }
      } catch (err: any) {
        if (!cancelled) {
          setError("Could not render diagram")
          console.error("Mermaid error:", err)
        }
      }
    }

    renderChart()
    return () => { cancelled = true }
  }, [chart])

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-ink-400 text-sm">
        <p className="font-medium mb-1">Diagram</p>
        <pre className="text-xs opacity-70">{chart}</pre>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 overflow-x-auto">
      <div
        ref={containerRef}
        className="flex justify-center"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  )
}
