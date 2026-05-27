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
  const s5 = useFadeIn(900);

  return (
    <div
      className="max-w-4xl mx-auto px-8 pt-14 pb-20"
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <style>{`
        @keyframes ping-warm {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .ping-warm { animation: ping-warm 1.6s ease infinite; }
      `}</style>

      {/* ── Hero ── */}
      <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-10 mb-10">

        {/* Left: text */}
        <div className="flex-1">

          {/* Availability badge */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-normal border mb-6 transition-all duration-700
              ${dark
                ? "bg-[#2a2318] border-[#4a3a25] text-[#c9a96e]"
                : "bg-[#f5efe6] border-[#e2d4be] text-[#8a6e48]"}
              ${s0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{ letterSpacing: "0.02em" }}
          >
            <span className="relative flex h-2 w-2">
              <span className={`ping-warm absolute inline-flex h-full w-full rounded-full ${dark ? "bg-[#c9a96e]" : "bg-[#b5956a]"}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${dark ? "bg-[#c9a96e]" : "bg-[#b5956a]"}`} />
            </span>
            Open to opportunities
          </div>

          {/* Name */}
          <h1
            className={`mb-2 transition-all duration-700
              ${dark ? "text-[#f0ebe2]" : "text-[#1e1a16]"}
              ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(44px, 6vw, 58px)",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
            }}
          >
            Jaymer<br />Mirabuenos
          </h1>

          {/* Role */}
          <p
            className={`text-xs mb-5 transition-all duration-700
              ${dark ? "text-[#c9a96e]" : "text-[#b5956a]"}
              ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{ letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 400 }}
          >
            Junior Full Stack Developer &nbsp;·&nbsp; IT Student
          </p>

          {/* Bio */}
          <p
            className={`text-[15px] leading-relaxed max-w-sm mb-8 transition-all duration-700
              ${dark ? "text-[#9e9187]" : "text-[#6b5f52]"}
              ${s2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{ fontWeight: 300 }}
          >
            2nd-year IT student from the Philippines crafting modern, responsive
            web experiences. Passionate about clean UI, thoughtful interactions,
            and continuously leveling up my craft.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-3 transition-all duration-700
              ${s3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            <a
              href="/projects"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-medium transition-all duration-200 hover:-translate-y-px
                ${dark
                  ? "bg-[#f0ebe2] text-[#1e1a16] hover:bg-white"
                  : "bg-[#2c2825] text-[#faf8f5] hover:bg-[#1a1714]"}`}
              style={{ letterSpacing: "0.02em" }}
            >
              View projects
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="/contact"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-normal border transition-all duration-200 hover:-translate-y-px
                ${dark
                  ? "text-[#9e9187] border-[#3a3028] hover:border-[#5a4a38] hover:text-[#c9a96e]"
                  : "text-[#6b5f52] border-[#e0d4c0] hover:border-[#c9b99e] hover:text-[#2c2825]"}`}
              style={{ letterSpacing: "0.02em" }}
            >
              Let's talk
            </a>
          </div>
        </div>

        {/* Right: photo */}
        <div
          className={`flex-shrink-0 transition-all duration-700
            ${s1 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {/* Outer wrapper creates space for the offset border */}
          <div className="relative w-48 h-56 md:w-56 md:h-64 mr-3 mb-3">
            {/* Corner accent */}
            <div
              className={`absolute -top-3 -left-3 w-7 h-7 border-t border-l
                ${dark ? "border-[#c9a96e]/50" : "border-[#b5956a]/60"}`}
              style={{ borderRadius: "2px 0 0 0" }}
            />
            {/* Photo */}
            <img
              src="https://i.imgur.com/Y9RkFD3.jpeg"
              alt="Jaymer Mirabuenos"
              className="w-full h-full object-cover object-top rounded-xl relative z-10"
              style={{ filter: "sepia(6%) saturate(90%)" }}
            />
            {/* Offset border — pushed out with absolute positioning */}
            <div
              className={`absolute top-3 left-3 w-full h-full rounded-xl border
                ${dark ? "border-[#4a3a25]" : "border-[#d4c4aa]"}`}
              style={{ zIndex: 0 }}
            />
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        className={`h-px w-full mb-8 transition-all duration-700
          ${s4 ? "opacity-100" : "opacity-0"}`}
        style={{
          background: dark
            ? "linear-gradient(to right, transparent, #3a3028 30%, #3a3028 70%, transparent)"
            : "linear-gradient(to right, transparent, #e0d4c0 30%, #e0d4c0 70%, transparent)",
        }}
      />

      {/* ── Skills ── */}
      <div
        className={`mb-14 transition-all duration-700
          ${s4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <div className="flex items-center justify-between mb-4">
          <p
            className={`text-[10px] font-medium ${dark ? "text-[#c9a96e]" : "text-[#b5956a]"}`}
            style={{ letterSpacing: "0.22em", textTransform: "uppercase" }}
          >
            Tech Stack
          </p>
          <a
            href="/about"
            className={`text-[12px] transition-colors ${dark ? "text-[#5a5048] hover:text-[#9e9187]" : "text-[#c4b9aa] hover:text-[#6b5f52]"}`}
            style={{ letterSpacing: "0.04em" }}
          >
            View full profile →
          </a>
        </div>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <span
              key={s.label}
              className={`px-4 py-1.5 rounded-full text-[12.5px] border transition-all duration-200 cursor-default
                ${s.highlight
                  ? dark
                    ? "bg-[#2a2318] border-[#4a3a25] text-[#c9a96e] hover:bg-[#332b1e] hover:border-[#6a5035]"
                    : "bg-[#f5efe6] border-[#ddd0ba] text-[#7a6045] hover:bg-[#ede4d7] hover:border-[#c9b99e]"
                  : dark
                    ? "bg-transparent border-[#2e2822] text-[#6a6058] hover:border-[#4a3a28] hover:text-[#9e9187]"
                    : "bg-transparent border-[#e5ddd4] text-[#9a8f83] hover:bg-[#f5f0ea] hover:border-[#d4c9bc] hover:text-[#6b5f52]"
                }`}
              style={{ fontWeight: 400 }}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        className={`pt-6 border-t flex items-center justify-between transition-all duration-700
          ${dark ? "border-[#2a2520]" : "border-[#ece5da]"}
          ${s5 ? "opacity-100" : "opacity-0"}`}
      >
        <p
          className={`text-[12px] ${dark ? "text-[#4a4038]" : "text-[#c4b9aa]"}`}
          style={{ letterSpacing: "0.03em" }}
        >
          Based in the Philippines &nbsp;·&nbsp; Built with Next.js & Tailwind CSS
        </p>
        <span
          className={`${dark ? "text-[#4a4038]" : "text-[#d4c8b8]"}`}
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "18px",
            letterSpacing: "0.05em",
          }}
        >
          jm.
        </span>
      </div>
    </div>
  );
}