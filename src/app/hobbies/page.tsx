"use client";
import { useState, useEffect, useCallback, JSX } from "react";
import { Guitar, Target, MountainSnow, Compass, X, Heart, TrendingUp } from "lucide-react";

// --- CUSTOM CSS STYLES (Includes Background Animations) ---
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

/* Simplified animation for the emoji drops only */
@keyframes hobbyFadeInOut {0%{opacity:0;transform:translateY(0)}50%{opacity:1;transform:translateY(-20px)}100%{opacity:0;transform:translateY(-40px)}}
`;

// --- Background Generation Functions ---
interface DynamicElement {
  id: number;
  style: React.CSSProperties;
}

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

// --- Data Types and Constants ---
type EmojiDrop = { id: number; emoji: string; top: number; left: number; size: number; duration: number };
type ImageSlide = { src: string; caption: string };
type Hobby = {
  title: string;
  icon: JSX.Element;
  desc: string;
  emojis: string[];
  videos?: { src: string; note: string }[];
  images?: ImageSlide[];
};

const hobbiesData: Hobby[] = [
  {
    title: "Playing Guitar",
    icon: <Guitar className="w-12 h-12 text-indigo-500" />,
    desc: "I enjoy learning new chords and expressing myself through music.",
    emojis: ["🎸", "🎶", "🎵"],
    videos: [
      { src: "https://i.imgur.com/rVJMmH7.mp4", note: "Here's a short clip of me playing guitar 🎸" },
    ],
  },
  {
    title: "Basketball",
    icon: <Target className="w-12 h-12 text-amber-500" />,
    desc: "I like playing basketball casually for fun, exercise, and bonding with friends.",
    emojis: ["🏀", "💪", "🏆"],
    videos: [
      { src: "https://i.imgur.com/GOQ75FY.mp4", note: "Making some shots 🏀 — action on the court!" },
      { src: "https://i.imgur.com/dwuMlJS.mp4", note: "Another basketball clip 🏀🔥" },
    ],
  },
  {
    title: "Hiking",
    icon: <MountainSnow className="w-12 h-12 text-green-500" />,
    desc: "I love going outdoors, exploring nature, and enjoying peaceful hikes.",
    emojis: ["🥾", "🌲", "🌄"],
    images: [
      { src: "https://i.imgur.com/YgJYywb.jpg", caption: "Starting the trail 🌲" },
      { src: "https://i.imgur.com/yyY8UfS.jpg", caption: "Beautiful view 🌄" },
      { src: "https://i.imgur.com/YRbUXNT.jpg", caption: "Taking a break 🥾" },
      { src: "https://i.imgur.com/p9Yyg60.jpg", caption: "Summit reached! ⛰️" },
    ],
  },
  {
    title: "Discovering New Things",
    icon: <Compass className="w-12 h-12 text-blue-500" />,
    desc: "I enjoy learning, exploring, and trying new experiences.",
    emojis: ["🧭", "🔍", "💡"],
    images: [
      { src: "https://i.imgur.com/YG4QvvS.jpg", caption: "Love to explore new places!" },
    ],
  },
];

const HOBBY_STATS = [
  { label: "Total Hike Distance", value: "350+ km", icon: <MountainSnow className="w-5 h-5" /> },
  { label: "Guitar Chords Mastered", value: "45", icon: <Guitar className="w-5 h-5" /> },
  { label: "New Skills Learned (Year)", value: "5", icon: <Compass className="w-5 h-5" /> },
  { label: "Baskets Made (Lifetime est.)", value: "7,500+", icon: <Target className="w-5 h-5" /> },
];

// --- Component Logic ---

export default function Hobbies() {
  const [hobbyEmojis, setHobbyEmojis] = useState<EmojiDrop[]>([]);
  const [showTitle, setShowTitle] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // State for dynamic background elements
  const [stars, setStars] = useState<DynamicElement[]>([]);
  const [orbs, setOrbs] = useState<DynamicElement[]>([]);

  const [mediaState, setMediaState] = useState<{
    visible: boolean;
    hobbyIdx?: number;
    idx?: number;
    src?: string;
    note?: string;
    isImage?: boolean;
  }>({ visible: false });

  // Simplified Theme Logic
  const getThemeFromDOM = useCallback(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    // Default to false (light mode) on the server to prevent mismatches
    return false; 
  }, []);
  
  // FIX: Initialize with 'false' (light mode) to avoid hydration mismatch
  const [isDarkMode, setIsDarkMode] = useState(false); 

  // Initialize Fade-in Sequence, Theme, and Background
  useEffect(() => {
    setIsMounted(true);
    
    // FIX: Immediately fetch and set the correct theme state on the client side.
    const initialDarkMode = getThemeFromDOM();
    setIsDarkMode(initialDarkMode);
    
    // Initialize background based on the correct theme state
    if (initialDarkMode) {
        setStars(generateStars(30));
        setOrbs(generateOrbs(5));
    }
    
    const stepDelay = 300;
    const t1 = setTimeout(() => setShowTitle(true), stepDelay * 1);
    const t2 = setTimeout(() => setShowIntro(true), stepDelay * 2);
    const t3 = setTimeout(() => setShowGrid(true), stepDelay * 3);
    const t4 = setTimeout(() => setShowStats(true), stepDelay * 4);
    const t5 = setTimeout(() => setShowFooter(true), stepDelay * 5);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
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
            
            // Re-initialize background elements when switching to/from dark mode
            if (newIsDark) {
                setStars(generateStars(30));
                setOrbs(generateOrbs(5));
            } else {
                setStars([]);
                setOrbs([]);
            }
          }
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [isMounted, isDarkMode]);
  
  // Dynamic Color Classes
  const primaryAccent = isDarkMode 
    ? "text-blue-400 border-blue-600"
    : "text-blue-700 border-blue-500";
    
  const neutralText = isDarkMode 
    ? "text-gray-300"
    : "text-gray-600";
    
  const cardBackground = isDarkMode
    ? "bg-gray-800/80 border border-blue-800/30"
    : "bg-white/80 border border-gray-200";
    
  const cardHoverShadow = isDarkMode
    ? "hover:shadow-blue-500/50"
    : "hover:shadow-blue-300/50";
    
  const mediaPopupBg = isDarkMode 
    ? "bg-gray-900" 
    : "bg-white";
    
  const mediaPopupText = isDarkMode 
    ? "text-white" 
    : "text-gray-900";

  // Dynamic Background Elements for Dark Mode
  const BackgroundElements = isDarkMode && isMounted ? (
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
  
  const mainBackgroundGradient = isDarkMode 
    ? "bg-gradient-to-b from-gray-950 to-blue-950/70" // Space/Dark theme
    : "bg-white"; // Simple Light theme

  const handleHobbyClick = (hobby: Hobby, hobbyIdx: number) => {
    const drops: EmojiDrop[] = Array.from({ length: 12 }).map(() => ({
      id: Math.random(),
      emoji: hobby.emojis[Math.floor(Math.random() * hobby.emojis.length)],
      top: 10 + Math.random() * 70,
      left: 10 + Math.random() * 80,
      size: 20 + Math.random() * 15,
      duration: 2 + Math.random() * 2,
    }));
    setHobbyEmojis(drops);
    setTimeout(() => setHobbyEmojis([]), 4000);

    // Only proceed to show media if there is actually media available
    if (hobby.videos && hobby.videos.length > 0) {
      setMediaState({ visible: true, hobbyIdx, idx: 0, src: hobby.videos[0].src, note: hobby.videos[0].note, isImage: false });
    } else if (hobby.images && hobby.images.length > 0) {
      setMediaState({ visible: true, hobbyIdx, idx: 0, src: hobby.images[0].src, note: hobby.images[0].caption, isImage: true });
    }
  };

  const handleNextMedia = () => {
    // 1. Strict checks for required state properties
    if (mediaState.hobbyIdx === undefined || mediaState.idx === undefined) return;

    const hobby = hobbiesData[mediaState.hobbyIdx];
    
    // 2. Check for existence of the media array before trying to access it
    if (mediaState.isImage && hobby.images) {
      if (hobby.images.length <= 1) return;
      const nextIdx = (mediaState.idx + 1) % hobby.images.length;
      setMediaState({ visible: true, hobbyIdx: mediaState.hobbyIdx, idx: nextIdx, src: hobby.images[nextIdx].src, note: hobby.images[nextIdx].caption, isImage: true });
    } else if (!mediaState.isImage && hobby.videos) {
      if (hobby.videos.length <= 1) return;
      const nextIdx = (mediaState.idx + 1) % hobby.videos.length;
      setMediaState({ visible: true, hobbyIdx: mediaState.hobbyIdx, idx: nextIdx, src: hobby.videos[nextIdx].src, note: hobby.videos[nextIdx].note, isImage: false });
    }
  };

  const handlePrevMedia = () => {
    // 1. Strict checks for required state properties
    if (mediaState.hobbyIdx === undefined || mediaState.idx === undefined) return;

    const hobby = hobbiesData[mediaState.hobbyIdx];

    // 2. Check for existence of the media array before trying to access it
    if (mediaState.isImage && hobby.images) {
      if (hobby.images.length <= 1) return;
      const arrayLength = hobby.images.length;
      const prevIdx = (mediaState.idx - 1 + arrayLength) % arrayLength;
      setMediaState({ visible: true, hobbyIdx: mediaState.hobbyIdx, idx: prevIdx, src: hobby.images[prevIdx].src, note: hobby.images[prevIdx].caption, isImage: true });
    } else if (!mediaState.isImage && hobby.videos) {
      if (hobby.videos.length <= 1) return;
      const arrayLength = hobby.videos.length;
      const prevIdx = (mediaState.idx - 1 + arrayLength) % arrayLength;
      setMediaState({ visible: true, hobbyIdx: mediaState.hobbyIdx, idx: prevIdx, src: hobby.videos[prevIdx].src, note: hobby.videos[prevIdx].note, isImage: false });
    }
  };

  // Helper function to check if navigation buttons should be visible
  const shouldShowNavigation = (isImage: boolean | undefined, hobbyIdx: number | undefined) => {
      if (hobbyIdx === undefined || isImage === undefined) return false;
      const hobby = hobbiesData[hobbyIdx];
      if (isImage) {
          return hobby.images && hobby.images.length > 1;
      } else {
          return hobby.videos && hobby.videos.length > 1;
      }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Main container uses theme classes (bg-white/bg-gray-900) */}
      <div className={`relative min-h-screen font-sans ${isDarkMode ? 'text-gray-100 bg-gray-900' : 'text-gray-900 bg-white'}`}>
        
        {/* Fixed Background Layer: Gradient for Dark Mode, Simple for Light Mode */}
        <div className={`fixed inset-0 z-0 ${mainBackgroundGradient}`}></div>
        
        {/* Render Animated Background Elements if in Dark Mode */}
        {BackgroundElements}

        <section className={`relative w-full py-24 px-8 flex flex-col items-center z-10 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <h1 className={`text-5xl md:text-6xl font-extrabold text-center mb-6 ${primaryAccent.split(' ')[0]} transition-opacity duration-700 ${showTitle ? "opacity-100" : "opacity-0"}`}>
            My Hobbies
          </h1>

          {/* Introductory Paragraph with Quote and Philosophy Mention */}
          <div 
            className={`w-full max-w-4xl p-8 mb-16 rounded-xl text-center shadow-lg transition-opacity duration-700 delay-300 ${showIntro ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              ${isDarkMode ? 'bg-gray-800/60 border border-gray-700' : 'bg-gray-50/70 border border-gray-200'}
            `}
          >
            <p className={`text-xl font-serif italic mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              "The only true wisdom is in knowing you know nothing." — Socrates
            </p>
            <p className={`text-lg mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Beyond coding, I love **philosophy** 💡, which informs my approach to problem-solving and life. These hobbies are essential for staying balanced, active, and continually learning new perspectives.
            </p>
          </div>
          
          {/* Hobbies Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto z-10 transition-opacity duration-700 ${showGrid ? "opacity-100" : "opacity-0"}`}>
            {hobbiesData.map((hobby, idx) => (
              <div
                key={idx}
                onClick={() => handleHobbyClick(hobby, idx)}
                onMouseEnter={() => {
                  const drops = Array.from({ length: 8 }).map(() => ({
                    id: Math.random(),
                    emoji: hobby.emojis[Math.floor(Math.random() * hobby.emojis.length)],
                    top: 50 + Math.random() * 20,
                    left: 50 + Math.random() * 20,
                    size: 14 + Math.random() * 10,
                    duration: 1 + Math.random(),
                  }));
                  setHobbyEmojis(drops);
                  setTimeout(() => setHobbyEmojis([]), 1000);
                }}
                className={`group border rounded-2xl p-6 shadow-lg hover:shadow-xl ${cardHoverShadow} hover:scale-105 transition-all cursor-pointer overflow-hidden transform hover:-translate-y-1 backdrop-blur-sm 
                  ${cardBackground}
                `}
                style={{
                    borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 transition-transform duration-300 group-hover:rotate-6">{hobby.icon}</div>
                  <h3 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{hobby.title}</h3>
                </div>
                <p className={`${neutralText} text-center`}>{hobby.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Hobby Statistics Section */}
          <div 
            className={`w-full max-w-6xl mt-20 transition-opacity duration-700 delay-500 ${showStats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h2 className={`text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2 ${primaryAccent.split(' ')[0]}`}>
                <TrendingUp className="w-6 h-6"/> Hobby Metrics
            </h2>
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 p-4 rounded-xl shadow-inner 
                ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-100/70 border border-gray-300'}`}
            >
                {HOBBY_STATS.map((stat, index) => (
                    <div key={index} className="text-center p-3">
                        <div className={`mx-auto mb-2 flex items-center justify-center w-10 h-10 rounded-full 
                            ${isDarkMode ? 'bg-blue-600/20 text-blue-300' : 'bg-blue-500/10 text-blue-600'}`}>
                            {stat.icon}
                        </div>
                        <p className={`text-2xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                        <p className={`text-sm mt-1 ${neutralText}`}>{stat.label}</p>
                    </div>
                ))}
            </div>
          </div>


          {/* Emoji Drops (Animation remains) */}
          {hobbyEmojis.map((drop) => (
            <span key={drop.id} className="absolute z-20 pointer-events-none select-none" style={{
              top: `${drop.top}%`,
              left: `${drop.left}%`,
              fontSize: `${drop.size}px`,
              animation: `hobbyFadeInOut ${drop.duration}s ease-in-out forwards`,
            }}>{drop.emoji}</span>
          ))}

          {/* Media Popup (Navigation rendering stabilized) */}
          {mediaState.visible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setMediaState({ visible: false })}>
              <div className={`relative ${mediaPopupBg} rounded-xl shadow-2xl flex flex-col sm:flex-row items-center p-6 max-w-4xl w-full transition-all`} onClick={(e) => e.stopPropagation()}>
                {/* Text/Note Section */}
                {mediaState.note && (
                  <div className={`flex-1 ${mediaPopupText} text-left text-lg pr-0 sm:pr-6 pb-4 sm:pb-0 flex items-center justify-center sm:justify-start`}>
                    {mediaState.note}
                  </div>
                )}
                
                {/* Media Section */}
                {mediaState.src && (
                  <div className="relative flex items-center transition-all duration-500">
                    {mediaState.isImage ? (
                      <img src={mediaState.src} alt="Hobby media" className="max-w-full h-auto max-h-[300px] w-auto rounded-lg shadow-lg" />
                    ) : (
                      <video src={mediaState.src} controls autoPlay className="max-w-full h-auto max-h-[300px] w-auto rounded-lg shadow-lg" />
                    )}
                    
                    {/* Navigation Buttons: Use the helper function for clean rendering logic */}
                    {shouldShowNavigation(mediaState.isImage, mediaState.hobbyIdx) && (
                          <button 
                            className="absolute left-[-40px] top-1/2 -translate-y-1/2 text-white px-3 py-2 bg-blue-600/70 rounded hover:bg-blue-500 transition" 
                            onClick={handlePrevMedia}
                          >
                            ◀
                          </button>
                    )}
                    {shouldShowNavigation(mediaState.isImage, mediaState.hobbyIdx) && (
                          <button 
                            className="absolute right-[-40px] top-1/2 -translate-y-1/2 text-white px-3 py-2 bg-blue-600/70 rounded hover:bg-blue-500 transition" 
                            onClick={handleNextMedia}
                          >
                            ▶
                          </button>
                    )}
                  </div>
                )}
                <button 
                  className={`absolute top-2 right-2 text-2xl p-2 ${primaryAccent.split(' ')[0]} hover:opacity-75`} 
                  onClick={() => setMediaState({ visible: false })}
                >
                  <X />
                </button>
              </div>
            </div>
          )}

        </section>

        {/* Simple Footer (unchanged) */}
        <footer 
          className={`w-full py-8 border-t text-center z-10 transition-opacity duration-700 delay-600 ${showFooter ? "opacity-100" : "opacity-0"}
            ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}
          `}
        >
          <p className="text-sm flex justify-center items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500" /> and curiosity.
          </p>
        </footer>
      </div>
    </>
  );
}