import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  FileText,
  Printer,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Lock,
  CircleAlert,
  Calendar,
  UserCheck,
  Send,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { PortalShell } from '../../components/layout/PortalShell';

const STAGES = [
  { step: 1, label: 'Complaint Lodged', desc: 'Received & timestamped in NCRP portal' },
  { step: 2, label: 'Cyber Cell Triage', desc: 'Assigned to forensic investigation unit' },
  { step: 3, label: 'On-Chain Tracing', desc: 'Transaction flow & hop clustering mapped' },
  { step: 4, label: 'VASP Identified', desc: 'Receiving crypto exchange pinpointed' },
  { step: 5, label: 'Freeze Requisition', desc: 'Section 91 CrPC freeze notice dispatched' },
];

export function VictimTrackStatus() {
  const { complaints } = useStore();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Extract query param if opened with ?ref=
  const urlParams = new URLSearchParams(window.location.search);
  const initialRef = urlParams.get('ref');

  const [selectedId, setSelectedId] = useState<string>(
    initialRef || (complaints.length > 0 ? complaints[0].id : '')
  );

  const selectedComplaint = complaints.find((c) => c.id === selectedId) || complaints[0];

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <PortalShell title="Track Investigation Status">
      <Link href="/victim" className="btn btn-ghost" style={{ marginBottom: 18 }}>
        <ChevronLeft size={14} /> Back to Citizen Portal
      </Link>

      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow">Citizen Case Tracking · Live National Grid</div>
        <h1 className="page-title">Investigation Progress.</h1>
        <p className="subtle" style={{ fontSize: 13, marginTop: 8 }}>
          Real-time forensic status updates directly from investigating cybercrime cells and cryptocurrency compliance desks.
        </p>
      </div>

      {/* Case Selector / Search Bar */}
      <div
        className="panel"
        style={{
          padding: 14,
          marginBottom: 20,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 260px' }}>
          <Search
            size={14}
            style={{ position: 'absolute', left: 11, top: 12, color: 'hsl(var(--muted-foreground))' }}
          />
          <input
            className="input mono"
            style={{ paddingLeft: 34, fontSize: 12 }}
            placeholder="Search complaint acknowledgement number (e.g. TRX-2026-8841)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick select buttons */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {complaints
            .filter((c) => !searchQuery || c.id.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedId(c.id)}
                className={`btn ${selectedComplaint?.id === c.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: 11, padding: '7px 11px' }}
              >
                <span className="mono">{c.id}</span>
              </button>
            ))}
        </div>
      </div>

      {!selectedComplaint ? (
        <div className="panel" style={{ padding: 40, textAlign: 'center' }}>
          <CircleAlert size={32} style={{ margin: '0 auto 12px', color: 'hsl(var(--muted-foreground))' }} />
          <h3>No Complaint Found</h3>
          <p className="subtle" style={{ fontSize: 12 }}>Check your acknowledgement number or file a new report.</p>
        </div>
      ) : (
        <>
          {/* Main Case Summary Header */}
          <div
            className="panel"
            style={{
              padding: 24,
              marginBottom: 20,
              background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--muted)/.6))',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: 16,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span className="mono" style={{ fontSize: 18, fontWeight: 700 }}>
                    {selectedComplaint.id}
                  </span>
                  <span
                    className={`badge ${
                      selectedComplaint.status === 'Notice Issued'
                        ? 'badge-high'
                        : selectedComplaint.status === 'VASP Identified'
                        ? 'badge-medium'
                        : 'badge-low'
                    }`}
                  >
                    Stage {selectedComplaint.currentStage} of 5 · {selectedComplaint.status}
                  </span>
                  <span className="mono subtle" style={{ fontSize: 11 }}>
                    Reported {selectedComplaint.createdAt}
                  </span>
                </div>
                <h2 className="title-serif" style={{ fontSize: 26, margin: '8px 0 4px' }}>
                  {selectedComplaint.scamType}
                </h2>
                <div className="subtle" style={{ fontSize: 12 }}>
                  Complainant: <strong>{selectedComplaint.complainantName}</strong> · Location: {selectedComplaint.location}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="btn btn-secondary"
                  style={{ fontSize: 11 }}
                >
                  <Printer size={13} /> Print Official Receipt
                </button>
                <Link href="/victim/report" className="btn btn-ghost" style={{ fontSize: 11 }}>
                  File Another Case
                </Link>
              </div>
            </div>

            {/* Metric Strip */}
            <div className="metric-grid" style={{ marginTop: 20 }}>
              <div className="panel metric">
                <div className="eyebrow">Reported Loss</div>
                <div className="metric-value">₹{selectedComplaint.lossAmountINR.toLocaleString('en-IN')}</div>
                <div className="metric-note">{selectedComplaint.cryptoAmount}</div>
              </div>
              <div className="panel metric">
                <div className="eyebrow">Asset / Network</div>
                <div className="metric-value" style={{ fontSize: 22, marginTop: 14 }}>
                  {selectedComplaint.cryptoType}
                </div>
                <div className="metric-note">Blockchain verified</div>
              </div>
              <div className="panel metric">
                <div className="eyebrow">Attributed Exchange</div>
                <div className="metric-value" style={{ fontSize: 22, marginTop: 14, color: 'hsl(var(--accent))' }}>
                  {selectedComplaint.exchangeUsed}
                </div>
                <div className="metric-note">Registered VASP</div>
              </div>
              <div className="panel metric">
                <div className="eyebrow">Est. Recovery Chance</div>
                <div className="metric-value" style={{ fontSize: 22, marginTop: 14 }}>
                  {selectedComplaint.currentStage >= 4 ? 'High (82%)' : 'Moderate (55%)'}
                </div>
                <div className="metric-note">Based on cluster freeze status</div>
              </div>
            </div>
          </div>

          {/* Visual 5-Stage Stepper */}
          <div className="panel" style={{ padding: 26, marginBottom: 20 }}>
            <div className="section-head">
              <div className="section-title">Investigation Lifecycle Stepper</div>
              <span className="mono subtle" style={{ fontSize: 11 }}>Live Synchronized with Cyber Cell</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginTop: 20, position: 'relative' }}>
              {STAGES.map((s) => {
                const isPassed = s.step < selectedComplaint.currentStage;
                const isCurrent = s.step === selectedComplaint.currentStage;

                return (
                  <div
                    key={s.step}
                    style={{
                      padding: 14,
                      borderRadius: 9,
                      border: '1px solid',
                      borderColor: isCurrent
                        ? 'hsl(var(--accent))'
                        : isPassed
                        ? 'hsl(157 24% 38%/.35)'
                        : 'hsl(var(--border))',
                      background: isCurrent
                        ? 'hsl(var(--accent)/.08)'
                        : isPassed
                        ? 'hsl(157 24% 38%/.06)'
                        : 'hsl(var(--card))',
                      position: 'relative',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: 11,
                          fontWeight: 700,
                          fontFamily: 'var(--app-font-mono)',
                          background: isPassed
                            ? 'hsl(157 24% 38%)'
                            : isCurrent
                            ? 'hsl(var(--accent))'
                            : 'hsl(var(--muted))',
                          color: isPassed || isCurrent ? '#fff' : 'hsl(var(--muted-foreground))',
                        }}
                      >
                        {isPassed ? <CheckCircle2 size={14} /> : s.step}
                      </span>
                      {isCurrent && (
                        <span className="badge badge-medium" style={{ fontSize: 9 }}>
                          Active Step
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: isCurrent ? 'hsl(var(--foreground))' : 'inherit' }}>
                      {s.label}
                    </div>
                    <div className="subtle" style={{ fontSize: 10, marginTop: 4, lineHeight: 1.4 }}>
                      {s.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Officer & Official Timeline Split */}
          <div className="two-col" style={{ gap: 16 }}>
            {/* Assigned Investigating Team */}
            <div className="panel" style={{ padding: 20 }}>
              <div className="section-head">
                <div className="section-title">Assigned Law Enforcement Unit</div>
                <ShieldCheck size={16} color="hsl(var(--accent))" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'hsl(var(--sidebar))',
                    color: 'hsl(var(--sidebar-primary))',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  CY
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{selectedComplaint.assignedOfficer}</div>
                  <div className="subtle" style={{ fontSize: 11 }}>{selectedComplaint.assignedUnit}</div>
                  <span className="badge badge-low" style={{ marginTop: 4, fontSize: 9 }}>
                    Designated Forensic Investigator
                  </span>
                </div>
              </div>

              <div style={{ marginTop: 18, borderTop: '1px solid hsl(var(--border))', paddingTop: 14, fontSize: 11 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span className="subtle">Official Contact:</span>
                  <span className="mono">020-26123490 (Ext. 402)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span className="subtle">Suspect Wallet:</span>
                  <span className="mono">{selectedComplaint.walletAddress.slice(0, 8)}…{selectedComplaint.walletAddress.slice(-6)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="subtle">Target Exchange Notice:</span>
                  <strong style={{ color: 'hsl(var(--accent))' }}>Sec. 91 CrPC Freeze Requisition</strong>
                </div>
              </div>
            </div>

            {/* Official Case Timeline */}
            <div className="panel" style={{ padding: 20 }}>
              <div className="section-head">
                <div className="section-title">Official Case Log & Diary</div>
                <Clock size={16} color="hsl(var(--muted-foreground))" />
              </div>

              <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
                {selectedComplaint.notes.map((n, i) => (
                  <div
                    key={i}
                    style={{
                      borderLeft: '2px solid hsl(var(--accent))',
                      paddingLeft: 12,
                      fontSize: 12,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: 11, color: 'hsl(var(--foreground))' }}>{n.author}</strong>
                      <span className="mono subtle" style={{ fontSize: 10 }}>{n.date}</span>
                    </div>
                    <p style={{ margin: '4px 0 0', color: 'hsl(var(--muted-foreground))', lineHeight: 1.45 }}>
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </PortalShell>
  );
}
