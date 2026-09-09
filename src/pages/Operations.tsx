import { useState } from 'react';
import { Link } from 'wouter';
import { Users } from 'lucide-react';
import { PortalShell } from '../components/layout/PortalShell';
import { Toast } from '../components/shared/Toast';

export function Operations() {
  const [maintenance, setMaintenance] = useState(false);
  const [toast, setToast] = useState('');

  return (
    <PortalShell title="Operations">
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow">Platform administration</div>
        <h1 className="page-title">Keep the room ready.</h1>
        <p className="subtle" style={{ fontSize: 13, marginTop: 9 }}>
          System health, access posture, and connector state at a glance.
        </p>
      </div>

      <div className="metric-grid">
        <div className="panel metric">
          <div className="eyebrow">Platform uptime</div>
          <div className="metric-value">99.98%</div>
          <div className="metric-note">Last incident 19 days ago</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">Ledger sync</div>
          <div className="metric-value">42s</div>
          <div className="metric-note">Within operating range</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">Active seats</div>
          <div className="metric-value">184</div>
          <div className="metric-note">19 roles · 6 states</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">Audit backlog</div>
          <div className="metric-value">03</div>
          <div className="metric-note">All under 24 hours</div>
        </div>
      </div>

      <div className="two-col" style={{ marginTop: 14 }}>
        <div className="panel" style={{ padding: 18 }}>
          <div className="section-head">
            <div className="section-title">Service health</div>
            <span className="badge badge-low">All systems operational</span>
          </div>
          {[
            ['Ledger indexer', '42 sec lag', 'Healthy'],
            ['VASP connectors', '18 / 19 online', 'Healthy'],
            ['Evidence vault', 'Encrypted · replicated', 'Healthy'],
            ['Notification relay', '99.9% delivered', 'Healthy'],
          ].map((r) => (
            <div className="check-row" key={r[0]}>
              <div>
                <strong style={{ fontSize: 12 }}>{r[0]}</strong>
                <span className="subtle" style={{ display: 'block', fontSize: 10, marginTop: 3 }}>
                  {r[1]}
                </span>
              </div>
              <span className="badge badge-low">{r[2]}</span>
            </div>
          ))}
        </div>

        <div className="panel" style={{ padding: 18 }}>
          <div className="section-head">
            <div className="section-title">Access posture</div>
            <Users size={17} color="hsl(var(--muted-foreground))" />
          </div>
          {[
            ['Privileged roles', '11', 'Review monthly'],
            ['Dormant seats', '04', 'Needs review'],
            ['Pending invites', '07', 'Within policy'],
            ['MFA coverage', '100%', 'Enforced'],
          ].map((r) => (
            <div className="check-row" key={r[0]}>
              <span className="subtle">{r[0]}</span>
              <strong>{r[1]}</strong>
              <span className="mono subtle">{r[2]}</span>
            </div>
          ))}
          <Link
            href="/portal/settings"
            className="btn btn-ghost"
            style={{ width: '100%', marginTop: 15 }}
            data-testid="link-manage-access"
          >
            Manage access
          </Link>
        </div>
      </div>

      <div
        className="panel"
        style={{
          padding: 18,
          marginTop: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 15,
        }}
      >
        <div>
          <div className="section-title">Maintenance window</div>
          <p className="subtle" style={{ fontSize: 11, margin: '4px 0 0' }}>
            Next ledger connector maintenance: 22 Jun · 01:00—01:30 IST
          </p>
        </div>
        <button
          className={`switch ${maintenance ? 'on' : ''}`}
          onClick={() => {
            setMaintenance(!maintenance);
            setToast(
              maintenance ? 'Maintenance reminders off' : 'Maintenance reminders on'
            );
          }}
          aria-label="Toggle maintenance reminders"
          data-testid="switch-maintenance"
        >
          <span />
        </button>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </PortalShell>
  );
}
