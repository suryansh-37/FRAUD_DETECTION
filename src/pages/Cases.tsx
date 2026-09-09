import { useState, useMemo } from 'react';
import { FileText, ScanSearch, Search, Filter } from 'lucide-react';
import type { Case } from '../types';
import { cases } from '../data/mockData';
import { PortalShell } from '../components/layout/PortalShell';
import { CaseTable } from '../components/features/CaseTable';
import { EmptyState } from '../components/shared/EmptyState';
import { WalletModal } from '../components/features/WalletModal';
import { Toast } from '../components/shared/Toast';

export function Cases() {
  const [rows, setRows] = useState(cases);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [typology, setTypology] = useState('All typologies');
  const [showTrace, setShowTrace] = useState(false);
  const [toast, setToast] = useState('');

  const filtered = useMemo(
    () =>
      rows.filter(
        (c) =>
          (c.title.toLowerCase().includes(query.toLowerCase()) ||
            c.id.toLowerCase().includes(query.toLowerCase()) ||
            c.location.toLowerCase().includes(query.toLowerCase()) ||
            c.wallet.toLowerCase().includes(query.toLowerCase())) &&
          (status === 'All' || c.status === status) &&
          (typology === 'All typologies' || c.typology === typology)
      ),
    [rows, query, status, typology]
  );

  const createFromTrace = (wallet: string) => {
    const compact = `${wallet.slice(0, 6)}…${wallet.slice(-4)}`;
    const newCase: Case = {
      id: `CF-24-02${rows.length + 1}`,
      title: 'New wallet intake',
      location: 'Pending jurisdiction',
      amount: 0,
      currency: 'INR',
      riskScore: 0,
      status: 'New',
      typology: 'Unclassified',
      wallet: compact,
      assignee: 'Aarav Kulkarni',
      updatedAt: 'Just now',
      hops: 0,
      vasp: 'Pending attribution',
      movementStatus: 'Trace queued',
    };
    setRows([newCase, ...rows]);
    setShowTrace(false);
    setToast(`${newCase.id} created from validated wallet trace`);
  };

  return (
    <PortalShell title="Cases">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          gap: 15,
          flexWrap: 'wrap',
          marginBottom: 25,
        }}
      >
        <div>
          <div className="eyebrow">Investigations / workspace</div>
          <h1 className="page-title">Case register</h1>
          <p className="subtle" style={{ fontSize: 12, marginTop: 8 }}>
            From wallet intake to an auditable investigation file.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn btn-ghost" onClick={() => setShowTrace(true)} data-testid="button-new-case">
            <FileText size={14} /> New case file
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShowTrace(true)}
            data-testid="button-trace-wallet"
          >
            <ScanSearch size={14} /> Trace wallet
          </button>
        </div>
      </div>

      <div className="panel" style={{ padding: 12, marginBottom: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 260px' }}>
          <Search
            size={14}
            style={{ position: 'absolute', left: 11, top: 11, color: 'hsl(var(--muted-foreground))' }}
          />
          <input
            className="input"
            style={{ paddingLeft: 32 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search case, wallet, location, or tx hash"
            data-testid="input-case-search"
          />
        </div>
        <select
          className="select"
          style={{ width: 165 }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          data-testid="select-case-status"
        >
          <option>All</option>
          <option>New</option>
          <option>In review</option>
          <option>Freeze requested</option>
          <option>Resolved</option>
        </select>
        <select
          className="select"
          style={{ width: 180 }}
          value={typology}
          onChange={(e) => setTypology(e.target.value)}
          data-testid="select-case-typology"
        >
          <option>All typologies</option>
          <option>Pig butchering</option>
          <option>Impersonation</option>
          <option>Cash-out</option>
          <option>Escrow fraud</option>
          <option>Advance fee</option>
          <option>Phishing</option>
          <option>Ransomware</option>
          <option>Darknet-related</option>
          <option>Organized financial crime</option>
        </select>
        <button className="icon-btn" aria-label="More filters" data-testid="button-more-filters">
          <Filter size={15} />
        </button>
      </div>

      {filtered.length ? (
        <CaseTable rows={filtered} />
      ) : (
        <EmptyState
          title="No cases match that view"
          text="Try a different search or clear one of the filters."
          action={() => {
            setQuery('');
            setStatus('All');
            setTypology('All typologies');
          }}
          actionLabel="Clear filters"
        />
      )}

      {showTrace && (
        <WalletModal onClose={() => setShowTrace(false)} onCreated={createFromTrace} />
      )}
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </PortalShell>
  );
}
