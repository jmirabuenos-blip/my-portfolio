"use client";
import { useTheme } from "@/hooks/useTheme";
import { useReveal } from "@/hooks/useReveal";

const EDUCATION = [
  {
    school: "Naga College Foundation",
    degree: "Bachelor of Science in Information Technology",
    period: "2022 — Present",
    note: "Currently 3rd year. Focusing on software development and web technologies.",
    hash: "a3f7c21",
  },
  {
    school: "Carolina National High School",
    degree: "Secondary Education",
    period: "2018 — 2022",
    note: "Completed NC II certification through TESDA during senior high.",
    hash: "b8e1d04",
  },
  {
    school: "Panicuason Elementary School",
    degree: "Elementary Education",
    period: "2012 — 2018",
    note: null,
    hash: "c2d9f88",
  },
];

const CERTIFICATIONS = [
  {
    title: "Microsoft Word Associate",
    issuer: "Microsoft / Certiport",
    year: "2025",
    note: "Globally recognized certification demonstrating proficiency in Microsoft Word.",
    badge: "https://www.credly.com/users/sign_in",
    hash: "e4a1b33",
  },
  {
    title: "NC II Certificate",
    issuer: "TESDA",
    year: "2022",
    note: null,
    badge: null,
    hash: "f9c7d55",
  },
];

const GIT_DIFFS: Record<string, string[]> = {
  "Naga College Foundation": [
    "+ learned React, Next.js, TypeScript",
    "+ built 4+ production-grade projects",
    "+ proficiency in full-stack architecture",
    "~ ongoing: backend systems & DevOps",
  ],
  "Carolina National High School": [
    "+ NC II TESDA certification",
    "+ introduced to web development fundamentals",
    "+ developed interest in software engineering",
  ],
  "Panicuason Elementary School": [
    "+ foundational academic skills established",
  ],
  "Microsoft Word Associate": [
    "+ certified Microsoft Word proficiency",
    "+ globally recognized credential",
  ],
  "NC II Certificate": [
    "+ TESDA NC II certified",
  ],
};

export default function EducationPage() {
  const theme = useTheme();
  const dark = theme === "dark";

  const s0 = useReveal();
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 pt-14 pb-24">
      {/* Section label */}
      <div ref={s0.ref} className={`reveal ${s0.isVisible ? "visible" : ""}`}>
        <p className="terminal-label mb-10" style={{ color: "var(--accent)" }}>
          <span className="file-path" />
          git log --oneline
        </p>
      </div>

      {/* Heading */}
      <div ref={s1.ref} className={`mb-12 reveal ${s1.isVisible ? "visible" : ""}`}>
        <h1
          className="heading-display mb-3"
          style={{
            fontSize: "clamp(36px, 8vw, 72px)",
            color: dark ? "#fafafa" : "#0a0a0a",
          }}
        >
          Academic history
        </h1>
        <p
          className="text-[14px] leading-relaxed max-w-md"
          style={{ color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}
        >
          My formal education path — each entry is a commit in the timeline.
        </p>
      </div>

      {/* Timeline — git log style */}
      <div ref={s2.ref} className={`reveal ${s2.isVisible ? "visible" : ""}`}>
        <p
          className="text-[11px] font-semibold mb-6 uppercase tracking-wider"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
        >
          {"// commit history"}
        </p>

        <div className="space-y-0">
          {EDUCATION.map((item, i) => {
            const diffs = GIT_DIFFS[item.school] || [];
            return (
              <div key={i} className="flex gap-4">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: "var(--accent)" }}
                  />
                  {i < EDUCATION.length - 1 && (
                    <div
                      className="w-px flex-1 mt-2"
                      style={{
                        background: dark
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(0,0,0,0.06)",
                      }}
                    />
                  )}
                </div>

                {/* Commit entry */}
                <div className="pb-10 flex-1">
                  {/* Commit header */}
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className="text-[11px] px-2 py-0.5 rounded"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent)",
                        background: "var(--accent-dim)",
                      }}
                    >
                      {item.hash}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: dark
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(0,0,0,0.25)",
                      }}
                    >
                      {item.period}
                    </span>
                  </div>

                  {/* School name */}
                  <h2
                    className="text-[15px] font-semibold mb-0.5"
                    style={{ color: dark ? "#fafafa" : "#0a0a0a" }}
                  >
                    {item.school}
                  </h2>

                  {/* Degree */}
                  <p
                    className="text-[13px] mb-2"
                    style={{
                      color: "var(--accent)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {item.degree}
                  </p>

                  {/* Note */}
                  {item.note && (
                    <p
                      className="text-[13px] leading-relaxed mb-2"
                      style={{
                        color: dark
                          ? "rgba(255,255,255,0.35)"
                          : "rgba(0,0,0,0.35)",
                      }}
                    >
                      {item.note}
                    </p>
                  )}

                  {/* Diff lines */}
                  {diffs.length > 0 && (
                    <div
                      className="rounded-lg p-3 mt-2"
                      style={{
                        background: dark
                          ? "rgba(255,255,255,0.02)"
                          : "rgba(0,0,0,0.02)",
                        border: `1px solid ${
                          dark
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(0,0,0,0.04)"
                        }`,
                      }}
                    >
                      {diffs.map((line, j) => (
                        <p
                          key={j}
                          className="text-[12px] leading-relaxed"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: line.startsWith("+")
                              ? "#22c55e"
                              : line.startsWith("-")
                              ? "#ef4444"
                              : dark
                              ? "rgba(255,255,255,0.3)"
                              : "rgba(0,0,0,0.3)",
                          }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certifications */}
      <div ref={s3.ref} className={`mt-10 reveal ${s3.isVisible ? "visible" : ""}`}>
        <p
          className="text-[11px] font-semibold mb-6 uppercase tracking-wider"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
        >
          {"// tags"}
        </p>

        <div className="flex flex-col gap-2">
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={i}
              className="rounded-xl px-5 py-4 transition-all duration-200"
              style={{
                background: "var(--surface)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className="text-[11px] px-2 py-0.5 rounded"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent)",
                        background: "var(--accent-dim)",
                      }}
                    >
                      {cert.hash}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: dark
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(0,0,0,0.25)",
                      }}
                    >
                      {cert.year}
                    </span>
                  </div>
                  <p
                    className="text-[14px] font-semibold mb-0.5"
                    style={{ color: dark ? "#fafafa" : "#0a0a0a" }}
                  >
                    {cert.title}
                  </p>
                  <p
                    className="text-[12px]"
                    style={{
                      color: "var(--accent)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {cert.issuer}
                  </p>
                  {cert.note && (
                    <p
                      className="text-[13px] mt-2 leading-relaxed"
                      style={{
                        color: dark
                          ? "rgba(255,255,255,0.35)"
                          : "rgba(0,0,0,0.35)",
                      }}
                    >
                      {cert.note}
                    </p>
                  )}
                </div>
                {cert.badge && (
                  <a
                    href={cert.badge}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-all duration-200 hover:opacity-100 flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--accent)",
                      background: "var(--accent-dim)",
                      border: `1px solid ${dark ? "rgba(34,197,94,0.15)" : "rgba(22,163,74,0.12)"}`,
                      opacity: 0.8,
                    }}
                  >
                    view badge →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div ref={s4.ref} className={`mt-12 reveal ${s4.isVisible ? "visible" : ""}`}>
        <p
          className="text-[12px]"
          style={{
            fontFamily: "var(--font-mono)",
            color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
          }}
        >
          Currently enrolled · Naga College Foundation · Expected graduation
          2026
        </p>
      </div>
    </div>
  );
}
