"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { Lang, t as translateFn } from "@/lib/romanUrdu"

interface LangCtx {
  lang: Lang
  toggle: () => void
  t: (key: string) => string
}

const LangContext = createContext<LangCtx>({
  lang: "en",
  toggle: () => {},
  t: (k) => k,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
  const toggle = () => setLang((l) => (l === "en" ? "ur" : "en"))
  const t = (key: string) => translateFn(key, lang)
  return <LangContext.Provider value={{ lang, toggle, t }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

/* Compact pill toggle for the Navbar */
export function LangToggle() {
  const { lang, toggle } = useLang()
  return (
    <button
      onClick={toggle}
      title={lang === "en" ? "Roman Urdu mein switch karein" : "Switch to English"}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
    >
      <span className="text-xs font-mono font-bold text-brand-300">{lang === "en" ? "EN" : "UR"}</span>
      <div className="flex flex-col gap-[2px]">
        <span className={`text-[9px] leading-none font-bold transition-colors ${lang === "en" ? "text-brand-400" : "text-ink-600"}`}>EN</span>
        <span className={`text-[9px] leading-none font-bold transition-colors ${lang === "ur" ? "text-brand-400" : "text-ink-600"}`}>UR</span>
      </div>
    </button>
  )
}
