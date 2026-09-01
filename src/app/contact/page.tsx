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
  { name: "Email", handle: "Jmirabuenos@gbox.ncf.edu.ph", url: "mailto:Jmirabuenos@gbox.ncf.edu.ph", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
  { name: "GitHub", handle: "jmirabuenos-blip", url: "https://github.com/jmirabuenos-blip", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S9 17.44 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> },
  { name: "Facebook", handle: "jaymer.mirabuenos", url: "https://www.facebook.com/jaymer.mirabuenos.2025", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { name: "Instagram", handle: "@yoho0_0o", url: "https://www.instagram.com/yoho0_0o/", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> },
];

const ArrowIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export default function ContactPage() {
  const theme = useTheme();
  const dark = theme === "dark";
  const s0 = useFadeIn(80);
  const s1 = useFadeIn(250);
  const s2 = useFadeIn(420);
  const s3 = useFadeIn(700);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 pt-14 pb-20" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
      <p className={`text-[10px] font-medium uppercase mb-8 transition-all duration-700 ${dark ? "text-[#c9a96e]" : "text-[#b5956a]"} ${s0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ letterSpacing: "0.22em" }}>Contact</p>

      <div className={`mb-10 transition-all duration-700 ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <h1 className={`mb-3 ${dark ? "text-[#f0ebe2]" : "text-[#1e1a16]"}`} style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(38px, 5vw, 50px)", lineHeight: 1.08, letterSpacing: "-0.01em" }}>Let&apos;s work together</h1>
        <p className={`text-[15px] leading-relaxed max-w-sm ${dark ? "text-[rgba(232,226,216,0.5)]" : "text-[rgba(44,40,37,0.5)]"}`} style={{ fontWeight: 300 }}>Open to freelance projects, internships, collabs, or just a chat. Reach out through any of the platforms below.</p>
      </div>

      <div className={`h-px w-full mb-10 transition-all duration-700 ${s1 ? "opacity-100" : "opacity-0"}`} style={{ background: dark ? "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" : "linear-gradient(to right, transparent, rgba(44,40,37,0.08) 30%, rgba(44,40,37,0.08) 70%, transparent)" }} />

      <div className={`flex flex-col gap-3 mb-10 transition-all duration-700 ${s2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        {CONTACT_LINKS.map((c) => (
          <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="glass-card flex items-center gap-3 px-5 py-4 text-sm group transition-all duration-200" style={{ borderRadius: "14px" }}>
            <span className={`transition-colors duration-200 ${dark ? "text-[rgba(232,226,216,0.3)] group-hover:text-[#c9a96e]" : "text-[rgba(44,40,37,0.3)] group-hover:text-[#8a6e48]"}`}>{c.icon}</span>
            <span className="flex-1 text-[13px]" style={{ fontWeight: 400, letterSpacing: "0.02em", color: dark ? "rgba(232,226,216,0.65)" : "rgba(44,40,37,0.65)" }}>{c.name}</span>
            <span className={`text-[12px] truncate max-w-[200px] transition-colors duration-200 ${dark ? "text-[rgba(232,226,216,0.3)] group-hover:text-[rgba(232,226,216,0.5)]" : "text-[rgba(44,40,37,0.3)] group-hover:text-[rgba(44,40,37,0.5)]"}`} style={{ letterSpacing: "0.01em" }}>{c.handle}</span>
            <span className={`opacity-0 group-hover:opacity-40 transition-opacity flex-shrink-0 ${dark ? "text-[#c9a96e]" : "text-[#8a6e48]"}`}><ArrowIcon /></span>
          </a>
        ))}
      </div>

      <div className={`flex items-center justify-between transition-all duration-700 ${s3 ? "opacity-100" : "opacity-0"}`}>
        <p className="text-[12px]" style={{ letterSpacing: "0.03em", color: dark ? "rgba(232,226,216,0.3)" : "rgba(44,40,37,0.3)" }}>Based in Naga City, Philippines &nbsp;·&nbsp; Usually replies within a day</p>
        <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "18px", letterSpacing: "0.05em", color: dark ? "rgba(201,169,110,0.3)" : "rgba(138,110,72,0.3)" }}>jm.</span>
      </div>
    </div>
  );
}
