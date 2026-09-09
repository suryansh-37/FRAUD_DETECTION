import { Search } from 'lucide-react';

export function EmptyState({
  title,
  text,
  action,
  actionLabel,
}: {
  title: string;
  text: string;
  action?: () => void;
  actionLabel?: string;
}) {
  return (
    <div className="panel" style={{ padding: '70px 20px', textAlign: 'center' }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'hsl(var(--secondary))',
          display: 'grid',
          placeItems: 'center',
          margin: '0 auto 16px',
        }}
      >
        <Search size={18} color="hsl(var(--muted-foreground))" />
      </div>
      <h3 className="title-serif" style={{ fontSize: 24 }}>
        {title}
      </h3>
      <p className="subtle" style={{ fontSize: 12, margin: '8px auto 17px', maxWidth: 340 }}>
        {text}
      </p>
      {action && (
        <button className="btn btn-secondary" onClick={action} data-testid="button-empty-action">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
