"use client";

import React, { useState, useEffect } from "react";
import {
  PackageItem,
  SubscriberSubscription,
  RollbackHistory,
} from "../../../domain/package/PackageTypes";
import CatalogueGrid from "./CatalogueGrid";
import OptInModal from "./OptInModal";
import OptOutModal from "./OptOutModal";
import RollbackPanel from "./RollbackPanel";
import ChannelEntitlementModal from "./ChannelEntitlementModal";
import SummerTicketBanner from "./SummerTicketBanner";

interface PackageToolBoxProps {
  vcNumber: string;
  smsId: string;
}

export default function PackageToolBox({
  vcNumber,
  smsId,
}: PackageToolBoxProps) {
  const [catalogue, setCatalogue] = useState<PackageItem[]>([]);
  const [activeSubs, setActiveSubs] = useState<SubscriberSubscription[]>([]);
  const [rollbackEligible, setRollbackEligible] =
    useState<RollbackHistory | null>(null);
  const [loading, setLoading] = useState(true);

  const [optInPkg, setOptInPkg] = useState<PackageItem | null>(null);
  const [optOutSub, setOptOutSub] = useState<SubscriberSubscription | null>(
    null,
  );
  const [showChannels, setShowChannels] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/packages/catalogue?vcNumber=${vcNumber}`);
      const data = await res.json();
      if (res.ok) {
        setCatalogue(data.catalogue);
        setActiveSubs(data.active);
        setRollbackEligible(data.rollbackEligibility);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vcNumber) {
      fetchPackages();
    }
  }, [vcNumber]);

  if (!vcNumber)
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        No VC Number provided.
      </div>
    );
  if (loading)
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        Loading packages...
      </div>
    );

  return (
    <div style={{ padding: "16px", height: "100%", overflowY: "auto" }}>
      <SummerTicketBanner smsId={smsId} />

      <div style={{ display: "flex", gap: "24px" }}>
        {/* Active Packages Pane */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "8px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                color: "var(--brand-primary)",
                margin: 0,
              }}
            >
              Currently Active
            </h3>
            <button
              onClick={() => setShowChannels(true)}
              style={{
                padding: "4px 8px",
                fontSize: "11px",
                borderRadius: "4px",
                border: "1px solid #cbd5e1",
                background: "white",
                cursor: "pointer",
              }}
            >
              View Channels 📺
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              overflowY: "auto",
              flex: 1,
            }}
          >
            {activeSubs.length === 0 ? (
              <p>No active packages.</p>
            ) : (
              activeSubs.map((sub) => {
                // Include active packages in the lookup even if they are not in the catalogue anymore
                const pkgDetails = [
                  ...catalogue,
                  { id: sub.packageId, name: sub.packageId } as PackageItem,
                ].find((p) => p.id === sub.packageId);
                return (
                  <div
                    key={sub.id}
                    className="card"
                    style={{
                      padding: "12px",
                      marginBottom: 0,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600 }}>
                        {pkgDetails?.name || sub.packageId}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Status:{" "}
                        <span
                          style={{
                            color:
                              sub.status === "ACTIVE" ? "#10b981" : "#f59e0b",
                          }}
                        >
                          {sub.status}
                        </span>
                      </div>
                      {sub.scheduledOptOutDate && (
                        <div style={{ fontSize: "11px", color: "#ef4444" }}>
                          Ends:{" "}
                          {new Date(
                            sub.scheduledOptOutDate,
                          ).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <button
                      className="btn-primary"
                      style={{
                        backgroundColor: "#ef4444",
                        padding: "4px 8px",
                        fontSize: "12px",
                      }}
                      onClick={() => setOptOutSub(sub)}
                      disabled={sub.status === "PENDING_DEACTIVATION"}
                    >
                      Opt Out
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {rollbackEligible && (
            <RollbackPanel
              vcNumber={vcNumber}
              rollbackEligible={rollbackEligible}
              onRollbackSuccess={fetchPackages}
            />
          )}
        </div>

        {/* Catalogue Pane */}
        <div style={{ flex: 1.5, display: "flex", flexDirection: "column" }}>
          <h3
            style={{
              fontSize: "16px",
              color: "var(--text-primary)",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "8px",
              marginBottom: "16px",
            }}
          >
            Package Catalogue
          </h3>
          <CatalogueGrid
            catalogue={catalogue}
            onOptIn={(pkg) => setOptInPkg(pkg)}
          />
        </div>

        {optInPkg && (
          <OptInModal
            pkg={optInPkg}
            vcNumber={vcNumber}
            smsId={smsId}
            onClose={() => setOptInPkg(null)}
            onSuccess={() => {
              setOptInPkg(null);
              fetchPackages();
            }}
          />
        )}

        {optOutSub && (
          <OptOutModal
            sub={optOutSub}
            onClose={() => setOptOutSub(null)}
            onSuccess={() => {
              setOptOutSub(null);
              fetchPackages();
            }}
          />
        )}

        {showChannels && (
          <ChannelEntitlementModal onClose={() => setShowChannels(false)} />
        )}
      </div>
    </div>
  );
}
