import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, Lock, Zap, CheckCircle2 } from 'lucide-react';

export function HeroTraceVisualizer() {
  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 390,
        borderRadius: 14,
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 75% 30%, hsl(158 20% 24%), hsl(155 18% 16%) 70%)',
        border: '1px solid hsl(var(--sidebar-border))',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.3)',
      }}
    >
      {/* Background Cyber Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          opacity: 0.8,
          pointerEvents: 'none',
        }}
      />

      {/* Top Header & Live Telemetry Pill */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: 20,
          right: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--app-font-mono)',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'hsl(var(--sidebar-primary))',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'hsl(var(--sidebar-primary))',
                boxShadow: '0 0 8px hsl(var(--sidebar-primary))',
              }}
            />
            LIVE ON-CHAIN TRACE · CF-24-0198
          </div>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 9px',
            borderRadius: 99,
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            color: 'hsl(38 30% 94%)',
            fontFamily: 'var(--app-font-mono)',
            fontSize: 10,
          }}
        >
          <Zap size={11} color="hsl(var(--sidebar-primary))" />
          <span>6 HOPS RESOLVED</span>
        </div>
      </div>

      {/* Main Copy (Top Left) */}
      <div
        style={{
          position: 'absolute',
          top: 54,
          left: 20,
          maxWidth: 270,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <h3
          className="title-serif"
          style={{
            fontSize: 27,
            color: 'hsl(38 30% 96%)',
            lineHeight: 1.05,
            margin: '0 0 8px',
            letterSpacing: '-0.03em',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          A clear path from report to freeze.
        </h3>
        <p
          style={{
            fontSize: 12,
            color: 'hsl(38 30% 90% / 0.72)',
            lineHeight: 1.45,
            margin: 0,
          }}
        >
          Stolen tokens tracked across Polygon & Ethereum to an attributed VASP exit.
        </p>
      </div>

      {/* Animated SVG Network Layer */}
      <svg
        viewBox="0 0 540 380"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          overflow: 'visible',
        }}
      >
        <defs>
          {/* Neon Glow Filter */}
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Path 1: Victim (80, 260) -> Mixer Hop 1 (220, 190) */}
          <path id="flow-path-1" d="M 85 265 Q 150 220, 215 190" fill="none" />

          {/* Path 2: Mixer Hop 1 (220, 190) -> Layering Hop 2 (340, 240) */}
          <path id="flow-path-2" d="M 225 190 Q 280 150, 335 240" fill="none" />

          {/* Path 3: Layering Hop 2 (340, 240) -> VASP Exit (450, 160) */}
          <path id="flow-path-3" d="M 345 240 Q 395 285, 445 165" fill="none" />

          {/* Linear Gradients for Paths */}
          <linearGradient id="grad-path-1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(3 44% 50%)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="hsl(74 19% 52%)" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="grad-path-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(74 19% 52%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(31 68% 56%)" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="grad-path-3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(31 68% 56%)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="hsl(157 24% 55%)" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* 1. Underlying Static Tracks with Dash Pattern */}
        <path
          d="M 85 265 Q 150 220, 215 190"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
        />
        <path
          d="M 225 190 Q 280 150, 335 240"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
        />
        <path
          d="M 345 240 Q 395 285, 445 165"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* 2. Active Glowing Gradient Vectors */}
        <path
          d="M 85 265 Q 150 220, 215 190"
          stroke="url(#grad-path-1)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#neon-glow)"
        />
        <path
          d="M 225 190 Q 280 150, 335 240"
          stroke="url(#grad-path-2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#neon-glow)"
        />
        <path
          d="M 345 240 Q 395 285, 445 165"
          stroke="url(#grad-path-3)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#neon-glow)"
        />

        {/* 3. Streaming Animated Light Packets (Token Transfers) */}
        {/* Packet on Segment 1 */}
        <circle r="4.5" fill="#ffffff" filter="url(#neon-glow)">
          <animateMotion dur="2.4s" repeatCount="indefinite">
            <mpath href="#flow-path-1" />
          </animateMotion>
        </circle>
        <circle r="8" fill="hsl(3 44% 50%)" opacity="0.45">
          <animateMotion dur="2.4s" repeatCount="indefinite">
            <mpath href="#flow-path-1" />
          </animateMotion>
        </circle>

        {/* Packet on Segment 2 */}
        <circle r="4.5" fill="#ffffff" filter="url(#neon-glow)">
          <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite">
            <mpath href="#flow-path-2" />
          </animateMotion>
        </circle>
        <circle r="8" fill="hsl(74 19% 52%)" opacity="0.45">
          <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite">
            <mpath href="#flow-path-2" />
          </animateMotion>
        </circle>

        {/* Packet on Segment 3 */}
        <circle r="5" fill="#ffffff" filter="url(#neon-glow)">
          <animateMotion dur="2.4s" begin="1.6s" repeatCount="indefinite">
            <mpath href="#flow-path-3" />
          </animateMotion>
        </circle>
        <circle r="9" fill="hsl(31 68% 56%)" opacity="0.45">
          <animateMotion dur="2.4s" begin="1.6s" repeatCount="indefinite">
            <mpath href="#flow-path-3" />
          </animateMotion>
        </circle>

        {/* 4. Pulsing Radar Sonar Rings at Nodes */}
        {/* Node 1: Victim Source (85, 265) */}
        <circle cx="85" cy="265" r="14" fill="none" stroke="hsl(3 44% 50%)" strokeWidth="1.5">
          <animate attributeName="r" from="10" to="26" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.9" to="0" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="85" cy="265" r="8" fill="hsl(3 44% 46%)" stroke="#ffffff" strokeWidth="2" />

        {/* Node 2: Peel Chain Hop (220, 190) */}
        <circle cx="220" cy="190" r="12" fill="none" stroke="hsl(74 19% 52%)" strokeWidth="1.5">
          <animate attributeName="r" from="8" to="22" dur="2.2s" begin="0.7s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.8" to="0" dur="2.2s" begin="0.7s" repeatCount="indefinite" />
        </circle>
        <circle cx="220" cy="190" r="7" fill="hsl(74 19% 52%)" stroke="#ffffff" strokeWidth="2" />

        {/* Node 3: Intermediary Tumbler (340, 240) */}
        <circle cx="340" cy="240" r="12" fill="none" stroke="hsl(31 68% 56%)" strokeWidth="1.5">
          <animate attributeName="r" from="8" to="22" dur="2.2s" begin="1.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.8" to="0" dur="2.2s" begin="1.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="340" cy="240" r="7" fill="hsl(31 68% 56%)" stroke="#ffffff" strokeWidth="2" />

        {/* Node 4: CoinDCX Exchange Exit (450, 160) */}
        <circle cx="450" cy="160" r="16" fill="none" stroke="hsl(157 24% 55%)" strokeWidth="2">
          <animate attributeName="r" from="12" to="32" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="1" to="0" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="450" cy="160" r="11" fill="hsl(157 24% 42%)" stroke="#ffffff" strokeWidth="2.5" />
      </svg>

      {/* Interactive Labels & Badges Over Nodes */}
      {/* Node 1 Label: Victim Drain */}
      <div
        style={{
          position: 'absolute',
          left: 45,
          top: 295,
          background: 'rgba(0, 0, 0, 0.65)',
          border: '1px solid hsl(3 44% 44% / 0.5)',
          backdropFilter: 'blur(6px)',
          borderRadius: 6,
          padding: '4px 8px',
          color: '#ffffff',
          fontSize: 10,
          fontFamily: 'var(--app-font-mono)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        <span style={{ color: 'hsl(3 44% 65%)' }}>● VICTIM DRAIN</span>
        <div style={{ opacity: 0.65, fontSize: 9 }}>0x71c6…110a</div>
      </div>

      {/* Node 2 Label: Peel Split */}
      <div
        style={{
          position: 'absolute',
          left: 175,
          top: 135,
          background: 'rgba(0, 0, 0, 0.65)',
          border: '1px solid hsl(74 19% 52% / 0.4)',
          backdropFilter: 'blur(6px)',
          borderRadius: 6,
          padding: '4px 8px',
          color: '#ffffff',
          fontSize: 10,
          fontFamily: 'var(--app-font-mono)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        <span style={{ color: 'hsl(74 19% 65%)' }}>HOP 3 · PEEL SPLIT</span>
        <div style={{ opacity: 0.65, fontSize: 9 }}>0x3e19…88c2</div>
      </div>

      {/* Node 4 Label: CoinDCX Freeze Requisition Target */}
      <div
        style={{
          position: 'absolute',
          right: 20,
          top: 98,
          background: 'rgba(12, 35, 25, 0.85)',
          border: '1px solid hsl(157 24% 52% / 0.6)',
          backdropFilter: 'blur(8px)',
          borderRadius: 8,
          padding: '6px 10px',
          color: '#ffffff',
          fontSize: 11,
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'hsl(157 35% 65%)', fontWeight: 700, fontSize: 10, letterSpacing: '0.04em' }}>
          <CheckCircle2 size={12} /> ATTRIBUTED VASP
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, marginTop: 2 }}>CoinDCX Omnibus Vault</div>
        <div className="mono" style={{ fontSize: 9, opacity: 0.65, marginTop: 1 }}>
          Sec. 91 Freeze Order Ready
        </div>
      </div>

      {/* Bottom Floating Stats Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 20,
          right: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 14px',
          background: 'rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 8,
          backdropFilter: 'blur(8px)',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            className="pulse-soft"
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'hsl(3 44% 50%)',
            }}
          />
          <span className="mono" style={{ fontSize: 11, color: 'hsl(38 30% 95%)', fontWeight: 600 }}>
            Risk Signal: ₹2,84,700
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="mono" style={{ fontSize: 10, color: 'hsl(var(--sidebar-primary))' }}>
            Polygon ➔ Ethereum
          </span>
          <ArrowRight size={11} color="hsl(var(--sidebar-primary))" />
          <span className="mono" style={{ fontSize: 10, color: '#ffffff', fontWeight: 600 }}>
            CoinDCX
          </span>
        </div>
      </div>
    </div>
  );
}
