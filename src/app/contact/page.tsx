"use client";
import { useState, useCallback } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useReveal } from "@/hooks/useReveal";

const CONTACT_LINKS = [
  {
    name: "Email",
    handle: "Jmirabuenos@gbox.ncf.edu.ph",
    url: "mailto:Jmirabuenos@gbox.ncf.edu.ph",
    alias: "mail",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    handle: "jmirabuenos-blip",
    url: "https://github.com/jmirabuenos-blip",
    alias: "gh",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S9 17.44 9 18v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "jaymer.mirabuenos",
    url: "https://www.facebook.com/jaymer.mirabuenos.2025",
    alias: "fb",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@yoho0_0o",
    url: "https://www.instagram.com/yoho0_0o/",
    alias: "ig",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const theme = useTheme();
  const dark = theme === "dark";
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const s0 = useReveal();
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();

  const copyToClipboard = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 pt-14 pb-24">
      {/* Section label */}
      <div ref={s0.ref} className={`reveal ${s0.isVisible ? "visible" : ""}`}>
        <p className="terminal-label mb-10" style={{ color: "var(--accent)" }}>
          <span className="file-path" />
          contact.sh
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
          Let&apos;s work together
        </h1>
        <p
          className="text-[14px] leading-relaxed max-w-md"
          style={{ color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}
        >
          Open to freelance projects, internships, collabs, or just a chat.
          Reach out through any of the platforms below.
        </p>
      </div>

      {/* Terminal form */}
      <div
        ref={s2.ref}
        className={`rounded-xl p-5 mb-10 reveal ${s2.isVisible ? "visible" : ""}`}
        style={{
          background: "var(--surface)",
          border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
        }}
      >
        <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}` }}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#eab308" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
          </div>
          <span
            className="text-[11px] ml-2"
            style={{
              fontFamily: "var(--font-mono)",
              color: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
            }}
          >
            contact.sh
          </span>
        </div>

        <div className="space-y-3">
          {/* Name */}
          <div className="flex items-center gap-2">
            <span
              className="text-[13px] flex-shrink-0"
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
            >
              {">"} name:
            </span>
            <input
              type="text"
              placeholder="enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="flex-1 bg-transparent outline-none text-[13px] placeholder:opacity-30"
              style={{
                fontFamily: "var(--font-mono)",
                color: dark ? "#fafafa" : "#0a0a0a",
              }}
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-2">
            <span
              className="text-[13px] flex-shrink-0"
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
            >
              {">"} email:
            </span>
            <input
              type="email"
              placeholder="enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="flex-1 bg-transparent outline-none text-[13px] placeholder:opacity-30"
              style={{
                fontFamily: "var(--font-mono)",
                color: dark ? "#fafafa" : "#0a0a0a",
              }}
            />
          </div>

          {/* Message */}
          <div className="flex items-start gap-2">
            <span
              className="text-[13px] flex-shrink-0 mt-2"
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
            >
              {">"} msg:
            </span>
            <textarea
              placeholder="write your message..."
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="flex-1 bg-transparent outline-none text-[13px] resize-none placeholder:opacity-30"
              style={{
                fontFamily: "var(--font-mono)",
                color: dark ? "#fafafa" : "#0a0a0a",
              }}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}` }}>
          <span
            className="text-[11px]"
            style={{
              fontFamily: "var(--font-mono)",
              color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
            }}
          >
            hint: or just reach out directly ↓
          </span>
          <button
            className="px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 hover:scale-[1.03]"
            style={{
              fontFamily: "var(--font-mono)",
              background: "var(--accent)",
              color: "#0a0a0a",
            }}
          >
            $ run send
          </button>
        </div>
      </div>

      {/* Contact aliases */}
      <div ref={s3.ref} className={`reveal ${s3.isVisible ? "visible" : ""}`}>
        <p
          className="text-[11px] font-semibold mb-4 uppercase tracking-wider"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
        >
          {"// contact aliases"}
        </p>

        <div className="flex flex-col gap-2">
          {CONTACT_LINKS.map((c) => (
            <button
              key={c.name}
              onClick={() => copyToClipboard(c.handle, c.name)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left group transition-all duration-200 w-full"
              style={{
                background: "var(--surface)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
              }}
            >
              {/* Icon */}
              <span
                className="transition-colors duration-200"
                style={{
                  color: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
                }}
              >
                {c.icon}
              </span>

              {/* Alias */}
              <span
                className="text-[12px] px-2 py-0.5 rounded flex-shrink-0"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent)",
                  background: "var(--accent-dim)",
                }}
              >
                ${c.alias}
              </span>

              {/* Name */}
              <span
                className="text-[13px] font-medium flex-1"
                style={{ color: dark ? "#fafafa" : "#0a0a0a" }}
              >
                {c.name}
              </span>

              {/* Handle */}
              <span
                className="text-[12px] truncate max-w-[180px]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                }}
              >
                {copied === c.name ? (
                  <span style={{ color: "var(--accent)" }}>copied!</span>
                ) : (
                  c.handle
                )}
              </span>

              {/* External link icon */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0 group-hover:opacity-40 transition-opacity flex-shrink-0"
                style={{ color: "var(--accent)" }}
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-12 flex items-center justify-between">
        <p
          className="text-[12px]"
          style={{
            fontFamily: "var(--font-mono)",
            color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
          }}
        >
          Based in Naga City, Philippines · Usually replies within a day
        </p>
      </div>
    </div>
  );
}
