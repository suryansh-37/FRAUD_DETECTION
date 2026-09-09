import { traceNodes } from '../../data/mockData';

export function TraceGraph() {
  return (
    <div className="trace-wrap">
      <svg
        viewBox="0 0 730 390"
        role="img"
        aria-label="Transaction trace graph"
        data-testid="graph-trace"
      >
        <g fill="none" stroke="hsl(74 19% 52%/.5)" strokeWidth="1.3">
          <path className="trace-line" d="M92 185 C155 185 179 100 266 100" />
          <path className="trace-line" d="M92 185 C155 185 179 275 266 275" />
          <path className="trace-line" d="M276 100 C355 100 370 140 466 140" />
          <path className="trace-line" d="M276 275 C355 275 370 310 466 310" />
          <path className="trace-line" d="M476 140 C550 140 565 220 660 220" />
          <path className="trace-line" d="M476 310 C555 310 565 220 660 220" />
        </g>
        {traceNodes.map((n, i) => (
          <g
            key={n.address}
            className={`animate-rise delay-${Math.min(i + 1, 3)}`}
            transform={`translate(${n.x},${n.y})`}
          >
            <circle
              r={n.type === 'source' ? 22 : 18}
              fill={
                n.type === 'vasp'
                  ? 'hsl(31 68% 56%)'
                  : n.type === 'source'
                  ? 'hsl(3 44% 44%)'
                  : 'hsl(74 19% 52%)'
              }
              opacity=".95"
            />
            <circle
              r={n.type === 'source' ? 28 : 23}
              fill="none"
              stroke="hsl(38 30% 95%/.18)"
            />
            <text x="0" y="43" textAnchor="middle" className="trace-label">
              {n.label}
            </text>
            <text x="0" y="57" textAnchor="middle" className="trace-address">
              {n.address}
            </text>
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill="hsl(155 18% 18%)"
              fontSize="9"
              fontFamily="var(--app-font-mono)"
            >
              {n.risk}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
