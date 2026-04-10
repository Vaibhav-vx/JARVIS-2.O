import { useState, useCallback } from "react";
import BootSequence from "@/components/BootSequence";
import JarvisCursor from "@/components/JarvisCursor";
import JarvisBackground from "@/components/JarvisBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LegacySection from "@/components/LegacySection";
import TracksSection from "@/components/TracksSection";
import TimelineSection from "@/components/TimelineSection";
import PrizesSection from "@/components/PrizesSection";
import RegisterSection from "@/components/RegisterSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <>
      {!booted && <BootSequence onComplete={handleBootComplete} />}
      <JarvisCursor />
      <JarvisBackground />
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <LegacySection />
        <SectionDivider />
        <TracksSection />
        <SectionDivider />
        <TimelineSection />
        <SectionDivider />
        <PrizesSection />
        <SectionDivider />
        <RegisterSection />
        <SectionDivider />
        <ContactSection />
        <SectionDivider />
        <Footer />
      </div>
    </>
  );
};

export default Index;
