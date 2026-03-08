# Comprehensive Testing Guide: Modernized Customer Service Portal

This document provides exhaustive, step-by-step instructions for testing every feature of the modernized prototype. The application uses mock data and enforced business logic to simulate a real-world CRM environment.

---

## 1. Application Architecture & Navigation
The new portal is divided into three functional zones:
1.  **Sidebar (Far Left)**: Main navigation, Recharge Wizard, and Theme Toggle.
2.  **Center Canvas**: Primary search, Subscriber 360 Grid, Unified Interaction History, and Agent Global Toolbar (Top).
3.  **Action Drawer (Right)**: Contextual tools (AI Co-pilot, KYC, Package Tool, SOA, Ticket Logger, Watcho Management, DNC).
4.  **Quick Actions (Bottom Center)**: Floating bar for global utilities like Tagging, SOA, SMS, and Temp Deactivation.
5.  **Utility Bar (Far Right)**: Vertical icons for slide-out panels (CCTV, Shortcuts, Troubleshooting).

---

## 2. Subscriber Search & Discovery (Module 01)
**Location**: Top Header of the Center Canvas.

### Scenario A: Single Match (Active Customer)
1.  Select `VC` from the search dropdown.
2.  Enter: `09100000001` and press Enter.
3.  **Expected Result**: Loads profile for **RAHUL SHARMA**. Top HUD shows **VERIFIED CALLER**.

### Scenario B: Multi-Match Disambiguation
1.  Search `Mobile` -> `9999900000`.
2.  **Expected Result**: A high-overlay modal appears listing multiple accounts. Select one to load.

### Scenario C: GoMulti Parent/Child Tree
1.  Search `SMSID` -> `41200100`.
2.  **Expected Result**: A **"GoMulti Connections"** panel appears below the top 360 grid showing the family tree.

---

## 3. Customer Verification & Identity (Module 02)
**Location**: Right Action Drawer (Auto-triggered for sensitive tools).

### Scenario A: Failed KYC leading to WOB Lock
1.  Search for **Rahul Sharma** (VC: `09100000001`).
2.  Click **"Tagging"** in the **Bottom Toolbar**.
3.  **Action**: The Right Drawer switches to **Identity Verification**.
4.  Enter incorrect details: PIN `000000`, Last Recharge `100`. 
5.  **Expected Result**: After 3 attempts, the account enters **WOB Lock**. All action buttons turn gray with 🔒 icons.

---

## 4. Quick Actions Hub (Bottom Toolbar)
**Location**: Floating bar at the bottom center.

### Scenario A: Direct Access Buttons
1.  **Tagging**: Click the Tag icon. **Expected Result**: Opens **Complaint History** in the Right Drawer.
2.  **SOA**: Click the File icon. **Expected Result**: Opens **Statement of Account** in the Right Drawer.
3.  **SMS**: Click the Message icon. **Expected Result**: Opens **Communication Logs** in the Right Drawer.

### Scenario B: System & Management Dropdowns
1.  **System -> DNC Management**: Opens the modernized **DNC Registry** panel.
2.  **System -> STB/VC Pairing**: Opens **Hardware Management** (Swap tool).
3.  **Packs -> Channel Rollback**: Opens **Package Tool**.
4.  **Search -> Service Hierarchy**: Opens the technical **DCC Chain** view.
5.  **More -> Dish VIP Enrollment**: Opens the **VIP Status** tool.

### Scenario C: Modernized Temp Deactivation
1.  **Trigger**: **System -> Temp Deactivation**.
2.  **Real-time Calculation**: Enter `15` days. Notice the **Reactivation Date** calculates instantly.
3.  **Mandatory Checklist**: Submit button remains disabled until all 3 checkboxes are ticked.

---

## 5. Package & Channel Management (Module 03)
**Location**: Right Action Drawer (Triggered via "Packs" dropdown or "Manage Pack" buttons).

### Scenario A: Verbal Consent Rule
1.  Open **Package Tool**. Click **"Activate"** on any pack.
2.  **Expected Result**: Modal requires checking **"Mandatory Verbal Consent"**.

### Scenario B: Channel Search (3-Satellite Flag)
1.  Click **"View Channels 📺"** at the top of the Package Tool.
2.  Search for **"HBO"**. **Expected Result**: Observe the orange **"Requires 3-Satellite"** flag.

---

## 6. Call Handling & Interaction History (Module 04)
**Location**: Unified History Tabs (Bottom Center).

### Scenario A: Unified Timeline
1.  Select **"History Timeline"** tab.
2.  Observe color-coded entries: **Blue** (Inbound), **Purple** (Campaigns), **Amber** (Tickets).

### Scenario B: Module 11 Call Drop Trigger
1.  Select **"Call Handling"** tab. Select category **"Call Drop"**.
2.  Complete any path to a leaf node and click close.
3.  **Expected Result**: Success alert confirms callback scheduled via Module 11.

---

## 7. Watcho & OTT (Module 13)
**Location**: "Watcho OTT" Card (Center Canvas) & Right Action Drawer.

### Scenario A: Active Subscription
1.  Search for **Rahul Sharma** (`VC: 09100000001`).
2.  In the center "Watcho OTT" card, click **Manage Apps**.
3.  **Expected Result**: Right Drawer shows his active plan and the **Standing Instruction** (Auto-renewal) toggle.

### Scenario B: New/Upgrade (Plan Wizard)
1.  Search for **Priya Menon** (`VC: 07800009999`).
2.  Click **Upgrade to Watcho Max** in the center card.
3.  **Action**: Select a plan -> Enter coupon **`WATCHO50`**.
4.  **Expected Result**: Total price drops by 50%. The wizard is fully theme-aware (Navy background in Dark Mode).

---

## 8. DishVIP & Loyalty Dashboard (Module 14)
**Location**: Subscriber Card Header & "360 Overview" Tab.

### Scenario A: VIP Status
1.  Search for **Priya Menon**. Click the gold **"DishVIP Member"** badge next to her name.
2.  **Expected Result**: Modal displays enrollment date and premium privileges.

### Scenario B: Eligibility & Enrollment
1.  Search for **Rahul Sharma**. Click **"Check VIP Eligibility"**.
2.  **Expected Result**: Modal shows "Subscriber is Eligible!". Click Enroll to upgrade.

### Scenario C: Unified Loyalty Dashboard
1.  Select **"360 Overview"** tab in the history section.
2.  **Expected Result**: The **"Unified Loyalty Rewards"** card shows DTH Points, Movie Credits, and recent history.

---

## 9. Hardware & STB Swap (Module 12)
**Location**: "Hardware History" Tab (ID: `service`).

### Scenario A: OTP Gated Swap
1.  Click **"🔄 STB Swap"**.
2.  **Expected Result**: Security OTP modal appears. Enter code from browser debug alert.
3.  **Workflow**: Enter serial `NEW_STB_001`. Validate and complete. The card refreshes automatically.

---

## 10. System Utilities & Agent HUD (Module 16)
**Location**: Agent Toolbar (Top) & Right Icon Bar.

### Scenario A: Face Matching (CCTV)
1.  Hover over the **Camera icon** (Utility Bar).
2.  **Expected Result**: Pulse scan begins. Click "Verify" to confirm identity (98.4% match).

### Scenario B: Guided Diagnostics (101)
1.  Hover over the **Wrench icon**. Select **"101. CHANNEL NOT SUBSCRIBED"**.
2.  Follow the script (Yes/Active -> Yes/Front of TV).
3.  **Expected Result**: Completion alert shows full Case History path.
