import { useState } from 'react';
import type { ReactNode } from 'react';
import { roles } from '../../data/mockData';
import { clerkPubKey } from '../../config/clerk';
import { Sidebar } from './Sidebar';
import { Topbar, DemoTopbar } from './Topbar';

export function PortalShell({ children, title }: { children: ReactNode; title: string }) {
  const [role, setRole] = useState(roles[0]);

  return (
    <div className="cfap-shell">
      <Sidebar role={role} setRole={setRole} />
      <div className="cfap-main">
        {clerkPubKey ? <Topbar title={title} role={role} /> : <DemoTopbar title={title} role={role} />}
        <div className="cfap-content animate-rise">{children}</div>
      </div>
    </div>
  );
}
