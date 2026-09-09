import { useState } from 'react';
import { Check, Sparkles, ChevronDown } from 'lucide-react';
import { PortalShell } from '../components/layout/PortalShell';

export function Coordination() {
  const [watching, setWatching] = useState(false);

  return (
    <PortalShell title="Coordination">
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow">National picture / 09:00 UTC refresh</div>
        <h1 className="page-title">See across the borders.</h1>
        <p className="subtle" style={{ fontSize: 13, marginTop: 9 }}>
          Patterns become actionable when the right teams can see the same signal.
        </p>
      </div>

      <div className="metric-grid">
        <div className="panel metric">
          <div className="eyebrow">Active clusters</div>
          <div className="metric-value">12</div>
          <div className="metric-note">3 spanning 2+ states</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">States connected</div>
          <div className="metric-value">19</div>
          <div className="metric-note">Maharashtra leading</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">At-risk value</div>
          <div className="metric-value">₹4.2Cr</div>
          <div className="metric-note">Across active traces</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">Signals today</div>
          <div className="metric-value">47</div>
          <div className="metric-note">8 need a handoff</div>
        </div>
      </div>

      <div className="content-grid" style={{ marginTop: 14 }}>
        <div className="panel" style={{ padding: 18, minHeight: 390 }}>
          <div className="section-head">
            <div>
              <div className="section-title">National radar</div>
              <div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>
                Linked reports and movement by jurisdiction
              </div>
            </div>
            <button
              className={`btn ${watching ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setWatching(!watching)}
              data-testid="button-watch-radar"
            >
              {watching ? <Check size={13} /> : <Sparkles size={13} />}{' '}
              {watching ? 'Radar watched' : 'Watch radar'}
            </button>
          </div>
          <div
            style={{
              height: 290,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 10,
              background: 'hsl(155 18% 18%)',
              backgroundImage:
                'radial-gradient(circle at 22% 28%,hsl(74 19% 52%/.18) 0 3px,transparent 4px),radial-gradient(circle at 61% 46%,hsl(31 68% 56%/.22) 0 4px,transparent 5px),radial-gradient(circle at 80% 71%,hsl(74 19% 52%/.18) 0 3px,transparent 4px),linear-gradient(135deg,transparent 49%,hsl(38 30% 95%/.06) 50%,transparent 51%)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '16%',
                top: '22%',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'hsl(var(--accent))',
                boxShadow: '0 0 0 12px hsl(var(--accent)/.13)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '56%',
                top: '39%',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'hsl(31 68% 56%)',
                boxShadow: '0 0 0 14px hsl(31 68% 56%/.14)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '77%',
                top: '65%',
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'hsl(var(--accent))',
                boxShadow: '0 0 0 10px hsl(var(--accent)/.13)',
              }}
            />
            <span
              className="mono"
              style={{ position: 'absolute', left: '12%', top: '28%', color: 'hsl(var(--sidebar-foreground)/.68)' }}
            >
              RJ · 06
            </span>
            <span
              className="mono"
              style={{ position: 'absolute', left: '52%', top: '47%', color: 'hsl(var(--sidebar-foreground)/.68)' }}
            >
              MH · 19
            </span>
            <span
              className="mono"
              style={{ position: 'absolute', left: '72%', top: '73%', color: 'hsl(var(--sidebar-foreground)/.68)' }}
            >
              KA · 09
            </span>
          </div>
        </div>

        <div className="panel" style={{ padding: 18 }}>
          <div className="section-head">
            <div className="section-title">Handoffs</div>
            <span className="badge badge-medium">8 open</span>
          </div>
          {['Pune ↔ Bengaluru', 'Jaipur ↔ Delhi', 'Kochi ↔ Hyderabad'].map((x, i) => (
            <div className="check-row" key={x}>
              <div>
                <strong style={{ fontSize: 12 }}>{x}</strong>
                <span className="subtle" style={{ display: 'block', fontSize: 10, marginTop: 3 }}>
                  {i + 2} linked cases · {i === 0 ? 'high confidence' : 'under review'}
                </span>
              </div>
              <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
            </div>
          ))}
          <button className="btn btn-ghost" style={{ width: '100%', marginTop: 15 }} data-testid="button-open-handoff">
            Open coordination board
          </button>
        </div>
      </div>
    </PortalShell>
  );
}
