import { useEffect, useState, useRef } from "react";

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [started, setStarted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Load YouTube Iframe API dynamically
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("youtube-player", {
        height: "100%",
        width: "100%",
        videoId: "6i5hho2aD-E",
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
        },
        events: {
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.ENDED) {
              setFadeOut(true);
              setTimeout(() => {
                onComplete();
              }, 1000);
            }
          },
        },
      });
    };

    return () => {
      (window as any).onYouTubeIframeAPIReady = null;
    };
  }, [onComplete]);

  const handleStart = () => {
    setStarted(true);
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo();
    }
  };

  const handleSkip = () => {
    setFadeOut(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black flex items-center justify-center transition-opacity duration-1000"
      style={{ opacity: fadeOut ? 0 : 1, pointerEvents: fadeOut ? "none" : "auto" }}
    >
      {!started && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#010810]">
          <h1 className="font-orbitron font-bold text-3xl mb-8 tracking-[0.2em] text-[#00d4ff]/80 animate-pulse">JARVIS PROTOCOL</h1>
          <button
            onClick={handleStart}
            className="px-8 py-4 border border-[#00d4ff] text-[#00d4ff] font-orbitron font-bold tracking-widest hover:bg-[#00d4ff]/20 hover:scale-105 active:scale-95 transition-all rounded shadow-[0_0_15px_rgba(0,212,255,0.4)] cursor-pointer"
          >
            INITIALIZE SEQUENCE
          </button>
        </div>
      )}

      {/* The video container */}
      <div className={`w-full h-full ${started ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        <div id="youtube-player" className="w-full h-full pointer-events-none" />
      </div>
      
      {started && (
        <button 
          onClick={handleSkip}
          className="absolute bottom-8 right-8 z-10 text-[#00d4ff]/40 font-mono text-sm hover:text-[#00d4ff] transition-all cursor-pointer"
        >
          [ SKIP SEQUENCE ]
        </button>
      )}
    </div>
  );
};

export default BootSequence;
