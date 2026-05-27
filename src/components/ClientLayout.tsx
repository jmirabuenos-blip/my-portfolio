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
    opacity: i % 4 === 0 ? "0.18" : "0.08",
  }));

  return (
    <div className="absolute inset-0">
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse-dot"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            animationDelay: d.delay,
            background: "#b5956a",
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

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial =
      stored ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(initial);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(initial);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          ? "text-[#f0ebe2] bg-[#2a2318]"
          : "text-[#2c2825] bg-[#ede4d7]"
        : dark
          ? "text-[#6a6058] hover:text-[#c9a96e] hover:bg-[#1e1a14]"
          : "text-[#9a8f83] hover:text-[#2c2825] hover:bg-[#f0ebe3]"
      }`;
  };

  const mobileNavLinkClass = (href: string) => {
    const isActive = pathname === href;
    return `px-3 py-2 rounded-md text-sm transition-colors
      ${isActive
        ? dark
          ? "text-[#f0ebe2] bg-[#2a2318]"
          : "text-[#2c2825] bg-[#ede4d7]"
        : dark
          ? "text-[#6a6058] hover:text-[#c9a96e] hover:bg-[#1e1a14]"
          : "text-[#9a8f83] hover:text-[#2c2825] hover:bg-[#f0ebe3]"
      }`;
  };

  return (
    <div
      className={`relative w-full min-h-screen overflow-x-hidden`}
      style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        background: dark ? "#0f0d0a" : "#faf8f5",
        color: dark ? "#f0ebe2" : "#2c2825",
      }}
    >
      {/* ── Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {dark && <DynamicBackground isMounted={mounted} />}
        {/* Warm radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: dark
              ? "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(181,149,106,0.06) 0%, transparent 70%)"
              : "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(181,149,106,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${scrolled
            ? dark
              ? "py-3 backdrop-blur-xl border-b"
              : "py-3 backdrop-blur-xl border-b shadow-sm"
            : "py-5"
          }`}
        style={scrolled ? {
          background: dark ? "rgba(15,13,10,0.92)" : "rgba(250,248,245,0.92)",
          borderColor: dark ? "rgba(181,149,106,0.1)" : "rgba(181,149,106,0.15)",
        } : {}}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="text-lg font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400 }}
          >
            <span style={{ color: dark ? "#c9a96e" : "#b5956a" }}>Mer</span>
            <span style={{ color: dark ? "rgba(240,235,226,0.35)" : "rgba(44,40,37,0.3)" }}>.dev</span>
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

            <li
              className="ml-3 pl-3 border-l"
              style={{ borderColor: dark ? "rgba(181,149,106,0.15)" : "rgba(181,149,106,0.2)" }}
            >
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
                style={{ color: dark ? "#6a6058" : "#9a8f83" }}
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
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 border"
                style={{
                  background: dark ? "rgba(181,149,106,0.08)" : "rgba(181,149,106,0.1)",
                  color: dark ? "#c9a96e" : "#8a6e48",
                  borderColor: dark ? "rgba(181,149,106,0.2)" : "rgba(181,149,106,0.3)",
                }}
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
              className="w-8 h-8 flex items-center justify-center rounded-md"
              style={{ color: dark ? "#6a6058" : "#9a8f83" }}
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
              className="w-8 h-8 flex items-center justify-center rounded-md"
              style={{ color: dark ? "#6a6058" : "#9a8f83" }}
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
            className="md:hidden border-t mt-3 px-6 py-4 flex flex-col gap-1"
            style={{
              borderColor: dark ? "rgba(181,149,106,0.1)" : "rgba(181,149,106,0.15)",
              background: dark ? "rgba(15,13,10,0.97)" : "rgba(250,248,245,0.97)",
            }}
          >
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className={mobileNavLinkClass(item.href)}>
                {item.name}
              </a>
            ))}
            <a
              href="/contact"
              className="mt-2 px-3 py-2 rounded-md text-sm font-medium text-center border"
              style={{
                background: dark ? "rgba(181,149,106,0.08)" : "rgba(181,149,106,0.1)",
                color: dark ? "#c9a96e" : "#8a6e48",
                borderColor: dark ? "rgba(181,149,106,0.2)" : "rgba(181,149,106,0.25)",
              }}
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