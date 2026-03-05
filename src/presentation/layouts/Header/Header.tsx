"use client";

import React, { useState } from "react";
import { SearchType } from "../../../domain/customer/SubscriberSearchTypes";

interface HeaderProps {
  onSearch: (searchType: SearchType, searchBy: string) => void;
  isLoading: boolean;
  callerVerified?: boolean; // true if callerMobType === 'RMN'
}

const SEARCH_OPTIONS: { value: SearchType; label: string }[] = [
  { value: "VC", label: "VC No" },
  { value: "RMN", label: "RMN" },
  { value: "MOBILE", label: "Mobile" },
  { value: "SMSID", label: "SMS ID" },
  { value: "STB", label: "STB No" },
  { value: "EMAIL", label: "Email ID" },
];

export default function Header({
  onSearch,
  isLoading,
  callerVerified,
}: HeaderProps) {
  const [searchType, setSearchType] = useState<SearchType>("VC");
  const [searchTerm, setSearchTerm] = useState("02563029393");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchType, searchTerm.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit(e as any);
  };

  return (
    <header className="crm-header">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 600 }}>Customer Service</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "8px",
            marginLeft: "32px",
            alignItems: "center",
          }}
        >
          {/* Search type selector — maps to ddlSearchType in CustomerServiceMain.aspx */}
          <select
            className="input-field"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as SearchType)}
            style={{ width: "110px", backgroundColor: "#f8fafc" }}
            aria-label="Search type"
          >
            {SEARCH_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Search value input — maps to txtVCNo in CustomerServiceMain.aspx */}
          <input
            type="text"
            className="input-field"
            placeholder={`Search by ${searchType}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ width: "240px" }}
            aria-label="Search value"
          />

          {/* Submit — maps to the Blue Arrow image button (processVCRMN) */}
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !searchTerm.trim()}
            style={{ minWidth: "80px" }}
          >
            {isLoading ? "Searching…" : "Search"}
          </button>

          {/* Caller Verified badge — maps to CallerMobType=RMN check in legacy */}
          {callerVerified && (
            <span
              title="Caller's mobile matches the registered RMN — high trust"
              style={{
                background: "#10b981",
                color: "#fff",
                padding: "3px 10px",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ✓ Verified Caller
            </span>
          )}
        </form>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button className="btn-primary" style={{ backgroundColor: "#10b981" }}>
          Call Rec
        </button>
        <button className="btn-primary" style={{ backgroundColor: "#3b82f6" }}>
          C Desk Email
        </button>
        <button className="btn-primary" style={{ backgroundColor: "#8b5cf6" }}>
          Call VZY
        </button>
      </div>
    </header>
  );
}
