import { useState } from 'react';
import { Link } from 'wouter';
import { Check, Send } from 'lucide-react';
import { cases } from '../data/mockData';
import { PortalShell } from '../components/layout/PortalShell';

export function Handoffs() {
  const [sent, setSent] = useState<string[]>([]);

  return (
    <PortalShell title="Investigator / LEA">
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow">Architecture / final handoff</div>
        <h1 className="page-title">Put the right file in the right hands.</h1>
        <p className="subtle" style={{ fontSize: 13, marginTop: 9 }}>
          Share only the reviewed case report, evidence scope, and legal basis required for the next action.
        </p>
      </div>

      <div className="panel" style={{ padding: 18, marginBottom: 14 }}>
        <div className="section-head">
          <div>
            <div className="section-title">Handoff readiness</div>
            <div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>
              Investigator and law-enforcement recipients
            </div>
          </div>
          <span className="badge badge-low">Least privilege</span>
        </div>
        <div className="two-col">
          {[
            ['Reports ready', '04', 'Generated case reports'],
            ['Evidence sealed', '03', 'Chain of custody verified'],
            ['Recipients', '08', 'Investigator / LEA teams'],
            ['Pending acknowledgement', '02', 'Follow-up required'],
          ].map((row) => (
            <div
              className="metric"
              style={{ border: '1px solid hsl(var(--border))', borderRadius: 8 }}
              key={row[0]}
            >
              <div className="eyebrow">{row[0]}</div>
              <div className="metric-value" style={{ fontSize: 25 }}>
                {row[1]}
              </div>
              <div className="metric-note">{row[2]}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        {cases.slice(0, 3).map((item) => {
          const delivered = sent.includes(item.id);
          return (
            <div className="panel panel-hover" style={{ padding: 18 }} key={item.id}>
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
                    {item.id} · {item.location}
                  </div>
                  <h3 className="title-serif" style={{ fontSize: 23, margin: '5px 0' }}>
                    {item.title}
                  </h3>
                  <p className="subtle" style={{ fontSize: 11 }}>
                    Report, trace, VASP attribution, and legal basis are{' '}
                    {delivered ? 'with the recipient' : 'ready for review'}.
                  </p>
                </div>
                <span className={`badge ${delivered ? 'badge-low' : 'badge-medium'}`}>
                  {delivered ? 'Delivered' : 'Ready to send'}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 15,
                  paddingTop: 12,
                  borderTop: '1px solid hsl(var(--border))',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  <span className="badge badge-neutral">Case report</span>
                  <span className="badge badge-neutral">Evidence packet</span>
                  <span className="badge badge-neutral">BNSS §106</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link href={`/portal/cases/${item.id}`} className="btn btn-ghost">
                    Review file
                  </Link>
                  <button
                    className="btn btn-primary"
                    onClick={() => setSent([...sent, item.id])}
                    disabled={delivered}
                    data-testid={`button-send-handoff-${item.id}`}
                  >
                    {delivered ? <Check size={13} /> : <Send size={13} />}{' '}
                    {delivered ? 'Handoff sent' : 'Send handoff'}
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
