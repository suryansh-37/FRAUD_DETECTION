import { useState } from 'react';
import { Link } from 'wouter';
import { TriangleAlert, Check, CircleCheck, Sparkles } from 'lucide-react';
import { PortalShell } from '../components/layout/PortalShell';

export function Alerts() {
  const [resolved, setResolved] = useState<string[]>([]);
  const [watching, setWatching] = useState<string[]>([]);

  const alerts = [
    {
      id: 'AL-2048',
      title: 'Rapid movement after VASP deposit',
      detail: '₹46,740 moved from CoinDCX-linked cluster to a dormant wallet.',
      caseId: 'CF-24-0198',
      severity: 'High',
      time: '8 min ago',
    },
    {
      id: 'AL-2042',
      title: 'Cross-chain bridge detected',
      detail: 'Value crossed Ethereum → Polygon after mixer interaction.',
      caseId: 'CF-24-0198',
      severity: 'Elevated',
      time: '24 min ago',
    },
    {
      id: 'AL-2035',
      title: 'Reported wallet received new funds',
      detail: 'New incoming transfer matches a known complaint cluster.',
      caseId: 'CF-24-0187',
      severity: 'Elevated',
      time: '1 hr ago',
    },
  ];

  return (
    <PortalShell title="Alerts">
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow">Architecture / risk score + alerts</div>
        <h1 className="page-title">Catch movement early.</h1>
        <p className="subtle" style={{ fontSize: 13, marginTop: 9 }}>
          Alerts connect risk signals to a case, a watchlist, and the next accountable decision.
        </p>
      </div>

      <div className="metric-grid">
        <div className="panel metric">
          <div className="eyebrow">Live alerts</div>
          <div className="metric-value">{alerts.filter((a) => !resolved.includes(a.id)).length}</div>
          <div className="metric-note">Needs triage</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">High risk</div>
          <div className="metric-value">01</div>
          <div className="metric-note">Movement detected</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">Watched</div>
          <div className="metric-value">{watching.length}</div>
          <div className="metric-note">Clusters on watchlist</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">Response target</div>
          <div className="metric-value">3h</div>
          <div className="metric-note">For freeze decisions</div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
        {alerts.map((alert, i) => {
          const done = resolved.includes(alert.id);
          const isWatching = watching.includes(alert.id);
          return (
            <div
              className={`panel panel-hover animate-rise delay-${i + 1}`}
              style={{ padding: 18, opacity: done ? 0.62 : 1 }}
              key={alert.id}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 15,
                  alignItems: 'start',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', gap: 12 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      background:
                        alert.severity === 'High'
                          ? 'hsl(var(--destructive)/.12)'
                          : 'hsl(31 68% 56%/.14)',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <TriangleAlert
                      size={17}
                      color={alert.severity === 'High' ? 'hsl(var(--destructive))' : 'hsl(27 55% 38%)'}
                    />
                  </div>
                  <div>
                    <div className="eyebrow">
                      {alert.id} · {alert.time}
                    </div>
                    <h3 className="title-serif" style={{ fontSize: 23, margin: '5px 0' }}>
                      {alert.title}
                    </h3>
                    <p className="subtle" style={{ fontSize: 11 }}>
                      {alert.detail}
                    </p>
                  </div>
                </div>
                <span className={`badge ${alert.severity === 'High' ? 'badge-high' : 'badge-medium'}`}>
                  {done ? 'Resolved' : alert.severity}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: '1px solid hsl(var(--border))',
                  flexWrap: 'wrap',
                }}
              >
                <span className="mono subtle">{alert.caseId} · risk signal linked</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link
                    href={`/portal/cases/${alert.caseId}`}
                    className="btn btn-ghost"
                    data-testid={`link-alert-case-${alert.id}`}
                  >
                    Open case
                  </Link>
                  <button
                    className={`btn ${isWatching ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() =>
                      setWatching(
                        isWatching ? watching.filter((x) => x !== alert.id) : [...watching, alert.id]
                      )
                    }
                    data-testid={`button-watch-alert-${alert.id}`}>
                    {isWatching ? <Check size={13} /> : <Sparkles size={13} />} {isWatching ? 'Watching' : 'Watch'}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => setResolved([...resolved, alert.id])}
                    disabled={done}
                    data-testid={`button-resolve-alert-${alert.id}`}
                  >
                    {done ? <Check size={13} /> : <CircleCheck size={13} />}{' '}
                    {done ? 'Resolved' : 'Acknowledge'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PortalShell>
  );
}
