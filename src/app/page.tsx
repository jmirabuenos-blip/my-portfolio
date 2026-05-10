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
  const s1 = useFadeIn(220);
  const s2 = useFadeIn(380);
  const s3 = useFadeIn(520);
  const s4 = useFadeIn(660);

  return (
    <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">

      {/* ── Hero: split layout ── */}
      <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-10 mb-16">

        {/* Left: text */}
        <div className="flex-1">
          {/* Availability */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border mb-6 transition-all duration-700
              ${dark ? "bg-green-500/8 border-green-500/20 text-green-400" : "bg-green-50 border-green-200 text-green-700"}
              ${s0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dark ? "bg-green-400" : "bg-green-500"}`} />
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dark ? "bg-green-400" : "bg-green-500"}`} />
            </span>
            Open to opportunities
          </div>

          {/* Name */}
          <h1
            className={`text-4xl sm:text-5xl font-semibold tracking-tight leading-tight mb-3 transition-all duration-700
              ${dark ? "text-white" : "text-gray-900"}
              ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            Jaymer Mirabuenos
          </h1>

          {/* Role */}
          <p
            className={`text-lg font-normal mb-5 transition-all duration-700
              ${dark ? "text-blue-400" : "text-blue-600"}
              ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            Frontend Developer · IT Student
          </p>

          {/* Bio */}
          <p
            className={`text-[15px] leading-relaxed max-w-md mb-8 transition-all duration-700
              ${dark ? "text-gray-400" : "text-gray-500"}
              ${s2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            2nd-year IT student from the Philippines crafting modern, responsive web
            experiences. Passionate about clean UI, thoughtful interactions, and
            continuously leveling up my craft.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-3 transition-all duration-700
              ${s3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            <a
              href="/projects"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              View projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              href="/contact"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors
                ${dark
                  ? "text-gray-300 border-white/10 hover:bg-white/5 hover:border-white/20"
                  : "text-gray-600 border-black/10 hover:bg-black/4 hover:border-black/20"
                }`}
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
          <div className="relative">
            <div
              className={`w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden border
                ${dark ? "border-white/10" : "border-black/8"}`}
            >
              <img
                src="https://i.imgur.com/Y9RkFD3.jpeg"
                alt="Jaymer Mirabuenos"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Decorative corner accent */}
            <div
              className={`absolute -bottom-2 -right-2 w-full h-full rounded-2xl border -z-10
                ${dark ? "border-blue-500/20" : "border-blue-300/40"}`}
            />
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className={`h-px w-full mb-10 ${dark ? "bg-white/6" : "bg-black/6"}`} />

      {/* ── Skills ── */}
      <div
        className={`transition-all duration-700
          ${s4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <div className="flex items-center justify-between mb-4">
          <p className={`text-xs font-medium uppercase tracking-widest ${dark ? "text-gray-500" : "text-gray-400"}`}>
            Tech Stack
          </p>
          <a
            href="/about"
            className={`text-xs transition-colors ${dark ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-600"}`}
          >
            View full profile →
          </a>
        </div>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <span
              key={s.label}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                ${s.highlight
                  ? dark
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    : "bg-blue-50 text-blue-600 border-blue-200/80"
                  : dark
                    ? "bg-white/4 text-gray-400 border-white/8 hover:border-white/15"
                    : "bg-black/3 text-gray-500 border-black/8 hover:border-black/15"
                }`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        className={`mt-16 pt-8 border-t transition-all duration-700
          ${dark ? "border-white/6" : "border-black/6"}
          ${s4 ? "opacity-100" : "opacity-0"}`}
      >
        <p className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>
          Based in the Philippines · Built with Next.js & Tailwind CSS
        </p>
      </div>

    </div>
  );
}