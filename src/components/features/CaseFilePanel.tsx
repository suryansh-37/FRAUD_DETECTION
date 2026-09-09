import { useState } from 'react';
import { Hash, Check, CircleCheck } from 'lucide-react';
import type { Case, CaseStatus } from '../../types';
import { Toast } from '../shared/Toast';

export function CaseFilePanel({ item }: { item: Case }) {
  const [txHash, setTxHash] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<CaseStatus>(item.status);
  const [timeline, setTimeline] = useState([
    { label: 'Case opened', detail: 'Wallet intake validated and trace queued', timestamp: 'Just now' },
  ]);
  const [toast, setToast] = useState('');

  const addEvidence = () => {
    if (!txHash.trim()) {
      setToast('Add a transaction hash before attaching evidence');
      return;
    }
    setTimeline([{ label: 'Transaction attached', detail: txHash.trim(), timestamp: 'Just now' }, ...timeline]);
    setTxHash('');
    setToast('Transaction hash attached to the case file');
  };

  const addNote = () => {
    if (!note.trim()) {
      setToast('Write a note before saving it');
      return;
    }
    setTimeline([{ label: 'Investigation note added', detail: note.trim(), timestamp: 'Just now' }, ...timeline]);
    setNote('');
    setToast('Note added to the audit timeline');
  };

  return (
    <div className="panel" style={{ padding: 17, marginTop: 14 }}>
      <div className="section-head">
        <div>
          <div className="section-title">Case file</div>
          <div className="subtle" style={{ fontSize: 11, marginTop: 3 }}>
            Inputs and decisions are appended to the audit timeline
          </div>
        </div>
        <select
          className="select"
          style={{ width: 145 }}
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as CaseStatus);
            setToast('Case status updated');
          }}
          aria-label="Case status"
        >
          <option>New</option>
          <option>In review</option>
          <option>Freeze requested</option>
          <option>Resolved</option>
        </select>
      </div>
      <div className="two-col" style={{ marginTop: 14 }}>
        <div>
          <label className="eyebrow" htmlFor="tx-hash">
            Attach transaction hash
          </label>
          <div style={{ display: 'flex', gap: 7, marginTop: 7 }}>
            <input
              id="tx-hash"
              className="input mono"
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder="0x… transaction hash"
              data-testid="input-transaction-hash"
            />
            <button
              className="icon-btn"
              onClick={addEvidence}
              aria-label="Attach transaction hash"
              data-testid="button-attach-transaction"
            >
              <Hash size={15} />
            </button>
          </div>
        </div>
        <div>
          <label className="eyebrow" htmlFor="case-note">
            Investigation note
          </label>
          <div style={{ display: 'flex', gap: 7, marginTop: 7 }}>
            <input
              id="case-note"
              className="input"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What did you verify?"
              data-testid="input-investigation-note"
            />
            <button
              className="icon-btn"
              onClick={addNote}
              aria-label="Save investigation note"
              data-testid="button-save-investigation-note"
            >
              <Check size={15} />
            </button>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid hsl(var(--border))', marginTop: 16, paddingTop: 10 }}>
        {timeline.slice(0, 4).map((event, i) => (
          <div className="check-row" key={`${event.label}-${i}`}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <CircleCheck size={14} color="hsl(var(--accent))" />
              <div>
                <strong style={{ fontSize: 11 }}>{event.label}</strong>
                <span className="subtle" style={{ display: 'block', fontSize: 10, marginTop: 2 }}>
                  {event.detail}
                </span>
              </div>
            </div>
            <span className="mono subtle">{event.timestamp}</span>
          </div>
        ))}
      </div>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  );
}
