import { Link } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { Logo } from '../components/shared/Logo';

export function DemoSignIn() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'grid',
        placeItems: 'center',
        padding: 20,
        background: 'hsl(var(--background))',
      }}
    >
      <div className="panel" style={{ width: '100%', maxWidth: 440, padding: 28 }}>
        <Logo />
        <div className="eyebrow" style={{ marginTop: 42 }}>
          Protected workspace
        </div>
        <h1 className="title-serif" style={{ fontSize: 38, margin: '8px 0' }}>
          Welcome back.
        </h1>
        <p className="subtle" style={{ fontSize: 12, lineHeight: 1.5 }}>
          Development preview access is enabled. In production, this screen is powered by Clerk.
        </p>
        <Link
          href="/portal"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 20 }}
          data-testid="button-demo-sign-in"
        >
          Continue to Trace-X <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
        </Link>
        <Link href="/" className="btn btn-ghost" style={{ width: '100%', marginTop: 8 }} data-testid="link-demo-home">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export function DemoSignUp() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'grid',
        placeItems: 'center',
        padding: 20,
        background: 'hsl(var(--background))',
      }}
    >
      <div className="panel" style={{ width: '100%', maxWidth: 440, padding: 28 }}>
        <Logo />
        <div className="eyebrow" style={{ marginTop: 42 }}>
          Request workspace access
        </div>
        <h1 className="title-serif" style={{ fontSize: 38, margin: '8px 0' }}>
          Start with clarity.
        </h1>
        <input className="input" placeholder="Work email" data-testid="input-demo-email" />
        <button
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 10 }}
          onClick={() => alert('Request received')}
          data-testid="button-demo-request"
        >
          Request access
        </button>
        <Link href="/sign-in" className="btn btn-ghost" style={{ width: '100%', marginTop: 8 }} data-testid="link-demo-sign-in">
          Already have access? Sign in
        </Link>
      </div>
    </div>
  );
}
