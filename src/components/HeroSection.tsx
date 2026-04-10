import { useEffect, useState, useRef, useCallback } from "react";
import ArcReactor from "./ArcReactor";
import { useLetterReveal } from "@/hooks/useJarvisEffects";

const TARGET = new Date("2026-04-13T14:00:00+05:30").getTime();

const FlipDigit = ({ value }: { value: string }) => {
  const prev = useRef(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (prev.current !== value) {
      setFlipping(true);
      const t = setTimeout(() => setFlipping(false), 400);
      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className={`flip-digit inline-block ${flipping ? "flipping" : ""}`}>
      <span className="digit-inner inline-block font-orbitron text-2xl sm:text-4xl font-bold text-primary">
        {value}
      </span>
    </div>
  );
};

const HeroSection = () => {
  const [time, setTime] = useState({ d: "00", h: "00", m: "00", s: "00" });
  const [booted, setBooted] = useState(false);
  const titleVisible = useLetterReveal("JARVIS 2.0", booted, 80);

  useEffect(() => {
    setBooted(true);
    const tick = () => {
      const diff = Math.max(0, TARGET - Date.now());
      setTime({
        d: String(Math.floor(diff / 86400000)).padStart(2, "0"),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const title = "JARVIS 2.0";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      <div className="relative z-10 text-center px-4">
        <ArcReactor />

        <h1 className="font-orbitron text-5xl md:text-7xl font-black mt-8 tracking-wider">
          {title.split("").map((char, i) => (
            <span
              key={i}
              className="text-primary inline-block"
              style={{
                opacity: i < titleVisible ? 1 : 0,
                animation: i < titleVisible ? "letter-flicker 0.3s ease-out forwards" : "none",
                minWidth: char === " " ? "0.3em" : undefined,
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        <p className="font-orbitron text-xl md:text-2xl text-accent mt-3 tracking-widest">
          BUILD-A-THON 2026
        </p>
        <p className="font-mono text-sm text-muted-foreground mt-2 tracking-wider">
          Powered by SWDC TECHNICAL CLUB — SLRTCE
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a
            href="https://forms.gle/9goi52ZgufXZneBk7"
            target="_blank"
            rel="noopener noreferrer"
            className="jarvis-btn register-pulse text-sm"
          >
            Register Now
          </a>
          <a href="#about" className="jarvis-btn-gold text-sm">
            Explore Event
          </a>
        </div>

        {/* Countdown */}
        <div className="flex justify-center gap-4 sm:gap-8 mt-12">
          {[
            { val: time.d, label: "Days" },
            { val: time.h, label: "Hours" },
            { val: time.m, label: "Minutes" },
            { val: time.s, label: "Seconds" },
          ].map((t) => (
            <div key={t.label} className="jarvis-panel p-3 sm:p-4 min-w-[70px]">
              <div className="flex justify-center gap-0.5">
                <FlipDigit value={t.val[0]} />
                <FlipDigit value={t.val[1]} />
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1">
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
