# Comprehensive Testing Guide: Modernized Customer Service Portal

This document provides exhaustive, step-by-step instructions for testing every feature of the modernized prototype. The application uses mock data and enforced business logic to simulate a real-world CRM environment.

---

## 1. Application Architecture & Navigation
The new portal is divided into three functional zones:
1.  **Sidebar (Far Left)**: Main navigation, Recharge Wizard, and Theme Toggle.
2.  **Center Canvas**: Primary search, Subscriber 360 Grid, Unified Interaction History, and Agent Global Toolbar (Top).
3.  **Action Drawer (Right)**: Contextual tools (AI Co-pilot, KYC, Package Tool, SOA, Ticket Logger).
4.  **Quick Actions (Bottom Center)**: Floating bar for global utilities like Temp Deactivation.
5.  **Utility Bar (Far Right)**: Vertical icons for slide-out panels (CCTV, Shortcuts, Troubleshooting).

---

## 2. Subscriber Search & Discovery (Module 01)
**Location**: Top Header of the Center Canvas.

### Scenario A: Single Match (Active Customer)
1.  Select `VC` from the search dropdown.
2.  Enter: `09100000001` and press Enter.
3.  **Expected Result**: 
    - Profile for **RAHUL SHARMA** loads.
    - Status badge in the Subscriber Card shows **ACTIVE** (Green).
    - Top Toolbar shows **VERIFIED CALLER** badge (automatic RMN match).

### Scenario B: Single Match (Deactive Customer)
1.  Search `VC`: `02563029393`.
2.  **Expected Result**: Profile for **JAFFER RESHT** loads. Status badge shows **DEACTIVE** (Red).

### Scenario C: Suspended VIP Customer
1.  Search `STB`: `STB9876PRIYA0001`.
2.  **Expected Result**: 
    - Profile for **PRIYA MENON** loads. Status shows **SUSPENDED** (Amber).
    - A gold **DishVIP Member** badge appears in the profile header (next to the name).

### Scenario D: Multi-Match Disambiguation
1.  Search `Mobile`: `9999900000`.
2.  **Expected Result**: A high-overlay modal appears listing two accounts (Jaffer Resht and Rahul Sharma). 
3.  Click on **Rahul Sharma** to load the profile.

### Scenario E: GoMulti Parent/Child Tree
1.  Search `SMSID`: `41200100`.
2.  **Expected Result**: A new panel titled **"GoMulti Connections"** appears below the top 360 grid. It shows Rahul as the "Parent" and two children (Sita and Rohit) with their respective VC numbers.

---

## 3. Customer Verification & Identity (Module 02)
**Location**: Right Action Drawer & ActionModals Layer.

### Scenario A: Failed KYC leading to WOB Lock
1.  Search for **Rahul Sharma** (VC: `09100000001`).
2.  Click **"Raise Tech Call"** in the floating ActionModals layer (above the history timeline).
3.  **Action**: The Right Drawer switches to **Identity Verification**.
4.  Enter incorrect details: PIN `000000`, Last Recharge `100`. Click **Confirm Verification**.
5.  Repeat until 3 attempts are exhausted.
6.  **Expected Result**: 
    - The drawer shows a red **"Security Lock (WOB)"** screen.
    - All action buttons in the main center canvas turn gray and show 🔒 icons.
    - A persistent **SECURITY ALERT: WRITE-OFF BLOCK** banner appears.

### Scenario B: Successful Verification
1.  Refresh the page and search for **Rahul Sharma** again.
2.  Click **"Add Interaction Note"** in the ActionModals layer.
3.  Enter correct details: PIN `110017`, Last Recharge `350`.
4.  **Expected Result**: The drawer unlocks and automatically loads the **Intelligent Complaint Logger**.

### Scenario C: Modernized Temp Deactivation
1.  **Trigger**: Click the **"PKG/CNX/PMT"** button in the **Bottom Floating Toolbar**. Select **"Temp Deactivation"**.
2.  **Real-time Calculation**: 
    - Enter `15` in the "Number of Days" field.
    - Change "Deactivation From" to a future date.
    - **Expected Result**: "Deactivation To" and "Reactivation Date" (To + 1) update instantly in the UI.
3.  **Mandatory Checklist**: 
    - Dates must be valid (min 5 days).
    - **Expected Result**: The "Submit Request" button remains disabled until all 3 checkboxes in the checklist are ticked.
4.  **Submission**: Click Submit. A success modal confirms the request summary.

---

## 4. Package & Channel Management (Module 03)
**Location**: Right Action Drawer (Package Tool).

### Scenario A: Viewing Active vs Catalogue
1.  Open the **Package Tool** (Right Icon Bar -> Grid Icon -> Package Tool).
2.  **Expected Result**: The panel shows **Active Subscriptions** at the top and the **Package Catalogue** (Categorized by BASE, ADDON, etc.) below.

### Scenario B: Opting In (Verbal Consent Rule)
1.  Find **"Cricket Live VAS"** in the catalogue. Click **"Activate"**.
2.  **Expected Result**: A sliding modal appears. The "Authorize Activation" button is disabled. 
3.  Check **"I confirm verbal consent has been captured"**.
4.  **Expected Result**: Button turns orange and becomes clickable.

### Scenario C: Advance Package Request
1.  Find **"English Movies A-la-carte"**. Click **"Activate"**.
2.  Select a **Date** 5 days from today in the date picker.
3.  Click Authorize.
4.  **Expected Result**: The package appears in the "Active Subscriptions" list with a status of **PENDING_ACTIVATION** (Amber).

### Scenario D: Package Rollback
1.  Search for **Rahul Sharma**. He has a recent change mock record.
2.  Open the Package Tool. 
3.  **Expected Result**: A green **"Package Rollback Available"** panel appears below his active list. 
4.  Enter a reason and click **"Revert Package"**. The list refreshes to the previous state.

---

## 5. Call Handling & Interaction History (Module 04)
**Location**: Unified History Section (Bottom of Center Canvas).

### Scenario A: Navigating the Call Tree
1.  Select the **"Call Handling"** tab in the history section.
2.  Select `Complaint` -> `Signal Problem` -> `No Signal (E48-32)`.
3.  **Expected Result**: The UI validates that you have reached a **Leaf Node** (last level).

### Scenario B: Unified Timeline Audit
1.  Select the **"History Timeline"** tab.
2.  Observe the color-coded entries:
    - **Blue**: Inbound calls.
    - **Purple**: Outbound Retention Campaigns.
    - **Amber**: Service Tickets.
3.  **Search**: Type "Recharge" in the timeline search bar.
4.  **Filter**: Click the **"Tickets"** chip to see only technical service records.

### Scenario C: Module 11 Call Drop Callback
1.  In the Call Handling tab, select the category **"Call Drop"**.
2.  Follow any path to a leaf node.
3.  Click **"Complete & Close Call"**.
4.  **Expected Result**: A green success alert appears stating: **"Call drop detected. Callback scheduled via Module 11."**

---

## 6. Contact & Social Integration (Module 05)
**Location**: Subscriber Detail Card (Left Panel).

### Scenario A: Social Context
1.  Load **Rahul Sharma**. 
2.  **Expected Result**: Facebook, Twitter, and LinkedIn icons appear with his handles.
3.  Click the LinkedIn icon. (In this prototype, it highlights the context for the agent).

### Scenario B: Alternate Mobile Management
1.  Select the **"Contact Details 🆕"** tab in the history section.
2.  **Action**: Click **"+ Add Mobile"**. Enter a 10-digit number and select relationship "SPOUSE".
3.  **Expected Result**: 
    - Number is added to the table.
    - Check terminal logs: `[MockContactRepository] SMS dispatched for ... (Flag=13)`.

---

## 7. Financial & Service Chain (Module 06)
**Location**: History Tabs & Action Drawer (SOA).

### Scenario A: Statement of Account (SOA)
1.  Open the **SOA Tool** (Right Icon Bar -> Grid -> SOA).
2.  **Expected Result**: 
    - Top card shows Balance (`₹142.50`) and Next Recharge Date.
    - Ledger shows detailed recharges and renewals.
3.  Click **"Resend Latest Invoice ✉️"**. **Expected Result**: Success alert (Simulating WebConn trigger).

### Scenario B: Service Hierarchy & Matrix
1.  Select the **"Hardware History"** tab (ID: `service`).
2.  **Expected Result**: 
    - The top section displays the **Assigned DCC (Delhi Electronics Hub)** with contact details.
    - The **Escalation Matrix** (ASE, CSM, Ops Manager) is visible below it.

### Scenario C: Entitled Channel Search
1.  In the **Package Tool** (Right Panel), click **"View Channels 📺"**.
2.  Search for **"HBO"**.
3.  **Expected Result**: Notice the orange label **"Requires 3-Satellite"**. This verifies the technical flag surfaced from the backend.

---

## 8. Alacarte, Offers & Loyalty (Module 07)
**Location**: Center Canvas Tabs & Banners.

### Scenario A: Summer Ticket Upsell
1.  Load **Rahul Sharma**.
2.  **Expected Result**: A bright banner **"IPL 2026 Summer Ticket Available!"** appears at the top of the history section.
3.  Click **"Opt In Now"**.

### Scenario B: Kitty Loyalty Redemption
1.  Select the **"Offers & Promos 🎁"** tab.
2.  **Expected Result**: The **"Kitty Alacarte"** panel shows a balance of **500 Points**.
3.  Select a channel. The points required updates dynamically.
4.  Click **"Redeem Now"**. A success message with a **Form No** appears.

---

## 9. Complaint & Service Requests (Module 08)
**Location**: ActionModals & Right Drawer.

### Scenario A: Technical Service SR (Multi-Step)
1.  Click **"Raise Tech Call"** in the center canvas.
2.  In the Drawer, select **"No Signal"**.
3.  **Step 2**: The button changes to **"Next: Appointment →"**.
4.  Enter STB serial, select a time slot, and click **"Create Service Request"**.
5.  **Expected Result**: A success screen displays a **TKT ID**.

### Scenario B: Duplicate Check
1.  Try to log the same complaint category for the same VC multiple times.
2.  **Expected Result**: On the 3rd attempt, the system shows a **"Duplicate Check"** error screen.

---

## 10. Hardware & STB Swap (Module 12)
**Location**: "Hardware History" Tab.

### Scenario A: OTP Secured Swap
1.  Click **"🔄 STB Swap / Repair"**.
2.  **Expected Result**: A **Security Verification** modal appears.
3.  Click "Send OTP". Enter code from the browser debug alert.
4.  **Workflow**:
    - Enter serial `NEW_STB_001`. Click Validate.
    - Verify the "New STB Verified: HD-S3" status appears.
    - Complete the swap. The **Active Set-Top Box** card refreshes automatically.

---

## 11. Watcho & OTT (Module 13)
**Location**: "Watcho 📱" Tab.

### Scenario A: SI (Auto-Renewal) Toggle
1.  Observe the **Standing Instruction** toggle (Green/Active).
2.  Click to disable. **Expected Result**: Text updates to "Manual renewal required."

### Scenario B: Plan Coupon Wizard
1.  Load **Priya Menon** (no active Watcho).
2.  Click **"Explore Plans 🚀"**. Select a plan.
3.  Enter coupon `WATCHO50`. **Expected Result**: Total price drops by 50%.

---

## 12. DishVIP & Loyalty Dashboard (Module 14)
**Location**: Subscriber Card & "360 Overview" Tab.

### Scenario A: VIP Status & Premium Benefits
1.  Search for **Priya Menon** (`VC: 07800009999` or `STB: STB9876PRIYA0001`).
2.  **Expected Result**: A gold badge stating **"🌟 DishVIP Member"** is visible in the **Subscriber Card** (Top Panel, next to the name).
3.  Click the badge.
4.  **Expected Result**: A modal opens showing her enrollment date and premium benefits.

### Scenario B: VIP Enrollment (Eligible Prospect)
1.  Search for **Rahul Sharma** (`VC: 09100000001`).
2.  **Expected Result**: A gray badge stating **"⚙️ Check VIP Eligibility"** appears in the **Subscriber Card** header.
3.  Click the badge.
4.  **Expected Result**: Modal shows "Subscriber is Eligible!". Click **"Enroll in DishVIP Now 🚀"**.

### Scenario C: Unified Loyalty Dashboard
1.  Search for **Rahul Sharma**.
2.  Select the **"360 Overview"** tab in the history section (bottom half of center canvas).
3.  **Expected Result**: 
    - The **"Unified Loyalty Rewards"** card is visible.
    - Displays balances for **DTH Points**, **Movie Credits**, and **DishFlix Amt**.
    - Verify the **"Recent Activity"** log shows earned/spent points.

---

## 13. System Utilities & Agent HUD (Module 16)
**Location**: Agent Toolbar (Top) & Right Icon Bar.

### Scenario A: Agent HUD
1.  Verify the **Top Toolbar** displays:
    - Agent: Aman S. (ID: AGENT_001)
    - Mode: **ZT REPLICA (Active)** (based on mock IP logic).
    - IP: Your current simulated IP.

### Scenario B: Last Worked Context
1.  Search VC A.
2.  Search VC B.
3.  **Expected Result**: The Top Toolbar shows **"Last Worked: [VC A]"** on the right side for quick reference.

### Scenario C: Face Matching (Camera)
1.  Hover over the **Camera icon** on the far right bar.
2.  **Action**: Click **"Verify"**.
3.  **Expected Result**: Pulsing scanning line stops, status turns green, and Match Score shows **98.4%**.

---

## 14. Guided Troubleshooting (Module 18)
**Location**: Right Icon Bar -> Wrench Icon.

### Scenario A: Guided Diagnostic 101
1.  Hover over the **Wrench icon**. Select **"101. CHANNEL NOT SUBSCRIBED"**.
2.  Follow the script:
    - Step 1: Click "YES, ACTIVE".
    - Step 2: Click "YES" (In front of TV).
    - Step 3: Click "101. NOT SUBSCRIBED".
3.  **Expected Result**: 
    - A completion alert appears.
    - Accumulated Case History shows the full diagnostic path used for audit logging.

### Scenario B: Device Toggling
1.  Click **"SWITCH TO SMRT STICK"**.
2.  **Expected Result**: Categories change to internet-specific troubleshooting (e.g., "NO INTERNET").
