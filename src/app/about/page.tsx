"use client";
import { useState, useEffect, useCallback } from "react";
import React from "react";

// --- START: Simplified Lucide Icon Imports ---
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const createIcon = (dPath: string | string[], viewbox: string = "0 0 24 24") => {
  return ({ size = 24, ...props }: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewbox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {Array.isArray(dPath) ? dPath.map((d, i) => <path key={i} d={d} />) : <path d={dPath} />}
    </svg>
  );
};

const Send = createIcon([
  "m22 2-7 20-4-9-9-4Z",
  "M22 2 11 13"
]);

const Code = createIcon([
    "m16 18 6-6-6-6",
    "m8 6-6 6 6 6"
]); // Used for Core Frontend

const Layout = createIcon([
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", 
    "M14 2v6h6"
]); // Used for Design/UI

const Settings = createIcon("M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.78 1.56a2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 1 1.73v.44a2 2 0 0 1-1 1.73l-.15.08a2 2 0 0 0-.73 2.73l.78 1.56a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.78-1.56a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.73v-.44a2 2 0 0 1 1-1.73l.15-.08a2 2 0 0 0 .73-2.73l-.78-1.56a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2-0V4a2 2 0 0 0-2-2zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"); // Used for Tooling

const Zap = createIcon("M13 2 3 14 12 14 11 22 21 10 12 10 13 2", "0 0 24 24");
const Info = createIcon([
  "M12 16v-4",
  "M12 8h.01"
], "0 0 24 24");

// --- END: Simulated Lucide Icon Imports ---

// --- CUSTOM CSS STYLES (Unchanged) ---
const customStyles = `
/* Import Google Font 'Lora' and 'Inter' */
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Inter:wght@400;600;800&display=swap');

html, body, #root, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.font-hand {
  font-family: 'Lora', serif;
}

/* --- Typewriter Effect CSS for Name --- */
.typewriter-effect {
  overflow: hidden;
  border-right: .15em solid;
  white-space: nowrap;
  letter-spacing: .10em;
  animation:
    typing 2s steps(9, end) forwards,
    blink-caret .75s step-end infinite 2s;
  width: 0;
}
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: currentColor; }
}
/* --- END Typewriter Effect CSS --- */

/* Standardized entry animation */
@keyframes slide-in-fade {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-slide-in-fade { animation: slide-in-fade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; opacity: 0; }
@keyframes bounce-in {
  0% { transform: translate(-50%, -100px); opacity: 0; }
  100% { transform: translate(-50%, 20px); opacity: 1; }
}
/* Skill bar animation (REMOVED: Keeping keyframes for now just in case) */
@keyframes fill-bar {
  from { width: 0%; }
  to { width: var(--skill-width); }
}
.skill-bar-fill {
  animation: fill-bar 1.5s ease-out forwards;
}
`;

// Data Types and Constants
interface SkillSet {
    category: string;
    icon: React.FC<IconProps>;
    skills: string[];
}

// 🟢 PROFESSIONAL SKILLS LIST GROUPED BY CATEGORY
const SKILL_SETS: SkillSet[] = [
    {
        category: "Core Frontend & Languages",
        icon: Code,
        skills: [
            "React & Next.js",
            "TypeScript", // Explicitly added TS for professional look
            "JavaScript (ES6+)",
            "HTML5 & CSS3",
            "State Management (Zustand, Context API)",
        ]
    },
    {
        category: "Styling, UI/UX & Design",
        icon: Layout,
        skills: [
            "Tailwind CSS / SCSS",
            "Responsive Design (Mobile-First)",
            "Component Libraries (Shadcn, Material)",
            "Figma Prototyping (Basic)",
        ]
    },
    {
        category: "Tooling, Version Control & Backend",
        icon: Settings,
        skills: [
            "Git & GitHub Workflow",
            "REST APIs & Fetching",
            "Vercel / Netlify Deployment",
            "Basic Node.js",
            "CLI & Build Tools (Vite, Webpack)",
        ]
    },
];

const FUN_FACTS: { label: string; fact: string; icon: string }[] = [
  { label: "Debugging Mantra", fact: "I talk to my code when it breaks. It listens. 🗣️", icon: "💬" },
  { label: "Coffee Stats", fact: "Daily output is directly proportional to caffeine intake. ☕", icon: "📊" },
  { label: "Current Obsession", fact: "Trying to center a div without crying. 🔄", icon: "✨" },
  { label: "Secret Talent", fact: "I can turn 1 hour of coding into 3 hours of debugging a single semicolon. 😅", icon: "⚡" },
];

// --- Main App Component ---
export default function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [currentFunFactIndex, setCurrentFunFactIndex] = useState(0);
  
  // State to track the theme based on the <html> class
  const [isDark, setIsDark] = useState(false);

  // Sequential animation states
  const [showHeader, setShowHeader] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Function to read the theme from the <html> element
  const getThemeFromDOM = useCallback(() => {
    return document.documentElement.classList.contains('dark');
  }, []);

  const cycleFunFact = useCallback(() => {
    setCurrentFunFactIndex(prevIndex => (prevIndex + 1) % FUN_FACTS.length);
  }, []);

  // Functional: Simulated Connection Action
  const handleSimulatedAction = useCallback(() => {
    const message = "Message sent! I'll reply to your friendly hello as soon as possible. 👋";
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3500);
  }, []);

  // Initialize and run sequential animations
  useEffect(() => {
    const initialIsDark = getThemeFromDOM();
    setIsDark(initialIsDark);

    setIsMounted(true);

    const timeouts = [
      setTimeout(() => setShowHeader(true), 300),
      setTimeout(() => setShowDetails(true), 800),
      setTimeout(() => setShowSidebar(true), 1300),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [getThemeFromDOM]);

  // MutationObserver to sync with the parent's theme toggle
  useEffect(() => {
    if (!isMounted) return;

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const newIsDark = document.documentElement.classList.contains('dark');
          if (newIsDark !== isDark) {
            setIsDark(newIsDark);
          }
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [isMounted, isDark]);


  const currentFunFact = FUN_FACTS[currentFunFactIndex];

  // REUSABLE CARD CLASS - Now uses isDark for dynamic classes
  const cardClasses = `
    p-8 rounded-xl relative
    ${isDark 
      ? 'bg-gray-800 border border-gray-700 shadow-2xl shadow-gray-950/50 text-white' 
      : 'bg-white border border-gray-200 shadow-xl text-gray-900'} 
    transition-all duration-500
  `;

  const h2Classes = `text-xl font-semibold mb-4 pb-2 flex items-center ${isDark ? 'text-white border-indigo-400/50' : 'text-gray-900 border-gray-200'} border-b`;
  const iconColorClasses = isDark ? 'text-indigo-400' : 'text-indigo-600';


  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* 🟢 MAIN CONTAINER: Simplified to rely on RootLayout for background/height. */}
      <div className={`relative w-full overflow-y-auto font-inter transition-colors duration-500`}>

        {/* Functional: Alert/Message Box */}
        {alertMessage && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 p-3 bg-indigo-500 text-white font-medium rounded-lg shadow-xl animate-[bounce-in_0.5s_ease-out_forwards] transition-opacity duration-300 pointer-events-none font-sans text-base">
            {alertMessage}
          </div>
        )}

        {/* --- MAIN CONTENT AREA: Wide, Centered, and Padded --- */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 relative pt-12 pb-24">

          {/* === 1. PROFILE HEADER SECTION === */}
          <header
            className={`${cardClasses} mb-12 transform transition-all duration-700
              ${showHeader ? 'animate-slide-in-fade' : 'opacity-0'}
            `}
            style={{ animationDelay: '0.3s' }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start">

              {/* Profile Image */}
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg mb-6 md:mb-0 md:mr-10 flex-shrink-0
                  ring-4 ${isDark ? 'ring-indigo-400/50' : 'ring-indigo-500/50'}`}>
                <img
                  src="https://i.imgur.com/Y9RkFD3.jpeg"
                  alt="Jaymer Mirabuenos - Professional Portrait"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/400x400/4B5563/ffffff?text=J+M";
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text and Bio */}
              <div>
                <h1 className={`text-3xl sm:text-4xl font-extrabold mb-1 ${isDark ? 'text-white' : 'text-gray-900'} typewriter-effect`}>
                  Jaymer M.
                </h1>
                <p className={`text-lg font-medium ${isDark ? 'text-indigo-400' : 'text-indigo-600'} mb-4`}>Aspiring Frontend Engineer | Future of UX</p>

                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Hey, I'm Jaymer! I operate at the intersection of powerful technology and seamless human experience. I see code not just as logic, but as a communication tool aimed at solving real-world problems for real people. I thrive on translating messy, high-level business requirements into clean, performant, and delightful digital products. My core focus is on writing impeccable, modern JavaScript, mastering responsive design, and diligently wrestling complex state management until the final user experience is intuitive, accessible, and genuinely enjoyable.
                </p>
              </div>
            </div>
          </header>

          {/* --- 2. DETAILS & SIDEBAR (Two Column Layout) --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* === Column A (2/3 Width): Core Details and Skills === */}
            <div
              className={`
                lg:col-span-2 space-y-10 transform transition-all duration-700
                ${showDetails ? 'animate-slide-in-fade' : 'opacity-0'}
              `}
              style={{ animationDelay: '0.8s' }}
            >
              {/* A.1: Current Deep Dive Section */}
              <section className={cardClasses}>
                <h2 className={h2Classes}>
                  <Zap size={20} className={`mr-2 ${iconColorClasses}`} /> Current Deep Dive / Obsession
                </h2>
                <div className={`p-5 mt-4 rounded-lg shadow-sm transition-transform duration-300 border-l-4 border-l-sky-500 
                  ${isDark ? 'bg-gray-700 dark:border-l-sky-400' : 'bg-gray-50 border-l-sky-500'}`}>
                  <p className={`text-lg font-hand leading-snug ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    "I'm currently obsessed with making authentication *not* suck. No one should have to feel pain just to sign in! I'm deep diving into **Clerk** and **Supabase** to make login flows feel like magic." ✨
                  </p>
                </div>
              </section>

              {/* A.2: Professional Skills Section (UPDATED) */}
              <section className={cardClasses}>
                <h2 className={h2Classes}>
                  <Code size={20} className={`mr-2 ${iconColorClasses}`} /> Core Technical Competencies
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
                    {SKILL_SETS.map((set) => (
                        <div key={set.category} className="flex flex-col">
                            {/* Category Header */}
                            <h3 className={`text-sm font-bold uppercase mb-3 tracking-wider flex items-center ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                                <set.icon size={16} className={`mr-2 ${isDark ? 'text-indigo-500' : 'text-indigo-700'}`} />
                                {set.category}
                            </h3>
                            {/* Skills List */}
                            <ul className={`list-none space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {set.skills.map((skill, skillIndex) => (
                                    <li key={skillIndex} className="flex items-start">
                                        <span className={`mr-2 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>•</span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
              </section>

            </div>

            {/* === Column B (1/3 Width): Fun Facts and Actions === */}
            <div
              className={`
                lg:col-span-1 space-y-10 transform transition-all duration-700
                ${showSidebar ? 'animate-slide-in-fade' : 'opacity-0'}
              `}
              style={{ animationDelay: '1.3s' }}
            >
              {/* B.2: Action Buttons */}
              <section className={cardClasses}>
                <h2 className={h2Classes}>
                  Get In Touch
                </h2>
                <div className="flex flex-col gap-4">
                  {/* Connect Button */}
                  <button
                    onClick={handleSimulatedAction}
                    className="flex items-center justify-center w-full px-6 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-95
                      bg-blue-500 text-white shadow-md shadow-blue-300/50 hover:bg-blue-600
                      dark:bg-blue-600 dark:shadow-blue-500/50 dark:hover:bg-blue-500"
                  >
                    <Send size={20} className="mr-2" />
                    Let's Collaborate!
                  </button>
                </div>
              </section>

              {/* B.1: Fun Fact Section */}
              <section className={cardClasses}>
                <h2 className={h2Classes}>
                  <Info size={20} className={`mr-2 ${iconColorClasses}`} /> Thoughts & Musings
                </h2>
                <div
                  onClick={cycleFunFact}
                  className={`w-full mt-2 text-center p-5 cursor-pointer transition-all duration-300 rounded-lg hover:shadow-lg
                    ${isDark 
                      ? 'bg-gray-800 border-l-4 border-l-blue-400' 
                      : 'bg-gray-50 border-l-4 border-l-indigo-500'
                    }`}
                >
                  <p className={`text-xs font-bold mb-2 uppercase tracking-wider font-sans opacity-80 ${isDark ? 'text-blue-400' : 'text-indigo-700'}`}>
                    {currentFunFact.label} {currentFunFact.icon}
                  </p>
                  <p className={`font-hand text-xl md:text-2xl leading-tight ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    "{currentFunFact.fact}"
                  </p>
                  <p className={`text-xs mt-3 opacity-70 ${isDark ? 'text-blue-400' : 'text-indigo-700'}`}>
                    (Click to cycle)
                  </p>
                </div>
              </section>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}