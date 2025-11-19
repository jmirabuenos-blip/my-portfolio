"use client";
import { useState, useEffect } from "react";
import { Mail, Facebook, Instagram, Github } from "lucide-react";

// --- CUSTOM CSS STYLES (Includes Background, Icon, and Content Animations) ---
const customStyles = `
/* Keyframes for Stars/Particles (Background) */
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

/* Keyframes for Orbs/Nebula Glow (Background) */
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

/* Keyframes for Floating Emojis (Fade-In and Vertical Movement) */
@keyframes contactFadeIn {
  0% { opacity: 0; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(-20px); }
}

/* Keyframes for Main Content Fade Up */
@keyframes contentFadeUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Specific classes for staggered content fade-in */
.fade-up-1 {
  animation: contentFadeUp 1.0s ease-out forwards;
}
.fade-up-2 {
  animation: contentFadeUp 1.0s ease-out 0.2s forwards; /* 200ms delay */
}
.fade-up-3 {
  animation: contentFadeUp 1.0s ease-out 0.4s forwards; /* 400ms delay for links */
}


/* Keyframes for Shake Effect */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
}
.animate-shake { animation: shake 0.6s ease-in-out; }
`;

// Define types for dynamic elements
interface DynamicElement {
  id: number;
  style: React.CSSProperties;
}
type FloatingIcon = { id: number; emoji: string; top: number; left: number; size: number; delay: number };

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
// ----------------------------------------

export default function Contact() {
  const [isMounted, setIsMounted] = useState(false); 
  const [stars, setStars] = useState<DynamicElement[]>([]);
  const [orbs, setOrbs] = useState<DynamicElement[]>([]);
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);
  const [contactShake, setContactShake] = useState(false);

  // Initialize Background and Floating Icons
  useEffect(() => {
    // Background Setup
    setStars(generateStars(30));
    setOrbs(generateOrbs(5));
    setIsMounted(true); 

    // Floating Icon Interval
    const interval = setInterval(() => {
      const emojis = ["📧", "💌", "⭐", "🌟", "📱"];
      const icon = {
        id: Date.now() + Math.random(),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        top: Math.random() * 80,
        left: Math.random() * 90,
        size: 12 + Math.random() * 20,
        delay: 0,
      };
      setFloatingIcons((prev) => [...prev, icon]);
      // Remove the icon after its animation duration
      setTimeout(() => setFloatingIcons((prev) => prev.filter((e) => e.id !== icon.id)), 5000); 
    }, 2000);

    return () => clearInterval(interval);
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

  // Icons explicitly set to white
  const contactLinks = [
    { name: "Email", icon: <Mail size={30} className="text-white" />, link: "mailto:Jmirabuenos@gbox.ncf.edu.ph" },
    { name: "Facebook", icon: <Facebook size={30} className="text-white" />, link: "https://www.facebook.com/jaymer.mirabuenos.2025" },
    { name: "Instagram", icon: <Instagram size={30} className="text-white" />, link: "https://www.instagram.com/jajajaymerrr/" },
    { name: "Github", icon: <Github size={30} className="text-white" />, link: "https://github.com/jmirabuenos-blip" },
  ];

  const handleClick = () => {
    setContactShake(true);
    setTimeout(() => setContactShake(false), 600);
  };

  return (
    <>
      {/* Inject custom CSS styles for all animations (background and contact) */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      <div className="relative min-h-screen font-sans">
        
        {/* Animated Space Background Gradient (Static part) */}
        <div className="fixed inset-0 bg-gradient-to-b from-gray-950 to-blue-950/70 z-0"></div>
        
        {/* RENDER THE DYNAMIC BACKGROUND ELEMENTS CONDITIONALLY */}
        {BackgroundElements}

        {/* Contact Content */}
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-8 pt-24 pb-10 z-10">
          
          {/* Floating Emojis */}
          {floatingIcons.map((icon) => (
            <span
              key={icon.id}
              className="absolute pointer-events-none z-50 text-white"
              style={{ 
                  top: `${icon.top}%`, 
                  left: `${icon.left}%`, 
                  fontSize: `${icon.size}px`, 
                  opacity: 0, // Ensure starting opacity is 0 for fade
                  animation: "contactFadeIn 3s forwards" 
              }}
            >
              {icon.emoji}
            </span>
          ))}

          {/* H1 - Fade-in stage 1 */}
          <h1
            onClick={handleClick}
            // Applying fade-up class
            className={`text-5xl md:text-6xl font-extrabold text-blue-400 cursor-pointer mb-6 relative translate-z-0 opacity-0 fade-up-1 ${
              contactShake ? "animate-shake" : ""
            }`}
          >
            Contact Me
          </h1>

          {/* P - Fade-in stage 2 */}
          <p 
            // Applying fade-up class with delay
            className="text-gray-300 text-lg max-w-xl text-center leading-relaxed mb-8 opacity-0 fade-up-2"
          >
            I'd love to hear from you! Whether it's a project idea, collaboration, or just a friendly hello — reach out anytime.
          </p>

          {/* Links Grid - Fade-in stage 3 */}
          <div 
            // Applying fade-up class with more delay
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 z-10 opacity-0 fade-up-3"
          >
            {contactLinks.map((c, idx) => (
              <a
                key={idx}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center bg-gray-900/50 p-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-blue-500 transition-all duration-300 backdrop-blur-sm translate-z-0"
              >
                {c.icon}
                <span className="mt-2 text-sm text-gray-300">{c.name}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}