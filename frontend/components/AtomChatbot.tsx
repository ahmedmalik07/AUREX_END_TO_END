"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, OrbitControls, Float } from "@react-three/drei"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Sparkles,
  User,
  Loader2,
  Zap,
} from "lucide-react"
import * as THREE from "three"

function RobotModel({ isTalking }: { isTalking: boolean }) {
  const { scene } = useGLTF("/robot.glb")
  const groupRef = useRef<THREE.Group>(null)
  const originalY = useRef(0)

  useEffect(() => {
    if (groupRef.current) {
      originalY.current = groupRef.current.position.y
      // Scale and center the model
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      scene.position.sub(center)
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2 / maxDim
      scene.scale.setScalar(scale)
    }
  }, [scene])

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle idle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1
      // Playful rotation when talking
      if (isTalking) {
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.3
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.05)
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.05)
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Float>
  )
}

function RobotScene({ isTalking }: { isTalking: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-3, 2, -3]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[3, -2, -3]} intensity={0.5} color="#22d3ee" />
      <Suspense fallback={null}>
        <RobotModel isTalking={isTalking} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!isTalking} autoRotateSpeed={2} />
    </Canvas>
  )
}

const ATOM_KNOWLEDGE: Record<string, string> = {
  "atomcamp": "AtomCamp is Pakistan's leading tech bootcamp with 6,000+ learners trained, 65% women in tech, and a 70% graduation rate across 26+ cohorts! We make learning accessible and fun.",
  "course": "Our flagship course is **Programming Basics with Python** — a 4-week journey from zero to building real projects. It's personalized for YOUR learning style: Visual, Auditory, Reading, or Kinesthetic!",
  "dict in python": "A dictionary in Python is a collection of key-value pairs! Just like a real dictionary pairs a word with its definition, in Python you'd write it like `my_dict = {'name': 'Atom', 'type': 'Robot'}`. They are super fast and mutable!",
  "dictionary": "A dictionary in Python is a collection of key-value pairs! Just like a real dictionary pairs a word with its definition, in Python you'd write it like `my_dict = {'name': 'Atom', 'type': 'Robot'}`. They are super fast and mutable!",
  "list in python": "A list in Python is an ordered, mutable collection of items (like an array). It looks like this: `my_list = [1, 2, 'Atom', 3.14]`.",
  "python": "Python is the perfect first language! It reads like English, has simple syntax, and is used everywhere from AI to web development. Our course takes you from `print('Hello')` to building games and apps!",
  "learning style": "We use VARK assessment: **Visual** (diagrams, charts), **Auditory** (listening, discussing), **Reading** (text, notes), **Kinesthetic** (hands-on, doing). Your course adapts automatically!",
  "vark": "VARK stands for Visual, Auditory, Reading, Kinesthetic. It's how your brain prefers to absorb information. We test you and customize the entire course content accordingly. Pretty cool, right?",
  "ai": "AI (Artificial Intelligence) is teaching computers to think and learn. Python is THE language for AI. We cover foundations that prepare you for ML, deep learning, and generative AI!",
  "machine learning": "Machine Learning is a subset of AI where computers learn from data without explicit programming. Python libraries like scikit-learn, TensorFlow, and PyTorch make it accessible. Our course builds the foundation you need!",
  "difference": "What makes AtomCamp different? We're not just videos — we're **adaptive**. Our AI personalizes content to YOUR brain, tracks your progress, predicts where you might struggle, and intervenes early. It's like having a personal tutor 24/7.",
  "price": "Programming Basics with Python is **PKR 24,999** (down from PKR 45,000). That's lifetime access, 40 lessons, 60+ hours, and a certificate. Best investment you'll make!",
  "cost": "Programming Basics with Python is **PKR 24,999** (down from PKR 45,000). That's lifetime access, 40 lessons, 60+ hours, and a certificate. Best investment you'll make!",
  "duration": "The Python course runs for **4 weeks** with 40 lessons totaling 60+ hours. You can go at your own pace though — lifetime access means no rush!",
  "certificate": "Yes! You get a **Certificate of Completion** from AtomCamp after finishing the course. It's recognized by employers across Pakistan.",
  "hello": "Hey there! I'm **Atom**, your playful coding companion! 🤖✨ Ask me about Python, AtomCamp, AI, or just chat. I love making learning fun!",
  "hi": "Hi hi! Atom here! 🎉 Ready to dive into some Python magic? Or curious about AtomCamp? I'm all circuits and ears!",
  "who are you": "I'm **Atom** — a round, wheeled, slightly hyperactive robot who lives to teach! I run on curiosity, bad jokes, and lots of coffee (metaphorically speaking).",
  "joke": "Why do Python programmers prefer dark mode? Because light attracts bugs! 🐛😄",
  "help": "I can answer questions about:\n• AtomCamp and our courses\n• Python programming basics\n• AI and Machine Learning\n• Your learning style\n• Pricing and certificates\n\nJust type away!",
  "supabase": "Supabase is our backend magic! It handles authentication, stores your test results, and tracks your learning progress securely in the cloud.",
  "progress": "I track every lesson you complete, every quiz you ace, and how much time you spend learning. Your dashboard shows it all with pretty charts! 📊",
  "quiz": "Each lesson has a quick quiz to reinforce what you learned. Don't worry — you can retry as many times as you want. Learning is about practice, not perfection!",
  "project": "By the end of Week 1, you'll build a **Personal Profile Card**. By Week 2, a **Number Guessing Game**. Real projects, real skills!",
  "career": "Python opens doors to data science, AI engineering, web development, automation, and freelancing. Pakistan's tech industry is booming — and we're launch pad for you! 🚀",
  "function": "A function in Python is a reusable block of code that performs a specific task. You define it using the `def` keyword, like `def greet(): print('Hello!')`.",
  "variable": "Variables are like containers in Python used to store data! For example, `name = 'Atom'` stores the text 'Atom' inside the variable `name`.",
  "loop": "Loops in Python let you repeat code! The `for` loop is great for iterating over lists, and the `while` loop runs as long as a condition is true."
}

function getAtomResponse(input: string): string {
  const lower = input.toLowerCase()
  
  // Create a primitive scoring system to pick the BEST matching keyword
  // rather than just the first one that appears in the text
  let bestMatch = ""
  let maxScore = 0
  
  for (const [key, response] of Object.entries(ATOM_KNOWLEDGE)) {
    if (lower.includes(key)) {
      // Score based on keyword length to prefer longer, more specific matches
      // like "dict in python" over just "python"
      const score = key.length
      if (score > maxScore) {
        maxScore = score
        bestMatch = response
      }
    }
  }
  
  if (bestMatch) return bestMatch
  
  // Fallback responses
  const fallbacks = [
    "Ooh, interesting question! 🤔 I'm still learning about that one. Want to ask me about Python, AtomCamp, or AI instead?",
    "Hmm, my circuits are tingling but I don't have a perfect answer for that. Try asking about our Python course or what makes AtomCamp special!",
    "That's a great question! While I think about it, did you know Python was named after Monty Python? 🐍 Ask me more!",
    "Ooh, you're making my wheels spin! 💫 I'm best at Python, AtomCamp info, and AI topics. Want to explore any of those?",
  ]
  return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}

export default function AtomChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "atom"; text: string }[]>([
    { role: "atom", text: "Hey there! I'm **Atom**! 🤖✨ Ask me about Python, AtomCamp, AI, or just say hi!" },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isTalking, setIsTalking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMsg = input.trim()
    setMessages((prev) => [...prev, { role: "user", text: userMsg }])
    setInput("")
    setIsTyping(true)
    setIsTalking(true)
    
    // Simulate Atom thinking
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1000))
    
    const response = getAtomResponse(userMsg)
    setMessages((prev) => [...prev, { role: "atom", text: response }])
    setIsTyping(false)
    setIsTalking(false)
  }

  const quickReplies = [
    "Tell me about the course",
    "What is Python?",
    "How much does it cost?",
    "What's my learning style?",
  ]

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/30 flex items-center justify-center"
          >
            <Bot size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] rounded-2xl bg-[#13131f] border border-white/[0.08] shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header with 3D Robot */}
            <div className="h-40 bg-gradient-to-b from-brand-500/10 to-transparent relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-ink-400 hover:text-ink-200 transition-colors z-10"
              >
                <X size={16} />
              </button>
              
              <div className="absolute inset-0">
                <RobotScene isTalking={isTalking} />
              </div>
              
              <div className="absolute bottom-2 left-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-ink-300">Atom is online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "atom" ? "bg-brand-500/20 text-brand-400" : "bg-white/10 text-ink-300"
                  }`}>
                    {msg.role === "atom" ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                    msg.role === "atom"
                      ? "bg-brand-500/10 text-ink-200 border border-brand-500/10"
                      : "bg-white/[0.06] text-ink-200"
                  }`}>
                    {msg.text.split("**").map((part, pi) => (
                      pi % 2 === 1 ? <strong key={pi} className="text-brand-300">{part}</strong> : part
                    ))}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="bg-brand-500/10 px-3 py-2 rounded-xl border border-brand-500/10">
                    <Loader2 size={14} className="animate-spin text-brand-400" />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length < 3 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => {
                      setInput(reply)
                      setTimeout(() => sendMessage(), 100)
                    }}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] text-ink-400 hover:bg-brand-500/10 hover:text-brand-300 border border-white/[0.06] transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-white/[0.06] flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask Atom anything..."
                className="flex-1 h-9 text-sm"
              />
              <Button size="sm" className="h-9 w-9 p-0" onClick={sendMessage}>
                <Send size={14} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
