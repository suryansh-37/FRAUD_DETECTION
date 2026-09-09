import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard,
  FileText,
  ScanSearch,
  TriangleAlert,
  FileSearch,
  ClipboardCheck,
  Users,
  Globe2,
  WalletCards,
  DatabaseZap,
  SlidersHorizontal,
  ShieldCheck,
  Settings,
  ChevronDown,
} from 'lucide-react';
import type { Role } from '../../types';
import { roles } from '../../data/mockData';
import { Logo } from '../shared/Logo';

export function Sidebar({ role, setRole }: { role: Role; setRole: (role: Role) => void }) {
  const [location] = useLocation();
  const [openRole, setOpenRole] = useState(false);

  const links = [
    { href: '/portal', label: 'Overview', icon: LayoutDashboard },
    { href: '/portal/complaints', label: 'Complaint intake', icon: FileText },
    { href: '/portal/investigate', label: 'Investigate wallet', icon: ScanSearch },
    { href: '/portal/alerts', label: 'Alerts', icon: TriangleAlert },
    { href: '/portal/cases', label: 'Case register', icon: FileSearch },
    { href: '/portal/reports', label: 'Case reports', icon: ClipboardCheck },
    { href: '/portal/handoffs', label: 'Investigator / LEA', icon: Users },
    { href: '/portal/approvals', label: 'Approvals', icon: ClipboardCheck },
    { href: '/portal/coordination', label: 'Coordination', icon: Globe2 },
    { href: '/portal/vault', label: 'VASP vault', icon: WalletCards },
    { href: '/portal/integrations', label: 'NCRP · SAHYOG', icon: DatabaseZap },
  ];

  return (
    <aside className="cfap-sidebar">
      <Logo dark />
      <div className="nav-label">Workspace</div>
      {links.map((item) => {
        const Icon = item.icon;
        const isActive =
          location === item.href || (item.href !== '/portal' && location.startsWith(item.href));
        return (
          <Link
            href={item.href}
            key={item.href}
            className={`nav-item ${isActive ? 'active' : ''}`}
            data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <Icon size={16} />
            {item.label}
            {item.label === 'Approvals' && (
              <span style={{ marginLeft: 'auto', fontSize: 10, color: 'hsl(var(--sidebar-primary))' }}>
                6
              </span>
            )}
          </Link>
        );
      })}

      <div className="nav-label">Governance</div>
      <Link
        href="/portal/operations"
        className={`nav-item ${location.startsWith('/portal/operations') ? 'active' : ''}`}
        data-testid="link-nav-operations"
      >
        <SlidersHorizontal size={16} />
        Operations
      </Link>
      <Link
        href="/portal/audit"
        className={`nav-item ${location.startsWith('/portal/audit') ? 'active' : ''}`}
        data-testid="link-nav-audit"
      >
        <ShieldCheck size={16} />
        Audit review
      </Link>
      <Link
        href="/portal/settings"
        className={`nav-item ${location.startsWith('/portal/settings') ? 'active' : ''}`}
        data-testid="link-nav-settings"
      >
        <Settings size={16} />
        Settings
      </Link>

      <div style={{ marginTop: 'auto', position: 'relative' }}>
        <button
          className="nav-item"
          style={{ width: '100%', border: 0, background: 'transparent', textAlign: 'left' }}
          onClick={() => setOpenRole(!openRole)}
          data-testid="button-role-switcher"
        >
          <span
            style={{
              width: 27,
              height: 27,
              borderRadius: 7,
              background: role.accent,
              color: 'hsl(var(--sidebar))',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 700,
              fontSize: 11,
            }}
          >
            AK
          </span>
          <span style={{ flex: 1, overflow: 'hidden' }}>
            <strong style={{ display: 'block', fontSize: 12, color: 'hsl(var(--sidebar-foreground))' }}>
              Aarav Kulkarni
            </strong>
            <small
              style={{
                display: 'block',
                fontSize: 10,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {role.label}
            </small>
          </span>
          <ChevronDown size={14} />
        </button>

        {openRole && (
          <div
            className="panel"
            style={{
              position: 'absolute',
              bottom: 55,
              left: 0,
              width: 220,
              padding: 6,
              zIndex: 20,
              background: 'hsl(var(--sidebar))',
              color: 'hsl(var(--sidebar-foreground))',
              borderColor: 'hsl(var(--sidebar-border))',
            }}
          >
            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => {
                  setRole(r);
                  setOpenRole(false);
                }}
                data-testid={`button-role-${r.key}`}
                style={{
                  display: 'block',
                  width: '100%',
                  border: 0,
                  background: 'transparent',
                  textAlign: 'left',
                  padding: '9px 8px',
                  borderRadius: 5,
                  color: 'inherit',
                  fontSize: 11,
                }}
              >
                <span style={{ display: 'block', fontWeight: 600 }}>{r.label}</span>
                <span style={{ display: 'block', opacity: 0.58, fontSize: 10, marginTop: 2 }}>
                  {r.description}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
