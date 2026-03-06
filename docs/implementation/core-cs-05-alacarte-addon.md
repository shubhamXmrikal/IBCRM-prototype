# Core Customer Service — Sub-Group 5: Alacarte & Addon Management

**Implementation Status Tracking**

This document tracks the porting of the specialized alacarte and addon management methods from `ibcrm` into the Next.js `prototype-customer-service` project.

---

## Methods

### 1. `GetFreeAlacarteList` — Promotional Channel History
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/GetPromotionalOffers.ts` and `src/infrastructure/mockData/alacarteMock.ts`.
- **Notes**: Displays winback, trial, and complimentary channel history. Emulates `usp_Renaissance_CustomerService_FreeAlacarteList`.

### 2. `KittyAlacarte` — Loyalty Redemption
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/GetKittyDetails.ts`, `RedeemKitty.ts`, and `KittyRedemptionPanel.tsx`.
- **Notes**: Full lifecycle for loyalty kitty balance redemption for channels. Emulates `usp_CustomerService_GetKittyAlaCartePackageList` and `InsertAlaCarteKitty`.

### 3. `SummerTicket` — Seasonal Bundles
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/GetSummerTicket.ts` and `SummerTicketBanner.tsx`.
- **Notes**: High-visibility banner for seasonal offers (e.g., IPL Summer Ticket) with lock-in period awareness. Emulates `USP_CustomerService_SummerTicket`.

### 4. `AlacarteOptOutInfo` — Remaining Days Tracking
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/domain/package/AlacarteTypes.ts` and mock data.
- **Notes**: Tracking of active vs remaining days for individual alacarte subscriptions. Emulates `usp_CustomerService_GetAlacarteOPtoutdate`.

### 5. `FestiveOffer` — Annual Pack Swaps
- [x] **Implementation Status**: **DONE** (Mocked in Repository).
- **Where**: `src/infrastructure/apiClients/MockAlacarteRepository.ts`.
- **Notes**: Support for linking base pack changes to festive promotions.

---

## Data Flow Summary

The new **Offers & Promos 🎁** tab in `UnifiedTabs.tsx` now provides a dedicated space for:
1. **Kitty Redemption**: Agents can see points balance and select channels to redeem.
2. **Promotional Offers**: A grid showing all past and present free trials and winback gifts.
3. **Summer Tickets**: Featured at the top of the **Package Tool** tab to drive seasonal upsells.
