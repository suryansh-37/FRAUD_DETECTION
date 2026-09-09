import { useState } from 'react';
import { Link, useRoute } from 'wouter';
import {
  ChevronLeft,
  Check,
  Sparkles,
  FileText,
  Filter,
  LockKeyhole,
  Send,
  TriangleAlert,
  Network,
  CircleAlert,
  MoreHorizontal,
} from 'lucide-react';
import { cases, notices, activities } from '../data/mockData';
import { PortalShell } from '../components/layout/PortalShell';
import { RiskBadge } from '../components/shared/RiskBadge';
import { TraceGraph } from '../components/features/TraceGraph';
import { TraceLedger } from '../components/features/TraceLedger';
import { CaseFilePanel } from '../components/features/CaseFilePanel';
import { VaspAttribution } from '../components/features/VaspAttribution';
import { Toast } from '../components/shared/Toast';

export function CaseDetail() {
  const [, params] = useRoute('/portal/cases/:id');
  const item = cases.find((c) => c.id === params?.id) || cases[0];
  const [noticeState, setNoticeState] = useState(notices[0].status);
  const [watching, setWatching] = useState(false);
  const [toast, setToast] = useState('');

  const sendNotice = () => {
    setNoticeState('Sent just now');
    setToast('Notice NT-8412 sent to CoinDCX compliance');
  };

  return (
    <PortalShell title={`Case ${item.id}`}>
      <Link href="/portal/cases" className="btn btn-ghost" style={{ marginBottom: 18 }} data-testid="link-back-cases">
        <ChevronLeft size={14} /> Back to cases
      </Link>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          gap: 18,
          flexWrap: 'wrap',
          marginBottom: 23,
        }}
      >
        <div>
          <div className="eyebrow">
            {item.id} · {item.location}
          </div>
          <h1 className="page-title">{item.title}</h1>
          <p className="subtle" style={{ fontSize: 13, marginTop: 9 }}>
            {item.typology} · reported wallet <span className="mono">{item.wallet}</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setWatching(!watching);
              setToast(watching ? 'Removed from watchlist' : 'Case added to watchlist');
            }}
            className={`btn ${watching ? 'btn-primary' : 'btn-ghost'}`}
            data-testid="button-case-watchlist"
          >
            {watching ? <Check size={14} /> : <Sparkles size={14} />}{' '}
            {watching ? 'Watching' : 'Add to watchlist'}
          </button>
          <button
            onClick={() => setToast('Investigation report generation queued')}
            className="btn btn-secondary"
            data-testid="button-export-evidence"
          >
            <FileText size={14} /> Generate report
          </button>
        </div>
      </div>

      <div className="metric-grid">
        <div className="panel metric">
          <div className="eyebrow">Risk score</div>
          <div className="metric-value">
            {item.riskScore}
            <span style={{ fontSize: 15, color: 'hsl(var(--muted-foreground))' }}>/100</span>
          </div>
          <RiskBadge score={item.riskScore} />
        </div>
        <div className="panel metric">
          <div className="eyebrow">Reported value</div>
          <div className="metric-value">₹{item.amount.toLocaleString('en-IN')}</div>
          <div className="metric-note">Initial report · INR</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">Resolved hops</div>
          <div className="metric-value">{item.hops}</div>
          <div className="metric-note">Cross-chain path included</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">Movement state</div>
          <div className="metric-value" style={{ fontSize: 20, marginTop: 17 }}>
            {item.movementStatus}
          </div>
          <div className="metric-note">Last checked 8 min ago</div>
        </div>
      </div>

      <div className="content-grid" style={{ marginTop: 14 }}>
        <div>
          <div className="panel" style={{ padding: 17 }}>
            <div className="section-head">
              <div>
                <div className="section-title">Transaction trace</div>
                <div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>
                  Resolved from public ledger and VASP response · 14 Jun
                </div>
              </div>
              <button className="btn btn-ghost" data-testid="button-trace-filter">
                <Filter size={13} /> Filter hops
              </button>
            </div>
            <TraceGraph />
          </div>

          <TraceLedger />

          <div className="panel" style={{ padding: 17, marginTop: 14 }}>
            <div className="section-head">
              <div className="section-title">Activity & custody</div>
              <button className="btn btn-ghost" data-testid="button-seal-evidence">
                <LockKeyhole size={13} /> Seal latest
              </button>
            </div>
            {activities.map((a, i) => (
              <div
                key={a.label}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '12px 0',
                  borderBottom: i < activities.length - 1 ? '1px solid hsl(var(--border))' : '0',
                }}
              >
                <div
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 7,
                    background: 'hsl(var(--secondary))',
                    display: 'grid',
                    placeItems: 'center',
                    color: a.kind === 'alert' ? 'hsl(var(--destructive))' : 'hsl(var(--accent))',
                  }}
                >
                  {a.kind === 'notice' ? (
                    <Send size={12} />
                  ) : a.kind === 'lock' ? (
                    <LockKeyhole size={12} />
                  ) : a.kind === 'alert' ? (
                    <TriangleAlert size={12} />
                  ) : (
                    <Network size={12} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: 12 }}>{a.label}</strong>
                  <div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>
                    {a.detail}
                  </div>
                </div>
                <span className="mono subtle">{a.timestamp}</span>
              </div>
            ))}
            <CaseFilePanel item={item} />
          </div>
        </div>

        <div>
          <VaspAttribution vasp={item.vasp} />

          <div className="panel" style={{ padding: 17 }}>
            <div className="section-head">
              <div className="section-title">Why this is high risk</div>
              <CircleAlert size={17} color="hsl(var(--destructive))" />
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: 'hsl(var(--muted-foreground))' }}>
              The wallet received funds from{' '}
              <strong style={{ color: 'hsl(var(--foreground))' }}>four reported accounts</strong> within 18
              minutes, then split value across a mixer cluster and a VASP deposit. This pattern is consistent
              with a layered investment impersonation operation.
            </p>
            <div style={{ marginTop: 17, paddingTop: 13, borderTop: '1px solid hsl(var(--border))' }}>
              {[
                ['Common funding source', '4 / 4 linked reports'],
                ['Rapid movement', 'Under 22 minutes'],
                ['Obfuscation hop', 'Mixer interaction'],
                ['VASP exposure', 'CoinDCX deposit'],
                ['Cross-chain bridge', 'Ethereum → Polygon'],
                ['Intermediary wallets', '2 layering candidates'],
              ].map((row) => (
                <div className="check-row" key={row[0]}>
                  <span className="subtle">{row[0]}</span>
                  <strong style={{ fontSize: 11 }}>{row[1]}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="panel" style={{ padding: 17, marginTop: 14 }}>
            <div className="section-head">
              <div>
                <div className="section-title">VASP notice</div>
                <div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>
                  NT-8412 · least-privilege request
                </div>
              </div>
              <span className={`badge ${noticeState.startsWith('Sent') ? 'badge-low' : 'badge-medium'}`}>
                {noticeState}
              </span>
            </div>
            <div className="notice-box">
              <LockKeyhole size={17} color="hsl(var(--accent))" />
              <div>
                <strong style={{ fontSize: 12 }}>Freeze linked assets only</strong>
                <p>
                  CoinDCX can see the wallet cluster, reported amount, and legal basis. Personal details and
                  unrelated case material remain sealed.
                </p>
              </div>
            </div>
            <div className="check-row" style={{ marginTop: 10 }}>
              <span className="subtle">Legal basis</span>
              <strong className="mono">BNSS §106</strong>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={sendNotice}
                disabled={noticeState.startsWith('Sent')}
                data-testid="button-send-notice"
              >
                <Send size={13} /> {noticeState.startsWith('Sent') ? 'Notice sent' : 'Send notice'}
              </button>
              <button className="icon-btn" aria-label="Edit notice" data-testid="button-edit-notice">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </PortalShell>
  );
}
