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
