// Portfolio facts preserved from the original pages.
export const SKILLS = {
  "Languages & Core": [
    "JavaScript (ES6+)",
    "TypeScript",
    "Python",
    "HTML5",
    "CSS3",
    "SQL",
  ],
  "Frameworks & Libraries": [
    "React",
    "Next.js",
    "Django",
    "Node.js",
    "Tailwind CSS",
    "Prisma ORM",
    "Framer Motion",
  ],
  "Tools & Platforms": [
    "Git & GitHub",
    "Vercel",
    "PostgreSQL",
    "REST APIs",
    "Vite",
    "Docker basics",
    "Figma",
    "VS Code",
  ],
  "AI & Modern Workflow": [
    "Prompt Engineering",
    "LLM Integration",
    "AI API Integration",
    "GitHub Copilot",
    "Cursor AI",
    "ChatGPT / Claude",
    "AI-assisted Development",
  ],
  "Design & Soft Skills": [
    "Responsive Design",
    "UI/UX Principles",
    "Agile / Scrum",
    "Technical Documentation",
    "Problem Solving",
    "Code Review",
  ],
};

export const CALLOUTS = [
  "Strong emphasis on clean, maintainable code architecture.",
  "Experienced with both frontend interfaces and backend logic.",
  "Proficient with AI-assisted development tools and modern workflows.",
  "Comfortable working across the full development lifecycle.",
];

export const PROJECTS = [
  {
    name: "NCF Enrollment Portal",
    desc: "A full-stack Django enrollment system for Nueva Caceres with role-based access for Admins, Staff, and Students. Features course management, department organization, and real-time enrollment tracking.",
    tags: ["Django", "PostgreSQL", "Python", "WhiteNoise"],
    url: "https://ncf-enrollment-portal.onrender.com/",
    year: "2026",
    category: "web",
    image: "/projects/ncf-enrollment-portal.jpg",
    imageCaption: "ncf-enrollment-portal.jpg",
  },
  {
    name: "Minimalist E-Commerce Store",
    desc: "A full-stack e-commerce platform with product listings, cart management, Stripe payment integration, and order tracking. Built with Next.js, Prisma ORM, and Neon Postgres.",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    url: "https://ecommerce-portfolio-sooty.vercel.app/",
    year: "2026",
    category: "web",
    image: "/projects/ecommerce-store.png",
    imageCaption: "ecommerce-store.png",
  },
  {
    name: "AIVA AI Studio",
    desc: "AI-powered creative platform with audio and video generation capabilities. Built with Next.js and deployed on Vercel.",
    tags: ["Next.js", "AI", "Vercel"],
    url: "https://aiva-weld.vercel.app/",
    year: "2024",
    category: "ai",
    image: "/projects/aiva-ai-studio.jpg",
    imageCaption: "aiva-ai-studio.jpg",
  },
];

export const EDUCATION = [
  {
    school: "Naga College Foundation",
    degree: "Bachelor of Science in Information Technology",
    period: "2022 — Present",
    note: "Currently 3rd year. Focusing on software development and web technologies.",
    highlights: [
      "Learned React, Next.js, TypeScript",
      "Built 4+ production-grade projects",
      "Proficiency in full-stack architecture",
      "Ongoing: backend systems & DevOps",
    ],
  },
  {
    school: "Carolina National High School",
    degree: "Secondary Education",
    period: "2018 — 2022",
    note: "Completed NC II certification through TESDA during senior high.",
    highlights: [
      "NC II TESDA certification",
      "Introduced to web development fundamentals",
      "Developed interest in software engineering",
    ],
  },
  {
    school: "Panicuason Elementary School",
    degree: "Elementary Education",
    period: "2012 — 2018",
    note: null,
    highlights: ["Foundational academic skills established"],
  },
];

export const CERTIFICATIONS = [
  {
    title: "Microsoft Word Associate",
    issuer: "Microsoft / Certiport",
    year: "2025",
    note: "Globally recognized certification demonstrating proficiency in Microsoft Word.",
  },
  {
    title: "NC II Certificate",
    issuer: "TESDA",
    year: "2022",
    note: null,
  },
];
