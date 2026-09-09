import { useState } from 'react';
import { Check, LockKeyhole, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { PortalShell } from '../components/layout/PortalShell';

export function Audit() {
  const [sealed, setSealed] = useState(false);

  return (
    <PortalShell title="Audit review">
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow">Legal auditor / chain of custody</div>
        <h1 className="page-title">Nothing missing.</h1>
        <p className="subtle" style={{ fontSize: 13, marginTop: 9 }}>
          A compact, verifiable record of who saw what and when.
        </p>
      </div>

      <div className="content-grid">
        <div>
          <div className="panel" style={{ padding: 18 }}>
            <div className="section-head">
              <div>
                <div className="section-title">Packet EVD-0198</div>
                <div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>
                  Case CF-24-0198 · generated 14 Jun 2024
                </div>
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => setSealed(!sealed)}
                data-testid="button-toggle-sealed"
              >
                {sealed ? <Check size={13} /> : <LockKeyhole size={13} />} {sealed ? 'Packet sealed' : 'Seal packet'}
              </button>
            </div>

            <div style={{ padding: '20px 0', borderTop: '1px solid hsl(var(--border))' }}>
              {[
                ['01', 'Report received', 'A. Kulkarni', '14 Jun · 09:42'],
                ['02', 'Ledger trace generated', 'Trace-X trace engine', '14 Jun · 09:48'],
                ['03', 'VASP data attached', 'CoinDCX compliance', '14 Jun · 10:31'],
                ['04', 'Supervisor decision', 'M. Deshpande', '14 Jun · 10:39'],
                ['05', 'Freeze request delivered', 'Trace-X notice relay', '14 Jun · 10:44'],
              ].map((r, i) => (
                <div
                  key={r[0]}
                  style={{
                    display: 'flex',
                    gap: 14,
                    alignItems: 'center',
                    padding: '13px 0',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: 27,
                      height: 27,
                      borderRadius: '50%',
                      background: i === 4 ? 'hsl(var(--accent))' : 'hsl(var(--secondary))',
                      display: 'grid',
                      placeItems: 'center',
                      fontFamily: 'var(--app-font-mono)',
                      fontSize: 10,
                      zIndex: 1,
                    }}
                  >
                    {i === 4 ? <Check size={13} /> : r[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: 12 }}>{r[1]}</strong>
                    <span className="subtle" style={{ fontSize: 10, display: 'block', marginTop: 3 }}>
                      {r[2]}
                    </span>
                  </div>
                  <span className="mono subtle">{r[3]}</span>
                  {i < 4 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 13,
                        top: 40,
                        height: 29,
                        borderLeft: '1px dashed hsl(var(--border))',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: '1px solid hsl(var(--border))',
                paddingTop: 14,
                display: 'flex',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <ShieldCheck size={16} color="hsl(var(--accent))" />
              <span className="subtle" style={{ fontSize: 11 }}>
                SHA-256 · <span className="mono">b8f2…9c17</span>
              </span>
              <button className="btn btn-ghost" style={{ marginLeft: 'auto' }} data-testid="button-copy-hash">
                Copy hash
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="panel" style={{ padding: 18 }}>
            <div className="eyebrow">Review summary</div>
            <div className="metric-value" style={{ fontSize: 36, marginTop: 10 }}>
              5 / 5
            </div>
            <p className="subtle" style={{ fontSize: 11, lineHeight: 1.5 }}>
              Evidence events have a signer, timestamp, and source reference.
            </p>
            <div className="check-row">
              <span className="subtle">Integrity</span>
              <span className="badge badge-low">Verified</span>
            </div>
            <div className="check-row">
              <span className="subtle">Access scope</span>
              <span className="badge badge-low">Least privilege</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 15 }}
              data-testid="button-export-audit"
            >
              <ClipboardCheck size={13} /> Export audit report
            </button>
          </div>

          <div className="panel" style={{ padding: 18, marginTop: 14 }}>
            <div className="section-title">Reviewer note</div>
            <textarea
              className="input"
              rows={4}
              style={{ marginTop: 12, resize: 'vertical' }}
              placeholder="Add a note to this review"
              data-testid="textarea-review-note"
            />
            <button className="btn btn-ghost" style={{ marginTop: 10, width: '100%' }} data-testid="button-save-review-note">
              Save note
            </button>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
