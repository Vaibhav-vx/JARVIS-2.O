import SectionHeading from "./SectionHeading";
import { useTiltCard, useScrollReveal } from "@/hooks/useJarvisEffects";

const tracks = [
  { icon: "🖥️", name: "SOFTWARE TRACK", desc: "Pure software projects. Web apps, mobile apps, AI/ML models, SaaS tools." },
  { icon: "⚙️", name: "HARDWARE TRACK", desc: "Pure hardware/embedded projects. Arduino, Raspberry Pi, sensors, circuits." },
  { icon: "🔗", name: "MIXED TRACK", sub: "SOFTWARE + HARDWARE", desc: "Combine both worlds. IoT systems, smart devices, embedded + cloud." },
  { icon: "💡", name: "OPEN INNOVATION", desc: "No boundaries. Any creative tech idea that solves a real problem." },
];

const TiltCard = ({ track }: { track: typeof tracks[0] }) => {
  const { ref, handleMove, handleLeave } = useTiltCard();

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="tilt-card jarvis-panel p-6"
    >
      <div className="hud-overlay rounded-lg" />
      <div className="relative z-10">
        <div className="text-4xl mb-3">{track.icon}</div>
        <h3 className="font-orbitron text-lg font-bold text-primary">{track.name}</h3>
        {track.sub && <span className="font-mono text-xs text-muted-foreground">{track.sub}</span>}
        <p className="font-rajdhani text-foreground mt-2">{track.desc}</p>
      </div>
    </div>
  );
};

const TracksSection = () => {
  const { ref, revealed } = useScrollReveal();

  return (
    <section id="tracks" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading text="CHOOSE YOUR TRACK" />
        <div
          ref={ref}
          className={`section-reveal grid grid-cols-1 sm:grid-cols-2 gap-6 ${revealed ? "revealed" : ""}`}
        >
          {tracks.map((t) => (
            <TiltCard key={t.name} track={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TracksSection;
