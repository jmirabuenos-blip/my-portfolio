"use client";
import { useState, useEffect, useCallback, JSX } from "react";
import { Mail, Facebook, Instagram, Github, Send } from "lucide-react";

// --- CUSTOM CSS STYLES (Background Animations - kept separate as they are theme-neutral) ---
const customStyles = `
/* Keyframes for Stars/Particles (Background) */
@keyframes float {
  0% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
  50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
  100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
}

/* Keyframes for Orbs/Nebula Glow (Background) */
@keyframes float-slow {
  0% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
  50% { transform: translateY(-50px) translateX(20px); opacity: 0.4; }
  100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
}

/* Apply animations using standard class names */
.animate-float { animation: float 20s ease-in-out infinite; }
.animate-float-slow { animation: float-slow 30s ease-in-out infinite; }

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
.fade-up-1 { animation: contentFadeUp 1.0s ease-out forwards; }
.fade-up-2 { animation: contentFadeUp 1.0s ease-out 0.2s forwards; }
.fade-up-3 { animation: contentFadeUp 1.0s ease-out 0.4s forwards; }

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

  // --- THEME LOGIC START ---
  const getThemeFromDOM = useCallback(() => {
    // Check if window is defined (i.e., we are client-side)
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    // Default to false (light mode) on the server to prevent mismatches
    return false; 
  }, []);
  
  // FIX: Initialize with 'false' (light mode) to avoid hydration mismatch
  const [isDarkMode, setIsDarkMode] = useState(false); 

  // Initialize Theme and Background on Mount
  useEffect(() => {
    setIsMounted(true);
    
    // FIX: Immediately fetch and set the correct theme state on the client side.
    setIsDarkMode(getThemeFromDOM());
    
    // Background Setup (Can be done unconditionally, as opacity will handle visibility)
    setStars(generateStars(30));
    setOrbs(generateOrbs(5));

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
  // --- THEME LOGIC END ---

  // --- DYNAMIC STYLE DEFINITIONS ---
  const accentColor = isDarkMode ? "text-blue-400" : "text-blue-600";
  const textColor = isDarkMode ? "text-gray-300" : "text-gray-700";
  
  // Adjusted Card styles: Dark mode uses high contrast, Light mode uses lighter shades and shadows
  const cardBackground = isDarkMode 
    ? "bg-gray-800/60 shadow-lg hover:shadow-blue-500/50" 
    : "bg-white/90 border border-gray-200 shadow-md hover:shadow-blue-300/50";
  
  const iconColor = isDarkMode ? "text-blue-400" : "text-blue-600";
  const linkTextColor = isDarkMode ? "text-gray-200" : "text-gray-800";
  
  // The background gradient is now conditional based on the theme
  const mainBackground = isDarkMode 
    ? "bg-gradient-to-b from-gray-950 to-blue-950/70" // Original Dark/Space Theme
    : "bg-gradient-to-b from-blue-50/70 to-white"; // Simple Light Theme Gradient (less dramatic)


  // Conditional rendering of the dynamic background elements
  const BackgroundElements = isMounted ? (
    <>
      {/* Floating Stars/Particles (Kept slightly blue/white for both) */}
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

  // Icons are now dynamic based on the theme
  const contactLinks = [
    { name: "Email", icon: <Mail size={30} className={iconColor} />, link: "mailto:Jmirabuenos@gbox.ncf.edu.ph" },
    { name: "Facebook", icon: <Facebook size={30} className={iconColor} />, link: "https://www.facebook.com/jaymer.mirabuenos.2025" },
    { name: "Instagram", icon: <Instagram size={30} className={iconColor} />, link: "https://www.instagram.com/jajajaymerrr/" },
    { name: "Github", icon: <Github size={30} className={iconColor} />, link: "https://github.com/jmirabuenos-blip" },
  ];

  const handleClick = () => {
    setContactShake(true);
    setTimeout(() => setContactShake(false), 600);
  };

  return (
    <>
      {/* Inject custom CSS styles for all animations (background and contact) */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      <div className={`relative min-h-screen font-sans ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        
        {/* Animated Background Gradient (Theme dependent now) */}
        <div className={`fixed inset-0 ${mainBackground} z-0`}></div>
        
        {/* RENDER THE DYNAMIC BACKGROUND ELEMENTS CONDITIONALLY */}
        {BackgroundElements}

        {/* Contact Content */}
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-8 pt-24 pb-10 z-10">
          
          {/* Floating Emojis */}
          {floatingIcons.map((icon) => (
            <span
              key={icon.id}
              className="absolute pointer-events-none z-50 text-blue-300" // Kept blue for contrast
              style={{ 
                top: `${icon.top}%`, 
                left: `${icon.left}%`, 
                fontSize: `${icon.size}px`, 
                opacity: 0, 
                animation: "contactFadeIn 3s forwards" 
              }}
            >
              {icon.emoji}
            </span>
          ))}
          
          {/* Main Card Container (A subtle, professional card) */}
          <div className={`w-full max-w-2xl p-8 rounded-xl backdrop-blur-sm transition-all duration-500 ${cardBackground}`}>
          
            {/* Title */}
            <h1
              onClick={handleClick}
              className={`text-4xl md:text-5xl font-extrabold ${accentColor} cursor-pointer mb-4 relative opacity-0 fade-up-1 text-center ${
                contactShake ? "animate-shake" : ""
              }`}
            >
              Get in Touch <Send className="inline w-8 h-8 ml-2"/>
            </h1>

            {/* Paragraph */}
            <p 
              className={`text-lg max-w-xl text-center leading-relaxed mx-auto mb-10 opacity-0 fade-up-2 ${textColor}`}
            >
              I'm always open to discussing new opportunities, collaborations, or simply connecting with fellow professionals. Feel free to reach out via any of the platforms below.
            </p>

            {/* Links Grid */}
            <div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 z-10 opacity-0 fade-up-3"
            >
              {contactLinks.map((c, idx) => (
                <a
                  key={idx}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md transition-all duration-300 backdrop-blur-sm translate-z-0
                    ${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-100/80 hover:bg-gray-200'}
                  `}
                >
                  {c.icon}
                  <span className={`mt-2 text-sm font-medium ${linkTextColor}`}>{c.name}</span>
                </a>
              ))}
            </div>
            
          </div> {/* End Main Card */}
          
          {/* Simple Footer Note */}
          <p className={`mt-10 text-sm opacity-0 fade-up-3 ${textColor}`}>
              Responsive and professional, just like this portfolio section. 💻
          </p>

        </section>
      </div>
    </>
  );
}