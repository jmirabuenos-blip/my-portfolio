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

const BlobBackground = memo(({ isMounted, dark }: { isMounted: boolean; dark: boolean }) => {
  if (!isMounted) return null;
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute animate-blob"
        style={{
          top: "-8%", left: "-5%",
          width: "clamp(300px, 45vw, 600px)", height: "clamp(300px, 45vw, 600px)",
          borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle, rgba(90,70,140,0.18) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(160,140,210,0.22) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute animate-blob-alt"
        style={{
          bottom: "-5%", right: "-8%",
          width: "clamp(280px, 40vw, 550px)", height: "clamp(280px, 40vw, 550px)",
          borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle, rgba(181,149,106,0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(181,149,106,0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute animate-blob"
        style={{
          top: "30%", left: "50%", transform: "translateX(-50%)",
          width: "clamp(200px, 30vw, 400px)", height: "clamp(200px, 30vw, 400px)",
          borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle, rgba(60,80,160,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(140,130,200,0.1) 0%, transparent 70%)",
          filter: "blur(60px)", animationDelay: "5s",
        }}
      />
    </div>
  );
});
BlobBackground.displayName = "BlobBackground";

const DynamicDots = memo(({ isMounted }: { isMounted: boolean }) => {
  if (!isMounted) return null;
  const dots = Array.from({ length: 120 }, (_, i) => ({
    top: `${(i * 5.3) % 100}%`,
    left: `${(i * 7.1) % 100}%`,
    delay: `${(i % 8) * 0.4}s`,
    size: i % 3 === 0 ? "1.5px" : "1px",
    opacity: i % 4 === 0 ? "0.15" : "0.06",
  }));
  return (
    <>
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse-dot"
          style={{
            top: d.top, left: d.left, width: d.size, height: d.size,
            opacity: d.opacity, animationDelay: d.delay, background: "#b5956a",
          }}
        />
      ))}
    </>
  );
});
DynamicDots.displayName = "DynamicDots";

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

const SunIconSm = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
  </svg>
);

const MoonIconSm = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>
  </svg>
);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial = stored ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
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

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));
  const dark = theme === "dark";

  const pageBg = dark
    ? "linear-gradient(160deg, #080a14 0%, #0e0f1e 30%, #12101e 60%, #0a0d18 100%)"
    : "linear-gradient(160deg, #e8e4f2 0%, #dce2f0 30%, #e4e0ee 60%, #dfe5f2 100%)";

  const navLinkClass = (href: string) => {
    const isActive = pathname === href;
    return `relative px-3.5 py-1.5 rounded-full text-[13px] font-normal transition-all duration-200 nav-link-pill ${isActive ? "active" : ""} ${
      dark
        ? isActive ? "text-[#f0ebe2]" : "text-[#7a7068] hover:text-[#d0c8b8]"
        : isActive ? "text-[#2c2825]" : "text-[#8a8078] hover:text-[#3a3530]"
    }`;
  };

  const mobileNavLinkClass = (href: string) => {
    const isActive = pathname === href;
    return `px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
      isActive
        ? dark ? "text-[#f0ebe2] bg-[rgba(255,255,255,0.08)]" : "text-[#2c2825] bg-[rgba(255,255,255,0.5)]"
        : dark ? "text-[#7a7068] hover:text-[#c9a96e] hover:bg-[rgba(255,255,255,0.04)]" : "text-[#8a8078] hover:text-[#2c2825] hover:bg-[rgba(255,255,255,0.4)]"
    }`;
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden" style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: pageBg, color: dark ? "#e8e2d8" : "#2c2825" }}>
      <BlobBackground isMounted={mounted} dark={dark} />
      {dark && <DynamicDots isMounted={mounted} />}

      {/* Floating Pill Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-4 md:pt-5">
        <div className={`glass-nav w-full max-w-4xl flex items-center justify-between transition-all duration-300 ${scrolled ? "scrolled py-2.5 px-4" : "py-3 px-5 md:px-6"}`} style={{ borderRadius: scrolled ? "16px" : "999px" }}>
          <a href="/" className="relative z-10 flex-shrink-0" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400 }}>
            <span style={{ color: dark ? "#c9a96e" : "#8a6e48" }}>Mer</span>
            <span style={{ color: dark ? "rgba(232,226,216,0.3)" : "rgba(44,40,37,0.25)" }}>.dev</span>
          </a>

          <ul className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <li key={item.name}><a href={item.href} className={navLinkClass(item.href)}><span className="relative z-10">{item.name}</span></a></li>
            ))}
            <li className="ml-3">
              <button onClick={toggleTheme} aria-label="Toggle theme" className="neu-icon w-8 h-8 flex items-center justify-center rounded-full" style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)", color: dark ? "#8a8078" : "#6a6058" }}>
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
            </li>
            <li className="ml-1">
              <a href="/contact" className="neu-btn px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200" style={{ background: dark ? "rgba(181,149,106,0.12)" : "rgba(181,149,106,0.1)", color: dark ? "#c9a96e" : "#7a5e38" }}>
                Hire me
              </a>
            </li>
          </ul>

          <div className="md:hidden flex items-center gap-2 relative z-10">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="neu-icon w-8 h-8 flex items-center justify-center rounded-full" style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)", color: dark ? "#8a8078" : "#6a6058" }}>
              {dark ? <SunIconSm /> : <MoonIconSm />}
            </button>
            <button onClick={() => setMenuOpen((p) => !p)} aria-label="Toggle menu" className="neu-icon w-8 h-8 flex items-center justify-center rounded-full" style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)", color: dark ? "#8a8078" : "#6a6058" }}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="glass md:hidden absolute top-[calc(100%+8px)] left-4 right-4 py-3 px-4 flex flex-col gap-1" style={{ borderRadius: "20px", background: dark ? "rgba(14,15,30,0.85)" : "rgba(255,255,255,0.7)" }}>
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className={mobileNavLinkClass(item.href)}>{item.name}</a>
            ))}
            <a href="/contact" className="mt-2 px-4 py-2.5 rounded-xl text-sm font-medium text-center transition-all duration-200" style={{ background: dark ? "rgba(181,149,106,0.12)" : "rgba(181,149,106,0.1)", color: dark ? "#c9a96e" : "#7a5e38", border: `1px solid ${dark ? "rgba(181,149,106,0.2)" : "rgba(181,149,106,0.25)"}` }}>
              Hire me
            </a>
          </div>
        )}
      </nav>

      <main className={`pt-[72px] relative z-10 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
        {children}
      </main>

      <footer className="glass-footer relative z-10 mt-16" style={{ padding: "24px 0" }}>
        <div className="max-w-4xl mx-auto px-8 flex items-center justify-between">
          <p className="text-[12px]" style={{ letterSpacing: "0.03em", color: dark ? "rgba(232,226,216,0.3)" : "rgba(44,40,37,0.35)" }}>
            Based in the Philippines &nbsp;·&nbsp; Built with Next.js &amp; Tailwind CSS
          </p>
          <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "18px", letterSpacing: "0.05em", color: dark ? "rgba(201,169,110,0.3)" : "rgba(138,110,72,0.3)" }}>
            jm.
          </span>
        </div>
      </footer>
    </div>
  );
}
