import { useState } from 'react';
import { Link } from 'wouter';
import { ClipboardCheck, CircleCheck, Users, FileText } from 'lucide-react';
import { cases } from '../data/mockData';
import { PortalShell } from '../components/layout/PortalShell';

export function Reports() {
  const [generated, setGenerated] = useState<string[]>([]);

  return (
    <PortalShell title="Case reports">
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow">Architecture / evidence output</div>
        <h1 className="page-title">Make the trail legible.</h1>
        <p className="subtle" style={{ fontSize: 13, marginTop: 9 }}>
          Turn validated tracing, risk, alerts, and legal basis into a reviewable case report.
        </p>
      </div>
      <div className="content-grid">
        <div>
          <div className="panel table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Report</th>
                  <th>Case</th>
                  <th>Evidence</th>
                  <th>State</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cases.slice(0, 4).map((item) => {
                  const ready = generated.includes(item.id);
                  return (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.title}</strong>
                        <span className="mono subtle" style={{ display: 'block', marginTop: 4 }}>
                          RPT-{item.id.slice(-4)}
                        </span>
                      </td>
                      <td>
                        <Link className="mono" href={`/portal/cases/${item.id}`}>
                          {item.id}
                        </Link>
                      </td>
                      <td>
                        {item.hops} hops · {item.vasp}
                      </td>
                      <td>
                        <span className={`badge ${ready ? 'badge-low' : 'badge-neutral'}`}>
                          {ready ? 'Generated' : 'Draft'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setGenerated([...generated, item.id])}
                          disabled={ready}
                          data-testid={`button-generate-report-${item.id}`}
                        >
                          <FileText size={13} /> {ready ? 'Ready' : 'Generate'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="panel" style={{ padding: 18 }}>
            <div className="section-head">
              <div className="section-title">Report contents</div>
              <ClipboardCheck size={17} color="hsl(var(--accent))" />
            </div>
            {[
              'Complaint source and wallet validation',
              'Money flow, wallet, and network details',
              'Intermediary wallet findings',
              'VASP / exchange attribution',
              'Risk score, typology, and alerts',
              'Investigator / LEA handoff record',
            ].map((x, i) => (
              <div className="check-row" key={x}>
                <span style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11 }}>
                  <CircleCheck size={14} color="hsl(var(--accent))" />
                  {x}
                </span>
                <span className="mono subtle">0{i + 1}</span>
              </div>
            ))}
            <Link
              href="/portal/handoffs"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 15 }}
              data-testid="link-report-to-handoff"
            >
              <Users size={13} /> Prepare investigator handoff
            </Link>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
