"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { useLang } from "@/components/LanguageContext"
import {
  BookOpen,
  BarChart3,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  TrendingUp,
  Zap,
  Target,
} from "lucide-react"
import dynamic from "next/dynamic"

const Hero3DModel = dynamic(() => import("@/components/Hero3DModel"), { ssr: false })
const ButterflyBackground = dynamic(() => import("@/components/ButterflyBackground"), { ssr: false })

export default function HomePage() {
  const { t } = useLang()

  const FEATURES = [
    { icon: BrainCircuit, titleKey: "feat_cognitive", desc: "VARK-based assessment that understands how you learn best — visual, auditory, reading, or kinesthetic.", color: "text-brand-500", bg: "bg-brand-500/10", ring: "ring-brand-500/20" },
    { icon: Target,       titleKey: "feat_paths",     desc: "AI-generated learning sprints built from atomcamp's real catalog with PKR pricing and milestones.",     color: "text-brand-500", bg: "bg-brand-500/10", ring: "ring-brand-500/20" },
    { icon: TrendingUp,   titleKey: "feat_risk",      desc: "Random Forest model trains instantly on cohort data to surface at-risk students before they drop out.",   color: "text-brand-500", bg: "bg-brand-500/10", ring: "ring-brand-500/20" },
    { icon: Zap,          titleKey: "feat_offline",   desc: "No external AI APIs required. Everything runs locally — fast, private, and fully under your control.",     color: "text-brand-500", bg: "bg-brand-500/10", ring: "ring-brand-500/20" },
  ]

  const STATS = [
    { labelKey: "stat_learners",   value: "6,000+", suffix: "" },
    { labelKey: "stat_women",      value: "65",      suffix: "%" },
    { labelKey: "stat_graduation", value: "70",      suffix: "%" },
    { labelKey: "stat_cohorts",    value: "26",      suffix: "+" },
  ]

  return (
    <div className="relative">
      <ButterflyBackground />
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16 items-center mb-32"
        >
          <div className="z-10 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-8"
            >
              <Sparkles size={14} />
              {t("hero_badge")}
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
              <span className="gradient-text">{t("hero_h1_line1")}</span>
              <br />
              <span className="text-ink-100">{t("hero_h1_line2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-ink-400 max-w-xl leading-relaxed mb-10 mx-auto md:mx-0">
              {t("hero_subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link href="/learner">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  {t("hero_start")} <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/instructor">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                  <BarChart3 size={18} /> {t("hero_dashboard")}
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative w-full h-full flex justify-center items-center min-h-[500px] md:min-h-[750px]">
            <div className="absolute inset-0 bg-brand-500/15 rounded-full blur-[120px] pointer-events-none opacity-60" />
            <div className="absolute inset-0 bg-brand-400/8 rounded-full blur-[150px] pointer-events-none opacity-40" />
            <Hero3DModel />
          </div>
        </motion.div>

        <div className="relative" id="butterfly-section">
          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{t("features_heading")}</h2>
              <p className="text-ink-400 max-w-lg mx-auto">{t("features_sub")}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {FEATURES.map((f, i) => (
                <motion.div key={f.titleKey} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}>
                  <Card className="p-6 h-full hover:bg-white/[0.05] transition-colors group relative z-10">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${f.bg} ${f.color} ring-1 ${f.ring} shrink-0`}>
                        <f.icon size={22} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1 group-hover:text-brand-300 transition-colors">
                          {t(f.titleKey)}
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
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{t("paths_heading")}</h2>
              <p className="text-ink-400 max-w-lg mx-auto">{t("paths_sub")}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Link href="/learner">
                <Card className="p-8 hover:border-brand-500/30 transition-all group relative overflow-hidden h-full cursor-pointer gradient-border z-10">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/20">
                      <BookOpen size={28} />
                    </div>
                    <h2 className="text-2xl font-semibold">{t("learner_title")}</h2>
                  </div>
                  <p className="text-ink-400 mb-8 leading-relaxed text-sm">{t("learner_desc")}</p>
                  <div className="flex items-center text-sm font-medium text-brand-400 group-hover:gap-3 gap-2 transition-all">
                    {t("learner_cta")} <ArrowRight size={16} />
                  </div>
                </Card>
              </Link>

              <Link href="/instructor">
                <Card className="p-8 hover:border-rose-500/30 transition-all group relative overflow-hidden h-full cursor-pointer gradient-border z-10">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20">
                      <BarChart3 size={28} />
                    </div>
                    <h2 className="text-2xl font-semibold">{t("instructor_title")}</h2>
                  </div>
                  <p className="text-ink-400 mb-8 leading-relaxed text-sm">{t("instructor_desc")}</p>
                  <div className="flex items-center text-sm font-medium text-rose-400 group-hover:gap-3 gap-2 transition-all">
                    {t("instructor_cta")} <ArrowRight size={16} />
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
            <div className="glass p-8 md:p-10 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.labelKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-xs md:text-sm text-ink-500 font-medium uppercase tracking-wider">
                      {t(stat.labelKey)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-ink-500 text-sm relative z-10">
            <p>{t("footer_built")}</p>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-brand-400" />
              <span>{t("footer_offline")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
