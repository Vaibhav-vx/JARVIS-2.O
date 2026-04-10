import { useEffect, useState, useCallback } from "react";

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState("");
  const [showReady, setShowReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const fullText = "INITIALIZING JARVIS 2.0...";

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 60);

    const readyTimer = setTimeout(() => setShowReady(true), 2200);
    const fadeTimer = setTimeout(() => setFadeOut(true), 3000);
    const doneTimer = setTimeout(() => onComplete(), 3500);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(readyTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="boot-screen"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease-out",
      }}
    >
      <div className="boot-text">{text}<span className="animate-pulse">_</span></div>
      <div className="boot-bar">
        <div className="boot-bar-fill" />
      </div>
      {showReady && (
        <div className="boot-ready mt-4">ALL SYSTEMS OPERATIONAL</div>
      )}
    </div>
  );
};

export default BootSequence;
