"use client";

import React from "react";

type IconKey =
  | "Agent Profile"
  | "Camera / CCTV"
  | "View Profile"
  | "Person"
  | "Block / DNC"
  | "Grid"
  | "Status Dots"
  | "Watcho"
  | "Settings";

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
      <rect x="5" y="5" width="6" height="6" rx="1" stroke={color} strokeWidth="1.8" />
      <rect x="13" y="5" width="6" height="6" rx="1" stroke={color} strokeWidth="1.8" />
      <rect x="5" y="13" width="6" height="6" rx="1" stroke={color} strokeWidth="1.8" />
      <rect x="13" y="13" width="6" height="6" rx="1" stroke={color} strokeWidth="1.8" />
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
    renderIcon: (active) => <UserIcon color={active ? "#ffffff" : "#0f172a"} />,
  },
  {
    key: "Camera / CCTV",
    tooltip: "Camera / CCTV",
    renderIcon: (active) => <CameraIcon color={active ? "#ffffff" : "#0f172a"} />,
  },
  {
    key: "View Profile",
    tooltip: "View Profile",
    renderIcon: (active) => <ContactIcon color={active ? "#ffffff" : "#0f172a"} />,
  },
  {
    key: "Person",
    tooltip: "Person",
    renderIcon: (active) => <UserCircleIcon color={active ? "#ffffff" : "#0f172a"} />,
  },
  {
    key: "Block / DNC",
    tooltip: "Block / DNC",
    renderIcon: () => <BanIcon color="#ef4444" />,
  },
  {
    key: "Grid",
    tooltip: "Grid",
    renderIcon: (active) => <GridIcon color={active ? "#ffffff" : "#0f172a"} />,
  },
  {
    key: "Status Dots",
    tooltip: "Status Dots",
    renderIcon: (active) => <MoreHorizontalIcon color={active ? "#ffffff" : "#0f172a"} />,
  },
  {
    key: "Watcho",
    tooltip: "Watcho",
    renderIcon: (active) => (
      <PlayIcon color={active ? "#ffffff" : "#7c3aed"} />
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
  const [activeKey, setActiveKey] = React.useState<IconKey>("Agent Profile");
  const [hoveredKey, setHoveredKey] = React.useState<IconKey | null>(null);

  const handleClick = (config: IconButtonConfig) => {
    // eslint-disable-next-line no-console
    console.log(config.key);
    if (!config.disableActiveState) {
      setActiveKey(config.key);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 44,
        height: "100vh",
        backgroundColor: "#f5f5f5",
        borderLeft: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        zIndex: 40,
      }}
    >
      {ICONS.map((config) => {
        const isActive = !config.disableActiveState && activeKey === config.key;
        const baseBg = isActive ? "#f97316" : "#ffffff";
        const buttonStyle: React.CSSProperties = {
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: baseBg,
          border: "none",
          borderBottom: "1px solid #e5e7eb",
          cursor: "pointer",
          padding: 0,
          position: "relative",
        };

        const showProfilePanel = hoveredKey === "Agent Profile" && config.key === "Agent Profile";
        const showGridPanel = hoveredKey === "Grid" && config.key === "Grid";
        const showWatchoPanel =
          hoveredKey === "Status Dots" && config.key === "Status Dots";

        return (
          <div
            key={config.key}
            style={{ position: "relative" }}
            onMouseEnter={() => setHoveredKey(config.key)}
            onMouseLeave={() => setHoveredKey((prev) => (prev === config.key ? null : prev))}
          >
            <button
              type="button"
              style={buttonStyle}
              onClick={() => handleClick(config)}
            >
              {config.renderIcon(isActive)}
            </button>

            {showProfilePanel && <ProfileFlyout />}

            {showGridPanel && <QuickActionsFlyout />}

            {showWatchoPanel && <WatchoFlyout />}

            {hoveredKey === config.key &&
              !showProfilePanel &&
              !showGridPanel &&
              !showWatchoPanel && (
                <div
                  style={{
                    position: "absolute",
                    right: 40,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "#0f172a",
                    color: "#f9fafb",
                    padding: "4px 8px",
                    borderRadius: 4,
                    fontSize: 11,
                    whiteSpace: "nowrap",
                    boxShadow:
                      "0 10px 15px -3px rgba(15,23,42,0.3), 0 4px 6px -4px rgba(15,23,42,0.25)",
                  }}
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
}: {
  title: string;
  children: React.ReactNode;
  width?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        right: 40,
        top: 4,
        width,
        backgroundColor: "#ffffff",
        borderRadius: 6,
        border: "1px solid #e5e7eb",
        boxShadow:
          "0 20px 25px -5px rgba(15,23,42,0.25), 0 10px 10px -5px rgba(15,23,42,0.2)",
        overflow: "hidden",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "#f97316",
          color: "#ffffff",
          padding: "6px 10px",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {title}
      </div>
      <div
        style={{
          backgroundColor: "#fff7ed",
          padding: "8px 10px",
          borderBottom: "1px solid #fed7aa",
          fontSize: 11,
          color: "#7c2d12",
        }}
      >
        Prototype panel – actions are placeholders.
      </div>
      <div
        style={{
          padding: "8px 10px",
          backgroundColor: "#ffffff",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ProfileFlyout() {
  return (
    <FlyoutCard title="User Information">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          rowGap: 4,
          columnGap: 8,
          fontSize: 12,
        }}
      >
        <div style={{ fontWeight: 600 }}>Logged Date</div>
        <div>03/Mar/2026 11:32:24</div>
        <div style={{ fontWeight: 600 }}>User Name</div>
        <div>test0407</div>
        <div style={{ fontWeight: 600 }}>User ID</div>
        <div>123456</div>
        <div style={{ fontWeight: 600 }}>ZT User ID</div>
        <div>44441</div>
        <div style={{ fontWeight: 600 }}>Center ID</div>
        <div>Noida (2)</div>
      </div>

      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          type="button"
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log("Sign Out");
          }}
          style={{
            padding: "6px 14px",
            backgroundColor: "#f97316",
            borderRadius: 999,
            color: "#ffffff",
            fontSize: 12,
            border: "none",
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    </FlyoutCard>
  );
}

function QuickActionsFlyout() {
  const actions = [
    "Pay Later",
    "SMS Received",
    "Call Closure",
    "BackEnd Lead",
    "Sent Email",
    "Hotel Subs",
    "Upd/Dwn Status",
    "Change Status",
    "EPRS Tran",
    "E-COM Inst.",
    "Adv Pkg Req",
    "EPRS VC",
    "Hotel Inst",
    "Multi To Individual",
    "Missed Call Details",
    "Care Desk Waiver",
    "Resend Waiver",
    "OMM Blocking",
    "Demo Regional",
    "SMRT Stick Alexa OTA",
    "Barebox Offer",
    "OTT",
    "Box Ser. Plan",
    "NFDC MVOD",
    "Zing Add-on Waiver",
  ];

  const handleClick = (label: string) => {
    // eslint-disable-next-line no-console
    console.log(`Quick action: ${label}`);
  };

  return (
    <FlyoutCard title="Agent Shortcuts" width={420}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 8,
        }}
      >
        {actions.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => handleClick(label)}
            style={{
              height: 64,
              borderRadius: 4,
              border: "1px solid #e5e7eb",
              backgroundColor: "#ffffff",
              fontSize: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px 2px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#fff7ed";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#ffffff";
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 4,
                background:
                  "linear-gradient(135deg, #fed7aa 0%, #f97316 60%, #7c2d12 100%)",
                marginBottom: 4,
              }}
            />
            <span style={{ textAlign: "center" }}>{label}</span>
          </button>
        ))}
      </div>
    </FlyoutCard>
  );
}

function WatchoFlyout() {
  const actions = [
    "Watcho details",
    "Watcho renewal",
    "Watcho Auto Renewal Cancellation",
    "Watcho Prospect",
    "Freedom Plan",
    "Activate Offer",
  ];

  const handleClick = (label: string) => {
    // eslint-disable-next-line no-console
    console.log(`Watcho action: ${label}`);
  };

  return (
    <FlyoutCard title="Watcho Actions" width={380}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
        }}
      >
        {actions.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => handleClick(label)}
            style={{
              height: 72,
              borderRadius: 4,
              border: "1px solid #e5e7eb",
              backgroundColor: "#ffffff",
              fontSize: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px 2px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#fff7ed";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#ffffff";
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 4,
                background:
                  "linear-gradient(135deg, #ddd6fe 0%, #7c3aed 60%, #4c1d95 100%)",
                marginBottom: 4,
              }}
            />
            <span style={{ textAlign: "center" }}>{label}</span>
          </button>
        ))}
      </div>
    </FlyoutCard>
  );
}


