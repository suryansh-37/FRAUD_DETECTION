import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  CircleAlert,
  ScanSearch,
  CircleCheck,
  FileText,
  TriangleAlert,
  Sparkles,
  Zap,
  Building2,
  ShieldCheck,
  Printer,
  ChevronDown,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { PortalShell } from '../components/layout/PortalShell';
import { TraceGraph } from '../components/features/TraceGraph';
import { TraceLedger } from '../components/features/TraceLedger';
import { useStore } from '../context/StoreContext';

export function Investigate() {
  const { logAuditEvent } = useStore();
  const [wallet, setWallet] = useState('0x71c6bf5e51082531a293f0b2f5670845a93f110a');
  const [network, setNetwork] = useState('Ethereum');
  const [stage, setStage] = useState<'idle' | 'tracing' | 'complete'>('complete'); // default to complete for instant demo feel or allow re-tracing
  const [error, setError] = useState('');
  const [showDossierModal, setShowDossierModal] = useState(false);

  const validWallet =
    /^0x[a-fA-F0-9]{40}$/.test(wallet.trim()) ||
    /^[13][a-km-zA-HJ-NP-Z1-9]{25,62}$/.test(wallet.trim());

  const trace = () => {
    if (!validWallet) {
      setError('Enter a complete Ethereum or Bitcoin wallet address (e.g. 0x… or 1A1z…).');
      return;
    }
    setError('');
    setStage('tracing');
    setTimeout(() => {
      setStage('complete');
      logAuditEvent(
        `On-Chain Wallet Trace Completed`,
        `Wallet: ${wallet.slice(0, 10)}… on ${network}. 6 hops extracted.`,
        'Insp. Aarav Kulkarni'
      );
    }, 600);
  };

  const loadPreset = (addr: string, net: string) => {
    setWallet(addr);
    setNetwork(net);
    setError('');
    setStage('idle');
  };

  return (
    <PortalShell title="Investigate Wallet & Forensic Analysis">
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow">Forensic Intelligence Desk · Level 3 Clearance</div>
        <h1 className="page-title">Follow the asset trail.</h1>
        <p className="subtle" style={{ fontSize: 13, marginTop: 8 }}>
          De-anonymize wallet clusters, uncover peel-chains, identify exit exchanges, and prepare court-admissible dossiers under Section 65B of the Indian Evidence Act.
        </p>
      </div>

      {/* Input / Filter Panel */}
      <div className="panel" style={{ padding: 20, marginBottom: 20 }}>
        <div className="section-head">
          <div>
            <div className="section-title">Target Wallet Input</div>
            <div className="subtle" style={{ fontSize: 11, marginTop: 2 }}>
              Supports EVM (Ethereum, Polygon, BSC, Arbitrum), Bitcoin, and TRON networks
            </div>
          </div>

          {/* Preset Buttons */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="eyebrow" style={{ marginRight: 4 }}>
              <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
              Forensic Presets:
            </span>
            <button
              type="button"
              onClick={() => loadPreset('0x71c6bf5e51082531a293f0b2f5670845a93f110a', 'Polygon')}
              className="btn btn-secondary"
              style={{ fontSize: 10, padding: '5px 8px' }}
            >
              WazirX Exploiter Drain
            </button>
            <button
              type="button"
              onClick={() => loadPreset('0x4bd817ce8291410f92410a829375104273891402', 'Ethereum')}
              className="btn btn-secondary"
              style={{ fontSize: 10, padding: '5px 8px' }}
            >
              Pig-Butchering Ring
            </button>
            <button
              type="button"
              onClick={() => loadPreset('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', 'Bitcoin')}
              className="btn btn-secondary"
              style={{ fontSize: 10, padding: '5px 8px' }}
            >
              BTC Mixer Outflow
            </button>
          </div>
        </div>

        <div className="two-col" style={{ gap: 14, marginTop: 14 }}>
          <div>
            <label className="eyebrow" htmlFor="inv-wallet">Target Wallet Address</label>
            <input
              id="inv-wallet"
              className="input mono"
              style={{ marginTop: 6 }}
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="0x… or Bitcoin address"
            />
          </div>
          <div>
            <label className="eyebrow" htmlFor="inv-net">Blockchain Network</label>
            <select
              id="inv-net"
              className="select"
              style={{ marginTop: 6 }}
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
            >
              <option>Ethereum</option>
              <option>Polygon</option>
              <option>Bitcoin</option>
              <option>TRON (TRC-20)</option>
              <option>Binance Smart Chain</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="notice-box" style={{ background: 'hsl(3 44% 44%/.1)', borderColor: 'hsl(var(--destructive))', marginTop: 14 }}>
            <CircleAlert size={16} color="hsl(var(--destructive))" />
            <div style={{ fontSize: 12, color: 'hsl(var(--destructive))' }}>{error}</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={trace}
            disabled={stage === 'tracing'}
          >
            <ScanSearch size={14} />
            {stage === 'tracing' ? 'Extracting Node Cluster...' : 'Execute Multi-Hop Trace'}
          </button>
          {stage === 'complete' && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowDossierModal(true)}
            >
              <FileText size={14} /> Generate Court Dossier (Sec. 65B)
            </button>
          )}
        </div>
      </div>

      {stage === 'tracing' && (
        <div className="panel" style={{ padding: 48, textAlign: 'center', marginBottom: 20 }}>
          <div className="pulse-soft" style={{ width: 44, height: 44, borderRadius: '50%', background: 'hsl(var(--accent))', margin: '0 auto 16px' }} />
          <h3 className="title-serif" style={{ fontSize: 24 }}>Resolving Blockchain Flow Graph...</h3>
          <p className="subtle" style={{ fontSize: 12, marginTop: 6 }}>
            Traversing internal contract calls · Clustered with 14 exchange hot-wallets · Generating risk confidence score
          </p>
        </div>
      )}

      {stage === 'complete' && (
        <>
          {/* Top Forensic Highlights */}
          <div className="metric-grid" style={{ marginBottom: 20 }}>
            <div className="panel metric">
              <div className="eyebrow">Traced Volume</div>
              <div className="metric-value">₹2.84L</div>
              <div className="metric-note">3,400 USDT equivalent</div>
            </div>
            <div className="panel metric">
              <div className="eyebrow">Hops Traversed</div>
              <div className="metric-value">06</div>
              <div className="metric-note">Across 2 networks</div>
            </div>
            <div className="panel metric">
              <div className="eyebrow">Exit Attribution</div>
              <div className="metric-value" style={{ fontSize: 24, marginTop: 12, color: 'hsl(var(--accent))' }}>
                CoinDCX
              </div>
              <div className="metric-note">Deposit Address Identified</div>
            </div>
            <div className="panel metric">
              <div className="eyebrow">Threat Rating</div>
              <div className="metric-value" style={{ fontSize: 24, marginTop: 12, color: 'hsl(var(--destructive))' }}>
                High (92/100)
              </div>
              <div className="metric-note">Layered Syndicate</div>
            </div>
          </div>

          {/* Interactive Multi-Hop Trace Graph */}
          <div className="panel" style={{ padding: 20, marginBottom: 20 }}>
            <div className="section-head">
              <div>
                <div className="section-title">Visual Money Trail & Graph Topology</div>
                <div className="subtle" style={{ fontSize: 11, marginTop: 2 }}>
                  Direct graphical topology from victim source (red) to intermediary mixers (green) to attributed exchange exit (amber)
                </div>
              </div>
              <span className="badge badge-medium">6 Hops Verified</span>
            </div>

            <div style={{ marginTop: 14 }}>
              <TraceGraph />
            </div>
          </div>

          {/* AI Forensic Insights & Pattern Detection */}
          <div className="panel" style={{ padding: 20, marginBottom: 20 }}>
            <div className="section-head">
              <div className="section-title">AI Forensic Intelligence Insights</div>
              <Zap size={16} color="hsl(var(--accent))" />
            </div>

            <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: 12,
                  borderRadius: 8,
                  background: 'hsl(var(--background)/.6)',
                  border: '1px solid hsl(var(--border))',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'hsl(var(--destructive))', marginTop: 5, flex: '0 0 auto' }} />
                <div style={{ fontSize: 12 }}>
                  <strong>Peel-Chain Rapid Splitting:</strong> The initial ₹2.84L was broken down into 4 successive splitting transactions within 18 minutes of deposit, indicating automated algorithmic laundering.
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: 12,
                  borderRadius: 8,
                  background: 'hsl(var(--background)/.6)',
                  border: '1px solid hsl(var(--border))',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'hsl(var(--accent))', marginTop: 5, flex: '0 0 auto' }} />
                <div style={{ fontSize: 12 }}>
                  <strong>Definite VASP Endpoint:</strong> Hop 6 terminates in verified CoinDCX omnibus deposit address <span className="mono">0x4bd8…817c</span>. Ready for emergency Section 91 CrPC notice dispatch.
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: 12,
                  borderRadius: 8,
                  background: 'hsl(var(--background)/.6)',
                  border: '1px solid hsl(var(--border))',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'hsl(157 24% 38%)', marginTop: 5, flex: '0 0 auto' }} />
                <div style={{ fontSize: 12 }}>
                  <strong>Zero Obfuscation Tumblers:</strong> Funds did not touch sanctioned mixer protocols (Tornado Cash, Railgun), ensuring 100% direct chain of custody for court presentation.
                </div>
              </div>
            </div>
          </div>

          {/* Trace Ledger */}
          <div className="panel" style={{ padding: 20 }}>
            <div className="section-head">
              <div className="section-title">Cryptographic Transaction Ledger</div>
              <span className="mono subtle" style={{ fontSize: 11 }}>Raw Node Verification</span>
            </div>
            <TraceLedger />
          </div>
        </>
      )}

      {/* Court Dossier / Section 65B Modal */}
      {showDossierModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 100,
            padding: 16,
          }}
        >
          <div className="panel" style={{ width: '100%', maxWidth: 640, padding: 28, maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="section-head">
              <div>
                <div className="eyebrow">Court of Law Evidentiary Document</div>
                <h2 className="title-serif" style={{ fontSize: 24 }}>Certificate under Section 65B</h2>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setShowDossierModal(false)}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                background: 'hsl(var(--background))',
                padding: 20,
                borderRadius: 8,
                fontSize: 12,
                lineHeight: 1.6,
                marginTop: 16,
                border: '1px solid hsl(var(--border))',
              }}
            >
              <div style={{ textAlign: 'center', borderBottom: '1px solid hsl(var(--border))', paddingBottom: 12, marginBottom: 14 }}>
                <strong>FORM CF-65B · FORENSIC BLOCKCHAIN CERTIFICATE</strong>
                <div className="subtle" style={{ fontSize: 11 }}>Indian Evidence Act, 1872 & Bharatiya Sakshya Adhiniyam, 2023</div>
              </div>

              <p>
                This certifies that the digital asset investigation report for wallet <strong className="mono">{wallet}</strong> was generated by the Trace-X National Cyber Forensics Engine operated by the Cyber Crime Investigation Cell.
              </p>

              <div style={{ margin: '14px 0', padding: 12, background: 'hsl(var(--card))', borderRadius: 6 }}>
                <div><strong>Identified Primary Loss:</strong> ₹2,84,700 (3,400 USDT)</div>
                <div><strong>Attributed Beneficiary VASP:</strong> CoinDCX Regulatory Liaison</div>
                <div><strong>Cryptographic Hash:</strong> <span className="mono">0x9a84b0e5124976cf7493c834017f8a3d3c8c1d56</span></div>
                <div><strong>Hash Algorithm:</strong> SHA-256 / Keccak-256 Merkle Verification</div>
              </div>

              <p className="subtle" style={{ fontSize: 11 }}>
                The computing nodes producing this record were operating properly under ordinary use, and all electronic transaction traces are preserved in immutable state.
              </p>

              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid hsl(var(--border))', paddingTop: 14 }}>
                <div>
                  <div className="mono" style={{ fontSize: 10 }}>SEAL: CYBER CELL UNIT 4</div>
                  <div className="subtle" style={{ fontSize: 10 }}>GOVERNMENT OF INDIA</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong>Insp. Aarav Kulkarni</strong>
                  <div className="subtle" style={{ fontSize: 11 }}>Lead Cyber Forensic Investigator</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setShowDossierModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => window.print()}
              >
                <Printer size={14} /> Print Formal Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalShell>
  );
}
