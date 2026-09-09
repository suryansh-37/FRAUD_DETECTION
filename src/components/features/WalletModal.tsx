import { useState } from 'react';
import { X, ScanSearch, Upload, CircleAlert, CircleCheck, FileText } from 'lucide-react';

export function WalletModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (wallet: string) => void;
}) {
  const [wallet, setWallet] = useState('');
  const [network, setNetwork] = useState('Auto-detect');
  const [stage, setStage] = useState<'idle' | 'tracing' | 'complete'>('idle');
  const [error, setError] = useState('');

  const validWallet =
    /^0x[a-fA-F0-9]{40}$/.test(wallet.trim()) ||
    /^[13][a-km-zA-HJ-NP-Z1-9]{25,62}$/.test(wallet.trim());

  const startTrace = () => {
    if (!validWallet) {
      setError(
        'Enter a complete Ethereum or Bitcoin wallet address. A shortened display address is not enough.'
      );
      return;
    }
    setError('');
    setStage('tracing');
    window.setTimeout(() => setStage('complete'), 700);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="wallet-investigation-title">
      <div className="panel modal-card" style={{ maxWidth: 610, padding: 24 }}>
        <div className="section-head">
          <div>
            <div className="eyebrow">New investigation / address intake</div>
            <h2 id="wallet-investigation-title" className="title-serif" style={{ fontSize: 30, marginTop: 5 }}>
              Start with the wallet.
            </h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close wallet investigation">
            <X size={16} />
          </button>
        </div>

        {stage === 'idle' && (
          <>
            <p className="subtle" style={{ fontSize: 12, lineHeight: 1.6, margin: '14px 0 20px' }}>
              Trace-X validates the address, detects its network, then builds a trace you can attach to a case. No
              report is created until you review the result.
            </p>
            <label className="eyebrow" htmlFor="wallet-address">
              Reported wallet address
            </label>
            <div style={{ position: 'relative', marginTop: 7 }}>
              <ScanSearch
                size={15}
                style={{ position: 'absolute', left: 12, top: 12, color: 'hsl(var(--muted-foreground))' }}
              />
              <input
                id="wallet-address"
                className="input mono"
                style={{ paddingLeft: 35 }}
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="0x… or Bitcoin address"
                data-testid="input-wallet-address"
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
              <div>
                <label className="eyebrow" htmlFor="wallet-network">
                  Network hint
                </label>
                <select
                  id="wallet-network"
                  className="select"
                  style={{ marginTop: 7, width: '100%' }}
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  data-testid="select-wallet-network"
                >
                  <option>Auto-detect</option>
                  <option>Ethereum</option>
                  <option>Polygon</option>
                  <option>Bitcoin</option>
                </select>
              </div>
              <div>
                <label className="eyebrow">Input source</label>
                <div
                  className="input"
                  style={{
                    marginTop: 7,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: 'hsl(var(--muted-foreground))',
                  }}
                >
                  <Upload size={14} /> NCRP / manual report
                </div>
              </div>
            </div>
            {error && (
              <div className="inline-error" role="alert" style={{ marginTop: 12 }}>
                <CircleAlert size={14} />
                {error}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 22 }}>
              <button className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={startTrace} data-testid="button-start-trace">
                <ScanSearch size={14} /> Validate & trace
              </button>
            </div>
          </>
        )}

        {stage === 'tracing' && (
          <div style={{ padding: '48px 12px', textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto 18px' }} />
            <h3 className="title-serif" style={{ fontSize: 27 }}>
              Reading the trail.
            </h3>
            <p className="subtle" style={{ fontSize: 12, marginTop: 8 }}>
              Validating address · resolving chain · checking known VASP clusters
            </p>
          </div>
        )}

        {stage === 'complete' && (
          <div style={{ marginTop: 18 }}>
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
                  6 hops resolved across Ethereum and Polygon. One likely VASP endpoint needs investigator
                  review.
                </p>
              </div>
            </div>
            <div className="two-col" style={{ marginTop: 12 }}>
              <div className="panel" style={{ padding: 14, background: 'hsl(var(--muted)/.55)' }}>
                <div className="eyebrow">Likely VASP</div>
                <strong style={{ display: 'block', marginTop: 6 }}>CoinDCX</strong>
                <span className="badge badge-low" style={{ marginTop: 8 }}>
                  86% confidence
                </span>
              </div>
              <div className="panel" style={{ padding: 14, background: 'hsl(var(--muted)/.55)' }}>
                <div className="eyebrow">Risk signal</div>
                <strong style={{ display: 'block', marginTop: 6 }}>Layered investment scam</strong>
                <span className="badge badge-high" style={{ marginTop: 8 }}>
                  92 / 100
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 22 }}>
              <button className="btn btn-ghost" onClick={onClose}>
                Discard trace
              </button>
              <button
                className="btn btn-primary"
                onClick={() => onCreated(wallet)}
                data-testid="button-create-case-from-trace"
              >
                <FileText size={14} /> Create case file
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
