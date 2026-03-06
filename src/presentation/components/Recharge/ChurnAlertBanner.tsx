"use client";

import React, { useState, useEffect } from "react";
import { RechargeDueInfo } from "../../../domain/recharge/RechargeTypes";

interface ChurnAlertBannerProps {
  smsId: string;
}

export default function ChurnAlertBanner({ smsId }: ChurnAlertBannerProps) {
  const [dueInfo, setDueInfo] = useState<RechargeDueInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/recharge/due?smsId=${smsId}`)
      .then((res) => res.json())
      .then((data) => setDueInfo(data))
      .finally(() => setLoading(false));
  }, [smsId]);

  if (loading || !dueInfo || dueInfo.daysBeforeChurn > 30) return null;

  return (
    <div style={styles.banner}>
      <div style={styles.content}>
        <span style={styles.icon}>🚨</span>
        <div>
          <div style={styles.title}>Critical: Account at Risk of Churn</div>
          <div style={styles.subtitle}>
            Only <strong>{dueInfo.daysBeforeChurn} days</strong> remaining
            before this account is deleted from the system.
          </div>
        </div>
      </div>
      <div style={styles.due}>
        Due: <strong>₹{dueInfo?.dueAmount?.toFixed(2)}</strong>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    padding: "10px 16px",
    background: "#fef2f2",
    border: "1px solid #fee2e2",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    color: "#991b1b",
  },
  content: { display: "flex", alignItems: "center", gap: "12px" },
  icon: { fontSize: "20px" },
  title: { fontWeight: 700, fontSize: "14px" },
  subtitle: { fontSize: "12px", opacity: 0.9 },
  due: { fontSize: "14px" },
};
