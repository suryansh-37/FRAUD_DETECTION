import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Menu, Bell, ChevronDown, ShieldCheck, User } from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { useClerk } from '@clerk/react';
import { basePath } from '../../services/blockchain';

export function TopbarBase({
  title,
  onSignOut,
}: {
  title: string;
  onSignOut: () => void;
}) {
  const { currentUser, loginAs } = useAuth();
  const [, setLocation] = useLocation();
  const [openSwitcher, setOpenSwitcher] = useState(false);

  const switchRole = (role: UserRole, targetRoute: string) => {
    loginAs(role);
    setOpenSwitcher(false);
    setLocation(targetRoute);
  };

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          className="icon-btn mobile-menu"
          onClick={() => window.alert('Navigation menu is available in the desktop view.')}
          aria-label="Open navigation"
        >
          <Menu size={17} />
        </button>
        <div>
          <div className="eyebrow">Trace-X · National Cyber Forensic Grid</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{title}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Quick Persona Switcher in Topbar */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setOpenSwitcher(!openSwitcher)}
            className="btn btn-secondary"
            style={{ fontSize: 11, padding: '6px 10px', gap: 6 }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background:
                  currentUser.role === 'admin'
                    ? 'hsl(var(--accent))'
                    : currentUser.role === 'victim'
                    ? 'hsl(var(--destructive))'
                    : 'hsl(157 24% 38%)',
              }}
            />
            <span>
              Persona: <strong>{currentUser.title.split('/')[0]}</strong>
            </span>
            <ChevronDown size={12} />
          </button>

          {openSwitcher && (
            <div
              className="panel"
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                width: 250,
                padding: 6,
                zIndex: 50,
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div className="eyebrow" style={{ padding: '6px 8px', borderBottom: '1px solid hsl(var(--border))' }}>
                Switch Active Persona
              </div>
              <button
                type="button"
                onClick={() => switchRole('victim', '/victim')}
                className="nav-item"
                style={{
                  width: '100%',
                  border: 0,
                  textAlign: 'left',
                  background: currentUser.role === 'victim' ? 'hsl(var(--muted))' : 'transparent',
                  padding: '8px 10px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 12 }}>🛡️ Citizen / Victim</div>
                  <div className="subtle" style={{ fontSize: 10 }}>Report fraud & track status</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => switchRole('investigator', '/portal/investigate')}
                className="nav-item"
                style={{
                  width: '100%',
                  border: 0,
                  textAlign: 'left',
                  background: currentUser.role === 'investigator' ? 'hsl(var(--muted))' : 'transparent',
                  padding: '8px 10px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 12 }}>🔍 Cyber Investigator</div>
                  <div className="subtle" style={{ fontSize: 10 }}>Forensics, trace graph & reports</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => switchRole('admin', '/admin/monitoring')}
                className="nav-item"
                style={{
                  width: '100%',
                  border: 0,
                  textAlign: 'left',
                  background: currentUser.role === 'admin' ? 'hsl(var(--muted))' : 'transparent',
                  padding: '8px 10px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 12 }}>⚙️ System Admin</div>
                  <div className="subtle" style={{ fontSize: 10 }}>User RBAC & node telemetry</div>
                </div>
              </button>
            </div>
          )}
        </div>

        <button
          className="icon-btn"
          onClick={() => window.alert('System notifications: All blockchain node listeners synced.')}
          aria-label="Notifications"
        >
          <Bell size={16} />
        </button>

        {/* User Badge & Sign out */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            paddingLeft: 8,
            borderLeft: '1px solid hsl(var(--border))',
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              display: 'grid',
              placeItems: 'center',
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            {currentUser.initials}
          </span>
          <button onClick={onSignOut} className="btn btn-ghost" style={{ fontSize: 11 }}>
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

export function Topbar({ title }: { title: string; role?: any }) {
  const { signOut } = useClerk();
  return <TopbarBase title={title} onSignOut={() => signOut({ redirectUrl: basePath || '/' })} />;
}

export function DemoTopbar({ title }: { title: string; role?: any }) {
  const [, setLocation] = useLocation();
  return <TopbarBase title={title} onSignOut={() => setLocation('/sign-in')} />;
}
