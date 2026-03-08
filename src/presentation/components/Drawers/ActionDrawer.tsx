"use client";

import React from "react";
import { useAgentStore } from "../../../store/useAgentStore";
import { cn } from "../../../lib/utils";
import { 
  ArrowLeft, 
  X, 
  Brain, 
  Package, 
  Receipt, 
  AlertCircle, 
  Wrench,
  ShieldCheck,
  Smartphone,
  MessageSquare,
  Trophy,
  Network,
  Disc,
  ShieldOff
} from "lucide-react";
import DishtvBrain from "../AI/DishtvBrain";
import PackageToolBox from "../PackageTool/PackageToolBox";
import BillingAndSOATab from "../FinancialSummary/BillingAndSOATab";
import ComplaintHistoryTab from "../CallHandling/ComplaintHistoryTab";
import IntelligentComplaintLogger from "../CallHandling/IntelligentComplaintLogger";
import KycVerification from "../VerificationModal/KycVerification";
import WatchoDashboardTab from "../Watcho/WatchoDashboardTab";
import CommunicationHistoryTab from "../CallHandling/CommunicationHistoryTab";
import LoyaltyOverviewCard from "../FinancialSummary/LoyaltyOverviewCard";
import ServiceHierarchyCard from "../HardwareDetails/ServiceHierarchyCard";
import HardwareManagementTab from "../HardwareDetails/HardwareManagementTab";
import DNCManagementPanel from "../SubscriberProfile/DNCManagementPanel";

export default function ActionDrawer() {
  const { 
    activeActionDrawer, 
    setActiveActionDrawer, 
    isRightPanelOpen, 
    toggleRightPanel,
    activeCustomer,
    isCallerVerified,
    theme
  } = useAgentStore();

  const [complaintView, setComplaintView] = React.useState<'HISTORY' | 'LOG'>('HISTORY');

  // Reset view when drawer switches to something else
  React.useEffect(() => {
    setComplaintView('HISTORY');
  }, [activeActionDrawer]);

  const handleBackToAI = () => setActiveActionDrawer('AI');

  const renderContent = () => {
    if (!activeCustomer) return (
      <div className="h-full flex items-center justify-center p-8 text-center opacity-40">
        <div className="space-y-4">
          <Search size={48} className="mx-auto" />
          <p className="text-xs font-bold uppercase tracking-widest">Load a subscriber to start</p>
        </div>
      </div>
    );

    // Security Interlock: Force KYC for sensitive tools if not verified
    const sensitiveTools = ['PACKAGE_TOOL', 'CONTACT_UPDATE', 'WATCHO', 'COMMUNICATIONS', 'VIP', 'SERVICE', 'HARDWARE', 'DNC'];
    if (sensitiveTools.includes(activeActionDrawer!) && !isCallerVerified) {
      return <KycVerification onSuccess={() => {}} />;
    }

    switch (activeActionDrawer) {
      case 'AI':
        return <DishtvBrain />;
      case 'KYC':
        return <KycVerification />;
      case 'PACKAGE_TOOL':
        return <PackageToolBox vcNumber={activeCustomer.vcNumber} smsId={activeCustomer.smsId} />;
      case 'SOA':
        return <BillingAndSOATab vcNumber={activeCustomer.vcNumber} smsId={activeCustomer.smsId} />;
      case 'WATCHO':
        return <WatchoDashboardTab vcNumber={activeCustomer.vcNumber} />;
      case 'COMMUNICATIONS':
        return <CommunicationHistoryTab vcNumber={activeCustomer.vcNumber} />;
      case 'VIP':
        return <div className="p-4"><LoyaltyOverviewCard vcNumber={activeCustomer.vcNumber} /></div>;
      case 'SERVICE':
        return <div className="p-4"><ServiceHierarchyCard vcNumber={activeCustomer.vcNumber} /></div>;
      case 'HARDWARE':
        return <HardwareManagementTab vcNumber={activeCustomer.vcNumber} />;
      case 'DNC':
        return <DNCManagementPanel />;
      case 'COMPLAINTS':
        return complaintView === 'HISTORY' 
          ? <ComplaintHistoryTab vcNumber={activeCustomer.vcNumber} onLogNew={() => setComplaintView('LOG')} />
          : <IntelligentComplaintLogger onSuccess={() => setComplaintView('HISTORY')} />;
      default:
        return <DishtvBrain />;
    }
  };

  const getTitle = () => {
    // Interlock Title override
    const sensitiveTools = ['PACKAGE_TOOL', 'CONTACT_UPDATE', 'WATCHO', 'COMMUNICATIONS', 'VIP', 'SERVICE', 'HARDWARE', 'DNC'];
    if (sensitiveTools.includes(activeActionDrawer!) && !isCallerVerified) {
      return 'Identity Verification';
    }

    switch (activeActionDrawer) {
      case 'PACKAGE_TOOL': return 'Package Management';
      case 'SOA': return 'Statement of Account';
      case 'WATCHO': return 'Watcho Management';
      case 'COMMUNICATIONS': return 'Communication Logs';
      case 'VIP': return 'VIP & Loyalty';
      case 'SERVICE': return 'Service Hierarchy';
      case 'HARDWARE': return 'Hardware Management';
      case 'DNC': return 'DNC Management';
      case 'COMPLAINTS': return complaintView === 'HISTORY' ? 'Complaint History' : 'Log New Ticket';
      case 'TROUBLESHOOTING': return 'Technical Troubleshooting';
      case 'KYC': return 'Identity Verification';
      default: return 'DISHTV Brain';
    }
  };

  const getIcon = () => {
    // Interlock Icon override
    const sensitiveTools = ['PACKAGE_TOOL', 'CONTACT_UPDATE', 'WATCHO', 'COMMUNICATIONS', 'VIP', 'SERVICE', 'HARDWARE', 'DNC'];
    if (sensitiveTools.includes(activeActionDrawer!) && !isCallerVerified) {
      return <ShieldCheck size={16} />;
    }

    switch (activeActionDrawer) {
      case 'PACKAGE_TOOL': return <Package size={16} />;
      case 'SOA': return <Receipt size={16} />;
      case 'WATCHO': return <Smartphone size={16} />;
      case 'COMMUNICATIONS': return <MessageSquare size={16} />;
      case 'VIP': return <Trophy size={16} />;
      case 'SERVICE': return <Network size={16} />;
      case 'HARDWARE': return <Disc size={16} />;
      case 'DNC': return <ShieldOff size={16} />;
      case 'COMPLAINTS': return <AlertCircle size={16} />;
      case 'TROUBLESHOOTING': return <Wrench size={16} />;
      case 'KYC': return <ShieldCheck size={16} />;
      default: return <Brain size={16} />;
    }
  };

  return (
    <div className={cn(
      "flex flex-col h-full transition-colors duration-500",
      theme === 'dark' ? "bg-[#0B0F1A]" : "bg-white"
    )}>
      {/* Dynamic Header */}
      {activeActionDrawer !== 'AI' && (
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/[0.02]">
          <button 
            onClick={handleBackToAI}
            className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-orange-500 transition-all"
            title="Back to AI Co-pilot"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="text-orange-500">{getIcon()}</div>
            <div>
              <h2 className={cn("text-xs font-black uppercase tracking-tighter", theme === 'dark' ? "text-slate-200" : "text-slate-800")}>{getTitle()}</h2>
              <p className="text-[10px] text-slate-500 font-bold">VC: {activeCustomer?.vcNumber}</p>
            </div>
          </div>
          <button 
            onClick={() => toggleRightPanel(false)}
            className="ml-auto p-2 rounded-lg hover:bg-white/5 text-slate-500"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {renderContent()}
      </div>
    </div>
  );
}

function Search({ size, className }: { size?: number, className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  );
}
