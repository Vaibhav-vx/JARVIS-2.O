import { useScrollReveal, useLetterReveal } from "@/hooks/useJarvisEffects";

interface Props {
  text: string;
  className?: string;
}

const SectionHeading = ({ text, className = "" }: Props) => {
  const { ref, revealed } = useScrollReveal(0.3);
  const visibleCount = useLetterReveal(text, revealed, 35);

  return (
    <h2
      ref={ref}
      className={`font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 tracking-wider scan-text ${className}`}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            opacity: i < visibleCount ? 1 : 0,
            animation: i < visibleCount ? "letter-flicker 0.3s ease-out forwards" : "none",
            display: "inline-block",
            minWidth: char === " " ? "0.3em" : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </h2>
  );
};

export default SectionHeading;
