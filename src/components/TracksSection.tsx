import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useScrollReveal } from "@/hooks/useJarvisEffects";

const domains = [
  {
    icon: "💻",
    name: "SOFTWARE DOMAIN",
    tracks: [
      { 
        name: "🤖 Track 1 — AI & Automation", 
        ideas: "Build an AI-powered personal assistant that automates daily campus tasks — class schedules, assignment reminders, attendance tracking, and faculty announcements — using NLP and a chatbot interface." 
      },
      { 
        name: "🔐 Track 2 — Cybersecurity & Privacy", 
        ideas: "Develop a browser extension or mobile app that detects phishing links, fake websites, and fraudulent UPI QR codes in real time, alerting users before they share sensitive data." 
      },
      { 
        name: "🏥 Track 3 — HealthTech", 
        ideas: "Create a telemedicine platform for rural users that connects patients with doctors via video, offers a multilingual AI symptom checker, and maintains a digital health record accessible offline." 
      },
      { 
        name: "💰 Track 4 — FinTech", 
        ideas: "Design a personal finance app for college students that tracks expenses, categorizes spending, predicts savings goals using AI, and flags suspicious transactions automatically." 
      },
      { 
        name: "🏫 Track 5 — Smart Education", 
        ideas: "Build an adaptive learning platform that identifies a student's weak areas through quizzes, recommends personalized study content, and tracks placement readiness with a live dashboard." 
      }
    ]
  },
  {
    icon: "🔧",
    name: "HARDWARE DOMAIN",
    tracks: [
      { 
        name: "⚡ Track 1 — Smart Energy Systems", 
        ideas: "Design a solar-powered smart energy monitoring system using IoT sensors that tracks real-time power consumption in a building, identifies wastage, and sends alerts when usage crosses a set threshold." 
      },
      { 
        name: "🤖 Track 2 — Robotics & Automation", 
        ideas: "Build an obstacle-avoiding autonomous robot that can navigate a college campus to deliver small items (documents, stationery) between departments without human intervention." 
      },
      { 
        name: "🌿 Track 3 — Green & Clean Tech", 
        ideas: "Develop a smart waste segregation bin using sensors and a servo mechanism that automatically sorts waste into dry, wet, and hazardous categories and sends a collection alert when full." 
      },
      { 
        name: "🏥 Track 4 — Medical Devices", 
        ideas: "Create a low-cost wearable health band that monitors heart rate, SpO2, and body temperature in real time and triggers an emergency SMS alert to a caregiver if readings go critical." 
      },
      { 
        name: "🚗 Track 5 — Smart Mobility", 
        ideas: "Build a vehicle blind-spot detection system using ultrasonic sensors and an alert buzzer/LED panel that warns drivers of objects in blind zones during low-speed maneuvering." 
      }
    ]
  },
  {
    icon: "🔀",
    name: "MIXED DOMAIN",
    sub: "SOFTWARE + HARDWARE",
    tracks: [
      { 
        name: "🏙️ Track 1 — Smart City Solutions", 
        ideas: "Develop an IoT-based smart street lighting system where lights auto-adjust brightness based on pedestrian presence, combined with a web dashboard showing real-time energy savings per zone." 
      },
      { 
        name: "🌾 Track 2 — AgriTech", 
        ideas: "Build a soil health monitoring device with NPK and moisture sensors that sends real-time data to a mobile app, which uses AI to recommend the best crop, fertilizer quantity, and irrigation schedule." 
      },
      { 
        name: "🏠 Track 3 — Home & Campus Automation", 
        ideas: "Create a smart classroom system where attendance is auto-recorded using RFID/face detection hardware, connected to a college management web app that notifies parents and faculty instantly." 
      },
      { 
        name: "🚨 Track 4 — Disaster & Safety Tech", 
        ideas: "Design a flood/fire early warning system using water-level and smoke sensors that triggers local sirens and simultaneously pushes real-time alerts to a mobile app with evacuation route mapping." 
      },
      { 
        name: "🏭 Track 5 — Industry 4.0", 
        ideas: "Build a predictive maintenance system for industrial machines using vibration and temperature sensors (Arduino/Raspberry Pi) paired with a cloud dashboard that predicts failure before it happens using ML." 
      }
    ]
  },
  {
    icon: "💡",
    name: "OPEN INNOVATION",
    desc: "No boundaries. Any creative tech idea that solves a real problem.",
    tracks: []
  },
];

const DomainAccordion = ({ domain, isOpen, onToggle }: { domain: typeof domains[0]; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className={`jarvis-panel mb-4 overflow-hidden transition-all duration-300 ${isOpen ? "border-primary/60 shadow-[0_0_20px_rgba(0,212,255,0.15)]" : "border-primary/20"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-primary/5 transition-colors group"
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">{domain.icon}</span>
          <div>
            <h3 className="font-orbitron text-base sm:text-xl font-bold text-primary tracking-wider">{domain.name}</h3>
            {domain.sub && <p className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase">{domain.sub}</p>}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-primary/60"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-6">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-6" />
              
              {domain.desc && (
                <p className="font-rajdhani text-sm sm:text-lg text-foreground mb-6 leading-relaxed italic">
                  {domain.desc}
                </p>
              )}

              <div className="grid grid-cols-1 gap-6">
                {domain.tracks.map((track, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(255,215,0,0.6)] mt-1.5" />
                        <div className="flex-grow w-px bg-primary/10 mt-2" />
                      </div>
                      <div className="flex-grow pb-2">
                        <h4 className="font-orbitron text-xs sm:text-sm font-bold text-accent uppercase tracking-widest mb-2 flex items-center gap-2">
                          <span className="w-1 h-3 bg-accent/30 rounded-full" />
                          {track.name}
                        </h4>
                        <div className="jarvis-panel p-3 bg-primary/5 border-primary/10 group-hover:border-primary/30 transition-colors">
                          <p className="font-rajdhani text-[11px] sm:text-sm text-foreground leading-relaxed break-words">
                            {track.ideas}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TracksSection = () => {
  const { ref, revealed } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null); // All closed by default

  return (
    <section id="tracks" className="py-16 sm:py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading text="CHOOSE YOUR TRACK" />
        <div
          ref={ref}
          className={`section-reveal ${revealed ? "revealed" : ""}`}
        >
          {domains.map((d, index) => (
            <DomainAccordion
              key={d.name}
              domain={d}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TracksSection;
