"use client";

import React from "react";
import { useAgentStore } from "../../../store/useAgentStore";
import { cn } from "../../../lib/utils";
import QuickActionsContainer from "../../quick-actions/QuickActionsContainer";
import WatchoActionsContainer from "../../watcho/WatchoActionsContainer";
import TroubleshootingSidebar from "../../troubleshooting/TroubleshootingSidebar";
import DiagnosticContainer from "../../troubleshooting/DiagnosticContainer";
import { TroubleshootingCategory } from "../../../domain/troubleshooting/types";

type IconKey =
  | "Agent Profile"
  | "Camera / CCTV"
  | "View Profile"
  | "Person"
  | "Block / DNC"
  | "Grid"
  | "Status Dots"
  | "Watcho"
  | "Settings"
  | "Troubleshooting";

interface IconButtonConfig {
  key: IconKey;
  tooltip: string;
  renderIcon: (active: boolean) => React.ReactNode;
  disableActiveState?: boolean;
}

function UserIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke={color} strokeWidth="1.8" />
      <path
        d="M6.5 18.5C7.6 16.3 9.6 15 12 15c2.4 0 4.4 1.3 5.5 3.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WrenchIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CameraIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect
        x="4"
        y="7"
        width="11"
        height="10"
        rx="2"
        stroke={color}
        strokeWidth="1.8"
      />
      <path
        d="M15 10.5 19.5 8v8L15 13.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="12" r="2" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

function ContactIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2"
        stroke={color}
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.3" stroke={color} strokeWidth="1.6" />
      <path
        d="M8.5 16.5C9.4 15.1 10.6 14.3 12 14.3c1.4 0 2.6.8 3.5 2.2"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserCircleIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.8" />
      <circle cx="12" cy="9.2" r="2.3" stroke={color} strokeWidth="1.6" />
      <path
        d="M8.5 16.2C9.4 14.8 10.6 14 12 14c1.4 0 2.6.8 3.5 2.2"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BanIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="7.5" stroke={color} strokeWidth="1.8" />
      <path
        d="M8.4 8.4 15.6 15.6"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GridIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect
        x="5"
        y="5"
        width="6"
        height="6"
        rx="1"
        stroke={color}
        strokeWidth="1.8"
      />
      <rect
        x="13"
        y="5"
        width="6"
        height="6"
        rx="1"
        stroke={color}
        strokeWidth="1.8"
      />
      <rect
        x="5"
        y="13"
        width="6"
        height="6"
        rx="1"
        stroke={color}
        strokeWidth="1.8"
      />
      <rect
        x="13"
        y="13"
        width="6"
        height="6"
        rx="1"
        stroke={color}
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MoreHorizontalIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="7" cy="12" r="1.6" fill={color} />
      <circle cx="12" cy="12" r="1.6" fill={color} />
      <circle cx="17" cy="12" r="1.6" fill={color} />
    </svg>
  );
}

function PlayIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.8" />
      <path
        d="M10.2 9.1 15 12l-4.8 2.9V9.1Z"
        fill={color}
        stroke={color}
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SettingsIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.5" stroke={color} strokeWidth="1.6" />
      <path
        d="M7.3 9.2 6 7l2.2-1.3 1.3-2.2L12 4l2.5-.5 1.3 2.2L18 7l-1.3 2.2.3 2.8-2.3.9L13.7 16l-1.7-.1L10.3 16l-.9-2.3-2.3-.9.2-2.8Z"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS: IconButtonConfig[] = [
  {
    key: "Agent Profile",
    tooltip: "Agent Profile",
    renderIcon: (active) => <UserIcon color={active ? "#ffffff" : "#64748b"} />,
  },
  {
    key: "Camera / CCTV",
    tooltip: "Camera / CCTV",
    renderIcon: (active) => (
      <CameraIcon color={active ? "#ffffff" : "#64748b"} />
    ),
  },
  {
    key: "View Profile",
    tooltip: "View Profile",
    renderIcon: (active) => (
      <ContactIcon color={active ? "#ffffff" : "#64748b"} />
    ),
  },
  {
    key: "Person",
    tooltip: "Person",
    renderIcon: (active) => (
      <UserCircleIcon color={active ? "#ffffff" : "#64748b"} />
    ),
  },
  {
    key: "Block / DNC",
    tooltip: "Block / DNC",
    renderIcon: () => <BanIcon color="#ef4444" />,
  },
  {
    key: "Grid",
    tooltip: "Grid",
    renderIcon: (active) => <GridIcon color={active ? "#ffffff" : "#64748b"} />,
  },
  {
    key: "Status Dots",
    tooltip: "Status Dots",
    renderIcon: (active) => (
      <MoreHorizontalIcon color={active ? "#ffffff" : "#64748b"} />
    ),
  },
  {
    key: "Watcho",
    tooltip: "Watcho",
    renderIcon: (active) => <PlayIcon color={active ? "#ffffff" : "#7c3aed"} />,
  },
  {
    key: "Troubleshooting",
    tooltip: "Troubleshooting",
    renderIcon: (active) => (
      <WrenchIcon color={active ? "#ffffff" : "#64748b"} />
    ),
  },
  {
    key: "Settings",
    tooltip: "Settings",
    renderIcon: () => <SettingsIcon color="#9ca3af" />,
    disableActiveState: true,
  },
];

export default function RightIconBar() {
  const { theme } = useAgentStore();
  const [activeKey, setActiveKey] = React.useState<IconKey>("Agent Profile");
  const [hoveredKey, setHoveredKey] = React.useState<IconKey | null>(null);

  const handleClick = (config: IconButtonConfig) => {
    if (!config.disableActiveState) {
      setActiveKey(config.key);
    }
  };

  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "h-full flex flex-col items-stretch z-40 transition-colors duration-500",
        "bg-background border-l border-border"
      )}
    >
      {ICONS.map((config) => {
        const isActive = !config.disableActiveState && activeKey === config.key;
        
        const showProfilePanel =
          hoveredKey === "Agent Profile" && config.key === "Agent Profile";
        const showGridPanel = hoveredKey === "Grid" && config.key === "Grid";
        const showWatchoPanel =
          hoveredKey === "Status Dots" && config.key === "Status Dots";
        const showCameraPanel =
          hoveredKey === "Camera / CCTV" && config.key === "Camera / CCTV";
        const showTroublePanel =
          hoveredKey === "Troubleshooting" && config.key === "Troubleshooting";

        return (
          <div
            key={config.key}
            className="relative"
            onMouseEnter={() => setHoveredKey(config.key)}
            onMouseLeave={() =>
              setHoveredKey((prev) => (prev === config.key ? null : prev))
            }
          >
            <button
              type="button"
              className={cn(
                "w-[44px] h-[44px] flex items-center justify-center border-none border-b cursor-pointer p-0 relative transition-all",
                isActive ? "bg-orange-500 border-orange-600" : "bg-transparent border-border hover:bg-muted"
              )}
              onClick={() => handleClick(config)}
            >
              {config.renderIcon(isActive)}
            </button>

            {showProfilePanel && <ProfileFlyout theme={theme} />}

            {showGridPanel && <QuickActionsFlyout theme={theme} />}

            {showWatchoPanel && <WatchoFlyout theme={theme} />}

            {showCameraPanel && <CameraFlyout theme={theme} />}

            {showTroublePanel && <TroubleshootingFlyout theme={theme} />}

            {hoveredKey === config.key &&
              !showProfilePanel &&
              !showGridPanel &&
              !showWatchoPanel &&
              !showCameraPanel &&
              !showTroublePanel && (
                <div
                  className={cn(
                    "absolute right-12 top-1/2 -translate-y-1/2 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-2xl z-50",
                    "bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-200"
                  )}
                >
                  {config.tooltip}
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
}

function FlyoutCard({
  title,
  children,
  width = 360,
  headerColor = "#f97316",
  theme = "light",
}: {
  title: string;
  children: React.ReactNode;
  width?: number;
  headerColor?: string;
  theme?: string;
}) {
  return (
    <div
      className={cn(
        "absolute right-12 top-1 rounded-2xl overflow-hidden shadow-2xl border z-50 transition-all duration-300 animate-in fade-in slide-in-from-right-4",
        "bg-card border-border"
      )}
      style={{ width }}
    >
      <div
        style={{
          backgroundColor: headerColor,
          color: "#ffffff",
          padding: "10px 16px",
          fontSize: "11px",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {title}
      </div>
      <div
        className={cn(
          "px-4 py-2 text-[10px] font-bold uppercase tracking-tighter border-b",
          "bg-muted/50 border-border text-muted-foreground"
        )}
      >
        Prototype panel – actions are placeholders.
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

function CameraFlyout({ theme }: { theme: string }) {
  const [status, setStatus] = React.useState<"pending" | "success" | "error">(
    "pending",
  );

  const statusColors = {
    pending: "#f59e0b",
    success: "#22c55e",
    error: "#ef4444",
  };

  const statusLabels = {
    pending: "Verification Pending",
    success: "Identity Verified",
    error: "Verification Failed",
  };

  return (
    <FlyoutCard title="Face Matching / CCTV" headerColor="#64748b" theme={theme}>
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            "w-full h-[180px] rounded-xl flex items-center justify-center flex-col relative overflow-hidden",
            "bg-slate-950"
          )}
        >
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div
              className="w-2 h-2 rounded-full bg-red-500 animate-pulse"
            />
            <span style={{ color: "#ffffff", fontSize: 10, fontWeight: 600 }}>
              LIVE
            </span>
          </div>
          <CameraIcon color="#475569" />
          <span
            style={{
              color: "#475569",
              fontSize: 12,
              marginTop: 8,
              fontWeight: 500,
            }}
          >
            AGENT CAMERA FEED
          </span>

          {status === "pending" && (
            <div
              className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-scan"
            />
          )}
        </div>

        <div
          className="flex items-center justify-center p-2 rounded-lg border gap-2"
          style={{
            backgroundColor: `${statusColors[status]}15`,
            borderColor: statusColors[status],
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: statusColors[status] }}
          />
          <span
            style={{
              color: statusColors[status],
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            {statusLabels[status]}
          </span>
        </div>

        <div
          className={cn(
            "text-[10px] font-bold uppercase grid grid-cols-2 gap-2 text-muted-foreground"
          )}
        >
          <div><strong>Agent:</strong> test0407</div>
          <div><strong>Mode:</strong> WFH</div>
          <div><strong>Match Score:</strong> {status === "success" ? "98.4%" : "--"}</div>
          <div><strong>Last Check:</strong> 11:32:24</div>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={() => setStatus("success")}
            className={cn(
              "flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
              "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            Verify
          </button>
          <button
            type="button"
            onClick={() => setStatus("error")}
            className={cn(
              "flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
              "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            Reset
          </button>
        </div>
      </div>
    </FlyoutCard>
  );
}

function ProfileFlyout({ theme }: { theme: string }) {
  return (
    <FlyoutCard title="User Information" theme={theme}>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="font-bold text-muted-foreground uppercase tracking-tighter">Logged Date</div>
          <div className="text-foreground">03/Mar/2026 11:32:24</div>
          <div className="font-bold text-muted-foreground uppercase tracking-tighter">User Name</div>
          <div className="text-foreground">test0407</div>
          <div className="font-bold text-muted-foreground uppercase tracking-tighter">User ID</div>
          <div className="text-foreground">123456</div>
          <div className="font-bold text-muted-foreground uppercase tracking-tighter">ZT User ID</div>
          <div className="text-foreground">44441</div>
          <div className="font-bold text-muted-foreground uppercase tracking-tighter">Center ID</div>
          <div className="text-foreground">Noida (2)</div>
        </div>

        <div className="flex justify-end pt-2 border-t border-border">
          <button
            type="button"
            onClick={() => console.log("Sign Out")}
            className="px-4 py-2 bg-orange-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-lg shadow-orange-900/20"
          >
            Sign Out
          </button>
        </div>
      </div>
    </FlyoutCard>
  );
}

function QuickActionsFlyout({ theme }: { theme: string }) {
  return (
    <FlyoutCard title="Agent Shortcuts" width={800} headerColor="#f97316" theme={theme}>
      <div className="h-[500px] -m-4 overflow-hidden rounded-b-2xl">
        <QuickActionsContainer />
      </div>
    </FlyoutCard>
  );
}

function WatchoFlyout({ theme }: { theme: string }) {
  return (
    <FlyoutCard title="Watcho Actions" width={800} headerColor="#7c3aed" theme={theme}>
      <div className="h-[500px] -m-4 overflow-hidden rounded-b-2xl">
        <WatchoActionsContainer />
      </div>
    </FlyoutCard>
  );
}

function TroubleshootingFlyout({ theme }: { theme: string }) {
  const [selectedCategory, setSelectedCategory] =
    React.useState<TroubleshootingCategory | null>(null);

  const handleComplete = (history: string) => {
    alert(`Troubleshooting Complete!\n\nCase History:\n${history}`);
    setSelectedCategory(null);
  };

  return (
    <FlyoutCard
      title="Technical Troubleshooting"
      width={800}
      headerColor="#3b82f6"
      theme={theme}
    >
      <div className="flex h-[500px] -m-4 overflow-hidden rounded-b-2xl">
        <TroubleshootingSidebar
          onSelectCategory={setSelectedCategory}
          selectedCategoryId={selectedCategory?.id}
        />
        <div className={cn(
          "flex-1 transition-colors duration-500 bg-background"
        )}>
          {selectedCategory ? (
            <DiagnosticContainer
              key={selectedCategory.id}
              category={selectedCategory}
              onComplete={handleComplete}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-10 text-center space-y-4">
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center border bg-muted border-border"
              )}>
                <WrenchIcon color="#64748b" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">
                  Guided Diagnostics
                </div>
                <p className="text-xs text-muted-foreground max-w-[240px] mt-1">
                  Select a category from the sidebar to begin step-by-step resolution.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </FlyoutCard>
  );
}
