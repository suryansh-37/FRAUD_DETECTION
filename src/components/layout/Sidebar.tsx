import React, { useState } from 'react';
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
  ShieldAlert,
  Search,
  Activity,
  PlusCircle,
  PhoneCall,
} from 'lucide-react';
import { Logo } from '../shared/Logo';
import { useAuth, UserRole } from '../../context/AuthContext';

export function Sidebar({ role, setRole }: { role?: any; setRole?: (role: any) => void }) {
  const [location, setLocation] = useLocation();
  const { currentUser, loginAs } = useAuth();
  const [openRole, setOpenRole] = useState(false);

  // Dynamic Navigation Links based on active role
  const getNavSections = () => {
    if (currentUser.role === 'victim') {
      return [
        {
          label: 'Citizen Portal',
          links: [
            { href: '/victim', label: 'Citizen Home', icon: LayoutDashboard },
            { href: '/victim/report', label: 'Report Fraud', icon: PlusCircle },
            { href: '/victim/track', label: 'Track Status', icon: Search },
          ],
        },
        {
          label: 'National Grid',
          links: [
            { href: '/portal/vault', label: 'VASP Directory', icon: WalletCards },
          ],
        },
      ];
    }

    if (currentUser.role === 'admin') {
      return [
        {
          label: 'Control Center',
          links: [
            { href: '/admin/monitoring', label: 'System Monitoring', icon: Activity },
            { href: '/admin/users', label: 'User Management', icon: Users },
          ],
        },
        {
          label: 'Governance',
          links: [
            { href: '/portal/operations', label: 'Node Operations', icon: SlidersHorizontal },
            { href: '/portal/audit', label: 'Security Audit', icon: ShieldCheck },
            { href: '/portal/settings', label: 'Settings', icon: Settings },
          ],
        },
      ];
    }

    // Default: Investigator role
    return [
      {
        label: 'Forensic Workspace',
        links: [
          { href: '/portal', label: 'Overview', icon: LayoutDashboard },
          { href: '/portal/investigate', label: 'Investigate wallet', icon: ScanSearch },
          { href: '/portal/cases', label: 'Case register', icon: FileSearch },
          { href: '/portal/complaints', label: 'Citizen complaints', icon: FileText },
          { href: '/portal/alerts', label: 'Alerts', icon: TriangleAlert },
          { href: '/portal/reports', label: 'Case reports', icon: ClipboardCheck },
          { href: '/portal/approvals', label: 'Approvals', icon: ClipboardCheck, badge: 6 },
          { href: '/portal/vault', label: 'VASP vault', icon: WalletCards },
        ],
      },
      {
        label: 'Governance',
        links: [
          { href: '/portal/coordination', label: 'Coordination', icon: Globe2 },
          { href: '/portal/operations', label: 'Operations', icon: SlidersHorizontal },
          { href: '/portal/audit', label: 'Audit review', icon: ShieldCheck },
        ],
      },
    ];
  };

  const sections = getNavSections();

  const handleSwitchPersona = (targetRole: UserRole, targetUrl: string) => {
    loginAs(targetRole);
    setOpenRole(false);
    setLocation(targetUrl);
  };

  return (
    <aside className="cfap-sidebar">
      <Logo dark />

      {sections.map((sec, idx) => (
        <React.Fragment key={idx}>
          <div className="nav-label">{sec.label}</div>
          {sec.links.map((item) => {
            const Icon = item.icon;
            const isActive =
              location === item.href ||
              (item.href !== '/portal' && item.href !== '/victim' && location.startsWith(item.href));

            return (
              <Link
                href={item.href}
                key={item.href}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} />
                {item.label}
                {item.badge && (
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: 'hsl(var(--sidebar-primary))' }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </React.Fragment>
      ))}

      {/* Profile & Switcher at bottom */}
      <div style={{ marginTop: 'auto', position: 'relative', paddingTop: 14 }}>
        <button
          type="button"
          className="nav-item"
          style={{ width: '100%', border: 0, background: 'transparent', textAlign: 'left' }}
          onClick={() => setOpenRole(!openRole)}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background:
                currentUser.role === 'admin'
                  ? 'hsl(var(--accent))'
                  : currentUser.role === 'victim'
                  ? 'hsl(var(--destructive))'
                  : 'hsl(157 24% 38%)',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 700,
              fontSize: 11,
            }}
          >
            {currentUser.initials}
          </span>
          <span style={{ flex: 1, overflow: 'hidden' }}>
            <strong style={{ display: 'block', fontSize: 12, color: 'hsl(var(--sidebar-foreground))' }}>
              {currentUser.name}
            </strong>
            <small
              style={{
                display: 'block',
                fontSize: 10,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: 'hsl(var(--sidebar-foreground)/.7)',
              }}
            >
              {currentUser.title}
            </small>
          </span>
          <ChevronDown size={14} />
        </button>

        {openRole && (
          <div
            className="panel"
            style={{
              position: 'absolute',
              bottom: 58,
              left: 0,
              width: 230,
              padding: 6,
              zIndex: 30,
              background: 'hsl(var(--sidebar))',
              color: 'hsl(var(--sidebar-foreground))',
              borderColor: 'hsl(var(--sidebar-border))',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div className="nav-label" style={{ margin: '4px 6px 8px', fontSize: 9 }}>
              Switch Persona & Portal
            </div>

            <button
              type="button"
              onClick={() => handleSwitchPersona('victim', '/victim')}
              style={{
                display: 'block',
                width: '100%',
                border: 0,
                background: currentUser.role === 'victim' ? 'hsl(var(--sidebar-accent))' : 'transparent',
                textAlign: 'left',
                padding: '8px',
                borderRadius: 5,
                color: 'inherit',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              <strong style={{ display: 'block' }}>🛡️ Citizen / Victim</strong>
              <small style={{ display: 'block', opacity: 0.6, fontSize: 9 }}>Report fraud & track case</small>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchPersona('investigator', '/portal/investigate')}
              style={{
                display: 'block',
                width: '100%',
                border: 0,
                background: currentUser.role === 'investigator' ? 'hsl(var(--sidebar-accent))' : 'transparent',
                textAlign: 'left',
                padding: '8px',
                borderRadius: 5,
                color: 'inherit',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              <strong style={{ display: 'block' }}>🔍 Cyber Investigator</strong>
              <small style={{ display: 'block', opacity: 0.6, fontSize: 9 }}>On-chain forensics & reports</small>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchPersona('admin', '/admin/monitoring')}
              style={{
                display: 'block',
                width: '100%',
                border: 0,
                background: currentUser.role === 'admin' ? 'hsl(var(--sidebar-accent))' : 'transparent',
                textAlign: 'left',
                padding: '8px',
                borderRadius: 5,
                color: 'inherit',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              <strong style={{ display: 'block' }}>⚙️ System Admin</strong>
              <small style={{ display: 'block', opacity: 0.6, fontSize: 9 }}>RBAC users & RPC nodes</small>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
