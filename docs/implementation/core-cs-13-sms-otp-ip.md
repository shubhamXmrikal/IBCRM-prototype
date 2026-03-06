# Core Customer Service — Sub-Group 13: SMS, OTP & IP Address

**Implementation Status Tracking**

This document tracks the porting of the communication infrastructure and security audit methods from the legacy `ibcrm` system into the Next.js `prototype-customer-service` project.

---

## Methods

### 1. `Send_SMS` — Multi-Vendor Send Engine
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/SendCommunication.ts` and `MockCommunicationRepository.ts`.
- **Notes**: Simulates table-driven vendor lookup and primary/secondary fallback. Emulates legacy `Send_SMS`.

### 2. `InsertOTPDetails` — OTP Lifecycle
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/ManageOTP.ts` and `OTPChallengeModal.tsx`.
- **Notes**: Handles random 6-digit generation and 2-hour expiry logic. Emulates `usp_SERVICE_GenerateOTPForGdCalls`.

### 3. `REMOTE_ADDR` — Agent IP Capture
- [x] **Implementation Status**: **DONE**.
- **Where**: `CommunicationTypes.ts` (`captureAgentIP` utility).
- **Notes**: Replicates proxy-aware IP detection (`HTTP_X_FORWARDED_FOR`). Stored in all communication logs.

### 4. `SendWhatsAppNotification` — Yellow Messenger Integration
- [x] **Implementation Status**: **DONE**.
- **Where**: `MockCommunicationRepository.logCommunication`.
- **Notes**: Simulated REST API dispatch for WhatsApp channel.

### 5. `Usp_DLRNotificationMsgLogSelect` — DLR History
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/GetCommunicationHistory.ts` and `CommunicationHistoryTab.tsx`.
- **Notes**: Chronological view of all outbound messages with status tracking (SENT/DELIVERED).

---

## Data Flow Summary

The new **Communications 💬** tab in `UnifiedTabs.tsx` provides:
1. **Audit Trail**: Full history of every message sent to the subscriber, including the specific **Agent IP** used for the transaction.
2. **Status Visibility**: Real-time status updates (emulating DLR) for SMS and WhatsApp.
3. **Security Interlock**: High-risk hardware operations (like STB Swap) are now gated behind the `OTPChallengeModal`, forcing a real-time mobile verification.
