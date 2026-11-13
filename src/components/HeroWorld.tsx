"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Pause, Play, RotateCcw, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/useReveal";

const destinations = [
  { name: "Work", id: "work", detail: "Ideas made tangible. Explore three real projects." },
  { name: "About", id: "about", detail: "The person, the process, and the curiosity behind it all." },
  { name: "Education", id: "education", detail: "A journey of learning, one discovery at a time." },
] as const;

export default function HeroWorld() {
  const root = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [secret, setSecret] = useState(false);
  const reduced = usePrefersReducedMotion();
  const moving = visible && !paused && !reduced;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 35, damping: 25 });
  const y = useSpring(pointerY, { stiffness: 35, damping: 25 });
  const explorerX = useTransform(x, (value) => value * -1.4);
  const explorerY = useTransform(y, (value) => value * -0.8);

  useEffect(() => {
    let intersects = true;
    const update = () => setVisible(intersects && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersects = entry.isIntersecting;
      update();
    });
    if (root.current) observer.observe(root.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (!moving) { pointerX.set(0); pointerY.set(0); }
  }, [moving, pointerX, pointerY]);

  return (
    <div ref={root} className={`world orbital-world ${moving ? "is-moving" : "is-still"}`}
      style={{ "--destination-shift": `${selected * -0.65}%` } as CSSProperties}
      onPointerMove={(event) => {
        if (!moving || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * -24);
        pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * -16);
      }}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
      <motion.div className="orbital-art" style={{ x: moving ? x : 0, y: moving ? y : 0 }} aria-hidden="true">
        <div className="orbital-pan"><Image src="/orbital/station.webp" alt="" fill priority sizes="100vw" /></div>
      </motion.div>
      <div className="orbital-shade" aria-hidden="true" />
      <div className="orbital-particles" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <i key={i} style={{ left: `${36 + (i * 17 % 63)}%`, top: `${8 + (i * 23 % 65)}%`, "--delay": `${-i * 1.7}s`, "--duration": `${12 + i % 7}s` } as CSSProperties} />
        ))}
      </div>
      <motion.div className="explorer-position" style={{ x: moving ? explorerX : 0, y: moving ? explorerY : 0 }}>
        <button className="explorer" aria-label="Say hello to the explorer" onClick={() => setSecret(!secret)}>
          <Image src="/orbital/explorer.webp" alt="" fill sizes="(max-width: 700px) 180px, 320px" />
        </button>
      </motion.div>
      <div className="world-controls">
        <button onClick={() => setPaused(!paused)} aria-pressed={paused} disabled={reduced}
          aria-label={paused ? "Resume world animation" : "Pause world animation"}>
          {paused || reduced ? <Play size={15} /> : <Pause size={15} />}<span>{paused || reduced ? "Still view" : "Motion on"}</span>
        </button>
        <button aria-label="Reset camera" onClick={() => { setSelected(0); pointerX.set(0); pointerY.set(0); }}><RotateCcw size={15} /></button>
      </div>
      <div className="destination-panel">
        <div className="destination-tabs" role="group" aria-label="Observatory destinations">
          {destinations.map((d, i) => (
            <button key={d.id} aria-pressed={selected === i} onClick={() => setSelected(i)}>{d.name}</button>
          ))}
        </div>
        <div className="destination-detail" aria-live="polite">
          <p>{destinations[selected].detail}</p>
          <a href={`#${destinations[selected].id}`} aria-label={`Explore ${destinations[selected].name}`}>Explore <ArrowUpRight size={17} /></a>
        </div>
      </div>
      {secret && <div className="secret-message" role="status">A small discovery: curiosity is the best navigation system.<button aria-label="Dismiss discovery" onClick={() => setSecret(false)}><X size={16} /></button></div>}
      <a className="scroll-cue" href="#work" aria-label="Scroll to selected work"><ArrowDown size={18} /></a>
    </div>
  );
}

