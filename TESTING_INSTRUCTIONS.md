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
*(Assume you successfully verified Rahul or are viewing Jaffer who is already verified)*
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
- **Expected Result:** On the left, you see Rahul's active packages (`HD Family Pack`, `Star Sports Add-on`). On the right, the catalogue displays available packages *excluding* the ones he already has.

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
3. Confirm the modal.
4. **Expected Result:** The status changes to `PENDING_DEACTIVATION` (simulating that it will drop off at the end of the billing cycle).

### Scenario E: Package Rollback
1. Under the "Currently Active" list, you should see a green panel indicating **"Package Rollback Available"**. This is because Rahul recently changed packages.
2. Enter a reason in the input field (e.g., "Customer misheard the price").
3. Click **"Revert Package"**.
4. **Expected Result:** The `HD Family Pack` is removed, the old `South Sports Basic SD` is added back to the active list, and the Rollback panel disappears (limit of 1 rollback per cycle enforced).