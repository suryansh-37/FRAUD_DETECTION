import React from 'react';
import { Link } from 'wouter';
import {
  ShieldAlert,
  Search,
  PlusCircle,
  PhoneCall,
  Clock,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  ArrowUpRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { PortalShell } from '../../components/layout/PortalShell';

export function VictimPortal() {
  const { currentUser } = useAuth();
  const { complaints } = useStore();

  const userComplaints = complaints.filter(
    (c) =>
      c.complainantName.toLowerCase().includes(currentUser.name.toLowerCase().split(' ')[0]) ||
      c.email === currentUser.email ||
      complaints.length <= 2 // In demo mode, let the demo citizen see the demo cases
  );

  return (
    <PortalShell title="Citizen Cyber Fraud Portal">
      {/* Emergency Helpline Banner */}
      <div
        className="panel"
        style={{
          background: 'linear-gradient(135deg, hsl(3 44% 44%/.1), hsl(31 68% 56%/.08))',
          borderColor: 'hsl(3 44% 44%/.25)',
          padding: '16px 20px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: 'hsl(3 44% 44%)',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              flex: '0 0 auto',
            }}
          >
            <PhoneCall size={20} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'hsl(var(--destructive))' }}>
              National Cyber Crime Reporting Helpline: 1930
            </div>
            <div className="subtle" style={{ fontSize: 11, marginTop: 2 }}>
              If you lost funds within the last 24 hours, early reporting increases the chance of exchange freezing by 85%.
            </div>
          </div>
        </div>
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
          style={{ fontSize: 11 }}
        >
          cybercrime.gov.in <ExternalLink size={12} />
        </a>
      </div>

      {/* Hero Welcome */}
      <div style={{ marginBottom: 28 }}>
        <div className="eyebrow">Citizen Services · Indian Cyber Crime Coordination Centre (I4C)</div>
        <h1 className="page-title">Report & Track Crypto Fraud.</h1>
        <p className="subtle" style={{ fontSize: 13, marginTop: 8, maxWidth: 700 }}>
          Welcome back, <strong>{currentUser.name}</strong>. Log crypto scam complaints directly into the law enforcement network, follow asset tracking progress, and receive real-time updates as stolen tokens reach registered exchanges.
        </p>
      </div>

      {/* Main Action Cards */}
      <div className="two-col" style={{ gap: 16, marginBottom: 28 }}>
        <div className="panel panel-hover" style={{ padding: 24, position: 'relative' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 11,
              background: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              display: 'grid',
              placeItems: 'center',
              marginBottom: 16,
            }}
          >
            <PlusCircle size={22} />
          </div>
          <h2 className="title-serif" style={{ fontSize: 24, margin: '0 0 8px' }}>
            Report New Crypto Fraud
          </h2>
          <p className="subtle" style={{ fontSize: 12, lineHeight: 1.55, marginBottom: 20 }}>
            File a comprehensive complaint with suspect wallet address, transaction hash, exchange details, and narrative evidence.
          </p>
          <Link href="/victim/report" className="btn btn-primary" style={{ width: '100%' }}>
            Start Fraud Report <ChevronRight size={14} />
          </Link>
        </div>

        <div className="panel panel-hover" style={{ padding: 24, position: 'relative' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 11,
              background: 'hsl(var(--accent))',
              color: 'hsl(var(--accent-foreground))',
              display: 'grid',
              placeItems: 'center',
              marginBottom: 16,
            }}
          >
            <Search size={22} />
          </div>
          <h2 className="title-serif" style={{ fontSize: 24, margin: '0 0 8px' }}>
            Track Investigation Status
          </h2>
          <p className="subtle" style={{ fontSize: 12, lineHeight: 1.55, marginBottom: 20 }}>
            Check the live multi-stage forensic progress of your registered complaints, from wallet tracing to exchange freeze requisitions.
          </p>
          <Link href="/victim/track" className="btn btn-secondary" style={{ width: '100%' }}>
            View Tracking Dashboard <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Recent Filed Complaints */}
      <div className="panel" style={{ padding: 20 }}>
        <div className="section-head">
          <div>
            <div className="section-title">Your Registered Complaints</div>
            <div className="subtle" style={{ fontSize: 11, marginTop: 2 }}>
              {userComplaints.length} active complaint{userComplaints.length === 1 ? '' : 's'} linked to your profile
            </div>
          </div>
          <Link href="/victim/track" className="btn btn-ghost" style={{ fontSize: 11 }}>
            View Full Tracking <ArrowUpRight size={13} />
          </Link>
        </div>

        <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
          {userComplaints.map((item) => (
            <div
              key={item.id}
              className="panel"
              style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12,
                background: 'hsl(var(--background)/.5)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="mono" style={{ fontWeight: 700, fontSize: 12 }}>
                    {item.id}
                  </span>
                  <span
                    className={`badge ${
                      item.status === 'Notice Issued'
                        ? 'badge-high'
                        : item.status === 'VASP Identified'
                        ? 'badge-medium'
                        : 'badge-low'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{item.scamType}</div>
                <div className="subtle" style={{ fontSize: 11, marginTop: 2 }}>
                  Loss: <strong>₹{item.lossAmountINR.toLocaleString('en-IN')}</strong> · Asset: {item.cryptoType} · Reported {item.createdAt}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ textAlign: 'right' }}>
                  <div className="eyebrow" style={{ fontSize: 9 }}>Assigned Officer</div>
                  <div style={{ fontSize: 11, fontWeight: 600 }}>{item.assignedOfficer}</div>
                </div>
                <Link
                  href={`/victim/track?ref=${item.id}`}
                  className="btn btn-secondary"
                  style={{ fontSize: 11, padding: '7px 12px' }}
                >
                  Track <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
