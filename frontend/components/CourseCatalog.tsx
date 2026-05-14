"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import {
  Clock, Layers, Zap, Star, CheckCircle, ArrowRight,
  Eye, Ear, BookOpenText, Hand, TrendingUp, Award, Users, BookOpen,
} from "lucide-react"
import { ALL_COURSES, COURSE_REGISTRY } from "@/lib/courses"
import { LearningStyle } from "@/types"

const STYLE_ICONS: Record<LearningStyle, any> = {
  visual: Eye, auditory: Ear, reading: BookOpenText, kinesthetic: Hand,
}
const STYLE_COLORS: Record<LearningStyle, string> = {
  visual: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  auditory: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  reading: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  kinesthetic: "text-amber-400 bg-amber-500/10 border-amber-500/20",
}
const STYLE_LABELS: Record<LearningStyle, string> = {
  visual: "Visual Learner", auditory: "Auditory Learner",
  reading: "Reading Learner", kinesthetic: "Kinesthetic Learner",
}
const LEVEL_COLORS: Record<string, string> = {
  Beginner: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  Advanced: "bg-rose-500/10 text-rose-300 border-rose-500/20",
}

export default function CourseCatalog({
  dominantStyle,
  onEnroll,
}: {
  dominantStyle: LearningStyle
  onEnroll: (courseId: string) => void
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const StyleIcon = STYLE_ICONS[dominantStyle]
  const styleColor = STYLE_COLORS[dominantStyle]
  const selected = selectedId ? COURSE_REGISTRY[selectedId] : null

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${styleColor}`}>
            <StyleIcon size={18} />
            <span className="text-sm font-semibold">{STYLE_LABELS[dominantStyle]} — courses adapted for you</span>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="gradient-text">Choose Your Course</span>
        </h1>
        <p className="text-ink-400">All courses use VARK adaptive learning — every lesson delivered in your style.</p>
      </motion.div>

      {/* Course Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {ALL_COURSES.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card
              className={`p-5 cursor-pointer transition-all hover:border-brand-500/30 flex flex-col h-full ${
                selectedId === course.id ? "border-brand-500/50 bg-brand-500/[0.04]" : "border-white/[0.08]"
              }`}
              onClick={() => setSelectedId(selectedId === course.id ? null : course.id)}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-3xl">{course.icon}</span>
                <Badge className={`text-xs border ${LEVEL_COLORS[course.level]}`}>{course.level}</Badge>
              </div>

              <h2 className="font-bold text-ink-100 text-base leading-snug mb-1">{course.title}</h2>
              <p className="text-xs text-ink-500 leading-relaxed mb-4 flex-1">{course.subtitle}</p>

              <div className="flex items-center gap-3 text-xs text-ink-400 mb-4">
                <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                <span className="flex items-center gap-1"><Layers size={11} /> {course.lessons} lessons</span>
                <span className="flex items-center gap-1"><Star size={11} className="text-amber-400" /> 4.9</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {course.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/[0.04] text-ink-500 border border-white/[0.06]">{tag}</span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-ink-100">PKR {course.price.toLocaleString()}</span>
                <Button
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); onEnroll(course.id) }}
                  className="gap-1 text-xs"
                >
                  Enroll <ArrowRight size={12} />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Expanded course detail */}
      {selected && (
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Hero */}
          <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${selected.color} border border-white/[0.08] p-8`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{selected.icon}</span>
                <Badge className="bg-white/5 border-white/10 text-ink-300">
                  <Zap size={12} className="mr-1 text-brand-400" /> Bestseller
                </Badge>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">{selected.title}</h2>
              <p className="text-ink-400 max-w-2xl mb-5">{selected.subtitle}</p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-ink-400 mb-6">
                <span className="flex items-center gap-1.5"><Star size={14} className="text-amber-400 fill-amber-400" /><span className="text-ink-200 font-medium">4.9</span> (2,400+ reviews)</span>
                <span className="flex items-center gap-1.5"><Users size={14} className="text-brand-400" />12,500+ enrolled</span>
                <span className="flex items-center gap-1.5"><Clock size={14} />{selected.hours}+ hours</span>
                <span className="flex items-center gap-1.5"><Layers size={14} />{selected.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-2xl font-bold text-ink-100">
                  PKR {selected.price.toLocaleString()}
                  <span className="text-base text-ink-500 font-normal line-through ml-2">PKR {Math.round(selected.price * 1.4).toLocaleString()}</span>
                </span>
                <Button size="lg" className="gap-2 px-8" onClick={() => onEnroll(selected.id)}>
                  Enroll Now <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* Adaptation hints */}
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <TrendingUp size={18} className="text-brand-400" />
              Personalized for {STYLE_LABELS[dominantStyle]}s
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {selected.adaptationHints[dominantStyle].map((hint, i) => (
                <Card key={i} className="p-4 border-white/[0.06]">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={15} className="text-brand-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-ink-300">{hint}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {selected.features.map((f, i) => (
              <Card key={i} className="p-4 text-center border-white/[0.06]">
                <CheckCircle size={18} className="text-brand-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-ink-200">{f}</p>
              </Card>
            ))}
          </div>

          {/* Syllabus */}
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-brand-400" /> Course Curriculum
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {selected.syllabus.map((week) => (
                <Card key={week.week} className="p-5 border-white/[0.06] hover:border-brand-500/20 transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{week.icon}</span>
                    <div>
                      <p className="font-semibold text-ink-100 mb-2">Week {week.week}: {week.title}</p>
                      <div className="flex flex-wrap gap-1">
                        {week.topics.map((t) => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/[0.04] text-ink-400 border border-white/[0.06]">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center py-6">
            <Button size="lg" className="gap-2 px-12" onClick={() => onEnroll(selected.id)}>
              <Zap size={18} /> Enroll for PKR {selected.price.toLocaleString()}
            </Button>
            <p className="text-xs text-ink-500 mt-3">30-day money-back guarantee · Lifetime access</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
