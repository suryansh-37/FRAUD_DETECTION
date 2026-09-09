import { useState } from 'react';
import { Link } from 'wouter';
import { FileText, CircleAlert, ScanSearch } from 'lucide-react';
import { PortalShell } from '../components/layout/PortalShell';
import { Toast } from '../components/shared/Toast';

export function Complaints() {
  const [wallet, setWallet] = useState('');
  const [summary, setSummary] = useState('');
  const [source, setSource] = useState('NCRP complaint');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const submit = () => {
    if (!summary.trim()) {
      setError('Add a short description before submitting the complaint.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <PortalShell title="Complaint intake">
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow">Architecture / complaint</div>
        <h1 className="page-title">Turn a report into a trace.</h1>
        <p className="subtle" style={{ fontSize: 13, marginTop: 9 }}>
          Capture the minimum facts first. Investigation can begin without exposing unrelated personal details.
        </p>
      </div>
      <div className="content-grid">
        <div className="panel" style={{ padding: 20 }}>
          <div className="section-head">
            <div>
              <div className="section-title">New complaint</div>
              <div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>
                The first handoff in the Trace-X architecture
              </div>
            </div>
            <FileText size={18} color="hsl(var(--accent))" />
          </div>
          <label className="eyebrow" htmlFor="complaint-source">
            Source
          </label>
          <select
            id="complaint-source"
            className="select"
            style={{ marginTop: 7 }}
            value={source}
            onChange={(e) => setSource(e.target.value)}
            data-testid="select-complaint-source"
          >
            <option>NCRP complaint</option>
            <option>Police station report</option>
            <option>VASP referral</option>
            <option>Manual intake</option>
          </select>
          <label className="eyebrow" htmlFor="complaint-wallet" style={{ display: 'block', marginTop: 16 }}>
            Reported wallet address
          </label>
          <input
            id="complaint-wallet"
            className="input mono"
            style={{ marginTop: 7 }}
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="Optional at intake · 0x… or Bitcoin address"
            data-testid="input-complaint-wallet"
          />
          <label className="eyebrow" htmlFor="complaint-summary" style={{ display: 'block', marginTop: 16 }}>
            What happened?
          </label>
          <textarea
            id="complaint-summary"
            className="input"
            rows={5}
            style={{ marginTop: 7, resize: 'vertical' }}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Describe the payment, promise, contact, or suspected fraud pattern."
            data-testid="textarea-complaint-summary"
          />
          {error && (
            <div className="inline-error" role="alert" style={{ marginTop: 12 }}>
              <CircleAlert size={14} />
              {error}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
            <button className="btn btn-primary" onClick={submit} data-testid="button-submit-complaint">
              <FileText size={14} /> Submit complaint
            </button>
          </div>
        </div>
        <div>
          <div className="panel" style={{ padding: 18 }}>
            <div className="eyebrow">What happens next</div>
            {[
              'Complaint is registered with source and jurisdiction',
              'Wallet address is validated when available',
              'Network and blockchain tracing are queued',
              'Risk and alert signals are attached to a case report',
            ].map((x, i) => (
              <div className="check-row" key={x}>
                <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
                  <span className="architecture-dot">{i + 1}</span>
                  <span style={{ fontSize: 11 }}>{x}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="panel" style={{ padding: 18, marginTop: 14 }}>
            <div className="section-title">Already have an address?</div>
            <p className="subtle" style={{ fontSize: 11, lineHeight: 1.5, margin: '8px 0 14px' }}>
              Skip intake and go directly to the wallet investigation workspace.
            </p>
            <Link
              href="/portal/investigate"
              className="btn btn-secondary"
              style={{ width: '100%' }}
              data-testid="link-complaint-to-investigate"
            >
              <ScanSearch size={13} /> Investigate wallet
            </Link>
          </div>
        </div>
      </div>
      {submitted && (
        <Toast
          message={`${source} registered · ready for investigation`}
          onClose={() => setSubmitted(false)}
        />
      )}
    </PortalShell>
  );
}
