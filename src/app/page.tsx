"use client";
import { useState, useEffect } from "react";
import { Mail, Facebook, Instagram, Github, X } from "lucide-react"; // X imported here for the close button

// --- CUSTOM CSS STYLES (Includes Background, Icon, and Content Animations for all pages) ---
const customStyles = `
/* Keyframes for Background Particles */
@keyframes float {
  0% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
  50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
  100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
}
@keyframes float-slow {
  0% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
  50% { transform: translateY(-50px) translateX(20px); opacity: 0.4; }
  100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
}
.animate-float { animation: float 20s ease-in-out infinite; }
.animate-float-slow { animation: float-slow 30s ease-in-out infinite; }

/* Keyframes for Content Fade Up (Used for all views) */
@keyframes contentFadeUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
.fade-up-1 { animation: contentFadeUp 1.0s ease-out forwards; }
.fade-up-2 { animation: contentFadeUp 1.0s ease-out 0.2s forwards; }
.fade-up-3 { animation: contentFadeUp 1.0s ease-out 0.4s forwards; }
.fade-up-4 { animation: contentFadeUp 1.0s ease-out 0.6s forwards; }

/* Keyframes for Floating Emojis on Contact Page */
@keyframes contactFadeIn {
  0% { opacity: 0; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(-20px); }
}

/* Keyframes for Project Message Overlay */
@keyframes messageFade {
  0% { opacity: 0; transform: scale(0.9) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-message-fade {
  animation: messageFade 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

/* Keyframes for Contact Header Shake */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
}
.animate-shake { animation: shake 0.6s ease-in-out; }
`;

// Define a simple type for the dynamic elements
interface DynamicElement {
  id: number;
  style: React.CSSProperties;
}
type FloatingIcon = { id: number; emoji: string; top: number; left: number; size: number; delay: number };

// Helper Functions for Background Generation
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

// Shared Background Component (to be used by all views)
const BackgroundElements: React.FC<{ stars: DynamicElement[], orbs: DynamicElement[], isMounted: boolean }> = ({ stars, orbs, isMounted }) => {
    if (!isMounted) return null;

    return (
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
    );
};


// --- HOME VIEW COMPONENT ---
interface HomeProps {
  navigateTo: (page: string) => void;
  stars: DynamicElement[];
  orbs: DynamicElement[];
  isMounted: boolean;
}

const HomeView: React.FC<HomeProps> = ({ navigateTo, stars, orbs, isMounted }) => {
  const [isImageFaded, setIsImageFaded] = useState(false);
  const [showProjectMessage, setShowProjectMessage] = useState(false);
  
  // States for sequential fade-in stages
  const [showHiJaymer, setShowHiJaymer] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [showButtons, setShowButtons] = useState(false); 

  // Sequential Fade-In Logic
  useEffect(() => {
    const initialDelay = 200;
    const stepDelay = 500; // Time between each element appearing

    const timer1 = setTimeout(() => setShowHiJaymer(true), initialDelay);
    const timer2 = setTimeout(() => setShowTitle(true), initialDelay + stepDelay);
    const timer3 = setTimeout(() => setShowParagraph(true), initialDelay + stepDelay * 2);
    const timer4 = setTimeout(() => setShowButtons(true), initialDelay + stepDelay * 3);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  // Handles the "View Projects" button click
  const handleViewProjects = () => {
    // Show the message
    setShowProjectMessage(true);
  };

  // Handler to manually close the message
  const handleCloseProjectMessage = () => {
    setShowProjectMessage(false);
  };


  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center min-h-screen px-8 lg:px-16 pb-8 z-10">
      
      <BackgroundElements stars={stars} orbs={orbs} isMounted={isMounted} />

      {/* Project Message Overlay */}
      <div 
        className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${showProjectMessage ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className={`bg-gray-900/95 border border-blue-600/50 rounded-xl p-8 shadow-2xl animate-message-fade max-w-lg w-full text-center relative ${showProjectMessage ? 'scale-100' : 'scale-90'}`}>
          
          {/* Close Button using the X icon */}
          <button
            onClick={handleCloseProjectMessage}
            className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close message"
          >
            <X size={20} />
          </button>
          
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
            <span className="text-blue-400 font-bold">This application represents my foundational portfolio project,</span> marking the start of my journey in front-end development. Further projects are currently under construction and will be showcased here soon.
          </p>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-20 md:pr-12 lg:pr-24">
        
        {/* Stage 0: Hi, I'm Jaymer - Fades in first */}
        <p className={`text-blue-400 text-xl md:text-2xl mb-2 font-medium transition-opacity duration-700 ${showHiJaymer ? "opacity-100 fade-up-1" : "opacity-0"}`} style={{ opacity: 0 }}>
          Hi, I'm Jaymer
        </p>
        
        {/* Stage 1: Frontend Developer - Fades in second */}
        <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-2xl transition-opacity duration-700 ${showTitle ? "opacity-100 fade-up-2" : "opacity-0"}`} style={{ opacity: 0 }}>
          Frontend Developer
        </h1>
        
        {/* Stage 2: Paragraph - Fades in third */}
        <p className={`text-gray-400 text-base md:text-lg max-w-xl mb-10 drop-shadow-md transition-opacity duration-700 ${showParagraph ? "opacity-100 fade-up-3" : "opacity-0"}`} style={{ opacity: 0 }}>
          Beginner IT student passionate about creating modern, responsive web experiences and leveraging technology to build intuitive UIs.
        </p>
        
        {/* Buttons fade in after all text is faded in */}
        <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto transition-opacity duration-700 ${showButtons ? "opacity-100 fade-up-4" : "opacity-0"}`} style={{ opacity: 0 }}>
          <button 
            onClick={handleViewProjects}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transform"
          >
            View Projects
          </button>
          <button 
            onClick={() => navigateTo('contact')}
            className="px-8 py-3 border border-blue-600 text-blue-400 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transform"
          >
            Let's Talk
          </button>
        </div>
      </div>

      {/* Image Block (THE PROFILE PICTURE SECTION) */}
      <div className="flex-1 flex justify-center items-center mt-12 md:mt-0 relative z-10">
        <div
          className={`relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden cursor-pointer transition-all duration-700 ease-in-out shadow-2xl shadow-blue-500/50 
          ${isImageFaded ? "opacity-30 scale-95 ring-4 ring-blue-500/50" : "opacity-100 scale-100 ring-8 ring-blue-500/80"}
          border-4 border-blue-700/50`}
          onMouseEnter={() => setIsImageFaded(true)}
          onMouseLeave={() => setIsImageFaded(false)}
        >
          {/* *** UPDATED: Using the provided Imgur URL for the profile picture *** */}
          <img
            src="https://i.imgur.com/Y9RkFD3.jpeg" 
            alt="Jaymer's Profile Picture"
            className="absolute inset-0 w-full h-full object-cover object-center scale-110 transition-transform duration-700"
          />
          {/* Subtle hover overlay */}
          <div className={`absolute inset-0 bg-black/50 transition-opacity duration-700 ${isImageFaded ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
      </div>
    </section>
  );
};


// --- CONTACT VIEW COMPONENT ---
const ContactView: React.FC<HomeProps> = ({ stars, orbs, isMounted }) => {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);
  const [contactShake, setContactShake] = useState(false);
  const [viewLoaded, setViewLoaded] = useState(false);
  
  // Floating Icon and View Load Interval
  useEffect(() => {
    setViewLoaded(true); // Trigger fade-in
    if (!isMounted) return;

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
      setTimeout(() => setFloatingIcons((prev) => prev.filter((e) => e.id !== icon.id)), 5000); 
    }, 2000);

    return () => clearInterval(interval);
  }, [isMounted]);

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
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-8 pt-24 pb-10 z-10">
      
      <BackgroundElements stars={stars} orbs={orbs} isMounted={isMounted} />

      {/* Floating Emojis */}
      {floatingIcons.map((icon) => (
        <span
          key={icon.id}
          className="absolute pointer-events-none z-50 text-white"
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

      {/* H1 - Fade-in stage 1 */}
      <h1
        onClick={handleClick}
        className={`text-5xl md:text-6xl font-extrabold text-blue-400 cursor-pointer mb-6 relative translate-z-0 opacity-0 ${viewLoaded ? 'fade-up-1' : ''} ${
          contactShake ? "animate-shake" : ""
        }`}
        style={{ opacity: 0 }}
      >
        Contact Me
      </h1>

      {/* P - Fade-in stage 2 */}
      <p 
        className={`text-gray-300 text-lg max-w-xl text-center leading-relaxed mb-8 opacity-0 ${viewLoaded ? 'fade-up-2' : ''}`}
        style={{ opacity: 0 }}
      >
        I'd love to hear from you! Whether it's a project idea, collaboration, or just a friendly hello — reach out anytime.
      </p>

      {/* Links Grid - Fade-in stage 3 */}
      <div 
        className={`grid grid-cols-2 sm:grid-cols-4 gap-6 z-10 opacity-0 ${viewLoaded ? 'fade-up-3' : ''}`}
        style={{ opacity: 0 }}
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
  );
};


// --- MAIN APP COMPONENT (Router) ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [isMounted, setIsMounted] = useState(false); 
  const [stars, setStars] = useState<DynamicElement[]>([]);
  const [orbs, setOrbs] = useState<DynamicElement[]>([]);

  // Initialize Background and Mounted State
  useEffect(() => {
    setStars(generateStars(30));
    setOrbs(generateOrbs(5));
    setIsMounted(true); 
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const renderPage = () => {
    const commonProps = { navigateTo, stars, orbs, isMounted };
    switch (currentPage) {
      case 'home':
        return <HomeView {...commonProps} />;
      case 'contact':
        return <ContactView {...commonProps} />;
      default:
        return <HomeView {...commonProps} />;
    }
  };

  const getPageTitle = (page: string) => {
    switch (page) {
        case 'home': return 'Home';
        case 'contact': return 'Contact Me';
        default: return 'Portfolio';
    }
  };

  return (
    <>
      {/* Inject custom CSS styles for animations */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      <div className="relative min-h-screen font-sans">
        
        {/* Fixed Background (Static Gradient) */}
        <div className="fixed inset-0 bg-gradient-to-b from-gray-950 to-blue-950/70 z-0"></div>
        
        {renderPage()}
        
        {/* Universal Back Navigation (If not on the home page) */}
        {currentPage !== 'home' && (
          <div className="fixed top-0 left-0 right-0 z-50">
              <div className="flex items-center justify-between p-4 bg-gray-900/50 backdrop-blur-md shadow-lg border-b border-blue-900/50">
                <button
                    onClick={() => navigateTo('home')}
                    className="flex items-center text-white text-sm font-semibold p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                    <span className="mr-2 text-xl">🚀</span> Back to Home
                </button>
                <span className="text-xl font-bold text-blue-400">{getPageTitle(currentPage)}</span>
                {/* Placeholder for alignment */}
                <div className="w-28"></div> 
              </div>
          </div>
        )}
      </div>
    </>
  );
}