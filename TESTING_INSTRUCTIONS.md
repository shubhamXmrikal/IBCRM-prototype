# Testing the Prototype Customer Service Application

This document provides instructions on how to test the implemented features in the prototype application. The application uses mock data, so you need to use specific inputs to trigger various scenarios.

## 1. Starting the Application

Ensure you are in the `prototype-customer-service` directory.

Install dependencies (if not already done):

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

---

## 2. Testing Subscriber Search (Module 01)

The header contains a search bar. Use the dropdown to select the search type and the input field for the value.

### Scenario A: Single Match (Active Customer)

- **Search Type:** `VC`
- **Search Value:** `09100000001`
- **Expected Result:** Loads the 360 profile for "RAHUL SHARMA". Notice the "ACTIVE" status badge and that the caller is marked as "Verified Caller" (RMN matched).

### Scenario B: Single Match (Deactive Customer)

- **Search Type:** `VC`
- **Search Value:** `02563029393`
- **Expected Result:** Loads the 360 profile for "JAFFER RESHT". Notice the "DEACTIVE" status.

### Scenario C: Single Match (Suspended VIP Customer)

- **Search Type:** `STB`
- **Search Value:** `STB9876PRIYA0001`
- **Expected Result:** Loads the 360 profile for "PRIYA MENON". Notice the "SUSPENDED" status and the specific VIP alert in the Alerts & Messages panel.

### Scenario D: Multi-Match Disambiguation

- **Search Type:** `Mobile`
- **Search Value:** `9999900000`
- **Expected Result:** A modal pops up showing that this mobile number is linked to two accounts (Jaffer Resht and Rahul Sharma). Clicking one will load that specific profile.

### Scenario E: GoMulti Parent/Child Tree

- **Search Type:** `SMSID`
- **Search Value:** `41200100` (Rahul Sharma)
- **Expected Result:** Below the top cards, a "GoMulti Connections" panel appears, showing Rahul as the parent and two child connections (Sita Sharma, Rohit Sharma).

---

## 3. Testing Customer Verification & Identity (Module 02)

Search for **Rahul Sharma** (`VC: 09100000001`). Rahul currently has a `PENDING` KYC status.

### Scenario A: Failed Verification leading to WOB Lock

1. Click the **"Temp Deactivation"** button or **"Recharge Account"** button.
2. The KYC Verification Modal will pop up.
3. Enter incorrect details:
   - **PIN Code:** `000000`
   - **Last Recharge:** `100`
4. Click **Verify Caller**.
5. **Expected Result:** The system will alert you that the account is now **WOB Locked** (due to exceeding the mock limit of failed attempts). The buttons will turn gray and show a 🔒 icon. You can no longer perform sensitive actions.

### Scenario B: Successful Verification

1. Refresh the page to reset the mock state.
2. Search for **Rahul Sharma** (`VC: 09100000001`) again.
3. Click **"Temp Deactivation"**.
4. Enter the correct details:
   - **PIN Code:** `110017`
   - **Last Recharge:** `350`
5. Click **Verify Caller**.
6. **Expected Result:** The modal closes, and the "Schedule Temp Deactivation" modal opens automatically.

### Scenario C: Modernized Temp Deactivation

This module is located in the **Bottom Toolbar** and features real-time duration calculations and a mandatory verification checklist.

1. **Locate Trigger**: At the bottom of the screen, click the **"PKG/CNX/PMT"** dropdown and select **"Temp Deactivation"**.
2. **Verify Eligibility**:
   - Search for **Rahul Sharma** (`VC: 09100000001`). Open the tool. The form should be active.
   - Search for a mock subscriber with **TOC: 10025** (Pick by Channel) or **10026** (Airport). 
   - **Expected Result**: The modal displays a red "Ineligible" alert and hides the form.
3. **Real-time Calculation**:
   - Enter `15` in the **Number of Days** field.
   - Change the **Deactivation From** date.
   - **Expected Result**: The "Deactivation To" and "Reactivation Date" (To + 1) update automatically in real-time.
4. **Validation Logic**:
   - Enter `2` in the Number of Days.
   - **Expected Result**: The Submit button remains disabled, and the input field enforces the HTML5 `min="5"` attribute.
5. **Mandatory Checklist**:
   - Fill in valid dates (e.g., 15 days).
   - Try to click **Submit Request** without checking the boxes.
   - **Expected Result**: The button is disabled (`#cbd5e1` gray).
   - Check all three boxes in the **Mandatory Checklist** section.
   - **Expected Result**: The button turns orange (`#f97316`) and becomes clickable.
6. **Submission**:
   - Click **Submit Request**.
   - **Expected Result**: A success alert displays the summary of the request including the calculated reactivation date.

### Scenario D: Updating Contact Details

1. Click on the Email or Mobile field in the "Subscriber Detail" card (Note: inline editing UI might require manual triggering in this prototype, but you can see the logic).
2. The backend enforces uniqueness. If you try to update Jaffer's email to `rahul.sharma@gmail.com` via the API, it will fail.

---

## 4. Testing Package & Channel Management (Module 03)

Search for **Rahul Sharma** (`VC: 09100000001`) and select the **"Package Tool"** tab in the middle of the screen.

### Scenario A: Viewing Active vs Catalogue

- **Expected Result:** On the left, you see Rahul's active packages (`HD Family Pack`, `Star Sports Add-on`). On the right, the catalogue displays available packages _excluding_ the ones he already has.

### Scenario B: Opting In (Verbal Consent Rule)

1. In the Catalogue pane, find the **"7 HD Channels Free"** or **"Cricket Live VAS"** package.
2. Click **"Add Pack"**.
3. **Expected Result:** A modal appears. The "Confirm" button is disabled. You must check the box stating "I have verbal consent from the customer to activate this paid service."
4. Check the box and click Confirm.
5. **Expected Result:** The package moves to the "Currently Active" list.

### Scenario C: Advance Package Request (Future Scheduling)

1. In the Catalogue pane, click **"Add Pack"** on **"English Movies A-la-carte"**.
2. In the "Schedule Activation" date picker, select a date next week.
3. Click Confirm.
4. **Expected Result:** The package appears in the "Currently Active" list with a status of `PENDING_ACTIVATION` instead of `ACTIVE`.

### Scenario D: Opting Out

1. In the "Currently Active" pane, find the **"Star Sports Add-on"**.
2. Click **"Opt Out"**.
3. Click Confirm.
4. **Expected Result:** The status changes to `PENDING_DEACTIVATION` (simulating that it will drop off at the end of the billing cycle).

### Scenario E: Package Rollback

1. Under the "Currently Active" list, you should see a green panel indicating **"Package Rollback Available"**. This is because Rahul recently changed packages.
2. Enter a reason in the input field (e.g., "Customer misheard the price").
3. Click **"Revert Package"**.
4. **Expected Result:** The `HD Family Pack` is removed, the old `South Sports Basic SD` is added back to the active list, and the Rollback panel disappears (limit of 1 rollback per cycle enforced).

---

## 5. Testing Call Handling & Interaction History (Module 04)

Search for **Rahul Sharma** (`VC: 09100000001`) and navigate to the **"Interaction History"** and **"Call Handling"** tabs.

### Scenario A: Navigating the Call Tree

1. Select the **"Call Handling"** tab.
2. Open the **Level 1** dropdown. You will see categories like `Complaint`, `Request`, `Inquiry`, and `Call Drop`.
3. Select **"Complaint"**.
4. Notice that **Level 2** now contains sub-categories related to complaints. Select **"Signal Problem"**.
5. Continue selecting through **Level 3** and **Level 4** until you reach a leaf node.

### Scenario B: Leaf Node Validation

1. Select only **Level 1** and **Level 2**.
2. Click **"Complete & Close Call"**.
3. **Expected Result:** An error message "Please select a valid final reason (leaf node)" appears. The system prevents tagging a call with a generic parent category.

### Scenario C: Module 11 Call Drop Trigger

1. In the **Level 1** dropdown, select **"Call Drop"**.
2. Follow the path: `Call Drop` -> `Insufficient Balance` -> `Post Recharge` -> `E16_4_Insufficient...`.
3. Enter any remarks (e.g., "Line disconnected during recharge check").
4. Click **"Complete & Close Call"**.
5. **Expected Result:** Instead of the standard success alert, a green message box appears: _"Call drop detected. A callback has been automatically scheduled via Module 11."_ This confirms the legacy business logic for "Drop" labels is active.

### Scenario D: Unified Interaction History (Inbound + Outbound)

1. Select the **"Interaction History"** tab.
2. Observe the timeline. You will see standard **"INBOUND"** interactions (Blue badge).
3. Look for the entry titled **"Retention Campaign - Q1"** with a **"OUTBOUND"** (Purple badge).
4. **Expected Result:** Outbound campaigns are styled with a light purple background to distinguish them from regular inbound calls. This provides a 360-degree view of all touchpoints.

### Scenario E: Search & Filter Timeline

1. Use the search bar in the Interaction History tab to type `Signal`.
2. **Expected Result:** The timeline filters to show only the interactions where "Signal" is mentioned in the category or remarks.
3. Use the "All Types" dropdown to select **"Campaign Calls"**.
4. **Expected Result:** Only the purple Outbound entries remain visible.

---

## 6. Testing Contact & Mobile Details (Module 05)

Search for **Rahul Sharma** (`VC: 09100000001`) or **Priya Menon** (`STB: STB9876PRIYA0001`).

### Scenario A: Extended Contact Profile (Subscriber Card)

1. Observe the **"Subscriber Detail"** card on the left.
2. **Expected Result:**
   - 📞 (Call) and ✉️ (Email) action icons are visible next to the RMN and Email.
   - For Rahul: **Facebook**, **Twitter**, and **LinkedIn** handles are displayed with their respective icons.
   - For Priya: **Twitter** and **Office Phone** are displayed.
   - For Jaffer: No social handles are shown (correctly reflecting his empty mock data).

### Scenario B: Managing Alternate Mobiles (New Tab)

1. Select the **"Contact Details 🆕"** tab in the middle of the screen.
2. **Expected Result:** A table appears showing all registered alternate numbers for the subscriber.
3. For Rahul, you should see:
   - `9999900001` (Relationship: SELF, Source: WEB)
   - `9999900002` (Relationship: SPOUSE, Source: IVR)

### Scenario C: Adding an Alternate Mobile

1. In the **"Contact Details 🆕"** tab, click the **"+ Add Mobile"** button.
2. Enter a 10-digit number (e.g., `9876543210`).
3. Select a Relationship (e.g., `FRIEND`) from the dropdown.
4. Click **"Save"**.
5. **Expected Result:**
   - The new number is added to the table with a `SUCCESS` status.
   - Check the **terminal/console** where the server is running. You should see a log: `[MockContactRepository] SMS dispatched for 9876543210 (Flag=13)`. This confirms the legacy SMS notification side-effect is triggered.

### Scenario D: Social Media Integration

1. In the **"Subscriber Detail"** card, click on a social media handle (e.g., Rahul's LinkedIn).
2. **Expected Result:** In this prototype, handles are displayed as high-visibility labels to ensure agents have 360-degree contact context for retention and collection calls.

---

## 7. Testing Package & Channel Display (Module 06)

Search for **Rahul Sharma** (`VC: 09100000001`).

### Scenario A: Statement of Account (SOA)

1. Select the **"Billing & SOA"** tab.
2. **Expected Result:**
   - A summary card shows: **Balance (₹142.50)**, **Monthly Recharge (₹350.00)**, and **Switch-Off Date**.
   - A **"Resend Latest Invoice ✉️"** button is visible. Clicking it triggers a success alert (simulating the `WebConn` email trigger).
   - A transaction table lists recent activities (Recharges and Monthly Renewals) with color-coded Debit/Credit amounts.
3. Use the **dropdown** above the table to switch between "Current (Detailed)" and "FY 2024-25" views.

### Scenario B: Service Hierarchy & Escalation Matrix

1. Select the **"Service & Hardware"** tab.
2. Observe the **"Assigned Service Chain (Hierarchy)"** section at the top.
3. **Expected Result:**
   - A visual tree shows the assigned **DCC (Delhi Electronics Hub)** with full contact info and address.
   - Below it, the **Escalation Matrix** displays the names and phone numbers for the **ASE**, **CSM**, and **Operations Manager**.
   - This emulates the legacy `usp_CustomerService_EsclationMatrixSVC` logic.

### Scenario C: Entitled Channel Search

1. Select the **"Package Tool"** tab.
2. Next to the "Currently Active" header, click the **"View Channels 📺"** button.
3. **Expected Result:** A modal opens listing all channels the subscriber is entitled to based on their pack.
4. In the search bar, type `Sports`.
5. **Expected Result:** The list filters to show only sports channels (e.g., Star Sports 1 HD).
6. Look for **HBO** in the list. Notice the orange label: **"Requires 3-Satellite"**. This confirms the technical constraint flags from `GetAllConaxChannelList` are being surfaced.

---

## 8. Testing Alacarte & Addon Management (Module 07)

### Scenario A: Summer Ticket (Seasonal Upsell)

1. Search for **Rahul Sharma** (`VC: 09100000001`).
2. Navigate to the **"Package Tool"** tab.
3. **Expected Result:** A bright orange banner appears at the top: **"IPL 2026 Summer Ticket Available!"**.
4. Click **"Opt In Now"**. In this prototype, it triggers a processing alert, emulating the seasonal bundle opt-in flow.

### Scenario B: Kitty Alacarte (Loyalty Redemption)

1. Navigate to the **"Offers & Promos 🎁"** tab.
2. **Expected Result:** The **"Kitty Alacarte (Loyalty)"** panel is visible at the top.
3. Observe Rahul's balance: **500 pts**.
4. Select one or more channels (e.g., Zee Cinema).
5. Notice the "Points Required" calculation updates dynamically.
6. Click **"Redeem Now"**.
7. **Expected Result:** A success message appears with a **Form No**, confirming the loyalty redemption transaction.

### Scenario C: Promotional & Trial History

1. In the same **"Offers & Promos 🎁"** tab, scroll to the **"Active Promotions & Trials"** grid.
2. For Rahul, you should see **"Sony Pix Free Trial"** marked as **ACTIVE**.
3. Search for **Jaffer Resht** (`VC: 02563029393`).
4. Navigate to the **"Offers & Promos 🎁"** tab.
5. **Expected Result:** You see **"HBO Winback 30 Days"** marked as **EXPIRED** with a red stamp, providing agents with historical context on previous winback attempts.

---

## 9. Testing Complaint & Service Request Logging (Module 08)

### Scenario A: Logging a Standard CRM Complaint

1. Search for **Rahul Sharma** (`VC: 09100000001`).
2. Navigate to the **"Call Handling"** tab.
3. Uncheck the **"Issue Resolved"** box.
4. **Expected Result:** a purple **"Log Complaint 🎫"** button appears.
5. Click the button. A modal titled **"Log New Complaint"** opens.
6. Select **"Billing Dispute"** as the category.
7. Enter remarks: "Customer disputing last month GST calculation."
8. Click **"Log Complaint"**.
9. **Expected Result:** A success message with a Ticket ID (e.g., `TKT123456`) appears.

### Scenario B: Technical Service Request (Multi-Step)

1. In the same **"Log New Complaint"** modal, select **"No Signal"** as the category.
2. **Expected Result:** The primary action button changes to **"Next: Appointment →"**.
3. Click the button to move to **Step 2**.
4. Enter an STB Number and select a preferred date and time slot (e.g., 09:00 AM - 12:00 PM).
5. Click **"Create Service Request"**.
6. **Expected Result:** A Service Request ticket is created, emulating the `InsertServiceComplaintDetails` workflow.

### Scenario C: Duplicate Complaint Validation

1. Try to log another 2 complaints for **Rahul Sharma** immediately after Scenario A and B.
2. On the 3rd attempt, click **"Log Complaint 🎫"**.
3. **Expected Result:** A validation error screen appears: **"Duplicate Check: This subscriber already has 2 active complaints logged in the last 3 days."** This verifies the porting of the legacy duplicate prevention logic.

### Scenario D: Ticket History Audit

1. Navigate to the **"Tickets & Service 🎫"** tab.
2. **Expected Result:**
   - A list showing all historical and recent tickets.
   - For Jaffer Resht, you will see a high-priority STB replacement request with an **"Agony Count"** tracking its repeat nature.
   - Tickets are color-coded by status (e.g., BLUE for OPEN, GREEN for RESOLVED).

---

## 10. Testing Payment, Grace & Waiver (Module 09)

### Scenario A: Outstanding Balance Alert

1. Search for **Rahul Sharma** (`VC: 09100000001`).
2. Navigate to the **"Billing & SOA"** tab.
3. **Expected Result:** A red alert box appears at the top: **"Outstanding Balance Detected"**. It shows a **₹250.00 Service Call OS**, emulating the `GetSR_OS_Balance` logic.

### Scenario B: Waiver Request & Quota Enforcement

1. In the **"Billing & SOA"** tab, click the purple **"Request Waiver 💸"** button.
2. Select a reason (e.g., `Goodwill Waiver`), enter an amount (e.g., `50`), and remarks.
3. Click **"Submit for Approval"**.
4. **Expected Result:** A success message appears.
5. **Repeat**: Try requesting 2 more waivers for Rahul.
6. **Expected Result:** On the 3rd attempt, the system blocks the request with: **"Exhausted Count: Maximum 2 waivers allowed..."**. This verifies the porting of the legacy waiver quota business rule.

### Scenario C: Payment & Receipt History

1. In the same **"Billing & SOA"** tab, scroll down to the **"Recharge & Payment Receipts"** section.
2. **Expected Result:** You see a list of physical and online payments. 
3. Verify the **"CHEQUE"** entry for **₹350.00** from **HDFC Bank** marked as **REALIZED**. This emulates the `usp_CustomerService_PaymentDetailsReciept` lookup.

### Scenario D: Grace Charge Check (Side-effect)

1. Perform a mock recharge for a long-inactive subscriber (e.g., search for a deactive user).
2. **Expected Result:** The system triggers an internal `checkGraceCharge` call. Check the terminal/console for logs: `[MockFinancialRepository] Grace charge info: applies=true`. In a real scenario, this would inform the agent to collect the processing fee.

---

## 11. Testing Recharge & Migration (Module 10)

### Scenario A: Multi-Step Recharge Workflow

1. Search for **Rahul Sharma** (`VC: 09100000001`).
2. In the **Sidebar** (left navigation), click **"⚡ Recharge Account"**.
3. **Step 1 (Validate)**: Observe the system running the "CheckVCSTB" checks. For Rahul, **Amnesty Eligibility** should be "✅ YES".
4. Click **"Proceed to Due Amount →"**.
5. **Step 2 (Due Amount)**: View the calculated amount payable.
6. Click **"Process Simulated Payment"**.
7. **Expected Result:** A success screen confirms the recharge is complete.

### Scenario B: Churn Prevention Alert

1. Search for **Priya Menon** (`STB: STB9876PRIYA0001`).
2. **Expected Result:** A red alert banner appears at the very top of her profile: **"Critical: Account at Risk of Churn"**.
3. It should show **"Only 10 days remaining"**, emulating the churn timer logic from `usp_CustomerService_GetChurnRemainingDays`.

### Scenario C: Postpaid Migration Lead

1. Navigate to the **"Migration 🔄"** tab.
2. Fill out the **"Prepaid to Postpaid Conversion"** form.
3. Select **"DishFlix Hybrid"** as the product variant.
4. Click **"Submit Conversion Lead 🚀"**.
5. **Expected Result:** A success alert appears with a Lead ID (e.g., `LD123456`), verifying the `InsertLeadforProspectivePrepaidCustomer` workflow.

---

## 12. Testing Movies & PPV (Module 11)

### Scenario A: Movie Kitty Balance

1. Search for **Rahul Sharma** (`VC: 09100000001`).
2. Navigate to the **"Movies & PPV 🎬"** tab.
3. **Expected Result:** A dark banner at the top shows: **"Movie Kitty Balance: 3 free movies remaining"**. This emulates the `ModFreeKitty` loyalty lookup.

### Scenario B: Ordering a Movie (Validation & Payment)

1. In the **"Browse Catalogue"** grid, find a movie (e.g., "Avatar: The Way of Water").
2. Click **"Order Now"**.
3. **Expected Result:** A confirmation modal opens. Notice the warning: **"Requires 3-Satellite alignment"** for Avatar.
4. Select **"Movie Kitty"** as the payment mode.
5. Click **"Confirm & Authorize Signal"**.
6. **Expected Result:** The order is processed, and the movie appears in the **"Current Authorizations"** list on the right.

### Scenario C: Duplicate Order Guard

1. Try to order the **same movie** ("Avatar") again for Rahul.
2. **Expected Result:** The system blocks the request with an error: **"CheckRequestIsAlreadySubmited: This movie is already authorized..."**. This verifies the porting of the legacy duplicate guard.

### Scenario D: Resending Signal (CONAX Push)

1. In the **"Current Authorizations"** list, find an active movie (e.g., "Pathaan").
2. Click **"Resend Signal 📡"**.
3. **Expected Result:** A success alert confirms the signal has been re-sent, emulating the `InsertResendMODRequest` (CONAX) push.

---

## 13. Testing Hardware & STB (Module 12)

### Scenario A: Hardware State & Pairing

1. Search for **Rahul Sharma** (`VC: 09100000001`).
2. Navigate to the **"Hardware History"** tab (this tab ID is `service` in the code).
3. **Expected Result:**
   - A card titled **"Active Set-Top Box"** appears.
   - It shows serial **2101XYZ45PQ19001**, status **IN WARRANTY**, and chip side **Top**.
   - The **"Assigned Service Chain"** (from Module 06) is also visible at the top.

### Scenario B: Orchestrated STB Swap

1. In the **"Hardware History"** tab, click **"🔄 STB Swap / Repair"**.
2. **Step 1 (Validate)**: Enter a valid replacement serial: `NEW_STB_001`. Click **"Validate Serial →"**.
3. **Step 2 (Compatibility)**: 
   - Notice the green box: **"New STB Verified: HD-S3 (HD)"**.
   - Enter a Ticket ID (e.g., `TKT123456`).
   - Select an **Adapter Brand** (e.g., `Samsung`).
   - Check **"Adapter Returned"** and **"Remote Returned"**.
   - Click **"Confirm & Swap STB"**.
4. **Expected Result:**
   - Success alert appears.
   - The **"Active Set-Top Box"** card refreshes to show the new serial (`NEW_STB_001`).
   - A new entry appears in the **"Hardware Lifecycle History"** list on the right.

### Scenario C: Inventory Validation (Error Path)

1. Re-open the **"STB Swap Wizard"**.
2. Enter an invalid serial number: `INVALID_999`.
3. Click **"Validate Serial →"**.
4. **Expected Result:** Error message appears: **"Invalid Serial Number: STB not found..."**. This verifies the master inventory gate check.

---

## 14. Testing Watcho / OTT (Module 13)

### Scenario A: Active Subscription & Bundled Apps

1. Search for **Rahul Sharma** (`VC: 09100000001`).
2. Navigate to the **"Watcho 📱"** tab.
3. **Expected Result:**
   - Shows **Watcho Super** as the active plan.
   - Lists bundled apps like **Disney+ Hotstar**, **Zee5**, etc.
   - Expiry date is shown as **10/04/2026**.

### Scenario B: Auto-Renewal (SI) Toggle

1. In the **"Watcho 📱"** tab, observe the **"Standing Instruction"** toggle. For Rahul, it should be **Active (Green)**.
2. Click the toggle to disable it.
3. **Expected Result:** The status changes to **Inactive (Gray)** and the helper text updates to **"Manual renewal required."**, emulating the `UpdateWatchoAutoRenewalFlag` logic.

### Scenario C: Plan Wizard & Coupon Redemption

1. Search for **Priya Menon** (`VC: 07800009999`).
2. Navigate to the **"Watcho 📱"** tab.
3. **Expected Result:** Shows **"No active Watcho subscription found."**.
4. Click **"Explore Plans 🚀"**.
5. **Step 1 (Select Plan)**: Choose **"Watcho Flexi"** (₹99) and click **"Continue to Review →"**.
6. **Step 2 (Review)**: 
   - Enter coupon code: `WATCHO50`. Click **"Apply"**.
   - **Expected Result:** Alert shows "Coupon applied" and the **Total Payable** updates to **₹49**.
7. Click **"Confirm Subscription"**.
8. **Expected Result:** success message appears with a Watcho Form No (e.g., `W_UP_992211`).

---

## 15. Testing DishVIP & Loyalty (Module 14)

### Scenario A: DishVIP Status & Benefits

1. Search for **Priya Menon** (`VC: 07800009999`).
2. **Expected Result:** A gold badge stating **"🌟 DishVIP Member"** is visible in the top-right of the Subscriber Detail card.
3. Click the badge.
4. **Expected Result:** A modal opens showing her enrollment date and a list of premium benefits (Priority Support, Free STB Swap, etc.).

### Scenario B: VIP Enrollment (Eligible Prospect)

1. Search for **Rahul Sharma** (`VC: 09100000001`).
2. **Expected Result:** A gray badge stating **"⚙️ Check VIP Eligibility"** appears.
3. Click the badge.
4. **Expected Result:** The modal shows **"✅ Subscriber is Eligible!"** along with the reason.
5. Click **"Enroll in DishVIP Now 🚀"**.
6. **Expected Result:** Success alert appears, and the badge turns gold (🌟 DishVIP Member).

---

## 16. Testing SMS, OTP & IP Address (Module 15)

### Scenario A: Communication History & IP Audit

1. Search for **Rahul Sharma** (`VC: 09100000001`).
2. Navigate to the **"Communications 💬"** tab.
3. **Expected Result:** 
   - A list of historical SMS and WhatsApp messages appears.
   - For each message, observe the **Agent IP** column (e.g., `172.16.0.45`). This verifies the porting of the legacy `REMOTE_ADDR` capture requirement.
   - Statuses like **DELIVERED** (Green) or **SENT** (Blue) are visible.

### Scenario B: Security OTP Challenge (STB Swap Gate)

1. Navigate to the **"Hardware History"** tab (ID: `service`).
2. Click **"🔄 STB Swap / Repair"**.
3. **Expected Result:** Instead of the swap wizard opening immediately, a **"Security Verification"** modal appears.
4. Click **"Send OTP 📲"**.
5. **Expected Result:** A debug alert shows the generated 6-digit code (e.g., `[DEBUG] OTP Sent: 123456`).
6. Enter the code and click **"Verify Code →"**.
7. **Expected Result:** The modal closes, and the **STB Swap Wizard** opens. This emulates the high-security gating for hardware operations.

### Scenario C: OTP Expiry & Validation

1. Re-trigger the **"STB Swap / Repair"** flow.
2. Send a new OTP.
3. Enter an **incorrect code** (e.g., `000000`).
4. **Expected Result:** Error message appears: **"Invalid or expired OTP code."**.
5. Click **"Didn't receive code? Resend"** to restart the flow, emulating the `ManageOTPUseCase` logic.

### Scenario C: Unified Loyalty Dashboard

1. Stay on **Rahul Sharma**'s profile.
2. Select the **"360 Overview"** tab.
3. **Expected Result:** A card titled **"Unified Loyalty Rewards"** appears.
4. It should show:
   - **DTH Points**: 1250
   - **Movie Credits**: 3
   - **DishFlix Amt**: ₹0
5. Below the balances, verify the **"Recent Activity"** log shows earned/spent points (e.g., "+100 pts on Recharge").

---

## 17. Testing Agent Toolbar & System Tools (Module 16)

### Scenario A: Persistent Agent Toolbar

1. Observe the very bottom of the browser window.
2. **Expected Result:** A dark gray bar (Agent Toolbar) is visible.
3. It should show:
   - **Active Agent**: Aman S. (AGENT_001)
   - **Routing Mode**: **ZT REPLICA (Active)** — this is dynamically determined based on the mock IP `10.10.17.42`.
   - **Captured IP**: The simulated IP of your machine.

### Scenario B: Message of the Day (MOTD)

1. Search for **Rahul Sharma** (`VC: 09100000001`).
2. **Expected Result:** A yellow banner appears above his profile: **"Subscriber pack expires in 3 days..."**.
3. Search for **Priya Menon** (`VC: 07800009999`).
4. **Expected Result:** The banner updates to show: **"VIP Subscriber. Ensure priority handling."**. This emulates the `usp_CustomerService_GetInformationByVC` proactive info logic.

### Scenario C: Last Worked VC Tracking

1. Search for **Jaffer Resht** (`VC: 02563029393`).
2. Now, search for **Rahul Sharma**.
3. Observe the **right side** of the bottom Agent Toolbar.
4. **Expected Result:** It should show **"Last Worked: 02563029393"**. The system automatically tracked your previous search, emulating the legacy `usp_CustomerService_InsertVCNo` tracking.

---

## 18. Testing Festive Offers & Campaigns (Module 17)

### Scenario A: Campaign Hub & Milestones

1. Search for **Rahul Sharma** (`VC: 09100000001`).
2. Navigate to the **"Offers & Promos 🎁"** tab.
3. **Expected Result:** 
   - A **"Live Campaigns"** section appears at the top.
   - For Rahul, notice the **"Cricket World Cup 2026"** entry with 250 bonus points and checked milestones (e.g., "Watched 5 Matches").
   - A red **"Festive Cashback Eligible!"** banner is visible showing **₹150** credit.

### Scenario B: FMR Projections (Upsell Aid)

1. Navigate to the **"Package Tool"** tab.
2. In the **Package Catalogue** (right side), click **"Add Pack"** on any available package (e.g., "7 HD Channels Free" or "Cricket Live VAS").
3. **Expected Result:** The **"Activate Package"** modal opens.
4. Inside the modal, look for the green **"FMR Benefits"** card.
5. **Expected Result:** It should show exact credit projections (e.g., "1 Month: ₹50", "6 Months: ₹350"). This emulates the legacy `USP_GetSubscriberFMRValue` calculation to help agents close the sale.

### Scenario C: Festive Upgrade Discovery

1. Go back to the **"Offers & Promos 🎁"** tab.
2. Scroll to **"Festive Special Upgrades"**.
3. **Expected Result:** You see cards like **"Diwali Dhamaka HD"** with an **"Apply Offer"** button. This verifies the zone-and-STB filtering logic from `USP_GetFestiveOfferAccordingToSMSID`.

### Scenario D: Ineligible Prospect

1. Search for **Jaffer Resht** (`VC: 02563029393`).
2. Click the VIP Eligibility badge.
3. **Expected Result:** The modal shows **"❌ Not Eligible for VIP"** with the reason: "Monthly FMR below threshold...". The enrollment button is hidden.

---

## 19. Testing Agent Workspace Utilities (Right Icon Bar)

The right side of the screen contains a vertical bar with quick-access icons for agent-specific utilities.

### Scenario A: Agent Presence & Face Matching (Camera)

1. Locate the **Right Icon Bar** (persistent vertical bar on the far right).
2. Hover over the **Camera / CCTV icon** (2nd icon from the top).
3. **Expected Result:** 
   - A slide-out panel titled **"Face Matching / CCTV"** appears.
   - A dark "viewfinder" area is visible with a pulsing red **"LIVE"** indicator.
   - A blue **scanning line** moves up and down the viewfinder (simulating an active scan).
   - The status badge shows 🟡 **"Verification Pending"** (using the `--color-warning` token).

### Scenario B: Manual Verification Override (Prototype)

1. With the Camera flyout open, click the **"Verify"** button.
2. **Expected Result:** 
   - The status badge turns 🟢 **"Identity Verified"** (using the `--color-success` token).
   - The **Match Score** updates from `--` to **98.4%**.
   - The scanning animation stops.
3. Click the **"Reset"** button.
4. **Expected Result:** The status returns to 🟡 **"Verification Pending"**.
5. Click the **"Reset"** button again (to simulate failure).
6. **Expected Result:** The status badge turns 🔴 **"Verification Failed"** (using the `--color-critical` token).

### Scenario C: Agent Shortcuts & Quick Actions

1. Hover over the **Grid icon** (6th icon from the top).
2. **Expected Result:** A panel titled **"Agent Shortcuts"** appears containing a high-density grid of 25+ actions (Pay Later, Care Desk Waiver, etc.).
3. Hover over the **Status Dots icon** (7th icon from the top).
4. **Expected Result:** A panel titled **"Watcho Actions"** appears with OTT-specific shortcuts.
5. **UX Check:** Verify that moving the mouse away from the icons closes the panels immediately, and the subscriber's main profile is never obscured by a permanent window (adhering to the Slide-out Panel benchmark).

---

## 20. Testing Technical Troubleshooting (Module 18)

This module replicates the guided diagnostic flows for resolving subscriber technical issues.

### Scenario A: Troubleshooting Navigation

1. Hover over the **Wrench icon** (9th icon from the top).
2. **Expected Result:** 
   - A large slide-out panel (800px wide) titled **"Technical Troubleshooting"** appears.
   - The left side shows the **Troubleshooting Categories**.
   - The right side shows an empty state: **"Select a category to start troubleshooting"**.

### Scenario B: Dynamic Category Toggling

1. Inside the troubleshooting flyout, click the **"SWITCH TO SMRT STICK"** button.
2. **Expected Result:** The list updates to show SMRT Stick-specific calls (e.g., "NO INTERNET").
3. Click **"SWITCH TO STANDARD"** to return to the main list.

### Scenario C: Guided Diagnostic Flow (101. CHANNEL NOT SUBSCRIBED)

1. Select **"101. CHANNEL NOT SUBSCRIBED"** from the sidebar.
2. **Step 1 (VC STATUS CHECK)**: 
   - Observe the agent script in the green box.
   - Click **"YES, ACTIVE"**.
3. **Step 2 (FRONT OF TV CHECK)**: 
   - Click **"YES"**.
4. **Step 3 (ERROR MESSAGE PROBE)**: 
   - Observe the **Accumulated Case History** at the bottom: `VC Status: Active -> Customer in front of TV`.
   - Click **"101. NOT SUBSCRIBED"**.
5. **Expected Result:** 
   - A completion alert appears with the full Case History: `VC Status: Active -> Customer in front of TV -> Error 101. Triggered automated refresh.`.
   - The diagnostic view resets to the empty state.

### Scenario D: Missing Diagnostic Page (Prototype State)

1. Select any other category (e.g., **"102. NO ACCOUNT BALANCE"**).
2. **Expected Result:** The right panel shows an **"Under Construction"** message with guidance to use the "101" category for testing.
