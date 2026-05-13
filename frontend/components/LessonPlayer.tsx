"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import MermaidDiagram from "./MermaidDiagram"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  CheckCircle,
  Play,
  Eye,
  Ear,
  BookOpenText,
  Hand,
  Lightbulb,
  RotateCcw,
} from "lucide-react"
import { Lesson, LearningStyle, QuizQuestion } from "@/types"

const STYLE_CONFIG: Record<LearningStyle, { icon: any; label: string; color: string; bg: string }> = {
  visual: { icon: Eye, label: "Visual Mode", color: "text-purple-400", bg: "bg-purple-500/10" },
  auditory: { icon: Ear, label: "Audio Mode", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  reading: { icon: BookOpenText, label: "Reading Mode", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  kinesthetic: { icon: Hand, label: "Hands-On Mode", color: "text-amber-400", bg: "bg-amber-500/10" },
}

export default function LessonPlayer({
  lesson,
  learningStyle,
  onComplete,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  isCompleted,
}: {
  lesson: Lesson
  learningStyle: LearningStyle
  onComplete: () => void
  onNext: () => void
  onPrev: () => void
  hasNext: boolean
  hasPrev: boolean
  isCompleted: boolean
}) {
  const [activeTab, setActiveTab] = useState<LearningStyle>(learningStyle)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [showQuizResults, setShowQuizResults] = useState(false)
  const [codeOutput, setCodeOutput] = useState<string>("")
  const [showOutput, setShowOutput] = useState<number | null>(null)

  const styleConfig = STYLE_CONFIG[activeTab]
  const StyleIcon = styleConfig.icon

  const content = lesson.content[activeTab]

  const handleQuizAnswer = (qIndex: number, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }))
  }

  const correctAnswers = lesson.quiz.filter((q, i) => quizAnswers[i] === q.correctIndex).length

  const runCode = (exampleIndex: number) => {
    setShowOutput(exampleIndex)
    setCodeOutput(lesson.codeExamples[exampleIndex]?.output || "Output will appear here...")
  }

  const tabs: LearningStyle[] = ["visual", "auditory", "reading", "kinesthetic"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={lesson.difficulty === "beginner" ? "success" : lesson.difficulty === "medium" ? "warning" : "default"}>
              {lesson.difficulty}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-ink-400">
              <Clock size={12} />
              {lesson.duration} min
            </div>
            {isCompleted && (
              <Badge variant="success" className="gap-1">
                <CheckCircle size={10} /> Completed
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold text-ink-100">{lesson.title}</h1>
          <p className="text-ink-400 mt-1">{lesson.description}</p>
        </div>
      </div>

      {/* Learning Style Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white/[0.03] rounded-xl">
        {tabs.map((tab) => {
          const config = STYLE_CONFIG[tab]
          const TabIcon = config.icon
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 justify-center ${
                isActive
                  ? `${config.bg} ${config.color} ring-1 ring-white/10`
                  : "text-ink-500 hover:text-ink-300 hover:bg-white/[0.04]"
              }`}
            >
              <TabIcon size={14} />
              <span className="capitalize hidden sm:inline">{tab}</span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + lesson.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="p-6 border-white/[0.06]">
            {/* Style indicator */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${styleConfig.bg} ${styleConfig.color} text-sm font-medium mb-6`}>
              <StyleIcon size={14} />
              {styleConfig.label}
            </div>

            {/* Main content */}
            <div className="prose prose-invert prose-sm max-w-none">
              {content.replace(/\\n/g, "\n").split("\n").map((line, i) => {
                const trimmed = line.trim()
                if (trimmed.startsWith("## ")) {
                  return <h2 key={i} className="text-xl font-bold text-ink-100 mt-6 mb-3">{trimmed.replace("## ", "")}</h2>
                }
                if (trimmed.startsWith("### ")) {
                  return <h3 key={i} className="text-lg font-semibold text-ink-200 mt-5 mb-2">{trimmed.replace("### ", "")}</h3>
                }
                if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                  return <p key={i} className="font-bold text-ink-200">{trimmed.replace(/\*\*/g, "")}</p>
                }
                if (trimmed.startsWith("- ")) {
                  return <li key={i} className="text-ink-300 ml-4">{trimmed.replace("- ", "")}</li>
                }
                if (trimmed.startsWith("|")) {
                  return null // Skip table lines for now
                }
                if (trimmed === "") {
                  return <div key={i} className="h-2" />
                }
                return <p key={i} className="text-ink-300 leading-relaxed">{trimmed}</p>
              })}
            </div>

            {/* Diagram */}
            {lesson.diagram && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-ink-300 mb-3 flex items-center gap-2">
                  <Lightbulb size={14} className="text-brand-400" /> Concept Diagram
                </h3>
                <MermaidDiagram chart={lesson.diagram} />
              </div>
            )}

            {/* Code Examples */}
            {lesson.codeExamples.length > 0 && (
              <div className="mt-8 space-y-4">
                <h3 className="text-sm font-semibold text-ink-300 flex items-center gap-2">
                  <BookOpen size={14} className="text-brand-400" /> Code Examples
                </h3>
                {lesson.codeExamples.map((example, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-white/[0.08]">
                    <div className="bg-white/[0.04] px-4 py-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-ink-300">{example.title}</span>
                      <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={() => runCode(i)}>
                        <Play size={12} /> Run
                      </Button>
                    </div>
                    <pre className="bg-[#0d1117] p-4 text-sm overflow-x-auto">
                      <code className="text-ink-200 whitespace-pre">{example.code.replace(/\\n/g, "\n")}</code>
                    </pre>
                    <AnimatePresence>
                      {showOutput === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-black/30 border-t border-white/[0.06]"
                        >
                          <div className="px-4 py-3">
                            <p className="text-xs text-ink-500 mb-1">Output:</p>
                            <pre className="text-sm text-emerald-400 whitespace-pre">{codeOutput.replace(/\\n/g, "\n")}</pre>
                          </div>
                          <div className="px-4 pb-3">
                            <p className="text-xs text-ink-400">{example.explanation}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}

            {/* Quiz */}
            {lesson.quiz.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-ink-300 mb-4 flex items-center gap-2">
                  <Lightbulb size={14} className="text-brand-400" /> Quick Quiz
                </h3>
                <div className="space-y-4">
                  {lesson.quiz.map((q, qIndex) => (
                    <div key={qIndex} className="bg-white/[0.03] rounded-xl p-4">
                      <p className="text-sm font-medium text-ink-200 mb-3">
                        {qIndex + 1}. {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((opt, oIndex) => {
                          const isSelected = quizAnswers[qIndex] === oIndex
                          const isCorrect = q.correctIndex === oIndex
                          const showResult = showQuizResults && isSelected
                          return (
                            <button
                              key={oIndex}
                              onClick={() => handleQuizAnswer(qIndex, oIndex)}
                              disabled={showQuizResults}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                                showResult
                                  ? isCorrect
                                    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                                    : "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                                  : isSelected
                                  ? "bg-brand-500/10 text-brand-300 border border-brand-500/20"
                                  : "bg-white/[0.03] text-ink-300 hover:bg-white/[0.06] border border-transparent"
                              }`}
                            >
                              <span className="opacity-60 mr-2">{String.fromCharCode(65 + oIndex)}.</span>
                              {opt}
                            </button>
                          )
                        })}
                      </div>
                      {showQuizResults && quizAnswers[qIndex] !== undefined && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`text-xs mt-2 ${quizAnswers[qIndex] === q.correctIndex ? "text-emerald-400" : "text-rose-400"}`}
                        >
                          {q.explanation}
                        </motion.p>
                      )}
                    </div>
                  ))}
                </div>
                {!showQuizResults && Object.keys(quizAnswers).length === lesson.quiz.length && (
                  <Button className="mt-4 gap-2" onClick={() => setShowQuizResults(true)}>
                    <CheckCircle size={14} /> Check Answers
                  </Button>
                )}
                {showQuizResults && (
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-ink-300">
                      Score: <span className="font-bold text-brand-300">{correctAnswers}/{lesson.quiz.length}</span>
                    </p>
                    <Button variant="ghost" size="sm" onClick={() => { setQuizAnswers({}); setShowQuizResults(false) }}>
                      <RotateCcw size={14} className="mr-1" /> Retry
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Resources */}
            {lesson.resources.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <h3 className="text-sm font-semibold text-ink-300 mb-3">Additional Resources</h3>
                <div className="flex flex-wrap gap-2">
                  {lesson.resources.map((res, i) => (
                    <Badge key={i} variant="default" className="gap-1">
                      <BookOpen size={10} />
                      {res.title}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onPrev} disabled={!hasPrev} className="gap-2">
          <ChevronLeft size={16} /> Previous
        </Button>
        <div className="flex items-center gap-3">
          {!isCompleted && (
            <Button variant="outline" onClick={onComplete} className="gap-2">
              <CheckCircle size={16} /> Mark Complete
            </Button>
          )}
          <Button onClick={onNext} disabled={!hasNext} className="gap-2">
            Next <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
