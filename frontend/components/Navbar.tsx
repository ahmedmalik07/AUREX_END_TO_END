"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { PitchModeToggle } from "@/components/PitchModeToggle"
import { AuthButton } from "@/components/AuthModal"
import { LangToggle, useLang } from "@/components/LanguageContext"
import { LiteModeToggle } from "@/components/LiteModeContext"
import { BookOpen, BarChart3, GraduationCap, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const pathname = usePathname()
  const { t } = useLang()

  const nav = [
    { href: "/learner",    labelKey: "nav_learner",     icon: BookOpen },
    { href: "/course",     labelKey: "nav_course",      icon: GraduationCap },
    { href: "/instructor", labelKey: "nav_instructor",  icon: BarChart3 },
    { href: "/alumni",     labelKey: "nav_alumni",      icon: Users },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight shrink-0">
          <img src="/logo.png" alt="atomcamp" className="h-8 w-auto object-contain" />
          <span className="text-ink-100 hidden sm:inline">Smart<span className="text-brand-400">LMS</span></span>
        </Link>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "whitespace-nowrap text-xs sm:text-sm",
                  pathname === item.href && "text-brand-400 bg-white/[0.05]"
                )}
              >
                <item.icon size={14} className="mr-1.5 shrink-0" />
                <span className="hidden sm:inline">{t(item.labelKey)}</span>
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0 pl-1 border-l border-white/[0.06]">
          <LangToggle />
          <LiteModeToggle />
          <PitchModeToggle />
          <AuthButton />
        </div>
      </div>
    </nav>
  )
}
