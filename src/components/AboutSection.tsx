import SectionHeading from "./SectionHeading";
import { useScrollReveal } from "@/hooks/useJarvisEffects";

const AboutSection = () => {
  const { ref, revealed } = useScrollReveal();

  return (
    <section id="about" className="py-16 sm:py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading text="WHAT IS JARVIS 2.0?" />
        <div
          ref={ref}
          className={`section-reveal jarvis-panel p-6 sm:p-8 md:p-12 font-rajdhani text-base sm:text-lg leading-relaxed text-foreground space-y-4 ${revealed ? "revealed" : ""}`}
        >
          <p>
            <span className="text-primary font-semibold">JARVIS 2.0</span> is a BUILD-A-THON organized by the{" "}
            <span className="text-accent">Student Welfare and Development Cell (SWDC) — TECHNICAL Club</span>{" "}
            of Shree L. R. Tiwari College of Engineering (SLRTCE).
          </p>
          <p>
            It is a <span className="text-primary">hybrid hackathon</span> covering IoT, AI/ML, Web Development, Cloud Infrastructure and Embedded Systems.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 font-mono text-xs sm:text-sm">
            {[
              ["FORMAT", "Hybrid — Offline + Online"],
              ["OPEN TO", "All students of SLRTCE"],
              ["DATES", "13th to 15th April 2026"],
              ["VENUE", "Seminar Hall, SLRTCE, Mira Road (East), Thane — 401107"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <span className="text-accent shrink-0">[{k}]</span>
                <span className="text-muted-foreground">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
