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
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5 & CSS3"] },
  { category: "Styling", items: ["Tailwind CSS", "Responsive Design", "UI / UX basics"] },
  { category: "Tooling", items: ["Git & GitHub", "Vercel", "REST APIs", "Vite"] },
];

export default function AboutPage() {
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
        About
      </p>

      {/* ── Photo + intro ── */}
      <div
        className={`flex flex-col sm:flex-row items-start gap-8 mb-12 transition-all duration-700
          ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <div className="relative flex-shrink-0">
          <div className={`w-28 h-28 rounded-xl overflow-hidden border ${dark ? "border-white/10" : "border-black/8"}`}>
            <img
              src="https://i.imgur.com/Y9RkFD3.jpeg"
              alt="Jaymer Mirabuenos"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        <div>
          <h1 className={`text-2xl font-semibold mb-1 ${dark ? "text-white" : "text-gray-900"}`}>
            Jaymer Mirabuenos
          </h1>
          <p className={`text-sm mb-4 ${dark ? "text-blue-400" : "text-blue-600"}`}>
            Frontend Developer · IT Student · Philippines
          </p>
          <p className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>
            I'm a 2nd-year IT student passionate about building clean, responsive web
            experiences. I focus on writing maintainable code and creating interfaces
            that feel intuitive and polished. Always learning, always building.
          </p>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className={`h-px w-full mb-12 ${dark ? "bg-white/6" : "bg-black/6"}`} />

      {/* ── Background ── */}
      <div
        className={`mb-12 transition-all duration-700
          ${s2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <p className={`text-xs font-medium uppercase tracking-widest mb-4 ${dark ? "text-gray-500" : "text-gray-400"}`}>
          Background
        </p>
        <div className={`space-y-3 text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>
          <p>
            I started learning web development out of curiosity and quickly became
            passionate about the frontend — specifically the intersection of design
            and code. There's something satisfying about turning a rough idea into
            something people can actually use and enjoy.
          </p>
          <p>
            Currently studying Information Technology at Naga College Foundation,
            I spend my free time building personal projects, exploring new tools,
            and improving my understanding of UI/UX principles.
          </p>
          <p>
            I'm open to freelance work, internships, and collaborations — especially
            projects that challenge me to grow.
          </p>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className={`h-px w-full mb-12 ${dark ? "bg-white/6" : "bg-black/6"}`} />

      {/* ── Skills ── */}
      <div
        className={`mb-12 transition-all duration-700
          ${s3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <p className={`text-xs font-medium uppercase tracking-widest mb-6 ${dark ? "text-gray-500" : "text-gray-400"}`}>
          Skills
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {SKILLS.map((group) => (
            <div key={group.category}>
              <p className={`text-xs font-medium mb-3 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                {group.category}
              </p>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className={`text-sm ${dark ? "text-gray-500" : "text-gray-500"}`}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className={`h-px w-full mb-12 ${dark ? "bg-white/6" : "bg-black/6"}`} />

      {/* ── CTA ── */}
      <div
        className={`transition-all duration-700
          ${s3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <p className={`text-sm mb-4 ${dark ? "text-gray-400" : "text-gray-500"}`}>
          Want to work together or just say hi?
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors"
        >
          Get in touch
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

    </div>
  );
}