# Modernization & Redesign Vision: DISHCRM 2.0

This document outlines the architectural shift from a tab-heavy, manual data display tool to an **AI-first, high-density Agent Co-pilot**.

## 1. The 3-Panel Architecture (The Canvas)

We are moving away from the `UnifiedTabs.tsx` model (13+ tabs) to a persistent, 3-panel layout designed for maximum information density and zero-latency context.

### LEFT PANEL: Navigation (Slim & Persistent)
- **Role**: Vertical icon-only navigation for core modules.
- **Key Modules**: Customer 360, Service Calls, CC Add-ons, Reports.
- **Visuals**: 64px width, dark-neutral background, subtle active-state glow.

### CENTER PANEL: Customer 360 Canvas (The "Source of Truth")
- **Subscriber Identity**: Compact header with status badges (ACTIVE/DEACTIVE).
- **Priority Alert Banner**: A stackable, severity-coded notification system (e.g., Churn Risk, Payment Due).
- **Unified Timeline**: A single, scrollable chronological feed replacing all history tabs.
  - **Filters**: `[All]` `[Calls]` `[Payments]` `[Tickets]` `[Packages]` `[OTT]` `[Hardware]`.
- **Active Service Cards**: Dense grid of "Living" cards (DTH, Watcho, GoMulti) showing real-time status.

### RIGHT PANEL: AI Co-pilot (The "Brain")
- **DISHTV Brain**: Persistent RAG-based chat interface.
- **Context Seeding**: Auto-injects customer metadata (VC No, Package) before the agent types.
- **Next Best Action (NBA)**: Ranked cards for one-click upsells or retention offers.
- **Sentiment Meter**: Real-time visual gradient of the current call's emotional state.

---

## 2. Global Intelligence Layer

### ⌘K Command Palette
- **Trigger**: `Ctrl+K` or `Cmd+K`.
- **Functionality**: Natural language search and action execution.
- **Example Queries**: "last 3 recharges", "raise tech call", "switch off date".
- **Library**: `cmdk`.

### Real-time Alerts & Context
- **SSE/WebSockets**: For pushing live updates to the Alert Banner.
- **Smart Prefetch**: Triggering data fetches on phone number keystroke, not search click.

---

## 3. Design System & Tech Stack

### Aesthetics
- **Style**: "Vercel Dashboard meets Bloomberg Terminal."
- **Typography**: Geist/Inter (9px - 13px range).
- **Color Palette**: Dark-mode primary, high-contrast semantic colors (Emerald, Amber, Crimson, Cyan).
- **Effects**: Glassmorphism (backdrop-blur) and subtle border glows.

### Stack
- **Framework**: Next.js 14+ (App Router).
- **Styling**: Tailwind CSS (Strictly replacing inline styles).
- **State**: Zustand (Global Agent/Call state) + TanStack Query (Server state).
- **Components**: Radix UI + shadcn/ui.
- **AI**: Vercel AI SDK + OpenAI/Claude via RAG.

---

## 4. Implementation Mapping

| Target Section | Legacy/Current Component | Status |
| :--- | :--- | :--- |
| Slim Sidebar | `Sidebar.tsx` | REFACTOR (Icon-only) |
| Top Header | `Header.tsx` | REFACTOR (HUD + Command Palette) |
| Identity Card | `SubscriberCard.tsx` | REDESIGN (High Density) |
| Unified Timeline | `UnifiedTabs.tsx` + `HistoryTimeline.tsx` | MERGE & FLATTEN |
| Service Cards | `HardwareStatus.tsx` + `GoMultiPanel.tsx` | COMPRESS |
| AI Panel | NEW (`DishtvBrain.tsx`) | NEW |
| Bottom Bar | `BottomToolbar.tsx` | REFACTOR (Quick Actions) |
