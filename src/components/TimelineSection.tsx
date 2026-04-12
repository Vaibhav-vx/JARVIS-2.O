import SectionHeading from "./SectionHeading";
import { useScrollReveal } from "@/hooks/useJarvisEffects";

const days = [
  {
    day: "DAY 1", date: "13TH APRIL 2026",
    badge: "OFFLINE", badgeColor: "bg-destructive/20 text-destructive border-destructive/40",
    location: "Seminar Hall, SLRTCE",
    events: [
      { time: "2:00 PM", text: "Event Inauguration & Kickoff" },
      { time: "2:00 – 5:00 PM", text: "Problem Statement Declaration & Explanation (Offline)" },
      { time: "5:00 PM", text: "Online Phase Begins — Hacking Starts!" },
    ],
  },
  {
    day: "DAY 2", date: "14TH APRIL 2026",
    badge: "ONLINE", badgeColor: "bg-primary/20 text-primary border-primary/40",
    location: "Full Online — Build Day",
    events: [
      { time: "All Day", text: "Teams continue building projects online" },
      { time: "Full Day", text: "Mentoring sessions, prototyping, development" },
      { time: "", text: "This is your full build day — make it count!" },
    ],
  },
  {
    day: "DAY 3", date: "15TH APRIL 2026",
    badge: "EVALUATION", badgeColor: "bg-accent/20 text-accent border-accent/40",
    location: "Seminar Hall, SLRTCE",
    events: [
      { time: "2:45 PM onwards", text: "Selected Team Presentations (Evaluation Round)" },
      { time: "Evening", text: "Winner Announcement & Prize Distribution 🏆" },
    ],
  },
];

const TimelineDay = ({ d, index }: { d: typeof days[0]; index: number }) => {
  const { ref, revealed } = useScrollReveal(0.2);

  return (
    <div ref={ref} className="relative pl-8 sm:pl-12 md:pl-16">
      {/* Dot — blinking */}
      <div className="absolute left-1.5 sm:left-2.5 md:left-4.5 top-2 blink-dot" />

      <div
        className={`jarvis-panel timeline-draw p-4 sm:p-6 ${revealed ? "revealed" : ""}`}
        style={{ transitionDelay: `${index * 0.15}s` }}
      >
        <div className="timeline-content flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
          <span className="font-orbitron text-base sm:text-lg font-bold text-primary">{d.day}</span>
          <span className="font-mono text-[10px] sm:text-xs text-muted-foreground">— {d.date}</span>
          <span className={`font-mono text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded border ${d.badgeColor} uppercase tracking-wider`}>
            {d.badge}
          </span>
        </div>
        <p className="timeline-content font-mono text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-4">{d.location}</p>
        <div className="timeline-content space-y-2">
          {d.events.map((e, i) => (
            <div key={i} className="flex gap-2 sm:gap-3 font-rajdhani text-sm items-start">
              <div className="blink-dot shrink-0" style={{ animationDelay: `${i * 0.3}s` }} />
              {e.time && (
                <span className="font-mono text-[10px] sm:text-xs text-accent min-w-[80px] sm:min-w-[110px] md:min-w-[120px] shrink-0">{e.time}</span>
              )}
              <span className="text-foreground text-xs sm:text-sm">{e.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TimelineSection = () => (
  <section id="timeline" className="py-16 sm:py-20 px-4">
    <div className="container mx-auto max-w-3xl">
      <SectionHeading text="MISSION TIMELINE" />
      <div className="relative">
        {/* Vertical animated dashed line */}
        <svg className="absolute left-2 sm:left-4 md:left-6 top-0 bottom-0 w-1 h-full" style={{ overflow: "visible" }}>
          <line
            x1="0" y1="0" x2="0" y2="100%"
            stroke="hsl(190 100% 50% / 0.3)"
            strokeWidth="1"
            strokeDasharray="6 4"
            style={{ animation: "dash-flow 1s linear infinite" }}
          />
        </svg>
        <div className="space-y-6 sm:space-y-8">
          {days.map((d, i) => (
            <TimelineDay key={d.day} d={d} index={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TimelineSection;
