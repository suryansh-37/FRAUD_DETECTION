import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Check } from 'lucide-react';
import { PortalShell } from '../components/layout/PortalShell';
import { Toast } from '../components/shared/Toast';

export function Settings() {
  const [toggles, setToggles] = useState({ movement: true, approval: true, weekly: false });
  const [saved, setSaved] = useState(false);
  const flip = (key: keyof typeof toggles) => setToggles({ ...toggles, [key]: !toggles[key] });

  return (
    <PortalShell title="Settings">
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow">Workspace preferences</div>
        <h1 className="page-title">Set your signal.</h1>
        <p className="subtle" style={{ fontSize: 13, marginTop: 9 }}>
          Quiet by default, precise when it matters.
        </p>
      </div>

      <div className="two-col">
        <div className="panel" style={{ padding: 18 }}>
          <div className="section-head">
            <div>
              <div className="section-title">Workspace</div>
              <div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>
                What your teams see
              </div>
            </div>
            <SettingsIcon size={17} color="hsl(var(--muted-foreground))" />
          </div>
          <label className="eyebrow" style={{ display: 'block', marginTop: 17 }}>
            Workspace name
          </label>
          <input
            className="input"
            style={{ marginTop: 7 }}
            defaultValue="Maharashtra Cyber Coordination Cell"
            data-testid="input-workspace-name"
          />
          <label className="eyebrow" style={{ display: 'block', marginTop: 17 }}>
            Default jurisdiction
          </label>
          <select
            className="select"
            style={{ marginTop: 7 }}
            defaultValue="Maharashtra"
            data-testid="select-jurisdiction"
          >
            <option>Maharashtra</option>
            <option>Karnataka</option>
            <option>National</option>
          </select>
          <button
            className="btn btn-primary"
            style={{ marginTop: 18 }}
            onClick={() => setSaved(true)}
            data-testid="button-save-workspace"
          >
            <Check size={13} /> Save workspace
          </button>
        </div>

        <div className="panel" style={{ padding: 18 }}>
          <div className="section-head">
            <div>
              <div className="section-title">Notifications</div>
              <div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>
                Only the events that need you
              </div>
            </div>
            <Bell size={17} color="hsl(var(--muted-foreground))" />
          </div>
          {[
            ['movement', 'Movement alerts', 'When watched assets move'],
            ['approval', 'Approval queue', 'When a decision needs review'],
            ['weekly', 'Weekly digest', 'Monday morning summary'],
          ].map(([key, title, detail]) => (
            <div className="check-row" key={key}>
              <div>
                <strong style={{ fontSize: 12 }}>{title}</strong>
                <span className="subtle" style={{ display: 'block', fontSize: 10, marginTop: 3 }}>
                  {detail}
                </span>
              </div>
              <button
                className={`switch ${toggles[key as keyof typeof toggles] ? 'on' : ''}`}
                onClick={() => flip(key as keyof typeof toggles)}
                aria-label={`Toggle ${title}`}
                data-testid={`switch-${key}`}
              >
                <span />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="panel" style={{ padding: 18, marginTop: 14 }}>
        <div className="section-head">
          <div>
            <div className="section-title">Role & access</div>
            <div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>
              Your current permissions
            </div>
          </div>
          <span className="badge badge-low">Investigation officer</span>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
          {['Trace cases', 'Draft notices', 'Export evidence', 'Watch clusters'].map((x) => (
            <span className="badge badge-neutral" key={x}>
              {x}
            </span>
          ))}
        </div>
        <p className="subtle" style={{ fontSize: 11, margin: '15px 0 0' }}>
          Need a different scope? Ask your workspace supervisor. Access changes are recorded in the audit
          review.
        </p>
      </div>
      {saved && <Toast message="Workspace preferences saved" onClose={() => setSaved(false)} />}
    </PortalShell>
  );
}
