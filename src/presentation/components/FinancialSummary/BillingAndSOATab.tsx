"use client";

import React, { useState, useEffect } from "react";
import { SOAHeader, SOATransaction } from "../../../domain/package/FinancialTypes";
import OutstandingBalanceSummary from "./OutstandingBalanceSummary";
import PaymentHistoryTab from "./PaymentHistoryTab";
import WaiverRequestModal from "./WaiverRequestModal";

interface BillingAndSOATabProps {
  vcNumber: string;
  smsId: string;
}

export default function BillingAndSOATab({ vcNumber, smsId }: BillingAndSOATabProps) {
  const [header, setHeader] = useState<SOAHeader | null>(null);
  const [transactions, setTransactions] = useState<SOATransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewRPT, setViewRPT] = useState(7);
  const [showWaiverModal, setShowWaiverModal] = useState(false);

  useEffect(() => {
    fetchSOA();
  }, [vcNumber, viewRPT]);

  const fetchSOA = async () => {
    setLoading(true);
    const res = await fetch(`/api/finance/soa?vcNumber=${vcNumber}&viewRPT=${viewRPT}`);
    if (res.ok) {
      const data = await res.json();
      setHeader(data.header);
      setTransactions(data.transactions);
    }
    setLoading(false);
  };

  const handleResendInvoice = () => {
    alert(`Invoice re-send request triggered for ${vcNumber}. The customer will receive it on their registered email.`);
  };

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading Statement of Account...</div>;

  return (
    <div style={styles.container}>
      <OutstandingBalanceSummary vcNumber={vcNumber} />

      {/* Header Summary Card */}
      {header && (
        <div style={styles.headerCard}>
          <div style={styles.headerGrid}>
            <div>
              <div style={styles.label}>Account Balance</div>
              <div style={{ ...styles.value, color: header.balance >= 0 ? "#166534" : "#991b1b" }}>
                ₹{header.balance.toFixed(2)}
              </div>
            </div>
            <div>
              <div style={styles.label}>Monthly Recharge</div>
              <div style={styles.value}>₹{header.monthlyRecharge.toFixed(2)}</div>
            </div>
            <div>
              <div style={styles.label}>Switch-Off Date</div>
              <div style={styles.value}>{new Date(header.switchOffDate).toLocaleDateString()}</div>
            </div>
            <div>
              <div style={styles.label}>Bonus Points</div>
              <div style={{ ...styles.value, color: "#ea580c" }}>{header.bonusPoints}</div>
            </div>
          </div>
          <div style={styles.headerFooter}>
            <div style={styles.label}>Statement Period: <span style={{ color: "var(--text-primary)" }}>{header.statementPeriod}</span></div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                onClick={() => setShowWaiverModal(true)} 
                style={{ ...styles.btn, background: "#6366f1" }}
              >
                Request Waiver 💸
              </button>
              <button onClick={handleResendInvoice} style={styles.btn}>Resend Latest Invoice ✉️</button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Table */}
      <div style={styles.tableWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <h4 style={{ margin: 0 }}>Transaction History</h4>
          <select 
            value={viewRPT} 
            onChange={(e) => setViewRPT(parseInt(e.target.value))}
            style={styles.select}
          >
            <option value={7}>Current (Detailed)</option>
            <option value={6}>Summarized</option>
            <option value={4}>FY 2024-25</option>
          </select>
        </div>
        
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Ref No</th>
              <th style={styles.th}>Debit (₹)</th>
              <th style={styles.th}>Credit (₹)</th>
              <th style={styles.th}>Balance (₹)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>No transactions found for this period.</td></tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id} style={styles.tr}>
                  <td style={styles.td}>{new Date(t.date).toLocaleDateString()}</td>
                  <td style={styles.td}>
                    <div style={{ fontWeight: 500 }}>{t.description}</div>
                    {t.periodFrom && (
                      <div style={{ fontSize: "11px", color: "#64748b" }}>
                        Period: {new Date(t.periodFrom).toLocaleDateString()} - {new Date(t.periodTo!).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td style={styles.td}>{t.referenceNo}</td>
                  <td style={{ ...styles.td, color: "#991b1b" }}>{t.debit > 0 ? t.debit.toFixed(2) : "-"}</td>
                  <td style={{ ...styles.td, color: "#166534" }}>{t.credit > 0 ? t.credit.toFixed(2) : "-"}</td>
                  <td style={{ ...styles.td, fontWeight: 600 }}>{t.balance.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaymentHistoryTab vcNumber={vcNumber} />

      {showWaiverModal && (
        <WaiverRequestModal 
          vcNumber={vcNumber} 
          smsId={smsId} 
          onClose={() => setShowWaiverModal(false)}
          onSuccess={(id) => {
            setShowWaiverModal(false);
            alert(`Waiver request ${id} submitted successfully for approval.`);
          }}
        />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  headerCard: {
    background: "#f8fafc",
    border: "1px solid var(--border-subtle)",
    borderRadius: "8px",
    padding: "16px",
  },
  headerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "16px",
    paddingBottom: "16px",
    borderBottom: "1px solid var(--border-subtle)",
  },
  label: {
    fontSize: "12px",
    color: "#64748b",
    marginBottom: "4px",
  },
  value: {
    fontSize: "16px",
    fontWeight: 600,
  },
  headerFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    padding: "6px 12px",
    background: "var(--brand-primary)",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  select: {
    padding: "4px 8px",
    borderRadius: "4px",
    border: "1px solid var(--border-subtle)",
    fontSize: "13px",
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
    borderBottom: "2px solid #e2e8f0",
  },
  tr: {
    borderBottom: "1px solid #e2e8f0",
  },
  td: {
    padding: "12px 10px",
    verticalAlign: "top",
  }
};
