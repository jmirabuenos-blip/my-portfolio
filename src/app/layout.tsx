"use client";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Education", href: "/education" },
  { name: "Hobbies", href: "/hobbies" },
  { name: "Contact", href: "/contact" },
];

// --- Deterministic data generation functions ---
const generateStarStyles = (count: number): { top: string, left: string, delay: string }[] => 
  Array.from({ length: count }, (_, i) => ({
    top: `${(i * 5) % 95 + 2}%`,
    left: `${(i * 4.7) % 95 + 2}%`,
    delay: `${(i % 5) * 0.5}s`,
  }));

const generateLineStyles = (count: number): { top: string, left: string, delay: string, type: string }[] => {
  const types = ["horizontal", "vertical", "diagonal"];
  return Array.from({ length: count }, (_, i) => ({
    type: types[i % types.length], 
    top: `${(i * 6.5) % 90 + 5}%`,
    left: `${(i * 7.2) % 90 + 5}%`,
    delay: `${(i % 6) * 0.4}s`,
  }));
};

// Component dedicated to rendering dynamic background elements only on the client
const DynamicBackground = ({ starData, lineData, isMounted }: { starData: any[], lineData: any[], isMounted: boolean }) => {
  if (!isMounted) {
    return null;
  }

  // Client-side render outputs the dynamic elements
  return (
    <>
      {/* Floating Stars/Twinkles */}
      {starData.map((star, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-300/50 animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
          }}
        />
      ))}
      
      {/* Space Lines */}
      {lineData.map((line, i) => (
        <div
          key={i}
          className={`space-line ${line.type}`}
          style={{
            top: line.top,
            left: line.left,
            animationDelay: line.delay,
          }}
        />
      ))}
    </>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [starData, setStarData] = useState<any[]>([]);
  const [lineData, setLineData] = useState<any[]>([]);

  useEffect(() => {
    setStarData(generateStarStyles(20));
    setLineData(generateLineStyles(15));
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen text-white overflow-x-hidden bg-[#050a1f] transition-opacity duration-700 font-sans">
      
      {/* FIX: Wrapping CDN resources in a fragment with a key to prevent the 
               "removeChild" error caused by the browser moving the nodes out of the React DOM tree. */}
      <>
        {/* Tailwind CSS CDN: REQUIRED to load and apply Tailwind utility classes */}
        <script key="tailwind-cdn" src="https://cdn.tailwindcss.com"></script>
        
        {/* Inter Font Link (recommended) */}
        <link key="inter-font" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        
        {/* Set font-family globally */}
        <style key="global-style" dangerouslySetInnerHTML={{ __html: `
          body { font-family: 'Inter', sans-serif; }
        `}} />
      </>
      
      {/* ===================== Background Wrapper ===================== */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Static Background Gradient (Always rendered) */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-blue-900/10 to-blue-950/20"></div>
        
        {/* Dynamic background elements rendered via separate component */}
        <DynamicBackground starData={starData} lineData={lineData} isMounted={mounted} />

      </div>

      {/* ===================== Navbar ===================== */}
      <nav className="fixed top-0 left-0 w-full bg-blue-950/40 backdrop-blur-md z-40 p-6 md:p-8 flex justify-between items-center border-b border-blue-800/30 shadow-lg">
        <div className="text-3xl font-bold text-white drop-shadow-lg">Mer.</div>
        <ul className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-lg font-medium drop-shadow-sm"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content area */}
      <main className={`pt-[80px] ${mounted ? "opacity-100" : "opacity-0"}`}>{children}</main>

      {/* ===================== Global Animations ===================== */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }

        @keyframes lineStretch {
          0%, 100% { transform: scaleX(0.3) scaleY(0.3); opacity: 0.2; }
          50% { transform: scaleX(1) scaleY(1); opacity: 0.7; }
        }
        .space-line { position: absolute; height: 2px; width: 180px; background: rgba(100, 160, 255, 0.45); animation: lineStretch 6s ease-in-out infinite; border-radius: 9999px; backdrop-filter: blur(2px); }
        .space-line.vertical { width: 2px; height: 160px; }
        .space-line.diagonal { transform: rotate(45deg); width: 150px; }
      `}} />
    </div>
  );
}