# Core Customer Service — Sub-Group 15: Festive Offers & Campaigns

**Implementation Status Tracking**

This document tracks the porting of the promotional campaign and festive offer methods from the legacy `ibcrm` system into the Next.js `prototype-customer-service` project.

---

## Methods

### 1. `GETFmrInfo` — Recharge Projections
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/CalculateFMRBenefits.ts` and `FMRBenefitWidget.tsx`.
- **Notes**: Predicts free recharge credits for 1/3/6 months during package selection. Emulates `USP_GetSubscriberFMRValue`.

### 2. `Get_CWC2019_Details` — Campaign Milestones
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/GetCampaignEngagement.ts` and `FestiveOffersTab.tsx`.
- **Notes**: Tracks match viewing milestones and bonus points for sports engagement. Emulates `USP_CustomerService_CWC2019_Details`.

### 3. `GetEligibilityForFestivalOffer` — Smart Eligibility
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/GetFestiveOffers.ts` and `FestiveOffersTab.tsx`.
- **Notes**: Simulates the dual-resultset check for offer qualification and cashback windows. Emulates `usp_CustomerService_GetEligibilityForFestivalOffer`.

### 4. `GetAlreadyRunningFestiveOfferTODisplay` — Offer Discovery
- [x] **Implementation Status**: **DONE**.
- **Where**: `MockCampaignRepository.getFestiveOffers`.
- **Notes**: Filters available promotions based on Zone, STB Type, and Last Recharge amount.

---

## Data Flow Summary

The **Offers & Promos 🎁** tab in `UnifiedTabs.tsx` now provides a dedicated **Campaign Hub**:
1. **Live Campaigns**: Visualises engagement milestones and reward point accumulation.
2. **Cashback Banner**: High-impact notification for subscribers within a festive cashback eligibility window.
3. **Special Upgrades**: Contextual offers for annual pack swaps or STB model upgrades.
4. **FMR Integration**: Interactive projections inside the **Package Tool** wizard to drive higher-tier adoption.
