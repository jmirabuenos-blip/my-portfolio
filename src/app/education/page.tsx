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
  { school: "Naga College Foundation", degree: "Bachelor of Science in Information Technology", period: "2022 — Present", note: "Currently 3rd year. Focusing on software development and web technologies." },
  { school: "Carolina National High School", degree: "Secondary Education", period: "2018 — 2022", note: "Completed NC II certification through TESDA during senior high." },
  { school: "Panicuason Elementary School", degree: "Elementary Education", period: "2012 — 2018", note: null },
];

const CERTIFICATIONS = [
  { title: "Microsoft Word Associate", issuer: "Microsoft / Certiport", year: "2025", note: "Globally recognized certification demonstrating proficiency in Microsoft Word.", badge: "https://www.credly.com/users/sign_in" },
  { title: "NC II Certificate", issuer: "TESDA", year: "2022", note: null, badge: null },
];

export default function EducationPage() {
  const theme = useTheme();
  const dark = theme === "dark";
  const s0 = useFadeIn(80);
  const s1 = useFadeIn(200);
  const s2 = useFadeIn(350);
  const s3 = useFadeIn(500);
  const s4 = useFadeIn(650);

  const divider = <div className="h-px w-full my-12" style={{ background: dark ? "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" : "linear-gradient(to right, transparent, rgba(44,40,37,0.08) 30%, rgba(44,40,37,0.08) 70%, transparent)" }} />;
  const sectionLabel = (text: string) => <p className="text-[10px] font-medium mb-6" style={{ letterSpacing: "0.22em", textTransform: "uppercase", color: dark ? "#c9a96e" : "#b5956a" }}>{text}</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 pt-14 pb-24" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
      <p className={`text-[10px] font-medium uppercase mb-10 transition-all duration-700 ${s0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ letterSpacing: "0.22em", color: dark ? "#c9a96e" : "#b5956a" }}>Education</p>

      <div className={`mb-12 transition-all duration-700 ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <h1 className="mb-3" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(32px, 5vw, 44px)", lineHeight: 1.1, color: dark ? "#f0ebe2" : "#1e1a16" }}>Academic Background</h1>
        <p className="text-[15px] leading-relaxed max-w-md" style={{ fontWeight: 300, color: dark ? "rgba(232,226,216,0.5)" : "rgba(44,40,37,0.5)" }}>My formal education path and certifications earned along the way.</p>
      </div>

      {divider}

      <div className={`transition-all duration-700 ${s2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        {sectionLabel("Schools")}
        <div className="space-y-0">
          {EDUCATION.map((item, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: dark ? "#c9a96e" : "#b5956a" }} />
                {i < EDUCATION.length - 1 && <div className="w-px flex-1 mt-2" style={{ background: dark ? "rgba(255,255,255,0.06)" : "rgba(44,40,37,0.08)" }} />}
              </div>
              <div className="pb-10">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-sm font-medium" style={{ color: dark ? "#f0ebe2" : "#1e1a16" }}>{item.school}</h2>
                  <span className="neu-icon text-[11px] px-2.5 py-0.5 rounded-full" style={{ color: dark ? "rgba(232,226,216,0.4)" : "rgba(44,40,37,0.4)", background: dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)", fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic" }}>{item.period}</span>
                </div>
                <p className="text-[13px] mb-2" style={{ color: dark ? "#c9a96e" : "#b5956a", fontWeight: 400 }}>{item.degree}</p>
                {item.note && <p className="text-[13px] leading-relaxed" style={{ fontWeight: 300, color: dark ? "rgba(232,226,216,0.4)" : "rgba(44,40,37,0.4)" }}>{item.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {divider}

      <div className={`transition-all duration-700 ${s3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        {sectionLabel("Certifications")}
        <div className="space-y-3">
          {CERTIFICATIONS.map((cert, i) => (
            <div key={i} className="glass-card" style={{ padding: "18px 22px", borderRadius: "16px" }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="text-sm font-medium" style={{ color: dark ? "#f0ebe2" : "#1e1a16" }}>{cert.title}</p>
                    <span className="neu-icon text-[11px] px-2.5 py-0.5 rounded-full" style={{ color: dark ? "rgba(232,226,216,0.4)" : "rgba(44,40,37,0.4)", background: dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)", fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic" }}>{cert.year}</span>
                  </div>
                  <p className="text-[13px] mb-2" style={{ color: dark ? "#c9a96e" : "#b5956a", fontWeight: 400 }}>{cert.issuer}</p>
                  {cert.note && <p className="text-[13px] leading-relaxed" style={{ fontWeight: 300, color: dark ? "rgba(232,226,216,0.4)" : "rgba(44,40,37,0.4)" }}>{cert.note}</p>}
                </div>
                {cert.badge && <a href={cert.badge} target="_blank" rel="noopener noreferrer" className="neu-btn flex-shrink-0 text-[12px] px-3 py-1.5 rounded-full transition-all duration-200" style={{ color: dark ? "#c9a96e" : "#8a6e48", background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.5)" }}>View badge →</a>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {divider}

      <div className={`transition-all duration-700 ${s4 ? "opacity-100" : "opacity-0"}`}>
        <p className="text-[12px]" style={{ color: dark ? "rgba(232,226,216,0.3)" : "rgba(44,40,37,0.3)", letterSpacing: "0.03em" }}>Currently enrolled · Naga College Foundation · Expected graduation 2026</p>
      </div>
    </div>
  );
}
