import { useEffect, useRef, useCallback } from "react";

const JarvisCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const trailContainer = useRef<HTMLDivElement>(null);
  const lastTrail = useRef(0);

  const moveCursor = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    }
    // Trail
    const now = Date.now();
    if (now - lastTrail.current > 40 && trailContainer.current) {
      lastTrail.current = now;
      const dot = document.createElement("div");
      dot.className = "cursor-trail";
      dot.style.left = `${e.clientX - 2}px`;
      dot.style.top = `${e.clientY - 2}px`;
      trailContainer.current.appendChild(dot);
      setTimeout(() => dot.remove(), 400);
    }
  }, []);

  useEffect(() => {
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [role='button'], .jarvis-btn, .jarvis-btn-gold, .tilt-card");
      if (clickable && cursorRef.current) {
        cursorRef.current.classList.add("hovering");
        isHovering.current = true;
      }
    };
    const handleOut = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("hovering");
        isHovering.current = false;
      }
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [moveCursor]);

  // Hide on touch devices
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  return (
    <>
      <div ref={trailContainer} />
      <div ref={cursorRef} className="jarvis-cursor">
        <div className="crosshair-v" />
        <div className="crosshair-h" />
        <div className="crosshair-ring" />
      </div>
    </>
  );
};

export default JarvisCursor;
