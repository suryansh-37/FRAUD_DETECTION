export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="brand-mark" style={dark ? { color: 'hsl(var(--sidebar-foreground))' } : undefined}>
      <span className="brand-symbol" />
      <span>Trace-X</span>
    </div>
  );
}
