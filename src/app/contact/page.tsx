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

const CONTACT_LINKS = [
  {
    name: "Email",
    handle: "Jmirabuenos@gbox.ncf.edu.ph",
    url: "mailto:Jmirabuenos@gbox.ncf.edu.ph",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    name: "GitHub",
    handle: "jmirabuenos-blip",
    url: "https://github.com/jmirabuenos-blip",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S9 17.44 9 18v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "jaymer.mirabuenos",
    url: "https://www.facebook.com/jaymer.mirabuenos.2025",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@yoho0_0o",
    url: "https://www.instagram.com/yoho0_0o/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
  },
];

export default function ContactPage() {
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
        Contact
      </p>

      {/* ── Heading ── */}
      <div
        className={`mb-12 transition-all duration-700
          ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <h1 className={`text-3xl font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
          Let's work together
        </h1>
        <p className={`text-sm leading-relaxed max-w-md ${dark ? "text-gray-400" : "text-gray-500"}`}>
          Open to freelance projects, internships, collabs, or just a chat.
          Reach out through any of the platforms below.
        </p>
      </div>

      {/* ── Divider ── */}
      <div className={`h-px w-full mb-12 ${dark ? "bg-white/6" : "bg-black/6"}`} />

      {/* ── Contact links ── */}
      <div
        className={`flex flex-col gap-2 mb-12 transition-all duration-700
          ${s2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        {CONTACT_LINKS.map((c) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm transition-all duration-200 group
              ${dark
                ? "border-white/8 text-gray-400 hover:bg-white/4 hover:text-white hover:border-white/15"
                : "border-black/8 text-gray-500 hover:bg-black/3 hover:text-gray-900 hover:border-black/15"
              }`}
          >
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">
              {c.icon}
            </span>
            <span className="flex-1 font-medium">{c.name}</span>
            <span className={`text-xs truncate max-w-[200px] ${dark ? "text-gray-600" : "text-gray-400"}`}>
              {c.handle}
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="opacity-0 group-hover:opacity-40 transition-opacity flex-shrink-0">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        ))}
      </div>

      {/* ── Divider ── */}
      <div className={`h-px w-full mb-12 ${dark ? "bg-white/6" : "bg-black/6"}`} />

      {/* ── Footer note ── */}
      <div
        className={`transition-all duration-700
          ${s3 ? "opacity-100" : "opacity-0"}`}
      >
        <p className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>
          Based in Naga City, Philippines · Usually replies within a day
        </p>
      </div>

    </div>
  );
}