import { Link } from 'wouter';
import { FileText, ScanSearch, LayoutDashboard, ArrowRight } from 'lucide-react';

export function ArchitectureMap() {
  const branches = [
    { href: '/portal/complaints', label: 'Complaint', detail: 'Submit a report', icon: FileText, tone: 'hsl(var(--accent))' },
    { href: '/portal/investigate', label: 'Investigate', detail: 'Trace a wallet', icon: ScanSearch, tone: 'hsl(31 68% 56%)' },
    { href: '/portal', label: 'Overview', detail: 'See the network', icon: LayoutDashboard, tone: 'hsl(157 24% 38%)' },
  ];

  const steps = [
    'Enter wallet address',
    'Address validation',
    'Network detection',
    'Blockchain tracing',
    'Money flow · wallet · network details',
    'Intermediary wallets',
    'VASP / exchange identification',
    'Risk score + alerts',
    'Case report',
    'Investigator / LEA',
  ];

  return (
    <div className="panel architecture-map" data-testid="architecture-map">
      <div className="section-head">
        <div>
          <div className="eyebrow">Operating architecture</div>
          <div className="section-title" style={{ marginTop: 5 }}>
            One signal, one accountable path.
          </div>
        </div>
        <span className="badge badge-low">Workflow live</span>
      </div>
      <div className="architecture-branches">
        {branches.map(({ href, label, detail, icon: Icon, tone }) => (
          <Link
            className="architecture-branch panel-hover"
            href={href}
            key={label}
            data-testid={`link-architecture-${label.toLowerCase()}`}
          >
            <span className="architecture-icon" style={{ color: tone }}>
              <Icon size={16} />
            </span>
            <span>
              <strong>{label}</strong>
              <small>{detail}</small>
            </span>
            <ArrowRight size={14} />
          </Link>
        ))}
      </div>
      <div className="architecture-track">
        {steps.map((step, index) => (
          <div className="architecture-step" key={step}>
            <span className={`architecture-dot ${index > 6 ? 'is-alert' : ''}`}>{index + 1}</span>
            <span>{step}</span>
            {index < steps.length - 1 && <span className="architecture-connector" />}
          </div>
        ))}
      </div>
    </div>
  );
}
