import { Link } from 'wouter';

export function NotFound() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'grid',
        placeItems: 'center',
        padding: 20,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div className="eyebrow">Trace-X / 404</div>
        <h1 className="page-title">That room is not here.</h1>
        <Link href="/" className="btn btn-primary" style={{ marginTop: 20 }} data-testid="link-not-found-home">
          Return home
        </Link>
      </div>
    </div>
  );
}
