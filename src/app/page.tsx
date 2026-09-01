"use client";
import { useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light";

const SKILLS = [
  { label: "React", highlight: true },
  { label: "Next.js", highlight: true },
  { label: "TypeScript", highlight: true },
  { label: "Tailwind CSS", highlight: false },
  { label: "Git / GitHub", highlight: false },
  { label: "Vercel", highlight: false },
  { label: "UI / UX basics", highlight: false },
];

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

export default function Page() {
  const theme = useTheme();
  const dark = theme === "dark";
  const s0 = useFadeIn(80);
  const s1 = useFadeIn(250);
  const s2 = useFadeIn(420);
  const s3 = useFadeIn(560);
  const s4 = useFadeIn(700);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 pt-14 pb-20" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
      <style>{`@keyframes ping-warm { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.2);opacity:0} } .ping-warm{animation:ping-warm 1.6s ease infinite}`}</style>

      <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-10 mb-10">
        <div className="flex-1">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-normal glass-card mb-6 transition-all duration-700 ${dark ? "text-[#c9a96e]" : "text-[#8a6e48]"} ${s0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ letterSpacing: "0.02em", cursor: "default", borderRadius: "999px" }}>
            <span className="relative flex h-2 w-2">
              <span className={`ping-warm absolute inline-flex h-full w-full rounded-full ${dark ? "bg-[#c9a96e]" : "bg-[#b5956a]"}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${dark ? "bg-[#c9a96e]" : "bg-[#b5956a]"}`} />
            </span>
            Open to opportunities
          </div>

          <h1 className={`mb-2 transition-all duration-700 ${dark ? "text-[#f0ebe2]" : "text-[#1e1a16]"} ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(44px, 6vw, 58px)", lineHeight: 1.08, letterSpacing: "-0.01em" }}>
            Jaymer<br />Mirabuenos
          </h1>

          <p className={`text-xs mb-5 transition-all duration-700 ${dark ? "text-[#c9a96e]" : "text-[#b5956a]"} ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 400 }}>
            Junior Full Stack Developer &nbsp;·&nbsp; IT Student
          </p>

          <p className={`text-[15px] leading-relaxed max-w-sm mb-8 transition-all duration-700 ${dark ? "text-[rgba(232,226,216,0.55)]" : "text-[rgba(44,40,37,0.55)]"} ${s2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ fontWeight: 300 }}>
            2nd-year IT student from the Philippines crafting modern, responsive
            web experiences. Passionate about clean UI, thoughtful interactions,
            and continuously leveling up my craft.
          </p>

          <div className={`flex flex-wrap gap-3 transition-all duration-700 ${s3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            <a href="/projects" className="neu-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200" style={{ background: dark ? "rgba(240,235,226,0.9)" : "rgba(44,40,37,0.9)", color: dark ? "#1e1a16" : "#faf8f5", letterSpacing: "0.02em" }}>
              View projects
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="/contact" className="neu-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-normal transition-all duration-200" style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.5)", color: dark ? "rgba(232,226,216,0.6)" : "rgba(44,40,37,0.6)", letterSpacing: "0.02em" }}>
              Let&apos;s talk
            </a>
          </div>
        </div>

        <div className={`flex-shrink-0 transition-all duration-700 ${s1 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="relative w-48 h-56 md:w-56 md:h-64">
            <div className="glass-card w-full h-full overflow-hidden" style={{ borderRadius: "20px" }}>
              <img src="https://i.imgur.com/Y9RkFD3.jpeg" alt="Jaymer Mirabuenos" className="w-full h-full object-cover object-top" style={{ filter: "sepia(4%) saturate(92%)" }} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full" style={{ background: dark ? "radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)" : "radial-gradient(circle, rgba(181,149,106,0.12) 0%, transparent 70%)", filter: "blur(12px)", zIndex: -1 }} />
          </div>
        </div>
      </div>

      <div className={`mb-8 transition-all duration-700 ${s4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <div className="flex items-center justify-between mb-4">
          <p className={`text-[10px] font-medium ${dark ? "text-[#c9a96e]" : "text-[#b5956a]"}`} style={{ letterSpacing: "0.22em", textTransform: "uppercase" }}>Tech Stack</p>
          <a href="/about" className={`text-[12px] transition-colors ${dark ? "text-[rgba(232,226,216,0.3)] hover:text-[rgba(232,226,216,0.55)]" : "text-[rgba(44,40,37,0.3)] hover:text-[rgba(44,40,37,0.55)]"}`} style={{ letterSpacing: "0.04em" }}>View full profile →</a>
        </div>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <span key={s.label} className={`px-4 py-1.5 rounded-full text-[12.5px] transition-all duration-200 cursor-default ${s.highlight ? (dark ? "glass-card text-[#c9a96e]" : "glass-card text-[#8a6e48]") : (dark ? "neu-icon text-[rgba(232,226,216,0.35)] hover:text-[rgba(232,226,216,0.55)]" : "neu-icon text-[rgba(44,40,37,0.35)] hover:text-[rgba(44,40,37,0.55)]")}`} style={{ fontWeight: 400, borderRadius: "999px" }}>
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
