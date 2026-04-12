import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Tracks", href: "#tracks" },
  { label: "Timeline", href: "#timeline" },
  { label: "Prizes", href: "#prizes" },
  { label: "Register", href: "#register" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);

    // Track active section
    const sections = navLinks.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    );

    window.addEventListener("scroll", onScroll, { passive: true });
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-scrolled bg-background/90 backdrop-blur-md" : "bg-transparent"
      }`}
      style={{ cursor: "none" }}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="font-orbitron text-xl font-bold text-primary tracking-widest">
          JARVIS 2.0
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-scan relative font-rajdhani text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors ${
                activeSection === l.href.slice(1) ? "nav-active text-primary" : ""
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://forms.gle/9goi52ZgufXZneBk7"
            target="_blank"
            rel="noopener noreferrer"
            className="jarvis-btn register-pulse text-xs py-2 px-5"
          >
            Register Now
          </a>
        </div>

        <button className="md:hidden text-primary" onClick={() => setOpen(!open)} style={{ cursor: "none" }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Bottom line draw */}
      <div className="nav-line" />

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-primary/20 px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-orbitron text-lg uppercase tracking-widest text-muted-foreground hover:text-primary transition-all active:scale-95"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://forms.gle/9goi52ZgufXZneBk7"
            target="_blank"
            rel="noopener noreferrer"
            className="jarvis-btn register-pulse text-sm py-4 px-8 mt-4 text-center"
            onClick={() => setOpen(false)}
          >
            Register Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
