"use client";
import { useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light";

function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("dark");
  const sync = useCallback(() => {
    setTheme(document.documentElement.classList.contains("light") ? "light" : "dark");
  }, []);
  useEffect(() => {
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [sync]);
  return theme;
}

function useFadeIn(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return visible;
}

const PROJECTS = [
  { name: "NCF Enrollment Portal", desc: "A full-stack Django enrollment system for Nueva Caceres with role-based access for Admins, Staff, and Students. Features course management, department organization, and real-time enrollment tracking.", tags: ["Django", "PostgreSQL", "Python", "WhiteNoise"], url: "https://ncf-enrollment-portal.onrender.com/", year: "2026" },
  { name: "Minimalist E-Commerce Store", desc: "A full-stack e-commerce platform with product listings, cart management, Stripe payment integration, and order tracking. Built with Next.js, Prisma ORM, and Neon Postgres.", tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"], url: "https://ecommerce-portfolio-sooty.vercel.app/", year: "2026" },
  { name: "AIVA AI Studio", desc: "AI-powered creative platform with audio and video generation capabilities. Built with Next.js and deployed on Vercel.", tags: ["Next.js", "AI", "Vercel"], url: "https://aiva-weld.vercel.app/", year: "2024" },
  { name: "Management App", desc: "Full-stack app with user authentication, dashboard, and position management.", tags: ["React", "Auth", "Full-stack"], url: "https://my-app-w-position.vercel.app/", year: "2024" },
];

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export default function ProjectsPage() {
  const theme = useTheme();
  const dark = theme === "dark";
  const s0 = useFadeIn(80);
  const s1 = useFadeIn(200);
  const s2 = useFadeIn(350);
  const s3 = useFadeIn(500);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 pt-14 pb-24" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
      <p className={`text-[10px] font-medium uppercase mb-10 transition-all duration-700 ${s0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ letterSpacing: "0.22em", color: dark ? "#c9a96e" : "#b5956a" }}>Projects</p>

      <div className={`mb-12 transition-all duration-700 ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <h1 className="mb-3" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(32px, 5vw, 44px)", lineHeight: 1.1, color: dark ? "#f0ebe2" : "#1e1a16" }}>Things I&apos;ve built</h1>
        <p className="text-[15px] leading-relaxed max-w-md" style={{ fontWeight: 300, color: dark ? "rgba(232,226,216,0.5)" : "rgba(44,40,37,0.5)" }}>A small but growing collection of real projects I&apos;ve shipped. More on the way as I keep learning and building.</p>
      </div>

      <div className={`flex flex-col gap-3 transition-all duration-700 ${s2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        {PROJECTS.map((p) => (
          <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="glass-card group block" style={{ padding: "20px 24px", borderRadius: "16px" }}>
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: dark ? "#f0ebe2" : "#1e1a16" }}>{p.name}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-3 mt-0.5 flex-shrink-0" style={{ color: dark ? "#c9a96e" : "#b5956a" }}><ExternalIcon /></span>
            </div>
            <p className="text-[13px] leading-relaxed mb-4" style={{ fontWeight: 300, color: dark ? "rgba(232,226,216,0.4)" : "rgba(44,40,37,0.4)" }}>{p.desc}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="neu-icon px-2.5 py-0.5 rounded-full text-[11.5px]" style={{ color: dark ? "#c9a96e" : "#8a6e48", background: dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)" }}>{t}</span>
                ))}
              </div>
              <span className="text-[11px] flex-shrink-0 ml-3" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", color: dark ? "rgba(232,226,216,0.25)" : "rgba(44,40,37,0.25)" }}>{p.year}</span>
            </div>
          </a>
        ))}
      </div>

      <div className={`mt-12 flex items-center justify-between transition-all duration-700 ${s3 ? "opacity-100" : "opacity-0"}`}>
        <p className="text-[12px]" style={{ color: dark ? "rgba(232,226,216,0.3)" : "rgba(44,40,37,0.3)", letterSpacing: "0.03em" }}>More projects coming as I continue learning</p>
        <a href="https://github.com/jmirabuenos-blip" target="_blank" rel="noopener noreferrer" className="text-[12px] transition-colors flex items-center gap-1.5" style={{ color: dark ? "#c9a96e" : "#b5956a", letterSpacing: "0.03em" }}>GitHub →</a>
      </div>
    </div>
  );
}
