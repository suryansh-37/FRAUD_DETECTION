import React, { createContext, useContext, useState, useEffect } from 'react';
import { cases as initialCases, activities as initialActivities } from '../data/mockData';
import type { Case, Activity } from '../types';

export interface CitizenComplaint {
  id: string; // e.g. TRX-2026-9142
  complainantName: string;
  phone: string;
  email: string;
  location: string;
  incidentDate: string;
  scamType: string;
  lossAmountINR: number;
  cryptoType: string;
  cryptoAmount: string;
  walletAddress: string;
  txHash: string;
  exchangeUsed: string;
  description: string;
  status: 'Received' | 'In Triage' | 'On-Chain Tracing' | 'VASP Identified' | 'Notice Issued' | 'Recovered';
  currentStage: number; // 1 to 5
  assignedOfficer: string;
  assignedUnit: string;
  createdAt: string;
  updatedAt: string;
  notes: { date: string; message: string; author: string }[];
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: 'Investigator' | 'Supervisor' | 'Admin' | 'VASP Officer' | 'Citizen';
  department: string;
  badge?: string;
  status: 'Active' | 'Suspended' | 'Pending 2FA';
  lastActive: string;
}

export interface SystemNode {
  name: string;
  network: string;
  status: 'Operational' | 'Degraded' | 'Syncing';
  latencyMs: number;
  blockHeight: string;
  peers: number;
}

const DEFAULT_COMPLAINTS: CitizenComplaint[] = [
  {
    id: 'TRX-2026-8841',
    complainantName: 'Rajesh Sharma',
    phone: '+91 98230 45812',
    email: 'rajesh.sharma@example.com',
    location: 'Pune, Maharashtra',
    incidentDate: '2026-03-04 14:30',
    scamType: 'Telegram Task / Crypto Investment Scam',
    lossAmountINR: 284700,
    cryptoType: 'USDT (Polygon)',
    cryptoAmount: '3,400 USDT',
    walletAddress: '0x71c6bf5e51082531a293f0b2f5670845a93f110a',
    txHash: '0x9a84b0e5124976cf7493c834017f8a3d3c8c1d56e7f80459c72e21b19324c5bb',
    exchangeUsed: 'CoinDCX',
    description: 'Recruited via Telegram for online rating tasks. Promoted to VIP crypto investment group, directed to deposit funds on fake DEX trading page.',
    status: 'VASP Identified',
    currentStage: 4,
    assignedOfficer: 'Insp. Aarav Kulkarni',
    assignedUnit: 'Cyber Crime Investigation Cell (Unit 4)',
    createdAt: '3 days ago',
    updatedAt: '12 min ago',
    notes: [
      { date: '3 days ago', message: 'FIR / Complaint logged in NCRP system with digital timestamp.', author: 'System Dispatch' },
      { date: '2 days ago', message: 'Assigned to Cyber Crime Cell Unit 4 for blockchain forensic extraction.', author: 'Supervisory Desk' },
      { date: 'Yesterday', message: '6-hop flow traced across Polygon & Ethereum. Exit deposit cluster detected at CoinDCX.', author: 'Insp. Aarav Kulkarni' },
      { date: '12 min ago', message: 'Section 91 CrPC freeze requisition notice prepared for CoinDCX compliance desk.', author: 'Insp. Aarav Kulkarni' },
    ],
  },
  {
    id: 'TRX-2026-7719',
    complainantName: 'Ananya Deshmukh',
    phone: '+91 97110 33201',
    email: 'ananya.d@example.com',
    location: 'Bengaluru, Karnataka',
    incidentDate: '2026-03-06 09:15',
    scamType: 'Courier Parcel Extortion / Digital Arrest',
    lossAmountINR: 97800,
    cryptoType: 'BTC',
    cryptoAmount: '0.015 BTC',
    walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    txHash: '0x4bd817ce8291410f92410a829375104273891402',
    exchangeUsed: 'Binance',
    description: 'Impersonators claimed illegal package was intercepted in my name. Coerced into converting savings into crypto to transfer to a "safe government escrow wallet".',
    status: 'On-Chain Tracing',
    currentStage: 3,
    assignedOfficer: 'Sub-Insp. Priya Nair',
    assignedUnit: 'Bengaluru CID Cyber Wing',
    createdAt: '1 day ago',
    updatedAt: '38 min ago',
    notes: [
      { date: '1 day ago', message: 'Complaint registered via Cyber Helpline 1930.', author: 'NCRP Bridge' },
      { date: '38 min ago', message: 'Layering candidate addresses identified; awaiting exchange attribution reply.', author: 'Sub-Insp. Priya Nair' },
    ],
  },
];

const DEFAULT_USERS: ManagedUser[] = [
  {
    id: 'usr-01',
    name: 'Insp. Aarav Kulkarni',
    email: 'aarav.kulkarni@cybercrime.gov.in',
    role: 'Investigator',
    department: 'Cyber Crime Investigation Cell (Unit 4)',
    badge: 'CY-IND-4092',
    status: 'Active',
    lastActive: 'Just now',
  },
  {
    id: 'usr-02',
    name: 'Dr. Vikramaditya Sen',
    email: 'v.sen@cert-in.gov.in',
    role: 'Admin',
    department: 'System Architecture & Operations Command',
    badge: 'ADM-SYS-001',
    status: 'Active',
    lastActive: '2 min ago',
  },
  {
    id: 'usr-03',
    name: 'Shreya Iyer',
    email: 's.iyer@mha.gov.in',
    role: 'Supervisor',
    department: 'National Cybercrime Coordination Centre (I4C)',
    badge: 'I4C-DIR-802',
    status: 'Active',
    lastActive: '14 min ago',
  },
  {
    id: 'usr-04',
    name: 'Rohit Mehra',
    email: 'compliance-alerts@coindcx.com',
    role: 'VASP Officer',
    department: 'CoinDCX Regulatory & Law Enforcement Affairs',
    status: 'Active',
    lastActive: '1 hr ago',
  },
  {
    id: 'usr-05',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@example.com',
    role: 'Citizen',
    department: 'Complainant (TRX-2026-8841)',
    status: 'Active',
    lastActive: '5 min ago',
  },
];

const DEFAULT_NODES: SystemNode[] = [
  { name: 'Ethereum Mainnet Geth', network: 'ETH', status: 'Operational', latencyMs: 14, blockHeight: '21,984,310', peers: 48 },
  { name: 'Polygon Bor Archive', network: 'POL', status: 'Operational', latencyMs: 22, blockHeight: '68,142,090', peers: 36 },
  { name: 'Bitcoin Core Node', network: 'BTC', status: 'Operational', latencyMs: 31, blockHeight: '887,412', peers: 64 },
  { name: 'TronGrid RPC Fullnode', network: 'TRX', status: 'Operational', latencyMs: 45, blockHeight: '69,281,994', peers: 28 },
  { name: 'NCRP / SAHYOG Bridge', network: 'MHA Bridge', status: 'Operational', latencyMs: 8, blockHeight: 'Sync Active', peers: 12 },
];

interface StoreContextType {
  complaints: CitizenComplaint[];
  casesList: Case[];
  usersList: ManagedUser[];
  systemNodes: SystemNode[];
  auditLogs: Activity[];
  addComplaint: (complaint: Omit<CitizenComplaint, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'currentStage' | 'notes' | 'assignedOfficer' | 'assignedUnit'>) => CitizenComplaint;
  updateComplaintStatus: (id: string, stage: number, status: CitizenComplaint['status'], note: string) => void;
  toggleUserStatus: (id: string) => void;
  addUser: (user: Omit<ManagedUser, 'id' | 'lastActive'>) => void;
  logAuditEvent: (action: string, detail: string, actor?: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [complaints, setComplaints] = useState<CitizenComplaint[]>(() => {
    const saved = localStorage.getItem('trace_x_complaints');
    return saved ? JSON.parse(saved) : DEFAULT_COMPLAINTS;
  });

  const [casesList, setCasesList] = useState<Case[]>(() => {
    const saved = localStorage.getItem('trace_x_cases');
    return saved ? JSON.parse(saved) : initialCases;
  });

  const [usersList, setUsersList] = useState<ManagedUser[]>(() => {
    const saved = localStorage.getItem('trace_x_users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  const [systemNodes] = useState<SystemNode[]>(DEFAULT_NODES);

  const [auditLogs, setAuditLogs] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('trace_x_audit');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  useEffect(() => {
    localStorage.setItem('trace_x_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('trace_x_cases', JSON.stringify(casesList));
  }, [casesList]);

  useEffect(() => {
    localStorage.setItem('trace_x_users', JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    localStorage.setItem('trace_x_audit', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const logAuditEvent = (action: string, detail: string, actor = 'Insp. Aarav Kulkarni') => {
    const newLog: Activity = {
      id: `act-${Date.now()}`,
      action,
      caseId: 'SYSTEM',
      actor,
      timestamp: 'Just now',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addComplaint = (data: Omit<CitizenComplaint, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'currentStage' | 'notes' | 'assignedOfficer' | 'assignedUnit'>) => {
    const randId = `TRX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newComplaint: CitizenComplaint = {
      ...data,
      id: randId,
      status: 'Received',
      currentStage: 1,
      assignedOfficer: 'Insp. Aarav Kulkarni',
      assignedUnit: 'Cyber Crime Investigation Cell (Unit 4)',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      notes: [
        {
          date: 'Just now',
          message: `Complaint lodged via Citizen Portal by ${data.complainantName}. System acknowledgement dispatched.`,
          author: 'Citizen Portal Intake',
        },
      ],
    };

    setComplaints((prev) => [newComplaint, ...prev]);

    // Also auto-add into Investigator Cases so there is immediate continuity!
    const compactWallet = data.walletAddress
      ? `${data.walletAddress.slice(0, 6)}…${data.walletAddress.slice(-4)}`
      : 'Unspecified';

    const newCase: Case = {
      id: `CF-24-${Math.floor(200 + Math.random() * 800)}`,
      title: `${data.scamType} - ${data.complainantName}`,
      location: data.location || 'India',
      amount: data.lossAmountINR || 50000,
      currency: 'INR',
      riskScore: 88,
      status: 'New',
      typology: data.scamType,
      wallet: compactWallet,
      assignee: 'Insp. Aarav Kulkarni',
      updatedAt: 'Just now',
      hops: 1,
      vasp: data.exchangeUsed || 'Investigating',
      movementStatus: 'Pending trace',
    };

    setCasesList((prev) => [newCase, ...prev]);

    logAuditEvent(
      `New Citizen Fraud Complaint Lodged (${randId})`,
      `Reported by ${data.complainantName} for ₹${data.lossAmountINR.toLocaleString('en-IN')}`,
      data.complainantName
    );

    return newComplaint;
  };

  const updateComplaintStatus = (
    id: string,
    stage: number,
    status: CitizenComplaint['status'],
    note: string
  ) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            currentStage: stage,
            status,
            updatedAt: 'Just now',
            notes: [{ date: 'Just now', message: note, author: 'Insp. Aarav Kulkarni' }, ...c.notes],
          };
        }
        return c;
      })
    );

    logAuditEvent(`Complaint ${id} Updated`, `Stage moved to ${status}: "${note}"`);
  };

  const toggleUserStatus = (id: string) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          logAuditEvent(
            `User Status Changed: ${u.name}`,
            `Status changed from ${u.status} to ${nextStatus}`,
            'Dr. Vikramaditya Sen (Admin)'
          );
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const addUser = (userData: Omit<ManagedUser, 'id' | 'lastActive'>) => {
    const newUser: ManagedUser = {
      ...userData,
      id: `usr-${Date.now()}`,
      lastActive: 'Never',
    };
    setUsersList((prev) => [newUser, ...prev]);
    logAuditEvent(
      `New Officer Provisioned: ${userData.name}`,
      `Role: ${userData.role}, Department: ${userData.department}`,
      'Dr. Vikramaditya Sen (Admin)'
    );
  };

  return (
    <StoreContext.Provider
      value={{
        complaints,
        casesList,
        usersList,
        systemNodes,
        auditLogs,
        addComplaint,
        updateComplaintStatus,
        toggleUserStatus,
        addUser,
        logAuditEvent,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
