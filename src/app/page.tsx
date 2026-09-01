"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useReveal } from "@/hooks/useReveal";

const TYPING_ROLES = [
  "frontend developer",
  "full stack engineer",
  "React & Next.js specialist",
  "UI/UX practitioner",
  "AI-assisted developer",
];

const SKILLS_MARQUEE = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Git", "Vercel",
  "REST APIs", "Vite", "UI/UX", "JavaScript", "HTML5", "CSS3",
  "Python", "Django", "PostgreSQL", "Prisma",
  "Prompt Engineering", "AI APIs", "LLM Integration", "GitHub Copilot", "Cursor",
];

const SCATTERED_IMAGES = [
  { src: "https://i.imgur.com/Y9RkFD3.jpeg", alt: "Jaymer", w: 180, h: 220, top: "8%", left: "2%", rotate: -4, delay: 0.1 },
  { src: "https://i.imgur.com/YgJYywb.jpg", alt: "Hiking", w: 140, h: 100, top: "5%", right: "4%", rotate: 3, delay: 0.2 },
  { src: "https://i.imgur.com/yyY8UfS.jpg", alt: "Nature", w: 120, h: 90, top: "55%", left: "1%", rotate: 2, delay: 0.3 },
  { src: "https://i.imgur.com/YRbUXNT.jpg", alt: "Trail", w: 130, h: 95, top: "60%", right: "2%", rotate: -3, delay: 0.15 },
  { src: "https://i.imgur.com/p9Yyg60.jpg", alt: "Outdoors", w: 110, h: 80, bottom: "18%", left: "8%", rotate: 5, delay: 0.25 },
  { src: "https://i.imgur.com/YG4QvvS.jpg", alt: "Explore", w: 100, h: 75, bottom: "15%", right: "6%", rotate: -2, delay: 0.35 },
];

function useTypingEffect(strings: string[], typingSpeed = 80, deletingSpeed = 40, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [stringIdx, setStringIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[stringIdx];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
          if (charIdx + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          setDisplayText(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
          if (charIdx - 1 === 0) {
            setIsDeleting(false);
            setStringIdx((i) => (i + 1) % strings.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, stringIdx, strings, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

function ScatteredImage({
  src, alt, w, h, rotate, style, delay,
}: {
  src: string; alt: string; w: number; h: number; rotate: number;
  style: React.CSSProperties; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute hidden md:block overflow-hidden rounded-xl opacity-0"
      style={{
        ...style,
        width: w,
        height: h,
        transform: `rotate(${rotate}deg) translate(${mouse.x * (0.3 + delay)}px, ${mouse.y * (0.3 + delay)}px)`,
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}s`,
        animation: "hero-img-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        animationDelay: `${0.5 + delay}s`,
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ filter: "saturate(0.85) contrast(1.05)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "inherit",
        }}
      />
    </div>
  );
}

export default function Page() {
  const theme = useTheme();
  const dark = theme === "dark";
  const typedText = useTypingEffect(TYPING_ROLES);
  const hero = useReveal();
  const cta = useReveal({ threshold: 0.3 });
  const skills = useReveal({ threshold: 0.3 });

  return (
    <>
      <style>{`
        @keyframes hero-img-in {
          from { opacity: 0; transform: scale(0.85) rotate(0deg); }
          to { opacity: 1; }
        }
        @keyframes hero-word-in {
          from { opacity: 0; transform: translateY(30px) skewY(2deg); }
          to { opacity: 1; transform: translateY(0) skewY(0); }
        }
        .hero-word {
          display: inline-block;
          opacity: 0;
          animation: hero-word-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Scattered images */}
        {SCATTERED_IMAGES.map((img, i) => (
          <ScatteredImage key={i} {...img} style={{
            top: img.top, left: img.left, right: img.right,
            bottom: img.bottom, position: "absolute",
          }} />
        ))}

        {/* Hero content */}
        <div
          ref={hero.ref}
          className={`max-w-3xl mx-auto px-6 md:px-8 text-center relative z-10 reveal ${hero.isVisible ? "visible" : ""}`}
        >
          {/* Terminal label */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-8"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "var(--accent)",
              background: "var(--accent-dim)",
              border: `1px solid ${dark ? "rgba(34,197,94,0.15)" : "rgba(22,163,74,0.12)"}`,
            }}
          >
            <span style={{ opacity: 0.5 }}>{"$>"}</span> available for opportunities
          </div>

          {/* Giant headline */}
          <h1
            className="heading-display mb-6"
            style={{
              fontSize: "clamp(48px, 12vw, 130px)",
              color: dark ? "#fafafa" : "#0a0a0a",
            }}
          >
            <span className="hero-word" style={{ animationDelay: "0.1s" }}>Jaymer</span>
            <br />
            <span className="hero-word" style={{ animationDelay: "0.25s" }}>
              Mirabue<span style={{ color: "var(--accent)" }}>no</span>s
            </span>
          </h1>

          {/* Typed terminal line */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-10"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(13px, 2vw, 16px)",
              color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
              background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            }}
          >
            <span style={{ color: "var(--accent)" }}>{">"}</span>
            <span>{typedText}</span>
            <span
              className="cursor-blink inline-block w-[2px] h-[16px]"
              style={{ background: "var(--accent)" }}
            />
          </div>

          {/* CTA buttons */}
          <div
            ref={cta.ref}
            className={`flex flex-wrap items-center justify-center gap-3 reveal ${cta.isVisible ? "visible" : ""}`}
          >
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: dark ? "#fafafa" : "#0a0a0a",
                color: dark ? "#0a0a0a" : "#fafafa",
              }}
            >
              View projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 hover:scale-[1.03]"
              style={{
                color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              }}
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Skills marquee */}
        <div
          ref={skills.ref}
          className={`absolute bottom-0 left-0 w-full overflow-hidden py-4 reveal ${skills.isVisible ? "visible" : ""}`}
          style={{
            borderTop: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}`,
          }}
        >
          <div className="marquee-track">
            {[...SKILLS_MARQUEE, ...SKILLS_MARQUEE].map((skill, i) => (
              <span
                key={i}
                className="flex items-center gap-3 px-4 text-[12px] whitespace-nowrap font-medium"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {skill}
                <span style={{ color: "var(--accent)", opacity: 0.3 }}>{"///"}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
