import React from 'react';

export function TraceXSymbol({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Background container */}
      <rect width="40" height="40" rx="9" fill="hsl(155 18% 18%)" />
      
      {/* Outer subtle crosshair circle */}
      <circle cx="20" cy="20" r="6" stroke="hsl(74 19% 52%)" strokeWidth="1" strokeOpacity="0.6" />
      <circle cx="20" cy="20" r="1.5" fill="hsl(74 19% 52%)" />

      {/* Crosshair ticks */}
      <line x1="20" y1="11" x2="20" y2="13" stroke="hsl(74 19% 52%)" strokeWidth="1" strokeLinecap="round" />
      <line x1="20" y1="27" x2="20" y2="29" stroke="hsl(74 19% 52%)" strokeWidth="1" strokeLinecap="round" />
      <line x1="11" y1="20" x2="13" y2="20" stroke="hsl(74 19% 52%)" strokeWidth="1" strokeLinecap="round" />
      <line x1="27" y1="20" x2="29" y2="20" stroke="hsl(74 19% 52%)" strokeWidth="1" strokeLinecap="round" />

      {/* Interconnected geometric X nodes and vectors */}
      {/* Top Left Branch */}
      <line x1="9" y1="9" x2="15" y2="15" stroke="hsl(157 24% 52%)" strokeWidth="1.2" strokeOpacity="0.8" />
      <line x1="9" y1="9" x2="17" y2="10" stroke="hsl(157 24% 52%)" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="17" y1="10" x2="15" y2="15" stroke="hsl(157 24% 52%)" strokeWidth="0.8" strokeOpacity="0.5" />
      <line x1="15" y1="15" x2="20" y2="20" stroke="hsl(74 19% 52%)" strokeWidth="1.2" />

      {/* Top Right Branch */}
      <line x1="31" y1="9" x2="25" y2="15" stroke="hsl(157 24% 52%)" strokeWidth="1.2" strokeOpacity="0.8" />
      <line x1="31" y1="9" x2="23" y2="10" stroke="hsl(157 24% 52%)" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="23" y1="10" x2="25" y2="15" stroke="hsl(157 24% 52%)" strokeWidth="0.8" strokeOpacity="0.5" />
      <line x1="25" y1="15" x2="20" y2="20" stroke="hsl(74 19% 52%)" strokeWidth="1.2" />

      {/* Bottom Left Branch */}
      <line x1="9" y1="31" x2="15" y2="25" stroke="hsl(157 24% 52%)" strokeWidth="1.2" strokeOpacity="0.8" />
      <line x1="9" y1="31" x2="17" y2="30" stroke="hsl(157 24% 52%)" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="17" y1="30" x2="15" y2="25" stroke="hsl(157 24% 52%)" strokeWidth="0.8" strokeOpacity="0.5" />
      <line x1="15" y1="25" x2="20" y2="20" stroke="hsl(74 19% 52%)" strokeWidth="1.2" />

      {/* Bottom Right Branch */}
      <line x1="31" y1="31" x2="25" y2="25" stroke="hsl(157 24% 52%)" strokeWidth="1.2" strokeOpacity="0.8" />
      <line x1="31" y1="31" x2="23" y2="30" stroke="hsl(157 24% 52%)" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="23" y1="30" x2="25" y2="25" stroke="hsl(157 24% 52%)" strokeWidth="0.8" strokeOpacity="0.5" />
      <line x1="25" y1="25" x2="20" y2="20" stroke="hsl(74 19% 52%)" strokeWidth="1.2" />

      {/* Outer corner nodes */}
      <circle cx="9" cy="9" r="2" fill="hsl(74 19% 52%)" />
      <circle cx="31" cy="9" r="2" fill="hsl(74 19% 52%)" />
      <circle cx="9" cy="31" r="2" fill="hsl(74 19% 52%)" />
      <circle cx="31" cy="31" r="2" fill="hsl(74 19% 52%)" />

      {/* Intermediate constellation nodes */}
      <circle cx="17" cy="10" r="1.5" fill="hsl(157 24% 52%)" />
      <circle cx="23" cy="10" r="1.5" fill="hsl(157 24% 52%)" />
      <circle cx="17" cy="30" r="1.5" fill="hsl(157 24% 52%)" />
      <circle cx="23" cy="30" r="1.5" fill="hsl(157 24% 52%)" />
      <circle cx="15" cy="15" r="1.8" fill="hsl(74 19% 52%)" />
      <circle cx="25" cy="15" r="1.8" fill="hsl(74 19% 52%)" />
      <circle cx="15" cy="25" r="1.8" fill="hsl(74 19% 52%)" />
      <circle cx="25" cy="25" r="1.8" fill="hsl(74 19% 52%)" />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="brand-mark" style={dark ? { color: 'hsl(var(--sidebar-foreground))' } : undefined}>
      <TraceXSymbol size={32} />
      <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.03em' }}>Trace-X</span>
    </div>
  );
}
