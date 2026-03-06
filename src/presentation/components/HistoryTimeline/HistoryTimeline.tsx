import React from "react";
import {
  Interaction,
  ServiceRequest,
} from "../../../domain/interaction/Interaction";
import { OutboundCampaignEntry } from "../../../domain/call/CallHandlingTypes";

interface HistoryTimelineProps {
  interactions: Interaction[];
  serviceRequests: ServiceRequest[];
  outboundCampaigns?: OutboundCampaignEntry[];
}

export default function HistoryTimeline({
  interactions,
  serviceRequests,
  outboundCampaigns = [],
}: HistoryTimelineProps) {
  // Combine all types of events and sort by date descending
  // We map them to a common structure for sorting
  const allEvents = [
    ...interactions.map(i => ({ ...i, sortDate: new Date(i.date), kind: "INTERACTION" })),
    ...serviceRequests.map(s => ({ ...s, sortDate: new Date(s.date), kind: "SERVICE" })),
    ...outboundCampaigns.map(c => ({ 
      id: c.id, 
      type: "OUTBOUND", 
      date: c.callDate, 
      category: c.campaignName, 
      notes: c.feedback, 
      status: c.status, 
      agentName: c.agentName,
      sortDate: new Date(c.callDate), 
      kind: "CAMPAIGN" 
    }))
  ].sort((a, b) => {
    return b.sortDate.getTime() - a.sortDate.getTime();
  });

  if (allEvents.length === 0) {
    return (
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          color: "var(--text-secondary)",
        }}
      >
        No interaction history found for this customer.
      </div>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <input
          type="text"
          className="input-field"
          placeholder="Filter timeline..."
          style={{ maxWidth: "300px" }}
        />
        <select className="input-field" style={{ width: "150px" }}>
          <option value="ALL">All Types</option>
          <option value="INBOUND">Inbound Calls</option>
          <option value="OUTBOUND">Campaign Calls</option>
          <option value="SMS">SMS</option>
          <option value="SERVICE">Service Requests</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {allEvents.map((event: any) => {
          const typeBadgeColor =
            event.type === "INBOUND"
              ? "#3b82f6"
              : event.type === "SMS"
                ? "#ea580c"
                : event.type === "OUTBOUND"
                  ? "#8b5cf6"
                  : event.type === "INSTALLATION" || event.type === "REPAIR"
                    ? "#10b981"
                    : "#64748b";

          return (
            <div
              key={event.id}
              style={{
                display: "flex",
                gap: "16px",
                padding: "16px",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                backgroundColor: event.kind === "CAMPAIGN" ? "#f5f3ff" : "#fafafa",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: "100px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                  }}
                >
                  {new Date(event.date).toLocaleDateString()}
                </span>
                <span
                  style={{ fontSize: "11px", color: "var(--text-secondary)" }}
                >
                  {new Date(event.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: typeBadgeColor,
                      color: "white",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    {event.type}
                  </span>
                  <strong style={{ fontSize: "14px" }}>{event.id}</strong>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "12px",
                      fontWeight: 600,
                      color:
                        event.status === "CLOSED" || event.status === "RESOLVED" || event.status === "CONNECTED"
                          ? "#16a34a"
                          : "#d97706",
                    }}
                  >
                    {event.status}
                  </span>
                </div>

                <h4 style={{ fontSize: "13px", marginBottom: "4px" }}>
                  {event.category || (event.kind === "SERVICE" ? "Service Request" : "Call")}
                </h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  {event.notes || event.resolutionRemarks}
                </p>

                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "var(--text-secondary)",
                    display: "flex",
                    gap: "16px",
                  }}
                >
                  {event.agentName && <span>Agent: {event.agentName}</span>}
                  {event.technicianId && (
                    <span>Technician: {event.technicianId}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
