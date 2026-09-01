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

const HOBBIES = [
  { title: "Playing Guitar", desc: "Learning new chords and expressing myself through music.", media: [{ type: "video" as const, src: "https://i.imgur.com/rVJMmH7.mp4" }] },
  { title: "Basketball", desc: "Playing casually for fun, exercise, and bonding with friends.", media: [{ type: "video" as const, src: "https://i.imgur.com/GOQ75FY.mp4" }, { type: "video" as const, src: "https://i.imgur.com/dwuMlJS.mp4" }] },
  { title: "Hiking", desc: "Exploring nature and enjoying the outdoors.", media: [{ type: "image" as const, src: "https://i.imgur.com/YgJYywb.jpg" }, { type: "image" as const, src: "https://i.imgur.com/yyY8UfS.jpg" }, { type: "image" as const, src: "https://i.imgur.com/YRbUXNT.jpg" }, { type: "image" as const, src: "https://i.imgur.com/p9Yyg60.jpg" }] },
  { title: "Exploring New Things", desc: "Always curious, always learning something new.", media: [{ type: "image" as const, src: "https://i.imgur.com/YG4QvvS.jpg" }] },
];

type LightboxState = { hobby: typeof HOBBIES[0]; idx: number } | null;

function Lightbox({ state, onClose }: { state: LightboxState; onClose: () => void }) {
  const theme = useTheme();
  const dark = theme === "dark";
  const [idx, setIdx] = useState(state?.idx ?? 0);

  useEffect(() => { setIdx(state?.idx ?? 0); }, [state]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && state) setIdx((i) => (i + 1) % state.hobby.media.length);
      if (e.key === "ArrowLeft" && state) setIdx((i) => (i - 1 + state.hobby.media.length) % state.hobby.media.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [state, onClose]);

  if (!state) return null;
  const item = state.hobby.media[idx];
  const hasMultiple = state.hobby.media.length > 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: dark ? "rgba(8,10,20,0.88)" : "rgba(232,228,242,0.88)", backdropFilter: "blur(12px)" }} onClick={onClose}>
      <div className="glass relative overflow-hidden max-w-2xl w-full" style={{ borderRadius: "20px", background: dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.7)", boxShadow: "0 32px 64px rgba(0,0,0,0.4)" }} onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          {item.type === "image" ? <img src={item.src} alt="" className="w-full max-h-[70vh] object-cover" /> : <video src={item.src} controls autoPlay className="w-full max-h-[70vh]" />}
          {hasMultiple && (<>
            <button onClick={() => setIdx((i) => (i - 1 + state.hobby.media.length) % state.hobby.media.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full transition-colors text-lg neu-icon" style={{ background: dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.7)", color: "#c9a96e" }}>‹</button>
            <button onClick={() => setIdx((i) => (i + 1) % state.hobby.media.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full transition-colors text-lg neu-icon" style={{ background: dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.7)", color: "#c9a96e" }}>›</button>
          </>)}
        </div>
        <div className="px-5 py-3 flex items-center justify-between" style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(44,40,37,0.06)"}` }}>
          <p className="text-sm font-medium" style={{ color: dark ? "#f0ebe2" : "#1e1a16" }}>{state.hobby.title}</p>
          {hasMultiple && <p className="text-[11px]" style={{ color: dark ? "rgba(232,226,216,0.4)" : "rgba(44,40,37,0.4)", fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic" }}>{idx + 1} / {state.hobby.media.length}</p>}
        </div>
      </div>
      <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-lg transition-colors neu-icon" style={{ background: dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.7)", color: "#c9a96e" }}>×</button>
    </div>
  );
}

export default function HobbiesPage() {
  const theme = useTheme();
  const dark = theme === "dark";
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const s0 = useFadeIn(80);
  const s1 = useFadeIn(200);
  const s2 = useFadeIn(350);

  const divider = <div className="h-px w-full" style={{ background: dark ? "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" : "linear-gradient(to right, transparent, rgba(44,40,37,0.08) 30%, rgba(44,40,37,0.08) 70%, transparent)" }} />;

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 pt-14 pb-24" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
      <p className={`text-[10px] font-medium uppercase mb-10 transition-all duration-700 ${s0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ letterSpacing: "0.22em", color: dark ? "#c9a96e" : "#b5956a" }}>Hobbies</p>

      <div className={`mb-12 transition-all duration-700 ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <h1 className="mb-3" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(32px, 5vw, 44px)", lineHeight: 1.1, color: dark ? "#f0ebe2" : "#1e1a16" }}>Outside of Code</h1>
        <p className="text-[15px] leading-relaxed max-w-md" style={{ fontWeight: 300, color: dark ? "rgba(232,226,216,0.5)" : "rgba(44,40,37,0.5)" }}>Things I do when I&apos;m not in front of a screen — or sometimes while I am.</p>
      </div>

      <div className={`transition-all duration-700 ${s2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        {HOBBIES.map((hobby, hi) => (
          <div key={hobby.title}>
            {divider}
            <div className="py-12">
              <div className="flex items-baseline gap-4 mb-2">
                <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "13px", color: dark ? "rgba(232,226,216,0.25)" : "rgba(44,40,37,0.25)" }}>0{hi + 1}</span>
                <h2 className="text-base font-medium" style={{ color: dark ? "#f0ebe2" : "#1e1a16" }}>{hobby.title}</h2>
              </div>
              <p className="text-[13.5px] mb-5 ml-8" style={{ fontWeight: 300, color: dark ? "rgba(232,226,216,0.4)" : "rgba(44,40,37,0.4)" }}>{hobby.desc}</p>
              {hobby.media.length > 0 && (
                <div className={`grid gap-2 ml-8 ${hobby.media.length === 1 ? "grid-cols-1" : hobby.media.length === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
                  {hobby.media.map((item, mi) => (
                    <button key={mi} onClick={() => setLightbox({ hobby, idx: mi })} className="glass-card relative overflow-hidden rounded-xl aspect-video group transition-all duration-200">
                      {item.type === "image" ? (
                        <img src={item.src} alt={hobby.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" style={{ filter: "sepia(3%) saturate(92%)" }} />
                      ) : (
                        <div className="w-full h-full relative bg-black">
                          <video src={item.src} className="w-full h-full object-cover opacity-80" muted />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors neu-icon" style={{ background: dark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="#c9a96e"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {divider}
      </div>

      <Lightbox state={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}
