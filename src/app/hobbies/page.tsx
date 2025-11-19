"use client";
import { useState, useEffect } from "react";
import { Guitar, Target, MountainSnow, Compass, X } from "lucide-react";

type EmojiDrop = { id: number; emoji: string; top: number; left: number; size: number; duration: number };
type DynamicElement = { id: number; style: React.CSSProperties };

type ImageSlide = { src: string; caption: string };
type Hobby = {
  title: string;
  icon: JSX.Element;
  desc: string;
  emojis: string[];
  videos?: { src: string; note: string }[];
  images?: ImageSlide[];
};

const hobbiesData: Hobby[] = [
  {
    title: "Playing Guitar",
    icon: <Guitar className="w-12 h-12 text-indigo-500" />,
    desc: "I enjoy learning new chords and expressing myself through music.",
    emojis: ["🎸", "🎶", "🎵"],
    videos: [
      { src: "https://i.imgur.com/rVJMmH7.mp4", note: "Here's a short clip of me playing guitar 🎸" },
    ],
  },
  {
    title: "Basketball",
    icon: <Target className="w-12 h-12 text-amber-500" />,
    desc: "I like playing basketball casually for fun, exercise, and bonding with friends.",
    emojis: ["🏀", "💪", "🏆"],
    videos: [
      { src: "https://i.imgur.com/GOQ75FY.mp4", note: "Making some shots 🏀 — action on the court!" },
      { src: "https://i.imgur.com/dwuMlJS.mp4", note: "Another basketball clip 🏀🔥" },
    ],
  },
  {
    title: "Hiking",
    icon: <MountainSnow className="w-12 h-12 text-green-500" />,
    desc: "I love going outdoors, exploring nature, and enjoying peaceful hikes.",
    emojis: ["🥾", "🌲", "🌄"],
    images: [
      { src: "https://i.imgur.com/YgJYywb.jpg", caption: "Starting the trail 🌲" },
      { src: "https://i.imgur.com/yyY8UfS.jpg", caption: "Beautiful view 🌄" },
      { src: "https://i.imgur.com/YRbUXNT.jpg", caption: "Taking a break 🥾" },
      { src: "https://i.imgur.com/p9Yyg60.jpg", caption: "Summit reached! ⛰️" },
    ],
  },
  {
    title: "Discovering New Things",
    icon: <Compass className="w-12 h-12 text-blue-500" />,
    desc: "I enjoy learning, exploring, and trying new experiences.",
    emojis: ["🧭", "🔍", "💡"],
    images: [
      { src: "https://i.imgur.com/YG4QvvS.jpg", caption: "Love to explore new places!" },
    ],
  },
];

export default function Hobbies() {
  const [hobbyEmojis, setHobbyEmojis] = useState<EmojiDrop[]>([]);
  const [showTitle, setShowTitle] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [stars, setStars] = useState<DynamicElement[]>([]);
  const [orbs, setOrbs] = useState<DynamicElement[]>([]);

  const [mediaState, setMediaState] = useState<{
    visible: boolean;
    hobbyIdx?: number;
    idx?: number;
    src?: string;
    note?: string;
    isImage?: boolean;
  }>({ visible: false });

  const generateStars = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      style: {
        width: `${(i % 3) + 2}px`,
        height: `${(i % 3) + 2}px`,
        left: `${(i * 3.3) % 100}%`,
        top: `${(i * 5.5) % 100}%`,
        animationDelay: `${(i % 5) * 0.8}s`,
        animationDuration: `12s`,
      },
    }));

  const generateOrbs = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      style: {
        width: `${(i * 50) + 200}px`,
        height: `${(i * 50) + 200}px`,
        left: `${(i * 25) + 5}%`,
        top: `${(i * 15) + 10}%`,
        animationDelay: `${i * 1.5}s`,
        animationDuration: `20s`,
        filter: "blur(100px)",
      },
    }));

  useEffect(() => {
    setStars(generateStars(30));
    setOrbs(generateOrbs(5));
    setIsMounted(true);

    const stepDelay = 400;
    const t1 = setTimeout(() => setShowTitle(true), stepDelay * 1);
    const t2 = setTimeout(() => setShowGrid(true), stepDelay * 2);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleHobbyClick = (hobby: Hobby, hobbyIdx: number) => {
    const drops: EmojiDrop[] = Array.from({ length: 12 }).map(() => ({
      id: Math.random(),
      emoji: hobby.emojis[Math.floor(Math.random() * hobby.emojis.length)],
      top: 10 + Math.random() * 70,
      left: 10 + Math.random() * 80,
      size: 20 + Math.random() * 15,
      duration: 2 + Math.random() * 2,
    }));
    setHobbyEmojis(drops);
    setTimeout(() => setHobbyEmojis([]), 4000);

    if (hobby.videos && hobby.videos.length > 0) {
      setMediaState({ visible: true, hobbyIdx, idx: 0, src: hobby.videos[0].src, note: hobby.videos[0].note, isImage: false });
    } else if (hobby.images && hobby.images.length > 0) {
      setMediaState({ visible: true, hobbyIdx, idx: 0, src: hobby.images[0].src, note: hobby.images[0].caption, isImage: true });
    }
  };

  const handleNextMedia = () => {
    if (mediaState.hobbyIdx === undefined || mediaState.idx === undefined) return;
    const hobby = hobbiesData[mediaState.hobbyIdx];
    if (mediaState.isImage && hobby.images) {
      if (hobby.images.length <= 1) return;
      const nextIdx = (mediaState.idx + 1) % hobby.images.length;
      setMediaState({ visible: true, hobbyIdx: mediaState.hobbyIdx, idx: nextIdx, src: hobby.images[nextIdx].src, note: hobby.images[nextIdx].caption, isImage: true });
    } else if (!mediaState.isImage && hobby.videos) {
      const nextIdx = (mediaState.idx + 1) % hobby.videos.length;
      setMediaState({ visible: true, hobbyIdx: mediaState.hobbyIdx, idx: nextIdx, src: hobby.videos[nextIdx].src, note: hobby.videos[nextIdx].note, isImage: false });
    }
  };

  const handlePrevMedia = () => {
    if (mediaState.hobbyIdx === undefined || mediaState.idx === undefined) return;
    const hobby = hobbiesData[mediaState.hobbyIdx];
    if (mediaState.isImage && hobby.images) {
      if (hobby.images.length <= 1) return;
      const prevIdx = (mediaState.idx - 1 + hobby.images.length) % hobby.images.length;
      setMediaState({ visible: true, hobbyIdx: mediaState.hobbyIdx, idx: prevIdx, src: hobby.images[prevIdx].src, note: hobby.images[prevIdx].caption, isImage: true });
    } else if (!mediaState.isImage && hobby.videos) {
      const prevIdx = (mediaState.idx - 1 + hobby.videos.length) % hobby.videos.length;
      setMediaState({ visible: true, hobbyIdx: mediaState.hobbyIdx, idx: prevIdx, src: hobby.videos[prevIdx].src, note: hobby.videos[prevIdx].note, isImage: false });
    }
  };

  const BackgroundElements = isMounted && (
    <>
      <div className="fixed inset-0 z-0">
        {stars.map((star) => (
          <div key={star.id} className="absolute rounded-full bg-blue-300/80 animate-float" style={star.style}></div>
        ))}
      </div>
      <div className="fixed inset-0 z-0">
        {orbs.map((orb) => (
          <div key={orb.id} className="absolute rounded-full bg-indigo-500/50 blur-3xl animate-float-slow orb" style={orb.style}></div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes backgroundGradient {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .animate-background-gradient { background-size:200% 200%; animation:backgroundGradient 60s ease infinite; }
        @keyframes float {0%{transform:translateY(0) translateX(0);opacity:0.7}50%{transform:translateY(-20px) translateX(10px);opacity:1}100%{transform:translateY(0) translateX(0);opacity:0.7}}
        @keyframes float-slow {0%{transform:translateY(0) translateX(0);opacity:0.2}50%{transform:translateY(-50px) translateX(20px);opacity:0.4}100%{transform:translateY(0) translateX(0);opacity:0.2}}
        @keyframes twinkle {0%{opacity:0.5;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}100%{opacity:0.5;transform:scale(1)}}
        .animate-float { animation: float 20s ease-in-out infinite, twinkle 2s ease-in-out infinite alternate; }
        .animate-float-slow { animation: float-slow 30s ease-in-out infinite; }
        @keyframes hobbyFadeInOut {0%{opacity:0;transform:translateY(0)}50%{opacity:1;transform:translateY(-20px)}100%{opacity:0;transform:translateY(-40px)}}
      `}} />

      <div className="relative min-h-screen font-sans">
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-950 via-blue-950 to-purple-900 animate-background-gradient"></div>
        {BackgroundElements}

        <section className="relative w-full min-h-screen text-white py-24 px-8 flex flex-col items-center z-10">
          <h1 className={`text-5xl md:text-6xl font-extrabold text-center mb-12 text-blue-400 transition-opacity duration-700 ${showTitle ? "opacity-100" : "opacity-0"}`}>
            My Hobbies
          </h1>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto z-10 transition-opacity duration-700 ${showGrid ? "opacity-100" : "opacity-0"}`}>
            {hobbiesData.map((hobby, idx) => (
              <div
                key={idx}
                onClick={() => handleHobbyClick(hobby, idx)}
                onMouseEnter={() => {
                  const drops = Array.from({ length: 8 }).map(() => ({
                    id: Math.random(),
                    emoji: hobby.emojis[Math.floor(Math.random() * hobby.emojis.length)],
                    top: 50 + Math.random() * 20,
                    left: 50 + Math.random() * 20,
                    size: 14 + Math.random() * 10,
                    duration: 1 + Math.random(),
                  }));
                  setHobbyEmojis(drops);
                  setTimeout(() => setHobbyEmojis([]), 1000);
                }}
                className="group border border-blue-800/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all cursor-pointer overflow-hidden bg-gray-900/50 text-white transform hover:-translate-y-2 backdrop-blur-sm translate-z-0"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 transition-transform duration-300 group-hover:rotate-12">{hobby.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2">{hobby.title}</h3>
                </div>
                <p className="text-gray-300 text-center">{hobby.desc}</p>
              </div>
            ))}
          </div>

          {hobbyEmojis.map((drop) => (
            <span key={drop.id} className="absolute z-20 pointer-events-none select-none" style={{
              top: `${drop.top}%`,
              left: `${drop.left}%`,
              fontSize: `${drop.size}px`,
              animation: `hobbyFadeInOut ${drop.duration}s ease-in-out forwards`,
            }}>{drop.emoji}</span>
          ))}

          {/* Media Popup */}
          {mediaState.visible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setMediaState({ visible: false })}>
              <div className="relative bg-gray-900 rounded-xl shadow-2xl flex items-center p-6 max-w-4xl w-full transition-all" onClick={(e) => e.stopPropagation()}>
                {mediaState.note && (
                  <div className="flex-1 text-white text-left text-lg pr-6 flex items-center">
                    {mediaState.note}
                  </div>
                )}
                {mediaState.src && (
                  <div className="relative flex items-center transition-all duration-500">
                    {mediaState.isImage ? (
                      <img src={mediaState.src} className="w-[320px] rounded-lg shadow-lg" />
                    ) : (
                      <video src={mediaState.src} controls autoPlay className="w-[320px] rounded-lg shadow-lg" />
                    )}
                    {mediaState.hobbyIdx !== undefined && (
                      <>
                        {((mediaState.isImage && hobbiesData[mediaState.hobbyIdx].images && hobbiesData[mediaState.hobbyIdx].images!.length > 1) ||
                        (!mediaState.isImage && hobbiesData[mediaState.hobbyIdx].videos && hobbiesData[mediaState.hobbyIdx].videos!.length > 1)) && (
                          <button className="absolute left-[-40px] top-1/2 -translate-y-1/2 text-white px-3 py-2 bg-blue-600/70 rounded hover:bg-blue-500" onClick={handlePrevMedia}>◀</button>
                        )}
                        {((mediaState.isImage && hobbiesData[mediaState.hobbyIdx].images && hobbiesData[mediaState.hobbyIdx].images!.length > 1) ||
                        (!mediaState.isImage && hobbiesData[mediaState.hobbyIdx].videos && hobbiesData[mediaState.hobbyIdx].videos!.length > 1)) && (
                          <button className="absolute right-[-40px] top-1/2 -translate-y-1/2 text-white px-3 py-2 bg-blue-600/70 rounded hover:bg-blue-500" onClick={handleNextMedia}>▶</button>
                        )}
                      </>
                    )}
                  </div>
                )}
                <button className="absolute top-2 right-2 text-white text-2xl p-2 hover:text-blue-400" onClick={() => setMediaState({ visible: false })}><X /></button>
              </div>
            </div>
          )}

        </section>
      </div>
    </>
  );
}
  