# Payment Tracker Pro V1 - Data Structure Documentation

## Version: 1.0
## Last Updated: January 31, 2026

This document describes the complete data structure used by Payment Tracker Pro V1. Use this as a reference when building V2 to ensure data compatibility.

---

## Export File Format

When you export data using the 💾 button, you get a JSON file with this structure:

```json
{
  "version": "1.0",
  "exportDate": "2026-01-31T12:00:00.000Z",
  "data": {
    // Main data object (see below)
  }
}
```

---

## Main Data Object

```typescript
{
  payments: Payment[],           // Array of all payments
  history: HistoryEntry[],       // Array of audit log entries
  theme: "light" | "dark",       // User's theme preference
  twoMonthSavings: number,       // Savings toward 2-month goal
  sixMonthSavings: number        // Savings toward 6-month emergency fund
}
```

---

## Payment Object

Each payment in the `payments` array has this structure:

```typescript
{
  // Required Fields
  id: number,                    // Unique identifier (Unix timestamp)
  description: string,           // Payment description
  person: string,                // Person/creditor name
  amount: number,                // Payment amount (dollars)
  dueDate: string,              // Due date (YYYY-MM-DD format)
  category: "Personal" | "Business",  // Payment category
  type: "i-owe" | "owed-to-me", // Payment direction
  status: "pending" | "paid",   // Payment status

  // Optional Fields
  businessName: string,          // Business name (only if category is "Business")
  subcategory: string,           // Sub-category (e.g., "Rent", "Loan", "Services")

  // Partial Payment Fields
  isPartialPayment: boolean,     // Whether partial payments are enabled
  totalAmount: number,           // Total amount if partial payment enabled
  amountPaid: number,           // Amount already paid (0 if not partial)

  // Flag Field
  isFlagged: boolean            // Whether payment is flagged for attention
}
```

### Field Details

#### `id` (number)
- Unique identifier for each payment
- Generated using `Date.now()` when payment is created
- Used for editing, deleting, and selecting payments
- **Important:** IDs must remain unique across all payments

#### `description` (string)
- User-friendly description of the payment
- Required field
- Searchable
- Example: "Monthly rent", "Car payment", "Loan to John"

#### `person` (string)
- Name of the person or entity you're paying or who owes you
- Required field
- Searchable
- Used for grouping in analytics (Top 5 People, Balance by Person chart)
- Example: "John Smith", "Acme Corp", "Landlord"

#### `amount` (number)
- Payment amount in dollars
- Required field
- Must be >= 0
- If `isPartialPayment` is false, this is the total payment amount
- If `isPartialPayment` is true, this is typically the same as `totalAmount`

#### `dueDate` (string)
- Due date in YYYY-MM-DD format (ISO 8601 date only, no time)
- Required field
- Used for:
  - Calendar display
  - Overdue calculation
  - Sorting payments
  - Upcoming payments sections
  - Payment heatmap
- Example: "2026-02-15"

#### `category` (string)
- Either "Personal" or "Business"
- Required field
- Determines if `businessName` field should be shown/used
- Used in Business vs Personal chart

#### `businessName` (string, optional)
- Only used when `category` is "Business"
- Can be empty string or undefined when category is "Personal"
- Searchable
- Example: "ABC Construction", "XYZ Consulting"

#### `subcategory` (string, optional)
- Additional categorization
- Can be empty string or undefined
- Searchable
- Examples: "Rent", "Utilities", "Loan", "Services", "Supplies"

#### `type` (string)
- Either "i-owe" (you owe money) or "owed-to-me" (someone owes you)
- Required field
- Affects:
  - How payment is counted in stats
  - Color coding (red for i-owe, green for owed-to-me)
  - Which totals it contributes to

#### `status` (string)
- Either "pending" or "paid"
- Required field
- Determines if payment is included in:
  - Active calculations (only "pending" counts)
  - Upcoming payments
  - Overdue counts
  - Goal calculations
- Changed to "paid" when user marks payment as complete

#### `isPartialPayment` (boolean)
- Whether this payment supports partial/installment payments
- If true, use `totalAmount` and `amountPaid` fields
- If false, entire `amount` is due at once

#### `totalAmount` (number)
- Total amount to be paid (used when `isPartialPayment` is true)
- Should be >= `amountPaid`
- Example: If loan is $5000 total, this is 5000

#### `amountPaid` (number)
- Amount already paid toward the total (used when `isPartialPayment` is true)
- Should be <= `totalAmount`
- Used to calculate remaining balance
- When payment is marked "paid", this is set to equal `totalAmount`
- Example: If you've paid $1500 of a $5000 loan, this is 1500

#### `isFlagged` (boolean)
- Whether user has flagged this payment for special attention
- Flagged payments appear in:
  - Flagged Payments dashboard section
  - With yellow highlight in payment list
  - With yellow color on calendar
  - With 🚩 indicator throughout app
- Useful for important or large payments to monitor closely

---

## History Entry Object

Each entry in the `history` array has this structure:

```typescript
{
  id: number,                    // Unique identifier (Unix timestamp)
  action: string,                // Action performed
  details: string,               // Description of what changed
  timestamp: string              // When action occurred (ISO 8601)
}
```

### Action Types

The `action` field can be one of:
- `"Added"` - Payment was created
- `"Edited"` - Payment was modified
- `"Deleted"` - Payment was removed
- `"Marked Paid"` - Payment status changed to paid
- `"Flagged"` - Payment was flagged
- `"Unflagged"` - Payment flag was removed

### Details Format

The `details` field typically follows this pattern:
```
"{description} - ${amount}"
```

Example: `"Monthly Rent - $1500"`

### Timestamp Format

ISO 8601 string: `"2026-01-31T14:30:00.000Z"`

---

## Calculation Formulas

For V2 compatibility, here are the key calculations:

### Financial Goals

```javascript
// Average Monthly Bills (only pending "i-owe" payments)
monthlyTotals = {};
payments.filter(p => p.type === 'i-owe' && p.status === 'pending').forEach(payment => {
  month = payment.dueDate.substring(0, 7);  // "2026-01"
  amount = payment.isPartialPayment
    ? (payment.totalAmount - payment.amountPaid)
    : payment.amount;
  monthlyTotals[month] = (monthlyTotals[month] || 0) + amount;
});

avgMonthlyBills = sum(monthlyTotals) / count(monthlyTotals);

// Goals
twoMonthGoal = avgMonthlyBills * 2;
sixMonthGoal = avgMonthlyBills * 6;

// Progress
twoMonthProgress = (twoMonthSavings / twoMonthGoal) * 100;
sixMonthProgress = (sixMonthSavings / sixMonthGoal) * 100;
monthsCovered = sixMonthSavings / avgMonthlyBills;
```

### Dashboard Stats

```javascript
// Total I Owe
totalIOwe = sum(
  payments
    .filter(p => p.status === 'pending' && p.type === 'i-owe')
    .map(p => p.isPartialPayment
      ? (p.totalAmount - p.amountPaid)
      : p.amount)
);

// Due This Week
today = new Date();
weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
dueThisWeek = sum(
  payments
    .filter(p => p.status === 'pending' &&
                 p.type === 'i-owe' &&
                 p.dueDate <= formatDate(weekFromNow))
    .map(p => p.isPartialPayment
      ? (p.totalAmount - p.amountPaid)
      : p.amount)
);

// Due This Month
endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
dueThisMonth = sum(
  payments
    .filter(p => p.status === 'pending' &&
                 p.type === 'i-owe' &&
                 p.dueDate <= formatDate(endOfMonth))
    .map(p => p.isPartialPayment
      ? (p.totalAmount - p.amountPaid)
      : p.amount)
);

// Overdue
todayStr = formatDate(today);  // "2026-01-31"
overdueCount = payments.filter(
  p => p.status === 'pending' && p.dueDate < todayStr
).length;
```

### Payment Heatmap

```javascript
// Group by day of month (1-31)
dayData = {};
payments
  .filter(p => p.status === 'pending' && p.type === 'i-owe')
  .forEach(payment => {
    day = parseInt(payment.dueDate.substring(8, 10));  // "2026-01-15" → 15
    amount = payment.isPartialPayment
      ? (payment.totalAmount - payment.amountPaid)
      : payment.amount;

    dayData[day] = dayData[day] || { count: 0, total: 0 };
    dayData[day].count++;
    dayData[day].total += amount;
  });

// Intensity (0-5)
maxCount = max(Object.values(dayData).map(d => d.count));
for each day in 1-31:
  intensity = dayData[day]
    ? min(5, ceil((dayData[day].count / maxCount) * 5))
    : 0;
```

### Partial Payment Progress

```javascript
// Remaining balance
remaining = payment.totalAmount - payment.amountPaid;

// Progress percentage
progress = (payment.amountPaid / payment.totalAmount) * 100;
// Cap at 100%
progressDisplay = min(progress, 100);
```

---

## Important Notes for V2 Development

### 1. Backward Compatibility

When building V2, ensure you can read V1 data:

```javascript
function loadV1Data(importedData) {
  // Handle missing fields with defaults
  if (!importedData.history) importedData.history = [];
  if (!importedData.theme) importedData.theme = 'light';
  if (importedData.twoMonthSavings === undefined) importedData.twoMonthSavings = 0;
  if (importedData.sixMonthSavings === undefined) importedData.sixMonthSavings = 0;

  // Ensure all payments have required V1 fields
  importedData.payments.forEach(payment => {
    if (payment.isFlagged === undefined) payment.isFlagged = false;
    if (!payment.category) payment.category = 'Personal';
    if (!payment.businessName) payment.businessName = '';
    if (!payment.subcategory) payment.subcategory = '';
    // ... add any new V2 fields with defaults
  });

  return importedData;
}
```

### 2. ID Uniqueness

Payment IDs are Unix timestamps. If V2 needs to generate new IDs:
- Use `Date.now()` for millisecond precision
- Or use a counter: `Math.max(...payments.map(p => p.id)) + 1`
- Or use UUID if you want globally unique IDs

### 3. Date Format

Always use YYYY-MM-DD format (no time component):
```javascript
// Good
dueDate = "2026-01-31"

// Bad
dueDate = "01/31/2026"
dueDate = "2026-01-31T00:00:00Z"
```

When parsing dates for display:
```javascript
// Add T00:00:00 to prevent timezone issues
displayDate = new Date(payment.dueDate + 'T00:00:00').toLocaleDateString();
```

### 4. Amount Precision

All amounts are stored as floats. For display:
```javascript
displayAmount = amount.toFixed(2);  // "1234.56"
```

For calculations, use parseFloat when reading from storage:
```javascript
amount = parseFloat(payment.amount);
```

### 5. History Limit

V1 limits history to 100 entries to prevent bloat. V2 might want:
- Pagination
- Date-based filtering
- Or remove this limit if storage isn't a concern

### 6. Required vs Optional Fields

**Always Required:**
- id
- description
- person
- amount
- dueDate
- category
- type
- status

**Optional (can be empty/undefined):**
- businessName (only meaningful when category = "Business")
- subcategory

**Always Present (with defaults):**
- isPartialPayment (default: false)
- totalAmount (default: 0 or same as amount)
- amountPaid (default: 0)
- isFlagged (default: false)

### 7. Migration Strategy for V2

Recommended approach:

1. **Export from V1** using the 💾 button
2. **In V2, provide Import V1 Data option**
3. **Transform data** to V2 format while preserving all V1 fields
4. **Add new V2 fields** with sensible defaults
5. **Validate** all data after import
6. **Save** in V2 format

Example V2 migration function:

```javascript
function migrateFromV1(v1Data) {
  const v2Data = {
    version: '2.0',
    payments: v1Data.payments.map(p => ({
      ...p,  // Keep all V1 fields
      // Add V2 fields here
      tags: [],                    // New in V2: array of tags
      attachments: [],             // New in V2: file attachments
      recurringRule: null,         // New in V2: recurring payments
      // etc.
    })),
    history: v1Data.history,
    theme: v1Data.theme,
    twoMonthSavings: v1Data.twoMonthSavings,
    sixMonthSavings: v1Data.sixMonthSavings,
    // New V2 settings
    settings: {
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      // etc.
    }
  };

  return v2Data;
}
```

---

## Example Data

Here's a complete example of what a full export looks like:

```json
{
  "version": "1.0",
  "exportDate": "2026-01-31T20:00:00.000Z",
  "data": {
    "payments": [
      {
        "id": 1738358400000,
        "description": "Monthly Rent",
        "person": "Landlord Inc",
        "amount": 1500,
        "dueDate": "2026-02-01",
        "category": "Personal",
        "businessName": "",
        "subcategory": "Rent",
        "type": "i-owe",
        "status": "pending",
        "isPartialPayment": false,
        "totalAmount": 1500,
        "amountPaid": 0,
        "isFlagged": true
      },
      {
        "id": 1738358500000,
        "description": "Car Loan Payment",
        "person": "Auto Finance Corp",
        "amount": 350,
        "dueDate": "2026-02-15",
        "category": "Personal",
        "businessName": "",
        "subcategory": "Loan",
        "type": "i-owe",
        "status": "pending",
        "isPartialPayment": true,
        "totalAmount": 15000,
        "amountPaid": 3500,
        "isFlagged": false
      },
      {
        "id": 1738358600000,
        "description": "Consulting Invoice",
        "person": "ABC Corp",
        "amount": 2500,
        "dueDate": "2026-02-20",
        "category": "Business",
        "businessName": "My Consulting LLC",
        "subcategory": "Services",
        "type": "owed-to-me",
        "status": "pending",
        "isPartialPayment": false,
        "totalAmount": 2500,
        "amountPaid": 0,
        "isFlagged": false
      }
    ],
    "history": [
      {
        "id": 1738358700000,
        "action": "Added",
        "details": "Monthly Rent - $1500",
        "timestamp": "2026-01-31T19:45:00.000Z"
      },
      {
        "id": 1738358800000,
        "action": "Flagged",
        "details": "Monthly Rent - $1500",
        "timestamp": "2026-01-31T19:46:00.000Z"
      }
    ],
    "theme": "dark",
    "twoMonthSavings": 2500,
    "sixMonthSavings": 6000
  }
}
```

---

## Storage Location

V1 uses browser localStorage with key: `paymentTrackerData`

To inspect current data in browser console:
```javascript
JSON.parse(localStorage.getItem('paymentTrackerData'))
```

---

## Questions for V2 Development?

If you encounter any issues importing V1 data into V2, check:

1. ✅ Are all required fields present?
2. ✅ Are dates in YYYY-MM-DD format?
3. ✅ Are amounts valid numbers?
4. ✅ Are payment IDs unique?
5. ✅ Are category values exactly "Personal" or "Business"?
6. ✅ Are type values exactly "i-owe" or "owed-to-me"?
7. ✅ Are status values exactly "pending" or "paid"?

---

## Changelog

**V1.0 (2026-01-31)**
- Initial data structure
- Export/Import functionality
- All core features documented
