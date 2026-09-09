import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ShieldAlert, ScanSearch, Sliders, ChevronRight } from 'lucide-react';
import { Logo } from '../components/shared/Logo';
import { useAuth, UserRole } from '../context/AuthContext';

interface PortalOption {
  role: UserRole;
  title: string;
  desc: string;
  route: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  accent: string;
  iconBg: string;
}

const PORTAL_OPTIONS: PortalOption[] = [
  {
    role: 'victim',
    title: 'Victim Portal',
    desc: 'Report fraud & track status',
    route: '/victim',
    icon: ShieldAlert,
    accent: 'hsl(3 44% 44%)',
    iconBg: 'hsl(3 44% 44%/.12)',
  },
  {
    role: 'investigator',
    title: 'Investigator Dashboard',
    desc: 'Forensic tracing & case analysis',
    route: '/portal/investigate',
    icon: ScanSearch,
    accent: 'hsl(157 24% 38%)',
    iconBg: 'hsl(157 24% 38%/.15)',
  },
  {
    role: 'admin',
    title: 'Admin Panel',
    desc: 'Users & system monitoring',
    route: '/admin/monitoring',
    icon: Sliders,
    accent: 'hsl(74 19% 52%)',
    iconBg: 'hsl(74 19% 52%/.18)',
  },
];

export function DemoSignIn() {
  const { loginAs } = useAuth();
  const [, setLocation] = useLocation();
  const [hoveredRole, setHoveredRole] = useState<UserRole | null>(null);

  const handleSelectRole = (role: UserRole, targetRoute: string) => {
    loginAs(role);
    setLocation(targetRoute);
  };

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'grid',
        placeItems: 'center',
        padding: '32px 20px',
        background: 'hsl(var(--background))',
      }}
    >
      <div
        className="panel animate-rise"
        style={{
          width: '100%',
          maxWidth: 460,
          padding: '36px 32px',
          boxShadow: 'var(--shadow)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', marginBottom: 16 }}>
            <Logo />
          </div>
          <h1 className="title-serif" style={{ fontSize: 32, margin: '0 0 6px' }}>
            Sign In
          </h1>
          <p className="subtle" style={{ fontSize: 13, margin: 0 }}>
            Choose a portal to continue
          </p>
        </div>

        {/* 3 Clean Buttons with Silky Smooth Fade Transition */}
        <div style={{ display: 'grid', gap: 12 }}>
          {PORTAL_OPTIONS.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredRole === item.role;

            return (
              <button
                key={item.role}
                type="button"
                onClick={() => handleSelectRole(item.role, item.route)}
                onMouseEnter={() => setHoveredRole(item.role)}
                onMouseLeave={() => setHoveredRole(null)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 18px',
                  borderRadius: 10,
                  border: '1px solid',
                  borderColor: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                  background: 'hsl(var(--card))',
                  textAlign: 'left',
                  width: '100%',
                  cursor: 'pointer',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: isHovered ? 'var(--shadow)' : 'none',
                  transition: 'border-color 0.35s ease, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease',
                }}
              >
                {/* Smooth Dark Fade Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'hsl(var(--primary))',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.35s ease-in-out',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                />

                {/* Content with Z-Index */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  {/* Icon with Smooth Fade Badge */}
                  <div
                    style={{
                      position: 'relative',
                      width: 40,
                      height: 40,
                      borderRadius: 9,
                      display: 'grid',
                      placeItems: 'center',
                      flex: '0 0 auto',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Default tinted background */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: item.iconBg,
                        opacity: isHovered ? 0 : 1,
                        transition: 'opacity 0.35s ease-in-out',
                      }}
                    />
                    {/* Hover translucent white background */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(255, 255, 255, 0.15)',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.35s ease-in-out',
                      }}
                    />
                    {/* Icon with Color Fade */}
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        color: isHovered ? '#ffffff' : item.accent,
                        transition: 'color 0.35s ease-in-out',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Texts with Color Fade */}
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: isHovered ? '#ffffff' : 'hsl(var(--foreground))',
                        transition: 'color 0.35s ease-in-out',
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        marginTop: 2,
                        color: isHovered ? 'rgba(255, 255, 255, 0.78)' : 'hsl(var(--muted-foreground))',
                        transition: 'color 0.35s ease-in-out',
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>

                <ChevronRight
                  size={16}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    color: isHovered ? '#ffffff' : 'hsl(var(--muted-foreground))',
                    transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                    transition: 'color 0.35s ease-in-out, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                />
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link href="/" className="btn btn-ghost" style={{ fontSize: 12 }}>
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function DemoSignUp() {
  return <DemoSignIn />;
}
