"use client";

import React, { useState, useEffect } from "react";
import { PaymentReceipt } from "../../../domain/package/FinancialTypes";

interface PaymentHistoryTabProps {
  vcNumber: string;
}

export default function PaymentHistoryTab({ vcNumber }: PaymentHistoryTabProps) {
  const [payments, setPayments] = useState<PaymentReceipt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, [vcNumber]);

  const fetchPayments = async () => {
    setLoading(true);
    const res = await fetch(`/api/finance/payments?vcNumber=${vcNumber}`);
    if (res.ok) {
      const data = await res.json();
      setPayments(data);
    }
    setLoading(false);
  };

  if (loading) return <div>Loading payment history...</div>;

  return (
    <div style={styles.container}>
      <h4 style={{ marginBottom: "12px" }}>Recharge & Payment Receipts</h4>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Amount (₹)</th>
              <th style={styles.th}>Mode</th>
              <th style={styles.th}>Ref No</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>No payment records found.</td></tr>
            ) : (
              payments.map((p) => (
                <tr key={p.id} style={styles.tr}>
                  <td style={styles.td}>{new Date(p.date).toLocaleDateString()}</td>
                  <td style={{ ...styles.td, fontWeight: 700 }}>₹{p.amount.toFixed(2)}</td>
                  <td style={styles.td}>
                    <span style={styles.modeBadge}>{p.mode}</span>
                    {p.bank && <div style={{ fontSize: "10px", color: "#64748b" }}>{p.bank}</div>}
                  </td>
                  <td style={styles.td}>{p.referenceNo}</td>
                  <td style={styles.td}>
                    <span style={{ 
                      ...styles.statusBadge, 
                      backgroundColor: p.status === "SUCCESS" || p.status === "REALIZED" ? "#dcfce7" : "#f1f5f9",
                      color: p.status === "SUCCESS" || p.status === "REALIZED" ? "#166534" : "#475569"
                    }}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    marginTop: "20px",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  thRow: {
    background: "#f1f5f9",
    textAlign: "left",
  },
  th: {
    padding: "10px",
    fontWeight: 600,
    color: "#475569",
    borderBottom: "1px solid #e2e8f0",
  },
  tr: {
    borderBottom: "1px solid #f1f5f9",
  },
  td: {
    padding: "10px",
  },
  modeBadge: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#1e293b",
  },
  statusBadge: {
    padding: "2px 6px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: 600,
  }
};
