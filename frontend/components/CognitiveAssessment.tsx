"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { VarkScores, AssessmentQuestion } from "@/types"
import { Brain, ChevronRight, Eye, Ear, BookOpen, Hand } from "lucide-react"

const QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    text: "When you're learning something completely new, what helps you understand it FASTEST?",
    options: [
      { label: "Seeing charts, diagrams, or visual examples", style: "visual", points: 3 },
      { label: "Hearing someone explain it clearly", style: "auditory", points: 3 },
      { label: "Reading step-by-step instructions", style: "reading", points: 3 },
      { label: "Trying it yourself and learning by doing", style: "kinesthetic", points: 3 },
    ],
  },
  {
    id: 2,
    text: "Imagine learning about 'building a professional network'. You'd prefer:",
    options: [
      { label: "An infographic showing the networking process", style: "visual", points: 2 },
      { label: "A podcast or audio guide you can listen to", style: "auditory", points: 3 },
      { label: "A written article with tips and examples", style: "reading", points: 3 },
      { label: "Attending a networking event and practicing", style: "kinesthetic", points: 3 },
    ],
  },
  {
    id: 3,
    text: "A week after learning something, you remember it best if you:",
    options: [
      { label: "Saw a clear visual example or chart", style: "visual", points: 2 },
      { label: "Heard it explained with good examples", style: "auditory", points: 2 },
      { label: "Read and reviewed written notes", style: "reading", points: 2 },
      { label: "Actually practiced or used it yourself", style: "kinesthetic", points: 3 },
    ],
  },
  {
    id: 4,
    text: "When learning from someone else's experience (case study, success story), you understand best by:",
    options: [
      { label: "Seeing it mapped out visually with a timeline", style: "visual", points: 2 },
      { label: "Hearing them tell the story in their own words", style: "auditory", points: 2 },
      { label: "Reading a detailed written case study", style: "reading", points: 2 },
      { label: "Trying to recreate their approach yourself", style: "kinesthetic", points: 3 },
    ],
  },
  {
    id: 5,
    text: "During a lesson, you naturally:",
    options: [
      { label: "Draw diagrams, use highlighters, or make mind maps", style: "visual", points: 3 },
      { label: "Just listen carefully without taking notes", style: "auditory", points: 3 },
      { label: "Write detailed notes or bullet points", style: "reading", points: 3 },
      { label: "Rarely take notes, prefer to try things right away", style: "kinesthetic", points: 2 },
    ],
  },
  {
    id: 6,
    text: "When you face a challenge or problem, your first instinct is to:",
    options: [
      { label: "Draw it out or visualize the solution", style: "visual", points: 2 },
      { label: "Talk it through with someone or think out loud", style: "auditory", points: 2 },
      { label: "Research and read about similar problems", style: "reading", points: 2 },
      { label: "Jump in and try different solutions", style: "kinesthetic", points: 3 },
    ],
  },
  {
    id: 7,
    text: "You focus and learn best when:",
    options: [
      { label: "Information is organized visually (colors, images, layout)", style: "visual", points: 2 },
      { label: "You can listen to content while moving or multitasking", style: "auditory", points: 2 },
      { label: "You're reading in a quiet space with no distractions", style: "reading", points: 2 },
      { label: "You're actively doing exercises or hands-on activities", style: "kinesthetic", points: 2 },
    ],
  },
  {
    id: 8,
    text: "When following a tutorial or guide, you prefer to:",
    options: [
      { label: "See screenshots or visual walkthroughs at each step", style: "visual", points: 2 },
      { label: "Listen to audio instructions or watch video with narration", style: "auditory", points: 2 },
      { label: "Read through all written instructions first", style: "reading", points: 2 },
      { label: "Start doing it immediately, referring back as needed", style: "kinesthetic", points: 3 },
    ],
  },
  {
    id: 9,
    text: "When a topic feels complicated or confusing, you need:",
    options: [
      { label: "A simple diagram or visual breakdown", style: "visual", points: 3 },
      { label: "Someone to explain it to you verbally", style: "auditory", points: 2 },
      { label: "To read multiple explanations until it clicks", style: "reading", points: 2 },
      { label: "To practice with it until you understand", style: "kinesthetic", points: 3 },
    ],
  },
  {
    id: 10,
    text: "To prepare for applying what you learned, you would:",
    options: [
      { label: "Review diagrams, charts, or visual summaries", style: "visual", points: 2 },
      { label: "Listen to recordings or discuss with others", style: "auditory", points: 2 },
      { label: "Re-read your notes and key takeaways", style: "reading", points: 2 },
      { label: "Practice or do exercises based on the material", style: "kinesthetic", points: 3 },
    ],
  },
  {
    id: 11,
    text: "During a 30-minute lesson, you stay engaged best with:",
    options: [
      { label: "Visual slides, images, or animations changing regularly", style: "visual", points: 2 },
      { label: "Clear audio narration or discussion", style: "auditory", points: 2 },
      { label: "Well-structured written content you can read at your pace", style: "reading", points: 2 },
      { label: "Interactive activities or exercises every few minutes", style: "kinesthetic", points: 2 },
    ],
  },
  {
    id: 12,
    text: "When beginning a new course or project, you naturally:",
    options: [
      { label: "Create visual plans, sketches, or roadmaps first", style: "visual", points: 3 },
      { label: "Discuss your ideas and plans verbally", style: "auditory", points: 2 },
      { label: "Write out a detailed plan or outline", style: "reading", points: 3 },
      { label: "Just start and figure it out as you go", style: "kinesthetic", points: 3 },
    ],
  },
]

const ICONS: Record<keyof VarkScores, any> = {
  visual: Eye,
  auditory: Ear,
  reading: BookOpen,
  kinesthetic: Hand,
}

export default function CognitiveAssessment({ onComplete }: { onComplete: (scores: VarkScores) => void }) {
  const [idx, setIdx] = useState(0)
  const [scores, setScores] = useState<VarkScores>({ visual: 0, auditory: 0, reading: 0, kinesthetic: 0 })

  const handleAnswer = (style: keyof VarkScores, points: number) => {
    const next = { ...scores, [style]: scores[style] + points }
    setScores(next)
    if (idx + 1 < QUESTIONS.length) {
      setIdx(idx + 1)
    } else {
      onComplete(next)
    }
  }

  const q = QUESTIONS[idx]
  const progress = ((idx) / QUESTIONS.length) * 100

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <Brain className="text-brand-400" size={24} />
        <div>
          <h2 className="text-xl font-bold">Cognitive Assessment</h2>
          <p className="text-sm text-ink-400">Question {idx + 1} of {QUESTIONS.length}</p>
        </div>
      </div>

      <div className="h-2 w-full rounded-full bg-white/10 mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-brand-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6 border-brand-500/20">
            <CardHeader>
              <CardTitle className="text-lg leading-relaxed">{q.text}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {q.options.map((opt, i) => {
                const Icon = ICONS[opt.style]
                return (
                  <Button
                    key={i}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-4 px-5 hover:bg-brand-500/10 hover:border-brand-500/30 transition-all group"
                    onClick={() => handleAnswer(opt.style, opt.points)}
                  >
                    <Icon size={18} className="mr-3 text-brand-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{opt.label}</span>
                    <ChevronRight size={16} className="ml-auto text-ink-500" />
                  </Button>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
