# Testing the Modernized DishCRM Portal

This document provides instructions on how to test the **Modernized Agent Co-pilot UI** (3-Panel Architecture). This redesign transforms the tab-heavy interface into a high-density, AI-first workspace.

---

## 1. Modernized Layout Overview (Phase 1)

The UI is now divided into three distinct zones:
- **LEFT**: Slim icon-only navigation.
- **CENTER**: High-density Customer 360 Canvas.
- **RIGHT**: AI Co-pilot / Action Drawer.

### Scenario A: Navigation & HUD
1. Observe the **Slim Sidebar** on the far left. Hover over icons to see tooltips (implemented via native titles for now).
2. Look at the **Top Header**. It now contains an **Agent HUD** showing:
   - Your name (Aman S.)
   - Your center (Noida-Corp)
   - Dynamic routing mode (PRIMARY/ZT REPLICA)
3. Notice the **Call Controls** (REC, EMAIL, VZY) are now in a compact, labeled group on the right.

### Scenario B: Dynamic Routing HUD
1. Observe the **Routing Mode** in the header.
2. In this prototype, it detects the mock IP. Notice the pulsing dot (Emerald for PRIMARY, Amber for ZT REPLICA).

### Scenario C: Light & Dark Mode Toggle
1. Locate the **Sun/Moon** icon at the bottom of the Slim Sidebar.
2. Click the icon.
3. **Expected Result**: The entire application (Sidebar, Header, Canvas, and Drawer) smoothly transitions between Dark and Light themes.
4. Observe the **Glassmorphism** effect in Light mode; cards should have a subtle white-transparent background with a light border.
5. In Light mode, text should be a dark-slate color (`text-slate-900`) for maximum legibility.

---

## 2. Testing AI Co-pilot & Sentiment (Phase 2)

The right panel is powered by the **DISHTV Brain** (RAG-based assistant).

### Scenario A: Context-Aware Chat
1. Search for **Rahul Sharma** (`VC: 09100000001`).
2. Observe the right panel. The AI greeting should automatically include Rahul's name and VC number.
3. Type a query: "How can I help this customer?"
4. **Expected Result**: The AI streams a response token-by-token, suggesting specific packages (like HD Mega Pack) based on Rahul's "South Sports SD" context.
5. Notice the **Confidence Score** and **Source Link** below the AI's response.

### Scenario B: Real-time Sentiment Meter
1. Keep the Rahul Sharma profile open.
2. Watch the **Sentiment Badge** in the top-right of the AI panel.
3. **Expected Result**: The sentiment will randomly shift between `CALM`, `NEUTRAL`, `FRUSTRATED`, and `ANGRY` every 15 seconds (mocked for prototype). Notice the color gradient and pulse animation matching the mood.

---

## 3. High-Density 360 Canvas (Phase 3)

The center panel now uses "Living Cards" instead of static tabs.

### Scenario A: Service Status Snapshots
1. Search for **Rahul Sharma**.
2. **DTH Card**: Observe the real-time signal strength (92%) and warranty status. Click **"Manage"** to trigger the Action Drawer (see Section 5).
3. **Watcho Card**: Notice the "Active" status and the bundled app logos (Disney+, Zee5, etc.).
4. **Subscriber Card**: High-density grid showing RMN, Email, and Address. Click the **Copy** icon next to the VC number to test clipboard functionality.

### Scenario B: Unified Interaction Timeline
1. Scroll down to the **Unified History** section.
2. Use the **Filter Chips** (Calls, Payments, Tickets) to narrow down the feed.
3. Click a chip (e.g., `Tickets`).
4. **Expected Result**: The timeline animates (via Framer Motion) to show only Service Requests. Notice the vertical continuity line and distinct icons for each event type.

---

## 4. ⌘K Command Palette (Intelligence Layer)

The global command palette is the primary way to perform actions without using the mouse.

### Scenario A: Triggering Actions
1. Press **`Cmd + K`** (Mac) or **`Ctrl + K`** (Windows).
2. Type "recharge".
3. Use arrow keys to select "Recharge Account" and press Enter.
4. **Expected Result**: The Recharge Wizard modal opens.
5. Try another command: Type "SOA".
6. **Expected Result**: The right panel switches from the AI assistant to the **Statement of Account** tool.

---

## 5. The Unified Action Drawer (Phase 5)

The right panel is no longer just for AI; it's a dynamic workspace.

### Scenario A: Tool Switching
1. Search for **Rahul Sharma**.
2. On the **DTH Service Card**, click the orange **"Manage"** button.
3. **Expected Result**: The right panel slides in the **Package Management Tool** (Catalogue/Active packs).
4. Click the **Arrow Left (Back)** icon at the top of the drawer.
5. **Expected Result**: The panel smoothly transitions back to the **DISHTV Brain** chat.

### Scenario B: Direct Tool Access
1. From the **Command Palette** (⌘K), select **"View Statement of Account"**.
2. **Expected Result**: The right panel loads the transaction history and balance summary.

---

## 6. Quick Action Dock (Floating Bar)

Repetitive tasks are now docked at the bottom center.

### Scenario A: Categorized Menus
1. Hover over the **"System"** dropdown in the floating bottom bar.
2. Select **"Temp Deactivation"**.
3. **Expected Result**: The modernized **Temporary Deactivation Modal** opens.
4. Test the **Airport Subscriber Block**:
   - Search for a mock user with TOC 10026.
   - Trigger Temp Deactivation.
   - **Expected Result**: A red "Access Denied" shield appears, explaining the policy.

---

## 10. Intelligent Complaint Logger (Module 08)

Logging and tracking tickets is now a guided, multi-step process in the Action Drawer.

### Scenario A: Ticket History Audit
1. Trigger **Complaints** (via ⌘K "View Last 5 Interactions" or "Add Interaction Note" on Action Modal).
2. **Expected Result**: The Action Drawer slides in the **Complaint History** list.
3. Observe the high-density cards showing Ticket ID, Status, and Priority. 
4. Use the search bar to filter by ID or Category.

### Scenario B: Guided Logging Flow
1. In the Complaint History view, click **"+ New Ticket"**.
2. **Step 1 (Category)**: Select "No Signal (E52-32)".
3. **Step 2 (Details)**: Enter remarks and set priority to "High".
4. **Step 3 (Scheduling)**: Since it's a Tech issue, observe the auto-populated appointment slot and address.
5. Click **"Create Service Request"**.
6. **Expected Result**: A success screen appears with a generated Ticket ID. Clicking "Return to History" refreshes the list with the new entry.

