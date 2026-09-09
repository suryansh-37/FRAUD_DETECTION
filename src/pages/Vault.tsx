import { useState } from 'react';
import { LockKeyhole, MoreHorizontal } from 'lucide-react';
import { notices } from '../data/mockData';
import { PortalShell } from '../components/layout/PortalShell';
import { Toast } from '../components/shared/Toast';

export function Vault() {
  const [selected, setSelected] = useState(notices[0].id);
  const [toast, setToast] = useState('');
  const notice = notices.find((n) => n.id === selected) || notices[0];

  return (
    <PortalShell title="VASP vault">
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow">Compliance inbox / least privilege</div>
        <h1 className="page-title">Requests, kept precise.</h1>
        <p className="subtle" style={{ fontSize: 13, marginTop: 9 }}>
          Only what a VASP needs to answer. Nothing more.
        </p>
      </div>

      <div className="content-grid">
        <div>
          <div className="panel table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Notice</th>
                  <th>VASP</th>
                  <th>State</th>
                  <th>SLA</th>
                  <th>Sent</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((n) => (
                  <tr
                    key={n.id}
                    onClick={() => setSelected(n.id)}
                    style={{
                      cursor: 'pointer',
                      background: selected === n.id ? 'hsl(var(--muted)/.7)' : 'transparent',
                    }}
                    data-testid={`row-notice-${n.id}`}
                  >
                    <td>
                      <strong className="mono">{n.id}</strong>
                      <span style={{ display: 'block', fontSize: 11, marginTop: 4 }}>{n.caseId}</span>
                    </td>
                    <td>{n.vasp}</td>
                    <td>
                      <span
                        className={`badge ${
                          n.status === 'Acknowledged'
                            ? 'badge-low'
                            : n.status === 'Draft'
                            ? 'badge-neutral'
                            : 'badge-medium'
                        }`}
                      >
                        {n.status}
                      </span>
                    </td>
                    <td className="subtle">{n.sla}</td>
                    <td className="subtle">{n.sentAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel" style={{ padding: 18, marginTop: 14 }}>
            <div className="section-head">
              <div className="section-title">Compliance performance</div>
              <span className="mono subtle">last 30 days</span>
            </div>
            {[
              ['CoinDCX', '91%', '1h 42m'],
              ['Binance', '84%', '2h 18m'],
              ['WazirX', '78%', '3h 06m'],
              ['ZebPay', '73%', '4h 12m'],
            ].map((r) => (
              <div className="check-row" key={r[0]}>
                <strong style={{ fontSize: 12 }}>{r[0]}</strong>
                <span className="mono subtle">{r[1]} response quality</span>
                <span className="mono">{r[2]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel" style={{ padding: 18 }}>
          <div className="eyebrow">Selected request</div>
          <h2 className="title-serif" style={{ fontSize: 28, margin: '8px 0' }}>
            {notice.vasp}
          </h2>
          <span className={`badge ${notice.status === 'Draft' ? 'badge-neutral' : 'badge-medium'}`}>
            {notice.status}
          </span>
          <div className="notice-box" style={{ marginTop: 20 }}>
            <LockKeyhole size={17} color="hsl(var(--accent))" />
            <div>
              <strong style={{ fontSize: 12 }}>Scoped access</strong>
              <p>
                Wallet cluster, transaction hashes, reported amount, and the statutory basis are visible to
                the recipient.
              </p>
            </div>
          </div>
          <div style={{ marginTop: 13 }}>
            {[
              ['Case', 'CF-24-0198'],
              ['Legal basis', notice.legalBasis],
              ['Evidence packet', 'EVD-0198'],
              ['Expiry', '24 hours after delivery'],
            ].map((r) => (
              <div className="check-row" key={r[0]}>
                <span className="subtle">{r[0]}</span>
                <strong className={r[1].includes('CF-') || r[1].includes('EVD') ? 'mono' : ''}>
                  {r[1]}
                </strong>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 17 }}>
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={() =>
                setToast(
                  notice.status === 'Draft' ? 'Draft opened for editing' : 'Reminder sent to ' + notice.vasp
                )
              }
              data-testid="button-vault-primary"
            >
              {notice.status === 'Draft' ? 'Review draft' : 'Send reminder'}
            </button>
            <button className="icon-btn" aria-label="More request actions" data-testid="button-vault-more">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </PortalShell>
  );
}
