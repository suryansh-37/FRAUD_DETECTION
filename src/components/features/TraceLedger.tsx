import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { traceNodes } from '../../data/mockData';

export function TraceLedger() {
  return (
    <div className="panel" style={{ padding: 17, marginTop: 14 }}>
      <div className="section-head">
        <div>
          <div className="section-title">Transfer evidence</div>
          <div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>
            Directional ledger events supporting the trace
          </div>
        </div>
        <span className="badge badge-neutral">6 events</span>
      </div>
      <div className="table-wrap" style={{ marginTop: 10 }}>
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Network</th>
              <th>Direction</th>
              <th>Amount</th>
              <th>Transaction</th>
            </tr>
          </thead>
          <tbody>
            {traceNodes.map((node) => (
              <tr key={node.address}>
                <td>
                  <strong style={{ fontSize: 11 }}>{node.label}</strong>
                  <span className="subtle" style={{ display: 'block', fontSize: 10, marginTop: 3 }}>
                    {node.timestamp}
                  </span>
                </td>
                <td>
                  <span className={`badge ${node.type === 'bridge' ? 'badge-medium' : 'badge-neutral'}`}>
                    {node.chain}
                  </span>
                </td>
                <td>
                  {node.direction === 'in' ? (
                    <span
                      style={{
                        color: 'hsl(var(--accent))',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 11,
                      }}
                    >
                      <ArrowDownLeft size={13} /> In
                    </span>
                  ) : (
                    <span
                      style={{
                        color: 'hsl(var(--destructive))',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 11,
                      }}
                    >
                      <ArrowUpRight size={13} /> Out
                    </span>
                  )}
                </td>
                <td className="mono">{node.amount}</td>
                <td>
                  <span className="mono subtle">{node.txHash}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
