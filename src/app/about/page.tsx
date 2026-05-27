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

const SKILLS = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5 & CSS3"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Responsive Design", "UI / UX basics"],
  },
  {
    category: "Tooling",
    items: ["Git & GitHub", "Vercel", "REST APIs", "Vite"],
  },
];

export default function AboutPage() {
  const theme = useTheme();
  const dark = theme === "dark";

  const s0 = useFadeIn(80);
  const s1 = useFadeIn(200);
  const s2 = useFadeIn(350);
  const s3 = useFadeIn(500);
  const s4 = useFadeIn(650);

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

  const sectionLabel = (text: string) => (
    <p
      className="text-[10px] font-medium mb-5"
      style={{
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: dark ? "#c9a96e" : "#b5956a",
      }}
    >
      {text}
    </p>
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
        About
      </p>

      {/* ── Photo + intro ── */}
      <div
        className={`flex flex-col sm:flex-row items-start gap-8 mb-12 transition-all duration-700
          ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        {/* Photo */}
        <div className="relative flex-shrink-0">
          <div className="relative w-24 h-24 mr-2 mb-2">
            <img
              src="https://i.imgur.com/Y9RkFD3.jpeg"
              alt="Jaymer Mirabuenos"
              className="w-full h-full object-cover object-top rounded-xl relative z-10"
              style={{ filter: "sepia(6%) saturate(90%)" }}
            />
            {/* Offset border */}
            <div
              className="absolute top-2 left-2 w-full h-full rounded-xl border"
              style={{
                borderColor: dark ? "#4a3a25" : "#d4c4aa",
                zIndex: 0,
              }}
            />
          </div>
        </div>

        {/* Intro text */}
        <div>
          <h1
            className="mb-1"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(28px, 4vw, 36px)",
              lineHeight: 1.1,
              color: dark ? "#f0ebe2" : "#1e1a16",
            }}
          >
            Jaymer Mirabuenos
          </h1>
          <p
            className="text-xs mb-4"
            style={{
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 400,
              color: dark ? "#c9a96e" : "#b5956a",
            }}
          >
            Junior Full Stack Developer &nbsp;·&nbsp; IT Student &nbsp;·&nbsp; Philippines
          </p>
          <p
            className="text-[15px] leading-relaxed"
            style={{ fontWeight: 300, color: dark ? "#9e9187" : "#6b5f52" }}
          >
            I'm a 2nd-year IT student and junior full stack developer who loves building
            things for the web — from polished frontends to the logic running behind them.
            Always learning, always shipping.
          </p>
        </div>
      </div>

      {divider}

      {/* ── Background ── */}
      <div
        className={`mb-0 transition-all duration-700
          ${s2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        {sectionLabel("Background")}
        <div
          className="space-y-4 text-[15px] leading-relaxed"
          style={{ fontWeight: 300, color: dark ? "#9e9187" : "#6b5f52" }}
        >
          <p>
            I got into web development the way most people do — curiosity. I just wanted
            to make things. That curiosity turned into a real passion, especially once I
            realized I could go beyond the frontend and understand the full picture of how
            an app actually works.
          </p>
          <p>
            I'm currently studying Information Technology at Naga College Foundation. Outside
            of class, I'm building projects, picking up new tools, and slowly connecting the
            dots between design, frontend, and backend. It's a lot — but I genuinely enjoy it.
          </p>
          <p>
            I'm looking for opportunities where I can contribute, keep growing, and work on
            things that actually matter — freelance, internships, or collaborations, I'm open
            to all of it.
          </p>
        </div>
      </div>

      {divider}

      {/* ── Skills ── */}
      <div
        className={`transition-all duration-700
          ${s3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        {sectionLabel("Skills")}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {SKILLS.map((group) => (
            <div key={group.category}>
              <p
                className="text-xs font-medium mb-4"
                style={{
                  letterSpacing: "0.08em",
                  color: dark ? "#c9a96e" : "#b5956a",
                }}
              >
                {group.category}
              </p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[13.5px] flex items-center gap-2"
                    style={{ color: dark ? "#7a7068" : "#8a8078", fontWeight: 300 }}
                  >
                    <span
                      className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: dark ? "#4a3a25" : "#d4c4aa" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {divider}

      {/* ── CTA ── */}
      <div
        className={`transition-all duration-700
          ${s4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <p
          className="text-[15px] mb-6"
          style={{ fontWeight: 300, color: dark ? "#9e9187" : "#6b5f52" }}
        >
          Want to work together or just say hi?
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-medium transition-all duration-200 hover:-translate-y-px"
          style={{
            background: dark ? "#f0ebe2" : "#2c2825",
            color: dark ? "#1e1a16" : "#faf8f5",
            letterSpacing: "0.02em",
          }}
        >
          Get in touch
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

    </div>
  );
}