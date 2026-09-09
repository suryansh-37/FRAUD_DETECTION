import { useState } from 'react';
import { Link } from 'wouter';
import { CircleAlert, Check, ChevronDown } from 'lucide-react';
import { cases } from '../data/mockData';
import { PortalShell } from '../components/layout/PortalShell';
import { RiskBadge } from '../components/shared/RiskBadge';
import { EmptyState } from '../components/shared/EmptyState';
import { Toast } from '../components/shared/Toast';

export function Approvals() {
  const [items, setItems] = useState(cases.slice(0, 3));
  const [toast, setToast] = useState('');

  const decide = (id: string, action: string) => {
    setItems(items.filter((i) => i.id !== id));
    setToast(`${id} ${action.toLowerCase()} and recorded`);
  };

  return (
    <PortalShell title="Approvals">
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow">Supervisor review</div>
        <h1 className="page-title">The decision desk.</h1>
        <p className="subtle" style={{ fontSize: 13, marginTop: 9 }}>
          Requests are ordered by urgency, not arrival time.
        </p>
      </div>

      <div
        className="panel"
        style={{
          padding: 17,
          marginBottom: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: 'hsl(3 44% 44%/.1)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <CircleAlert size={20} color="hsl(var(--destructive))" />
        </div>
        <div style={{ flex: 1 }}>
          <strong style={{ fontSize: 13 }}>2 requests have assets in motion</strong>
          <p className="subtle" style={{ fontSize: 11, margin: '3px 0 0' }}>
            A decision within the next 3 hours protects the strongest evidence.
          </p>
        </div>
        <span className="badge badge-high">Priority lane</span>
      </div>

      {items.length ? (
        <div style={{ display: 'grid', gap: 10 }}>
          {items.map((item, i) => (
            <div className={`panel panel-hover animate-rise delay-${i + 1}`} style={{ padding: 18 }} key={item.id}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 15,
                  alignItems: 'start',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div className="eyebrow">
                    {item.id} · {item.vasp}
                  </div>
                  <h3 className="title-serif" style={{ fontSize: 22, margin: '6px 0' }}>
                    {item.title}
                  </h3>
                  <p className="subtle" style={{ fontSize: 11 }}>
                    {item.location} · filed by {item.assignee} · {item.updatedAt}
                  </p>
                </div>
                <RiskBadge score={item.riskScore} />
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 22,
                  margin: '18px 0',
                  padding: '12px 0',
                  borderTop: '1px solid hsl(var(--border))',
                  borderBottom: '1px solid hsl(var(--border))',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div className="eyebrow">Request</div>
                  <strong style={{ fontSize: 13 }}>Freeze linked wallet</strong>
                </div>
                <div>
                  <div className="eyebrow">Amount</div>
                  <strong className="mono">₹{item.amount.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <div className="eyebrow">Evidence</div>
                  <strong style={{ fontSize: 13 }}>{item.hops} resolved hops</strong>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <div className="eyebrow">Legal basis</div>
                  <strong className="mono">BNSS §106</strong>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <Link
                  href={`/portal/cases/${item.id}`}
                  className="btn btn-ghost"
                  data-testid={`link-approval-case-${item.id}`}
                >
                  Open case <ChevronDown size={13} style={{ transform: 'rotate(-90deg)' }} />
                </Link>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn btn-ghost"
                    onClick={() => decide(item.id, 'Rejected')}
                    data-testid={`button-reject-${item.id}`}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => decide(item.id, 'Approved')}
                    data-testid={`button-approve-${item.id}`}
                  >
                    <Check size={13} /> Approve & send
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Queue is clear"
          text="Approved and rejected requests will appear in the audit record."
        />
      )}

      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </PortalShell>
  );
}
