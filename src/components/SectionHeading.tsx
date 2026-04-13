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
      className={`font-orbitron text-xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 tracking-wider scan-text flex flex-wrap justify-center gap-x-[0.3em] gap-y-1 ${className}`}
    >
      {text.split(" ").map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
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
      ))}
    </h2>
  );
};

export default SectionHeading;
