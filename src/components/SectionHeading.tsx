import { useScrollReveal, useLetterReveal } from "@/hooks/useJarvisEffects";

interface Props {
  text: string;
  className?: string;
}

const SectionHeading = ({ text, className = "" }: Props) => {
  const { ref, revealed } = useScrollReveal(0.3);
  const visibleCount = useLetterReveal(text, revealed, 35);

  let globalCharIndex = 0;

  return (
    <h2
      ref={ref}
      className={`font-orbitron text-[clamp(1.1rem,6vw,2.5rem)] font-bold text-center leading-tight mb-8 sm:mb-12 tracking-widest scan-text ${className}`}
    >
      {text.split(" ").map((word, wordIdx, self) => (
        <span key={wordIdx} className="inline-block">
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char) => {
              const isVisible = globalCharIndex < visibleCount;
              globalCharIndex++;
              return (
                <span
                  key={globalCharIndex}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    animation: isVisible ? "letter-flicker 0.3s ease-out forwards" : "none",
                    display: "inline-block",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
          {/* Add a space between words, but not after the last word */}
          {wordIdx < self.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </h2>
  );
};

export default SectionHeading;
