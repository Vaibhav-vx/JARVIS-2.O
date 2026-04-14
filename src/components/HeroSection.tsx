import { useEffect, useState, useRef, useCallback } from "react";
import ArcReactor from "./ArcReactor";
import { useLetterReveal } from "@/hooks/useJarvisEffects";

import Round1Results from "./Round1Results";
import Round2Results from "./Round2Results";

const TARGET = new Date("2026-04-15T17:00:00+05:30").getTime();

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
      <span className="digit-inner inline-block font-orbitron text-2xl sm:text-4xl font-bold text-[#ff3a3a]">
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
    <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 sm:pt-16 px-4 pb-16">
      <div className="relative z-10 text-center w-full max-w-lg sm:max-w-2xl md:max-w-4xl mx-auto">
        <ArcReactor />

        <h1 className="font-orbitron text-3xl sm:text-5xl md:text-7xl font-black mt-6 sm:mt-8 tracking-wider leading-tight px-2">
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

        <p className="font-orbitron text-sm sm:text-xl md:text-2xl text-accent mt-3 tracking-widest px-4">
          BUILD-A-THON 2026
        </p>
        <p className="font-mono text-[10px] sm:text-sm text-muted-foreground mt-2 tracking-wider px-6 uppercase">
          Powered by SWDC TECHNICAL CLUB — SLRTCE
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-10 max-w-xs sm:max-w-none mx-auto">
          <a
            href="https://forms.gle/9goi52ZgufXZneBk7"
            target="_blank"
            rel="noopener noreferrer"
            className="jarvis-btn register-pulse text-xs sm:text-sm px-6 py-3 w-full sm:w-auto"
          >
            Register Now
          </a>
          <a href="#about" className="jarvis-btn-gold text-xs sm:text-sm px-6 py-3 w-full sm:w-auto">
            Explore Event
          </a>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-2 xs:flex sm:flex justify-center gap-3 sm:gap-4 md:gap-8 mt-10 sm:mt-14 max-w-md mx-auto sm:max-w-none">
          {[
            { val: time.d, label: "Days" },
            { val: time.h, label: "Hrs" },
            { val: time.m, label: "Min" },
            { val: time.s, label: "Sec" },
          ].map((t) => (
            <div key={t.label} className="jarvis-panel p-3 sm:p-4 min-w-[70px] sm:min-w-[80px] md:min-w-[100px] border-[#ff3a3a]/30 shadow-[0_0_15px_rgba(255,58,58,0.1)]">
              <div className="flex justify-center gap-1 sm:gap-1.5">
                <FlipDigit value={t.val[0]} />
                <FlipDigit value={t.val[1]} />
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-2">
                {t.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 mb-6 animate-pulse">
           <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-[#ff3a3a] tracking-[0.3em] drop-shadow-[0_0_10px_rgba(255,58,58,0.5)]">
             BUILD-A-THON IS LIVE
           </h3>
        </div>
        
        {/* Round 1 Results specific insertion */}
        <Round1Results />
        
        {/* Round 2 Results specific insertion */}
        <Round2Results />
        
        <div className="mt-8">
           <h4 className="font-orbitron sm:text-lg md:text-xl font-bold text-accent tracking-widest drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">
             Welcome The Shortlisted Team In BUILD-A-THON
           </h4>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;
