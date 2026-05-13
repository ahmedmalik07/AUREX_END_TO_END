# AtomCamp Smart LMS — AUREX AI 2026 Showcase

> **Learning That Adapts To Every Mind**
>
> An intelligent, adaptive Learning Management System that personalizes curricula based on cognitive profiles (VARK), predicts at-risk students using Random Forest ML, and delivers content through an AI-powered 3D chatbot — all running offline-first with no external AI APIs required.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Screens & User Flows](#screens--user-flows)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema (Supabase)](#database-schema-supabase)
- [API Endpoints](#api-endpoints)
- [VARK Learning Styles](#vark-learning-styles)
- [Course Curriculum](#course-curriculum)
- [3D Chatbot: Atom](#3d-chatbot-atom)
- [Screenshots](#screenshots)
- [Team & Acknowledgments](#team--acknowledgments)

---

## Overview

AtomCamp Smart LMS is a next-generation adaptive learning platform built for the **AUREX AI 2026** showcase. It combines:

- **Cognitive profiling** using VARK assessment
- **AI-generated personalized learning paths** with PKR pricing
- **Offline-first ML risk prediction** using Random Forest
- **A 3D interactive chatbot** named Atom
- **Supabase-powered authentication & progress tracking**

The system serves two primary user types:
- **Learners** — Get assessed, discover their learning style, purchase adaptive courses, and learn with personalized content
- **Instructors** — Upload cohort data, train ML models instantly, and receive at-risk student predictions with intervention recommendations

---

## Key Features

### For Learners

| Feature | Description |
|---------|-------------|
| **VARK Cognitive Assessment** | 12-question interactive quiz that determines Visual, Auditory, Reading, or Kinesthetic dominance |
| **AI-Generated Learning Paths** | Personalized course recommendations based on cognitive profile + goals + budget |
| **Adaptive Course Content** | Every lesson has **4 versions** (Visual, Auditory, Reading, Kinesthetic) that users can switch between |
| **Interactive Code Playground** | Run Python code examples directly in the lesson player with instant output |
| **Mermaid Diagrams** | Visual flowcharts and concept maps rendered in every lesson |
| **Quiz System** | Multiple-choice quizzes per lesson with instant feedback and score tracking |
| **Progress Tracking** | Recharts-powered dashboard showing weekly activity, skill radar, and completion stats |
| **Course Purchase Flow** | Complete checkout with confetti celebration and enrollment confirmation |
| **3D Learning Environment** | Floating geometric shapes and particle backgrounds via React Three Fiber |

### For Instructors

| Feature | Description |
|---------|-------------|
| **Cohort CSV Upload** | Drag-and-drop CSV upload for student data |
| **Instant Random Forest Training** | Scikit-learn model trains in real-time on uploaded data |
| **Risk Prediction** | Automatically identifies at-risk students with color-coded badges (green/yellow/red) |
| **Intervention Recommendations** | AI-suggested actions for each at-risk student |
| **Model Performance Metrics** | Accuracy, F1-score, dataset size, and feature count displayed |
| **Downloadable Reports** | Export predictions as CSV for offline analysis |

### Platform-Wide

| Feature | Description |
|---------|-------------|
| **Supabase Auth** | Email/password authentication with protected routes |
| **Test Result Storage** | VARK scores and dominant styles persisted per user |
| **Course Progress Sync** | Lesson completions, quiz scores, and time tracking saved to cloud |
| **3D Chatbot: Atom** | Interactive GLB robot model that answers questions about AtomCamp, Python, AI/ML |
| **Pitch Mode** | Toggle for presentation-friendly large text mode |
| **Dark UI** | Premium dark theme inspired by Arthur AI with glassmorphism effects |
| **Responsive Design** | Works on desktop, tablet, and mobile |
| **Offline-First ML** | No external AI APIs — everything runs locally |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 14)                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Learner   │  │   Course    │  │     Instructor      │  │
│  │   Portal    │  │   Player    │  │     Dashboard       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│         │                │                   │               │
│  ┌──────┴────────────────┴───────────────────┴──────┐       │
│  │           Shared Components & Hooks               │       │
│  │  • 3D Chatbot (Atom)  • VARK Radar (Recharts)     │       │
│  │  • Progress Charts    • Mermaid Diagrams          │       │
│  │  • Supabase Client    • Auth Modal                │       │
│  └───────────────────────────────────────────────────┘       │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────┴──────────────────────────────────┐
│                        BACKEND (FastAPI)                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  /generate  │  │  /predict   │  │  /upload            │  │
│  │    -path    │  │   -risk     │  │   -dataset          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│         │                │                   │               │
│  ┌──────┴────────────────┴───────────────────┴──────┐       │
│  │              ML & Data Processing                 │       │
│  │  • Random Forest (scikit-learn)  • Pandas        │       │
│  │  • NumPy  • Joblib model serialization           │       │
│  └───────────────────────────────────────────────────┘       │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────┴──────────────────────────────────┐
│                    DATABASE (Supabase)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   profiles  │  │ test_results│  │  course_progress    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Screens & User Flows

### Learner Journey

```
Landing Page
     │
     ▼
Learner Onboarding (/learner)
  ├── Step 1: Basic Profile (name, background, goal, time, budget)
  ├── Step 2: VARK Cognitive Assessment (12 questions)
  ├── Step 3: AI Analysis (loading state with confetti)
  └── Step 4: Results Dashboard
        ├── VARK Radar Chart
        ├── Personalized Learning Path
        ├── Path Explanation
        └── CTA: "View My Course" → redirects to /course?style={dominant}

Course Catalog (/course)
  ├── Hero: Course title, rating, stats
  ├── Learning Style Badge (personalized)
  ├── Adaptation Hints (5 cards for your style)
  ├── Course Features (8 highlights)
  ├── Curriculum (4 weeks with topics)
  └── CTA: "Enroll Now" → Purchase Flow

Purchase Flow
  ├── Step 1: Order Summary + pricing
  ├── Step 2: Secure Payment (mock)
  └── Step 3: Success + Confetti + "Start Learning"

Learning Dashboard (/course — post-purchase)
  ├── Sidebar: Week/Day/Lesson tree with completion status
  ├── Stats: Progress %, Lessons Done, Time Spent, Streak
  ├── Continue Learning card
  ├── Weekly Activity Chart (Recharts bar chart)
  └── Week Cards with progress bars

Lesson Player
  ├── 4 Learning Style Tabs (Visual / Audio / Reading / Hands-On)
  ├── Markdown Content (adapted per style)
  ├── Mermaid Diagrams
  ├── Code Examples with "Run" button
  ├── Quick Quiz with instant feedback
  ├── Navigation: Previous / Mark Complete / Next
```

### Instructor Journey

```
Instructor Dashboard (/instructor)
  ├── Cohort CSV Upload
  ├── Model Training (instant)
  └── Results:
        ├── Model Metrics (accuracy, F1, dataset size)
        ├── Risk Overview Cards (green/yellow/red counts)
        ├── Sortable Risk Table with interventions
        └── Download Report button
```

---

## Technology Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type safety across the codebase |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Page transitions, animations, AnimatePresence |
| **Recharts** | Radar charts, bar charts, pie charts for progress |
| **React Three Fiber** | 3D scenes with Three.js in React |
| **React Three Drei** | Helpers: useGLTF, Float, Stars, MeshDistortMaterial, OrbitControls |
| **Mermaid** | Flowchart and diagram rendering |
| **Canvas Confetti** | Celebration effects on purchase completion |
| **Lucide React** | Icon library |
| **Supabase JS Client** | Auth and database operations |

### Backend

| Technology | Purpose |
|------------|---------|
| **FastAPI** | High-performance Python API framework |
| **scikit-learn** | Random Forest classifier for risk prediction |
| **Pandas** | Data manipulation and CSV processing |
| **NumPy** | Numerical computations |
| **Joblib** | Model serialization and caching |
| **Uvicorn** | ASGI server |

### Database & Auth

| Technology | Purpose |
|------------|---------|
| **Supabase** | PostgreSQL database + Auth + Realtime |
| **Row Level Security** | User data isolation |

---

## Project Structure

```
aurex/
├── backend/
│   ├── main.py                 # FastAPI app entry point
│   ├── models.py               # Pydantic models
│   ├── data.py                 # Dataset loading & preprocessing
│   ├── utils/
│   │   └── ml_utils.py         # Random Forest training & prediction
│   ├── uploads/                # Uploaded CSV files
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Root layout with Navbar + Chatbot
│   │   ├── globals.css         # Tailwind + custom utilities
│   │   ├── learner/
│   │   │   └── page.tsx        # Onboarding + Assessment flow
│   │   ├── course/
│   │   │   └── page.tsx        # Catalog → Purchase → Dashboard
│   │   └── instructor/
│   │       └── page.tsx        # ML Dashboard
│   │
│   ├── components/
│   │   ├── ui/                 # Reusable UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── Select.tsx
│   │   │   └── Table.tsx
│   │   │
│   │   ├── AtomChatbot.tsx     # 3D robot chatbot
│   │   ├── AuthModal.tsx       # Sign in/up modal
│   │   ├── CognitiveAssessment.tsx  # 12-question VARK quiz
│   │   ├── OnboardingForm.tsx  # Basic profile form
│   │   ├── VarkRadar.tsx       # Recharts radar chart
│   │   ├── LearningPath.tsx    # Milestone timeline
│   │   ├── PathExplanation.tsx # Why this path?
│   │   ├── CourseCatalog.tsx   # Course showcase page
│   │   ├── CoursePurchase.tsx  # Checkout flow
│   │   ├── CourseDashboard.tsx # Learning dashboard
│   │   ├── LessonPlayer.tsx    # Lesson content renderer
│   │   ├── ThreeBackground.tsx # 3D floating shapes
│   │   ├── MermaidDiagram.tsx  # Diagram renderer
│   │   ├── ProgressStats.tsx   # Recharts charts
│   │   ├── DatasetUploader.tsx # CSV upload
│   │   ├── CohortOverview.tsx  # Risk stats cards
│   │   ├── RiskTable.tsx       # Sortable risk table
│   │   ├── StudentRiskCard.tsx # Individual risk card
│   │   ├── InterventionPanel.tsx # Intervention suggestions
│   │   ├── Navbar.tsx          # Top navigation
│   │   └── PitchModeToggle.tsx # Presentation mode
│   │
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client + types
│   │   ├── courseData.ts       # Full Python course curriculum
│   │   ├── config.ts           # API base URL
│   │   └── utils.ts            # Tailwind cn() helper
│   │
│   ├── hooks/
│   │   └── useApi.ts           # API fetch hook
│   │
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   │
│   ├── public/
│   │   ├── logo.png            # AtomCamp logo
│   │   └── robot.glb           # 3D robot model for Atom
│   │
│   ├── supabase-setup.sql      # Database schema
│   └── package.json
│
├── scripts/
│   └── kill-ports.js
│
├── README.md                   # This file
├── ADAPTATION_GUIDE.md         # Agent instructions
└── PITCH_SCRIPT.md             # Demo script
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8002
```

Backend runs at `http://localhost:8002`

### Run Both (Concurrently)

```bash
npm run dev:all  # from project root
```

---

## Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_BASE=http://localhost:8002
NEXT_PUBLIC_SUPABASE_URL=https://rghnpixkvwstdnqulhef.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Backend (.env)

```env
# No external API keys needed — runs fully offline
```

---

## Database Schema (Supabase)

### `profiles`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Links to `auth.users` |
| `email` | TEXT | User email |
| `full_name` | TEXT | Display name |
| `created_at` | TIMESTAMPTZ | Registration date |

### `test_results`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Auto-generated |
| `user_id` | UUID (FK) | Owner |
| `vark_scores` | JSONB | `{visual, auditory, reading, kinesthetic}` |
| `dominant_style` | TEXT | Highest scoring style |
| `created_at` | TIMESTAMPTZ | Assessment date |

### `course_progress`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Auto-generated |
| `user_id` | UUID (FK) | Owner |
| `course_id` | TEXT | e.g. `python-basics` |
| `completed_lessons` | JSONB | Array of lesson IDs |
| `quiz_scores` | JSONB | `{lessonId: score}` |
| `total_time_minutes` | INTEGER | Cumulative study time |
| `updated_at` | TIMESTAMPTZ | Last activity |

**Setup:** Run `frontend/supabase-setup.sql` in your Supabase SQL Editor.

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/generate-path` | POST | Takes user profile + VARK scores, returns personalized learning path |
| `/upload-dataset` | POST | Accepts CSV file, trains Random Forest model |
| `/predict-risk` | POST | Returns at-risk student predictions |
| `/model-info` | GET | Returns current model metrics |
| `/download-report` | GET | Exports predictions as CSV |

---

## VARK Learning Styles

The platform adapts content based on four cognitive learning preferences:

| Style | How They Learn Best | Content Adaptation |
|-------|---------------------|-------------------|
| **Visual** | Images, diagrams, spatial understanding | Flowcharts, mind maps, color-coded syntax, infographics |
| **Auditory** | Listening, speaking, discussions | Narrated explanations, verbal exercises, podcast-style content |
| **Reading** | Text, notes, documentation | Comprehensive written guides, glossaries, annotated code |
| **Kinesthetic** | Hands-on, doing, moving | Interactive exercises, physical analogies, coding challenges |

---

## Course Curriculum

### Programming Basics with Python

**Price:** PKR 24,999 (was PKR 45,000)
**Duration:** 4 Weeks | 40 Lessons | 60+ Hours

| Week | Title | Topics |
|------|-------|--------|
| **Week 1** | Python Foundations | Variables & Data Types, Operators, String Mastery, I/O, Profile Card Project |
| **Week 2** | Control Flow & Logic | Boolean Logic, if/elif/else, for/while Loops, List Comprehensions, Guessing Game |
| **Week 3** | Data Structures | Lists & Methods, Dictionaries, Tuples & Sets, Comprehensions, Contact Book Project |
| **Week 4** | Functions & Files | Defining Functions, Parameters & Return, File I/O, Error Handling, Capstone Project |

Each lesson contains:
- 4 VARK-adapted content versions
- Code examples with interactive "Run" button
- Mermaid concept diagrams
- Quick quiz with instant feedback
- Additional resources

---

## 3D Chatbot: Atom

**Atom** is a round, wheeled, futuristic robot powered by React Three Fiber.

### Features
- Loads your Sketchfab GLB model (`robot.glb`)
- **Idle animation**: Gentle floating and auto-rotation
- **Talking animation**: Playful spinning and wobbling when responding
- **Knowledge areas**: AtomCamp, Python, VARK, AI/ML, pricing, careers
- **Personality**: Playful, energetic, emoji-loving, makes coding jokes
- **Quick replies** for common questions
- Accessible from every page via floating button

---

## Screenshots

### Landing Page
Hero section with gradient text, feature grid, and two portal cards (Learner / Instructor).

### Learner Onboarding
Multi-step form → 12-question cognitive assessment → AI analysis → personalized results dashboard.

### Course Catalog
Course showcase with learning style badge, adaptation hints, curriculum, and enrollment CTA.

### Purchase Flow
Order summary → secure payment form → success screen with confetti.

### Learning Dashboard
Arthur AI-inspired layout: sidebar navigation, progress stats, weekly activity chart, week cards.

### Lesson Player
4 learning style tabs, markdown content, mermaid diagrams, code playground, quizzes.

### Instructor Dashboard
CSV upload → instant model training → risk table with color-coded badges and intervention recommendations.

### Atom Chatbot
3D robot in chat header, message history, quick replies, playful responses.

---

## Performance & Privacy

- **Offline-First ML**: Random Forest trains locally — no data leaves your server
- **No External AI APIs**: All intelligence runs on-device or on your backend
- **Fast Builds**: Next.js static generation for instant page loads
- **3D Optimization**: Dynamic imports with `ssr: false` for Three.js components

---

## Team & Acknowledgments

Built for **AUREX AI 2026** by the AtomCamp team.

- **AtomCamp**: Pakistan's leading tech bootcamp with 6,000+ learners trained
- **Mission**: Making tech education accessible, adaptive, and effective for every mind
- **Stats**: 65% women in tech | 70% graduation rate | 26+ cohorts completed

---

## License

Built for showcase purposes. All rights reserved by AtomCamp.

---

> *"Python is the language you think in. When you have an idea, you can express it in Python almost as fast as you can speak it."* — Atom
