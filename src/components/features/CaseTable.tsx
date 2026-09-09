import { Link } from 'wouter';
import type { Case } from '../../types';
import { RiskBadge } from '../shared/RiskBadge';

export function CaseTable({ rows }: { rows: Case[] }) {
  return (
    <div className="panel table-wrap">
      <table>
        <thead>
          <tr>
            <th>Case</th>
            <th>Risk</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Movement</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item, i) => (
            <tr key={item.id} className={`animate-rise delay-${Math.min(i + 1, 3)}`}>
              <td>
                <Link href={`/portal/cases/${item.id}`} data-testid={`link-case-${item.id}`}>
                  <strong style={{ display: 'block', fontSize: 12 }}>{item.title}</strong>
                  <span className="mono subtle">
                    {item.id} · {item.location}
                  </span>
                </Link>
              </td>
              <td>
                <RiskBadge score={item.riskScore} />
              </td>
              <td>
                <span className="mono">₹{item.amount.toLocaleString('en-IN')}</span>
                <span className="subtle" style={{ display: 'block', fontSize: 10 }}>
                  {item.hops} hops
                </span>
              </td>
              <td>
                <span className="badge badge-neutral">{item.status}</span>
              </td>
              <td>
                <span
                  style={{
                    fontSize: 11,
                    color:
                      item.movementStatus === 'Movement detected'
                        ? 'hsl(var(--destructive))'
                        : 'hsl(var(--muted-foreground))',
                  }}
                >
                  {item.movementStatus}
                </span>
              </td>
              <td className="subtle" style={{ whiteSpace: 'nowrap' }}>
                {item.updatedAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
