"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useLang } from "@/components/LanguageContext"
import {
  Briefcase,
  MapPin,
  Clock,
  ExternalLink,
  Search,
  Filter,
  Star,
  Users,
  TrendingUp,
  GraduationCap,
  Building2,
  ChevronRight,
  Zap,
  CheckCircle2,
  Quote,
} from "lucide-react"

const JOBS = [
  {
    id: 1,
    title: "Junior Web Developer",
    company: "Systems Limited",
    location: "Lahore",
    remote: false,
    salary: "PKR 50,000–80,000/mo",
    type: "Full-time",
    skills: ["React", "JavaScript", "CSS"],
    posted: "2 days ago",
    initials: "SL",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    category: "Web Dev",
    description: "Join Pakistan's largest IT company and build enterprise web solutions for global clients.",
  },
  {
    id: 2,
    title: "Python Developer",
    company: "NetSol Technologies",
    location: "Lahore",
    remote: true,
    salary: "PKR 60,000–90,000/mo",
    type: "Full-time",
    skills: ["Python", "Django", "PostgreSQL"],
    posted: "3 days ago",
    initials: "NT",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    category: "Backend",
    description: "Build financial technology solutions used by leasing & fleet management companies worldwide.",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Arpatech",
    location: "Karachi",
    remote: false,
    salary: "PKR 70,000–100,000/mo",
    type: "Full-time",
    skills: ["Python", "Pandas", "SQL", "Power BI"],
    posted: "1 week ago",
    initials: "AT",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    category: "Data",
    description: "Turn raw business data into actionable insights for our fast-growing product division.",
  },
  {
    id: 4,
    title: "Frontend Engineer",
    company: "i2c Inc.",
    location: "Lahore",
    remote: false,
    salary: "PKR 80,000–120,000/mo",
    type: "Full-time",
    skills: ["React", "TypeScript", "Next.js"],
    posted: "5 days ago",
    initials: "i2c",
    color: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    category: "Web Dev",
    description: "Build card-issuing and banking interfaces used by millions of people across 50+ countries.",
  },
  {
    id: 5,
    title: "ML Engineer (Junior)",
    company: "Folio3",
    location: "Karachi",
    remote: true,
    salary: "PKR 75,000–110,000/mo",
    type: "Full-time",
    skills: ["Python", "TensorFlow", "scikit-learn"],
    posted: "1 week ago",
    initials: "F3",
    color: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    category: "AI/ML",
    description: "Train and deploy machine learning models for agriculture, healthcare, and fintech clients.",
  },
  {
    id: 6,
    title: "Full Stack Developer",
    company: "Contour Software",
    location: "Lahore",
    remote: true,
    salary: "PKR 65,000–95,000/mo",
    type: "Full-time",
    skills: ["React", "Node.js", "PostgreSQL"],
    posted: "3 days ago",
    initials: "CS",
    color: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    category: "Full Stack",
    description: "Develop SaaS products for the construction and real estate industries in North America.",
  },
  {
    id: 7,
    title: "AI/Automation Intern",
    company: "Netsol Technologies",
    location: "Lahore",
    remote: true,
    salary: "PKR 25,000–35,000/mo",
    type: "Internship",
    skills: ["Python", "Automation", "APIs"],
    posted: "2 days ago",
    initials: "NT",
    color: "bg-brand-500/10 text-brand-400 border-brand-500/20",
    category: "AI/ML",
    description: "6-month paid internship — ideal for recent AtomCamp bootcamp graduates entering AI.",
  },
  {
    id: 8,
    title: "DevOps Engineer",
    company: "Tintash",
    location: "Islamabad",
    remote: true,
    salary: "PKR 90,000–130,000/mo",
    type: "Full-time",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    posted: "4 days ago",
    initials: "TT",
    color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    category: "DevOps",
    description: "Own infrastructure at a product studio building apps for Y Combinator startups.",
  },
]

const STORIES = [
  {
    name: "Zara Khan",
    batch: "Cohort 22",
    role: "Junior Developer @ Systems Limited",
    quote: "AtomCamp ne mujhe programming seekhna sahi tarike se sikhaya. 4 mahine mein mujhe job mil gayi.",
    skill: "React",
    initials: "ZK",
    color: "bg-brand-500/10 border-brand-500/20",
  },
  {
    name: "Ali Hassan",
    batch: "Cohort 24",
    role: "Data Analyst @ NetSol",
    quote: "Pehle mujhe SQL se darr lagta tha. AtomCamp ki AI learning path ne sab asaan kar diya.",
    skill: "Python",
    initials: "AH",
    color: "bg-teal-500/10 border-teal-500/20",
  },
  {
    name: "Fatima Malik",
    batch: "Cohort 25",
    role: "ML Engineer @ Folio3",
    quote: "Main ghar se parh rahi thi. Offline-first feature ki waja se kabhi kuch miss nahi hua.",
    skill: "ML",
    initials: "FM",
    color: "bg-violet-500/10 border-violet-500/20",
  },
]

const CATEGORIES = ["All", "Web Dev", "Backend", "Full Stack", "Data", "AI/ML", "DevOps"]

const STATS = [
  { icon: Users,       value: "2,400+", label: "Alumni Placed" },
  { icon: Building2,   value: "180+",   label: "Hiring Partners" },
  { icon: TrendingUp,  value: "PKR 72k", label: "Avg Starting Salary" },
  { icon: Clock,       value: "3.2 mo", label: "Avg Time to Hire" },
]

export default function AlumniPage() {
  const { t } = useLang()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [remoteOnly, setRemoteOnly] = useState(false)

  const filtered = JOBS.filter((j) => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()) || j.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    const matchCat  = category === "All" || j.category === category
    const matchRemote = !remoteOnly || j.remote
    return matchSearch && matchCat && matchRemote
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-6">
          <GraduationCap size={14} />
          AtomCamp Alumni Network
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{t("alumni_heading")}</span>
        </h1>
        <p className="text-ink-400 text-lg max-w-2xl mx-auto leading-relaxed">
          {t("alumni_sub")}
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {STATS.map((s, i) => (
          <Card key={s.label} className="p-5 text-center">
            <s.icon size={18} className="text-brand-400 mx-auto mb-2" />
            <p className="text-2xl font-bold gradient-text">{s.value}</p>
            <p className="text-xs text-ink-500 mt-1">{s.label}</p>
          </Card>
        ))}
      </motion.div>

      {/* Search + filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-8 space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              type="text"
              placeholder="Search job title, company, or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-ink-200 placeholder:text-ink-600 focus:outline-none focus:border-brand-500/40 transition-colors"
            />
          </div>
          <label className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl cursor-pointer hover:bg-white/[0.06] transition-colors">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={(e) => setRemoteOnly(e.target.checked)}
              className="accent-brand-400 w-4 h-4"
            />
            <span className="text-sm text-ink-300 whitespace-nowrap">Remote Only</span>
          </label>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                category === cat
                  ? "bg-brand-500/20 text-brand-300 border border-brand-500/30"
                  : "bg-white/[0.04] text-ink-400 border border-white/[0.06] hover:bg-white/[0.07]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Job listings + sidebar */}
      <div className="grid lg:grid-cols-3 gap-6 mb-16">
        {/* Job grid */}
        <div className="lg:col-span-2 space-y-4">
          <p className="text-sm text-ink-500">{filtered.length} job{filtered.length !== 1 ? "s" : ""} found</p>

          {filtered.length === 0 && (
            <Card className="p-10 text-center">
              <Search size={28} className="text-ink-600 mx-auto mb-3" />
              <p className="text-ink-400 font-medium">No jobs match your search</p>
              <p className="text-sm text-ink-600 mt-1">Try a different keyword or remove filters</p>
            </Card>
          )}

          {filtered.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <Card className="p-5 hover:border-brand-500/20 transition-all group cursor-pointer">
                <div className="flex items-start gap-4">
                  {/* Company initial badge */}
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center text-xs font-bold shrink-0 ${job.color}`}>
                    {job.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="font-semibold text-ink-100 group-hover:text-brand-300 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-ink-400">{job.company}</p>
                      </div>
                      <Badge className="bg-brand-500/10 text-brand-300 border-brand-500/20 text-xs shrink-0">
                        {job.salary}
                      </Badge>
                    </div>

                    <p className="text-xs text-ink-500 mt-1.5 leading-relaxed line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-ink-500">
                      <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                      {job.remote && <Badge className="bg-teal-500/10 text-teal-300 border-teal-500/20 text-xs">Remote</Badge>}
                      <span className="flex items-center gap-1"><Clock size={11} /> {job.posted}</span>
                      <Badge className={`text-xs ${job.type === "Internship" ? "bg-amber-500/10 text-amber-300 border-amber-500/20" : "bg-white/[0.04] text-ink-400 border-white/[0.08]"}`}>
                        {job.type}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.04]">
                      <div className="flex flex-wrap gap-1.5">
                        {job.skills.slice(0, 3).map((s) => (
                          <span key={s} className="text-xs px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] rounded-full text-ink-400">
                            {s}
                          </span>
                        ))}
                      </div>
                      <Button size="sm" className="gap-1.5 bg-brand-500/10 text-brand-300 border border-brand-500/20 hover:bg-brand-500/20 text-xs shrink-0">
                        {t("alumni_apply")} <ExternalLink size={11} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Post a job */}
          <Card className="p-5 border-brand-500/20 bg-brand-500/[0.03] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-brand-500/10 border border-brand-500/20">
                  <Building2 size={16} className="text-brand-400" />
                </div>
                <h3 className="font-semibold text-ink-100">Hiring AtomCamp Grads?</h3>
              </div>
              <p className="text-xs text-ink-400 leading-relaxed mb-4">
                Post a job and reach 6,000+ trained developers, data analysts, and AI engineers — pre-vetted by AtomCamp's curriculum.
              </p>
              <Button className="w-full bg-[#00ED64] hover:bg-[#00c853] text-black font-semibold text-sm gap-2">
                <Briefcase size={14} /> Post a Job
              </Button>
            </div>
          </Card>

          {/* Skills in demand */}
          <Card className="p-5">
            <h3 className="font-semibold text-ink-200 mb-4 flex items-center gap-2">
              <Zap size={14} className="text-brand-400" /> Top Skills in Demand
            </h3>
            <div className="space-y-2.5">
              {[
                { skill: "Python", jobs: 24, pct: 80 },
                { skill: "React",  jobs: 18, pct: 60 },
                { skill: "SQL",    jobs: 15, pct: 50 },
                { skill: "ML/AI",  jobs: 12, pct: 40 },
                { skill: "Django", jobs: 9,  pct: 30 },
              ].map((item) => (
                <div key={item.skill}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-ink-300 font-medium">{item.skill}</span>
                    <span className="text-ink-500">{item.jobs} jobs</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full transition-all duration-500"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick stats */}
          <Card className="p-5">
            <h3 className="font-semibold text-ink-200 mb-4 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-brand-400" /> Alumni Advantages
            </h3>
            <ul className="space-y-2">
              {[
                "Verified skills via VARK assessment",
                "Certificate of completion",
                "Portfolio project included",
                "Direct recruiter referrals",
                "Salary negotiation support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-ink-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Success stories */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Alumni Success Stories</h2>
          <p className="text-ink-400">Unhi ki zubaani — jo pehle wahin the jahan aap hain</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {STORIES.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.1 }}
            >
              <Card className={`p-6 border ${s.color} h-full flex flex-col`}>
                <Quote size={20} className="text-brand-400/40 mb-3" />
                <p className="text-sm text-ink-300 leading-relaxed flex-1 italic">"{s.quote}"</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.06]">
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-bold ${s.color}`}>
                    {s.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-100">{s.name}</p>
                    <p className="text-xs text-ink-500">{s.role}</p>
                  </div>
                  <Badge className="ml-auto bg-brand-500/10 text-brand-300 border-brand-500/20 text-xs">{s.batch}</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
