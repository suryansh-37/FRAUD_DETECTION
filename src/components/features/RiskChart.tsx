export function RiskChart() {
  return (
    <svg
      className="chart-svg"
      viewBox="0 0 720 210"
      role="img"
      aria-label="Risk activity line chart"
      data-testid="chart-risk-activity"
    >
      <g stroke="hsl(var(--border))" strokeWidth="1">
        <line x1="0" y1="34" x2="720" y2="34" />
        <line x1="0" y1="86" x2="720" y2="86" />
        <line x1="0" y1="138" x2="720" y2="138" />
        <line x1="0" y1="190" x2="720" y2="190" />
      </g>
      <path
        d="M0 158 C35 149 50 171 78 150 S121 94 150 119 S189 141 222 104 S267 128 294 96 S339 71 368 91 S412 144 446 109 S487 88 516 108 S554 73 583 84 S620 44 648 67 S688 52 720 42"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="3"
        className="trace-line"
      />
      <path
        d="M0 158 C35 149 50 171 78 150 S121 94 150 119 S189 141 222 104 S267 128 294 96 S339 71 368 91 S412 144 446 109 S487 88 516 108 S554 73 583 84 S620 44 648 67 S688 52 720 42 L720 210 L0 210Z"
        fill="hsl(var(--accent)/.1)"
      />
      <g fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="var(--app-font-mono)">
        <text x="0" y="207">01 JUN</text>
        <text x="178" y="207">04 JUN</text>
        <text x="360" y="207">08 JUN</text>
        <text x="544" y="207">11 JUN</text>
        <text x="675" y="207">14 JUN</text>
      </g>
    </svg>
  );
}
