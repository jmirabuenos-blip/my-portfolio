"use client";
import { useEffect, useState, memo } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Education", href: "/education" },
  { name: "Hobbies", href: "/hobbies" },
  { name: "Contact", href: "/contact" },
];

const DynamicBackground = memo(({ isMounted }: { isMounted: boolean }) => {
  if (!isMounted) return null;

  const dots = Array.from({ length: 180 }, (_, i) => ({
    top: `${(i * 5.3) % 100}%`,
    left: `${(i * 7.1) % 100}%`,
    delay: `${(i % 8) * 0.4}s`,
    size: i % 3 === 0 ? "1.5px" : "1px",
    opacity: i % 4 === 0 ? "0.25" : "0.12",
  }));

  return (
    <div className="absolute inset-0">
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-400 animate-pulse-dot"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  );
});

DynamicBackground.displayName = "DynamicBackground";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial =
      stored ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(initial);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(initial);
  }, []);

  // Apply theme changes after mount
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Mount + scroll listener
  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));
  const dark = theme === "dark";

  const navLinkClass = (href: string) => {
    const isActive = pathname === href;
    return `px-3 py-1.5 rounded-md text-sm transition-colors duration-200
      ${isActive
        ? dark
          ? "text-white bg-white/8"
          : "text-gray-900 bg-black/6"
        : dark
          ? "text-gray-400 hover:text-white hover:bg-white/5"
          : "text-gray-500 hover:text-gray-900 hover:bg-black/5"
      }`;
  };

  const mobileNavLinkClass = (href: string) => {
    const isActive = pathname === href;
    return `px-3 py-2 rounded-md text-sm transition-colors
      ${isActive
        ? dark
          ? "text-white bg-white/8"
          : "text-gray-900 bg-black/6"
        : dark
          ? "text-gray-400 hover:text-white hover:bg-white/5"
          : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
      }`;
  };

  return (
    <div
      className={`relative w-full min-h-screen overflow-x-hidden font-sans
        ${dark ? "bg-[#060912] text-white" : "bg-[#f8f9fc] text-gray-900"}`}
    >
      {/* ── Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {dark && <DynamicBackground isMounted={mounted} />}
        <div
          className="absolute inset-0"
          style={{
            background: dark
              ? "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.08) 0%, transparent 70%)"
              : "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${scrolled
            ? dark
              ? "py-3 bg-[#060912]/90 backdrop-blur-xl border-b border-white/5"
              : "py-3 bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-sm"
            : "py-5"
          }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className={`text-lg font-semibold tracking-tight ${dark ? "text-white" : "text-gray-900"}`}
          >
            <span className={dark ? "text-blue-400" : "text-blue-600"}>Mer</span>
            <span className={dark ? "text-white/40" : "text-gray-400"}>.dev</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} className={navLinkClass(item.href)}>
                  {item.name}
                </a>
              </li>
            ))}

            <li className={`ml-3 pl-3 border-l ${dark ? "border-white/10" : "border-black/10"}`}>
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors
                  ${dark
                    ? "text-gray-400 hover:text-white hover:bg-white/5"
                    : "text-gray-500 hover:text-gray-900 hover:bg-black/5"
                  }`}
              >
                {dark ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"/>
                    <line x1="12" y1="2" x2="12" y2="6"/>
                    <line x1="12" y1="18" x2="12" y2="22"/>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                    <line x1="2" y1="12" x2="6" y2="12"/>
                    <line x1="18" y1="12" x2="22" y2="12"/>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                  </svg>
                )}
              </button>
            </li>

            <li className="ml-1">
              <a
                href="/contact"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                  ${dark
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20"
                    : "bg-blue-50 text-blue-600 border border-blue-200/80 hover:bg-blue-100"
                  }`}
              >
                Hire me
              </a>
            </li>
          </ul>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`w-8 h-8 flex items-center justify-center rounded-md
                ${dark ? "text-gray-400" : "text-gray-500"}`}
            >
              {dark ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="12" y1="2" x2="12" y2="6"/>
                  <line x1="12" y1="18" x2="12" y2="22"/>
                  <line x1="2" y1="12" x2="6" y2="12"/>
                  <line x1="18" y1="12" x2="22" y2="12"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              )}
            </button>
            <button
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
              className={`w-8 h-8 flex items-center justify-center rounded-md
                ${dark ? "text-gray-400" : "text-gray-500"}`}
            >
              {menuOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="7" x2="20" y2="7"/>
                  <line x1="4" y1="12" x2="20" y2="12"/>
                  <line x1="4" y1="17" x2="20" y2="17"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            className={`md:hidden border-t mt-3 px-6 py-4 flex flex-col gap-1
              ${dark ? "border-white/5 bg-[#060912]/95" : "border-black/5 bg-white/95"}`}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={mobileNavLinkClass(item.href)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="/contact"
              className={`mt-2 px-3 py-2 rounded-md text-sm font-medium text-center
                ${dark
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "bg-blue-50 text-blue-600 border border-blue-200"
                }`}
            >
              Hire me
            </a>
          </div>
        )}
      </nav>

      {/* ── Main content ── */}
      <main
        className={`pt-[72px] relative z-10 transition-opacity duration-500
          ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        {children}
      </main>
    </div>
  );
}