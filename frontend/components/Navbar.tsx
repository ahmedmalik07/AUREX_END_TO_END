"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { PitchModeToggle } from "@/components/PitchModeToggle"
import { AuthButton } from "@/components/AuthModal"
import { BookOpen, BarChart3, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const pathname = usePathname()

  const nav = [
    { href: "/learner", label: "Learner", icon: BookOpen },
    { href: "/course", label: "Course", icon: GraduationCap },
    { href: "/instructor", label: "Instructor", icon: BarChart3 },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-bold text-lg tracking-tight">
          <img src="/logo.png" alt="atomcamp" className="h-8 w-auto object-contain" />
          <span className="text-ink-100">Smart<span className="text-brand-400">LMS</span></span>
        </Link>

        <div className="flex items-center gap-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" size="sm" className={cn(pathname === item.href && "text-brand-400 bg-white/[0.05]")}>
                <item.icon size={16} className="mr-2" />
                {item.label}
              </Button>
            </Link>
          ))}
          <div className="ml-2 pl-2 border-l border-white/[0.06] flex items-center gap-2">
            <PitchModeToggle />
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
