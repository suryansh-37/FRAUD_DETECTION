import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  Users,
  UserPlus,
  Search,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserX,
  Sliders,
  CheckCircle2,
  Lock,
  RotateCcw,
} from 'lucide-react';
import { useStore, ManagedUser } from '../../context/StoreContext';
import { PortalShell } from '../../components/layout/PortalShell';

export function AdminUsers() {
  const { usersList, toggleUserStatus, addUser } = useStore();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New user form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<ManagedUser['role']>('Investigator');
  const [department, setDepartment] = useState('State Cyber Crime Wing');
  const [badge, setBadge] = useState('');

  const filteredUsers = usersList.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addUser({
      name,
      email,
      role,
      department,
      badge: badge || undefined,
      status: 'Active',
    });

    setName('');
    setEmail('');
    setBadge('');
    setShowAddModal(false);
  };

  return (
    <PortalShell title="User Access Management">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div className="eyebrow">Administration & RBAC · Level 4 Clearance</div>
          <h1 className="page-title">Identity & Access Control.</h1>
          <p className="subtle" style={{ fontSize: 13, marginTop: 8 }}>
            Provision and audit credentials for investigating officers, supervisors, VASP compliance desks, and citizen accounts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
          style={{ fontSize: 12 }}
        >
          <UserPlus size={14} /> Provision New Personnel
        </button>
      </div>

      {/* Metrics Row */}
      <div className="metric-grid" style={{ marginBottom: 20 }}>
        <div className="panel metric">
          <div className="eyebrow">Total Identities</div>
          <div className="metric-value">{usersList.length}</div>
          <div className="metric-note">Across 5 departments</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">Active Investigators</div>
          <div className="metric-value">
            {usersList.filter((u) => u.role === 'Investigator' && u.status === 'Active').length}
          </div>
          <div className="metric-note">Cyber Cell units</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">VASP Desks Connected</div>
          <div className="metric-value">
            {usersList.filter((u) => u.role === 'VASP Officer').length}
          </div>
          <div className="metric-note">Exchanges with Sec. 91 access</div>
        </div>
        <div className="panel metric">
          <div className="eyebrow">Security Status</div>
          <div className="metric-value" style={{ fontSize: 24, marginTop: 12, color: 'hsl(var(--accent))' }}>
            Enforced
          </div>
          <div className="metric-note">FIDO2 / 2FA Mandatory</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="panel" style={{ padding: 12, marginBottom: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search
            size={14}
            style={{ position: 'absolute', left: 11, top: 12, color: 'hsl(var(--muted-foreground))' }}
          />
          <input
            className="input"
            style={{ paddingLeft: 34 }}
            placeholder="Search officer name, department, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="select"
          style={{ width: 'auto', minWidth: 160 }}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Investigator">Investigator</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Admin">Admin</option>
          <option value="VASP Officer">VASP Officer</option>
          <option value="Citizen">Citizen</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="panel table-wrap">
        <table>
          <thead>
            <tr>
              <th>Personnel / User</th>
              <th>Role & Clearance</th>
              <th>Department / Unit</th>
              <th>Badge ID</th>
              <th>Status</th>
              <th>Last Active</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>
                  <div>
                    <strong style={{ fontSize: 13 }}>{u.name}</strong>
                    <div className="subtle mono" style={{ fontSize: 11 }}>{u.email}</div>
                  </div>
                </td>
                <td>
                  <span
                    className={`badge ${
                      u.role === 'Admin'
                        ? 'badge-high'
                        : u.role === 'Investigator'
                        ? 'badge-low'
                        : u.role === 'VASP Officer'
                        ? 'badge-medium'
                        : 'badge-neutral'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td style={{ fontSize: 12 }}>{u.department}</td>
                <td className="mono" style={{ fontSize: 11 }}>{u.badge || '—'}</td>
                <td>
                  <span
                    className={`badge ${
                      u.status === 'Active' ? 'badge-low' : 'badge-high'
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="subtle" style={{ fontSize: 11 }}>{u.lastActive}</td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => toggleUserStatus(u.id)}
                    className={`btn ${u.status === 'Active' ? 'btn-ghost' : 'btn-secondary'}`}
                    style={{ fontSize: 10, padding: '5px 9px' }}
                  >
                    {u.status === 'Active' ? (
                      <>
                        <UserX size={12} /> Suspend
                      </>
                    ) : (
                      <>
                        <UserCheck size={12} /> Reactivate
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 100,
            padding: 16,
          }}
        >
          <div className="panel" style={{ width: '100%', maxWidth: 480, padding: 26 }}>
            <div className="section-head">
              <div className="section-title">Provision New Officer Credential</div>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} style={{ marginTop: 14 }}>
              <div style={{ marginBottom: 12 }}>
                <label className="eyebrow" htmlFor="u-name">Officer Name</label>
                <input
                  id="u-name"
                  className="input"
                  style={{ marginTop: 6 }}
                  placeholder="e.g. Sub-Insp. Devendra Patil"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <label className="eyebrow" htmlFor="u-email">Gov / Official Email</label>
                <input
                  id="u-email"
                  type="email"
                  className="input"
                  style={{ marginTop: 6 }}
                  placeholder="e.g. d.patil@cybercrime.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="two-col" style={{ gap: 10, marginBottom: 12 }}>
                <div>
                  <label className="eyebrow" htmlFor="u-role">Assigned Role</label>
                  <select
                    id="u-role"
                    className="select"
                    style={{ marginTop: 6 }}
                    value={role}
                    onChange={(e) => setRole(e.target.value as ManagedUser['role'])}
                  >
                    <option value="Investigator">Investigator</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="VASP Officer">VASP Officer</option>
                    <option value="Admin">Admin</option>
                    <option value="Citizen">Citizen</option>
                  </select>
                </div>
                <div>
                  <label className="eyebrow" htmlFor="u-badge">Badge / Credential ID</label>
                  <input
                    id="u-badge"
                    className="input mono"
                    style={{ marginTop: 6 }}
                    placeholder="CY-IND-XXXX"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label className="eyebrow" htmlFor="u-dept">Department / Station</label>
                <input
                  id="u-dept"
                  className="input"
                  style={{ marginTop: 6 }}
                  placeholder="e.g. Cyber Crime Unit 2, Mumbai Police"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm & Issue Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PortalShell>
  );
}
