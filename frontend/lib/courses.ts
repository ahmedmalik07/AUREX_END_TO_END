import { AdaptationHints } from "@/types"

export interface CourseMeta {
  id: string
  title: string
  subtitle: string
  price: number
  duration: string
  lessons: number
  hours: number
  level: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
  icon: string
  color: string
  syllabus: { week: number; title: string; topics: string[]; icon: string }[]
  features: string[]
  adaptationHints: AdaptationHints
}

export const COURSE_REGISTRY: Record<string, CourseMeta> = {
  "python-basics": {
    id: "python-basics",
    title: "Programming Basics with Python",
    subtitle: "Master Python from zero to building real projects — personalized for how YOU learn best",
    price: 24999,
    duration: "4 Weeks",
    lessons: 40,
    hours: 60,
    level: "Beginner",
    tags: ["Python", "Programming", "Beginner", "Automation"],
    icon: "🐍",
    color: "from-emerald-500/20 to-teal-500/10",
    syllabus: [
      { week: 1, title: "Python Foundations", topics: ["Variables & Data Types", "Operators & Expressions", "String Mastery", "Input & Output", "Profile Card Project"], icon: "🐍" },
      { week: 2, title: "Control Flow & Logic", topics: ["Boolean Logic", "if/elif/else", "for Loops", "while Loops", "Number Guessing Game"], icon: "🔄" },
      { week: 3, title: "Data Structures", topics: ["Lists & Methods", "Dictionaries", "Tuples & Sets", "List Comprehensions", "Contact Book Project"], icon: "📊" },
      { week: 4, title: "Functions & Files", topics: ["Defining Functions", "Parameters & Return", "File I/O", "Error Handling", "Final Capstone Project"], icon: "⚡" },
    ],
    features: [
      "4 Weeks of Structured Learning",
      "40 In-Depth Lessons",
      "60+ Hours of Content",
      "VARK-Adaptive Curriculum",
      "Interactive Code Playground",
      "Real-World Projects",
      "Certificate of Completion",
      "Lifetime Access",
    ],
    adaptationHints: {
      visual: [
        "Color-coded syntax highlighting throughout",
        "Flowcharts and diagrams for every concept",
        "Mind maps connecting related ideas",
        "Animated code execution visualizations",
        "Infographic-style summary cards",
      ],
      auditory: [
        "Narrated explanations with real-world analogies",
        "Discussion prompts and verbal reflection exercises",
        "Audio summaries of each lesson",
        "Pair programming voice-guided walkthroughs",
        "Podcast-style concept deep-dives",
      ],
      reading: [
        "Comprehensive written tutorials with deep detail",
        "Step-by-step documentation-style guides",
        "Glossaries and reference sheets",
        "Written case studies and examples",
        "Annotated code with extensive comments",
      ],
      kinesthetic: [
        "Hands-on coding exercises in every lesson",
        "Interactive sandbox with instant feedback",
        "Build-real-things project milestones",
        "Physical analogy activities (trace code with fingers)",
        "Gamified challenges and coding duels",
      ],
    },
  },

  "web-dev": {
    id: "web-dev",
    title: "Web Development with HTML, CSS & JavaScript",
    subtitle: "Build beautiful, responsive websites from scratch — hands-on projects every step of the way",
    price: 29999,
    duration: "4 Weeks",
    lessons: 24,
    hours: 50,
    level: "Beginner",
    tags: ["HTML", "CSS", "JavaScript", "Web Dev", "Frontend"],
    icon: "🌐",
    color: "from-blue-500/20 to-cyan-500/10",
    syllabus: [
      { week: 1, title: "HTML Foundations", topics: ["Document Structure", "Semantic HTML", "Text, Links & Lists", "Images & Media", "HTML Forms"], icon: "📄" },
      { week: 2, title: "CSS Styling", topics: ["Selectors & Colors", "Typography", "Box Model", "Flexbox", "Responsive Design"], icon: "🎨" },
      { week: 3, title: "JavaScript Fundamentals", topics: ["Variables & Functions", "DOM Manipulation", "Events & Interactivity", "ES6+ Features", "Fetch & APIs"], icon: "⚡" },
      { week: 4, title: "Real Projects", topics: ["Portfolio Website", "Interactive Todo App", "Weather App", "Capstone Review", "Deployment Basics"], icon: "🚀" },
    ],
    features: [
      "4 Weeks of Hands-On Learning",
      "24 Project-Based Lessons",
      "50+ Hours of Content",
      "VARK-Adaptive Curriculum",
      "Live Code Playground",
      "3 Complete Project Builds",
      "Certificate of Completion",
      "Lifetime Access",
    ],
    adaptationHints: {
      visual: [
        "Color-coded HTML/CSS/JS syntax in every lesson",
        "Browser DevTools visualizations and screenshots",
        "Box model diagrams and Flexbox layout charts",
        "Before/after design comparisons",
        "Visual hierarchy and color theory infographics",
      ],
      auditory: [
        "Narrated walkthroughs of every code change",
        "'Describe the layout out loud' exercises",
        "Tag-name pronunciation guides and rhythm patterns",
        "Think-aloud debugging sessions",
        "Discussion prompts for UI/UX decisions",
      ],
      reading: [
        "Full MDN-style reference notes for every tag and property",
        "Annotated HTML/CSS/JS with line-by-line explanations",
        "Written case studies of real websites",
        "Comprehensive cheat sheets for CSS properties",
        "Step-by-step written project build guides",
      ],
      kinesthetic: [
        "Live-edit exercises with instant browser preview",
        "Build-and-break challenges for every concept",
        "Drag-and-drop layout practice activities",
        "Immediate feedback from browser dev tools",
        "Gamified CSS specificity and JS debugging challenges",
      ],
    },
  },

  "data-science": {
    id: "data-science",
    title: "Data Science Fundamentals",
    subtitle: "Go from raw data to machine learning models — using Python, Pandas, Matplotlib, and scikit-learn",
    price: 34999,
    duration: "4 Weeks",
    lessons: 24,
    hours: 55,
    level: "Intermediate",
    tags: ["Python", "Data Science", "Machine Learning", "Pandas", "scikit-learn"],
    icon: "📊",
    color: "from-violet-500/20 to-purple-500/10",
    syllabus: [
      { week: 1, title: "Python for Data Science", topics: ["NumPy Arrays", "Pandas Series & DataFrames", "Data Cleaning", "Indexing & Filtering", "Data Wrangling Project"], icon: "🐍" },
      { week: 2, title: "Data Analysis & Visualization", topics: ["EDA with Pandas", "Matplotlib Fundamentals", "Seaborn Plots", "Statistical Summaries", "Sales Dashboard"], icon: "📈" },
      { week: 3, title: "Machine Learning", topics: ["ML Concepts & sklearn", "Linear Regression", "Classification Trees", "Model Evaluation", "Feature Engineering"], icon: "🤖" },
      { week: 4, title: "Real-World Projects", topics: ["House Price Prediction", "Customer Churn Analysis", "End-to-End ML Pipeline", "Capstone Presentation", "Deployment Basics"], icon: "🏆" },
    ],
    features: [
      "4 Weeks of Data-Driven Learning",
      "24 Analytical Lessons",
      "55+ Hours of Content",
      "VARK-Adaptive Curriculum",
      "Jupyter Notebook Exercises",
      "3 Full ML Projects",
      "Certificate of Completion",
      "Lifetime Access",
    ],
    adaptationHints: {
      visual: [
        "Rich Matplotlib and Seaborn chart walkthroughs",
        "Data pipeline flowcharts and architecture diagrams",
        "Color-coded DataFrame visualizations",
        "Decision tree and model diagrams",
        "Infographic summaries of every algorithm",
      ],
      auditory: [
        "Narrated EDA walkthroughs with real datasets",
        "Think-aloud model selection discussions",
        "Verbal interpretation of statistical outputs",
        "Podcast-style 'why does this algorithm work?' deep dives",
        "Discussion prompts for business context of data",
      ],
      reading: [
        "Detailed written explanations of every algorithm",
        "Step-by-step Jupyter notebook commentary",
        "Comprehensive pandas and sklearn API references",
        "Written case studies from real data competitions",
        "Annotated research paper summaries",
      ],
      kinesthetic: [
        "Live Jupyter notebook exercises with real datasets",
        "Build-and-iterate model improvement challenges",
        "Hands-on data cleaning on messy CSV files",
        "Interactive sklearn pipeline construction",
        "Kaggle-style mini-competitions to test learning",
      ],
    },
  },
}

export const ALL_COURSES = Object.values(COURSE_REGISTRY)
