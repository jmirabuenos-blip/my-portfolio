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

  const divider = (
    <div
      className="h-px w-full my-12"
      style={{
        background: dark
          ? "linear-gradient(to right, transparent, #3a3028 30%, #3a3028 70%, transparent)"
          : "linear-gradient(to right, transparent, #e0d4c0 30%, #e0d4c0 70%, transparent)",
      }}
    />
  );

  return (
    <div
      className="max-w-3xl mx-auto px-8 pt-14 pb-24"
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >

      {/* ── Page label ── */}
      <p
        className={`text-[10px] font-medium uppercase mb-10 transition-all duration-700
          ${s0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        style={{ letterSpacing: "0.22em", color: dark ? "#c9a96e" : "#b5956a" }}
      >
        Projects
      </p>

      {/* ── Heading ── */}
      <div
        className={`mb-12 transition-all duration-700
          ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <h1
          className="mb-3"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(32px, 5vw, 44px)",
            lineHeight: 1.1,
            color: dark ? "#f0ebe2" : "#1e1a16",
          }}
        >
          Things I've built
        </h1>
        <p
          className="text-[15px] leading-relaxed max-w-md"
          style={{ fontWeight: 300, color: dark ? "#9e9187" : "#6b5f52" }}
        >
          A small but growing collection of real projects I've shipped.
          More on the way as I keep learning and building.
        </p>
      </div>

      {divider}

      {/* ── Projects ── */}
      <div
        className={`flex flex-col gap-3 transition-all duration-700
          ${s2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        {PROJECTS.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border transition-all duration-200 hover:-translate-y-0.5"
            style={{
              padding: "20px 24px",
              background: dark ? "rgba(255,255,255,0.02)" : "#ffffff",
              borderColor: dark ? "rgba(181,149,106,0.12)" : "rgba(181,149,106,0.2)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = dark
                ? "rgba(181,149,106,0.28)"
                : "rgba(181,149,106,0.45)";
              (e.currentTarget as HTMLElement).style.background = dark
                ? "rgba(181,149,106,0.04)"
                : "rgba(181,149,106,0.03)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = dark
                ? "rgba(181,149,106,0.12)"
                : "rgba(181,149,106,0.2)";
              (e.currentTarget as HTMLElement).style.background = dark
                ? "rgba(255,255,255,0.02)"
                : "#ffffff";
            }}
          >
            {/* Header row */}
            <div className="flex items-start justify-between mb-2">
              <span
                className="text-sm font-medium"
                style={{ color: dark ? "#f0ebe2" : "#1e1a16" }}
              >
                {p.name}
              </span>
              <span
                className="opacity-0 group-hover:opacity-100 transition-opacity ml-3 mt-0.5 flex-shrink-0"
                style={{ color: dark ? "#c9a96e" : "#b5956a" }}
              >
                <ExternalIcon />
              </span>
            </div>

            {/* Description */}
            <p
              className="text-[13px] leading-relaxed mb-4"
              style={{ fontWeight: 300, color: dark ? "#7a7068" : "#8a8078" }}
            >
              {p.desc}
            </p>

            {/* Tags + year */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full text-[11.5px] border"
                    style={{
                      background: dark ? "rgba(181,149,106,0.07)" : "rgba(181,149,106,0.08)",
                      borderColor: dark ? "rgba(181,149,106,0.18)" : "rgba(181,149,106,0.22)",
                      color: dark ? "#c9a96e" : "#8a6e48",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span
                className="text-[11px] flex-shrink-0 ml-3"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  color: dark ? "#4a4038" : "#c4b9aa",
                }}
              >
                {p.year}
              </span>
            </div>
          </a>
        ))}
      </div>

      {divider}

      {/* ── Footer note ── */}
      <div
        className={`flex items-center justify-between transition-all duration-700
          ${s3 ? "opacity-100" : "opacity-0"}`}
      >
        <p
          className="text-[12px]"
          style={{ color: dark ? "#4a4038" : "#c4b9aa", letterSpacing: "0.03em" }}
        >
          More projects coming as I continue learning
        </p>
        <a
          href="https://github.com/jmirabuenos-blip"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] transition-colors flex items-center gap-1.5"
          style={{ color: dark ? "#6a5a48" : "#b5956a", letterSpacing: "0.03em" }}
        >
          GitHub →
        </a>
      </div>

    </div>
  );
}