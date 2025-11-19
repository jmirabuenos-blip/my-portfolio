"use client";
import { useState, useEffect } from "react";

// --- CUSTOM CSS STYLES FOR ANIMATION (Restored local animations) ---
const customStyles = `
/* Keyframes for Stars/Particles */
@keyframes float {
  0% {
    transform: translateY(0px) translateX(0px);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) translateX(10px);
    opacity: 1;
  }
  100% {
    transform: translateY(0px) translateX(0px);
    opacity: 0.7;
  }
}

/* Keyframes for Orbs/Nebula Glow */
@keyframes float-slow {
  0% {
    transform: translateY(0px) translateX(0px);
    opacity: 0.2; 
  }
  50% {
    transform: translateY(-50px) translateX(20px);
    opacity: 0.4;
  }
  100% {
    transform: translateY(0px) translateX(0px);
    opacity: 0.2;
  }
}

/* Apply animations using standard class names */
.animate-float {
  animation: float 20s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 30s ease-in-out infinite;
}
`;

// Define a simple type for the dynamic elements
interface DynamicElement {
  id: number;
  style: React.CSSProperties;
}

// Utility function (placeholder for image URL handling)
const getImageUrl = (path: string) => {
  return path;
};

// Function to generate deterministic style properties for stars
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

// Function to generate deterministic style properties for orbs
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


export default function About() {
  const [isMounted, setIsMounted] = useState(false); 
  const [isImageFaded, setIsImageFaded] = useState(false);

  // States for local background
  const [stars, setStars] = useState<DynamicElement[]>([]);
  const [orbs, setOrbs] = useState<DynamicElement[]>([]);

  // States for sequential fade-in stages
  const [showPreamble, setShowPreamble] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [showImage, setShowImage] = useState(false);

  // 1. Generate local background on mount
  useEffect(() => {
    setStars(generateStars(30));
    setOrbs(generateOrbs(5));
    setIsMounted(true); 
    
    // 2. Start sequential fade-in effect
    const stepDelay = 400; 
    const t1 = setTimeout(() => setShowPreamble(true), stepDelay * 1);
    const t2 = setTimeout(() => setShowTitle(true), stepDelay * 2);
    const t3 = setTimeout(() => setShowParagraph(true), stepDelay * 3);
    const t4 = setTimeout(() => setShowImage(true), stepDelay * 4);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);
  
  // Conditional rendering of the dynamic background elements
  const BackgroundElements = isMounted ? (
    <>
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
  ) : null; 

  return (
    <>
      {/* Inject custom CSS styles for animations */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      <div className="relative min-h-screen font-sans">
        
        {/* Local Background Gradient (RESTORED) */}
        <div className="fixed inset-0 bg-gradient-to-b from-gray-950 to-blue-950/70 z-0"></div>
        
        {/* RENDER THE DYNAMIC BACKGROUND ELEMENTS (RESTORED) */}
        {BackgroundElements}
        
        {/* Main content section, now lifted above the background elements (z-10) */}
        <section className="relative flex flex-col md:flex-row items-center justify-center min-h-screen gap-12 pt-16 md:pt-16 px-8 lg:px-16 pb-8 z-10">
          
          {/* Left Content Column */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6 z-10">
            
            {/* Stage 1: Preamble (FADE-IN ADDED) */}
            <p className={`text-blue-400 text-xl md:text-2xl font-semibold transition-opacity duration-700 ${showPreamble ? "opacity-100" : "opacity-0"}`}>
              About Me
            </p>
            
            {/* Stage 2: Title (FADE-IN ADDED) */}
            <h1 className={`text-4xl md:text-6xl font-extrabold text-white leading-tight hover:underline hover:decoration-blue-400 decoration-2 transition-opacity duration-700 ${showTitle ? "opacity-100" : "opacity-0"}`}>
              Hi, I'm Jaymer Mirabuenos
            </h1>
            
            {/* Stage 3: Paragraph (FADE-IN ADDED) */}
            <p className={`text-gray-300 max-w-md text-base md:text-lg transition-opacity duration-700 ${showParagraph ? "opacity-100" : "opacity-0"}`}>
              Beginner frontend developer and IT student at Naga College Foundation. I love experimenting
              with React, Next.js, Tailwind CSS, and building interactive UI/UX projects.
            </p>
          </div>

          {/* Right Content Column (Image Block) */}
          <div className={`flex-1 flex justify-center items-center relative z-10 transition-opacity duration-700 ${showImage ? "opacity-100" : "opacity-0"}`}>
            <div 
              className={`relative w-72 h-72 md:w-80 md:h-80 rounded-[50%/40%] overflow-hidden shadow-2xl cursor-pointer hover:scale-105 hover:shadow-blue-500 transition-all duration-500
              ${isImageFaded ? "opacity-30 scale-95 ring-4 ring-blue-500/50" : "opacity-100 scale-100 ring-8 ring-blue-500/80"}
              border-4 border-blue-700/50`}
              onMouseEnter={() => setIsImageFaded(true)}
              onMouseLeave={() => setIsImageFaded(false)}
            >
              <img
                src={getImageUrl("/jaymer.jpg")} 
                alt="Mer" 
                // Placeholder image for demonstration purposes if the original fails
                onError={(e) => {
                  e.currentTarget.onerror = null; 
                  e.currentTarget.src = "https://placehold.co/400x400/1e3a8a/ffffff?text=Mer";
                }}
                className="w-full h-full object-cover object-center" 
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}