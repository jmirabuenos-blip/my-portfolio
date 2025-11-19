"use client";
import { useState, useEffect } from "react";
import { Book, GraduationCap, School, Star } from "lucide-react";

// --- CUSTOM CSS STYLES FOR ANIMATION (U+00A0 replaced with standard spaces) ---
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

// Define types for dynamic elements
interface DynamicElement {
  id: number;
  style: React.CSSProperties;
}

const educationItems = [
  { label: "Elementary", value: "Panicuason Elementary School", icon: <School className="w-10 h-10 text-yellow-400" /> },
  { label: "High School", value: "Carolina National High School (NC II Certificate Holder, TESDA Passed)", icon: <GraduationCap className="w-10 h-10 text-blue-400" /> },
  { label: "College", value: "IT Student at Naga College Foundation", icon: <Book className="w-10 h-10 text-green-400" /> },
];

const educationAchievements = [
  "🎓 NC II Certified",
  "✅ TESDA Passed",
  "💻 Beginner Frontend Developer",
  "📚 Always Learning",
  "🌟 Dreaming Big",
];

// --- Background Generation Functions ---
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

export default function Education() {
  const [highlight, setHighlight] = useState<number | null>(null);

  // State for dynamic background
  const [isMounted, setIsMounted] = useState(false); 
  const [stars, setStars] = useState<DynamicElement[]>([]);
  const [orbs, setOrbs] = useState<DynamicElement[]>([]);

  // NEW STATE FOR SEQUENTIAL FADE-IN
  const [showTitle, setShowTitle] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);


  // Initialize Background and Fade-in Sequence
  useEffect(() => {
    setStars(generateStars(30));
    setOrbs(generateOrbs(5));
    setIsMounted(true); 

    // Start sequential fade-in effect (400ms delay between steps)
    const stepDelay = 400; 
    const t1 = setTimeout(() => setShowTitle(true), stepDelay * 1);
    const t2 = setTimeout(() => setShowItems(true), stepDelay * 2);
    const t3 = setTimeout(() => setShowAchievements(true), stepDelay * 3);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
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
  // --- End Background Setup ---

  const handleClick = (index: number) => {
    setHighlight(index);
    setTimeout(() => setHighlight(null), 1000);
  };

  return (
    <>
      {/* Inject custom CSS styles for animations */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      <div className="relative min-h-screen font-sans">
        
        {/* Animated Space Background Gradient (Static part) */}
        <div className="fixed inset-0 bg-gradient-to-b from-gray-950 to-blue-950/70 z-0"></div>
        
        {/* RENDER THE DYNAMIC BACKGROUND ELEMENTS CONDITIONALLY */}
        {BackgroundElements}

        {/* Original Content wrapped in <section> with z-10 */}
        <section className="relative w-full min-h-screen py-24 md:py-32 px-8 flex flex-col items-center justify-center z-10">
          {/* FADE-IN STAGE 1: TITLE */}
          <h1 className={`text-5xl font-extrabold text-cyan-400 mb-12 transition-opacity duration-700 ${showTitle ? "opacity-100" : "opacity-0"}`}>
            Education
          </h1>
          
          {/* FADE-IN STAGE 2: EDUCATION ITEMS */}
          <div className={`flex flex-col gap-8 w-full max-w-3xl z-10 transition-opacity duration-700 ${showItems ? "opacity-100" : "opacity-0"}`}>
            {educationItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`flex items-center gap-6 p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 translate-z-0 ${
                  highlight === index ? "bg-blue-900/70 shadow-blue-500/50" : "bg-blue-950/20 backdrop-blur-sm"
                }`}
              >
                <div>{item.icon}</div>
                <div className="text-left">
                  <h2 className="text-2xl font-semibold text-white">{item.label}</h2>
                  <p className="text-gray-200 mt-1">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* FADE-IN STAGE 3: ACHIEVEMENTS */}
          <div className={`mt-12 flex flex-wrap justify-center gap-6 z-10 transition-opacity duration-700 ${showAchievements ? "opacity-100" : "opacity-0"}`}>
            {educationAchievements.map((achieve, index) => (
              <div key={index} className="bg-blue-950/30 backdrop-blur-sm px-4 py-2 rounded-xl text-lg text-gray-50 flex items-center gap-2 shadow-md hover:bg-blue-700/40 hover:scale-105 transition-all duration-300 translate-z-0">
                <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
                {achieve}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}