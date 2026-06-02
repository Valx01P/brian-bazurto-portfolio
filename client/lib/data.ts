// Central content source for brianbazurto.com
// Extracted and structured from the legacy index.html portfolio.

export const profile = {
  name: "Brian Bazurto",
  domain: "brianbazurto.com",
  url: "https://brianbazurto.com",
  role: "Computer Science Student · Builder · Community Leader",
  tagline:
    "I live at the intersection of technology, learning, and community building.",
  bio: "Passionate computer science student who thrives at the intersection of technology, learning, and community-building. President & Founder of Code Crunch Club, and lead of ColorStack at FIU, CAHSI at FIU, and Google Developer Group at FIU — empowering students to excel in technical interview prep and software development through inclusive, collaborative spaces.",
  image: "/brian.jpg",
  resumeUrl: "https://brian-bazurto-resume.vercel.app/",
  resumeFile: "/Brian_Bazurto_Resume.pdf",
  email: "pvald027@fiu.edu",
  location: "Miami, FL",
  socials: {
    linkedin: "https://linkedin.com/in/IBA001",
    github: "https://github.com/ba-00001",
  },
} as const;

export const communities = [
  { label: "Code Crunch Global", href: "https://codecrunchglobal.vercel.app/" },
  { label: "ColorStack at FIU", href: "https://colorstackatfiu.vercel.app/" },
  { label: "CAHSI at FIU", href: "https://cahsiatfiu.vercel.app/" },
  {
    label: "7 Hacks Hackathon",
    href: "https://hackuniversity.vercel.app/",
  },
] as const;

export type Education = {
  school: string;
  period: string;
  detail: string[];
};

export const education: Education[] = [
  {
    school: "Florida International University",
    period: "Expected May 2027",
    detail: [
      "B.A. Computer Science · Minor in Business Analytics · Honors College",
      "GPA: 3.75 / 4.0",
    ],
  },
  {
    school: "Google — Tech Exchange 2024 Cohort",
    period: "Jan 2024 – May 2024",
    detail: [
      "Accredited coursework with direct mentorship from Googlers.",
      "Applied Data Structures & Algorithms, Software Development, Careers in Tech.",
    ],
  },
];

export const courseworkNote =
  "Relevant Coursework: Data Structures & Algorithms, Calculus I, Calculus II.";

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["SQL", "Java", "Python", "C", "C++", "JavaScript", "Kotlin"],
  },
  {
    group: "Web & Cloud",
    items: [
      "Next.js",
      "Flask",
      "Firebase",
      "Clerk",
      "Pinecone",
      "SQLite",
      "SQLAlchemy",
      "Vercel",
    ],
  },
  {
    group: "Developer Tools",
    items: [
      "Git",
      "Kubernetes",
      "Jenkins",
      "JIRA",
      "PostgreSQL",
      "NumPy",
      "Postman",
      "Bruno",
      "Android Studio",
      "IntelliJ",
      "LaTeX",
      "Agile",
    ],
  },
];

export type Experience = {
  org: string;
  role: string;
  period: string;
  location?: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    org: "Workday",
    role: "Software Development Engineer Intern",
    period: "May 2025 – Aug 2025",
    location: "Atlanta, GA",
    points: [
      "Designed and built a backend feature improving report display across the Workday Extend platform, enhancing usability through optimized data processing and visualization.",
      "Implemented metadata graph handling, schema validation, serialization, and feature toggling for controlled rollouts using Agile methodology.",
      "Integrated CI/CD pipelines for automated testing and streamlined deployment, ensuring high-quality delivery and faster cycles.",
    ],
  },
  {
    org: "Google Developer Group at FIU",
    role: "President",
    period: "Jul 2025 – Present",
    location: "Miami, FL",
    points: [
      "Built the chapter by organizing developer workshops, hackathons, and tech talks promoting innovation and community engagement.",
      "Delivered hands-on Google Cloud (GCP) training — deploying AI agents with Vertex AI and integrating LLMs (PaLM 2, Gemini) for chatbots and content generation.",
      "Enhanced members' practical skills in cloud-based AI, ML implementation, and modern software development.",
    ],
  },
  {
    org: "Code Crunch · ColorStack at FIU · CAHSI at FIU",
    role: "Club President & Founder",
    period: "Aug 2024 – Present",
    location: "Miami, FL",
    points: [
      "Founded and scaled three student organizations — recruiting 600+ members across 15+ universities, coordinating 16 Tech Leads and a 20-member executive board.",
      "Led technical interview prep, coding bootcamps, and algorithm challenges to sharpen problem-solving and career readiness.",
      "Established partnerships with Google, Salesforce, ServiceNow, Goldman Sachs, and Workday for mentorship and internship pathways.",
    ],
  },
  {
    org: "Floreo Labs",
    role: "Software Development Engineer Contractor",
    period: "Mar 2025 – Present",
    location: "Atlanta, GA",
    points: [
      "Built advanced Android apps in Kotlin with Jetpack Compose and clean architecture for maintainability and speed.",
      "Implemented MVVM, dependency injection, and modular design for testable, scalable mobile apps.",
      "Enhanced UX with responsive UI, smooth animations, and intuitive interactions.",
    ],
  },
  {
    org: "CAHSI LREU",
    role: "Researcher",
    period: "Feb 2025 – Present",
    location: "Chicago, IL",
    points: [
      "Ran experiments on cache replacement strategies for gray-box fuzzing, improving vulnerability discovery efficiency.",
      "Developed approaches to software vulnerability detection, advancing fuzzing techniques for security analysis.",
      "Shared findings as a 2025 GMiS participant, collaborating with academic researchers.",
    ],
  },
  {
    org: "HeadStarter AI",
    role: "Fellowship",
    period: "Jul 2024 – Aug 2024",
    location: "New York, NY",
    points: [
      "Built an AI customer-support chatbot with Next.js, Firebase auth, and GPT-4o mini for real-time NLP interactions.",
      "Built an AI 'Rate My Professors' platform with Next.js + Python, optimizing sentiment analysis on student reviews.",
      "Integrated real-time AI for NLP and data-driven insights to improve student decision-making.",
    ],
  },
  {
    org: "AI4ALL Ignite",
    role: "Career Readiness & Technical AI Internship",
    period: "Jan 2024 – Oct 2024",
    points: [
      "Built an AI agent for Pong in Python using reinforcement learning with policy-gradient algorithms.",
      "Optimized performance via hyperparameter tuning, model training, and reward-based learning.",
      "Used the OpenAI Gym framework to enhance decision-making and simulate real-time performance.",
    ],
  },
  {
    org: "SEO Tech Developer",
    role: "Software Engineer Intern",
    period: "May 2024 – Aug 2024",
    location: "New York, NY",
    points: [
      "Created EcoRoute, HealthWatch, and StockSnap using Python, Flask, and ChatGPT integration.",
      "Implemented ChatGPT API for intelligent data processing and automated insights.",
      "Delivered full-stack apps with robust backends, intuitive frontends, and seamless API integrations.",
    ],
  },
  {
    org: "CodePath",
    role: "Teaching Assistant / Tech Fellow — Web & iOS, Interview Prep",
    period: "Sep 2023 – Present",
    location: "San Francisco, CA",
    points: [
      "Guided students in web dev, iOS dev, and interview prep through labs, projects, and 1:1 mentoring.",
      "Developed curriculum materials and led coding workshops on best practices and industry standards.",
      "Provided resume reviews, mock interviews, and technical assessments for career transitions.",
    ],
  },
  {
    org: "American Express",
    role: "Software Engineer Intern (Spring)",
    period: "May 2023",
    location: "Miami, FL",
    points: [
      "Enhanced web and mobile security with new Java/Spring-based protocols.",
      "Collaborated with the Amex security team on enterprise-scale security processes.",
      "Applied coursework to real-world security challenges in fintech systems.",
    ],
  },
  {
    org: "Sponsors for Educational Opportunity (SEO)",
    role: "Apprenticeship — First Year Academy",
    period: "Apr 2023 – Jul 2023",
    location: "New York, NY",
    points: [
      "Hands-on Python: data manipulation, algorithm design, and software testing.",
      "Built engineering fundamentals through practical projects and real-world scenarios.",
      "Developed professional communication and project management skills.",
    ],
  },
];

export type Project = {
  title: string;
  date: string;
  icon: string; // lucide icon name
  blurb: string;
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Multi-Platform Community Leadership",
    date: "2024–2025",
    icon: "Users",
    blurb:
      "Built and deployed community platforms supporting technical interview prep and resource sharing for students across 15+ universities — event management, member portals, and resource libraries.",
    stack: ["Next.js", "React", "Vercel", "Firebase", "Tailwind"],
    links: [
      { label: "Code Crunch Global", href: "https://codecrunchglobal.vercel.app/" },
      { label: "ColorStack FIU", href: "https://colorstackatfiu.vercel.app/" },
      { label: "CAHSI FIU", href: "https://cahsiatfiu.vercel.app/" },
    ],
  },
  {
    title: "AI Customer Support Web App",
    date: "Aug 2024",
    icon: "MessageCircle",
    blurb:
      "An AI chatbot for HeadStarter AI assisting users with interview prep through real-time NLP. Dynamic chat updates instantly using GPT-4o Mini with Firebase auth and session persistence.",
    stack: ["Next.js", "Material-UI", "Firebase", "GPT-4o Mini"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/README-AI-Customer-Support-Web-App.MD",
      },
    ],
  },
  {
    title: "FlashGenius",
    date: "Aug 2024",
    icon: "BookOpen",
    blurb:
      "AI-powered flashcard platform with automated generation and personalized learning paths. Clerk auth plus Stripe-powered Pro plan for unlimited cards, cloud storage, and study analytics.",
    stack: ["Next.js", "Clerk", "Firebase", "OpenAI", "Stripe"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/README-AI.FLASHCARDS-FLASH.GENIUS.MD",
      },
    ],
  },
  {
    title: "StockSnap",
    date: "Aug 2024",
    icon: "LineChart",
    blurb:
      "Stock portfolio management with real-time market data and analytics. Vantage API live feeds, automated price alerts, and ChatGPT-driven market insights with historical visualization.",
    stack: ["Vantage API", "ChatGPT API", "Python", "Flask", "Bootstrap"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/README-StockSnap-FILES.MD",
      },
    ],
  },
  {
    title: "HealthWatch Web App",
    date: "Aug 2024",
    icon: "HeartPulse",
    blurb:
      "Personal health monitoring for people with chronic conditions, enthusiasts, and seniors. Fitbit API integration for automated data collection with real-time dashboards.",
    stack: ["Fitbit API", "Flask", "Streamlit", "PythonAnywhere"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/README-HealthWatch-FILES.MD",
      },
    ],
  },
  {
    title: "TuneTrek Music iOS App",
    date: "Apr 2024",
    icon: "Music",
    blurb:
      "Music streaming app to browse and play albums with cover art and seamless playback. Responsive UI across iPhone and iPad with efficient music metadata handling.",
    stack: ["Xcode", "Swift", "UIKit"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/README-TUNE.TREK-IOS.APP-FILES.MD",
      },
    ],
  },
  {
    title: "BitFit Android App",
    date: "Mar 2024",
    icon: "Activity",
    blurb:
      "Fitness tracking app to log activities and nutrition with detailed summaries. RecyclerView-driven UI with visual progress analytics and persistent storage.",
    stack: ["Android Studio", "Kotlin", "RecyclerView"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/README-BITFIT-ANDROID.APP-FILES.MD",
      },
    ],
  },
  {
    title: "Tumblr Feed iOS App",
    date: "Mar 2024",
    icon: "Rss",
    blurb:
      "View and interact with a Tumblr feed via API integration — post viewing, likes, and content filtering with efficient loading and caching for smooth browsing.",
    stack: ["Xcode", "Swift"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/README-TUMBLR.IOS.APP-FILES.MD",
      },
    ],
  },
  {
    title: "Flixster+ Android App",
    date: "Mar 2024",
    icon: "Film",
    blurb:
      "Browse movies playing in theaters with real-time data and poster art. TMDB API integration with Glide-optimized image loading and smooth navigation.",
    stack: ["Android Studio", "Kotlin", "TMDB API", "Glide"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/README-FLIXSTER.V2.ANDROID.APP-FILES.MD",
      },
    ],
  },
  {
    title: "Task Manager iOS App",
    date: "Feb 2024",
    icon: "ListChecks",
    blurb:
      "Organize and manage tasks with creation, editing, and completion tracking. Priority management and deadline notifications with reliable data persistence.",
    stack: ["Xcode", "Swift"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/README-TASK.IOS.APP-FILES.MD",
      },
    ],
  },
  {
    title: "Wordle iOS App",
    date: "Feb 2024",
    icon: "Keyboard",
    blurb:
      "iOS take on the word puzzle — guess a hidden word in 6 tries with validation, hints, and scoring. Daily challenges with persistent game state and smooth animations.",
    stack: ["Xcode", "Swift"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/README-WORDLE.IOS.APP-FILES.MD",
      },
    ],
  },
  {
    title: "Wishlist Android App",
    date: "Feb 2024",
    icon: "ListTodo",
    blurb:
      "Track items to buy with name, price, URL, and category management. Room database for offline persistence and RecyclerView for smooth browsing.",
    stack: ["Android Studio", "Kotlin", "RecyclerView", "Room"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/README-WHISHLIST-ANDROID.APP-FILES.MD",
      },
    ],
  },
  {
    title: "Trivia Quiz iOS App",
    date: "Feb 2024",
    icon: "HelpCircle",
    blurb:
      "Answer questions across categories with immediate feedback. Score tracking with performance analytics and category-based difficulty progression.",
    stack: ["Xcode", "Swift"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/README-TRIVIA-QUIZ-IOS-APP-FILES.MD",
      },
    ],
  },
  {
    title: "Wordle Android App",
    date: "Feb 2024",
    icon: "Keyboard",
    blurb:
      "Android clone of the word puzzle with color-coded hints and validation. Daily challenges with game-state persistence and responsive UI.",
    stack: ["Android Studio", "Kotlin"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/README-WORDLE-ANDROID.APP-FILES..MD",
      },
    ],
  },
  {
    title: "PingPong Agent",
    date: "Jan–May 2024",
    icon: "Gamepad2",
    blurb:
      "AI game agent that plays ping pong using reinforcement learning. Learns from each game and adapts strategy in real time for competitive play.",
    stack: ["Python", "Gym Library"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/PingPongAgent-FILES/PingPongAgent-FILES-README.MD",
      },
    ],
  },
  {
    title: "ActiveAmigo",
    date: "Jan–Apr 2024",
    icon: "Dumbbell",
    blurb:
      "Fitness app with workout plans, progress tracking, and social networking to connect with workout buddies. Built for a project management course.",
    stack: ["React", "Node.js", "Express"],
    links: [
      {
        label: "View Demo",
        href: "https://github.com/ba-00001/DEMOS-PROJECTS/blob/main/resources/README-ACTIVE.AMIGO-PM-PROJECT-FILES.MD",
      },
    ],
  },
];

export const academicHonors = [
  "Dean's List (2023–2025) — consistent academic excellence at FIU.",
  "Honors Dean's List (2023–2025) — outstanding achievement in the Honors College.",
  "Hispanic Scholarship Fund (2023, 2025) — merit-based scholarship for Latino students in STEM.",
  "Tau Sigma National Honor Society — inducted for academic excellence as a transfer student.",
  "Phi Theta Kappa Honor Society International — academic achievement and leadership.",
  "First Presbyterian Church (LGBTQ) Scholarship — merit and commitment to diversity & inclusion.",
];

export const professionalDevelopment = [
  "Management Leadership for Tomorrow (MLT) — Career Prep Fellow.",
  "Member of NSBE, WICS, and SWE — networking and diversity in tech.",
  "Campus: BookTok Club, FIU Brazilian Jiu-Jitsu, ALPFA, and SHPE.",
  "MLH Hackathons — Web3Apps, TechTogether, Global HackWeek, Break Through Tech Miami.",
];

export const navLinks = [
  { label: "Home", href: "#intro" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Honors", href: "#honors" },
] as const;

export const stats = [
  { value: "600+", label: "Members led" },
  { value: "15+", label: "Universities" },
  { value: "3.75", label: "GPA" },
  { value: "16+", label: "Projects shipped" },
] as const;
