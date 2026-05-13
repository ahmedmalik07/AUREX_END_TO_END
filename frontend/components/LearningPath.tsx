"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { LearningPathData } from "@/types"
import { CheckCircle2, Circle, Clock, Wallet, BookOpen } from "lucide-react"

export default function LearningPath({ data }: { data: LearningPathData }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-ink-300">
          <Wallet size={18} className="text-accent-400" />
          <span className="font-semibold">PKR {data.total_cost.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-ink-300">
          <Clock size={18} className="text-brand-400" />
          <span className="font-semibold">{data.total_duration}</span>
        </div>
        <Badge variant={data.confidence > 80 ? "success" : "warning"}>{data.confidence}% Match</Badge>
      </div>

      <div className="relative pl-6 border-l border-white/10 space-y-8">
        {data.milestones.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative group"
            style={{ perspective: "1000px" }}
          >
            <div className="absolute -left-[31px] top-0 z-10">
              {i === data.milestones.length - 1 ? (
                <CheckCircle2 size={20} className="text-accent-400" />
              ) : (
                <Circle size={20} className="text-brand-400" />
              )}
            </div>
            <Card className="hover:bg-white/[0.05] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.06)]">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen size={18} className="text-brand-400" />
                    {m.order}. {m.course}
                  </CardTitle>
                  <Badge variant="default">{m.duration}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {m.modules.map((mod, mi) => (
                    <div key={mi} className="flex items-start gap-2 text-xs text-ink-400">
                      <div className="mt-1 w-1 h-1 rounded-full bg-brand-500 shrink-0" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-ink-400 pt-2 border-t border-white/5">
                  <span>Deliverable</span>
                  <span className="text-ink-200">{m.deliverable}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-ink-400">
                  <span>Badge Earned</span>
                  <span className="text-brand-300 font-medium">{m.badge}</span>
                </div>
                <Progress value={((i + 1) / data.milestones.length) * 100} variant="success" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
