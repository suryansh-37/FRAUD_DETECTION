import { Link } from 'wouter';
import { ChevronDown, Network, LockKeyhole, ClipboardCheck } from 'lucide-react';
import { Logo } from '../components/shared/Logo';

export function Landing() {
  return (
    <main className="hero-landing min-h-[100dvh]">
      <nav className="landing-nav animate-rise">
        <Logo />
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link href="/sign-in" className="btn btn-ghost" data-testid="link-sign-in">
            Sign in
          </Link>
          <Link href="/sign-up" className="btn btn-primary" data-testid="link-sign-up">
            Request access <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
          </Link>
        </div>
      </nav>

      <section className="landing-container">
        <div className="hero-grid">
          <div className="hero-copy animate-rise">
            <div className="eyebrow">National cybercrime coordination · v2.4</div>
            <h1>
              Follow the money.
              <br />
              <em>Hold the line.</em>
            </h1>
            <p>
              Trace-X gives India’s cybercrime teams one protected evidence room for tracing digital
              assets, moving faster on freezes, and explaining every decision in plain language.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
              <Link href="/sign-up" className="btn btn-primary" data-testid="button-landing-access">
                Enter the evidence room <ChevronDown size={15} style={{ transform: 'rotate(-90deg)' }} />
              </Link>
              <a href="#method" className="btn btn-ghost" data-testid="link-learn-method">
                See how it works
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 50 }}>
              <span
                className="pulse-soft"
                style={{ width: 8, height: 8, borderRadius: '50%', background: 'hsl(var(--accent))' }}
              />
              <span className="mono subtle">247 teams protected · live network</span>
            </div>
          </div>

          <div className="hero-art animate-rise delay-1">
            <div className="art-grid">
              <div className="art-copy">
                <div className="eyebrow" style={{ color: 'hsl(var(--sidebar-foreground)/.55)' }}>
                  Trace / CF-24-0198
                </div>
                <h3>A clear path from report to freeze.</h3>
                <p
                  style={{
                    fontSize: 12,
                    color: 'hsl(var(--sidebar-foreground)/.62)',
                    maxWidth: 250,
                    lineHeight: 1.5,
                  }}
                >
                  Six hops resolved · one notice ready for review.
                </p>
                <div style={{ marginTop: 70, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className="badge badge-high">Risk signal</span>
                  <span className="mono" style={{ color: 'hsl(var(--sidebar-foreground)/.48)' }}>
                    ₹2,84,700
                  </span>
                </div>
              </div>
              <div className="art-node" style={{ left: '20%', top: '62%' }} />
              <div className="art-node" style={{ left: '52%', top: '33%', background: 'hsl(38 30% 95%)' }} />
              <div className="art-node" style={{ left: '72%', top: '62%', background: 'hsl(31 68% 56%)' }} />
            </div>
          </div>
        </div>
      </section>

      <section id="method" className="landing-section">
        <div className="section-head">
          <div>
            <div className="eyebrow">A calmer operating picture</div>
            <h2 className="page-title">Signal, not noise.</h2>
          </div>
          <p className="subtle" style={{ maxWidth: 300, fontSize: 13, lineHeight: 1.5 }}>
            Built around the moment a reported wallet becomes an accountable action.
          </p>
        </div>
        <div className="feature-grid">
          <article className="panel feature-card panel-hover">
            <Network size={19} color="hsl(var(--accent))" />
            <h3>Trace with context</h3>
            <p>
              See hops, counterparties, typology, and confidence in one readable graph. Every signal has a
              reason.
            </p>
          </article>
          <article className="panel feature-card panel-hover">
            <LockKeyhole size={19} color="hsl(var(--accent))" />
            <h3>Move with proof</h3>
            <p>
              Draft a scoped VASP notice without leaving the case. Preserve the legal basis and delivery trail.
            </p>
          </article>
          <article className="panel feature-card panel-hover">
            <ClipboardCheck size={19} color="hsl(var(--accent))" />
            <h3>Stand behind it</h3>
            <p>
              Seal activity as a court-ready chain of custody, designed for the person who reviews it later.
            </p>
          </article>
        </div>
      </section>

      <section className="landing-section" style={{ paddingTop: 20 }}>
        <div
          className="panel"
          style={{
            padding: '35px 35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 25,
            flexWrap: 'wrap',
            background: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
          }}
        >
          <div>
            <div className="eyebrow" style={{ color: 'hsl(var(--primary-foreground)/.56)' }}>
              For the people keeping pace
            </div>
            <h2 className="title-serif" style={{ fontSize: 32, margin: '10px 0 0' }}>
              The next action should never be a guess.
            </h2>
          </div>
          <Link
            href="/sign-up"
            className="btn"
            style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}
            data-testid="button-landing-join"
          >
            Join your workspace <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <span>
            <Logo />
          </span>
          <span>Trace-X / Protected coordination layer for digital asset investigations</span>
          <span className="mono">India · 2024—25</span>
        </div>
      </footer>
    </main>
  );
}
