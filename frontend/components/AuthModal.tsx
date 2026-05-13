"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { supabase } from "@/lib/supabase"
import {
  X,
  Mail,
  Lock,
  User,
  Loader2,
  Sparkles,
  LogOut,
  Zap,
} from "lucide-react"

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
}: {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess: (user: any) => void
}) {
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        })
        if (error) throw error

        if (data.user) {
          await supabase.from("profiles").insert({
            id: data.user.id,
            email,
            full_name: fullName,
          })
        }

        onAuthSuccess(data.user)
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        onAuthSuccess(data.user)
      }
      onClose()
    } catch (err: any) {
      setError(err.message || "Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-[#0f0f1a] border border-[#00E676]/20 rounded-3xl shadow-2xl shadow-[#00E676]/10 overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left panel - branding */}
            <div className="hidden md:flex md:w-2/5 flex-col justify-between p-8 relative overflow-hidden bg-gradient-to-br from-[#00E676]/10 via-transparent to-[#FBBB2E]/5">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
              <div className="absolute top-0 left-0 w-full h-full bg-[#00E676]/5 blur-[80px] rounded-full" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#00E676]/15 border border-[#00E676]/30 flex items-center justify-center">
                    <Zap size={20} className="text-[#00E676]" />
                  </div>
                  <span className="text-lg font-bold text-white tracking-tight">AtomCamp</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                  {mode === "signin" ? "Welcome Back" : "Start Your Journey"}
                </h3>
                <p className="text-sm text-ink-400 leading-relaxed">
                  {mode === "signin"
                    ? "Continue your adaptive learning path powered by AI."
                    : "Join thousands of learners on Pakistan's most intelligent EdTech platform."}
                </p>
              </div>

              <div className="relative z-10 space-y-3">
                {[
                  "AI-Personalized Learning Paths",
                  "Cognitive Profiling (VARK)",
                  "Offline-First ML Models",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-ink-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00E676] shadow-[0_0_6px_#00E676]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel - form */}
            <div className="flex-1 p-6 md:p-8 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-ink-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              <div className="text-center mb-6 md:hidden">
                <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center mx-auto mb-3">
                  <Sparkles size={24} className="text-[#00E676]" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  {mode === "signin" ? "Welcome Back!" : "Join AtomCamp"}
                </h2>
              </div>

              <div className="hidden md:block mb-6">
                <h2 className="text-xl font-bold text-white">
                  {mode === "signin" ? "Sign In" : "Create Account"}
                </h2>
                <p className="text-sm text-ink-400 mt-1">
                  {mode === "signin"
                    ? "Enter your credentials to access your dashboard"
                    : "Fill in your details to get started"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div>
                    <label className="text-xs font-semibold text-ink-300 uppercase tracking-wider mb-1.5 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                      <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Zara Khan"
                        className="pl-10 bg-white/[0.03] border-white/[0.08] focus:border-[#00E676]/50 focus:ring-[#00E676]/20 text-white placeholder:text-ink-600"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-ink-300 uppercase tracking-wider mb-1.5 block">
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-10 bg-white/[0.03] border-white/[0.08] focus:border-[#00E676]/50 focus:ring-[#00E676]/20 text-white placeholder:text-ink-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-300 uppercase tracking-wider mb-1.5 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 bg-white/[0.03] border-white/[0.08] focus:border-[#00E676]/50 focus:ring-[#00E676]/20 text-white placeholder:text-ink-600"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2.5">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full gap-2 bg-[#00E676] hover:bg-[#00c853] text-black font-semibold shadow-[0_0_20px_rgba(0,230,118,0.25)] hover:shadow-[0_0_28px_rgba(0,230,118,0.4)] transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : mode === "signin" ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-ink-400 mt-5">
                {mode === "signin" ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      onClick={() => { setMode("signup"); setError("") }}
                      className="text-[#00E676] hover:text-[#00ff88] font-semibold transition-colors"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => { setMode("signin"); setError("") }}
                      className="text-[#00E676] hover:text-[#00ff88] font-semibold transition-colors"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function AuthButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-ink-300 hidden sm:inline">
          {user.user_metadata?.full_name || user.email}
        </span>
        <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1">
          <LogOut size={14} /> Sign Out
        </Button>
      </div>
    )
  }

  return (
    <>
      <Button
        size="sm"
        onClick={() => setIsOpen(true)}
        className="bg-[#00E676] hover:bg-[#00c853] text-black font-semibold shadow-[0_0_16px_rgba(0,230,118,0.25)]"
      >
        Sign In
      </Button>
      <AuthModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAuthSuccess={setUser}
      />
    </>
  )
}
