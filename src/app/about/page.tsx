"use client";
import { useTheme } from "@/hooks/useTheme";
import { useReveal } from "@/hooks/useReveal";

const SKILLS = {
  "Languages & Core": [
    "JavaScript (ES6+)",
    "TypeScript",
    "Python",
    "HTML5",
    "CSS3",
    "SQL",
  ],
  "Frameworks & Libraries": [
    "React",
    "Next.js",
    "Django",
    "Node.js",
    "Tailwind CSS",
    "Prisma ORM",
    "Framer Motion",
  ],
  "Tools & Platforms": [
    "Git & GitHub",
    "Vercel",
    "PostgreSQL",
    "REST APIs",
    "Vite",
    "Docker basics",
    "Figma",
    "VS Code",
  ],
  "AI & Modern Workflow": [
    "Prompt Engineering",
    "LLM Integration",
    "AI API Integration",
    "GitHub Copilot",
    "Cursor AI",
    "ChatGPT / Claude",
    "AI-assisted Development",
  ],
  "Design & Soft Skills": [
    "Responsive Design",
    "UI/UX Principles",
    "Agile / Scrum",
    "Technical Documentation",
    "Problem Solving",
    "Code Review",
  ],
};

const CALLOUTS = [
  "▸ Strong emphasis on clean, maintainable code architecture.",
  "▸ Experienced with both frontend interfaces and backend logic.",
  "▸ Proficient with AI-assisted development tools and modern workflows.",
  "▸ Comfortable working across the full development lifecycle.",
];

export default function AboutPage() {
  const theme = useTheme();
  const dark = theme === "dark";

  const s0 = useReveal();
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();
  const s5 = useReveal();

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 pt-14 pb-24">
      {/* Section label */}
      <div ref={s0.ref} className={`reveal ${s0.isVisible ? "visible" : ""}`}>
        <p
          className="terminal-label mb-10"
          style={{ color: "var(--accent)" }}
        >
          <span className="file-path" />
          about.md
        </p>
      </div>

      {/* README heading */}
      <div ref={s1.ref} className={`mb-12 reveal ${s1.isVisible ? "visible" : ""}`}>
        <h1
          className="heading-display mb-4"
          style={{
            fontSize: "clamp(36px, 8vw, 72px)",
            color: dark ? "#fafafa" : "#0a0a0a",
          }}
        >
          # About
        </h1>
        <p
          className="text-[15px] leading-relaxed max-w-lg"
          style={{ color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
        >
          Frontend developer and IT student with a focus on building
          performant, accessible web applications. Experienced with React,
          Next.js, and full-stack workflows.
        </p>
      </div>

      {/* Horizontal rule */}
      <div
        className="h-px w-full my-10"
        style={{
          background: dark
            ? "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)"
            : "linear-gradient(to right, transparent, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.08) 70%, transparent)",
        }}
      />

      {/* ## Currently */}
      <div ref={s2.ref} className={`mb-12 reveal ${s2.isVisible ? "visible" : ""}`}>
        <h2
          className="heading-display mb-6"
          style={{
            fontSize: "clamp(24px, 5vw, 40px)",
            color: dark ? "#fafafa" : "#0a0a0a",
          }}
        >
          ## Currently
        </h2>
        <div className="space-y-3">
          {[
            "Pursuing BS in Information Technology at Naga College Foundation",
            "Developing full-stack applications with React and Next.js",
            "Seeking internship and freelance opportunities",
            "Expanding expertise in backend systems and DevOps",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 text-[14px]"
              style={{ color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
            >
              <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 13, flexShrink: 0, marginTop: 2 }}>
                {"→"}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Callout block */}
      <div
        className="rounded-xl p-5 mb-12"
        style={{
          background: "var(--accent-dim)",
          border: `1px solid ${dark ? "rgba(34,197,94,0.12)" : "rgba(22,163,74,0.1)"}`,
        }}
      >
        <p
          className="text-[11px] font-semibold mb-3 uppercase tracking-wider"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
        >
          {"// core strengths"}
        </p>
        <div className="space-y-2">
          {CALLOUTS.map((fact, i) => (
            <p
              key={i}
              className="text-[13px] leading-relaxed"
              style={{ color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)" }}
            >
              {fact}
            </p>
          ))}
        </div>
      </div>

      {/* ## Background */}
      <div ref={s3.ref} className={`mb-12 reveal ${s3.isVisible ? "visible" : ""}`}>
        <h2
          className="heading-display mb-6"
          style={{
            fontSize: "clamp(24px, 5vw, 40px)",
            color: dark ? "#fafafa" : "#0a0a0a",
          }}
        >
          ## Background
        </h2>
        <div
          className="space-y-4 text-[14px] leading-relaxed"
          style={{ color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)" }}
        >
          <p>
            Started with web development through self-directed learning and
            academic coursework. Progressed from basic HTML/CSS to building
            full-stack applications with modern frameworks.
          </p>
          <p>
            Currently completing a BS in Information Technology at Naga College
            Foundation, with coursework in software development, database
            systems, and network administration.
          </p>
          <p>
            Open to internships, freelance projects, and collaborative
            opportunities where I can apply technical skills and continue
            developing professionally.
          </p>
        </div>
      </div>

      {/* ## Skills — expanded */}
      <div ref={s4.ref} className={`mb-12 reveal ${s4.isVisible ? "visible" : ""}`}>
        <h2
          className="heading-display mb-6"
          style={{
            fontSize: "clamp(24px, 5vw, 40px)",
            color: dark ? "#fafafa" : "#0a0a0a",
          }}
        >
          ## Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <p
                className="text-[11px] font-semibold mb-3 uppercase tracking-wider"
                style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
              >
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg text-[12px]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
                      background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                      border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div ref={s5.ref} className={`reveal ${s5.isVisible ? "visible" : ""}`}>
        <div
          className="h-px w-full mb-10"
          style={{
            background: dark
              ? "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)"
              : "linear-gradient(to right, transparent, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.08) 70%, transparent)",
          }}
        />
        <p
          className="text-[13px] mb-4"
          style={{ color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}
        >
          Interested in collaborating or have a question?
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 hover:scale-[1.03]"
          style={{
            background: dark ? "#fafafa" : "#0a0a0a",
            color: dark ? "#0a0a0a" : "#fafafa",
          }}
        >
          Get in touch
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
