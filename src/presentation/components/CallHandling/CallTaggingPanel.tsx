"use client";

import React, { useState, useEffect } from "react";
import { CallCategoryNode } from "../../../domain/call/CallHandlingTypes";
import LogComplaintModal from "./LogComplaintModal";

interface CallTaggingPanelProps {
  vcNumber: string;
  smsId: string;
  agentId: string;
  onSuccess: () => void;
}

export default function CallTaggingPanel({ vcNumber, smsId, agentId, onSuccess }: CallTaggingPanelProps) {
  const [categories, setCategories] = useState<CallCategoryNode[]>([]);
  const [selections, setSelections] = useState<string[]>([]);
  const [remarks, setRemarks] = useState("");
  const [isResolved, setIsResolved] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [callbackInfo, setCallbackInfo] = useState<string | null>(null);
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  useEffect(() => {
    fetch("/api/calls/categories")
      .then(res => res.json())
      .then(data => setCategories(data.categories))
      .catch(err => setError("Failed to load call tree."));
  }, []);

  const getOptions = (parentId?: string) => {
    return categories.filter(c => c.parentId === parentId);
  };

  const handleSelect = (level: number, id: string) => {
    const newSelections = selections.slice(0, level);
    newSelections[level] = id;
    setSelections(newSelections);
    setCallbackInfo(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const lastSelection = selections[selections.length - 1];
    const node = categories.find(c => c.id === lastSelection);

    if (!node || !node.isLeaf) {
      setError("Please select a valid final reason (leaf node).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/calls/close", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vcNumber,
          agentId,
          categoryId: node.id,
          remarks,
          interactionType: "INBOUND",
          isResolved
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (data.callbackScheduled) {
        setCallbackInfo("Call drop detected. A callback has been automatically scheduled via Module 11.");
      } else {
        alert("Call tagged and closed successfully.");
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const levels = [0, 1, 2, 3]; // Show up to 4 levels as per requirements

  return (
    <div className="card" style={{ padding: "24px", background: "#f8fafc" }}>
      <h3 style={{ marginBottom: "16px", color: "var(--brand-primary)" }}>Call Disposition (Tagging)</h3>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {error && <div style={{ color: "#ef4444", fontSize: "13px", padding: "8px", background: "#fef2f2", borderRadius: "4px" }}>⚠️ {error}</div>}
        {callbackInfo && <div style={{ color: "#16a34a", fontSize: "13px", padding: "12px", background: "#f0fdf4", borderRadius: "4px", border: "1px solid #bbf7d0" }}>✅ {callbackInfo}</div>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {levels.map(level => {
            const parentId = level === 0 ? undefined : selections[level - 1];
            const options = getOptions(parentId);
            
            if (level > 0 && !parentId) return null;
            if (options.length === 0 && level > 0) return null;

            return (
              <div key={level}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "4px", textTransform: "uppercase" }}>
                  Level {level + 1}
                </label>
                <select 
                  className="input-field" 
                  value={selections[level] || ""} 
                  onChange={(e) => handleSelect(level, e.target.value)}
                  disabled={loading || !!callbackInfo}
                >
                  <option value="">-- Select --</option>
                  {options.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        <div>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "4px", textTransform: "uppercase" }}>Remarks</label>
          <textarea 
            className="input-field" 
            rows={3} 
            value={remarks} 
            onChange={e => setRemarks(e.target.value)}
            placeholder="Enter interaction summary (legacy: ramarks)..."
            disabled={loading || !!callbackInfo}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", cursor: "pointer" }}>
            <input type="checkbox" checked={isResolved} onChange={e => setIsResolved(e.target.checked)} disabled={loading || !!callbackInfo} />
            Issue Resolved
          </label>

          <div style={{ display: "flex", gap: "8px" }}>
            {!isResolved && !callbackInfo && (
              <button 
                type="button" 
                className="btn-primary" 
                style={{ backgroundColor: "#6366f1" }}
                onClick={() => setShowComplaintModal(true)}
              >
                Log Complaint 🎫
              </button>
            )}
            {callbackInfo ? (
              <button type="button" className="btn-primary" onClick={onSuccess}>Close Panel</button>
            ) : (
              <button type="submit" className="btn-primary" disabled={loading || selections.length === 0}>
                {loading ? "Processing..." : "Complete & Close Call"}
              </button>
            )}
          </div>
        </div>
      </form>

      {showComplaintModal && (
        <LogComplaintModal 
          vcNumber={vcNumber} 
          smsId={smsId} 
          onClose={() => setShowComplaintModal(false)} 
          onSuccess={(tktId) => {
            setShowComplaintModal(false);
            alert(`Ticket ${tktId} logged successfully. You can now close the call.`);
            setIsResolved(false); // Ensure it stays unresolved as a ticket is now open
          }}
        />
      )}
    </div>
  );
}
