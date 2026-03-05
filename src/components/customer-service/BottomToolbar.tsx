"use client";

import React from "react";

type DropdownItem = {
  label: string;
};

interface DropdownButtonProps {
  label: string;
  items: DropdownItem[];
}

const buttonBaseStyle: React.CSSProperties = {
  padding: "4px 10px",
  fontSize: 13,
  borderRadius: 4,
  border: "1px solid #e2e8f0",
  backgroundColor: "#ffffff",
  color: "#0f172a",
  cursor: "pointer",
  height: 28,
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
};

function DropdownButton({ label, items }: DropdownButtonProps) {
  const [open, setOpen] = React.useState(false);

  const handleItemClick = (item: DropdownItem) => {
    // Placeholder behaviour
    // eslint-disable-next-line no-console
    console.log(`Bottom toolbar action: ${label} -> ${item.label}`);
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        style={buttonBaseStyle}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{label}</span>
        <span style={{ fontSize: 10 }}>▼</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "110%",
            left: 0,
            minWidth: 220,
            maxHeight: 288, // ~ max-h-72
            overflowY: "auto",
            backgroundColor: "#ffffff",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 12px 16px -4px rgba(15,23,42,0.25), 0 4px 6px -4px rgba(15,23,42,0.2)",
            zIndex: 40,
          }}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleItemClick(item)}
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                backgroundColor: "transparent",
                padding: "6px 10px",
                fontSize: 13,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#f97316";
                (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#0f172a";
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BottomToolbar() {
  const handleClick = (label: string) => {
    // Placeholder direct action
    // eslint-disable-next-line no-console
    console.log(`Bottom toolbar action: ${label}`);
  };

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e2e8f0",
        padding: "6px 16px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        zIndex: 30,
      }}
    >
      {/* Direct buttons */}
      <button
        type="button"
        style={buttonBaseStyle}
        onClick={() => handleClick("Tagging")}
      >
        Tagging
      </button>
      <button
        type="button"
        style={buttonBaseStyle}
        onClick={() => handleClick("SOA")}
      >
        SOA
      </button>
      <button
        type="button"
        style={buttonBaseStyle}
        onClick={() => handleClick("SMS")}
      >
        SMS
      </button>

      {/* Dropdowns */}
      <DropdownButton
        label="Search"
        items={[
          { label: "Pincode" },
          { label: "Hierarchy" },
          { label: "Parent-Child" },
          { label: "Search Emails" },
          { label: "Home Delivery Leads" },
        ]}
      />

      <DropdownButton
        label="DNC"
        items={[
          { label: "DNC All (IVR Call/SMS/OB/VM/WhatsApp)" },
          { label: "DNC Calling (OB/VM)" },
          { label: "DNC Check" },
        ]}
      />

      <DropdownButton
        label="Add-On Pack"
        items={[
          { label: "Add-On Pack OptOut Date" },
          { label: "Advance Add-on Pack" },
          { label: "Delete Add-On Pack" },
          { label: "Delete HD Sampler Add-On Pack" },
          { label: "Change Annual Add-On Pack" },
          { label: "Optout/Optin Add-on" },
          { label: "Delete Per Day Add-on" },
          { label: "Sports Add-On Pack" },
          { label: "Activate free preview" },
          { label: "Free 7HD Channel Activated" },
        ]}
      />

      <DropdownButton
        label="DVR"
        items={[
          { label: "DVR Activation" },
          { label: "DVR Details" },
        ]}
      />

      <DropdownButton
        label="Others"
        items={[
          { label: "Prospective Sub Dtl" },
          { label: "DL MST & Demo Boxes" },
          { label: "STB Pairing" },
          { label: "LTR & Malamaal Cashback Info" },
          { label: "Active Dealer" },
          { label: "VM-IVR Details" },
          { label: "Updation Report" },
          { label: "Mark 3S-Accessory" },
          { label: "OYC Conversion" },
          { label: "Feedback" },
          { label: "Request For Email" },
          { label: "LCO Alignment" },
          { label: "Free Add-on Request" },
          { label: "Multi Conversion" },
          { label: "Watcho Subscription" },
        ]}
      />

      <DropdownButton
        label="Misc"
        items={[
          { label: "Manager Escalation" },
          { label: "CallBack Details" },
          { label: "PinCode Request" },
          { label: "Cancel Adv Acq Offer Pack" },
          { label: "Pass LTR Benefit" },
          { label: "Channel Rollback" },
          { label: "Dish VIP Enrolment" },
          { label: "Free Visit" },
        ]}
      />

      <DropdownButton
        label="Ad_"
        items={[
          { label: "Prioritize Renewal" },
          { label: "Sent SMS Details" },
          { label: "Cont Dtls Updtng Rpt" },
          { label: "PayLater Subscription" },
          { label: "Subs Preferred Language" },
          { label: "FOC Service" },
          { label: "UPP Base Pack Roll Back" },
          { label: "Pack Roll Back" },
          { label: "BSP UPP Roll Back" },
          { label: "Pass FreeDays Benefits" },
        ]}
      />

      <DropdownButton
        label="PKG/CNX/PMT"
        items={[
          { label: "Package" },
          { label: "Conax" },
          { label: "Payment" },
          { label: "Recharge Offer" },
          { label: "Payment Transfer/VC Termination" },
          { label: "Price Protection" },
        ]}
      />
    </div>
  );
}

