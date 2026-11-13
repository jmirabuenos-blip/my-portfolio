"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/hooks/useReveal";

const ROLES = [
  "Frontend Developer",
  "React & Next.js Builder",
  "IT Student",
  "Full-Stack Developer",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Typewriter effect
  useEffect(() => {
    if (reduced) {
      setDisplayed(ROLES[0]);
      return;
    }
    const current = ROLES[roleIndex];
    const delay = isDeleting ? 45 : 90;
    const pause = isDeleting ? 0 : 1800;

    const id = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setRoleIndex((r) => (r + 1) % ROLES.length);
        }
      }
    }, delay);

    return () => clearTimeout(id);
  }, [charIndex, isDeleting, roleIndex, reduced]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      da: number;
    };

    let w = 0;
    let h = 0;
    const particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * (w || 1200),
        y: Math.random() * (h || 800),
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.4 - 0.1,
        r: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        da: (Math.random() - 0.5) * 0.004,
      });
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.max(0.05, Math.min(0.65, p.alpha + p.da));
        if (p.alpha <= 0.05 || p.alpha >= 0.65) p.da *= -1;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,200,61,${p.alpha})`;
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [reduced]);

  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      {/* Gradient mesh orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />

      {/* Copy */}
      <div className="hero-copy">
        <h1 id="hero-title">
          <span className="hero-name-line">Jaymer</span>
          <span className="hero-name-line hero-name-accent">Mirabuenos</span>
        </h1>

        <div className="hero-role" aria-live="polite" aria-atomic="true">
          <span className="hero-role-text">{displayed || ROLES[0]}</span>
        </div>

        <p className="hero-desc">
          Building modern, responsive web experiences with React and Next.js.
          IT student from the Philippines, passionate about clean code and
          thoughtful UI.
        </p>

        <div className="hero-actions">
          <Link href="/projects" className="hero-btn-primary">
            View my work <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/contact" className="hero-btn-secondary">
            Get in touch
          </Link>
        </div>

        <div className="hero-location">
          <MapPin size={14} aria-hidden="true" />
          Naga City, Philippines
          <span className="hero-availability">· Open to work</span>
        </div>
      </div>

      {/* Stats strip */}
      <div className="hero-stats" aria-label="Quick stats">
        {[
          { value: "3+", label: "Projects shipped" },
          { value: "3rd", label: "Year IT student" },
          { value: "2026", label: "Latest project" },
        ].map(({ value, label }) => (
          <div key={label} className="hero-stat">
            <span className="hero-stat-value">{value}</span>
            <span className="hero-stat-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <a href="#work" className="hero-scroll" aria-label="Scroll to work section">
        <ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
