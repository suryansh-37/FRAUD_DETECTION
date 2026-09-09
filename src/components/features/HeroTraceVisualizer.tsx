import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, Lock, Zap, CheckCircle2, Database, Cpu, Layers } from 'lucide-react';

export function HeroTraceVisualizer() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 410,
        borderRadius: 14,
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 65% 35%, #182821 0%, #0d1713 70%, #080f0c 100%)',
        border: '1px solid hsl(var(--sidebar-border))',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), 0 20px 48px rgba(0,0,0,0.4)',
      }}
    >
      {/* 1. Subtle Circuit/Grid Mesh Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(74, 222, 128, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 222, 128, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '22px 22px',
          pointerEvents: 'none',
        }}
      />

      {/* 2. Top Header HUD: Consensus & Network Telemetry */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 18,
          right: 18,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            className="pulse-soft"
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'hsl(74 19% 52%)',
              boxShadow: '0 0 10px hsl(74 19% 52%)',
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'hsl(var(--sidebar-primary))',
              fontWeight: 700,
            }}
          >
            DECENTRALIZED LEDGER · BLOCK #21,984,310
          </span>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '4px 10px',
            borderRadius: 99,
            background: 'rgba(0, 0, 0, 0.55)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            color: 'hsl(38 30% 94%)',
            fontFamily: 'var(--app-font-mono)',
            fontSize: 9,
          }}
        >
          <Layers size={11} color="hsl(var(--sidebar-primary))" />
          <span>CONSENSUS VERIFIED · 14 PEERS</span>
        </div>
      </div>

      {/* 3. Headline & Description */}
      <div
        style={{
          position: 'absolute',
          top: 44,
          left: 18,
          maxWidth: 260,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <h3
          className="title-serif"
          style={{
            fontSize: 26,
            color: 'hsl(38 30% 96%)',
            lineHeight: 1.05,
            margin: '0 0 6px',
            letterSpacing: '-0.03em',
            textShadow: '0 2px 10px rgba(0,0,0,0.6)',
          }}
        >
          A clear path from report to freeze.
        </h3>
        <p
          style={{
            fontSize: 11,
            color: 'hsl(38 30% 90% / 0.72)',
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          De-anonymizing transaction graphs across multi-chain validator blocks.
        </p>
      </div>

      {/* 4. Full SVG Blockchain Network Topology */}
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
          {/* Neon Glow Filters */}
          <filter id="chain-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="intense-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Core Forensic Flow Tracks */}
          <path id="path-mempool-to-b1" d="M 60 280 L 150 240" fill="none" />
          <path id="path-b1-to-b2" d="M 150 240 Q 230 180, 270 230" fill="none" />
          <path id="path-b2-to-b3" d="M 270 230 Q 320 280, 390 190" fill="none" />
          <path id="path-b3-to-vasp" d="M 390 190 L 470 140" fill="none" />

          {/* Secondary Network Mesh Channels */}
          <path id="mesh-peer-1" d="M 150 240 L 220 310" fill="none" />
          <path id="mesh-peer-2" d="M 220 310 L 330 320" fill="none" />
          <path id="mesh-peer-3" d="M 330 320 L 390 190" fill="none" />
          <path id="mesh-peer-4" d="M 270 230 L 340 140" fill="none" />
          <path id="mesh-peer-5" d="M 340 140 L 470 140" fill="none" />
          <path id="mesh-peer-6" d="M 150 140 L 270 120" fill="none" />
        </defs>

        {/* --- LAYER A: P2P Background Mesh Links --- */}
        <g stroke="rgba(74, 222, 128, 0.18)" strokeWidth="1" strokeDasharray="3 3" fill="none">
          <line x1="150" y1="240" x2="220" y2="310" />
          <line x1="220" y1="310" x2="330" y2="320" />
          <line x1="330" y1="320" x2="390" y2="190" />
          <line x1="270" y1="230" x2="340" y2="140" />
          <line x1="340" y1="140" x2="470" y2="140" />
          <line x1="150" y1="240" x2="150" y2="140" />
          <line x1="150" y1="140" x2="270" y2="120" />
          <line x1="270" y1="120" x2="340" y2="140" />
          <line x1="60" y1="280" x2="110" y2="330" />
          <line x1="110" y1="330" x2="220" y2="310" />
        </g>

        {/* Ambient P2P Network Packets */}
        <circle r="2" fill="hsl(74 19% 52%)" opacity="0.6">
          <animateMotion dur="4s" repeatCount="indefinite">
            <mpath href="#mesh-peer-1" />
          </animateMotion>
        </circle>
        <circle r="2" fill="hsl(74 19% 52%)" opacity="0.6">
          <animateMotion dur="3.5s" repeatCount="indefinite">
            <mpath href="#mesh-peer-2" />
          </animateMotion>
        </circle>
        <circle r="2" fill="hsl(74 19% 52%)" opacity="0.6">
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href="#mesh-peer-4" />
          </animateMotion>
        </circle>

        {/* --- LAYER B: Primary Blockchain Highway / Mined Blocks Links --- */}
        {/* Glowing Backbone Lines */}
        <path
          d="M 60 280 L 150 240"
          stroke="hsl(3 44% 50%)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#chain-glow)"
        />
        <path
          d="M 150 240 Q 230 180, 270 230"
          stroke="hsl(74 19% 52%)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#chain-glow)"
        />
        <path
          d="M 270 230 Q 320 280, 390 190"
          stroke="hsl(31 68% 56%)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#chain-glow)"
        />
        <path
          d="M 390 190 L 470 140"
          stroke="hsl(157 24% 55%)"
          strokeWidth="3"
          fill="none"
          filter="url(#intense-glow)"
        />

        {/* --- LAYER C: Live Streaming Transaction Hash Pulses --- */}
        {/* Pulse 1: Mempool -> Block 1 */}
        <circle r="4" fill="#ffffff" filter="url(#chain-glow)">
          <animateMotion dur="2.2s" repeatCount="indefinite">
            <mpath href="#path-mempool-to-b1" />
          </animateMotion>
        </circle>
        <circle r="8" fill="hsl(3 44% 50%)" opacity="0.4">
          <animateMotion dur="2.2s" repeatCount="indefinite">
            <mpath href="#path-mempool-to-b1" />
          </animateMotion>
        </circle>

        {/* Pulse 2: Block 1 -> Block 2 */}
        <circle r="4" fill="#ffffff" filter="url(#chain-glow)">
          <animateMotion dur="2.2s" begin="0.55s" repeatCount="indefinite">
            <mpath href="#path-b1-to-b2" />
          </animateMotion>
        </circle>
        <circle r="8" fill="hsl(74 19% 52%)" opacity="0.4">
          <animateMotion dur="2.2s" begin="0.55s" repeatCount="indefinite">
            <mpath href="#path-b1-to-b2" />
          </animateMotion>
        </circle>

        {/* Pulse 3: Block 2 -> Block 3 */}
        <circle r="4" fill="#ffffff" filter="url(#chain-glow)">
          <animateMotion dur="2.2s" begin="1.1s" repeatCount="indefinite">
            <mpath href="#path-b2-to-b3" />
          </animateMotion>
        </circle>
        <circle r="8" fill="hsl(31 68% 56%)" opacity="0.4">
          <animateMotion dur="2.2s" begin="1.1s" repeatCount="indefinite">
            <mpath href="#path-b2-to-b3" />
          </animateMotion>
        </circle>

        {/* Pulse 4: Block 3 -> VASP Requisition */}
        <circle r="5" fill="#ffffff" filter="url(#intense-glow)">
          <animateMotion dur="2.2s" begin="1.65s" repeatCount="indefinite">
            <mpath href="#path-b3-to-vasp" />
          </animateMotion>
        </circle>
        <circle r="10" fill="hsl(157 24% 55%)" opacity="0.5">
          <animateMotion dur="2.2s" begin="1.65s" repeatCount="indefinite">
            <mpath href="#path-b3-to-vasp" />
          </animateMotion>
        </circle>

        {/* --- LAYER D: Blockchain Validator Blocks (Hex / Isometric Boxes) --- */}

        {/* Node 1: Victim Source / Mempool (60, 280) */}
        <g transform="translate(60, 280)">
          <circle r="16" fill="none" stroke="hsl(3 44% 50%)" strokeWidth="1.5">
            <animate attributeName="r" from="10" to="24" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.9" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Hexagon Box */}
          <polygon
            points="0,-12 10,-6 10,6 0,12 -10,6 -10,-6"
            fill="hsl(3 44% 35%)"
            stroke="hsl(3 44% 65%)"
            strokeWidth="1.5"
          />
          <circle r="3" fill="#ffffff" />
        </g>

        {/* Node 2: Block #21,984,308 (150, 240) */}
        <g transform="translate(150, 240)">
          <rect
            x="-18"
            y="-14"
            width="36"
            height="28"
            rx="5"
            fill="hsl(155 18% 18%)"
            stroke="hsl(74 19% 52%)"
            strokeWidth="1.5"
          />
          <text x="0" y="3" textAnchor="middle" fill="hsl(74 19% 52%)" fontSize="8" fontFamily="var(--app-font-mono)" fontWeight="700">
            #308
          </text>
        </g>

        {/* Node 3: Block #21,984,309 · Layering Hop (270, 230) */}
        <g transform="translate(270, 230)">
          <circle r="14" fill="none" stroke="hsl(74 19% 52%)" strokeWidth="1">
            <animate attributeName="r" from="10" to="22" dur="2s" begin="0.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.8" to="0" dur="2s" begin="0.6s" repeatCount="indefinite" />
          </circle>
          <rect
            x="-18"
            y="-14"
            width="36"
            height="28"
            rx="5"
            fill="hsl(155 18% 18%)"
            stroke="hsl(74 19% 52%)"
            strokeWidth="1.5"
          />
          <text x="0" y="3" textAnchor="middle" fill="hsl(74 19% 52%)" fontSize="8" fontFamily="var(--app-font-mono)" fontWeight="700">
            #309
          </text>
        </g>

        {/* Node 4: Block #21,984,310 · Peel Splitting (390, 190) */}
        <g transform="translate(390, 190)">
          <circle r="14" fill="none" stroke="hsl(31 68% 56%)" strokeWidth="1">
            <animate attributeName="r" from="10" to="22" dur="2s" begin="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.8" to="0" dur="2s" begin="1.2s" repeatCount="indefinite" />
          </circle>
          <rect
            x="-18"
            y="-14"
            width="36"
            height="28"
            rx="5"
            fill="hsl(155 18% 18%)"
            stroke="hsl(31 68% 56%)"
            strokeWidth="1.5"
          />
          <text x="0" y="3" textAnchor="middle" fill="hsl(31 68% 56%)" fontSize="8" fontFamily="var(--app-font-mono)" fontWeight="700">
            #310
          </text>
        </g>

        {/* Node 5: Destination Exchange Hub (CoinDCX Omnibus Vault) (470, 140) */}
        <g transform="translate(470, 140)">
          <circle r="18" fill="none" stroke="hsl(157 24% 55%)" strokeWidth="2">
            <animate attributeName="r" from="14" to="34" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="1" to="0" dur="1.8s" repeatCount="indefinite" />
          </circle>
          {/* Hexagon Hub */}
          <polygon
            points="0,-16 14,-8 14,8 0,16 -14,8 -14,-8"
            fill="hsl(157 24% 28%)"
            stroke="hsl(157 24% 65%)"
            strokeWidth="2"
          />
          <circle r="4" fill="#ffffff" />
        </g>

        {/* Auxiliary Peer Nodes in Network Mesh */}
        <circle cx="220" cy="310" r="6" fill="hsl(155 18% 22%)" stroke="hsl(74 19% 52%)" strokeWidth="1" />
        <circle cx="330" cy="320" r="6" fill="hsl(155 18% 22%)" stroke="hsl(74 19% 52%)" strokeWidth="1" />
        <circle cx="340" cy="140" r="6" fill="hsl(155 18% 22%)" stroke="hsl(74 19% 52%)" strokeWidth="1" />
        <circle cx="150" cy="140" r="6" fill="hsl(155 18% 22%)" stroke="hsl(74 19% 52%)" strokeWidth="1" />
        <circle cx="270" cy="120" r="6" fill="hsl(155 18% 22%)" stroke="hsl(74 19% 52%)" strokeWidth="1" />
        <circle cx="110" cy="330" r="5" fill="hsl(155 18% 22%)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      </svg>

      {/* 5. Cryptographic Floating Terminal Badges */}

      {/* Victim Mempool Badge */}
      <div
        style={{
          position: 'absolute',
          left: 20,
          top: 310,
          background: 'rgba(10, 15, 12, 0.85)',
          border: '1px solid hsl(3 44% 50% / 0.5)',
          backdropFilter: 'blur(8px)',
          borderRadius: 6,
          padding: '4px 8px',
          color: '#ffffff',
          fontFamily: 'var(--app-font-mono)',
          fontSize: 9,
          pointerEvents: 'none',
        }}
      >
        <div style={{ color: 'hsl(3 44% 65%)', fontWeight: 700 }}>● DRAIN TX: 0x71c6…</div>
        <div style={{ opacity: 0.65, fontSize: 8 }}>Mempool Broadcast · Gas 21 Gwei</div>
      </div>

      {/* Layering Peel Badge */}
      <div
        style={{
          position: 'absolute',
          left: 215,
          top: 175,
          background: 'rgba(10, 15, 12, 0.85)',
          border: '1px solid hsl(74 19% 52% / 0.4)',
          backdropFilter: 'blur(8px)',
          borderRadius: 6,
          padding: '3px 7px',
          color: '#ffffff',
          fontFamily: 'var(--app-font-mono)',
          fontSize: 8,
          pointerEvents: 'none',
        }}
      >
        <span style={{ color: 'hsl(74 19% 65%)' }}>PEEL CHAIN SPLIT</span>
        <div style={{ opacity: 0.65 }}>Hop 3 ➔ 2 Sub-Wallets</div>
      </div>

      {/* Destination Exchange Callout Badge */}
      <div
        style={{
          position: 'absolute',
          right: 18,
          top: 75,
          background: 'rgba(12, 28, 20, 0.92)',
          border: '1px solid hsl(157 24% 55% / 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: 8,
          padding: '8px 12px',
          color: '#ffffff',
          fontSize: 11,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'hsl(157 35% 65%)', fontWeight: 700, fontSize: 9, letterSpacing: '0.04em' }}>
          <CheckCircle2 size={11} /> VASP ENDPOINT PINPOINTED
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>CoinDCX Cluster</div>
        <div className="mono" style={{ fontSize: 9, opacity: 0.7, marginTop: 1 }}>
          Deposit Address Identified
        </div>
      </div>

      {/* 6. Bottom Holographic Blockchain Status Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: 18,
          right: 18,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 14px',
          background: 'rgba(8, 16, 12, 0.7)',
          border: '1px solid rgba(74, 222, 128, 0.15)',
          borderRadius: 8,
          backdropFilter: 'blur(10px)',
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
            Stolen Asset Flow: ₹2,84,700 (3,400 USDT)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="mono" style={{ fontSize: 9, color: 'hsl(var(--sidebar-primary))' }}>
            MERKLE ROOT VERIFIED
          </span>
          <ArrowRight size={10} color="hsl(var(--sidebar-primary))" />
          <span className="badge badge-high" style={{ fontSize: 8, padding: '2px 6px' }}>
            FREEZE READY
          </span>
        </div>
      </div>
    </div>
  );
}
