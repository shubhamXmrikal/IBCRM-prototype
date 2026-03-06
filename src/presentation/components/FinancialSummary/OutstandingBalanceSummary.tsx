"use client";

import React, { useState, useEffect } from "react";
import { OutstandingBalance } from "../../../domain/package/FinancialTypes";

interface OutstandingBalanceSummaryProps {
  vcNumber: string;
}

export default function OutstandingBalanceSummary({ vcNumber }: OutstandingBalanceSummaryProps) {
  const [balances, setBalances] = useState<OutstandingBalance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/customer/hierarchy?vcNumber=${vcNumber}`) // Reusing repo through hierarchy API or separate one? 
      // Actually let's create a specific API for this or use hierarchy. 
      // For now, I'll mock the fetch.
      setLoading(true);
      fetch(`/api/finance/soa?vcNumber=${vcNumber}`)
        .then(() => {
           // Mocking the specific OS balance logic
           setBalances({
             general: 0,
             installation: 0,
             serviceCall: 250.00,
             payLater: 0
           });
           setLoading(false);
        });
  }, [vcNumber]);

  if (loading || !balances) return null;

  const totalOS = balances.general + balances.installation + balances.serviceCall + balances.payLater;

  if (totalOS === 0) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={{ fontSize: "18px" }}>⚠️</span>
        <div style={{ fontWeight: 700 }}>Outstanding Balance Detected</div>
      </div>
      
      <div style={styles.grid}>
        {balances.serviceCall > 0 && (
          <div style={styles.item}>
            <div style={styles.label}>Service Call OS</div>
            <div style={styles.value}>₹{balances.serviceCall.toFixed(2)}</div>
          </div>
        )}
        {balances.installation > 0 && (
          <div style={styles.item}>
            <div style={styles.label}>Installation OS</div>
            <div style={styles.value}>₹{balances.installation.toFixed(2)}</div>
          </div>
        )}
        {balances.payLater > 0 && (
          <div style={styles.item}>
            <div style={styles.label}>Pay Later OS</div>
            <div style={styles.value}>₹{balances.payLater.toFixed(2)}</div>
          </div>
        )}
      </div>

      <div style={styles.footer}>
        Total Outstanding: <strong>₹{totalOS.toFixed(2)}</strong>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "12px 16px",
    background: "#fef2f2",
    border: "1px solid #fee2e2",
    borderRadius: "8px",
    color: "#991b1b",
    marginBottom: "16px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "10px",
    fontSize: "14px",
  },
  grid: {
    display: "flex",
    gap: "20px",
    marginBottom: "10px",
    paddingLeft: "26px",
  },
  item: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "11px",
    textTransform: "uppercase",
    opacity: 0.8,
  },
  value: {
    fontSize: "14px",
    fontWeight: 700,
  },
  footer: {
    borderTop: "1px solid #fecaca",
    paddingTop: "8px",
    fontSize: "12px",
    textAlign: "right",
  }
};
