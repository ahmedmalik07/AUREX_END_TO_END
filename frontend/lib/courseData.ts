import { Week, AdaptationHints, CourseProgress, LearningStyle } from "@/types"

export const COURSE_TITLE = "Programming Basics with Python"
export const COURSE_SUBTITLE = "Master Python from zero to building real projects — personalized for how YOU learn best"
export const COURSE_PRICE = 24999
export const COURSE_DURATION = "4 Weeks"
export const COURSE_LESSONS = 40
export const COURSE_HOURS = 60

export const ADAPTATION_HINTS: AdaptationHints = {
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
}

export const COURSE_FEATURES = [
  "4 Weeks of Structured Learning",
  "40 In-Depth Lessons",
  "60+ Hours of Content",
  "VARK-Adaptive Curriculum",
  "Interactive Code Playground",
  "Real-World Projects",
  "Certificate of Completion",
  "Lifetime Access",
]

export const COURSE_SYLLABUS = [
  {
    week: 1,
    title: "Python Foundations",
    topics: ["Variables & Data Types", "Operators & Expressions", "String Mastery", "Input & Output", "Profile Card Project"],
    icon: "🐍",
  },
  {
    week: 2,
    title: "Control Flow & Logic",
    topics: ["Boolean Logic", "if/elif/else", "for Loops", "while Loops", "Number Guessing Game"],
    icon: "🔄",
  },
  {
    week: 3,
    title: "Data Structures",
    topics: ["Lists & Methods", "Dictionaries", "Tuples & Sets", "List Comprehensions", "Contact Book Project"],
    icon: "📊",
  },
  {
    week: 4,
    title: "Functions & Files",
    topics: ["Defining Functions", "Parameters & Return", "File I/O", "Error Handling", "Final Capstone Project"],
    icon: "⚡",
  },
]

// Simplified week structure for the demo - each lesson will pull from lessonContents
export const PYTHON_COURSE_WEEKS: Week[] = [
  {
    id: "week-1",
    title: "Week 1: Python Foundations",
    description: "Set up your environment, learn syntax, variables, data types, and basic operators.",
    days: [
      {
        id: "w1-d1",
        title: "Day 1: Welcome to Python",
        lessons: [
          {
            id: "w1-d1-l1",
            title: "What is Programming?",
            description: "Understand what programming means and why Python is the perfect first language.",
            duration: 25,
            difficulty: "beginner",
            content: {
              visual: "## What is Programming? (Visual Guide)\\n\\nProgramming is like giving instructions to a very obedient but literal-minded robot. Imagine teaching someone to make tea - every tiny step matters.\\n\\n### Why Python?\\n- **Simple syntax**: print(\"Hello\") vs public static void main...\\n- **Readable**: Code looks like English\\n- **Versatile**: Web, AI, Data Science, Automation\\n\\n### Python's Design Philosophy\\n- Readability counts\\n- Simple is better than complex\\n- There should be one obvious way to do it",
              auditory: "## What is Programming? (Listen & Learn)\\n\\nThink of programming as having a conversation with your computer - but one where you must be extremely precise and clear.\\n\\n### Why Python? (Audio Narrative)\\nPython was created by Guido van Rossum in 1991. He named it after Monty Python. His goal was simple: make a programming language that reads like plain English.\\n\\nSay this out loud: print(\"Hello, World!\")\\nIt literally says 'print Hello World.' You can almost hear what it does.\\n\\n### Verbal Exercise\\nDescribe to a friend how you would tell a robot to make a sandwich. Notice how many tiny steps you need? That's programming - breaking big ideas into tiny, explicit instructions.",
              reading: "## What is Programming? (Deep Dive)\\n\\nProgramming is the art and science of writing instructions that a computer can execute. Python is a high-level, interpreted programming language known for its emphasis on code readability.\\n\\n### The History and Philosophy of Python\\nPython was conceived in the late 1980s by Guido van Rossum. It was first released in 1991. The design philosophy emphasizes:\\n\\n1. **Readability counts** - Code is read far more often than it is written\\n2. **Explicit is better than implicit** - Clarity over cleverness\\n3. **Simple is better than complex** - Avoid unnecessary complication\\n4. **There should be one obvious way to do it** - Consistency breeds mastery\\n\\n### Why Python for Beginners?\\nPython removes the boilerplate that other languages require. In Java, printing 'Hello' requires a class definition. In Python:\\n\\nprint(\"Hello, World!\")\\n\\nThat's it. One line. This simplicity means you spend less time fighting syntax and more time learning computational thinking.",
              kinesthetic: "## What is Programming? (Hands-On)\\n\\nProgramming is like being a chef writing a recipe for a very precise kitchen robot.\\n\\n### Activity: The Peanut Butter Sandwich Exercise\\nGrab a piece of paper and pen. Write step-by-step instructions for making a peanut butter sandwich. Now pretend you're a robot:\\n\\n1. Did you say 'open the jar' or did the robot try to spread peanut butter with the lid on?\\n2. Did you say 'pick up the knife' or did the robot use its hand?\\n\\n**This is programming!** Computers are exactly like this robot.\\n\\n### Python Setup (Do It Now)\\n1. Open python.org and download Python 3.12+\\n2. Open terminal, type python\\n3. Type: print(\"I am a programmer!\")\\n\\n**Feel that?** You just ran your first Python command. The computer obeyed you instantly.\\n\\n### Kinesthetic Coding Warm-Up\\nTrace this code with your finger, saying each word aloud:\\n\\nname = \"Alex\"\\nprint(\"Hello, \" + name)\\n\\nRun it. Change the name. Run it again. **The magic:** You changed one word, and the output changed. YOU are in control.",
            },
            codeExamples: [
              { title: "Your First Program", code: 'print("Hello, World!")\\nprint("My name is Python")\\nprint("I am", 2024 - 1991, "years old")', explanation: "The print() function displays text or values.", output: "Hello, World!\\nMy name is Python\\nI am 33 years old" },
            ],
            diagram: "graph TD\\n    A[You Write Code] --> B[Python Interpreter]\\n    B --> C[Computer Executes]\\n    C --> D[Output Displayed]",
            quiz: [
              { question: "What makes Python a good first language?", options: ["Requires lots of boilerplate", "Reads like English with simple syntax", "Only runs on Windows", "Created in 2020"], correctIndex: 1, explanation: "Python's syntax is readable and intuitive." },
            ],
            resources: [{ title: "Python Getting Started", type: "article" }],
          },
          {
            id: "w1-d1-l2",
            title: "Setting Up Your Environment",
            description: "Install Python, VS Code, and configure your workspace for success.",
            duration: 30,
            difficulty: "beginner",
            content: {
              visual: "## Setting Up Your Workspace (Visual Guide)\\n\\n### Recommended Layout\\n- Left: VS Code (code editor)\\n- Right: Terminal (output)\\n\\n### VS Code Extensions\\n1. Python (Microsoft) - syntax highlighting\\n2. Pylance - type checking\\n3. Code Runner - one-click execution\\n4. Rainbow Brackets - color-matched brackets\\n\\n### Color Themes\\n- Dark+: Easy on the eyes\\n- One Dark Pro: Vibrant colors\\n- Dracula: High contrast",
              auditory: "## Setting Up Your Environment (Audio Walkthrough)\\n\\n### Step-by-Step Audio Guide\\n\\n**Step 1: Installing Python**\\nGo to python.org. Download the latest version. During installation, check 'Add Python to PATH.' This is crucial - your computer can find Python from anywhere.\\n\\n**Step 2: Installing VS Code**\\nVisual Studio Code is free and powerful. Download from code.visualstudio.com.\\n\\n**Step 3: Extensions**\\nThink of extensions like apps on your phone. Search for 'Python' and install the official Microsoft extension.\\n\\n### Audio Tip\\nSay file names out loud when creating them. Hearing 'lesson_one.py' reinforces the connection between your mental model and the file system.\\n\\n### Verbal Check-In\\nSay aloud: 'I have Python installed. I have VS Code open. I am ready to code.'",
              reading: "## Setting Up Your Coding Environment (Comprehensive Guide)\\n\\n### 1. Installing Python\\nVisit python.org/downloads/ and download Python 3.12+. During installation:\\n\\n- **Windows**: Check 'Add Python to PATH'\\n- **macOS**: Use installer or brew install python\\n- **Linux**: Usually pre-installed. Verify with python3 --version\\n\\n### 2. Installing VS Code\\nVS Code is a free, open-source code editor. Download from code.visualstudio.com.\\n\\n**Why VS Code?**\\n- Intelligent code completion (IntelliSense)\\n- Built-in debugging\\n- Integrated terminal\\n- Cross-platform consistency\\n\\n### 3. Essential Extensions\\nOpen VS Code (Ctrl+Shift+X) and install:\\n\\n| Extension | Purpose |\\n|-----------|---------|\\n| Python | Core Python support |\\n| Pylance | Advanced type checking |\\n| Code Runner | Execute with Ctrl+Alt+N |\\n\\n### 4. Your First File\\nCreate folder 'python-course'. Open in VS Code. Create hello.py:\\n\\nprint('My environment is ready!')\\n\\nPress Ctrl+Alt+N to run.",
              kinesthetic: "## Setting Up Your Environment (Do It Now!)\\n\\nDon't just read this - DO IT. Your hands need to learn.\\n\\n### Hands-On Setup Challenge\\n\\n**Task 1: Download & Install (5 min)**\\n1. Go to python.org → Downloads → Python 3.12+\\n2. Run installer. CRITICAL: Check 'Add Python to PATH'\\n3. Open terminal, type python --version\\n\\n**Task 2: Install VS Code (5 min)**\\n1. Go to code.visualstudio.com\\n2. Download and install\\n\\n**Task 3: Extensions (3 min)**\\n1. In VS Code, click Extensions icon (four squares)\\n2. Search 'Python' → Install Microsoft one\\n3. Search 'Code Runner' → Install it\\n\\n**Task 4: Create Workspace (2 min)**\\n1. Create Desktop folder 'python-journey'\\n2. VS Code: File → Open Folder → Select it\\n3. New File → first.py\\n4. Type: print('I did it!')\\n5. Press Ctrl+Alt+N\\n\\n**Feel the success!** That output means your environment works.",
            },
            codeExamples: [
              { title: "Test Setup", code: 'import sys\\nprint("Python version:", sys.version)\\nprint("Ready to learn!" + " 🚀" * 3)', explanation: "Confirms Python is installed.", output: "Python version: 3.12.0...\\nReady to learn! 🚀🚀🚀" },
            ],
            quiz: [
              { question: "Why check 'Add Python to PATH'?", options: ["Makes Python faster", "Lets you run Python from any folder", "Installs extra libraries", "Changes wallpaper"], correctIndex: 1, explanation: "PATH lets the system find Python from any directory." },
            ],
            resources: [{ title: "VS Code Setup", type: "article" }],
          },
        ],
      },
      {
        id: "w1-d2",
        title: "Day 2: Variables & Data Types",
        lessons: [
          {
            id: "w1-d2-l1",
            title: "Understanding Variables",
            description: "Learn how to store and name data in your programs.",
            duration: 35,
            difficulty: "beginner",
            content: {
              visual: "## Variables (Visual Memory Boxes)\\n\\nImagine variables as labeled boxes in memory:\\n\\n| Box | Contents | Type |\\n|-----|----------|------|\\n| name | 'Sara' | str |\\n| age | 25 | int |\\n| price | 99.99 | float |\\n| is_ready | True | bool |\\n\\n### Naming Rules\\nGOOD: name, user_age, _total, PI\\nBAD: 1st_name, user-name, total price, class",
              auditory: "## Understanding Variables (Listen & Speak)\\n\\nA variable is like a name tag on a box. You write 'favorite_number' on it, put 7 inside. Now 'favorite_number' means 7.\\n\\n### Say It Out Loud\\n\\nname = 'Ayesha'\\nage = 22\\nis_student = True\\n\\nSay: 'Name GETS Ayesha. Age GETS 22. Is student GETS True.'\\n\\nThe = sign is ASSIGNMENT, not math equals. It means 'put this value into this container.'\\n\\n### Verbal Exercise\\nDescribe your room using variables:\\n- 'bed_color equals blue'\\n- 'number_of_pillows equals 4'\\n- 'is_window_open equals True'\\n\\nYou're already thinking like a programmer!",
              reading: "## Understanding Variables\\n\\nA variable is a named storage location that holds a value. In Python, you create a variable by assigning a value to a name:\\n\\nmessage = 'Hello, Python!'\\ncounter = 0\\npi = 3.14159\\nis_valid = True\\n\\nThe = operator is the assignment operator. It means 'store the value on the right into the name on the left.'\\n\\n### Naming Conventions (PEP 8)\\n1. Use descriptive names: student_name > sn\\n2. Use snake_case: lowercase with underscores\\n3. Avoid reserved keywords: class, def, if, for\\n4. Start with letter or underscore\\n5. Case-sensitive: Name != name\\n\\n### Multiple Assignment\\n# Swap without temporary variable\\na, b = 10, 20\\na, b = b, a  # Now a=20, b=10\\n\\n# Unpacking\\nx, y, z = 1, 2, 3",
              kinesthetic: "## Understanding Variables (Physical Modeling)\\n\\n### Activity: The Label Game\\nGet 3 objects. Write 'name' on a sticky note. Stick to object 1. Say: 'Variable name points here.' Now move the note to object 2. Say: 'Now name points here.'\\n\\n**This is reassignment!**\\n\\n### Activity 2: Terminal Practice\\nType EACH line, press Enter after every one:\\n\\nx = 5\\nprint(x)\\nx = 10\\nprint(x)\\nx = x + 1\\nprint(x)\\nname = 'Python'\\nname = name + ' is fun'\\nprint(name)\\n\\n### Trace the Code\\nUse your finger to trace:\\n\\nwidth = 10\\nheight = 20\\narea = width * height\\nprint(area)\\n\\n**Predict first:** What will area be? Then run it.",
            },
            codeExamples: [
              { title: "Variable Basics", code: 'name = "Zara"\\nage = 24\\nheight = 5.6\\nis_coder = True\\n\\nprint(name, "is", age, "years old")\\nprint("Height:", height, "feet")\\nprint("Coder:", is_coder)', explanation: "Variables hold different data types.", output: "Zara is 24 years old\\nHeight: 5.6 feet\\nCoder: True" },
              { title: "Reassignment", code: 'score = 0\\nprint("Initial:", score)\\nscore = score + 10\\nprint("After bonus:", score)\\nscore += 5\\nprint("Final:", score)', explanation: "+= is shorthand for adding to a variable.", output: "Initial: 0\\nAfter bonus: 10\\nFinal: 15" },
            ],
            diagram: "graph LR\\n    A[Variable Name] -->|references| B[Value]\\n    C[Reassignment] -->|new reference| D[New Value]",
            quiz: [
              { question: "Output of: x = 5; x = x + 3; print(x)?", options: ["5", "3", "8", "x+3"], correctIndex: 2, explanation: "x becomes 5 + 3 = 8" },
            ],
            resources: [{ title: "Variables Guide", type: "article" }],
          },
          {
            id: "w1-d2-l2",
            title: "Data Types Deep Dive",
            description: "Explore strings, integers, floats, booleans, and conversions.",
            duration: 40,
            difficulty: "beginner",
            content: {
              visual: "## Data Types (Visual Taxonomy)\\n\\n| Type | Example | Icon |\\n|------|---------|------|\\n| int | 42 | 🔢 |\\n| float | 3.14 | 📏 |\\n| str | 'Hello' | 📝 |\\n| bool | True | ✅ |\\n\\n### Type Conversion Flow\\n'42' --int()--> 42\\n42 --str()--> '42'\\n3.7 --int()--> 3 (truncates!)\\n3 --float()--> 3.0",
              auditory: "## Data Types (The Four Core Types)\\n\\nSay this rhythmically:\\n- **Int**: 'Integer, integer, counting things' (clap)\\n- **Float**: 'Float has a dot, decimal spot' (tap)\\n- **String**: 'String is text, inside quotes next' (snap)\\n- **Boolean**: 'Bool is true or false, that's the rule' (nod)\\n\\n### Type Conversion Audio\\nSay what happens:\\n- int('100') → 'Convert to integer one hundred'\\n- str(100) → 'Convert to string one-zero-zero'\\n- float(3) → 'Convert to float three-point-zero'\\n\\n### Warning\\nint(3.99) → Many think 4, but Python says 3. It truncates!",
              reading: "## Data Types Deep Dive\\n\\nPython is dynamically typed. Understanding types is crucial for correct programs.\\n\\n### Numeric Types\\n\\n**Integers (int)**: Whole numbers. Unlimited precision in Python 3.\\nage = 25\\npopulation = 8_000_000_000\\nbig = 2 ** 1000\\n\\n**Floating-Point (float)**: Numbers with decimals.\\npi = 3.14159\\ntemp = -5.5\\n\\n> **Warning**: 0.1 + 0.2 = 0.30000000000000004. Floats have representation errors.\\n\\n### Text Type: Strings (str)\\nname = 'Python'\\nquote = 'Python is simple'\\nmultiline = '''This spans\\nmultiple lines'''\\n\\n### Boolean Type (bool)\\nis_active = True\\nhas_permission = False\\n\\n### Type Conversion\\nint('42') → 42\\nstr(42) → '42'\\nfloat('3.14') → 3.14\\nbool(1) → True\\nbool(0) → False\\nbool('') → False (empty is falsy)",
              kinesthetic: "## Data Types (Touch & Feel)\\n\\n### Physical Type Sorting\\nGet 4 objects. Assign types:\\n1. Pen cap = Integer (whole, countable)\\n2. Ruler = Float (measured, continuous)\\n3. Name tag = String (text, labeled)\\n4. Light switch = Boolean (on/off)\\n\\n### Interactive Type Lab\\nType EACH line, PREDICT then RUN:\\n\\nx = 10\\nprint(type(x))  # Touch pen cap\\ny = 10.5\\nprint(type(y))  # Touch ruler\\nz = '10'\\nprint(type(z))  # Touch name tag\\\\na = int('50')\\nprint(a + 10)\\nb = str(100)\\nprint(b + ' dollars')\\nc = int(3.99)\\nprint(c)  # Is it 4? TRY IT!\\n\\n### Build a Type Converter\\nCreate type_lab.py:\\n\\nage_str = '25'\\nage = int(age_str)\\nfuture = age + 10\\nprint('In 10 years you will be ' + str(future))",
            },
            codeExamples: [
              { title: "Type Checking", code: 'name = "Python"\\nversion = 3.12\\nis_awesome = True\\nrating = 9.8\\n\\nprint(type(name))\\nprint(type(version))\\nprint(type(is_awesome))\\nprint(type(rating))', explanation: "Use type() to inspect data.", output: "<class 'str'>\\n<class 'int'>\\n<class 'bool'>\\n<class 'float'>" },
              { title: "Type Conversion", code: 'user_input = "42"\\nnumber = int(user_input)\\nprint(number + 8)\\n\\nscore = 95\\nmessage = "Your score is " + str(score)\\nprint(message)\\n\\nprint(int(7.9))  # 7, NOT 8!', explanation: "Essential for handling user input.", output: "50\\nYour score is 95\\n7" },
            ],
            diagram: "graph TD\\n    A[String '42'] -->|int| B[Integer 42]\\n    C[Integer 42] -->|str| D[String '42']\\n    E[Float 3.14] -->|int| F[Integer 3]\\n    G[Any non-zero] -->|bool| H[True]",
            quiz: [
              { question: "Result of int(5.9)?", options: ["6", "5", "5.9", "Error"], correctIndex: 1, explanation: "int() truncates the decimal part." },
              { question: "Type of 10 / 2 in Python 3?", options: ["int", "float", "str", "bool"], correctIndex: 1, explanation: "Division always returns float in Python 3." },
            ],
            resources: [{ title: "Data Types Reference", type: "cheatsheet" }],
          },
        ],
      },
      {
        id: "w1-d3",
        title: "Day 3: Operators & Expressions",
        lessons: [
          {
            id: "w1-d3-l1",
            title: "Arithmetic & Comparison Operators",
            description: "Master math operations and comparisons in Python.",
            duration: 35,
            difficulty: "beginner",
            content: {
              visual: "## Operators (Visual Cheat Sheet)\\n\\n### Arithmetic\\n| Op | Name | Ex | Result |\\n|----|------|----|--------|\\n| + | Add | 5+3 | 8 |\\n| - | Sub | 5-3 | 2 |\\n| * | Mul | 5*3 | 15 |\\n| / | Div | 5/2 | 2.5 |\\n| //| Floor | 5//2| 2 |\\n| % | Mod | 5%2 | 1 |\\n| **| Pow | 2**3| 8 |\\n\\n### Comparison\\n== Equal, != Not equal, > Greater, < Less, >= Ge, <= Le",
              auditory: "## Operators (Rhythm & Patterns)\\n\\n### Arithmetic Chants\\n- Plus plus, add it up: 5 + 3 = 8\\n- Minus minus, take away: 5 - 3 = 2\\n- Times times, multiply: 5 * 3 = 15\\n- Divide divide, share it out: 5 / 2 = 2.5\\n\\n### Modulo Song\\n'5 % 2 = 1' - remainder after division\\n\\n### Comparison Sounds\\n- 5 == 5: 'Five EQUALS-EQUALS five... TRUE!'\\n- 5 != 3: 'Five NOT-EQUAL three... TRUE!'\\n- 5 > 3: 'Five GREATER-THAN three... TRUE!'\\n\\nDouble equals == asks: 'Are these the same?'\\nSingle equals = commands: 'Make this equal that.'",
              reading: "## Arithmetic & Comparison Operators\\n\\nPython provides operators for calculations and comparisons.\\n\\n### Arithmetic\\n+ Addition, - Subtraction, * Multiplication, / Division (always float), // Floor Division, % Modulo, ** Exponentiation\\n\\n### Comparison\\n== Equal, != Not equal, > Greater, < Less, >= Greater/equal, <= Less/equal\\n\\n### Precedence\\n1. Parentheses ()\\n2. Exponentiation **\\n3. Unary +, -\\n4. *, /, //, %\\n5. +, -\\n6. Comparisons\\n7. not, and, or\\n\\nUse parentheses for clarity:\\nresult = (2 + 3) * (4 ** 2)  # 80",
              kinesthetic: "## Operators (Physical Computing)\\n\\n### Body Calculator\\n- 5 + 3: Hold 5 fingers, add 3, count. 8!\\n- 10 % 3: Deal 10 cards to 3 people. Leftover? 1!\\n- 2 ** 3: Start 2, double (4), double (8). That's 2 cubed!\\n\\n### Floor Division Model\\nGet 7 coins, 2 cups. Divide equally. Each gets 3. Leftover 1.\\n7 // 2 = 3, 7 % 2 = 1\\n\\n### Interactive Lab\\nType EACH line:\\n\\nprint(15 + 7)\\nprint(100 / 4)\\nprint(100 // 4)\\nprint(17 % 5)\\nprint(2 ** 10)\\nprint(10 == 10)\\nprint(15 > 10)\\n\\nresult = (10 + 5) * 2 - 8 / 4\\nprint(result)\\n\\n### Tip Calculator\\nCreate tip_calculator.py:\\n\\nbill = 2500  # PKR\\ntip = bill * 0.15\\ntotal = bill + tip\\nprint('Total:', total, 'PKR')",
            },
            codeExamples: [
              { title: "All Operators", code: 'a = 17\\nb = 5\\n\\nprint(f"{a} + {b} =", a + b)\\nprint(f"{a} - {b} =", a - b)\\nprint(f"{a} * {b} =", a * b)\\nprint(f"{a} / {b} =", a / b)\\nprint(f"{a} // {b} =", a // b)\\nprint(f"{a} % {b} =", a % b)\\nprint(f"{a} ** {b} =", a ** b)', explanation: "f-strings embed expressions in curly braces.", output: "17 + 5 = 22\\n17 - 5 = 12\\n17 * 5 = 85\\n17 / 5 = 3.4\\n17 // 5 = 3\\n17 % 5 = 2\\n17 ** 5 = 1419857" },
            ],
            quiz: [
              { question: "What is 17 // 4?", options: ["4.25", "4", "5", "1"], correctIndex: 1, explanation: "Floor division rounds DOWN." },
            ],
            resources: [{ title: "Operators Guide", type: "cheatsheet" }],
          },
        ],
      },
      {
        id: "w1-d4",
        title: "Day 4: String Mastery",
        lessons: [
          {
            id: "w1-d4-l1",
            title: "Strings, Formatting & Methods",
            description: "Master text manipulation.",
            duration: 40,
            difficulty: "beginner",
            content: {
              visual: "## String Mastery (Visual Guide)\\n\\n### Indexing\\nP y t h o n\\n0 1 2 3 4 5\\n-6-5-4-3-2-1\\n\\n### Slicing\\n[0:2] → 'Py', [2:] → 'thon', [:2] → 'Py', [-2:] → 'on', [::2] → 'Pto', [::-1] → 'nohtyP'\\n\\n### Methods\\n.upper() → HELLO, .lower() → hello, .title() → Hello, .strip() → no spaces, .replace() → swap text",
              auditory: "## String Mastery (Sound of Text)\\n\\n### Indexing Audio\\nSay 'PYTHON' - P-Y-T-H-O-N. That's 6 letters.\\n'Zero is P, one is Y, two is T...'\\n'Minus one is N, minus two is O...'\\n\\n### Slicing Rhythm\\ntext[0:2] → 'From zero UP-TO two'\\ntext[2:] → 'From two TO THE END'\\ntext[::-1] → 'Reversed!'\\n\\n### Method Spells\\n'hello'.upper() → 'UPPER-cased HELLO!'\\n'  hello  '.strip() → 'STRIPPED hello!'\\n\\n### f-String Demo\\nname = 'Sara'\\nprint(f'Hello, {name}!')\\nSay: 'EFF-string: Hello, curly-brace name curly-brace!'",
              reading: "## Strings, Formatting & Methods\\n\\nStrings are sequences of characters supporting indexing and slicing.\\n\\n### Indexing & Slicing\\ntext = 'Python'\\ntext[0] → 'P', text[-1] → 'n', text[0:2] → 'Py', text[::2] → 'Pto', text[::-1] → 'nohtyP'\\n\\nSlice: [start:stop:step]\\n\\n### Methods\\ntext = '  Hello, World!  '\\n.upper() → '  HELLO...'\\n.lower() → '  hello...'\\n.strip() → 'Hello, World!'\\n.replace('World', 'Python') → '  Hello, Python!  '\\n.split(',') → ['  Hello', ' World!  ']\\n'-'.join(['a','b']) → 'a-b-c'\\n.find('World') → 9\\n.count('l') → 3\\n\\n### f-strings\\nname = 'Alice'\\nprint(f'{name} is {30} years old')\\nprint(f'Pi = {3.14159:.2f}') → Pi = 3.14\\n\\n### Immutability\\nStrings cannot change. Methods return NEW strings.",
              kinesthetic: "## String Mastery (Text Tactile Lab)\\n\\n### Physical Slicing\\nWrite 'PYTHON' on paper. Cut into letters.\\n- Pick indices 0,1 → 'PY'\\n- Flip strip → 'NOHTYP' = [::-1]\\n\\n### Interactive Playground\\nType EVERY example:\\n\\nmessage = 'Python is amazing'\\nprint(len(message))\\nprint(message[0])\\nprint(message.upper())\\nprint(message.find('amazing'))\\nprint(message.replace('amazing', 'powerful'))\\nprint(message.split(' '))\\nname = 'coder'\\nprint(f'Hello, {name}!')\\n\\n### Name Formatter\\nCreate name_formatter.py:\\n\\nfirst = '  muhammad  '\\nlast = 'AHMED'\\nfirst = first.strip().title()\\nlast = last.lower().title()\\nfull = f'{first} {last}'\\nprint('Formatted:', full)\\nprint('Initials:', first[0] + '.' + last[0] + '.')\\n\\n### Challenge\\nWrite a program that prints your name in ALL CAPS, lowercase, Title Case, counts letters, shows initials, and prints it backwards.",
            },
            codeExamples: [
              { title: "String Methods", code: 'text = "  Python Programming  "\\nprint("Original:", repr(text))\\nprint("Upper:", text.upper())\\nprint("Strip:", text.strip())\\nprint("Title:", text.title())\\nprint("Split:", text.split())\\nprint("Join:", "-".join(["2024", "05", "13"]))', explanation: "repr() shows raw string with spaces.", output: "Original: '  Python Programming  '\\nUpper:   PYTHON PROGRAMMING  \\nStrip: Python Programming\\nTitle:   Python Programming\\nSplit: ['Python', 'Programming']\\nJoin: 2024-05-13" },
            ],
            quiz: [
              { question: "What does 'Python'[::-1] produce?", options: ["Python", "nohtyP", "Pto", "ytho"], correctIndex: 1, explanation: "[::-1] reverses the string." },
            ],
            resources: [{ title: "String Methods", type: "cheatsheet" }],
          },
        ],
      },
      {
        id: "w1-d5",
        title: "Day 5: Week 1 Project",
        lessons: [
          {
            id: "w1-d5-l1",
            title: "Build a Personal Profile Card",
            description: "Apply everything to build a real program.",
            duration: 45,
            difficulty: "medium",
            content: {
              visual: "## Project: Profile Card (Visual Blueprint)\\n\\nPERSONAL PROFILE CARD\\nName:    Zara Khan\\nAge:     24\\nCity:    Karachi\\nJob:     Data Analyst\\nSalary:  PKR 85,000/month\\nEmail:   zara.khan@email.com\\nSkills:  Python, SQL, Excel\\n\\nFlow: Declare → Process → Calculate → Output",
              auditory: "## Project: Profile Card (Guided Build)\\n\\nStep 1: Declare (Say it loud)\\nname = 'Zara Khan'\\nage = 24\\ncity = 'Karachi'\\njob = 'Data Analyst'\\nsalary = 85000\\n\\nSay: 'Name GETS Zara Khan. Age GETS 24.'\\n\\nStep 2: Process\\nname_title = name.title()\\nemail = name.lower().replace(' ', '.') + '@email.com'\\n\\nStep 3: Calculate\\ninitials = name[0] + '.' + name.split()[1][0] + '.'\\nyearly = salary * 12\\n\\nStep 4: Output\\nprint(f'Name: {name_title}')\\nprint(f'Yearly: PKR {yearly:,}')\\n\\nRead your output aloud when it runs.",
              reading: "## Project: Personal Profile Card\\n\\nThis project consolidates Week 1 concepts.\\n\\n### Requirements\\n1. Store info in typed variables\\n2. Process with string methods\\n3. Calculate derived values\\n4. Output formatted card with f-strings\\n\\n### Implementation\\nfull_name = 'zara khan'\\nage = 24\\ncity = 'karachi'\\nprofession = 'data analyst'\\nmonthly_salary = 85000\\n\\nformatted_name = full_name.title()\\nformatted_city = city.title()\\nemail = full_name.replace(' ', '.') + '@company.com'\\nyearly_salary = monthly_salary * 12\\nname_parts = full_name.split()\\ninitials = f'{name_parts[0][0].upper()}.{name_parts[1][0].upper()}.'\\n\\nprint('=' * 40)\\nprint('PERSONAL PROFILE CARD'.center(40))\\nprint('=' * 40)\\nprint(f'Name: {formatted_name}')\\nprint(f'Age: {age}')\\nprint(f'City: {formatted_city}')\\nprint(f'Role: {profession.title()}')\\nprint(f'Salary: PKR {monthly_salary:,}/month')\\nprint(f'Annual: PKR {yearly_salary:,}/year')\\nprint(f'Email: {email}')\\nprint(f'Initials: {initials}')\\nprint('=' * 40)\\n\\n### Extensions\\n- Use input() for dynamic data\\n- Validate age is positive\\n- Add USD conversion\\n- ASCII art border",
              kinesthetic: "## Project: Profile Card (Build It!)\\n\\nStop reading. Open profile_card.py.\\n\\nLevel 1: Create variables for your name, age, city, dream job, salary. Print with f-strings.\\n\\nLevel 2: Format name Title Case, city uppercase, salary with commas. Create email from name.\\n\\nLevel 3: Calculate yearly salary, extract initials, count name letters, calculate birth year.\\n\\nLevel 4: Full card with borders, centered title, spacing.\\n\\nFinger Trace Debugging:\\n1. Point to each line\\n2. Say what you THINK it does\\n3. Run and compare\\n4. Fix mismatches\\n\\nReflection:\\n- 3 things that were easy\\n- 2 things that were tricky\\n- 1 thing to explore more",
            },
            codeExamples: [
              { title: "Complete Solution", code: 'name = "zara khan"\\nage = 24\\ncity = "karachi"\\njob = "data analyst"\\nsalary = 85000\\n\\nname = name.title()\\ncity = city.title()\\njob = job.title()\\nemail = name.lower().replace(" ", ".") + "@email.com"\\nyearly = salary * 12\\ninitials = name[0] + "." + name.split()[1][0] + "."\\n\\nprint("╔" + "═" * 38 + "╗")\\nprint("║" + " PERSONAL PROFILE CARD ".center(38) + "║")\\nprint("╠" + "═" * 38 + "╣")\\nprint(f"║ Name:   {name:<30} ║")\\nprint(f"║ Age:    {age} years old{\"\":<22} ║")\\nprint(f"║ City:   {city:<30} ║")\\nprint(f"║ Job:    {job:<30} ║")\\nprint(f"║ Salary: PKR {salary:,}/month{\"\":<15} ║")\\nprint(f"║ Yearly: PKR {yearly:,}/year{\"\":<16} ║")\\nprint(f"║ Email:  {email:<30} ║")\\nprint(f"║ Init:   {initials:<30} ║")\\nprint("╚" + "═" * 38 + "╝")', explanation: "Combines variables, string methods, arithmetic, f-strings.", output: "╔══════════════════════════════════════╗\\n║     PERSONAL PROFILE CARD            ║\\n╠══════════════════════════════════════╣\\n║ Name:   Zara Khan                    ║\\n║ Age:    24 years old                 ║\\n║ City:   Karachi                      ║\\n║ Job:    Data Analyst                 ║\\n║ Salary: PKR 85,000/month             ║\\n║ Yearly: PKR 1,020,000/year           ║\\n║ Email:  zara.khan@email.com          ║\\n║ Init:   Z.K.                         ║\\n╚══════════════════════════════════════╝" },
            ],
            diagram: "graph TD\\n    A[Declare] --> B[Process]\\n    B --> C[Calculate]\\n    C --> D[Format]\\n    D --> E[Output]",
            quiz: [
              { question: "What does name.title() do?", options: ["ALL CAPS", "Capitalizes first letter of each word", "lowercase", "Reverses"], correctIndex: 1, explanation: ".title() capitalizes first letter of each word." },
            ],
            resources: [{ title: "Project Starter", type: "article" }],
          },
        ],
      },
    ],
  },
  {
    id: "week-2",
    title: "Week 2: Control Flow & Logic",
    description: "Master if/else decisions, loops, and logical thinking.",
    days: [
      {
        id: "w2-d1",
        title: "Day 1: Boolean Logic",
        lessons: [
          {
            id: "w2-d1-l1",
            title: "Making Decisions with Code",
            description: "Learn how programs make choices.",
            duration: 35,
            difficulty: "beginner",
            content: {
              visual: "## Boolean Logic (Decision Trees)\\n\\n### if Statement Flow\\n[Is it raining?]\\n  Yes → [Take umbrella]\\n  No → [Wear sunglasses]\\nBoth → [Go outside]\\n\\n### Truth Table\\nA | B | A and B | A or B | not A\\nT | T | T | T | F\\nT | F | F | T | F\\nF | T | F | T | T\\nF | F | F | F | T",
              auditory: "## Boolean Logic (Sound of Decisions)\\n\\n### if Statement Rhythm\\nif age >= 18:\\n    print('Adult')\\nelse:\\n    print('Minor')\\n\\nSay: 'IF age >= 18, THEN adult. OTHERWISE, minor.'\\n\\n### and / or Patterns\\n- True and True → YES\\n- True and False → NO\\n- True or False → YES (only one needs to be true!)\\n- not True → NO\\n\\n### Real-World Example\\ntemperature = 35\\nis_sunny = True\\n\\nif temperature > 30 and is_sunny:\\n    print('Hot day! Wear sunscreen.')\\nelif temperature > 20:\\n    print('Nice weather!')\\nelse:\\n    print('Cold. Take a jacket.')",
              reading: "## Making Decisions with Code\\n\\nThe if statement is Python's primary decision-making construct.\\n\\n### Basic if\\nage = 20\\nif age >= 18:\\n    print('You are an adult')\\n\\nThe colon (:) starts a code block. Indented lines execute only if True.\\n\\n### if-elif-else\\nscore = 85\\nif score >= 90: grade = 'A'\\nelif score >= 80: grade = 'B'\\nelif score >= 70: grade = 'C'\\nelif score >= 60: grade = 'D'\\nelse: grade = 'F'\\n\\nKey rules:\\n- Conditions checked in order\\n- Only FIRST matching block executes\\n- else catches everything else\\n\\n### Logical Operators\\nand: Both must be True\\nor: At least one True\\nnot: Inverts the value\\n\\n### Short-Circuit\\nA and B: If A is False, B is not evaluated\\nA or B: If A is True, B is not evaluated",
              kinesthetic: "## Boolean Logic (Physical Decisions)\\n\\n### Stand Up / Sit Down Game\\nI'll give conditions. Stand if True, sit if False:\\n\\nage = 25\\nif age > 18: STAND!\\n\\nis_raining = False\\nif is_raining: SIT!\\n\\nx = 5; y = 10\\nif x > 3 and y < 20: STAND! (both true)\\n\\na = True; b = False\\nif a or b: STAND! (at least one true)\\n\\n### Interactive Lab\\nType each one. PREDICT before running:\\n\\nx = 10\\nif x > 5:\\n    print('A')\\nelse:\\n    print('B')\\n\\nscore = 75\\nif score >= 90: print('A')\\nelif score >= 80: print('B')\\nelif score >= 70: print('C')\\nelse: print('F')\\n\\npassword = 'secret123'\\nif len(password) >= 8 and password != 'password':\\n    print('Strong enough')\\nelse:\\n    print('Too weak')\\n\\n### Build Grade Calculator\\nCreate grade_calc.py:\\n\\nmarks = int(input('Enter marks (0-100): '))\\nif marks >= 90: print('A+ - Outstanding!')\\nelif marks >= 80: print('A - Excellent!')\\nelif marks >= 70: print('B - Good!')\\nelif marks >= 60: print('C - Keep trying!')\\nelse: print('F - Need practice')",
            },
            codeExamples: [
              { title: "if-elif-else", code: 'temperature = 32\\n\\nif temperature > 35:\\n    print("Extreme heat warning!")\\nelif temperature > 30:\\n    print("Hot day - stay hydrated")\\nelif temperature > 20:\\n    print("Pleasant weather")\\nelse:\\n    print("Cold day - bundle up!")', explanation: "Only the first matching condition executes.", output: "Hot day - stay hydrated" },
            ],
            diagram: "graph TD\\n    A[Start] --> B{temperature > 35?}\\n    B -->|Yes| C[Extreme heat]\\n    B -->|No| D{temperature > 30?}\\n    D -->|Yes| E[Hot day]\\n    D -->|No| F{temperature > 20?}\\n    F -->|Yes| G[Pleasant]\\n    F -->|No| H[Cold day]",
            quiz: [
              { question: "x=15: if x>20 print('A') elif x>10 print('B') else print('C')", options: ["A", "B", "C", "Nothing"], correctIndex: 1, explanation: "15 is not > 20 but IS > 10, so 'B' prints." },
            ],
            resources: [{ title: "Conditionals Guide", type: "article" }],
          },
        ],
      },
      {
        id: "w2-d2",
        title: "Day 2: for Loops",
        lessons: [
          {
            id: "w2-d2-l1",
            title: "Looping with for",
            description: "Repeat actions efficiently.",
            duration: 35,
            difficulty: "beginner",
            content: {
              visual: "## for Loops (Visual Iteration)\\n\\nfruits = ['apple', 'banana', 'cherry']\\n\\nfruits[0] → 'apple' → print\\nfruits[1] → 'banana' → print\\nfruits[2] → 'cherry' → print\\nEND\\n\\n### range() Visual\\nrange(5) → 0,1,2,3,4\\nrange(2,5) → 2,3,4\\nrange(0,10,2) → 0,2,4,6,8\\n\\n### Nested Loop Grid\\nfor i in range(3):\\n    for j in range(3):\\n        print(f'({i},{j})')\\n\\nOutput:\\n(0,0) (0,1) (0,2)\\n(1,0) (1,1) (1,2)\\n(2,0) (2,1) (2,2)",
              auditory: "## for Loops (Rhythm of Repetition)\\n\\n### The for Loop Chant\\n'For EACH fruit IN fruits, print the fruit.'\\n\\n### range() Counting Song\\nfor i in range(5): print(i)\\nCount: 'Zero, one, two, three, four — STOP!'\\n\\nfor i in range(1, 6): print(i)\\nCount: 'One, two, three, four, five — STOP!'\\n\\n### Loop Control Sounds\\n- break → 'STOP the music!'\\n- continue → 'Skip this beat, next one!'\\n- else → 'Play the outro when done'\\n\\n### Verbal Tracing\\nfor i in range(1, 4):\\n    for j in range(1, 4):\\n        print(i * j, end=' ')\\n    print()\\n\\nSay: 'Eye is one, jay is one, print one. Jay is two, print two. New line. Eye is two...'",
              reading: "## Looping with for\\n\\nThe for loop executes a block for each item in a sequence.\\n\\n### Basic for\\nfruits = ['apple', 'banana', 'cherry']\\nfor fruit in fruits:\\n    print(fruit)\\n\\n### range()\\nrange(5) → 0,1,2,3,4\\nrange(2,6) → 2,3,4,5\\nrange(0,10,2) → 0,2,4,6,8\\nrange(5,0,-1) → 5,4,3,2,1\\n\\n### Control Statements\\nbreak — exit immediately\\ncontinue — skip to next iteration\\nelse — executes when loop completes normally\\n\\n### Nested Loops\\nfor i in range(1, 4):\\n    for j in range(1, 4):\\n        print(f'{i}x{j}={i*j}')",
              kinesthetic: "## for Loops (Physical Repetition)\\n\\n### Step Loop\\nWalk in a circle. Each step = one iteration:\\n\\nfor step in range(10):\\n    print(f'Step {step + 1}')\\n\\nTake 10 steps, saying each number. That's a loop!\\n\\n### FizzBuzz Body Loop\\nfor i in range(1, 16):\\n    if i % 3 == 0 and i % 5 == 0: print('FizzBuzz')\\n    elif i % 3 == 0: print('Fizz')\\n    elif i % 5 == 0: print('Buzz')\\n    else: print(i)\\n\\n- Say number: just say it\\n- Divisible by 3: jump!\\n- Divisible by 5: clap!\\n- Divisible by both: jump AND clap!\\n\\n### Pattern Builder\\n# Square of stars\\nfor i in range(5): print('*' * 5)\\n\\n# Triangle\\nfor i in range(1, 6): print('*' * i)\\n\\n# Number triangle\\nfor i in range(1, 6):\\n    for j in range(1, i + 1):\\n        print(j, end=' ')\\n    print()\\n\\n### Multiplication Table\\nCreate times_table.py:\\n\\nnumber = int(input('Which table? '))\\nfor i in range(1, 11):\\n    print(f'{number} x {i} = {number * i}')",
            },
            codeExamples: [
              { title: "for Patterns", code: 'for i in range(5):\\n    print(i, end=" ")\\nprint()\\n\\nfor i in range(2, 11, 2):\\n    print(i, end=" ")\\nprint()\\n\\nfruits = ["apple", "mango", "banana"]\\nfor fruit in fruits:\\n    print(fruit.upper())\\n\\nfor index, fruit in enumerate(fruits):\\n    print(f"{index}: {fruit}")', explanation: "enumerate() gives index and value.", output: "0 1 2 3 4 \\n2 4 6 8 10 \\nAPPLE\\nMANGO\\nBANANA\\n0: apple\\n1: mango\\n2: banana" },
            ],
            diagram: "graph LR\\n    A[Start Loop] --> B[Get Next Item]\\n    B --> C{Items Left?}\\n    C -->|Yes| D[Execute Body]\\n    D --> B\\n    C -->|No| E[End Loop]",
            quiz: [
              { question: "What does range(2, 8, 2) produce?", options: ["2,4,6,8", "2,4,6", "0,2,4,6", "2,3,4,5,6,7"], correctIndex: 1, explanation: "Starts at 2, stops BEFORE 8, steps by 2." },
            ],
            resources: [{ title: "Loops Interactive", type: "exercise" }],
          },
        ],
      },
      {
        id: "w2-d3",
        title: "Day 3: while Loops",
        lessons: [
          {
            id: "w2-d3-l1",
            title: "while Loops & User Input",
            description: "Create loops that run until a condition is met.",
            duration: 35,
            difficulty: "beginner",
            content: {
              visual: "## while Loops (Conditional Flow)\\n\\n### while vs for\\nfor: 'I know HOW MANY'\\nwhile: 'I know WHEN to stop'\\n\\n### Password Attempt Visual\\nattempts = 0\\nmax = 3\\n\\n[attempts < 3?]\\n  Yes → Ask password → Check → attempts += 1 → (loop back)\\n  No → Lock out",
              auditory: "## while Loops (Conditional Rhythm)\\n\\nA while loop is like waiting for a bus:\\n'WHILE the bus hasn't arrived, keep waiting.'\\n\\n### The while Chant\\ncount = 0\\nwhile count < 5:\\n    print(count)\\n    count += 1\\n\\nSay: 'WHILE count < 5, print count and add one.'\\n\\n### Danger: Infinite Loops\\nForget count += 1? Loop never ends. Like:\\n'WHILE I'm alive, breathe.' — True forever!\\n\\n### Input Validation\\npassword = ''\\nwhile password != 'secret':\\n    password = input('Enter password: ')\\nprint('Access granted!')\\n\\nSay: 'WHILE password NOT secret, ask again. WHEN secret, grant access.'",
              reading: "## while Loops & User Input\\n\\nThe while loop executes while a condition is True.\\n\\n### Basic while\\ncounter = 0\\nwhile counter < 5:\\n    print(counter)\\n    counter += 1\\n\\nCritical components:\\n1. Initialization: counter = 0\\n2. Condition: counter < 5\\n3. Update: counter += 1 (must eventually make condition False)\\n\\n### Input Validation\\nwhile True:\\n    age = input('Enter age: ')\\n    if age.isdigit() and int(age) >= 0:\\n        age = int(age)\\n        break\\n    print('Invalid. Enter positive number.')\\n\\n### else Clause\\nwhile count < 3:\\n    print(count)\\n    count += 1\\nelse:\\n    print('Loop completed')\\n\\nelse executes when condition becomes False. Skipped if break used.",
              kinesthetic: "## while Loops (Conditional Movement)\\n\\n### The Waiting Game\\nStand up. energy = 100\\nwhile energy > 0:\\n    print('Still running!')\\n    energy -= 10\\nprint('Need rest...')\\n\\nJump 10 times, counting down from 100 by 10s. At 0, sit down. That's a while loop!\\n\\n### Guessing Game\\nType this FULL program:\\n\\nimport random\\nsecret = random.randint(1, 100)\\nguesses = 0\\nmax_guesses = 7\\n\\nprint('Guess (1-100). You have 7 tries.')\\nwhile guesses < max_guesses:\\n    guess = int(input(f'Guess {guesses + 1}/{max_guesses}: '))\\n    guesses += 1\\n    if guess == secret:\\n        print(f'Correct! In {guesses} tries!')\\n        break\\n    elif guess < secret:\\n        print('Too low!')\\n    else:\\n        print('Too high!')\\nelse:\\n    print(f'Out of tries! It was {secret}')\\n\\n### Spinner\\nimport time\\nspinner = ['|', '/', '-', '\\\\']\\ni = 0\\nwhile i < 20:\\n    print(f'\\rLoading {spinner[i % 4]}', end='')\\n    time.sleep(0.2)\\n    i += 1\\nprint('\\rDone!        ')",
            },
            codeExamples: [
              { title: "while Examples", code: `count = 5\\nwhile count > 0:\\n    print(count)\\n    count -= 1\\nprint("Blast off!")\\n\\ntotal = 0\\nwhile True:\\n    num = input("Enter number (or 'done'): ")\\n    if num == "done":\\n        break\\n    total += int(num)\\nprint(f"Total: {total}")`, explanation: "while True with break for infinite loops.", output: "5\\n4\\n3\\n2\\n1\\nBlast off!" },
            ],
            quiz: [
              { question: "What's wrong with: while x > 0: print(x)?", options: ["Nothing", "x never changes, infinite loop", "Missing colon", "x not defined"], correctIndex: 1, explanation: "If x starts positive and never decreases, condition stays True forever." },
            ],
            resources: [{ title: "while vs for Guide", type: "article" }],
          },
        ],
      },
      {
        id: "w2-d4",
        title: "Day 4: List Comprehensions",
        lessons: [
          {
            id: "w2-d4-l1",
            title: "Pythonic List Creation",
            description: "Write elegant lists in one line.",
            duration: 30,
            difficulty: "medium",
            content: {
              visual: "## List Comprehensions (Visual Syntax)\\n\\n[expression for item in iterable if condition]\\n  ↑        ↑    ↑      ↑          ↑\\n result   what  var   source    filter\\n\\n### Before vs After\\nBEFORE (4 lines):\\nsquares = []\\nfor x in range(5):\\n    squares.append(x**2)\\n\\nAFTER (1 line):\\nsquares = [x**2 for x in range(5)]\\n\\n### Nested Grid\\n[[i*j for j in range(1,4)] for i in range(1,4)]\\n→ [[1,2,3],[2,4,6],[3,6,9]]",
              auditory: "## List Comprehensions (Pythonic Poetry)\\n\\nSay the structure:\\n'WHAT I want FOR EACH thing IN my collection IF it matches.'\\n\\n[x * 2 for x in numbers if x > 0]\\nRead: 'X times two FOR EACH x IN numbers IF x > zero.'\\n\\n### Before/After Audio\\nBefore: 'Create empty list. For each number, if even, append square. Five lines.'\\nAfter: 'Squares of even numbers. One line. Done.'\\n\\nevens_squared = [x**2 for x in numbers if x % 2 == 0]\\n\\n### Warning\\nIf reading your comprehension makes you run out of breath, it's too complex. Break it up.",
              reading: "## List Comprehensions\\n\\nConcise way to create lists.\\n\\n### Basic Syntax\\n[expression for item in iterable]\\n\\nExample:\\nsquares = [x**2 for x in range(10)]\\n\\n### With Conditions\\nevens = [x for x in range(20) if x % 2 == 0]\\neven_squares = [x**2 for x in range(20) if x % 2 == 0]\\nlabels = ['even' if x % 2 == 0 else 'odd' for x in range(10)]\\n\\n### Nested\\nmatrix = [[1,2,3],[4,5,6],[7,8,9]]\\ntransposed = [[row[i] for row in matrix] for i in range(3)]\\n\\n### Dictionary Comprehensions\\nsquares_dict = {x: x**2 for x in range(6)}\\n\\n### Performance\\nGenerally faster than equivalent for loops (runs at C speed).",
              kinesthetic: "## List Comprehensions (One-Line Wonders)\\n\\n### Speed Challenge\\nTime yourself:\\n\\nVersion A (loop):\\nsquares = []\\nfor x in range(100):\\n    if x % 2 == 0:\\n        squares.append(x**2)\\n\\nVersion B (comprehension):\\nsquares = [x**2 for x in range(100) if x % 2 == 0]\\n\\nVersion B is faster to type AND run.\\n\\n### Interactive Lab\\nType each one. PREDICT, then RUN:\\n\\nprint([x * 2 for x in [1, 2, 3]])\\nprint([x for x in range(10) if x > 5])\\nprint(['big' if x > 50 else 'small' for x in [10, 60, 30, 80]])\\nprint([[i*j for j in range(1,4)] for i in range(1,4)])\\nprint({x: x**3 for x in range(5)})\\n\\n### Word Filter\\nCreate word_filter.py:\\n\\nwords = ['Python', 'is', 'an', 'amazing', 'programming', 'language']\\nlong_words = [w for w in words if len(w) > 5]\\nupper_words = [w.upper() for w in words]\\nlengths = {w: len(w) for w in words}\\nprint(long_words)\\nprint(upper_words)\\nprint(lengths)",
            },
            codeExamples: [
              { title: "Comprehension Power", code: 'evens = [x**2 for x in range(20) if x % 2 == 0]\\nprint(evens)\\n\\nmatrix = [[i*j for j in range(1,4)] for i in range(1,4)]\\nfor row in matrix:\\n    print(row)\\n\\nchar_map = {chr(65+i): i+1 for i in range(5)}\\nprint(char_map)', explanation: "chr(65)='A', chr(66)='B', etc.", output: "[0, 4, 16, 36, 64, 100, 144, 196, 256, 324]\\n[1, 2, 3]\\n[2, 4, 6]\\n[3, 6, 9]\\n{'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5}" },
            ],
            quiz: [
              { question: "[x for x in range(10) if x % 2 == 0] produces?", options: ["[1,3,5,7,9]", "[0,2,4,6,8]", "[0..9]", "Error"], correctIndex: 1, explanation: "Filters for even numbers from 0 to 9." },
            ],
            resources: [{ title: "Comprehensions Guide", type: "cheatsheet" }],
          },
        ],
      },
      {
        id: "w2-d5",
        title: "Day 5: Week 2 Project",
        lessons: [
          {
            id: "w2-d5-l1",
            title: "Build a Number Guessing Game",
            description: "Combine loops, conditionals, and random numbers.",
            duration: 45,
            difficulty: "medium",
            content: {
              visual: "## Project: Guessing Game (Flowchart)\\n\\n[Start Game] → [Generate Secret] → [While guesses remain] → [Get Guess] → {Correct?}\\n  Yes → [You Win!] → [End]\\n  No → {Too High?} → Yes:[Hint Lower] / No:[Hint Higher] → [guesses -= 1] → (loop back)\\n  Out of guesses → [Game Over]",
              auditory: "## Project: Guessing Game (Guided Build)\\n\\nStep 1: Setup\\nimport random\\nprint('=' * 40)\\nprint('WELCOME TO THE GUESSING GAME!')\\nprint('=' * 40)\\n\\nStep 2: Game Loop\\nsecret = random.randint(1, 100)\\nguesses = 7\\nwhile guesses > 0:\\n    guess = int(input(f'Guess ({guesses} left): '))\\n    guesses -= 1\\n    if guess == secret:\\n        print('🎉 You got it!')\\n        break\\n    elif guess < secret:\\n        print('Too low!')\\n    else:\\n        print('Too high!')\\nelse:\\n    print(f'Out of guesses! It was {secret}')\\n\\nHear the rhythm? Guess, check, hint, repeat.",
              reading: "## Project: Number Guessing Game\\n\\nThis project integrates Week 2 concepts.\\n\\n### Complete Implementation\\nimport random\\n\\ndef get_difficulty():\\n    while True:\\n        print('1. Easy (1-50, 10 guesses)')\\n        print('2. Medium (1-100, 7 guesses)')\\n        print('3. Hard (1-200, 5 guesses)')\\n        choice = input('Enter 1, 2, or 3: ')\\n        if choice == '1': return 50, 10\\n        elif choice == '2': return 100, 7\\n        elif choice == '3': return 200, 5\\n        print('Invalid.')\\n\\ndef play_game():\\n    max_num, max_guesses = get_difficulty()\\n    secret = random.randint(1, max_num)\\n    guesses_left = max_guesses\\n    print(f'\\nI am thinking of 1-{max_num}. {max_guesses} tries.')\\n    while guesses_left > 0:\\n        try:\\n            guess = int(input(f'Guess ({guesses_left} left): '))\\n        except ValueError:\\n            print('Enter a number.')\\n            continue\\n        guesses_left -= 1\\n        if guess == secret:\\n            print(f'🎉 Correct in {max_guesses - guesses_left} tries!')\\n            return True\\n        elif guess < secret:\\n            print('Too low!')\\n        else:\\n            print('Too high!')\\n    print(f'Game over! It was {secret}')\\n    return False\\n\\ndef main():\\n    while True:\\n        play_game()\\n        if input('Play again? (yes/no): ').lower() != 'yes':\\n            print('Thanks for playing!')\\n            break\\n\\nif __name__ == '__main__':\\n    main()\\n\\n### Features\\n1. Input validation with try/except\\n2. Difficulty selection\\n3. Hint system\\n4. Score tracking\\n5. Replay loop",
              kinesthetic: "## Project: Guessing Game (Build From Scratch)\\n\\nClose this lesson. Open guessing_game.py. Build from memory.\\n\\nMust include:\\n1. Random number generation\\n2. while loop for guessing\\n3. if/elif/else for hints\\n4. Guess counter\\n5. Win/lose messages\\n\\nStep-by-Step:\\n1. Type import and welcome (2 min)\\n2. Add secret = 42 (fixed), add input (3 min)\\n3. Add while loop, if/elif/else (5 min)\\n4. Replace with random.randint (2 min)\\n5. Add difficulty, replay (5 min)\\n6. Add try/except, polish (5 min)\\n\\nFinger Trace Debugging:\\n1. Point to each line\\n2. Say expected variable values\\n3. Run and compare\\n4. Fix mismatches\\n\\nPlay Test: Run 5 times. Try each difficulty.",
            },
            codeExamples: [
              { title: "Guessing Game", code: 'import random\\n\\nprint("=" * 40)\\nprint("  NUMBER GUESSING GAME")\\nprint("=" * 40)\\n\\nsecret = random.randint(1, 100)\\nguesses = 7\\n\\nwhile guesses > 0:\\n    guess = int(input(f"Guess ({guesses} left): "))\\n    guesses -= 1\\n    if guess == secret:\\n        print("🎉 You got it!")\\n        break\\n    elif guess < secret:\\n        print("Too low!")\\n    else:\\n        print("Too high!")\\nelse:\\n    print(f"Out of guesses! It was {secret}")', explanation: "else on while runs only if loop completes without break.", output: "========================================\\n  NUMBER GUESSING GAME\\n========================================\\nGuess (7 left): 50\\nToo high!\\nGuess (6 left): 25\\nToo low!\\n..." },
            ],
            diagram: "graph TD\\n    A[Start] --> B[Choose Difficulty]\\n    B --> C[Generate Secret]\\n    C --> D{Guesses Left?}\\n    D -->|Yes| E[Get Guess]\\n    E --> F{Correct?}\\n    F -->|Yes| G[You Win!]\\n    F -->|No| H{Too High?}\\n    H -->|Yes| I[Hint: Lower]\\n    H -->|No| J[Hint: Higher]\\n    I --> K[Decrement]\\n    J --> K\\n    K --> D\\n    D -->|No| L[Game Over]",
            quiz: [
              { question: "In while-else, when does else run?", options: ["Always", "Only with break", "Only without break", "Never"], correctIndex: 2, explanation: "else runs when condition becomes False naturally." },
            ],
            resources: [{ title: "Guessing Game Solution", type: "article" }],
          },
        ],
      },
    ],
  },
]

export const ALL_WEEKS: Week[] = PYTHON_COURSE_WEEKS

export function getTotalLessons(weeks: Week[]): number {
  return weeks.reduce((total, week) => 
    total + week.days.reduce((dTotal, day) => dTotal + day.lessons.length, 0), 0)
}

export function getLessonById(weeks: Week[], lessonId: string) {
  for (const week of weeks) {
    for (const day of week.days) {
      for (const lesson of day.lessons) {
        if (lesson.id === lessonId) return { week, day, lesson }
      }
    }
  }
  return null
}

export function getDefaultProgress(): CourseProgress {
  return {
    weekIndex: 0,
    dayIndex: 0,
    lessonIndex: 0,
    completedLessons: [],
    quizScores: {},
    totalTimeMinutes: 0,
  }
}

export function getLessonCount(weeks: Week[]): number {
  return weeks.reduce((total, week) => 
    total + week.days.reduce((d, day) => d + day.lessons.length, 0), 0)
}

export function getCompletedCount(progress: CourseProgress): number {
  return progress.completedLessons.length
}

export function getProgressPercentage(weeks: Week[], progress: CourseProgress): number {
  const total = getLessonCount(weeks)
  if (total === 0) return 0
  return Math.round((getCompletedCount(progress) / total) * 100)
}
