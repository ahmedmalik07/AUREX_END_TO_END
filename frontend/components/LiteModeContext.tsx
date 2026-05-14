"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface LiteModeCtx {
  liteMode: boolean
  toggleLiteMode: () => void
}

const LiteModeContext = createContext<LiteModeCtx>({
  liteMode: false,
  toggleLiteMode: () => {},
})

export function LiteModeProvider({ children }: { children: ReactNode }) {
  const [liteMode, setLiteMode] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("lite_mode")
    if (stored === "true") setLiteMode(true)
  }, [])

  const toggleLiteMode = () => {
    setLiteMode((prev) => {
      const next = !prev
      localStorage.setItem("lite_mode", String(next))
      return next
    })
  }

  return (
    <LiteModeContext.Provider value={{ liteMode, toggleLiteMode }}>
      {children}
    </LiteModeContext.Provider>
  )
}

export function useLiteMode() {
  return useContext(LiteModeContext)
}

/* Compact pill toggle — same style as LangToggle */
export function LiteModeToggle() {
  const { liteMode, toggleLiteMode } = useLiteMode()
  return (
    <button
      onClick={toggleLiteMode}
      title={liteMode ? "Switch to Full mode (animations on)" : "Switch to Lite mode (animations off)"}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
    >
      <span className="text-xs font-mono font-bold text-brand-300">
        {liteMode ? "LITE" : "FULL"}
      </span>
    </button>
  )
}
