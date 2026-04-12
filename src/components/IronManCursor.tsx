import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IronManCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const moveTimer = useRef<NodeJS.Timeout | null>(null);
  const prevPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    
    setPosition({ x, y });
    setIsMoving(true);

    // Calculate rotation based on movement direction
    const dx = x - prevPos.current.x;
    const dy = y - prevPos.current.y;
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      setRotation(angle + 90); // Adjusting so head faces forward
    }
    prevPos.current = { x, y };

    if (moveTimer.current) clearTimeout(moveTimer.current);
    moveTimer.current = setTimeout(() => {
      setIsMoving(false);
    }, 150);
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
    setClicks((prev) => [...prev, newClick]);
    setTimeout(() => {
      setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
    }, 1000);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
    };
  }, [handleMouseMove, handleClick]);

  // Hide on touch
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* Click Shockwaves */}
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute rounded-full border border-primary/50"
            style={{
              left: click.x,
              top: click.y,
              width: 100,
              height: 100,
              marginLeft: -50,
              marginTop: -50,
              boxShadow: "0 0 20px hsl(190 100% 50% / 0.5)",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Landing Shockwave (on stop) */}
      <AnimatePresence>
        {!isMoving && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.6 }}
            className="absolute rounded-full border-2 border-primary/30"
            style={{
              left: position.x,
              top: position.y,
              width: 60,
              height: 60,
              marginLeft: -30,
              marginTop: -30,
            }}
          />
        )}
      </AnimatePresence>

      {/* The Iron Man Character */}
      <motion.div
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          rotate: isMoving ? rotation : 0,
          scale: isMoving ? 1.1 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.5 }}
        className="relative"
      >
        {isMoving ? (
          /* FLYING STATE */
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]">
            <path
              d="M12 2L8 6V11L4 14V17H8L12 21L16 17H20V14L16 11V6L12 2Z"
              fill="currentColor"
              className="text-primary"
            />
            {/* Repulsor Glows */}
            <motion.circle
              cx="12" cy="22" r="2"
              fill="#00d4ff"
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 0.2 }}
            />
          </svg>
        ) : (
          /* LANDING STATE (Knee Down) */
          <motion.svg
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            width="40" height="40" viewBox="0 0 24 24" fill="none"
            className="drop-shadow-[0_0_12px_rgba(0,212,255,0.9)]"
          >
            <path
              d="M12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4ZM7 22H11V16H13V22H17V12H7V22Z"
              fill="currentColor"
              className="text-primary"
            />
            {/* Eyes Glow */}
            <circle cx="11" cy="5.5" r="0.5" fill="white" />
            <circle cx="13" cy="5.5" r="0.5" fill="white" />
          </motion.svg>
        )}

        {/* Repulsor Particles (only when moving) */}
        {isMoving && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0, opacity: 0.8, scale: 1 }}
                animate={{ y: 20, opacity: 0, scale: 0.5 }}
                transition={{ repeat: Infinity, duration: 0.3, delay: i * 0.1 }}
                className="w-1 h-3 bg-primary/60 blur-[1px] rounded-full"
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default IronManCursor;
