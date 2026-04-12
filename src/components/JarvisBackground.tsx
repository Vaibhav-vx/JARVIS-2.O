import { useEffect, useRef, useCallback } from "react";

const JarvisBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Click ripple
  const handleClick = useCallback((e: MouseEvent) => {
    const ripple = document.createElement("div");
    ripple.className = "click-ripple";
    ripple.style.left = `${e.clientX - 150}px`;
    ripple.style.top = `${e.clientY - 150}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  }, []);

  // Random data flicker lines
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        const flicker = document.createElement("div");
        flicker.className = "data-flicker";
        flicker.style.top = `${Math.random() * 100}vh`;
        document.body.appendChild(flicker);
        setTimeout(() => flicker.remove(), 500);
      }
    }, 2000);

    document.addEventListener("click", handleClick);

    return () => {
      clearInterval(flickerInterval);
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  // Hex particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: `${10 + Math.random() * 15}s`,
    delay: `${Math.random() * 10}s`,
    size: `${4 + Math.random() * 8}px`,
  }));

  return (
    <div ref={containerRef} className="perspective-grid">
      {/* Background Grid */}
      <div className="grid-inner opacity-40" />

      {/* Global Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9990] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-40 mix-blend-screen" />

      {/* CRT Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[9991] bg-[radial-gradient(circle_min(80vw,50vh)_at_50%_50%,transparent_50%,rgba(0,3,10,0.8)_100%)] mix-blend-multiply" />

      {/* HUD Left Side Data */}
      <div className="fixed left-0 top-0 bottom-0 w-32 md:w-64 border-r border-[#00d4ff]/10 bg-gradient-to-r from-[#00d4ff]/5 to-transparent pointer-events-none z-0 flex-col justify-between py-12 px-4 opacity-50 hidden md:flex">
        <div className="flex flex-col gap-4">
          <div className="text-[10px] sm:text-xs font-mono text-[#00d4ff]">SYS.STATUS = [ONLINE]</div>
          <div className="h-0.5 w-full bg-[#00d4ff]/40"></div>
          <div className="grid grid-cols-2 gap-1 mt-4">
            {[...Array(12)].map((_, i) => (
              <div key={`l-${i}`} className="h-1 bg-[#00d4ff]/30 w-full animate-pulse" style={{ animationDelay: `${i * 0.1}s`, animationDuration: `${0.5 + Math.random()}s` }}></div>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <div className="w-16 h-16 rounded-full border border-[#00d4ff]/40 flex items-center justify-center animate-[spin-cw_10s_linear_infinite]">
            <div className="w-12 h-12 rounded-full border border-dashed border-[#00d4ff]/60 animate-[spin-ccw_6s_linear_infinite]" />
          </div>
        </div>
      </div>

      {/* HUD Right Side Data */}
      <div className="fixed right-0 top-0 bottom-0 w-32 md:w-64 border-l border-[#00d4ff]/10 bg-gradient-to-l from-[#00d4ff]/5 to-transparent pointer-events-none z-0 flex-col items-end justify-between py-12 px-4 opacity-50 hidden md:flex">
        <div className="flex flex-col gap-2 items-end w-full">
          <div className="text-[10px] sm:text-xs font-mono text-[#00d4ff] text-right">SEC.PROTOCOL: ALPHA</div>
          <div className="h-0.5 w-full bg-[#00d4ff]/40"></div>
          <svg width="100%" height="40" className="mt-4" preserveAspectRatio="none">
            <polyline points="0,20 20,20 30,5 50,35 60,20 100,20 120,5 140,20 200,20" fill="none" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.6" className="animate-[dash-flow_2s_linear_infinite]" strokeDasharray="5,5" />
          </svg>
        </div>
        <div className="mt-auto text-right font-mono text-[10px] text-[#00d4ff]/70 leading-relaxed">
          X: 184<br/>Y: 92<br/>Z: 14<br/>
          <span className="animate-pulse text-red-500">TRK: ACTIVE</span>
        </div>
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(0,212,255,0.08) 0%, transparent 60%)",
        }}
      />
      {/* Hex particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="hex-particle border-[#00d4ff]/30"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default JarvisBackground;
