"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import {
  BookOpen,
  BarChart3,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  TrendingUp,
  Users,
  Zap,
  Target,
  Layers,
} from "lucide-react"
import dynamic from "next/dynamic"

const Hero3DModel = dynamic(() => import("@/components/Hero3DModel"), { ssr: false })

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "Cognitive Profiling",
    desc: "VARK-based assessment that understands how you learn best — visual, auditory, reading, or kinesthetic.",
    color: "text-brand-500",
    bg: "bg-brand-500/10",
    ring: "ring-brand-500/20",
  },
  {
    icon: Target,
    title: "Hyper-Personalized Paths",
    desc: "AI-generated learning sprints built from atomcamp's real catalog with PKR pricing and milestones.",
    color: "text-brand-500",
    bg: "bg-brand-500/10",
    ring: "ring-brand-500/20",
  },
  {
    icon: TrendingUp,
    title: "Risk Prediction",
    desc: "Random Forest model trains instantly on cohort data to surface at-risk students before they drop out.",
    color: "text-brand-500",
    bg: "bg-brand-500/10",
    ring: "ring-brand-500/20",
  },
  {
    icon: Zap,
    title: "Offline-First ML",
    desc: "No external AI APIs required. Everything runs locally — fast, private, and fully under your control.",
    color: "text-brand-500",
    bg: "bg-brand-500/10",
    ring: "ring-brand-500/20",
  },
]

const STATS = [
  { label: "Learners Trained", value: "6,000+", suffix: "" },
  { label: "Women in Tech", value: "65", suffix: "%" },
  { label: "Graduation Rate", value: "70", suffix: "%" },
  { label: "Cohorts Completed", value: "26", suffix: "+" },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16 items-center mb-32"
        >
          <div className="text-left z-10 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-8"
            >
              <Sparkles size={14} />
              AUREX AI 2026 Showcase
            </motion.div>

            <motion.img
              src="/logo.png"
              alt="atomcamp"
              className="h-16 w-auto mb-8 object-contain opacity-90 mx-auto md:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            />

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              <span className="gradient-text">
                Learning That Adapts
              </span>
              <br />
              <span className="text-ink-100">To Every Mind</span>
            </h1>
            <p className="text-lg md:text-xl text-ink-400 max-w-xl leading-relaxed mb-10 mx-auto md:mx-0">
              An intelligent LMS that personalizes curricula based on cognitive profiles
              and predicts at-risk students before they fall behind.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link href="/learner">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Start Onboarding <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/instructor">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                  <BarChart3 size={18} /> Instructor Dashboard
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative w-full h-full flex justify-center items-center">
            <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-[100px] pointer-events-none opacity-50" />
            <Hero3DModel />
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Built for Real Impact</h2>
            <p className="text-ink-400 max-w-lg mx-auto">
              Not just another EdTech demo. Every feature solves a real problem atomcamp instructors face daily.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <Card className="p-6 h-full hover:bg-white/[0.05] transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${f.bg} ${f.color} ring-1 ${f.ring} shrink-0`}>
                      <f.icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-brand-300 transition-colors">
                        {f.title}
                      </h3>
                      <p className="text-sm text-ink-400 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Two Paths */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Choose Your Portal</h2>
            <p className="text-ink-400 max-w-lg mx-auto">
              Two interfaces, one unified intelligence engine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Link href="/learner">
              <Card className="p-8 hover:border-brand-500/30 transition-all group relative overflow-hidden h-full cursor-pointer gradient-border">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/20">
                    <BookOpen size={28} />
                  </div>
                  <h2 className="text-2xl font-semibold">Learner Onboarding</h2>
                </div>
                <p className="text-ink-400 mb-8 leading-relaxed text-sm">
                  Answer 6 questions + a 12-question cognitive assessment. Get a visual learning path
                  built from atomcamp's real catalog — with PKR pricing, milestones, and skill badges.
                </p>
                <div className="flex items-center text-sm font-medium text-brand-400 group-hover:gap-3 gap-2 transition-all">
                  Start Your Journey <ArrowRight size={16} />
                </div>
              </Card>
            </Link>

            <Link href="/instructor">
              <Card className="p-8 hover:border-rose-500/30 transition-all group relative overflow-hidden h-full cursor-pointer gradient-border">
                <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20">
                    <BarChart3 size={28} />
                  </div>
                  <h2 className="text-2xl font-semibold">Instructor Intelligence</h2>
                </div>
                <p className="text-ink-400 mb-8 leading-relaxed text-sm">
                  Upload a cohort CSV. Our Random Forest model trains instantly and surfaces at-risk
                  students with recommended interventions and downloadable reports.
                </p>
                <div className="flex items-center text-sm font-medium text-rose-400 group-hover:gap-3 gap-2 transition-all">
                  Open Dashboard <ArrowRight size={16} />
                </div>
              </Card>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="mb-20"
        >
          <div className="glass p-8 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-xs md:text-sm text-ink-500 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-ink-500 text-sm">
          <p>Built for AUREX AI 2026 • AtomCamp Adaptive LMS</p>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-brand-400" />
            <span>Offline ML • No external AI APIs</span>
          </div>
        </div>
      </div>
    </div>
  )
}
