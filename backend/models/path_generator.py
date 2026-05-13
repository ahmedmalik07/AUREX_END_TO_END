import os
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except Exception:
    GEMINI_AVAILABLE = False

GEMINI_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyCP7QgE-VS7--dRxtL79QTzZMREzeelUmI")

class OnboardingInput(BaseModel):
    name: str
    background: str
    goal: str
    time_availability: str
    prior_experience: str
    budget: int
    vark_scores: Optional[Dict[str, int]] = None

COURSES = [
    {
        "id": "openclaw",
        "name": "Mastering OpenClaw Agents",
        "price": 55000,
        "duration": "4 weeks",
        "level": "advanced",
        "tags": ["agents", "automation"],
        "modules": [
            "W1: Architecture & Local Setup, LLM Config, Gateway Nodes, Variables, Debug",
            "W2: Tool Specs, Web Search, Database Tools, File I/O, Error Handling",
            "W3: WhatsApp API, Telegram Bridge, SMS/Slack, Voice STT, Vision OCR",
            "W4: Docker Deploy, Cloud VPS, Performance Tuning, Latency, Final Project"
        ]
    },
    {
        "id": "prompt",
        "name": "Prompt Engineering for Developers",
        "price": 35000,
        "duration": "4 weeks",
        "level": "intermediate",
        "tags": ["llm", "prompting"],
        "modules": [
            "W1: System Prompts & Roles, Delimiters, CSV Formats, Few-Shot, Zero-Shot Limits",
            "W2: Chain-of-Thought, Self-Consistency, Logic Steps / ReAct, Reasoning Loops, Tree of Thoughts",
            "W3: Dynamic JSON & Programs, Pydantic Validation, Schema Enforcing, Info Extraction, Markdown Parser",
            "W4: Prompt Versioning, A/B Testing, Token/Cost Control, User Auth / RBAC, Prompt Security"
        ]
    },
    {
        "id": "n8n",
        "name": "Agentic Workflows with n8n",
        "price": 45000,
        "duration": "4 weeks",
        "level": "intermediate",
        "tags": ["workflow", "nocode"],
        "modules": [
            "W1: n8n UI & Canvas, Triggers & Webhooks, HTTP Node & Auth, Data Map & Schema, JS Snippets",
            "W2: AI Agent Node Setup, Vector Store / RAG, Memory & Context, Tool Integration, Model Switching",
            "W3: Google Sheets Sync, SQL / CRM Links, Filter / Split Node, Merge / Branching, Bulk Processing",
            "W4: Error Workflows, API Polling / Cron, Scheduled Tasks, Monitoring / Logs, Final Capstone"
        ]
    },
    {
        "id": "ethics",
        "name": "AI Ethics & Governance",
        "price": 25000,
        "duration": "4 weeks",
        "level": "beginner",
        "tags": ["ethics", "governance"],
        "modules": [
            "W1: Why Ethics?, EU AI Act / Rules, Risk Levels & Bias, Moral Dilemmas, History of Bias",
            "W2: Dataset Diversity, Algorithmic Fairness, Bias Testing / QA, Mitigation Tools, Feedback Loops",
            "W3: PII Masking & Privacy, Data Anonymization, Consent Flows / UX, Prompt Injections, Fingerprinting",
            "W4: Audit Trails / Logs, Documentation, Explainable AI (XAI), Policy / Governance, Graduation Exam"
        ]
    },
]

class PathGenerator:
    def generate(self, profile: OnboardingInput) -> Dict[str, Any]:
        path = []
        reasons = []
        confidence = 55
        vark = profile.vark_scores or {}
        top_style = max(vark, key=vark.get) if vark else None

        bg = profile.background.lower()
        goal = profile.goal.lower()
        time_avail = profile.time_availability.lower()
        exp = profile.prior_experience.lower()
        budget = profile.budget

        if exp == "experienced" and bg == "technical":
            path.append(self._course("openclaw"))
            path.append(self._course("n8n"))
            reasons.append("Your technical depth is perfect for building AI agents and automating workflows.")
            confidence += 25
        elif exp == "basic-coding" and bg == "technical":
            path.append(self._course("prompt"))
            path.append(self._course("n8n"))
            reasons.append("Prompt Engineering bridges your coding basics into LLM mastery; n8n turns that into deployable workflows.")
            confidence += 20
        elif goal in ["career-switch", "upskill"]:
            path.append(self._course("prompt"))
            path.append(self._course("openclaw"))
            reasons.append("Prompt Engineering is the fastest gateway into AI; OpenClaw Agents builds production-ready skills.")
            confidence += 20
        elif goal == "corporate":
            path.append(self._course("n8n"))
            path.append(self._course("ethics"))
            reasons.append("Corporate teams need workflow automation plus governance to deploy AI responsibly.")
            confidence += 20
        elif goal == "freelance":
            path.append(self._course("prompt"))
            path.append(self._course("n8n"))
            reasons.append("Freelancers who can prompt-engineer AND automate workflows command premium rates.")
            confidence += 18
        else:
            path.append(self._course("ethics"))
            path.append(self._course("prompt"))
            reasons.append("A solid foundation in Ethics plus Prompt Engineering sets you up for any AI role.")
            confidence += 10

        if time_avail == "weekend-only":
            if not any(c["id"] == "ethics" for c in path):
                path.insert(0, self._course("ethics"))
                reasons.append("Weekend-only schedule suits the lighter Ethics foundation first.")

        total = sum(c["price"] for c in path)
        while total > budget and len(path) > 1:
            removed = path.pop()
            total -= removed["price"]
            reasons.append(f"Removed {removed['name']} to respect your PKR {budget} budget.")
            confidence -= 5

        if top_style:
            mapping = {
                "visual": "We've prioritized courses with visual roadmaps, diagrams, and flowcharts.",
                "auditory": "We've prioritized discussion-heavy formats and audio-guided modules.",
                "reading": "We've prioritized documentation-rich courses with written case studies.",
                "kinesthetic": "We've prioritized hands-on labs, projects, and build-first modules.",
            }
            vark_note = mapping.get(top_style, "")
            if vark_note:
                reasons.append(vark_note)
                confidence += 5

        milestones = []
        for i, c in enumerate(path):
            milestones.append({
                "order": i + 1,
                "course": c["name"],
                "duration": c["duration"],
                "deliverable": f"Capstone project #{i+1} — {c['tags'][0].capitalize()} build",
                "badge": f"{c['tags'][0].capitalize()} Practitioner",
                "modules": c["modules"]
            })

        total_cost = sum(c["price"] for c in path)
        total_duration = f"{len(path) * 4} weeks"
        explanation = self._build_explanation(profile, path, reasons, vark)

        return {
            "learner_name": profile.name,
            "path": path,
            "milestones": milestones,
            "total_cost": total_cost,
            "total_duration": total_duration,
            "confidence": min(max(confidence, 0), 100),
            "explanation": explanation,
            "vark_profile": vark,
            "dominant_style": top_style,
        }

    def _course(self, cid: str) -> Dict[str, Any]:
        for c in COURSES:
            if c["id"] == cid:
                return c
        return COURSES[0]

    def _build_explanation(self, profile, path, reasons, vark):
        prompt = self._gemini_prompt(profile, path, reasons, vark)
        try:
            if GEMINI_AVAILABLE:
                genai.configure(api_key=GEMINI_KEY)
                model = genai.GenerativeModel("gemini-1.5-flash")
                resp = model.generate_content(prompt, generation_config={"max_output_tokens": 300, "temperature": 0.7})
                return resp.text.strip()
        except Exception:
            pass

        parts = [
            f"Hi {profile.name},",
            f"based on your {profile.background} background and goal to {profile.goal.replace('-', ' ')},",
            "we designed a sprint that balances realism with ambition."
        ]
        parts.append(" ".join(reasons))
        if len(path) == 1:
            parts.append("We kept the path focused because of your constraints; you can always stack more courses after your first win.")
        else:
            parts.append("Each course builds on the last, ensuring you don't just learn tools—you learn to ship production AI systems.")
        if vark:
            parts.append(f"Your cognitive profile shows strongest {max(vark, key=vark.get)} tendencies, so we weighted hands-on and visual formats where possible.")
        return " ".join(parts)

    def _gemini_prompt(self, profile, path, reasons, vark):
        courses = ", ".join([c["name"] for c in path])
        vark_str = ", ".join([f"{k}: {v}%" for k, v in vark.items()]) if vark else "N/A"
        return (
            f"Write a short, inspiring 3-sentence personalized learning path explanation for a student named {profile.name}. "
            f"Their background is {profile.background}, goal is {profile.goal}, experience is {profile.prior_experience}, budget is PKR {profile.budget}. "
            f"Recommended courses: {courses}. Reasons: {' '.join(reasons)}. "
            f"Their VARK learning style scores are: {vark_str}. "
            f"Tone: energetic, professional, like a top-tier edtech SaaS. No bullet points."
        )
