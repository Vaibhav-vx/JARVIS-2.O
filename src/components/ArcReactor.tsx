const ArcReactor = () => (
  <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
    {/* Ambient Outer Glow */}
    <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full mix-blend-screen border-none pointer-events-none" />
    
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,212,255,0.8)] z-10 relative">
      <defs>
        <radialGradient id="arcGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
          <stop offset="30%" stopColor="#00d4ff" stopOpacity="0.9"/>
          <stop offset="60%" stopColor="#00d4ff" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
        </radialGradient>
        <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4"/>
        </filter>
        <filter id="glow-blur-light">
          <feGaussianBlur stdDeviation="1.5"/>
        </filter>
      </defs>

      {/* Outer Halo */}
      <circle cx="100" cy="100" r="94" fill="none" stroke="#00d4ff" strokeWidth="2" className="opacity-50" />
      <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(0,212,255,0.2)" strokeWidth="12" filter="url(#glow-blur)" />
      
      {/* Outer Armor Ring */}
      <circle cx="100" cy="100" r="84" fill="none" stroke="#05101a" strokeWidth="16" />
      
      {/* Static dashed ring */}
      <circle cx="100" cy="100" r="84" fill="none" stroke="#00d4ff" strokeWidth="1" strokeDasharray="4 6" className="opacity-60" />

      {/* 10 Spoke Grooves on outer ring */}
      <g stroke="#00d4ff" strokeWidth="4" strokeLinecap="round" opacity="0.8">
        {[...Array(10)].map((_, i) => (
          <line 
            key={i} 
            x1="100" y1="12" 
            x2="100" y2="28" 
            transform={`rotate(${i * 36} 100 100)`} 
          />
        ))}
      </g>
      
      {/* Dark structural borders for spokes */}
      <g stroke="#030b14" strokeWidth="8" strokeLinecap="square">
        {[...Array(10)].map((_, i) => (
          <line 
            key={i} 
            x1="100" y1="28" 
            x2="100" y2="44" 
            transform={`rotate(${i * 36} 100 100)`} 
          />
        ))}
      </g>

      {/* Inner Metallic Ring */}
      <circle cx="100" cy="100" r="64" fill="none" stroke="#05101a" strokeWidth="10" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#00d4ff" strokeWidth="2" className="opacity-80" />

      {/* Background core glow behind triangle */}
      <circle cx="100" cy="105" r="50" fill="url(#arcGlow)" className="opacity-80" />

      {/* Triangle Container Glow */}
      <polygon 
        points="48,77 152,77 100,165" 
        fill="none" 
        stroke="#00d4ff" 
        strokeWidth="6" 
        filter="url(#glow-blur)"
      />
      
      {/* Main Mark VI Triangle Border */}
      <polygon 
        points="50,78 150,78 100,163" 
        fill="none" 
        stroke="#0b2438" 
        strokeWidth="6" 
      />

      {/* The bright glowing inner Triangle */}
      <polygon 
        points="57,84 143,84 100,155" 
        fill="#e6ffff" 
        filter="url(#glow-blur-light)"
      />
      
      <polygon 
        points="60,86 140,86 100,152" 
        fill="#ffffff" 
      />

      {/* Center inner Triangle Details */}
      <polygon 
        points="80,98 120,98 100,132" 
        fill="none" 
        stroke="#00a3cc" 
        strokeWidth="3" 
        filter="url(#glow-blur-light)"
      />
      <polygon 
        points="85,103 115,103 100,126" 
        fill="#ffffff" 
      />
    </svg>
  </div>
);

export default ArcReactor;
