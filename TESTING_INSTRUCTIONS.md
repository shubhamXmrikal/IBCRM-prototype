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

### Scenario C: Temp Deactivation

_(Assume you successfully verified Rahul or are viewing Jaffer who is already verified)_

1. Click **"Temp Deactivation"**.
2. Select a Start Date (e.g., tomorrow) and an End Date.
3. **Validation Rule:** Try setting the end date only 2 days after the start date and click Submit.
   - **Expected Result:** An error message "Suspension must be at least 5 days" appears.
4. Set the end date 6 days after the start date and check the "Ramadan Special Opt-In" box.
5. Click Submit.
6. **Expected Result:** A success alert appears.

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
