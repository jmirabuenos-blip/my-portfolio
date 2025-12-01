"use client";
import { useEffect, useState, memo } from "react";
import { Sun, Moon } from "lucide-react"; // Importing icons for the theme toggle

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
// *** FIX: Memoize this component to prevent unnecessary re-renders when the parent (RootLayout) updates for theme changes. ***
const DynamicBackground = memo(({ starData, lineData, isMounted }: { starData: any[], lineData: any[], isMounted: boolean }) => {
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
          // *** FIX: Reduced base opacity to 30% for a subtler effect ***
          className="absolute w-1 h-1 rounded-full bg-blue-300/30 animate-twinkle"
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
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [starData, setStarData] = useState<any[]>([]);
  const [lineData, setLineData] = useState<any[]>([]);
  // Theme state: default to 'dark' or load from storage
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // --- Theme Application Effect ---
  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem('theme') as 'dark' | 'light';

    // 1. Initialize theme from localStorage or system preference
    const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    // Set theme state (only runs on mount if state is different from default)
    setTheme(initialTheme); 

    // Apply class immediately for initial render consistency
    root.classList.remove('light', 'dark');
    root.classList.add(initialTheme);
    localStorage.setItem('theme', initialTheme);

  }, []); // Run only once on mount

  // --- Theme Update Effect (runs when state changes) ---
  useEffect(() => {
    if (!mounted) return; // Prevent running on first mount since the initialization effect handles it

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);


  // --- Initial Data Mount Effect ---
  useEffect(() => {
    setStarData(generateStarStyles(20));
    setLineData(generateLineStyles(15));
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`relative w-full min-h-screen overflow-x-hidden transition-opacity duration-700 font-sans 
        ${theme === 'dark' ? 'bg-[#050a1f] text-white' : 'bg-gray-100 text-gray-900'}`
    }>
      
      {/* FIX: Wrapping CDN resources in a fragment with a key to prevent hydration issues */}
      <>
        {/* Tailwind CSS CDN: REQUIRED to load and apply Tailwind utility classes */}
        {/* We configure `darkMode: 'class'` here */}
        <script key="tailwind-cdn" dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        'primary-dark': '#050a1f',
                        'primary-light': '#f3f4f6',
                    }
                }
            }
          }
        `}}></script>
        <script key="tailwind-script" src="https://cdn.tailwindcss.com"></script>

        {/* Inter Font Link (recommended) */}
        <link key="inter-font" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        
        {/* Set font-family globally */}
        <style key="global-style" dangerouslySetInnerHTML={{ __html: `
          body { font-family: 'Inter', sans-serif; }
          /* Global Dark Mode Styles applied via class on <html> tag */
          .dark .bg-primary { background-color: #050a1f; }
          .light .bg-primary { background-color: #f3f4f6; }
        `}} />
      </>
      
      {/* ===================== Background Wrapper ===================== */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Static Background Gradient (Adjusted for theme) */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
            theme === 'dark' 
              ? 'bg-gradient-to-b from-blue-950/20 via-blue-900/10 to-blue-950/20' 
              : 'bg-gradient-to-b from-gray-200 via-white to-gray-200 opacity-70'
        }`}></div>
        
        {/* Dynamic background elements rendered via separate component (Only visible in Dark Mode) */}
        {theme === 'dark' && <DynamicBackground starData={starData} lineData={lineData} isMounted={mounted} />}

      </div>

      {/* ===================== Navbar ===================== */}
      <nav className={`fixed top-0 left-0 w-full z-40 p-6 md:p-8 flex justify-between items-center transition-colors duration-500 
          ${theme === 'dark' 
              ? 'bg-blue-950/40 backdrop-blur-md border-b border-blue-800/30 shadow-lg' 
              : 'bg-white/70 backdrop-blur-md border-b border-gray-300/50 shadow-md'
          }`}
      >
        <div className={`text-3xl font-bold drop-shadow-lg ${theme === 'dark' ? 'text-white' : 'text-blue-700'}`}>Mer.</div>
        
        <ul className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`transition-colors duration-300 text-lg font-medium drop-shadow-sm 
                    ${theme === 'dark' 
                        ? 'text-gray-300 hover:text-blue-400' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
              >
                {item.name}
              </a>
            </li>
          ))}
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-300 ml-4 ${
              theme === 'dark' 
                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                : 'bg-blue-200 text-blue-700 hover:bg-blue-300'
            }`}
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

        </ul>
      </nav>

      {/* Main content area */}
      <main className={`pt-[80px] z-10 relative transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>{children}</main>

      {/* ===================== Global Animations ===================== */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes twinkle {
          /* *** FIX: Reduced max opacity and scale for a softer pulse *** */
          0%, 100% { opacity: 0.1; transform: scale(0.7); }
          50% { opacity: 0.5; transform: scale(1.0); } 
        }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }

        @keyframes lineStretch {
          /* *** FIX: Softened the scale change for a gentler flow *** */
          0%, 100% { transform: scaleX(0.4) scaleY(0.4); opacity: 0.15; }
          50% { transform: scaleX(0.8) scaleY(0.8); opacity: 0.4; }
        } 
        .space-line { position: absolute; height: 2px; width: 180px; background: rgba(100, 160, 255, 0.45); animation: lineStretch 6s ease-in-out infinite; border-radius: 9999px; backdrop-filter: blur(2px); }
        .space-line.vertical { width: 2px; height: 160px; }
        .space-line.diagonal { transform: rotate(45deg); width: 150px; }
      `}} />
    </div>
  );
}