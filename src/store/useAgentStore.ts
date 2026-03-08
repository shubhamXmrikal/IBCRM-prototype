import { create } from 'zustand';
import { Customer } from '../domain/customer/Customer';
import { KYCStatus } from '../domain/verification/VerificationTypes';

interface AgentState {
  // Agent Context
  agentId: string;
  agentName: string;
  center: string;
  routingMode: 'PRIMARY' | 'ZT REPLICA';
  ipAddress: string;

  // Active Customer Context
  activeCustomer: Customer | null;
  isCallerVerified: boolean;
  kycStatus: KYCStatus;
  
  // UI State
  theme: 'dark' | 'light';
  isRightPanelOpen: boolean;
  isDrawerExpanded: boolean;
  activeActionDrawer: 'AI' | 'PACKAGE_TOOL' | 'SOA' | 'COMPLAINTS' | 'TROUBLESHOOTING' | 'CONTACT_UPDATE' | 'KYC' | null;
  isCommandPaletteOpen: boolean;
  activeSidebarTab: string;
  sentiment: 'CALM' | 'NEUTRAL' | 'FRUSTRATED' | 'ANGRY';

  // Actions
  setActiveCustomer: (customer: Customer | null) => void;
  setCallerVerified: (verified: boolean) => void;
  setKycStatus: (status: KYCStatus) => void;
  toggleTheme: () => void;
  toggleRightPanel: (open?: boolean) => void;
  setDrawerExpanded: (expanded: boolean) => void;
  setActiveActionDrawer: (drawer: AgentState['activeActionDrawer']) => void;
  toggleCommandPalette: () => void;
  setSentiment: (sentiment: AgentState['sentiment']) => void;
  setRoutingMode: (mode: AgentState['routingMode']) => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  agentId: 'AGENT_001',
  agentName: 'Aman S.',
  center: 'Noida-Corp',
  routingMode: 'PRIMARY',
  ipAddress: '10.10.12.45',

  activeCustomer: null,
  isCallerVerified: false,
  kycStatus: 'PENDING',
  
  theme: 'dark',
  isRightPanelOpen: true,
  isDrawerExpanded: false,
  activeActionDrawer: 'AI',
  isCommandPaletteOpen: false,
  activeSidebarTab: '360',
  sentiment: 'NEUTRAL',

  setActiveCustomer: (customer) => set({ 
    activeCustomer: customer,
    isCallerVerified: customer?.callerContext?.callerMobType === 'RMN',
    kycStatus: customer?.callerContext?.kycStatus || 'PENDING'
  }),
  setCallerVerified: (verified) => set({ isCallerVerified: verified, kycStatus: verified ? 'VERIFIED' : 'PENDING' }),
  setKycStatus: (status) => set({ kycStatus: status, isCallerVerified: status === 'VERIFIED' }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  toggleRightPanel: (open) => set((state) => ({ isRightPanelOpen: open ?? !state.isRightPanelOpen })),
  setDrawerExpanded: (expanded) => set({ isDrawerExpanded: expanded }),
  setActiveActionDrawer: (drawer) => set({ 
    activeActionDrawer: drawer, 
    isRightPanelOpen: !!drawer,
    isDrawerExpanded: drawer !== 'AI' && drawer !== null // Auto-expand for tools
  }),
  toggleCommandPalette: () => set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
  setSentiment: (sentiment) => set({ sentiment }),
  setRoutingMode: (mode) => set({ routingMode: mode }),
}));
