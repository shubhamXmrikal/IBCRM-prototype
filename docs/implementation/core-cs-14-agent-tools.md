# Core Customer Service — Sub-Group 14: Agent Toolbar & System Tools

**Implementation Status Tracking**

This document tracks the porting of the agent-facing system utilities and the foundational connection routing mechanism from the legacy `ibcrm` system into the Next.js `prototype-customer-service` project.

---

## Methods

### 1. `CheckUsedConnection` — IP-Based Routing
- [x] **Implementation Status**: **DONE**.
- **Where**: `AgentTypes.ts` (`determineSystemRouting` utility) and `AgentGlobalToolbar.tsx`.
- **Notes**: Automatically detects if the agent is on a specific network segment (e.g., `10.10.17.*`) and switches the routing mode to "ZT REPLICA".

### 2. `GetMessageOfTheDay` — Targeted Agent Hints
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/GetSubscriberMOTD.ts` and `MOTDBanner.tsx`.
- **Notes**: Provides real-time proactive hints (e.g., upsell offers, churn risks) specific to the loaded subscriber. Emulates `usp_CustomerService_GetInformationByVC`.

### 3. `InsertLastVCDetails` — Session Tracking
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/app/page.tsx` (`handleSearch` post-processing) and `MockAgentRepository.ts`.
- **Notes**: Silently tracks the agent's navigation history to enable the "Last Worked" feature in the toolbar. Emulates `usp_CustomerService_InsertVCNo`.

### 4. `GetLoginUserName` — Agent Identity
- [x] **Implementation Status**: **DONE**.
- **Where**: `AgentGlobalToolbar.tsx`.
- **Notes**: Surfaces the active agent's name, ID, and center directly in the persistent toolbar.

---

## Data Flow Summary

1. **Global Presence**: The `AgentGlobalToolbar` is anchored at the bottom of the screen, providing constant context on routing and session state.
2. **Contextual Awareness**: The `MOTDBanner` ensures agents are immediately aware of critical subscriber-specific info before they even speak.
3. **Implicit Audit**: Navigation events are now automatically recorded in the agent's session, mirroring the legacy system's audit requirements.
