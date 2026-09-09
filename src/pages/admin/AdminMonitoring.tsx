import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  Activity,
  Server,
  Zap,
  ShieldCheck,
  RefreshCw,
  Cpu,
  Database,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Terminal,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PortalShell } from '../../components/layout/PortalShell';

export function AdminMonitoring() {
  const { systemNodes, auditLogs, logAuditEvent } = useStore();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  const handleTriggerHealthCheck = () => {
    setIsSyncing(true);
    setSyncMessage('Polling RPC endpoints and NCRP socket gateways...');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncMessage('All 5 blockchain nodes and agency bridges responded within 45ms.');
      logAuditEvent('Manual System Health Check Executed', 'All nodes operational; 0 degraded services.', 'Admin Vikramaditya');
    }, 900);
  };

  return (
    <PortalShell title="System & Infrastructure Monitoring">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div className="eyebrow">Operations & Telemetry · Operations Command</div>
          <h1 className="page-title">Node & Network Health.</h1>
          <p className="subtle" style={{ fontSize: 13, marginTop: 8 }}>
            Real-time status of blockchain archive nodes, NCRP/SAHYOG data feeds, graph clustering engines, and access logs.
          </p>
        </div>

        <button
          type="button"
          onClick={handleTriggerHealthCheck}
          className="btn btn-secondary"
          style={{ fontSize: 12 }}
          disabled={isSyncing}
        >
          <RefreshCw size={13} className={isSyncing ? 'animate-spin' : ''} />
          {isSyncing ? 'Testing Connectivity...' : 'Run RPC Health Check'}
        </button>
      </div>

      {syncMessage && (
        <div
          className="notice-box"
          style={{
            background: 'hsl(var(--accent)/.08)',
            borderColor: 'hsl(var(--accent)/.3)',
            marginBottom: 20,
          }}
        >
          <CheckCircle2 size={16} color="hsl(var(--accent))" />
          <div style={{ fontSize: 12 }}>{syncMessage}</div>
        </div>
      )}

      {/* High-level Architecture Stats */}
      <div className="metric-grid" style={{ marginBottom: 20 }}>
        <div className="panel metric">
          <div className="eyebrow">Active RPC Nodes</div>
          <div className="metric-value">5 / 5</div>
          <div className="metric-note">100% Operational</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">Average Latency</div>
          <div className="metric-value">23 ms</div>
          <div className="metric-note">Global edge network</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">24h Traced Volume</div>
          <div className="metric-value">₹4.82 Cr</div>
          <div className="metric-note">Across 1,280 hops</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">NCRP Sync State</div>
          <div className="metric-value" style={{ fontSize: 24, marginTop: 12, color: 'hsl(157 24% 34%)' }}>
            Synchronized
          </div>
          <div className="metric-note">Heartbeat 14s ago</div>
        </div>
      </div>

      {/* Nodes Table */}
      <div className="panel" style={{ padding: 20, marginBottom: 24 }}>
        <div className="section-head">
          <div className="section-title">Blockchain Fullnodes & Inter-Agency RPC Gateways</div>
          <span className="badge badge-low">
            <Radio size={12} style={{ display: 'inline', marginRight: 4 }} /> All Nodes Synced
          </span>
        </div>

        <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
          {systemNodes.map((node) => (
            <div
              key={node.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 8,
                background: 'hsl(var(--background)/.6)',
                border: '1px solid hsl(var(--border))',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'hsl(var(--sidebar))',
                    color: 'hsl(var(--sidebar-primary))',
                    display: 'grid',
                    placeItems: 'center',
                    fontFamily: 'var(--app-font-mono)',
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {node.network}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{node.name}</div>
                  <div className="subtle mono" style={{ fontSize: 10, marginTop: 2 }}>
                    Block: {node.blockHeight} · Peers: {node.peers}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: 11, fontWeight: 600 }}>
                    {node.latencyMs} ms
                  </div>
                  <div className="subtle" style={{ fontSize: 9 }}>Round-trip</div>
                </div>
                <span className="badge badge-low">{node.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-Column: Engine Performance & Real-Time Audit Log */}
      <div className="two-col" style={{ gap: 16 }}>
        {/* Engine Performance Card */}
        <div className="panel" style={{ padding: 20 }}>
          <div className="section-head">
            <div className="section-title">Forensic Engine Diagnostics</div>
            <Cpu size={16} color="hsl(var(--accent))" />
          </div>

          <div style={{ marginTop: 16, display: 'grid', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                <span>Graph Clustering Memory Buffer</span>
                <strong className="mono">64% (8.2 GB / 12 GB)</strong>
              </div>
              <div style={{ width: '100%', height: 6, borderRadius: 3, background: 'hsl(var(--border))', overflow: 'hidden' }}>
                <div style={{ width: '64%', height: '100%', background: 'hsl(var(--accent))' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                <span>Requisition Dispatch Queue</span>
                <strong className="mono">12 pending notices</strong>
              </div>
              <div style={{ width: '100%', height: 6, borderRadius: 3, background: 'hsl(var(--border))', overflow: 'hidden' }}>
                <div style={{ width: '22%', height: '100%', background: 'hsl(31 68% 56%)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                <span>FIU-IND STR Generation Pipeline</span>
                <strong className="mono">Optimal (0 dropouts)</strong>
              </div>
              <div style={{ width: '100%', height: 6, borderRadius: 3, background: 'hsl(var(--border))', overflow: 'hidden' }}>
                <div style={{ width: '96%', height: '100%', background: 'hsl(157 24% 38%)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Real-time System Audit Stream */}
        <div className="panel" style={{ padding: 20 }}>
          <div className="section-head">
            <div className="section-title">Live Security & Operational Audit Log</div>
            <Terminal size={16} color="hsl(var(--muted-foreground))" />
          </div>

          <div style={{ display: 'grid', gap: 10, marginTop: 14, maxHeight: 320, overflowY: 'auto' }}>
            {auditLogs.map((log, index) => (
              <div
                key={log.id || index}
                style={{
                  padding: '10px 12px',
                  borderRadius: 6,
                  background: 'hsl(var(--background)/.5)',
                  border: '1px solid hsl(var(--border))',
                  fontSize: 11,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: 11 }}>{log.action || log.label}</strong>
                  <span className="mono subtle" style={{ fontSize: 9 }}>{log.timestamp}</span>
                </div>
                <div className="subtle" style={{ marginTop: 3 }}>
                  Actor: <span className="mono" style={{ color: 'hsl(var(--accent))' }}>{log.actor || 'System'}</span> · Target: {log.caseId || 'SYSTEM'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
