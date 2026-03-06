"use client";

import React, { useState, useEffect } from "react";
import { ServiceEntity } from "../../../domain/package/FinancialTypes";

interface ServiceHierarchyCardProps {
  vcNumber: string;
}

export default function ServiceHierarchyCard({ vcNumber }: ServiceHierarchyCardProps) {
  const [hierarchy, setHierarchy] = useState<ServiceEntity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHierarchy();
  }, [vcNumber]);

  const fetchHierarchy = async () => {
    setLoading(true);
    const res = await fetch(`/api/customer/hierarchy?vcNumber=${vcNumber}`);
    if (res.ok) {
      const data = await res.json();
      setHierarchy(data);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading Service Hierarchy...</div>;
  if (!hierarchy) return null;

  return (
    <div style={styles.container}>
      <h4 style={{ marginBottom: "16px", color: "var(--brand-primary)" }}>Assigned Service Chain (Hierarchy)</h4>
      
      <div style={styles.hierarchyTree}>
        {/* DCC Node */}
        <div style={styles.node}>
          <div style={styles.nodeLabel}>Direct Customer Care (DCC)</div>
          <div style={styles.nodeCard}>
            <div style={styles.name}>{hierarchy.company}</div>
            <div style={styles.subtext}>{hierarchy.name}</div>
            <div style={styles.contact}>📞 {hierarchy.phone} | ✉️ {hierarchy.email}</div>
            <div style={styles.address}>{hierarchy.address}</div>
          </div>
        </div>

        <div style={styles.connector}>↓</div>

        {/* Escalation Matrix */}
        <div style={styles.escalationGrid}>
          {hierarchy.escalation.ase && (
            <div style={styles.escNode}>
              <div style={styles.escLabel}>Area Service Executive (ASE)</div>
              <div style={styles.escValue}>{hierarchy.escalation.ase.name}</div>
              <div style={styles.escContact}>{hierarchy.escalation.ase.phone}</div>
            </div>
          )}
          {hierarchy.escalation.csm && (
            <div style={styles.escNode}>
              <div style={styles.escLabel}>Customer Service Manager (CSM)</div>
              <div style={styles.escValue}>{hierarchy.escalation.csm.name}</div>
              <div style={styles.escContact}>{hierarchy.escalation.csm.phone}</div>
            </div>
          )}
          {hierarchy.escalation.opsManager && (
            <div style={styles.escNode}>
              <div style={styles.escLabel}>Operations Manager</div>
              <div style={styles.escValue}>{hierarchy.escalation.opsManager.name}</div>
              <div style={styles.escContact}>{hierarchy.escalation.opsManager.phone}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "16px",
    background: "white",
    borderRadius: "8px",
    border: "1px solid var(--border-subtle)",
    marginTop: "16px",
  },
  hierarchyTree: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  node: {
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  nodeLabel: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#64748b",
    textTransform: "uppercase",
    marginBottom: "4px",
  },
  nodeCard: {
    padding: "12px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
  },
  name: {
    fontSize: "14px",
    fontWeight: 700,
    color: "var(--text-primary)",
  },
  subtext: {
    fontSize: "13px",
    color: "#475569",
    marginBottom: "4px",
  },
  contact: {
    fontSize: "12px",
    color: "var(--brand-primary)",
    fontWeight: 500,
    marginBottom: "4px",
  },
  address: {
    fontSize: "11px",
    color: "#64748b",
  },
  connector: {
    fontSize: "20px",
    color: "#cbd5e1",
    margin: "8px 0",
  },
  escalationGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    width: "100%",
  },
  escNode: {
    padding: "10px",
    background: "#f1f5f9",
    borderRadius: "4px",
    textAlign: "center",
    border: "1px solid #e2e8f0",
  },
  escLabel: {
    fontSize: "10px",
    fontWeight: 600,
    color: "#64748b",
    marginBottom: "4px",
  },
  escValue: {
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--text-primary)",
  },
  escContact: {
    fontSize: "11px",
    color: "var(--brand-primary)",
  }
};
