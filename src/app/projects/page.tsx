"use client";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useReveal } from "@/hooks/useReveal";

const PROJECTS = [
  {
    name: "NCF Enrollment Portal",
    desc: "A full-stack Django enrollment system for Nueva Caceres with role-based access for Admins, Staff, and Students. Features course management, department organization, and real-time enrollment tracking.",
    tags: ["Django", "PostgreSQL", "Python", "WhiteNoise"],
    url: "https://ncf-enrollment-portal.onrender.com/",
    year: "2026",
    category: "web",
    image: "/projects/ncf-enrollment-portal.jpg",
    imageCaption: "ncf-enrollment-portal.jpg",
    slug: "ncf-enrollment-portal",
  },
  {
    name: "Minimalist E-Commerce Store",
    desc: "A full-stack e-commerce platform with product listings, cart management, Stripe payment integration, and order tracking. Built with Next.js, Prisma ORM, and Neon Postgres.",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    url: "https://ecommerce-portfolio-sooty.vercel.app/",
    year: "2026",
    category: "web",
    image: "/projects/ecommerce-store.png",
    imageCaption: "ecommerce-store.png",
    slug: "ecommerce-store",
  },
  {
    name: "AIVA AI Studio",
    desc: "AI-powered creative platform with audio and video generation capabilities. Built with Next.js and deployed on Vercel.",
    tags: ["Next.js", "AI", "Vercel"],
    url: "https://aiva-weld.vercel.app/",
    year: "2024",
    category: "ai",
    image: "/projects/aiva-ai-studio.jpg",
    imageCaption: "aiva-ai-studio.jpg",
    slug: "aiva-ai-studio",
  },
];

const FILTERS = [
  { label: "all", value: "all" },
  { label: "web", value: "web" },
  { label: "ai", value: "ai" },
];

export default function ProjectsPage() {
  const theme = useTheme();
  const dark = theme === "dark";
  const [activeFilter, setActiveFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const s0 = useReveal();
  const s1 = useReveal();
  const s2 = useReveal();

  const filtered =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 pt-14 pb-24">
      {/* Section label */}
      <div ref={s0.ref} className={`reveal ${s0.isVisible ? "visible" : ""}`}>
        <p className="terminal-label mb-10" style={{ color: "var(--accent)" }}>
          <span className="file-path" />
          projects/
        </p>
      </div>

      {/* Heading */}
      <div ref={s1.ref} className={`mb-10 reveal ${s1.isVisible ? "visible" : ""}`}>
        <h1
          className="heading-display mb-3"
          style={{
            fontSize: "clamp(36px, 8vw, 72px)",
            color: dark ? "#fafafa" : "#0a0a0a",
          }}
        >
          Selected projects
        </h1>
        <p
          className="text-[14px] leading-relaxed max-w-md"
          style={{ color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}
        >
          A collection of projects demonstrating technical experience across
          frontend and full-stack development.
        </p>
      </div>

      {/* Filter chips */}
      <div
        ref={s2.ref}
        className={`flex items-center gap-2 mb-8 reveal ${s2.isVisible ? "visible" : ""}`}
      >
        <span
          className="text-[11px] mr-2 uppercase tracking-wider"
          style={{
            fontFamily: "var(--font-mono)",
            color: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
          }}
        >
          filter:
        </span>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200"
            style={{
              fontFamily: "var(--font-mono)",
              background:
                activeFilter === f.value
                  ? "var(--accent-dim)"
                  : dark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.03)",
              color:
                activeFilter === f.value
                  ? "var(--accent)"
                  : dark
                  ? "rgba(255,255,255,0.35)"
                  : "rgba(0,0,0,0.35)",
              border: `1px solid ${
                activeFilter === f.value
                  ? dark
                    ? "rgba(34,197,94,0.15)"
                    : "rgba(22,163,74,0.12)"
                  : dark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.06)"
              }`,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Project list — file tree style */}
      <div className="flex flex-col gap-2">
        {filtered.map((project) => {
          const isOpen = expanded === project.name;
          return (
            <div
              key={project.name}
              className="rounded-xl overflow-hidden transition-all duration-300"
              style={{
                background: isOpen ? "var(--surface)" : "transparent",
                border: `1px solid ${
                  isOpen
                    ? dark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.08)"
                    : "transparent"
                }`,
              }}
            >
              {/* ── Row header ── */}
              <button
                onClick={() => setExpanded(isOpen ? null : project.name)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-200 group"
              >
                {/* Expand arrow */}
                <span
                  className="text-[12px] transition-transform duration-200"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: isOpen
                      ? "var(--accent)"
                      : dark
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.2)",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    display: "inline-block",
                  }}
                >
                  {"▶"}
                </span>

                {/* Project name */}
                <span
                  className="text-[14px] font-semibold flex-1"
                  style={{ color: dark ? "#fafafa" : "#0a0a0a" }}
                >
                  {project.name}
                </span>

                {/* Tags preview */}
                <div className="hidden sm:flex items-center gap-1.5">
                  {project.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: dark
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(0,0,0,0.25)",
                        background: dark
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.03)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Year */}
                <span
                  className="text-[11px] flex-shrink-0"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                  }}
                >
                  {project.year}
                </span>
              </button>

              {/* ── Expanded content ── */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: isOpen ? "600px" : "0",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="px-4 pb-5 pl-10 flex flex-col gap-4">

                  {/* Preview image — terminal-styled */}
                  <div>
                    {/* monospace file path label above */}
                    <p
                      className="text-[10px] mb-1.5 uppercase tracking-wider"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: dark
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.2)",
                      }}
                    >
                      <span style={{ color: "var(--accent)" }}>{">"}</span>{" "}
                      {project.imageCaption}
                    </p>

                    {/* Image — sharp corners, scan-line tint to match aesthetic */}
                    <div
                      className="relative w-full overflow-hidden"
                      style={{
                        borderRadius: "6px",
                        border: `1px solid ${
                          dark
                            ? "rgba(255,255,255,0.07)"
                            : "rgba(0,0,0,0.07)"
                        }`,
                        maxHeight: "220px",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={`${project.name} preview`}
                        className="w-full object-cover object-top"
                        style={{
                          maxHeight: "220px",
                          filter: dark
                            ? "saturate(0.8) brightness(0.85) contrast(1.05)"
                            : "saturate(0.9) contrast(1.02)",
                          display: "block",
                        }}
                      />
                      {/* Subtle scan-line overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
                        }}
                      />
                      {/* Corner accent */}
                      <div
                        className="absolute top-0 right-0 px-2 py-0.5"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 9,
                          color: "var(--accent)",
                          background: "var(--accent-dim)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        PREVIEW
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{
                      color: dark
                        ? "rgba(255,255,255,0.45)"
                        : "rgba(0,0,0,0.45)",
                    }}
                  >
                    {project.desc}
                  </p>

                  {/* Tags + link row */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex gap-1.5 flex-wrap">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg text-[11px]"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: "var(--accent)",
                            background: "var(--accent-dim)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[12px] font-medium transition-all duration-200 hover:opacity-100 flex-shrink-0"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: dark
                          ? "rgba(255,255,255,0.4)"
                          : "rgba(0,0,0,0.4)",
                        opacity: 0.7,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      run
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-12 flex items-center justify-between">
        <p
          className="text-[12px]"
          style={{
            fontFamily: "var(--font-mono)",
            color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
          }}
        >
          {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
        </p>
        <a
          href="https://github.com/jmirabuenos-blip"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] transition-colors flex items-center gap-1.5"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--accent)",
          }}
        >
          github →
        </a>
      </div>
    </div>
  );
}
