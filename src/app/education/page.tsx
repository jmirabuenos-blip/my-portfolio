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

const EDUCATION = [
  {
    school: "Naga College Foundation",
    degree: "Bachelor of Science in Information Technology",
    period: "2022 — Present",
    note: "Currently 3rd year. Focusing on software development and web technologies.",
  },
  {
    school: "Carolina National High School",
    degree: "Secondary Education",
    period: "2018 — 2022",
    note: "Completed NC II certification through TESDA during senior high.",
  },
  {
    school: "Panicuason Elementary School",
    degree: "Elementary Education",
    period: "2012 — 2018",
    note: null,
  },
];

const CERTIFICATIONS = [
  {
    title: "Microsoft Word Associate",
    issuer: "Microsoft / Certiport",
    year: "2025",
    note: "Globally recognized certification demonstrating proficiency in Microsoft Word.",
    badge: "https://www.credly.com/users/sign_in",
  },
  {
    title: "NC II Certificate",
    issuer: "TESDA",
    year: "2022",
    note: null,
    badge: null,
  },
];

export default function EducationPage() {
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
        Education
      </p>

      {/* ── Heading ── */}
      <div
        className={`mb-12 transition-all duration-700
          ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <h1 className={`text-3xl font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
          Academic Background
        </h1>
        <p className={`text-sm leading-relaxed max-w-md ${dark ? "text-gray-400" : "text-gray-500"}`}>
          My formal education path and certifications earned along the way.
        </p>
      </div>

      {/* ── Divider ── */}
      <div className={`h-px w-full mb-12 ${dark ? "bg-white/6" : "bg-black/6"}`} />

      {/* ── Education timeline ── */}
      <div
        className={`mb-12 transition-all duration-700
          ${s2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <p className={`text-xs font-medium uppercase tracking-widest mb-6 ${dark ? "text-gray-500" : "text-gray-400"}`}>
          Schools
        </p>
        <div className="space-y-8">
          {EDUCATION.map((item, i) => (
            <div key={i} className="flex gap-5">
              {/* Timeline dot */}
              <div className="flex flex-col items-center pt-1">
                <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${dark ? "bg-blue-400" : "bg-blue-500"}`} />
                {i < EDUCATION.length - 1 && (
                  <div className={`w-px flex-1 mt-2 ${dark ? "bg-white/8" : "bg-black/8"}`} />
                )}
              </div>

              {/* Content */}
              <div className="pb-8">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className={`text-sm font-medium ${dark ? "text-white" : "text-gray-900"}`}>
                    {item.school}
                  </h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full border
                    ${dark ? "text-gray-500 border-white/8" : "text-gray-400 border-black/8"}`}>
                    {item.period}
                  </span>
                </div>
                <p className={`text-sm mb-2 ${dark ? "text-blue-400" : "text-blue-600"}`}>
                  {item.degree}
                </p>
                {item.note && (
                  <p className={`text-xs leading-relaxed ${dark ? "text-gray-500" : "text-gray-400"}`}>
                    {item.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className={`h-px w-full mb-12 ${dark ? "bg-white/6" : "bg-black/6"}`} />

      {/* ── Certifications ── */}
      <div
        className={`mb-12 transition-all duration-700
          ${s3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <p className={`text-xs font-medium uppercase tracking-widest mb-6 ${dark ? "text-gray-500" : "text-gray-400"}`}>
          Certifications
        </p>
        <div className="space-y-3">
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg border ${dark ? "border-white/8 bg-white/2" : "border-black/8 bg-black/2"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className={`text-sm font-medium ${dark ? "text-white" : "text-gray-900"}`}>
                      {cert.title}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border
                      ${dark ? "text-gray-500 border-white/8" : "text-gray-400 border-black/8"}`}>
                      {cert.year}
                    </span>
                  </div>
                  <p className={`text-xs mb-2 ${dark ? "text-blue-400" : "text-blue-600"}`}>
                    {cert.issuer}
                  </p>
                  {cert.note && (
                    <p className={`text-xs leading-relaxed ${dark ? "text-gray-500" : "text-gray-400"}`}>
                      {cert.note}
                    </p>
                  )}
                </div>
                {cert.badge && (
                  <a
                    href={cert.badge}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-lg border transition-colors
                      ${dark
                        ? "border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
                        : "border-blue-200 text-blue-600 hover:bg-blue-50"
                      }`}
                  >
                    View badge →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className={`h-px w-full mb-12 ${dark ? "bg-white/6" : "bg-black/6"}`} />

      {/* ── Footer ── */}
      <div className={`transition-all duration-700 ${s3 ? "opacity-100" : "opacity-0"}`}>
        <p className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>
          Currently enrolled · Naga College Foundation · Expected graduation 2026
        </p>
      </div>

    </div>
  );
}