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
  CheckCircle2,
  Eye,
  EyeOff,
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
  const [confirmSent, setConfirmSent] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setError("")
      setConfirmSent(false)
      setEmail("")
      setPassword("")
      setFullName("")
      setShowPassword(false)
    }
  }, [isOpen])

  /* Trap scroll when open */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        })
        if (error) throw error

        if (data.session) {
          try {
            await supabase.from("profiles").upsert({ id: data.user!.id, email, full_name: fullName })
          } catch { /* trigger handles this */ }
          onAuthSuccess(data.user)
          onClose()
        } else {
          setConfirmSent(true)
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        onAuthSuccess(data.user)
        onClose()
      }
    } catch (err: any) {
      const msg: string = err?.message || "Authentication failed"
      if (msg.includes("Email not confirmed")) {
        setError("Please confirm your email first. Check your inbox.")
      } else if (msg.includes("Invalid login credentials")) {
        setError("Incorrect email or password. Please try again.")
      } else if (msg.includes("User already registered")) {
        setError("Account already exists. Sign in instead.")
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        /* Full-viewport overlay — scrollable so modal is never clipped above viewport */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] overflow-y-auto"
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

          {/* Centering wrapper — min-h-full ensures vertical centering via flex */}
          <div className="flex min-h-full items-center justify-center p-4 py-8">

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: "spring", damping: 24, stiffness: 320 }}
            className="relative w-full max-w-md md:max-w-3xl bg-[#0c0c18] border border-[#00ED64]/20 rounded-2xl md:rounded-3xl shadow-2xl shadow-black/50 flex flex-col md:flex-row overflow-hidden"
          >
            {/* ── Left decorative panel (desktop only) ── */}
            <div className="hidden md:flex md:w-5/12 flex-col justify-between p-8 relative overflow-hidden bg-gradient-to-br from-[#00ED64]/10 via-[#00ED64]/3 to-transparent shrink-0">
              <div className="absolute inset-0 bg-[#00ED64]/5 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#009940]/10 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#00ED64]/15 border border-[#00ED64]/30 flex items-center justify-center">
                    <Zap size={20} className="text-[#00ED64]" />
                  </div>
                  <span className="text-xl font-bold text-white tracking-tight">AtomCamp</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                  {mode === "signin" ? "Welcome Back" : "Start Learning"}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {mode === "signin"
                    ? "Resume your AI-powered adaptive learning journey."
                    : "Join 6,000+ learners on Pakistan's smartest EdTech platform."}
                </p>
              </div>

              <div className="relative z-10 space-y-3">
                {["AI-Personalized Learning Paths", "Cognitive Profiling (VARK)", "Offline-First ML Models"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00ED64] shadow-[0_0_6px_#00ED64] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right form panel ── */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 md:p-8 relative min-h-full flex flex-col">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors z-10"
                >
                  <X size={15} />
                </button>

                {confirmSent ? (
                  /* Email confirmation screen */
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center flex-1 py-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 flex items-center justify-center mb-5">
                      <CheckCircle2 size={32} className="text-[#00ED64]" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Check Your Inbox</h2>
                    <p className="text-sm text-white/50 max-w-xs leading-relaxed mb-6">
                      Confirmation link sent to{" "}
                      <span className="text-white font-medium">{email}</span>.
                      Click it to activate your account.
                    </p>
                    <Button
                      onClick={() => { setConfirmSent(false); setMode("signin") }}
                      className="bg-[#00ED64] hover:bg-[#00c853] text-black font-semibold"
                    >
                      Go to Sign In
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    {/* Mobile branding */}
                    <div className="flex items-center gap-2 mb-6 md:hidden">
                      <div className="w-9 h-9 rounded-xl bg-[#00ED64]/10 border border-[#00ED64]/20 flex items-center justify-center">
                        <Sparkles size={16} className="text-[#00ED64]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white leading-none">AtomCamp</p>
                        <p className="text-xs text-white/40">Smart LMS</p>
                      </div>
                    </div>

                    {/* Desktop heading */}
                    <div className="hidden md:block mb-6">
                      <h2 className="text-xl font-bold text-white">
                        {mode === "signin" ? "Sign In" : "Create Account"}
                      </h2>
                      <p className="text-sm text-white/40 mt-1">
                        {mode === "signin"
                          ? "Enter your credentials to continue"
                          : "Fill in your details to get started"}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                      <AnimatePresence>
                        {mode === "signup" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5 block">
                              Full Name
                            </label>
                            <div className="relative">
                              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                              <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Zara Khan"
                                className="pl-9 h-11 bg-white/[0.04] border-white/[0.08] focus:border-[#00ED64]/50 focus:ring-[#00ED64]/20 text-white placeholder:text-white/20"
                                required
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div>
                        <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5 block">
                          Email
                        </label>
                        <div className="relative">
                          <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="pl-9 h-11 bg-white/[0.04] border-white/[0.08] focus:border-[#00ED64]/50 focus:ring-[#00ED64]/20 text-white placeholder:text-white/20"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5 block">
                          Password
                        </label>
                        <div className="relative">
                          <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="pl-9 pr-10 h-11 bg-white/[0.04] border-white/[0.08] focus:border-[#00ED64]/50 focus:ring-[#00ED64]/20 text-white placeholder:text-white/20"
                            required
                            minLength={6}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                          >
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                      </div>

                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2.5"
                        >
                          {error}
                        </motion.p>
                      )}

                      <Button
                        type="submit"
                        className="w-full h-11 gap-2 bg-[#00ED64] hover:bg-[#00c853] text-black font-semibold text-sm shadow-[0_0_20px_rgba(0,237,100,0.25)] hover:shadow-[0_0_30px_rgba(0,237,100,0.4)] transition-all"
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

                    <p className="text-center text-sm text-white/40 mt-5">
                      {mode === "signin" ? (
                        <>
                          Don&apos;t have an account?{" "}
                          <button
                            type="button"
                            onClick={() => { setMode("signup"); setError("") }}
                            className="text-[#00ED64] hover:text-[#00ff88] font-semibold transition-colors"
                          >
                            Sign up
                          </button>
                        </>
                      ) : (
                        <>
                          Already have an account?{" "}
                          <button
                            type="button"
                            onClick={() => { setMode("signin"); setError("") }}
                            className="text-[#00ED64] hover:text-[#00ff88] font-semibold transition-colors"
                          >
                            Sign in
                          </button>
                        </>
                      )}
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
          </div>
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
      setUser(session?.user ?? null)
    })
    const openHandler = () => setIsOpen(true)
    document.addEventListener("open-auth-modal", openHandler)
    return () => {
      listener.subscription.unsubscribe()
      document.removeEventListener("open-auth-modal", openHandler)
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/60 hidden sm:inline max-w-[120px] truncate">
          {user.user_metadata?.full_name || user.email}
        </span>
        <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1 text-white/60 hover:text-white">
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
        className="bg-[#00ED64] hover:bg-[#00c853] text-black font-semibold shadow-[0_0_16px_rgba(0,237,100,0.25)]"
      >
        Sign In
      </Button>
      <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} onAuthSuccess={setUser} />
    </>
  )
}
