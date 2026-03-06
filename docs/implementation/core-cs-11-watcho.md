# Core Customer Service — Sub-Group 11: Watcho / OTT

**Implementation Status Tracking**

This document tracks the porting of the Watcho streaming platform and OTT management methods from the legacy `ibcrm` system into the Next.js `prototype-customer-service` project.

---

## Methods

### 1. `GetsubscriberWatchoDetails` — Account Info
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/GetWatchoSubscriberDetails.ts` and `WatchoDashboardTab.tsx`.
- **Notes**: Returns the Watcho-specific account state, plan info, and SMSID. Emulates `usp_CustomerService_GetsubscriberWatchoDetails`.

### 2. `SubmitWatchoSubscriptionPlanRequest` — Plan Activation
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/SubmitWatchoSubscription.ts` and `OTTPlanWizard.tsx`.
- **Notes**: Handles plan selection, coupon application, and simulated WebConn write. Emulates `USP_OTT_SubmitSubscriptionPlanRequest_Omni`.

### 3. `UpdateWatchoAutoRenewalFlag` — SI Management
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/ManageWatchoAutoRenewal.ts` and `WatchoDashboardTab.tsx`.
- **Notes**: Toggles the standing instruction mandate for recurring billing. Emulates `usp_CustomerService_UpdateWatchoAutoRenewalFlag`.

### 4. `WatchoCouponRedeem` — Promotional Codes
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/infrastructure/mockData/watchoMock.ts` and `OTTPlanWizard.tsx`.
- **Notes**: Allows applying discount codes (e.g., `WATCHO50`) during the subscription flow. Emulates `usp_customerservice_WatchoCouponRedemption`.

### 5. `GetSubscriptionPlans1` — OTT Catalogue
- [x] **Implementation Status**: **DONE**.
- **Where**: `MockWatchoRepository.getPlans`.
- **Notes**: Provides the list of streaming plans with bundled apps (Disney+, Zee5, etc.).

---

## Data Flow Summary

The new **Watcho 📱** tab in `UnifiedTabs.tsx` provides:
1. **Plan Snapshot**: Clear view of active OTT plan, bundled apps, and expiry date.
2. **SI Toggle**: Visual switch for managing auto-renewal mandates.
3. **Plan Wizard**: 2-step interactive flow for browsing plans, applying coupons, and confirming subscriptions.
