import { useClerk } from '@clerk/react';
import { useLocation } from 'wouter';
import { Menu, Bell } from 'lucide-react';
import type { Role } from '../../types';
import { basePath } from '../../services/blockchain';

export function TopbarBase({
  title,
  role,
  onSignOut,
}: {
  title: string;
  role: Role;
  onSignOut: () => void;
}) {
  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          className="icon-btn mobile-menu"
          onClick={() => window.alert('Use the workspace links in the desktop navigation.')}
          aria-label="Open navigation"
          data-testid="button-mobile-menu"
        >
          <Menu size={17} />
        </button>
        <div>
          <div className="eyebrow">Trace-X / protected workspace</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 3 }}>{title}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <button
          className="icon-btn"
          onClick={() => window.alert('No new notifications.')}
          aria-label="Notifications"
          data-testid="button-notifications"
        >
          <Bell size={16} />
        </button>
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
              background: role.accent,
              display: 'grid',
              placeItems: 'center',
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            AK
          </span>
          <span className="mono" style={{ display: 'none' }}>
            {role.key}
          </span>
          <button onClick={onSignOut} className="btn btn-ghost" data-testid="button-sign-out">
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

export function Topbar({ title, role }: { title: string; role: Role }) {
  const { signOut } = useClerk();
  return <TopbarBase title={title} role={role} onSignOut={() => signOut({ redirectUrl: basePath || '/' })} />;
}

export function DemoTopbar({ title, role }: { title: string; role: Role }) {
  const [, setLocation] = useLocation();
  return <TopbarBase title={title} role={role} onSignOut={() => setLocation('/')} />;
}
