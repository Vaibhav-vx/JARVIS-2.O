import { Phone, Mail, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useTiltCard, useScrollReveal } from "@/hooks/useJarvisEffects";

const contacts = [
  { name: "Mr. Manthan Joshi", role: "Technical Incharge", phone: "+91 90043 27565" },
  { name: "Satyam Pandey", role: "Technical Head", phone: "+91 90043 91220" },
];

const ContactCard = ({ c }: { c: typeof contacts[0] }) => {
  const { ref, handleMove, handleLeave } = useTiltCard();
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="tilt-card jarvis-panel p-4 sm:p-6">
      <div className="hud-overlay rounded-lg" />
      <div className="relative z-10">
        <h3 className="font-orbitron text-xs sm:text-sm font-bold text-primary">{c.name}</h3>
        <p className="font-mono text-[10px] sm:text-xs text-muted-foreground mt-1">{c.role}</p>
        <div className="flex items-center gap-2 mt-3 text-foreground font-rajdhani">
          <Phone size={13} className="text-accent shrink-0" />
          <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="hover:text-primary transition-colors text-sm sm:text-base">
            {c.phone}
          </a>
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const { ref, revealed } = useScrollReveal();

  return (
    <section id="contact" className="py-16 sm:py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading text="CONTACT MISSION CONTROL" />
        <div ref={ref} className={`section-reveal ${revealed ? "revealed" : ""}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {contacts.map((c) => (
              <ContactCard key={c.name} c={c} />
            ))}
          </div>
          <div className="jarvis-panel p-4 sm:p-6 space-y-3 text-center">
            <div className="flex items-start sm:items-center justify-center gap-2 text-foreground font-rajdhani">
              <MapPin size={14} className="text-accent shrink-0 mt-0.5 sm:mt-0" />
              <span className="text-xs sm:text-sm break-words text-left sm:text-center">
                Shree L. R. Tiwari College of Engineering, Mira Road (East), Thane — 401 107, Maharashtra
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 text-foreground font-rajdhani">
              <Mail size={14} className="text-accent shrink-0" />
              <a href="mailto:slrtce@rahuleducation.com" className="hover:text-primary transition-colors text-xs sm:text-sm break-all">
                slrtce@rahuleducation.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
