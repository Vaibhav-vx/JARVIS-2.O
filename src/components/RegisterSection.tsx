import SectionHeading from "./SectionHeading";
import { useScrollReveal } from "@/hooks/useJarvisEffects";

const chips = [
  "Team Size: 2–4 Members",
  "Deadline: 12 April 2026",
  "Open to All SLRTCE Students",
];

const RegisterSection = () => {
  const { ref, revealed } = useScrollReveal();

  return (
    <section id="register" className="py-20 px-4">
      <div ref={ref} className={`section-reveal container mx-auto max-w-3xl text-center ${revealed ? "revealed" : ""}`}>
        <SectionHeading text="INITIATE REGISTRATION" />
        <p className="font-rajdhani text-lg text-foreground mb-4">
          Form your team and register before the deadline. Team size: <span className="text-primary">2–4 members</span>.
        </p>
        <p className="font-mono text-sm text-muted-foreground mb-8">
          Registration Deadline: 12th April 2026, 11:59 PM
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {chips.map((c) => (
            <span key={c} className="font-mono text-xs jarvis-panel px-4 py-2 text-muted-foreground">
              {c}
            </span>
          ))}
        </div>
        <a
          href="https://forms.gle/9goi52ZgufXZneBk7"
          target="_blank"
          rel="noopener noreferrer"
          className="jarvis-btn register-pulse text-base px-12 py-4 inline-block"
        >
          REGISTER NOW
        </a>
      </div>
    </section>
  );
};

export default RegisterSection;
