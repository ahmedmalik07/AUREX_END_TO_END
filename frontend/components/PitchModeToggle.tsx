"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Presentation } from "lucide-react"

interface PitchModeContextType {
  pitchMode: boolean
  setPitchMode: (v: boolean) => void
}

const PitchModeContext = createContext<PitchModeContextType>({
  pitchMode: false,
  setPitchMode: () => {},
})

export function PitchModeProvider({ children }: { children: React.ReactNode }) {
  const [pitchMode, setPitchMode] = useState(false)

  useEffect(() => {
    if (pitchMode) {
      document.documentElement.classList.add("pitch-mode")
    } else {
      document.documentElement.classList.remove("pitch-mode")
    }
  }, [pitchMode])

  return (
    <PitchModeContext.Provider value={{ pitchMode, setPitchMode }}>
      {children}
      <div className="fixed bottom-6 right-6 pointer-events-none opacity-0 pitch-watermark">
        <div className="px-4 py-2 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-sm font-semibold tracking-widest uppercase">
          Live Demo
        </div>
      </div>
    </PitchModeContext.Provider>
  )
}

export function usePitchMode() {
  return useContext(PitchModeContext)
}

export function PitchModeToggle() {
  const { pitchMode, setPitchMode } = usePitchMode()
  return (
    <Button variant="ghost" size="sm" onClick={() => setPitchMode(!pitchMode)} className={pitchMode ? "text-brand-400" : ""}>
      <Presentation size={16} className="mr-2" />
      {pitchMode ? "Pitch: ON" : "Pitch Mode"}
    </Button>
  )
}
