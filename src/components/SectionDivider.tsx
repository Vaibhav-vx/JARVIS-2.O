import { useScrollReveal } from "@/hooks/useJarvisEffects";

const SectionDivider = () => {
  const { ref, revealed } = useScrollReveal(0.5);
  return (
    <div
      ref={ref}
      className={`section-divider my-0 mx-auto w-full max-w-5xl ${revealed ? "revealed" : ""}`}
    />
  );
};

export default SectionDivider;
