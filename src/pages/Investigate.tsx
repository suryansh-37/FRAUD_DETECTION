import { useState } from 'react';
import { Link } from 'wouter';
import { CircleAlert, ScanSearch, CircleCheck, FileText, TriangleAlert } from 'lucide-react';
import { PortalShell } from '../components/layout/PortalShell';
import { TraceLedger } from '../components/features/TraceLedger';

export function Investigate() {
  const [wallet, setWallet] = useState('');
  const [network, setNetwork] = useState('Auto-detect');
  const [stage, setStage] = useState<'idle' | 'tracing' | 'complete'>('idle');
  const [error, setError] = useState('');

  const validWallet =
    /^0x[a-fA-F0-9]{40}$/.test(wallet.trim()) ||
    /^[13][a-km-zA-HJ-NP-Z1-9]{25,62}$/.test(wallet.trim());

  const trace = () => {
    if (!validWallet) {
      setError('Enter a complete Ethereum or Bitcoin wallet address.');
      return;
    }
    setError('');
    setStage('tracing');
    window.setTimeout(() => setStage('complete'), 700);
  };

  return (
    <PortalShell title="Investigate wallet">
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow">Architecture / investigate</div>
        <h1 className="page-title">Follow the asset trail.</h1>
        <p className="subtle" style={{ fontSize: 13, marginTop: 9 }}>
          Validate the address, detect the network, resolve the flow, and decide what becomes evidence.
        </p>
      </div>

      <div className="panel" style={{ padding: 20 }}>
        <div className="section-head">
          <div>
            <div className="section-title">Wallet investigation</div>
            <div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>
              Stages from the attached Trace-X architecture
            </div>
          </div>
          <span
            className={`badge ${
              stage === 'complete'
                ? 'badge-low'
                : stage === 'tracing'
                ? 'badge-medium'
                : 'badge-neutral'
            }`}
          >
            {stage === 'complete' ? 'Trace ready' : stage === 'tracing' ? 'Tracing' : 'Awaiting address'}
          </span>
        </div>

        {stage === 'idle' && (
          <>
            <div className="two-col">
              <div>
                <label className="eyebrow" htmlFor="architecture-wallet">
                  Enter wallet address
                </label>
                <input
                  id="architecture-wallet"
                  className="input mono"
                  style={{ marginTop: 7 }}
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  placeholder="0x… or Bitcoin address"
                  data-testid="input-architecture-wallet"
                />
              </div>
              <div>
                <label className="eyebrow" htmlFor="architecture-network">
                  Network detection
                </label>
                <select
                  id="architecture-network"
                  className="select"
                  style={{ marginTop: 7 }}
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  data-testid="select-architecture-network"
                >
                  <option>Auto-detect</option>
                  <option>Ethereum</option>
                  <option>Polygon</option>
                  <option>Bitcoin</option>
                </select>
              </div>
            </div>
            {error && (
              <div className="inline-error" role="alert" style={{ marginTop: 12 }}>
                <CircleAlert size={14} />
                {error}
              </div>
            )}
            <button
              className="btn btn-primary"
              style={{ marginTop: 18 }}
              onClick={trace}
              data-testid="button-architecture-trace"
            >
              <ScanSearch size={14} /> Validate address & trace
            </button>
          </>
        )}

        {stage === 'tracing' && (
          <div style={{ padding: '40px 12px', textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto 16px' }} />
            <h3 className="title-serif" style={{ fontSize: 27 }}>
              Resolving the flow.
            </h3>
            <p className="subtle" style={{ fontSize: 12, marginTop: 8 }}>
              Address validation · network detection · blockchain tracing · VASP matching
            </p>
          </div>
        )}

        {stage === 'complete' && (
          <>
            <div className="investigation-result">
              <div
                className="notice-box"
                style={{ background: 'hsl(var(--accent)/.08)', borderColor: 'hsl(var(--accent)/.25)' }}
              >
                <CircleCheck size={18} color="hsl(var(--accent))" />
                <div>
                  <strong style={{ fontSize: 13 }}>
                    Address validated · {network === 'Auto-detect' ? 'Ethereum' : network}
                  </strong>
                  <p>
                    6 hops resolved across Ethereum and Polygon. Two intermediary wallets and one likely
                    VASP endpoint are ready for review.
                  </p>
                </div>
              </div>
              <div className="metric-grid" style={{ marginTop: 12 }}>
                <div className="panel metric">
                  <div className="eyebrow">Money flow</div>
                  <div className="metric-value">₹2.84L</div>
                  <div className="metric-note">6 resolved hops</div>
                </div>
                <div className="panel metric">
                  <div className="eyebrow">Wallet details</div>
                  <div className="metric-value">02</div>
                  <div className="metric-note">Layering candidates</div>
                </div>
                <div className="panel metric">
                  <div className="eyebrow">Network details</div>
                  <div className="metric-value">02</div>
                  <div className="metric-note">Ethereum + Polygon</div>
                </div>
                <div className="panel metric">
                  <div className="eyebrow">Risk score</div>
                  <div className="metric-value">92</div>
                  <div className="metric-note">Layered investment scam</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                <Link
                  href="/portal/cases/CF-24-0198"
                  className="btn btn-primary"
                  data-testid="link-investigation-case"
                >
                  <FileText size={14} /> Open case report
                </Link>
                <Link
                  href="/portal/alerts"
                  className="btn btn-secondary"
                  data-testid="link-investigation-alerts"
                >
                  <TriangleAlert size={14} /> Review alerts
                </Link>
                <button
                  className="btn btn-ghost"
                  onClick={() => setStage('idle')}
                  data-testid="button-reset-investigation"
                >
                  Trace another wallet
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {stage === 'complete' && (
        <div style={{ marginTop: 14 }}>
          <TraceLedger />
        </div>
      )}
    </PortalShell>
  );
}
