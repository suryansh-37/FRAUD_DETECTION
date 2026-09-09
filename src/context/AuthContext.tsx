import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'victim' | 'investigator' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  department: string;
  badge?: string;
  avatar: string;
  initials: string;
  phone?: string;
}

export const DUMMY_USERS: Record<UserRole, UserProfile> = {
  victim: {
    id: 'usr-vic-01',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@example.com',
    role: 'victim',
    title: 'Complainant / Citizen',
    department: 'General Public (Victim Portal)',
    phone: '+91 98230 45812',
    avatar: 'RS',
    initials: 'RS',
  },
  investigator: {
    id: 'usr-inv-01',
    name: 'Insp. Aarav Kulkarni',
    email: 'aarav.kulkarni@cybercrime.gov.in',
    role: 'investigator',
    title: 'Lead Cyber Investigator',
    department: 'Cyber Crime Investigation Cell (Unit 4)',
    badge: 'CY-IND-4092',
    phone: '+91 94112 00392',
    avatar: 'AK',
    initials: 'AK',
  },
  admin: {
    id: 'usr-adm-01',
    name: 'Dr. Vikramaditya Sen',
    email: 'v.sen@cert-in.gov.in',
    role: 'admin',
    title: 'Chief Security & System Administrator',
    department: 'System Architecture & Operations Command',
    badge: 'ADM-SYS-001',
    phone: '+91 91234 56789',
    avatar: 'VS',
    initials: 'VS',
  },
};

interface AuthContextType {
  currentUser: UserProfile;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('trace_x_active_role');
    if (saved && (saved === 'victim' || saved === 'investigator' || saved === 'admin')) {
      return DUMMY_USERS[saved as UserRole];
    }
    return DUMMY_USERS.investigator;
  });

  const loginAs = (role: UserRole) => {
    const profile = DUMMY_USERS[role];
    setCurrentUser(profile);
    localStorage.setItem('trace_x_active_role', role);
  };

  const logout = () => {
    loginAs('investigator');
  };

  useEffect(() => {
    localStorage.setItem('trace_x_active_role', currentUser.role);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
