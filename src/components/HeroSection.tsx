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
      <div className="relative z-10 text-center px-4 w-full max-w-lg sm:max-w-2xl md:max-w-4xl mx-auto">
        <ArcReactor />

        <h1 className="font-orbitron text-4xl sm:text-5xl md:text-7xl font-black mt-6 sm:mt-8 tracking-wider leading-tight">
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

        <p className="font-orbitron text-base sm:text-xl md:text-2xl text-accent mt-3 tracking-widest">
          BUILD-A-THON 2026
        </p>
        <p className="font-mono text-xs sm:text-sm text-muted-foreground mt-2 tracking-wider px-2">
          Powered by SWDC TECHNICAL CLUB — SLRTCE
        </p>

        <div className="flex flex-col xs:flex-row sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
          <a
            href="https://forms.gle/9goi52ZgufXZneBk7"
            target="_blank"
            rel="noopener noreferrer"
            className="jarvis-btn register-pulse text-sm px-6 py-3"
          >
            Register Now
          </a>
          <a href="#about" className="jarvis-btn-gold text-sm px-6 py-3">
            Explore Event
          </a>
        </div>

        {/* Countdown */}
        <div className="flex justify-center gap-2 sm:gap-4 md:gap-8 mt-8 sm:mt-12">
          {[
            { val: time.d, label: "Days" },
            { val: time.h, label: "Hrs" },
            { val: time.m, label: "Min" },
            { val: time.s, label: "Sec" },
          ].map((t) => (
            <div key={t.label} className="jarvis-panel p-2 sm:p-3 md:p-4 min-w-[58px] sm:min-w-[70px]">
              <div className="flex justify-center gap-0.5">
                <FlipDigit value={t.val[0]} />
                <FlipDigit value={t.val[1]} />
              </div>
              <div className="font-mono text-[9px] sm:text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mt-1">
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
