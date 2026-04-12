import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { useScrollReveal } from "@/hooks/useJarvisEffects";

const stats = [
  { value: 150, suffix: "+", label: "Teams" },
  { value: 300, suffix: "+", label: "Participants" },
  { value: 1, suffix: "", label: "Epic Hackathon" },
];

// Scramble counter — shows random digits before settling
const ScrambleCounter = ({ target, suffix, label }: { target: number; suffix: string; label: string }) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const targetStr = String(target);
          const duration = 1500;
          const start = Date.now();

          const frame = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);

            if (progress < 1) {
              // Scramble: mix random digits with settled digits
              const settledCount = Math.floor(progress * targetStr.length);
              let result = "";
              for (let i = 0; i < targetStr.length; i++) {
                if (i < settledCount) {
                  result += targetStr[i];
                } else {
                  result += String(Math.floor(Math.random() * 10));
                }
              }
              setDisplay(result);
              requestAnimationFrame(frame);
            } else {
              setDisplay(targetStr);
            }
          };
          requestAnimationFrame(frame);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="jarvis-panel p-4 sm:p-6 text-center">
      <div className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-primary">
        {display}{suffix}
      </div>
      <div className="font-mono text-xs sm:text-sm text-muted-foreground mt-2 uppercase tracking-wider">{label}</div>
    </div>
  );
};

const LegacySection = () => {
  const { ref, revealed } = useScrollReveal();

  return (
    <section className="py-16 sm:py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading text="THE LEGACY — JARVIS 1.0" />
        <div
          ref={ref}
          className={`section-reveal jarvis-panel p-6 sm:p-8 md:p-12 mb-8 sm:mb-10 ${revealed ? "revealed" : ""}`}
        >
          <p className="font-rajdhani text-base sm:text-lg text-foreground leading-relaxed">
            Before JARVIS 2.0, we hosted <span className="text-accent font-semibold">JARVIS 1.0</span> — the first edition of this BUILD-A-THON at SLRTCE. It saw massive participation with over 150 teams competing, making it one of the most successful student-run hackathons at the college.
          </p>
          <p className="font-rajdhani text-lg text-foreground leading-relaxed mt-3">
            JARVIS 2.0 is built on that legacy — <span className="text-primary">bigger, better, and more challenging.</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((s) => (
            <ScrambleCounter key={s.label} target={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
