import { useState } from 'react';
import { Link } from 'wouter';
import { Check, Sparkles, Filter, ChevronDown } from 'lucide-react';
import { cases, activities } from '../data/mockData';
import { PortalShell } from '../components/layout/PortalShell';
import { ArchitectureMap } from '../components/features/ArchitectureMap';
import { RiskChart } from '../components/features/RiskChart';
import { CaseTable } from '../components/features/CaseTable';
import { Toast } from '../components/shared/Toast';

export function Overview() {
  const [watching, setWatching] = useState(false);
  const [toast, setToast] = useState('');

  return (
    <PortalShell title="Overview">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          gap: 20,
          marginBottom: 28,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div className="eyebrow">Thursday · 14 June 2024</div>
          <h1 className="page-title">Good morning, Aarav.</h1>
          <p className="subtle" style={{ fontSize: 13, marginTop: 10 }}>
            Start with a complaint, investigate a wallet, or review the national picture.
          </p>
        </div>
        <button
          className={`btn ${watching ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => {
            setWatching(!watching);
            setToast(watching ? 'Removed from watchlist' : 'Added case cluster to watchlist');
          }}
          data-testid="button-toggle-watchlist"
        >
          {watching ? <Check size={14} /> : <Sparkles size={14} />}{' '}
          {watching ? 'Watching cluster' : 'Watch priority cluster'}
        </button>
      </div>

      <ArchitectureMap />

      <div className="metric-grid" style={{ marginTop: 14 }}>
        <div className="panel metric">
          <div className="eyebrow">Open cases</div>
          <div className="metric-value">38</div>
          <div className="metric-note">+4 since Monday</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">Freeze requests</div>
          <div className="metric-value">06</div>
          <div className="metric-note">2 need review today</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">Assets in motion</div>
          <div className="metric-value">₹18.4L</div>
          <div className="metric-note">Across 11 wallets</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">Median response</div>
          <div className="metric-value">2h 18m</div>
          <div className="metric-note">↓ 24m this week</div>
        </div>
      </div>

      <div className="content-grid" style={{ marginTop: 14 }}>
        <div className="panel chart-box">
          <div className="section-head">
            <div>
              <div className="section-title">Risk activity</div>
              <div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>
                New reports and movement alerts · last 14 days
              </div>
            </div>
            <button className="btn btn-ghost" data-testid="button-chart-filter">
              <Filter size={13} /> 14 days
            </button>
          </div>
          <RiskChart />
        </div>
        <div className="panel" style={{ padding: 18 }}>
          <div className="section-head">
            <div className="section-title">Needs attention</div>
            <span className="badge badge-high">3 live</span>
          </div>
          {activities.slice(0, 3).map((a, i) => (
            <div key={a.label} className={`check-row animate-rise delay-${i + 1}`}>
              <div style={{ display: 'flex', gap: 9, alignItems: 'start' }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    marginTop: 4,
                    borderRadius: '50%',
                    background:
                      a.kind === 'alert' ? 'hsl(var(--destructive))' : 'hsl(var(--accent))',
                  }}
                />
                <div>
                  <strong style={{ fontSize: 11, display: 'block' }}>{a.label}</strong>
                  <span className="subtle" style={{ fontSize: 10 }}>
                    {a.timestamp}
                  </span>
                </div>
              </div>
              <ChevronDown
                size={14}
                style={{ transform: 'rotate(-90deg)', color: 'hsl(var(--muted-foreground))' }}
              />
            </div>
          ))}
          <Link
            href="/portal/alerts"
            className="btn btn-ghost"
            style={{ width: '100%', marginTop: 14 }}
            data-testid="link-view-alerts"
          >
            Open alerts <ChevronDown size={13} style={{ transform: 'rotate(-90deg)' }} />
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 34 }}>
        <div className="section-head">
          <div>
            <div className="eyebrow">Priority queue</div>
            <h2 className="title-serif" style={{ fontSize: 25, marginTop: 4 }}>
              Cases moving now
            </h2>
          </div>
          <Link href="/portal/cases" className="btn btn-ghost" data-testid="link-all-cases">
            All cases <ChevronDown size={13} style={{ transform: 'rotate(-90deg)' }} />
          </Link>
        </div>
        <CaseTable rows={cases.slice(0, 3)} />
      </div>

      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </PortalShell>
  );
}
