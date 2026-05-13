"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import {
  BookOpen,
  Clock,
  Layers,
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
  Eye,
  Ear,
  BookOpenText,
  Hand,
  TrendingUp,
  Award,
  Users,
} from "lucide-react"
import {
  COURSE_TITLE,
  COURSE_SUBTITLE,
  COURSE_PRICE,
  COURSE_DURATION,
  COURSE_LESSONS,
  COURSE_HOURS,
  COURSE_SYLLABUS,
  COURSE_FEATURES,
  ADAPTATION_HINTS,
} from "@/lib/courseData"
import { LearningStyle } from "@/types"

const STYLE_ICONS: Record<LearningStyle, any> = {
  visual: Eye,
  auditory: Ear,
  reading: BookOpenText,
  kinesthetic: Hand,
}

const STYLE_COLORS: Record<LearningStyle, string> = {
  visual: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  auditory: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  reading: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  kinesthetic: "text-amber-400 bg-amber-500/10 border-amber-500/20",
}

const STYLE_LABELS: Record<LearningStyle, string> = {
  visual: "Visual Learner",
  auditory: "Auditory Learner",
  reading: "Reading Learner",
  kinesthetic: "Kinesthetic Learner",
}

export default function CourseCatalog({
  dominantStyle,
  onEnroll,
}: {
  dominantStyle: LearningStyle
  onEnroll: () => void
}) {
  const StyleIcon = STYLE_ICONS[dominantStyle]
  const styleColor = STYLE_COLORS[dominantStyle]
  const adaptationHints = ADAPTATION_HINTS[dominantStyle]

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500/10 via-accent-500/5 to-transparent border border-white/[0.08] p-8 md:p-12"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Badge className="mb-4 bg-white/5 border-white/10 text-ink-300">
            <Zap size={12} className="mr-1 text-brand-400" /> Bestseller
          </Badge>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="gradient-text">{COURSE_TITLE}</span>
          </h1>
          <p className="text-lg text-ink-400 max-w-2xl mb-6">{COURSE_SUBTITLE}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-ink-400 mb-8">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-amber-400 fill-amber-400" />
              <span className="font-medium text-ink-200">4.9</span>
              <span>(2,847 reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-brand-400" />
              <span>12,500+ enrolled</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-accent-400" />
              <span>{COURSE_HOURS}+ hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-rose-400" />
              <span>{COURSE_LESSONS} lessons</span>
            </div>
          </div>

          {/* Your Learning Style Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl border ${styleColor} mb-8`}
          >
            <StyleIcon size={24} />
            <div>
              <p className="text-sm font-medium">Your Learning Style Detected</p>
              <p className="text-lg font-bold">{STYLE_LABELS[dominantStyle]}</p>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-3xl font-bold text-ink-100">
              PKR {COURSE_PRICE.toLocaleString()}
              <span className="text-base text-ink-500 font-normal line-through ml-2">PKR 45,000</span>
            </div>
            <Button size="lg" className="gap-2 px-8" onClick={onEnroll}>
              Enroll Now <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Personalized Adaptation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-brand-400" />
          Personalized for Your {STYLE_LABELS[dominantStyle]} Brain
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adaptationHints.map((hint, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Card className="p-4 h-full border-white/[0.06] hover:border-brand-500/20 transition-all">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${styleColor.split(" ").slice(1).join(" ")}`}>
                    <CheckCircle size={16} className={styleColor.split(" ")[0]} />
                  </div>
                  <p className="text-sm text-ink-300 leading-relaxed">{hint}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* What You'll Learn */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Award size={20} className="text-accent-400" />
          What You Will Learn
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COURSE_FEATURES.map((feature, i) => (
            <Card key={i} className="p-4 text-center border-white/[0.06]">
              <CheckCircle size={20} className="text-brand-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-ink-200">{feature}</p>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Syllabus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-brand-400" />
          Course Curriculum
        </h2>
        <div className="space-y-4">
          {COURSE_SYLLABUS.map((week, i) => (
            <motion.div
              key={week.week}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <Card className="p-5 border-white/[0.06] hover:border-brand-500/20 transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{week.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-ink-100">
                        Week {week.week}: {week.title}
                      </h3>
                      <Badge variant="default" className="text-xs">
                        {week.topics.length} topics
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {week.topics.map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-ink-400 border border-white/[0.06]"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center py-8"
      >
        <p className="text-ink-400 mb-4">
          Start your programming journey today — adapted perfectly for how you learn.
        </p>
        <Button size="lg" className="gap-2 px-10" onClick={onEnroll}>
          <Zap size={18} /> Enroll for PKR {COURSE_PRICE.toLocaleString()}
        </Button>
        <p className="text-xs text-ink-500 mt-3">30-day money-back guarantee • Lifetime access</p>
      </motion.div>
    </div>
  )
}
