"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";

const navItems = [
  { name: "Home", href: "/", hint: "~/" },
  { name: "About", href: "/about", hint: "cat about.md" },
  { name: "Projects", href: "/projects", hint: "~/projects" },
  { name: "Education", href: "/education", hint: "git log" },
  { name: "Contact", href: "/contact", hint: "./contact.sh" },
];

const allCommands = [
  ...navItems.map((n) => ({ ...n, type: "page" as const })),
  { name: "GitHub", href: "https://github.com/jmirabuenos-blip", hint: "github.com", type: "link" as const },
  { name: "Email", href: "mailto:Jmirabuenos@gbox.ncf.edu.ph", hint: "email", type: "link" as const },
  { name: "Facebook", href: "https://www.facebook.com/jaymer.mirabuenos.2025", hint: "social", type: "link" as const },
  { name: "Instagram", href: "https://www.instagram.com/yoho0_0o/", hint: "social", type: "link" as const },
];

const SKILLS_MARQUEE = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Git", "Vercel",
  "REST APIs", "Vite", "UI/UX", "JavaScript", "HTML5", "CSS3",
  "Python", "Django", "PostgreSQL", "Prisma",
  "Prompt Engineering", "AI APIs", "LLM Integration", "GitHub Copilot", "Cursor",
];

/* ─── Command Palette ─── */
function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = allCommands.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.hint.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  const runCommand = useCallback(
    (href: string) => {
      onClose();
      if (href.startsWith("http") || href.startsWith("mailto")) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = href;
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[activeIdx]) {
        runCommand(filtered[activeIdx].href);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, activeIdx, onClose, runCommand]);

  if (!open) return null;

  return (
    <div className="cmd-overlay" onClick={onClose}>
      <div className="cmd-box" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            className="cmd-input"
            placeholder="Type a command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="terminal-label" style={{ color: "var(--muted-foreground)", fontSize: 10 }}>
            ESC
          </span>
        </div>
        <div className="cmd-results">
          {filtered.length === 0 && (
            <p className="p-4 text-center" style={{ color: "var(--muted-foreground)", fontSize: 13, fontFamily: "var(--font-mono)" }}>
              No results found.
            </p>
          )}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.name}
              className={`cmd-item ${i === activeIdx ? "active" : ""}`}
              onClick={() => runCommand(cmd.href)}
              onMouseEnter={() => setActiveIdx(i)}
            >
              <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
                {cmd.type === "page" ? "~/>" : "$"}
              </span>
              <span className="cmd-item-label">{cmd.name}</span>
              <span className="cmd-item-hint">{cmd.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Layout ─── */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const dark = theme === "dark";
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 z-0 grid-bg pointer-events-none" />

      {/* ── Dock Navbar ── */}
      <nav
        className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-4 md:pt-5"
      >
        <div
          className="w-full max-w-3xl flex items-center justify-between px-4 py-2.5 rounded-2xl transition-all duration-300"
          style={{
            background: dark ? "rgba(20, 20, 20, 0.85)" : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(16px)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
          }}
        >
          {/* Logo */}
          <a
            href="/"
            className="flex-shrink-0 font-bold text-lg tracking-tight"
            style={{
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              color: dark ? "#fafafa" : "#0a0a0a",
            }}
          >
            JM<span style={{ color: "var(--accent)" }}>.</span>
          </a>

          {/* Center nav — desktop */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200"
                    style={{
                      color: active
                        ? "var(--accent)"
                        : dark
                        ? "rgba(255,255,255,0.45)"
                        : "rgba(0,0,0,0.45)",
                      background: active ? "var(--accent-dim)" : "transparent",
                    }}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right: Cmd+K trigger */}
          <button
            onClick={() => setCmdOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] transition-all duration-200"
            style={{
              fontFamily: "var(--font-mono)",
              color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
              background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
            }}
          >
            <span className="hidden sm:inline">Search</span>
            <kbd
              className="hidden sm:inline px-1.5 py-0.5 rounded text-[10px]"
              style={{
                background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              }}
            >
              {typeof navigator !== "undefined" && navigator.platform?.includes("Mac") ? "⌘K" : "Ctrl+K"}
            </kbd>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Command Palette ── */}
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* ── Main Content ── */}
      <main
        className="relative z-10 pt-[72px] transition-opacity duration-500"
        style={{ opacity: mounted ? 1 : 0 }}
      >
        {children}
      </main>

      {/* ── Terminal Footer ── */}
      <footer className="relative z-10 mt-20" style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
        {/* Tech marquee */}
        <div
          className="overflow-hidden py-3"
          style={{ borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}` }}
        >
          <div className="marquee-track">
            {[...SKILLS_MARQUEE, ...SKILLS_MARQUEE].map((skill, i) => (
              <span
                key={i}
                className="flex items-center gap-3 px-4 text-[11px] whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {skill}
                <span style={{ color: "var(--accent)", opacity: 0.4 }}>{"///"}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Status line */}
        <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p
              className="text-[12px] mb-1"
              style={{
                fontFamily: "var(--font-mono)",
                color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
              }}
            >
              <span style={{ color: "var(--accent)" }}>●</span> currently: open to
              internships &amp; freelance
            </p>
            <p
              className="text-[11px]"
              style={{
                fontFamily: "var(--font-mono)",
                color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
              }}
            >
              based in Naga City, Philippines · built with Next.js &amp;
              Tailwind
            </p>
          </div>
          <div className="flex items-center gap-3">
            {[
              { label: "gh", href: "https://github.com/jmirabuenos-blip" },
              { label: "mail", href: "mailto:Jmirabuenos@gbox.ncf.edu.ph" },
              { label: "fb", href: "https://www.facebook.com/jaymer.mirabuenos.2025" },
              { label: "ig", href: "https://www.instagram.com/yoho0_0o/" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] px-2 py-1 rounded transition-all duration-200 hover:opacity-100"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
                  opacity: 0.7,
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
