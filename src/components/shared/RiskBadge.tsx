export function RiskBadge({ score }: { score: number }) {
  return (
    <span className={`badge ${score >= 85 ? 'badge-high' : score >= 70 ? 'badge-medium' : 'badge-low'}`}>
      {score >= 85 ? 'High' : score >= 70 ? 'Elevated' : 'Guarded'} · {score}
    </span>
  );
}
