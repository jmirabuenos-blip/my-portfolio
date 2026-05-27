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
  {
    name: "NCF Enrollment Portal",
    desc: "A full-stack Django enrollment system for Nueva Caceres with role-based access for Admins, Staff, and Students. Features course management, department organization, and real-time enrollment tracking.",
    tags: ["Django", "PostgreSQL", "Python", "WhiteNoise"],
    url: "https://ncf-enrollment-portal.onrender.com/",
    year: "2026",
  },
  {
    name: "Minimalist E-Commerce Store",
    desc: "A full-stack e-commerce platform with product listings, cart management, Stripe payment integration, and order tracking. Built with Next.js, Prisma ORM, and Neon Postgres.",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    url: "https://ecommerce-portfolio-sooty.vercel.app/",
    year: "2026",
  },
  {
    name: "AIVA AI Studio",
    desc: "AI-powered creative platform with audio and video generation capabilities. Built with Next.js and deployed on Vercel.",
    tags: ["Next.js", "AI", "Vercel"],
    url: "https://aiva-weld.vercel.app/",
    year: "2024",
  },
  {
    name: "Management App",
    desc: "Full-stack app with user authentication, dashboard, and position management.",
    tags: ["React", "Auth", "Full-stack"],
    url: "https://my-app-w-position.vercel.app/",
    year: "2024",
  },
];

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
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
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">

      {/* ── Page label ── */}
      <p
        className={`text-xs font-medium uppercase tracking-widest mb-8 transition-all duration-700
          ${dark ? "text-gray-500" : "text-gray-400"}
          ${s0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        Projects
      </p>

      {/* ── Heading ── */}
      <div
        className={`mb-12 transition-all duration-700
          ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <h1 className={`text-3xl font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
          Things I've built
        </h1>
        <p className={`text-sm leading-relaxed max-w-md ${dark ? "text-gray-400" : "text-gray-500"}`}>
          A small but growing collection of real projects I've shipped.
          More on the way as I keep learning and building.
        </p>
      </div>

      {/* ── Divider ── */}
      <div className={`h-px w-full mb-12 ${dark ? "bg-white/6" : "bg-black/6"}`} />

      {/* ── Projects ── */}
      <div
        className={`flex flex-col gap-4 mb-12 transition-all duration-700
          ${s2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        {PROJECTS.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block p-5 rounded-xl border transition-all duration-200
              ${dark
                ? "bg-white/2 border-white/8 hover:bg-white/5 hover:border-white/15"
                : "bg-white border-black/8 hover:border-black/15 hover:shadow-sm"
              }`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className={`text-sm font-medium ${dark ? "text-white" : "text-gray-900"}`}>
                {p.name}
              </span>
              <span className={`opacity-0 group-hover:opacity-100 transition-opacity ml-2 mt-0.5
                ${dark ? "text-gray-400" : "text-gray-400"}`}>
                <ExternalIcon />
              </span>
            </div>
            <p className={`text-xs leading-relaxed mb-4 ${dark ? "text-gray-500" : "text-gray-500"}`}>
              {p.desc}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className={`px-2 py-0.5 rounded text-xs
                      ${dark ? "bg-white/5 text-gray-400" : "bg-black/4 text-gray-500"}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>
                {p.year}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* ── Divider ── */}
      <div className={`h-px w-full mb-12 ${dark ? "bg-white/6" : "bg-black/6"}`} />

      {/* ── Footer note ── */}
      <div className={`transition-all duration-700 ${s3 ? "opacity-100" : "opacity-0"}`}>
        <p className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>
          More projects coming as I continue learning · GitHub: jmirabuenos-blip
        </p>
      </div>

    </div>
  );
}