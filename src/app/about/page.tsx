"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import React from "react"; 

// Define a type for icon props
interface IconProps extends React.SVGProps<SVGSVGElement> {}

// --- START: Simulated Lucide Icon Imports ---
const Send = (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>;
const Cpu = (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8h.01"/><path d="M16 8h.01"/><path d="M8 12h.01"/><path d="M16 12h.01"/><path d="M8 16h.01"/><path d="M12 16h.01"/><path d="M16 16h.01"/></svg>;
const Moon = (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const Sun = (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const Zap = (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const Info = (props: IconProps) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;
// --- END: Simulated Lucide Icon Imports ---

// --- CUSTOM CSS STYLES ---
const customStyles = `
/* Import Google Font 'Lora' (professional, humanist serif with calligraphic roots) and 'Inter' (UI default) */
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Inter:wght@400;600;800&display=swap');

/* CRITICAL: Force HTML and body to take up full space, essential for h-full/w-full to work */
html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
}
/* CRITICAL: Ensure the root element of the React app also fills its container */
#root, #app {
    height: 100%;
    width: 100%;
}

.font-hand {
    font-family: 'Lora', serif;
}

.neon-glow-dark {
    box-shadow: 0 0 5px rgba(244, 114, 182, 0.5), 0 0 10px rgba(103, 232, 249, 0.4);
}
.section-bg-dark {
    background: rgba(17, 24, 39, 0.7); /* Darker gray background for contrast */
    border: 1px solid rgba(55, 65, 81, 0.5); /* Border for definition */
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}
.section-bg-light {
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(209, 213, 219, 0.5);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

/* --- Typewriter Effect CSS for Name --- */
.typewriter-effect {
    overflow: hidden; /* Ensures the text is clipped */
    border-right: .15em solid; /* The blinking cursor */
    white-space: nowrap; /* Keeps the content on a single line */
    letter-spacing: .10em; /* Spacing for a cleaner look */
    /* The animation steps must match the number of characters in the name (9 chars: J,a,y,m,e,r, ,M,.) */
    animation: 
      typing 2s steps(9, end) forwards, 
      blink-caret .75s step-end infinite 2s; /* Start blinking after typing finishes (2s) */
    width: 0; /* Starts with 0 width */
}

/* Keyframes for the typing animation */
@keyframes typing {
    from { width: 0 }
    to { width: 100% }
}

/* Keyframes for the blinking cursor */
@keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: currentColor; }
}
/* --- END Typewriter Effect CSS --- */


@keyframes float { 
    0% { transform: translate(0px, 0px); opacity: 0.5; }
    50% { transform: translate(-10px, 15px); opacity: 0.8; }
    100% { transform: translate(0px, 0px); opacity: 0.5; }
}
@keyframes drift { 
    0% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.2; }
    50% { transform: translate(30px, -20px) rotate(5deg); opacity: 0.4; }
    100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.2; }
}
@keyframes slide-in-fade {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
}
@keyframes bounce-in {
    0% { transform: translate(-50%, -100px); opacity: 0; }
    60% { transform: translate(-50%, 10px); opacity: 1; }
    100% { transform: translate(-50%, 20px); opacity: 1; }
}
/* Skill bar animation */
@keyframes fill-bar {
    from { width: 0%; }
    to { width: var(--skill-width); }
}
.skill-bar-fill {
    animation: fill-bar 1.5s ease-out forwards;
}

.animate-float { animation: float 25s ease-in-out infinite; }
.animate-drift { animation: drift 40s ease-in-out infinite; }
.animate-slide-in-fade { animation: slide-in-fade 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; opacity: 0; }
.animate-bounce-in { animation: bounce-in 0.5s ease-out forwards; }
`;

// Data Types
interface DynamicElement { id: number; style: React.CSSProperties; }
interface Skill { name: string; proficiency: number; color: string; }

// Skill Data (Professional Focus) - GLOBAL CONSTANT
const SKILLS: Skill[] = [
    { name: "React & Next.js", proficiency: 90, color: "bg-sky-500" },
    { name: "Tailwind CSS & UI/UX", proficiency: 95, color: "bg-teal-500" },
    { name: "TypeScript & State Mgmt", proficiency: 80, color: "bg-yellow-500" },
    { name: "IT Fundamentals & Flow", proficiency: 85, color: "bg-fuchsia-500" },
];

// Fun Facts Data (Human-made touch) - GLOBAL CONSTANT
const FUN_FACTS: { label: string; fact: string; icon: string }[] = [
    { label: "Debugging Mantra", fact: "I talk to my code when it breaks. It listens. 🗣️", icon: "💬" },
    { label: "Coffee Stats", fact: "Daily output is directly proportional to caffeine intake. ☕", icon: "📊" },
    { label: "Current Obsession", fact: "Trying to center a div without crying. 🔄", icon: "✨" },
    { label: "Secret Talent", fact: "I can turn 1 hour of coding into 3 hours of debugging a single semicolon. 😅", icon: "⚡" },
];

// Background Generation (for the space/tech vibe)
const generateStars = (count: number): DynamicElement[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    style: {
      width: `${(i % 3) + 1}px`, height: `${(i % 3) + 1}px`,
      left: `${(i * 3.1) % 100}%`, top: `${(i * 5.7) % 100}%`,
      animationDelay: `${(i % 10) * 0.5}s`, animationDuration: `25s`,
    },
  }));
const generateOrbs = (count: number): DynamicElement[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    style: {
      width: `${(i * 50) + 250}px`, height: `${(i * 50) + 250}px`,
      left: `${(i * 30) + 10}%`, top: `${(i * 20) + 15}%`,
      animationDelay: `${i * 2}s`, animationDuration: `40s`,
      filter: 'blur(150px)',
    },
  }));


// --- Main App Component (No props used) ---
export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [currentFunFactIndex, setCurrentFunFactIndex] = useState(0);
    const [stars, setStars] = useState<DynamicElement[]>([]);
    const [orbs, setOrbs] = useState<DynamicElement[]>([]);
    const [areSkillBarsVisible, setAreSkillBarsVisible] = useState(false);

    // Sequential animation states
    const [showHeader, setShowHeader] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const cycleFunFact = useCallback(() => {
        setCurrentFunFactIndex(prevIndex => (prevIndex + 1) % FUN_FACTS.length);
    }, []);

    // Functional: Theme Toggle
    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => !prev);
        setAlertMessage(isDarkMode ? "Switched to Light Mode! ☀️" : "Switched to Dark Mode! 🌙");
        setTimeout(() => setAlertMessage(null), 2500);
    }, [isDarkMode]);

    // Functional: Simulated Connection Action
    const handleSimulatedAction = useCallback(() => {
        const message = "Message sent! I'll reply to your friendly hello as soon as possible. 👋";
        setAlertMessage(message);
        setTimeout(() => setAlertMessage(null), 3500);
    }, []);

    // Initialize and run sequential animations
    useEffect(() => {
        setStars(generateStars(50));
        setOrbs(generateOrbs(4));
        setIsMounted(true);

        const timeouts = [
            setTimeout(() => setShowHeader(true), 300),
            setTimeout(() => setShowDetails(true), 800),
            setTimeout(() => setAreSkillBarsVisible(true), 1500), 
            setTimeout(() => setShowSidebar(true), 1300),
        ];

        return () => timeouts.forEach(clearTimeout);
    }, []);
    
    const currentFunFact = FUN_FACTS[currentFunFactIndex];

    // Dynamic Theme Class Mapping (Uses local state directly)
    const themeClasses = {
        bg: isDarkMode ? "bg-gray-950/95" : "bg-gray-50",
        bgGradient: isDarkMode ? "from-gray-900 via-gray-950 to-indigo-950/70" : "from-gray-100 via-gray-50 to-indigo-50",
        sectionBg: isDarkMode ? "section-bg-dark" : "section-bg-light shadow-xl",
        textPrimary: isDarkMode ? "text-white" : "text-gray-900",
        textSecondary: isDarkMode ? "text-gray-400" : "text-gray-600",
        accentPrimary: isDarkMode ? "text-cyan-300" : "text-indigo-600",
        accentBorder: isDarkMode ? "border-fuchsia-500/30" : "border-indigo-500/50",
        // --- UPDATED LIGHT MODE STYLING FOR FUN FACT CARD ---
        // Changed back to Indigo focus for the Light Mode bottom card
        funFactBg: isDarkMode 
            ? "bg-gray-800/70 border-l-4 border-l-teal-400 rotate-1 hover:-rotate-1 shadow-lg" 
            : "bg-indigo-50/90 border-l-4 border-l-indigo-400 rotate-1 hover:-rotate-1 shadow-md", 
        funFactText: isDarkMode ? "text-teal-200" : "text-gray-800",
        funFactSubText: isDarkMode 
            ? "text-teal-500" 
            : "text-indigo-700", 
        // ----------------------------------------------------
        obsessionBg: isDarkMode ? "bg-gray-800/70 border-2 border-dashed border-sky-500/50 -rotate-1 hover:rotate-0" : "bg-white/90 border-2 border-dashed border-sky-400/50 -rotate-1 hover:rotate-0",
        ringColor: isDarkMode ? "ring-4 ring-fuchsia-500/50" : "ring-4 ring-indigo-500/50",
        buttonToggle: isDarkMode
          ? 'bg-fuchsia-600 text-white shadow-fuchsia-500/50 hover:bg-fuchsia-500 border-fuchsia-400/50 neon-glow-dark'
          : 'bg-indigo-500 text-white shadow-indigo-300/50 hover:bg-indigo-600 border-indigo-400/50',
        buttonConnect: isDarkMode
          ? 'bg-cyan-600 text-white shadow-cyan-500/50 hover:bg-cyan-500 border-cyan-400/50 neon-glow-dark'
          : 'bg-teal-500 text-white shadow-teal-300/50 hover:bg-teal-600 border-teal-400/50',
    };

    // Background JSX generation
    const BackgroundElements = isMounted ? (
        <>
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${themeClasses.bgGradient} z-0 transition-colors duration-500`}></div>
            
            {/* Stars Layer */}
            <div className="absolute inset-0 z-10">
                {stars.map((star) => (
                    <div key={star.id} className={`absolute rounded-full ${isDarkMode ? 'bg-cyan-200/90 animate-float' : 'bg-gray-400/50'} `} style={star.style}></div>
                ))}
            </div>
            
            {/* Orbs/Glow */}
            {isDarkMode && (
                <div className="absolute inset-0 z-0 opacity-80">
                    {orbs.map((orb) => (
                        <div key={orb.id} className="absolute rounded-full bg-fuchsia-600/50 mix-blend-screen animate-drift" style={orb.style}></div>
                    ))}
                </div>
            )}
        </>
    ) : null;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />

            {/* Main Container: h-screen to force 100% of viewport height, overflow-y-auto for scrolling */}
            <div className={`relative w-full h-screen overflow-y-auto font-inter ${themeClasses.bg} transition-colors duration-500`}>
                {BackgroundElements}

                {/* Functional: Alert/Message Box */}
                {alertMessage && (
                    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 p-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-xl shadow-2xl animate-bounce-in transition-opacity duration-300 pointer-events-none border border-green-300/50 font-hand text-lg">
                        {alertMessage}
                    </div>
                )}

                {/* --- THEME TOGGLE: Moved to Bottom Center --- */}
                <nav className="fixed bottom-0 left-0 right-0 z-40 p-6 flex justify-center">
                    <button
                        onClick={toggleTheme}
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        className={`flex items-center justify-center p-3 rounded-full shadow-2xl transition-all duration-300 transform active:scale-90
                            ${isDarkMode
                                ? 'bg-fuchsia-600/80 text-white border-2 border-fuchsia-400/50 hover:bg-fuchsia-500/90 hover:ring-2 hover:ring-cyan-300/50'
                                : 'bg-white/90 text-indigo-700 border-2 border-indigo-400/50 hover:bg-white hover:ring-2 hover:ring-indigo-300/50'
                            }
                        `}
                    >
                        {isDarkMode ? <Sun className="w-7 h-7" /> : <Moon className="w-7 h-7" />}
                    </button>
                </nav>
                {/* --- END THEME TOGGLE --- */}

                {/* --- MAIN CONTENT AREA: Wide, Centered, and Padded --- */}
                {/* Adjusted padding-bottom to account for the fixed nav bar at the bottom */}
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 relative pt-16 pb-24"> 
                    
                    {/* === 1. PROFILE HEADER SECTION (Full Width) === */}
                    <header 
                        className={`
                            p-6 md:p-10 rounded-2xl mb-8 transform transition-all duration-700
                            ${themeClasses.sectionBg}
                            ${showHeader ? 'animate-slide-in-fade' : 'opacity-0'}
                        `}
                        style={{ animationDelay: '0.3s' }}
                    >
                        <div className="flex flex-col md:flex-row items-center md:items-start">
                            
                            {/* Profile Image */}
                            <div className={`w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden ${themeClasses.ringColor} shadow-xl mb-4 md:mb-0 md:mr-8 flex-shrink-0`}>
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
                                {/* Typewriter Effect Applied Here */}
                                <h1 className={`text-4xl sm:text-5xl font-extrabold mb-1 ${themeClasses.textPrimary} typewriter-effect`}>
                                    Jaymer M.
                                </h1>
                                <p className={`text-xl font-medium ${themeClasses.accentPrimary} mb-4`}>Aspiring Frontend Engineer | Future of UX</p>
                                
                                <p className={`text-base leading-relaxed ${themeClasses.textSecondary}`}>
                                    Hey, I'm Jaymer! I operate at the intersection of powerful technology and seamless human experience. I see code not just as logic, but as a communication tool aimed at solving real-world problems for real people. I thrive on translating messy, high-level business requirements into clean, performant, and delightful digital products. My core focus is on writing impeccable, modern JavaScript, mastering responsive design, and diligently wrestling complex state management until the final user experience is intuitive, accessible, and genuinely enjoyable.
                                </p>
                            </div>
                        </div>
                    </header>

                    {/* --- 2. DETAILS & SIDEBAR (Two Column Layout) --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* === Column A (2/3 Width): Core Details and Skills === */}
                        <div 
                            className={`
                                lg:col-span-2 space-y-8 transform transition-all duration-700
                                ${showDetails ? 'animate-slide-in-fade' : 'opacity-0'}
                            `}
                            style={{ animationDelay: '0.8s' }}
                        >
                            {/* A.1: Current Deep Dive Section */}
                            <section className={`p-6 rounded-2xl ${themeClasses.sectionBg}`}>
                                <h2 className={`text-2xl font-semibold mb-3 tracking-wider pb-2 flex items-center ${themeClasses.textPrimary} border-b ${themeClasses.accentBorder}`}>
                                    <Zap className={`w-6 h-6 mr-2 ${themeClasses.accentPrimary}`}/> Current Deep Dive / Obsession
                                </h2>
                                <div className={`p-5 mt-4 shadow-sm rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm transition-transform duration-300 transform ${themeClasses.obsessionBg}`}>
                                    <p className={`text-xl font-hand leading-snug ${themeClasses.textSecondary}`}>
                                        "I'm currently obsessed with making authentication *not* suck. No one should have to feel pain just to sign in! I'm deep diving into **Clerk** and **Supabase** to make login flows feel like magic." ✨
                                    </p>
                                </div>
                            </section>
                            
                            {/* A.2: Professional Skills Section */}
                            <section className={`p-6 rounded-2xl ${themeClasses.sectionBg}`}>
                                <h2 className={`text-2xl font-semibold mb-4 tracking-wider pb-2 flex items-center ${themeClasses.textPrimary} border-b ${themeClasses.accentBorder}`}>
                                    <Cpu className={`w-6 h-6 mr-2 ${themeClasses.accentPrimary}`}/> Technical Focus & Proficiency
                                </h2>
                                
                                {SKILLS.map((skill) => (
                                    <div key={skill.name} className="mb-4">
                                        <div className={`flex justify-between items-center text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            <span>{skill.name}</span>
                                            <span>{skill.proficiency}</span>
                                        </div>
                                        <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full h-2.5 shadow-inner`}>
                                            <div
                                                className={`${skill.color} h-2.5 rounded-full skill-bar-fill`}
                                                style={{ 
                                                    '--skill-width': `${skill.proficiency}%`, // CSS variable for animation
                                                    width: areSkillBarsVisible ? `${skill.proficiency}%` : '0%', 
                                                    transition: areSkillBarsVisible ? 'width 1.5s ease-out' : 'none'
                                                } as React.CSSProperties}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </section>

                        </div>

                        {/* === Column B (1/3 Width): Fun Facts and Actions === */}
                        <div 
                            className={`
                                lg:col-span-1 space-y-8 transform transition-all duration-700
                                ${showSidebar ? 'animate-slide-in-fade' : 'opacity-0'}
                            `}
                            style={{ animationDelay: '1.3s' }}
                        >
                            {/* B.2: Action Buttons (MOVED UP) */}
                            <section className={`p-6 rounded-2xl ${themeClasses.sectionBg}`}>
                                <h2 className={`text-xl font-semibold mb-4 tracking-wider pb-2 flex items-center ${themeClasses.textPrimary} border-b ${themeClasses.accentBorder}`}>
                                    Get In Touch
                                </h2>
                                <div className="flex flex-col gap-4">
                                    {/* Simulated Connect Button */}
                                    <button
                                        onClick={handleSimulatedAction}
                                        className={`flex items-center justify-center w-full px-6 py-3 font-semibold rounded-full shadow-xl transition-all duration-300 transform active:scale-95 border ${themeClasses.buttonConnect}`}
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        Let's Collaborate!
                                    </button>
                                </div>
                            </section>
                            
                            {/* B.1: Fun Fact Section (Cycles on click) (MOVED DOWN) */}
                            <section className={`p-6 rounded-2xl ${themeClasses.sectionBg}`}>
                                {/* Updated Title */}
                                <h2 className={`text-xl font-semibold mb-4 tracking-wider pb-2 flex items-center ${themeClasses.textPrimary} border-b ${themeClasses.accentBorder}`}>
                                    <Info className={`w-5 h-5 mr-2 ${themeClasses.accentPrimary}`}/> Thoughts & Musings
                                </h2>
                                <div 
                                    onClick={cycleFunFact}
                                    className={`w-full mt-2 text-center p-4 cursor-pointer transition-all duration-300 transform rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm font-hand text-lg md:text-xl ${themeClasses.funFactBg}`}
                                >
                                    <p className={`text-sm font-bold mb-1 uppercase tracking-wider font-sans opacity-70 ${themeClasses.funFactSubText}`}>
                                        {currentFunFact.label} {currentFunFact.icon}
                                    </p>
                                    <p className={`font-hand text-xl md:text-2xl leading-tight ${themeClasses.funFactText}`}>
                                        "{currentFunFact.fact}"
                                    </p>
                                    <p className={`text-xs mt-2 ${themeClasses.funFactSubText}`}>
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