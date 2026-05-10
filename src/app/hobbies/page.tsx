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
  {
    title: "Playing Guitar",
    desc: "Learning new chords and expressing myself through music.",
    media: [
      { type: "video" as const, src: "https://i.imgur.com/rVJMmH7.mp4" },
    ],
  },
  {
    title: "Basketball",
    desc: "Playing casually for fun, exercise, and bonding with friends.",
    media: [
      { type: "video" as const, src: "https://i.imgur.com/GOQ75FY.mp4" },
      { type: "video" as const, src: "https://i.imgur.com/dwuMlJS.mp4" },
    ],
  },
  {
    title: "Hiking",
    desc: "Exploring nature and enjoying the outdoors.",
    media: [
      { type: "image" as const, src: "https://i.imgur.com/YgJYywb.jpg" },
      { type: "image" as const, src: "https://i.imgur.com/yyY8UfS.jpg" },
      { type: "image" as const, src: "https://i.imgur.com/YRbUXNT.jpg" },
      { type: "image" as const, src: "https://i.imgur.com/p9Yyg60.jpg" },
    ],
  },
  {
    title: "Exploring New Things",
    desc: "Always curious, always learning something new.",
    media: [
      { type: "image" as const, src: "https://i.imgur.com/YG4QvvS.jpg" },
    ],
  },
];

type MediaItem = { type: "image" | "video"; src: string };
type LightboxState = { hobby: typeof HOBBIES[0]; idx: number } | null;

function Lightbox({ state, onClose }: { state: LightboxState; onClose: () => void }) {
  const theme = useTheme();
  const dark = theme === "dark";
  const [idx, setIdx] = useState(state?.idx ?? 0);

  useEffect(() => {
    setIdx(state?.idx ?? 0);
  }, [state]);

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className={`relative rounded-xl overflow-hidden max-w-2xl w-full shadow-2xl ${dark ? "bg-[#0a0f1e]" : "bg-white"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media */}
        <div className="relative">
          {item.type === "image" ? (
            <img src={item.src} alt="" className="w-full max-h-[70vh] object-cover" />
          ) : (
            <video src={item.src} controls autoPlay className="w-full max-h-[70vh]" />
          )}

          {/* Nav arrows */}
          {hasMultiple && (
            <>
              <button
                onClick={() => setIdx((i) => (i - 1 + state.hobby.media.length) % state.hobby.media.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                ‹
              </button>
              <button
                onClick={() => setIdx((i) => (i + 1) % state.hobby.media.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className={`px-5 py-3 flex items-center justify-between ${dark ? "border-t border-white/8" : "border-t border-black/8"}`}>
          <p className={`text-sm font-medium ${dark ? "text-white" : "text-gray-900"}`}>
            {state.hobby.title}
          </p>
          {hasMultiple && (
            <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>
              {idx + 1} / {state.hobby.media.length}
            </p>
          )}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors text-lg"
      >
        ×
      </button>
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

  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">

      {/* ── Page label ── */}
      <p
        className={`text-xs font-medium uppercase tracking-widest mb-8 transition-all duration-700
          ${dark ? "text-gray-500" : "text-gray-400"}
          ${s0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        Hobbies
      </p>

      {/* ── Heading ── */}
      <div
        className={`mb-12 transition-all duration-700
          ${s1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <h1 className={`text-3xl font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
          Outside of Code
        </h1>
        <p className={`text-sm leading-relaxed max-w-md ${dark ? "text-gray-400" : "text-gray-500"}`}>
          Things I do when I'm not in front of a screen — or sometimes while I am.
        </p>
      </div>

      {/* ── Divider ── */}
      <div className={`h-px w-full mb-12 ${dark ? "bg-white/6" : "bg-black/6"}`} />

      {/* ── Hobbies ── */}
      <div
        className={`space-y-14 transition-all duration-700
          ${s2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        {HOBBIES.map((hobby, hi) => (
          <div key={hobby.title}>
            {/* Title + desc */}
            <h2 className={`text-base font-medium mb-1 ${dark ? "text-white" : "text-gray-900"}`}>
              {hobby.title}
            </h2>
            <p className={`text-sm mb-4 ${dark ? "text-gray-500" : "text-gray-400"}`}>
              {hobby.desc}
            </p>

            {/* Media grid */}
            {hobby.media.length > 0 && (
              <div className={`grid gap-2 ${hobby.media.length === 1 ? "grid-cols-1" : hobby.media.length === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
                {hobby.media.map((item, mi) => (
                  <button
                    key={mi}
                    onClick={() => setLightbox({ hobby, idx: mi })}
                    className={`relative overflow-hidden rounded-lg aspect-video group border
                      ${dark ? "border-white/8" : "border-black/8"}`}
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.src}
                        alt={hobby.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full relative bg-black">
                        <video
                          src={item.src}
                          className="w-full h-full object-cover opacity-80"
                          muted
                        />
                        {/* Play icon overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                              <polygon points="5 3 19 12 5 21 5 3"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Divider between hobbies */}
            {hi < HOBBIES.length - 1 && (
              <div className={`h-px w-full mt-14 ${dark ? "bg-white/6" : "bg-black/6"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox state={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}