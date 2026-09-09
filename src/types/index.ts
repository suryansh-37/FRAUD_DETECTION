export type CaseStatus = 'New' | 'In review' | 'Freeze requested' | 'Resolved';

export type Case = {
  id: string;
  title: string;
  location: string;
  amount: number;
  currency: string;
  riskScore: number;
  status: CaseStatus;
  typology: string;
  wallet: string;
  assignee: string;
  updatedAt: string;
  hops: number;
  vasp: string;
  movementStatus: string;
};

export type TraceNode = {
  label: string;
  address: string;
  type: string;
  amount: string;
  timestamp: string;
  risk: number;
  x: number;
  y: number;
  chain?: string;
  direction?: 'in' | 'out';
  txHash?: string;
};

export type Notice = {
  id: string;
  caseId: string;
  vasp: string;
  status: string;
  sentAt: string;
  sla: string;
  legalBasis: string;
};

export type Activity = {
  id?: string;
  label?: string;
  action?: string;
  detail: string;
  timestamp: string;
  kind?: string;
  actor?: string;
  caseId?: string;
};

export type Role = {
  key: string;
  label: string;
  description: string;
  accent: string;
};

export type LiveTransaction = {
  hash: string;
  timestamp: string | null;
  direction: 'in' | 'out' | 'mixed';
  value: string;
  counterparty: string;
  status: string;
  chain: string;
  explorerUrl: string;
};

export type LiveInspection = {
  address: string;
  network: string;
  provider: string;
  explorerUrl: string;
  validated: boolean;
  balance: string;
  transactionCount: number;
  summary: {
    incoming: number;
    outgoing: number;
    firstSeen: string | null;
    lastSeen: string | null;
  };
  transactions: LiveTransaction[];
};
