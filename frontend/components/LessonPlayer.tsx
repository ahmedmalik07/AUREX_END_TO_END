"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
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
  Volume2,
  VolumeX,
  Copy,
  Check,
  Square,
  Trophy,
} from "lucide-react"
import { Lesson, LearningStyle, QuizQuestion } from "@/types"

const STYLE_CONFIG: Record<LearningStyle, { icon: any; label: string; color: string; bg: string; ring: string }> = {
  visual:      { icon: Eye,         label: "Visual Mode",    color: "text-brand-400",   bg: "bg-brand-500/10",   ring: "ring-brand-500/20" },
  auditory:    { icon: Ear,         label: "Audio Mode",     color: "text-teal-400",    bg: "bg-teal-500/10",    ring: "ring-teal-500/20" },
  reading:     { icon: BookOpenText,label: "Reading Mode",   color: "text-emerald-400", bg: "bg-emerald-500/10", ring: "ring-emerald-500/20" },
  kinesthetic: { icon: Hand,        label: "Hands-On Mode",  color: "text-amber-400",   bg: "bg-amber-500/10",   ring: "ring-amber-500/20" },
}

/* Strip markdown for TTS */
function stripMarkdown(text: string): string {
  return text
    .replace(/\\n/g, " ")
    .replace(/#{1,3}\s+/g, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`[^`]*`/g, "code snippet")
    .replace(/\|[^|\n]*/g, "")
    .replace(/\[([^\]]+)\]/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim()
}

export default function LessonPlayer({
  lesson,
  learningStyle,
  onComplete,
  onNext,
  onPrev,
  onFinish,
  hasNext,
  hasPrev,
  isCompleted,
}: {
  lesson: Lesson
  learningStyle: LearningStyle
  onComplete: () => void
  onNext: () => void
  onPrev: () => void
  onFinish?: () => void
  hasNext: boolean
  hasPrev: boolean
  isCompleted: boolean
}) {
  const [activeTab, setActiveTab] = useState<LearningStyle>(learningStyle)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [showQuizResults, setShowQuizResults] = useState(false)
  const [showOutput, setShowOutput] = useState<number | null>(null)

  // TTS state (auditory)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechRate, setSpeechRate] = useState(0.9)

  // Editable code state (kinesthetic)
  const [editableCodes, setEditableCodes] = useState<Record<number, string>>({})
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  /* Stop TTS when tab or lesson changes */
  useEffect(() => {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel()
    setIsSpeaking(false)
  }, [activeTab, lesson.id])

  /* Cleanup TTS on unmount */
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") window.speechSynthesis?.cancel()
    }
  }, [])

  const content = lesson.content[activeTab]
  const styleConfig = STYLE_CONFIG[activeTab]
  const StyleIcon = styleConfig.icon

  /* ── TTS ── */
  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }
    const text = stripMarkdown(content)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = speechRate
    utterance.pitch = 1.05
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    utteranceRef.current = utterance
    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  /* ── Kinesthetic editable code ── */
  const getCode = (i: number) =>
    i in editableCodes
      ? editableCodes[i]
      : (lesson.codeExamples[i]?.code ?? "").replace(/\\n/g, "\n")

  const resetCode = (i: number) =>
    setEditableCodes((prev) => { const c = { ...prev }; delete c[i]; return c })

  const copyCode = async (i: number) => {
    await navigator.clipboard.writeText(getCode(i))
    setCopiedIndex(i)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  /* ── Quiz ── */
  const handleQuizAnswer = (qIndex: number, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }))
  }
  const correctAnswers = lesson.quiz.filter((q, i) => quizAnswers[i] === q.correctIndex).length

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
              <Clock size={12} /> {lesson.duration} min
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
      <div className="flex items-center gap-1 p-1 bg-white/[0.03] rounded-xl">
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
                  ? `${config.bg} ${config.color} ring-1 ${config.ring}`
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
            {/* Style indicator + TTS button */}
            <div className="flex items-center justify-between mb-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${styleConfig.bg} ${styleConfig.color} text-sm font-medium ring-1 ${styleConfig.ring}`}>
                <StyleIcon size={14} />
                {styleConfig.label}
              </div>

              {/* ── Auditory TTS Controls ── */}
              {activeTab === "auditory" && (
                <div className="flex items-center gap-2">
                  <select
                    value={speechRate}
                    onChange={(e) => {
                      const r = parseFloat(e.target.value)
                      setSpeechRate(r)
                      if (isSpeaking) {
                        window.speechSynthesis.cancel()
                        setIsSpeaking(false)
                      }
                    }}
                    className="text-xs bg-white/[0.05] border border-white/[0.08] rounded-lg px-2 py-1.5 text-ink-300 focus:outline-none focus:border-teal-500/40"
                  >
                    <option value={0.7}>0.7× Slow</option>
                    <option value={0.9}>0.9× Normal</option>
                    <option value={1.1}>1.1× Fast</option>
                    <option value={1.3}>1.3× Faster</option>
                  </select>
                  <Button
                    size="sm"
                    onClick={toggleSpeech}
                    className={`gap-2 ${isSpeaking ? "bg-teal-500/20 text-teal-300 border-teal-500/30 hover:bg-teal-500/30" : "bg-teal-500/10 text-teal-400 border-teal-500/20 hover:bg-teal-500/20"}`}
                    variant="outline"
                  >
                    {isSpeaking ? (
                      <><Square size={12} fill="currentColor" /> Stop</>
                    ) : (
                      <><Volume2 size={12} /> Listen</>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* ── Auditory: audio status bar ── */}
            {activeTab === "auditory" && isSpeaking && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 mb-6"
              >
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-teal-400 rounded-full"
                      animate={{ height: ["8px", "20px", "8px"] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
                <span className="text-xs text-teal-300 font-medium">Reading lesson aloud…</span>
                <button onClick={toggleSpeech} className="ml-auto text-teal-400 hover:text-teal-200 transition-colors">
                  <VolumeX size={14} />
                </button>
              </motion.div>
            )}

            {/* Main content */}
            <div className="prose prose-invert prose-sm max-w-none">
              {content.replace(/\\n/g, "\n").split("\n").map((line, i) => {
                const trimmed = line.trim()
                if (trimmed.startsWith("## ")) return <h2 key={i} className="text-xl font-bold text-ink-100 mt-6 mb-3">{trimmed.replace("## ", "")}</h2>
                if (trimmed.startsWith("### ")) return <h3 key={i} className="text-lg font-semibold text-ink-200 mt-5 mb-2">{trimmed.replace("### ", "")}</h3>
                if (trimmed.startsWith("**") && trimmed.endsWith("**")) return <p key={i} className="font-bold text-ink-200">{trimmed.replace(/\*\*/g, "")}</p>
                if (trimmed.startsWith("- ")) return <li key={i} className="text-ink-300 ml-4 mb-1">{trimmed.replace("- ", "")}</li>
                if (trimmed.startsWith("|")) return null
                if (trimmed === "") return <div key={i} className="h-2" />
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
                    {/* Code header */}
                    <div className="bg-white/[0.04] px-4 py-2 flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-ink-300">{example.title}</span>
                      <div className="flex items-center gap-1">
                        {/* Copy */}
                        <button
                          onClick={() => copyCode(i)}
                          className="p-1.5 rounded hover:bg-white/10 text-ink-500 hover:text-ink-200 transition-colors"
                          title="Copy code"
                        >
                          {copiedIndex === i ? <Check size={12} className="text-brand-400" /> : <Copy size={12} />}
                        </button>
                        {/* Reset (kinesthetic only) */}
                        {activeTab === "kinesthetic" && i in editableCodes && (
                          <button
                            onClick={() => resetCode(i)}
                            className="p-1.5 rounded hover:bg-white/10 text-ink-500 hover:text-ink-200 transition-colors"
                            title="Reset to original"
                          >
                            <RotateCcw size={12} />
                          </button>
                        )}
                        <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 ml-1" onClick={() => setShowOutput(showOutput === i ? null : i)}>
                          <Play size={12} /> Run
                        </Button>
                      </div>
                    </div>

                    {/* Code body */}
                    {activeTab === "kinesthetic" ? (
                      /* Editable textarea for kinesthetic */
                      <textarea
                        value={getCode(i)}
                        onChange={(e) => setEditableCodes((prev) => ({ ...prev, [i]: e.target.value }))}
                        className="w-full bg-[#0d1117] p-4 text-sm font-mono text-ink-200 resize-y min-h-[120px] focus:outline-none focus:ring-1 focus:ring-amber-500/30 border-0"
                        spellCheck={false}
                        autoComplete="off"
                        placeholder="Type your code here…"
                      />
                    ) : (
                      <pre className="bg-[#0d1117] p-4 text-sm overflow-x-auto">
                        <code className="text-ink-200 whitespace-pre">{example.code.replace(/\\n/g, "\n")}</code>
                      </pre>
                    )}

                    {/* Output */}
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
                            <pre className="text-sm text-emerald-400 whitespace-pre">{(example.output ?? "").replace(/\\n/g, "\n")}</pre>
                          </div>
                          <div className="px-4 pb-3">
                            <p className="text-xs text-ink-400">{example.explanation}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                {activeTab === "kinesthetic" && (
                  <p className="text-xs text-amber-400/70 flex items-center gap-1.5">
                    <Hand size={11} /> Code is editable above — modify and experiment freely. Hit Reset to restore.
                  </p>
                )}
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
                      <BookOpen size={10} /> {res.title}
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
          {hasNext ? (
            <Button onClick={onNext} className="gap-2">
              Next <ChevronRight size={16} />
            </Button>
          ) : (
            <Button
              onClick={() => { if (!isCompleted) onComplete(); onFinish?.() }}
              className="gap-2 bg-[#00ED64] hover:bg-[#00c853] text-black font-semibold shadow-[0_0_20px_rgba(0,237,100,0.3)]"
            >
              <Trophy size={16} /> Finish Course
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
