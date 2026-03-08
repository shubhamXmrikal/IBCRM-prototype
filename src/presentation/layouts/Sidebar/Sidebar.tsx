"use client";

import React from "react";
import { 
  UserCircle, 
  PhoneCall, 
  PlusCircle, 
  BarChart3, 
  Settings,
  Zap,
  LayoutDashboard,
  Sun,
  Moon
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useAgentStore } from "../../../store/useAgentStore";

interface SidebarProps {
  onRecharge?: () => void;
}

const NAV_ITEMS = [
  { id: '360', icon: LayoutDashboard, label: 'Customer 360' },
  { id: 'calls', icon: PhoneCall, label: 'Service Calls' },
  { id: 'addons', icon: PlusCircle, label: 'CC Add-ons' },
  { id: 'reports', icon: BarChart3, label: 'Reports & Audit' },
];

export default function Sidebar({ onRecharge }: SidebarProps) {
  const [activeTab, setActiveTab] = React.useState('360');
  const { theme, toggleTheme } = useAgentStore();

  return (
    <aside className={cn(
      "crm-sidebar border-r flex flex-col items-center py-4 transition-colors duration-500",
      theme === 'dark' ? "bg-[#0B0F1A] border-white/5" : "bg-white border-slate-200"
    )}>
      {/* Brand Logo - Slim */}
      <div className="mb-8 group cursor-pointer">
        <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-orange-600/20 group-hover:scale-105 transition-transform">
          D
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 flex flex-col gap-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "p-3 rounded-xl transition-all relative group",
              activeTab === item.id 
                ? (theme === 'dark' ? "bg-orange-600/10 text-orange-500" : "bg-orange-50 text-orange-600")
                : (theme === 'dark' ? "text-slate-500 hover:text-slate-300 hover:bg-white/5" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50")
            )}
            title={item.label}
          >
            <item.icon size={22} strokeWidth={2} />
            {activeTab === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r-full shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
            )}
          </button>
        ))}

        <div className={cn("h-px w-8 mx-auto my-2", theme === 'dark' ? "bg-white/5" : "bg-slate-100")} />

        {/* Quick Actions */}
        <button
          onClick={onRecharge}
          className="p-3 rounded-xl text-amber-500 hover:bg-amber-500/10 transition-all group"
          title="⚡ Quick Recharge"
        >
          <Zap size={22} fill="currentColor" strokeWidth={0} className="group-hover:scale-110 transition-transform" />
        </button>
      </nav>

      {/* Bottom Profile/Settings */}
      <div className="mt-auto flex flex-col gap-4">
        <button 
          onClick={toggleTheme}
          className={cn(
            "p-3 rounded-xl transition-all",
            theme === 'dark' ? "text-slate-500 hover:text-amber-400 hover:bg-white/5" : "text-slate-400 hover:text-amber-600 hover:bg-slate-50"
          )}
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
        </button>
        <button className={cn(
          "p-3 transition-colors",
          theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"
        )}>
          <Settings size={22} />
        </button>
        <div className={cn(
          "w-10 h-10 rounded-full border flex items-center justify-center overflow-hidden",
          theme === 'dark' ? "bg-slate-800 border-white/10" : "bg-slate-100 border-slate-200"
        )}>
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aman" 
            alt="Agent" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </aside>
  );
}
