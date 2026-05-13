"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Card, CardContent } from "@/components/ui/Card"
import { motion } from "framer-motion"

export interface BasicInfo {
  name: string
  background: string
  goal: string
  time_availability: string
  prior_experience: string
  budget: number
}

export default function OnboardingForm({ onNext }: { onNext: (data: BasicInfo) => void }) {
  const [form, setForm] = useState<BasicInfo>({
    name: "",
    background: "non-technical",
    goal: "career-switch",
    time_availability: "full-time",
    prior_experience: "none",
    budget: 75000,
  })

  const canProceed = form.name.trim().length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-1">Let's personalize your journey</h2>
        <p className="text-sm text-ink-400">Step 1 of 3 — Basic Profile</p>
      </div>

      <Card>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (canProceed) onNext(form)
            }}
            className="space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-ink-300">Full Name</label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ayesha Khan"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-ink-300">Background</label>
                <Select
                  value={form.background}
                  onChange={(e) => setForm({ ...form, background: e.target.value })}
                >
                  <option value="technical">Technical</option>
                  <option value="non-technical">Non-Technical</option>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-ink-300">Goal</label>
                <Select
                  value={form.goal}
                  onChange={(e) => setForm({ ...form, goal: e.target.value })}
                >
                  <option value="career-switch">Career Switch</option>
                  <option value="upskill">Upskill</option>
                  <option value="freelance">Freelance</option>
                  <option value="corporate">Corporate</option>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-ink-300">Time Availability</label>
                <Select
                  value={form.time_availability}
                  onChange={(e) => setForm({ ...form, time_availability: e.target.value })}
                >
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="weekend-only">Weekend Only</option>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-ink-300">Prior Experience</label>
                <Select
                  value={form.prior_experience}
                  onChange={(e) => setForm({ ...form, prior_experience: e.target.value })}
                >
                  <option value="none">None</option>
                  <option value="basic-coding">Basic Coding</option>
                  <option value="experienced">Experienced</option>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-ink-300">Budget (PKR)</label>
                <Input
                  type="number"
                  min={0}
                  step={1000}
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div className="pt-2">
              <Button type="submit" disabled={!canProceed} className="w-full md:w-auto">
                Continue to Assessment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
