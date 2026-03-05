"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../presentation/layouts/Sidebar/Sidebar";
import Header from "../presentation/layouts/Header/Header";
import UnifiedTabs from "../presentation/components/UnifiedTabs/UnifiedTabs";
import ActionModals from "../presentation/components/ActionModals/ActionModals";
import SubscriberCard from "../presentation/components/SubscriberProfile/SubscriberCard";
import HardwareStatus from "../presentation/components/HardwareDetails/HardwareStatus";
import LastPaymentCard from "../presentation/components/FinancialSummary/LastPaymentCard";
import AlertsPanel from "../presentation/components/FinancialSummary/AlertsPanel";
import DisambiguationModal from "../presentation/components/DisambiguationModal/DisambiguationModal";
import GoMultiPanel from "../presentation/components/GoMultiPanel/GoMultiPanel";
import { Customer } from "../domain/customer/Customer";
import { Interaction, ServiceRequest } from "../domain/interaction/Interaction";
import {
  SearchType,
  SearchSubsDetails,
  GoMultiResult,
} from "../domain/customer/SubscriberSearchTypes";
import BottomToolbar from "../components/customer-service/BottomToolbar";
import RightIconBar from "../components/customer-service/RightIconBar";

export default function Customer360Page() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [goMulti, setGoMulti] = useState<GoMultiResult | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Disambiguation state — shown when MOBILE/EMAIL returns multiple accounts
  const [multiMatchCandidates, setMultiMatchCandidates] = useState<
    SearchSubsDetails[] | null
  >(null);
  const [multiMatchSearchValue, setMultiMatchSearchValue] = useState("");

  /**
   * Primary search handler.
   * Maps to: BindContorls() → PageMethods.GetSubscriberInfoDetails() in the legacy system.
   */
  const handleSearch = async (searchType: SearchType, searchBy: string) => {
    setLoading(true);
    setError("");
    setMultiMatchCandidates(null);
    setCustomer(null);
    setGoMulti(null);

    try {
      const params = new URLSearchParams({
        searchType,
        searchBy,
        agentId: "AGENT_001",
      });
      const res = await fetch(`/api/customer?${params}`);

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Customer not found");
      }

      const data = await res.json();

      // ── multi_match — show disambiguation modal ──────────────────────────
      // Mirrors: GetSubDetailsBySearchText() result when mobile has >1 account
      if (data.type === "multi_match") {
        setMultiMatchCandidates(data.candidates);
        setMultiMatchSearchValue(searchBy);
        return;
      }

      // ── single — load 360 view ───────────────────────────────────────────
      setCustomer(data.subscriber);
      setGoMulti(data.goMulti ?? null);
      setInteractions(data.history?.interactions ?? []);
      setServiceRequests(data.history?.serviceRequests ?? []);
    } catch (err: any) {
      setError(err.message ?? "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Called when agent picks a row in the DisambiguationModal.
   * Re-runs search by VC number (always unique) to load the full record.
   * Maps to: agent selects account → GetSubscriberInfoDetails('VC', selectedVC)
   */
  const handleDisambiguationSelect = (vcNumber: string) => {
    setMultiMatchCandidates(null);
    handleSearch("VC", vcNumber);
  };

  // Auto-load the mock record on mount for prototype presentation
  useEffect(() => {
    handleSearch("VC", "02563029393");
  }, []);

  const isCallerVerified = customer?.callerContext?.callerMobType === "RMN";

  return (
    <div className="crm-layout">
      <Sidebar />
      <main className="crm-main">
        <Header
          onSearch={handleSearch}
          isLoading={loading}
          callerVerified={isCallerVerified}
        />

        <div className="crm-content">
          {/* Error state */}
          {error && (
            <div
              style={{
                color: "#fca5a5",
                background: "#450a0a",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "16px",
                fontSize: "14px",
                border: "1px solid #991b1b",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Empty state */}
          {!customer && !loading && !error && !multiMatchCandidates && (
            <div
              style={{
                textAlign: "center",
                marginTop: "100px",
                color: "var(--text-secondary)",
              }}
            >
              <h2>Search for a subscriber to view their 360 profile</h2>
              <p style={{ fontSize: "13px", opacity: 0.6, marginTop: "8px" }}>
                Search by VC No, RMN, Mobile, SMS ID, STB No, or Email
              </p>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                Searching subscriber records…
              </div>
            </div>
          )}

          {/* 360 View */}
          {customer && !loading && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <ActionModals
                customerName={customer.name}
                vcNumber={customer.vcNumber}
                kycStatus={customer.callerContext.kycStatus || "PENDING"}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 300px",
                  gap: "20px",
                }}
              >
                <SubscriberCard customer={customer} />
                <HardwareStatus customer={customer} />
                <LastPaymentCard customer={customer} />
                <AlertsPanel alerts={customer.alerts} />
              </div>

              {/* GoMulti connections panel — visible when subscriber has linked connections */}
              {goMulti && (
                <GoMultiPanel
                  goMulti={goMulti}
                  currentVCNo={customer.vcNumber}
                />
              )}

              {/* Unified Tabs & History Timeline */}
              <div style={{ marginTop: "12px", height: "500px" }}>
                <UnifiedTabs historyData={{ interactions, serviceRequests }} vcNumber={customer.vcNumber} />
              </div>
            </div>
          )}
        </div>

        <BottomToolbar />
        <RightIconBar />
      </main>

      {/* Disambiguation Modal — portal-style overlay */}
      {multiMatchCandidates && (
        <DisambiguationModal
          candidates={multiMatchCandidates}
          searchValue={multiMatchSearchValue}
          onSelect={handleDisambiguationSelect}
          onClose={() => setMultiMatchCandidates(null)}
        />
      )}
    </div>
  );
}
