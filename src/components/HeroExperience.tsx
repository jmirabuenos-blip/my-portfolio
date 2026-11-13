"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/useReveal";
import type { SculptureOptions } from "@/lib/sculpture";
export default function HeroExperience() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const control = useRef<{ invalidate: () => void } | null>(null);
  const [tone, setTone] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced = usePrefersReducedMotion();
  const options = useRef<SculptureOptions>({
    tone: 0,
    paused: false,
    reduced: true,
  });
  useEffect(() => {
    options.current = { tone, paused, reduced: reduced ?? true };
    control.current?.invalidate();
  }, [tone, paused, reduced]);
  useEffect(() => {
    let dead = false;
    let scene: { dispose: () => void; invalidate: () => void } | undefined;
    import("@/lib/sculpture")
      .then(({ createSculpture }) => {
        if (dead || !canvas.current) return;
        try {
          scene = createSculpture(canvas.current, () => options.current);
          control.current = scene;
        } catch {
          setFailed(true);
        }
      })
      .catch(() => setFailed(true));
    return () => {
      dead = true;
      scene?.dispose();
      control.current = null;
    };
  }, []);
  return (
    <div className="sculpture">
      <div
        className="sculpture-fallback"
        aria-hidden="true"
        style={{ display: failed ? "grid" : "none" }}
      >
        <Image
          src="/sculpture-still.png"
          alt=""
          fill
          sizes="(max-width:700px) 100vw, 70vw"
        />
      </div>
      <canvas
        ref={canvas}
        tabIndex={failed ? -1 : 0}
        role="img"
        aria-label="Interactive copper sculpture. Drag to rotate, or focus and use arrow keys."
        onContextMenu={(e) => e.preventDefault()}
        style={{ visibility: failed ? "hidden" : "visible" }}
      />
      {failed ? (
        <span className="scene-note">Sculpture in still mode</span>
      ) : (
        <div className="sculpture-controls">
          <span className="sculpture-hint">Drag to explore</span>
          {["Copper", "Silver", "Olive"].map((name, i) => (
            <button
              key={name}
              onClick={() => setTone(i)}
              aria-label={`${name} lighting`}
              aria-pressed={tone === i}
            >
              <span
                className={`light-swatch ${i === 1 ? "silver" : i === 2 ? "olive" : ""}`}
              />
            </button>
          ))}
          <button
            aria-label={
              paused ? "Play sculpture animation" : "Pause sculpture animation"
            }
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
            disabled={!!reduced}
          >
            {paused || reduced ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}
