"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Send, Check, Phone } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { StudentPrediction } from "@/types"

const WA_NUMBER = "923193608483"

function buildMessage(student: StudentPrediction): string {
  const raw = (student.name as string) || (student.student_id as string) || "Student"
  const firstName = raw.split(" ")[0]
  const reason = (student.predicted_reason as string) || "kuch challenges"
  return `Hi ${firstName}! 👋 Yeh AtomCamp ke instructor ki taraf se message hai.\n\nHamne notice kiya ke aap is hafta thodi mushkilon ka samna kar rahe hain: "${reason}".\n\nAapki madad karna chahte hain! Ek quick 10-minute check-in schedule karte hain?\n\nReply *YES* kar dein confirm karne ke liye. 🙏\n\n– AtomCamp Team`
}

export default function WhatsAppAlertModal({
  student,
  isOpen,
  onClose,
  onSent,
}: {
  student: StudentPrediction | null
  isOpen: boolean
  onClose: () => void
  onSent: (student: StudentPrediction) => void
}) {
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (student && isOpen) {
      setMessage(buildMessage(student))
      setSent(false)
    }
  }, [student, isOpen])

  const handleSend = () => {
    if (!student) return
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, "_blank")
    setSent(true)
    setTimeout(() => {
      onSent(student)
      onClose()
    }, 800)
  }

  if (!student) return null

  const name = (student.name as string) || (student.student_id as string) || "Student"
  const riskPct = typeof student.risk_score === "number"
    ? (student.risk_score > 1 ? student.risk_score : Math.round(student.risk_score * 100))
    : 0

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 24, stiffness: 320 }}
            className="relative w-full max-w-md bg-[#0c0c18] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            style={{ maxHeight: "90vh" }}
          >
            {/* WhatsApp green header */}
            <div className="bg-[#075E54] px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Phone size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{name}</p>
                <p className="text-xs text-white/60">+92 319 3608483 · {riskPct}% dropout risk</p>
              </div>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto">
              {/* Risk badge */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                student.risk_badge === "red"
                  ? "bg-rose-500/10 border border-rose-500/20 text-rose-300"
                  : "bg-amber-500/10 border border-amber-500/20 text-amber-300"
              }`}>
                <span className={`w-2 h-2 rounded-full shrink-0 ${student.risk_badge === "red" ? "bg-rose-400" : "bg-amber-400"}`} />
                {student.predicted_reason || "At-risk student"}
              </div>

              {/* Message preview (WhatsApp bubble style) */}
              <div>
                <p className="text-xs text-white/40 mb-2 flex items-center gap-1.5">
                  <MessageCircle size={11} /> Message Preview — editable before sending
                </p>
                <div className="bg-[#128C7E]/10 border border-[#128C7E]/20 rounded-xl p-3">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={8}
                    className="w-full bg-transparent text-sm text-white/80 resize-none focus:outline-none leading-relaxed font-[inherit]"
                    spellCheck={false}
                  />
                </div>
                <p className="text-xs text-white/30 mt-1 text-right">{message.length} chars</p>
              </div>

              {/* Recipient */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="w-7 h-7 rounded-full bg-[#075E54]/30 border border-[#075E54]/40 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#25D366]">{name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/70">{name}</p>
                  <p className="text-[11px] text-white/30">+92 319 3608483 (mock)</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 space-y-2">
              <Button
                onClick={handleSend}
                disabled={sent || !message.trim()}
                className={`w-full gap-2 font-semibold text-sm h-11 transition-all ${
                  sent
                    ? "bg-emerald-600 text-white"
                    : "bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                }`}
              >
                {sent ? (
                  <><Check size={15} /> Sent — opening WhatsApp…</>
                ) : (
                  <><Send size={15} /> Send via WhatsApp</>
                )}
              </Button>
              <p className="text-center text-[11px] text-white/20">
                Opens WhatsApp Web / app with pre-filled message
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
