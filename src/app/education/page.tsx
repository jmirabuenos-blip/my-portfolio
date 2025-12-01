"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import React from "react";

// --- START: Simplified Lucide Icon Imports ---
// Define a type for icon props
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

// Recreated Icons 
const Book = createIcon("M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20");
const GraduationCap = createIcon([
  "M22 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4",
  "M12 10a5 5 0 0 1-5 5h10a5 5 0 0 1-5-5z",
  "M6 10v9",
  "M18 10v9",
]);
const School = createIcon([
  "M4 22V14",
  "M20 22V14",
  "M6 22v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4",
  "M12 6V2l-5 4-7 4v2l12-3 12 3v-2l-7-4-5-4z",
]);
const Star = createIcon("M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z");
const Zap = createIcon("M13 2 3 14 12 14 11 22 21 10 12 10 13 2");
const ChevronRight = createIcon("m9 18 6-6-6-6");
// --- END: Simulated Lucide Icon Imports ---

// --- 1. DATA TYPES AND CONSTANTS ---

interface EducationItem {
  label: string;
  value: string;
  icon: React.ReactElement;
}

const EDUCATION_ITEMS: EducationItem[] = [
  { label: "Elementary Education", value: "Panicuason Elementary School (Focus on Foundational Skills)", icon: <School className="w-6 h-6" /> },
  { label: "Secondary Education", value: "Carolina National High School (NC II Certificate Holder, TESDA Passed)", icon: <GraduationCap className="w-6 h-6" /> },
  { label: "Higher Education (Current)", value: "IT Student at Naga College Foundation (Focus on Software Development)", icon: <Book className="w-6 h-6" /> },
];

const EDUCATION_ACHIEVEMENTS: string[] = [
  "NC II Certified (Technical Skills)",
  "TESDA Examination Passed",
  "Frontend Development (Beginner)",
  "Continuous Learning Mindset",
  "Visionary Goal Setting",
];

const FADE_IN_DELAY_MS = 300;

// --- 2. MAIN COMPONENT: Education (Simplified) ---

export default function Education() {
  const [highlight, setHighlight] = useState<number | null>(null);

  // THEME SYNCHRONIZATION LOGIC
  const getThemeFromDOM = useCallback(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true; 
  }, []);
  
  // 🐛 FIX: Initialize isDarkMode *after* mount if window is available, otherwise default to a safe light mode color until resolved.
  // Since the useEffect immediately updates it, we keep the call here for initialization but rely on useEffect for truth.
  const [isDarkMode, setIsDarkMode] = useState(getThemeFromDOM); 
  const [isMounted, setIsMounted] = useState(false);

  // State for sequential fade-in effect
  const [showTitle, setShowTitle] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  // Initialize Fade-in Sequence & Theme
  useEffect(() => {
    setIsMounted(true);
    // Re-fetch the current theme state from DOM to ensure accuracy
    setIsDarkMode(getThemeFromDOM());
    
    const t1 = setTimeout(() => setShowTitle(true), FADE_IN_DELAY_MS * 1);
    const t2 = setTimeout(() => setShowItems(true), FADE_IN_DELAY_MS * 2);
    const t3 = setTimeout(() => setShowAchievements(true), FADE_IN_DELAY_MS * 3);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [getThemeFromDOM]); 

  // MutationObserver to watch the <html> tag for theme class changes
  useEffect(() => {
    if (!isMounted) return;

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const newIsDark = document.documentElement.classList.contains('dark');
          if (newIsDark !== isDarkMode) {
            setIsDarkMode(newIsDark);
          }
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [isMounted, isDarkMode]);


  const handleClick = useCallback((index: number) => {
    setHighlight(index);
    setTimeout(() => setHighlight(null), 800); 
  }, []);

  // 🟢 SIMPLIFIED COLOR VARIABLES (Primary: Indigo/Blue, Neutral: Gray/White)
  const primaryAccent = isDarkMode 
    ? "text-indigo-400 border-indigo-500" // Primary Color for Dark Mode
    : "text-indigo-600 border-indigo-600"; // Primary Color for Light Mode
    
  const neutralText = isDarkMode 
    ? "text-gray-300" // Body text
    : "text-gray-700";
    
  const cardBackground = isDarkMode
    ? "bg-gray-800/80 border border-gray-700 shadow-xl shadow-gray-950/50" // Dark Card
    : "bg-white/80 border border-gray-200 shadow-lg shadow-gray-100/50"; // Light Card
    
  const highlightBackground = isDarkMode
    ? "bg-gray-700/80 border-2 border-indigo-400"
    : "bg-indigo-50/70 border-2 border-indigo-600";


  return (
    // 🟢 Simplified Background: Set by layout.tsx (dark gray / white)
    <div className={`relative min-h-screen font-sans ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      
      {/* Main Content Area */}
      <section className="relative w-full min-h-screen py-24 md:py-32 px-4 sm:px-8 flex flex-col items-center justify-center z-10">
        
        {/* FADE-IN STAGE 1: TITLE */}
        <h1 
          className={`text-5xl md:text-6xl font-extrabold mb-4 pb-3 border-b-4 
            ${primaryAccent} 
            transition-opacity duration-700 text-center uppercase tracking-wider ${showTitle ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          Education
        </h1>
        
        {/* Introductory paragraph uses neutralText for body content */}
        <p 
          className={`text-lg md:text-xl ${neutralText} mb-16 transition-opacity duration-700 delay-200 ${showTitle ? "opacity-100" : "opacity-0"}`}
        >
          My formal academic path and skill milestones.
        </p>
        
        {/* FADE-IN STAGE 2: EDUCATION ITEMS (Card Grid) */}
        <div 
          className={`flex flex-col md:flex-row justify-center items-stretch gap-8 w-full max-w-6xl z-10 
            transition-opacity duration-700 ${showItems ? "opacity-100" : "opacity-0"}`}
        >
          {EDUCATION_ITEMS.map((item, index) => {
            const isHighlighted = highlight === index;
            
            return (
              <div
                key={index}
                role="button"
                aria-label={`Details for ${item.label}`}
                onClick={() => handleClick(index)}
                className={`flex flex-col flex-1 min-w-[280px] p-0 rounded-xl cursor-pointer transition-all duration-300 transform overflow-hidden 
                  ${isHighlighted 
                    ? `scale-[1.03] ${highlightBackground}` 
                    : `${cardBackground} hover:scale-[1.02]`
                  }
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Card Header Section */}
                <div className={`p-6 flex items-center justify-between border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                  {/* Header uses primaryAccent (text-indigo-600) */}
                  <h2 className={`text-xl font-bold tracking-wide ${primaryAccent.split(' ')[0]}`}>{item.label}</h2>
                  <div className={`p-2 rounded-full ${primaryAccent.split(' ')[0]} ${isDarkMode ? 'bg-indigo-900/40' : 'bg-indigo-100/60'}`}>
                    {item.icon}
                  </div>
                </div>

                {/* Card Body Section */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  {/* Body text uses neutralText */}
                  <p className={`${neutralText} text-base leading-relaxed`}>{item.value}</p>
                  
                  {/* Details/CTA uses primaryAccent */}
                  <div className={`mt-4 flex items-center justify-end ${primaryAccent.split(' ')[0]} font-semibold text-sm`}>
                    Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* FADE-IN STAGE 3: ACHIEVEMENTS */}
        <div 
          className={`mt-16 pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} w-full max-w-4xl flex flex-col items-center justify-center gap-4 z-10 
            transition-opacity duration-700 ${showAchievements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h3 className={`text-center text-xl font-semibold ${primaryAccent.split(' ')[0]} flex items-center gap-2`}>
            <Zap className={`w-6 h-6 ${primaryAccent.split(' ')[0]}`}/> Core Achievements & Focus
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {EDUCATION_ACHIEVEMENTS.map((achieve, index) => {
              const chipBg = isDarkMode ? "bg-gray-700/40" : "bg-gray-100/80";
              const chipText = isDarkMode ? "text-gray-50" : "text-gray-800";
              const chipBorder = isDarkMode ? "border-gray-700/50" : "border-gray-300/80";

              return (
                <div 
                  key={index} 
                  className={`${chipBg} px-4 py-1.5 rounded-full text-sm ${chipText} flex items-center gap-2 
                    transition-all duration-300 font-medium border ${chipBorder}`}
                >
                  <Star className={`w-3 h-3 ${primaryAccent.split(' ')[0]}`}/>
                  {achieve}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}