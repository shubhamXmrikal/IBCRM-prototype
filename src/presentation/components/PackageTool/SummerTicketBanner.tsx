"use client";

import React, { useState, useEffect } from "react";
import { SummerTicket } from "../../../domain/package/AlacarteTypes";

interface SummerTicketBannerProps {
  smsId: string;
}

export default function SummerTicketBanner({ smsId }: SummerTicketBannerProps) {
  const [tickets, setTickets] = useState<SummerTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, [smsId]);

  const fetchTickets = async () => {
    setLoading(true);
    const res = await fetch(`/api/packages/summer-ticket?smsId=${smsId}`);
    if (res.ok) {
      const data = await res.json();
      setTickets(data);
    }
    setLoading(false);
  };

  if (loading || tickets.length === 0) return null;

  const ticket = tickets[0]; // Just show the first available for now

  return (
    <div style={styles.banner}>
      <div style={styles.content}>
        <span style={styles.icon}>☀️</span>
        <div>
          <div style={styles.title}>{ticket.name} Available!</div>
          <div style={styles.subtitle}>
            Get seasonal access for just <strong>₹{ticket.monthlyPrice}/mo</strong>. {ticket.lockInDays} days lock-in applies.
          </div>
        </div>
      </div>
      <button 
        style={styles.actionBtn}
        onClick={() => alert(`Processing Summer Ticket: ${ticket.name}`)}
      >
        Opt In Now
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    padding: "12px 20px",
    background: "linear-gradient(90deg, #ea580c 0%, #f97316 100%)",
    color: "white",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  content: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  icon: {
    fontSize: "24px",
  },
  title: {
    fontWeight: 700,
    fontSize: "15px",
  },
  subtitle: {
    fontSize: "12px",
    opacity: 0.9,
  },
  actionBtn: {
    padding: "6px 12px",
    background: "white",
    color: "#ea580c",
    border: "none",
    borderRadius: "4px",
    fontWeight: 700,
    fontSize: "13px",
    cursor: "pointer",
  }
};
