import SectionHeading from "./SectionHeading";
import { useTiltCard, useScrollReveal } from "@/hooks/useJarvisEffects";

const prizes = [
  { icon: "🥇", place: "1ST PLACE", desc: "Winner: Team Elevate" },
  { icon: "🥈", place: "2ND PLACE", desc: "Runner Up: Team Errorist" },
  { icon: "🥉", place: "3RD PLACE", desc: "Runner Up: Snake" },
];

const trackWinners = [
  { 
    track: "SOFTWARE TRACK", 
    winners: [
      { rank: "1st", team: "NeuralX" },
      { rank: "2nd", team: "Elevate" }
    ] 
  },
  { 
    track: "HARDWARE TRACK", 
    winners: [
      { rank: "Winner", team: "HackU" }
    ] 
  },
  { 
    track: "OPEN INNOVATION", 
    winners: [
      { rank: "Winner", team: "CTRLFREAKS" }
    ] 
  },
];

const PrizeCard = ({ p }: { p: typeof prizes[0] }) => {
  const { ref, handleMove, handleLeave } = useTiltCard();
  
  let borderClass = "border-primary/40 shadow-[0_0_15px_rgba(0,212,255,0.1)]"; 
  let textClass = "text-primary";
  let bgClass = "";
  
  if (p.place === "1ST PLACE") {
    borderClass = "border-yellow-400/60 shadow-[0_0_30px_rgba(250,204,21,0.25)]";
    textClass = "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]";
    bgClass = "bg-yellow-400/5";
  } else if (p.place === "2ND PLACE") {
    borderClass = "border-gray-300/60 shadow-[0_0_25px_rgba(209,213,219,0.2)]";
    textClass = "text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.5)]";
    bgClass = "bg-gray-300/5";
  } else if (p.place === "3RD PLACE") {
    borderClass = "border-orange-400/60 shadow-[0_0_25px_rgba(251,146,60,0.2)]";
    textClass = "text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]";
    bgClass = "bg-orange-400/5";
  }

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={`tilt-card jarvis-panel p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:scale-105 ${borderClass} ${bgClass}`}>
      <div className="hud-overlay rounded-lg" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 animate-pulse">{p.icon}</div>
        <h3 className={`font-orbitron text-sm sm:text-base font-black tracking-[0.2em] mb-4 ${textClass}`}>{p.place}</h3>
        <div className="w-full pt-4 border-t border-current/20 mt-auto">
          <p className={`font-rajdhani font-bold text-lg sm:text-xl tracking-wider ${textClass}`}>{p.desc}</p>
        </div>
      </div>
    </div>
  );
};

const TrackWinnerCard = ({ t }: { t: typeof trackWinners[0] }) => {
  const { ref, handleMove, handleLeave } = useTiltCard();
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="tilt-card relative text-center rounded-lg overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
      <div className="relative jarvis-panel p-5 sm:p-6 h-full bg-background/95 border-primary/50 shadow-[0_0_15px_rgba(0,212,255,0.15)] group-hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-300">
        <div className="hud-overlay rounded-lg" />
        <div className="relative z-10 flex flex-col h-full">
          <h4 className="font-orbitron text-sm sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent border-b border-primary/30 pb-3 mb-4">{t.track}</h4>
          <div className="flex flex-col gap-3 mt-auto">
            {t.winners.map((w, idx) => (
              <div key={idx} className="flex justify-between items-center px-3 py-2 bg-gradient-to-r from-primary/10 to-transparent border-l-2 border-primary rounded-r transition-transform duration-300 group-hover:translate-x-1">
                <span className="font-mono text-xs text-primary/70">{w.rank}</span>
                <span className="font-rajdhani text-base sm:text-lg font-bold text-white tracking-wide">{w.team}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PrizesSection = () => {
  const { ref: mainRef, revealed: mainRevealed } = useScrollReveal();
  const { ref: trackRef, revealed: trackRevealed } = useScrollReveal();

  return (
    <section id="prizes" className="py-16 sm:py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading text="REWARDS & GLORY" />
        
        {/* Main Winners */}
        <div ref={mainRef} className={`section-reveal grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 ${mainRevealed ? "revealed" : ""}`}>
          {prizes.map((p) => (
            <PrizeCard key={p.place} p={p} />
          ))}
        </div>

        {/* Track Winners */}
        <div ref={trackRef} className={`section-reveal mt-8 ${trackRevealed ? "revealed" : ""}`}>
          <h3 className="font-orbitron text-lg text-center text-primary mb-4 tracking-widest">TRACK CHAMPIONS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {trackWinners.map((t) => (
              <TrackWinnerCard key={t.track} t={t} />
            ))}
          </div>
        </div>

        <div className="mt-8 jarvis-panel p-3 sm:p-4 text-center">
          <p className="font-mono text-xs sm:text-sm text-accent">
            📜 ALL PARTICIPANTS receive a Softcopy Participation Certificate
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
