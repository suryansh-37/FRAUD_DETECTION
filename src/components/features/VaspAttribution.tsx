import { BadgeCheck } from 'lucide-react';

export function VaspAttribution({ vasp }: { vasp: string }) {
  return (
    <div className="panel" style={{ padding: 17, marginBottom: 14 }}>
      <div className="section-head">
        <div>
          <div className="eyebrow">Attribution / intelligence result</div>
          <h2 className="title-serif" style={{ fontSize: 26, marginTop: 5 }}>
            {vasp}
          </h2>
        </div>
        <BadgeCheck size={19} color="hsl(var(--accent))" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 13 }}>
        <div style={{ height: 8, flex: 1, background: 'hsl(var(--secondary))', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '86%', background: 'hsl(var(--accent))', borderRadius: 99 }} />
        </div>
        <strong className="mono">86% confidence</strong>
      </div>
      <p className="subtle" style={{ fontSize: 11, lineHeight: 1.55, margin: '12px 0 0' }}>
        This is an attribution lead, not an absolute identity claim. Confirm with the supporting evidence before sending a legal request.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 14 }}>
        {[
          ['Deposit cluster', '4 matching hops'],
          ['Known endpoint', '98% address overlap'],
          ['Jurisdiction', 'India · onboarded'],
        ].map((row) => (
          <div key={row[0]} style={{ padding: 10, border: '1px solid hsl(var(--border))', borderRadius: 8 }}>
            <span className="subtle" style={{ display: 'block', fontSize: 10 }}>
              {row[0]}
            </span>
            <strong style={{ display: 'block', fontSize: 11, marginTop: 4 }}>{row[1]}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
