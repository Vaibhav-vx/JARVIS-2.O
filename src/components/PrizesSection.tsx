import SectionHeading from "./SectionHeading";
import { useTiltCard, useScrollReveal } from "@/hooks/useJarvisEffects";

const prizes = [
  { icon: "🥇", place: "1ST PLACE", desc: "Trophy + Certificate" },
  { icon: "🥈", place: "2ND PLACE", desc: "Trophy + Certificate" },
  { icon: "🥉", place: "3RD PLACE", desc: "Hard Copy Certificate Only" },
];

const PrizeCard = ({ p }: { p: typeof prizes[0] }) => {
  const { ref, handleMove, handleLeave } = useTiltCard();
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="tilt-card jarvis-panel p-6 text-center">
      <div className="hud-overlay rounded-lg" />
      <div className="relative z-10">
        <div className="text-5xl mb-4">{p.icon}</div>
        <h3 className="font-orbitron text-sm font-bold text-primary">{p.place}</h3>
        <p className="font-rajdhani text-foreground mt-2 text-sm">{p.desc}</p>
      </div>
    </div>
  );
};

const PrizesSection = () => {
  const { ref, revealed } = useScrollReveal();

  return (
    <section id="prizes" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading text="REWARDS & GLORY" />
        <div ref={ref} className={`section-reveal grid grid-cols-1 sm:grid-cols-3 gap-6 ${revealed ? "revealed" : ""}`}>
          {prizes.map((p) => (
            <PrizeCard key={p.place} p={p} />
          ))}
        </div>
        <div className="mt-8 jarvis-panel p-4 text-center">
          <p className="font-mono text-sm text-accent">
            📜 ALL PARTICIPANTS receive a Softcopy Participation Certificate
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
