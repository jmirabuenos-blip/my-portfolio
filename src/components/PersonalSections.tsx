"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Coffee,
  Headphones,
  CircleDot,
  Volume2,
  VolumeX,
} from "lucide-react";
import { SKILLS } from "@/lib/portfolio";

export function SkillExplorer() {
  const categories = Object.keys(SKILLS) as (keyof typeof SKILLS)[];
  const [category, setCategory] = useState<keyof typeof SKILLS>(categories[0]);
  return (
    <div className="skill-explorer">
      <div
        className="skill-categories"
        role="group"
        aria-label="Skill categories"
      >
        {categories.map((c, i) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            <span>{c}</span>
            <ArrowUpRight size={19} />
            <small>{String(i + 1).padStart(2, "0")}</small>
          </button>
        ))}
      </div>
      <div className="skill-cloud" key={category} aria-live="polite">
        <p>{category}</p>
        <ul>
          {SKILLS[category].map((skill, i) => (
            <li key={skill} style={{ animationDelay: `${i * 40}ms` }}>
              {skill}
            </li>
          ))}
        </ul>
        <span></span>
      </div>
    </div>
  );
}

export function HobbyExplorer() {
  const [selected, setSelected] = useState(0);
  const [clip, setClip] = useState(1);
  const [sound, setSound] = useState(false);
  const [error, setError] = useState("");
  const video = useRef<HTMLVideoElement>(null);
  const audio = useRef<AudioContext | null>(null);
  useEffect(() => {
    const stop = () => {
      if (document.hidden) {
        void audio.current?.suspend();
        video.current?.pause();
      } else if (audio.current) {
        void audio.current.resume();
      }
    };
    document.addEventListener("visibilitychange", stop);
    return () => {
      document.removeEventListener("visibilitychange", stop);
      void audio.current?.close();
    };
  }, []);
  const titles = ["Basketball", "Music", "Coffee"];
  const descriptions = [
    "I play basketball in my free time.",
    "I listen to lo-fi music while working.",
    "I enjoy coffee during study and work breaks.",
  ];
  async function toggleSound() {
    if (audio.current) {
      await audio.current.close();
      audio.current = null;
      setSound(false);
      return;
    }
    try {
      const context = new AudioContext();
      audio.current = context;
      const gain = context.createGain();
      gain.gain.value = 0.018;
      gain.connect(context.destination);
      [130.81, 164.81, 196, 246.94].forEach((f) => {
        const oscillator = context.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = f;
        oscillator.connect(gain);
        oscillator.start();
      });
      await context.resume();
      setSound(true);
    } catch {
      setError("Audio is unavailable in this browser.");
    }
  }
  function choose(index: number) {
    setSelected(index);
    video.current?.pause();
    if (audio.current) {
      void audio.current.close();
      audio.current = null;
    }
    setSound(false);
    setError("");
  }
  return (
    <div className="hobby-explorer">
      <div className="hobby-tabs" role="group" aria-label="Explore interests">
        {[CircleDot, Headphones, Coffee].map((Icon, i) => (
          <button
            key={i}
            aria-pressed={selected === i}
            onClick={() => choose(i)}
          >
            <Icon size={21} />
            {["Basketball", "Lo-fi music", "Coffee"][i]}
            <ArrowUpRight size={18} />
          </button>
        ))}
      </div>
      <div className="hobby-stage">
        <div className="hobby-media">
          {selected === 0 ? (
            <>
              <video
                ref={video}
                key={clip}
                controls
                playsInline
                preload="metadata"
                onError={() =>
                  setError("This clip could not load. Try the other clip.")
                }
                aria-label={`Jaymer playing basketball, clip ${clip}`}
              >
                <source src={`/personal/bball${clip}.mp4`} type="video/mp4" />
                <track
                  kind="captions"
                  src="/personal/basketball.vtt"
                  srcLang="en"
                  label="English"
                  default
                />
              </video>
              <div className="clip-controls">
                {[1, 2].map((n) => (
                  <button
                    key={n}
                    aria-pressed={clip === n}
                    onClick={() => setClip(n)}
                  >
                    Clip {n}
                  </button>
                ))}
              </div>
            </>
          ) : selected === 1 ? (
            <div className={`sound-art ${sound ? "playing" : ""}`}>
              <div className="record">
                <span />
              </div>
              <button className="sound-button" onClick={toggleSound}>
                {sound ? <VolumeX size={18} /> : <Volume2 size={18} />}{" "}
                {sound ? "Stop ambient chord" : "Play ambient chord"}
              </button>
              <small>Generated ambient audio.</small>
            </div>
          ) : (
            <div className="coffee-art">
              <Coffee size={100} strokeWidth={0.7} />
              <span>
                Coffee.
                <br />
                Code.
                <br />
                Repeat.
              </span>
            </div>
          )}
        </div>
        <div className="hobby-story" aria-live="polite">
          <h3>{titles[selected]}</h3>
          <p>{descriptions[selected]}</p>
          {error && <p role="status">{error}</p>}
        </div>
      </div>
    </div>
  );
}
