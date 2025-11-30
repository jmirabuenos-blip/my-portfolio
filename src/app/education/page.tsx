"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Book, GraduationCap, School, Star, Zap, ChevronRight } from "lucide-react";

// --- 1. TYPE DEFINITIONS ---

/**
 * Defines the structure for the dynamic background elements (stars and orbs).
 */
interface DynamicElement {
  id: number;
  style: React.CSSProperties;
}

/**
 * Defines the structure for an education timeline item.
 */
interface EducationItem {
  label: string;
  value: string;
  icon: React.ReactElement;
  color: string; // Define color for card accents
}

// --- 2. CONSTANTS AND DATA ---

const EDUCATION_ITEMS: EducationItem[] = [
  { label: "Elementary Education", value: "Panicuason Elementary School (Focus on Foundational Skills)", icon: <School className="w-6 h-6" />, color: "text-yellow-400" },
  { label: "Secondary Education", value: "Carolina National High School (NC II Certificate Holder, TESDA Passed)", icon: <GraduationCap className="w-6 h-6" />, color: "text-blue-400" },
  { label: "Higher Education (Current)", value: "IT Student at Naga College Foundation (Focus on Software Development)", icon: <Book className="w-6 h-6" />, color: "text-green-400" },
];

const EDUCATION_ACHIEVEMENTS: string[] = [
  "NC II Certified (Technical Skills)",
  "TESDA Examination Passed",
  "Frontend Development (Beginner)",
  "Continuous Learning Mindset",
  "Visionary Goal Setting",
];

// Sequential fade-in timing (in milliseconds)
const FADE_IN_DELAY_MS = 300;

// --- 3. CUSTOM CSS AND KEYFRAMES (Necessary for animation) ---

const customStyles = `
/* Keyframes for Stars/Particles */
@keyframes float {
  0% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
  50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
  100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
}

/* Keyframes for Orbs/Nebula Glow */
@keyframes float-slow {
  0% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
  50% { transform: translateY(-50px) translateX(20px); opacity: 0.4; }
  100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
}

/* Apply animations using standard class names */
.animate-float {
  animation: float 20s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 30s ease-in-out infinite;
}
`;

// --- 4. BACKGROUND GENERATION HELPERS ---

const generateStars = (count: number): DynamicElement[] => 
  Array.from({ length: count }, (_, i) => ({
    id: i,
    style: {
      width: `${(i % 3) + 2}px`, 
      height: `${(i % 3) + 2}px`,
      left: `${(i * 3.3) % 100}%`,
      top: `${(i * 5.5) % 100}%`,
      animationDelay: `${(i % 5) * 0.8}s`,
      animationDuration: `12s`,
    },
  }));

const generateOrbs = (count: number): DynamicElement[] => 
  Array.from({ length: count }, (_, i) => ({
    id: i,
    style: {
      width: `${(i * 50) + 200}px`, 
      height: `${(i * 50) + 200}px`,
      left: `${(i * 25) + 5}%`, 
      top: `${(i * 15) + 10}%`,
      animationDelay: `${i * 1.5}s`,
      animationDuration: `20s`,
      filter: 'blur(100px)',
    },
  }));


// --- 5. COMPONENT: EducationBackground ---

interface EducationBackgroundProps {
  stars: DynamicElement[];
  orbs: DynamicElement[];
}

const EducationBackground: React.FC<EducationBackgroundProps> = ({ stars, orbs }) => {
  return (
    <>
      {/* Inject custom CSS styles for animations */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Animated Space Background Gradient (Static part) */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-950 to-blue-950/70 z-0"></div>

      {/* Floating Stars/Particles */}
      <div className="fixed inset-0 z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-blue-300/80 animate-float"
            style={star.style}
          ></div>
        ))}
      </div>

      {/* Larger Floating Orbs */}
      <div className="fixed inset-0 z-0">
        {orbs.map((orb) => (
          <div
            key={orb.id}
            className="absolute rounded-full bg-indigo-500/50 blur-3xl animate-float-slow"
            style={orb.style}
          ></div>
        ))}
      </div>
    </>
  );
};


// --- 6. MAIN COMPONENT: Education ---

export default function Education() {
  const [highlight, setHighlight] = useState<number | null>(null);

  // Use useMemo to ensure background generation runs once and memoizes the output
  const stars = useMemo(() => generateStars(40), []);
  const orbs = useMemo(() => generateOrbs(5), []);

  // State for sequential fade-in effect
  const [showTitle, setShowTitle] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  // Initialize Fade-in Sequence
  useEffect(() => {
    // Start sequential fade-in effect
    const t1 = setTimeout(() => setShowTitle(true), FADE_IN_DELAY_MS * 1);
    const t2 = setTimeout(() => setShowItems(true), FADE_IN_DELAY_MS * 2);
    const t3 = setTimeout(() => setShowAchievements(true), FADE_IN_DELAY_MS * 3);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []); 

  // Use useCallback for event handlers for better performance/stability
  const handleClick = useCallback((index: number) => {
    setHighlight(index);
    // Remove highlight after a brief period
    setTimeout(() => setHighlight(null), 800); 
  }, []);

  return (
    <div className="relative min-h-screen font-sans">
      
      {/* Background Component (Unchanged) */}
      <EducationBackground stars={stars} orbs={orbs} />

      {/* Main Content Area */}
      <section className="relative w-full min-h-screen py-24 md:py-32 px-4 sm:px-8 flex flex-col items-center justify-center z-10">
        
        {/* FADE-IN STAGE 1: TITLE (Unchanged) */}
        <h1 
          className={`text-6xl font-extrabold mb-4 pb-2 border-b-4 border-cyan-500/50 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 
            transition-opacity duration-700 text-center uppercase tracking-wider ${showTitle ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          Educational Trajectory
        </h1>
        <p 
          className={`text-xl text-gray-400 mb-16 transition-opacity duration-700 delay-200 ${showTitle ? "opacity-100" : "opacity-0"}`}
        >
          Milestones in my academic and skill development journey.
        </p>
        
        {/* FADE-IN STAGE 2: EDUCATION ITEMS (Card Grid) */}
        <div 
          className={`flex flex-col md:flex-row justify-center items-stretch gap-8 w-full max-w-6xl z-10 
            transition-opacity duration-700 ${showItems ? "opacity-100" : "opacity-0"}`}
        >
          {EDUCATION_ITEMS.map((item, index) => (
            <div
              key={index}
              role="button"
              aria-label={`Details for ${item.label}`}
              onClick={() => handleClick(index)}
              className={`flex flex-col flex-1 min-w-[280px] p-0 rounded-2xl cursor-pointer transition-all duration-300 transform border shadow-2xl overflow-hidden ${
                highlight === index 
                  // Highlight state: stronger glow, scale, definite border color
                  ? `scale-[1.03] bg-blue-900/60 shadow-blue-500/50 border-2 border-cyan-400` 
                  // Default state: ethereal glow/shadow, subtle border
                  : "bg-blue-950/25 backdrop-blur-sm border-blue-700/30 hover:scale-[1.02] hover:border-cyan-500/50 hover:shadow-cyan-900/60"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card Header Section */}
              <div className={`p-6 flex items-center justify-between border-b-2 ${highlight === index ? 'border-cyan-400' : 'border-blue-700/50'} bg-blue-900/40`}>
                <h2 className={`text-xl font-extrabold tracking-wide ${item.color}`}>{item.label}</h2>
                <div className={`p-2 rounded-full ${item.color} bg-blue-800/50`}>
                  {item.icon}
                </div>
              </div>

              {/* Card Body Section */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <p className="text-gray-300 text-base leading-relaxed">{item.value}</p>
                <div className="mt-4 flex items-center justify-end text-cyan-400 font-semibold text-sm">
                  View Details 
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* FADE-IN STAGE 3: ACHIEVEMENTS (Skills and Mindset) (Unchanged) */}
        <div 
          className={`mt-16 pt-8 border-t border-blue-700/50 w-full max-w-4xl flex flex-col items-center justify-center gap-4 z-10 
            transition-opacity duration-700 ${showAchievements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h3 className="text-center text-xl font-semibold text-cyan-300/90 flex items-center gap-2">
             <Zap className="w-6 h-6 text-yellow-500"/> Core Achievements & Focus
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {EDUCATION_ACHIEVEMENTS.map((achieve, index) => (
              <div 
                key={index} 
                className="bg-blue-800/40 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm text-gray-50 flex items-center gap-2 shadow-lg 
                  hover:bg-blue-700/50 transition-all duration-300 font-medium border border-blue-600/50"
              >
                <Star className="w-3 h-3 text-yellow-400"/>
                {achieve}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}