# Monthly Filtering & Grouping - User Guide

## 🎯 What's New in Payments Tab

The Payments tab now has **monthly filtering and grouping** to make it easy to navigate when you have lots of recurring payments!

---

## 📋 New Features

### 1. Monthly Filter Dropdown
Select a specific month to view only that month's payments.

**Location:** Payments tab, next to the search box

**Options:**
- All Months (default - shows everything)
- January 2026
- February 2026
- March 2026
- ...etc (all months with payments)

### 2. Month Grouping (When "All Months" Selected)
Payments are automatically grouped by month with clear visual dividers.

**Each month shows:**
- Month name (e.g., "February 2026")
- Total amount due that month (only pending "I Owe" payments)
- All payments for that month below

---

## 🎨 Visual Design

### Month Divider Header
```
┌─────────────────────────────────────────────┐
│ February 2026                    $3,450.00  │ ← Sticky header
├─────────────────────────────────────────────┤
│ Payment 1                                   │
│ Payment 2                                   │
│ Payment 3                                   │
├─────────────────────────────────────────────┤
│ March 2026                       $3,200.00  │ ← Next month
├─────────────────────────────────────────────┤
│ Payment 1                                   │
│ Payment 2                                   │
└─────────────────────────────────────────────┘
```

**Features:**
- Dark background with bold text
- Month name on left, total on right
- Sticky header (stays visible while scrolling)
- Clear separation between months

---

## 🔍 How to Use

### View All Payments Grouped by Month

1. Go to **Payments** tab
2. Month Filter: **"All Months"** (default)
3. Scroll through the list

**Result:**
```
February 2026                    $3,450.00
  ♻️ Monthly Rent              - $1,500.00
  ♻️ Car Payment               -   $350.00
  ♻️ Internet                  -    $80.00
  ♻️ Phone Bill                -    $60.00
  ...

March 2026                       $3,200.00
  ♻️ Monthly Rent              - $1,500.00
  ♻️ Car Payment               -   $350.00
  ...
```

### View Specific Month Only

1. Go to **Payments** tab
2. Month Filter: Select **"March 2026"**
3. See only March payments

**Result:**
```
  ♻️ Monthly Rent              - $1,500.00
  ♻️ Car Payment               -   $350.00
  ♻️ Internet                  -    $80.00
  (No month header - single month view)
```

---

## 🎯 Use Cases

### Use Case 1: Planning Next Month
```
1. Select "March 2026" from month filter
2. See all payments due in March
3. Check total at top of calendar (or when grouped)
4. Plan cash flow accordingly
```

### Use Case 2: Reviewing Past Payments
```
1. Select "January 2026" from month filter
2. Filter by "Paid"
3. See what you paid last month
4. Review for budgeting
```

### Use Case 3: Finding a Specific Payment
```
1. Remember payment was in February
2. Select "February 2026"
3. Much shorter list to search through
4. Or use search box within that month
```

### Use Case 4: Overview Across All Months
```
1. Select "All Months"
2. Scroll through grouped view
3. See totals for each month
4. Compare month-to-month expenses
```

---

## 💡 Combining Filters

**Month + Status:**
```
Month: "March 2026"
Filter: "Pending"

Result: Only pending payments in March
```

**Month + Search:**
```
Month: "February 2026"
Search: "rent"

Result: Only rent payments in February
```

**Month + Flagged:**
```
Month: "All Months"
Filter: "Flagged"

Result: All flagged payments, grouped by month
```

**All Together:**
```
Month: "March 2026"
Search: "car"
Filter: "Pending"

Result: Pending car payments in March only
```

---

## 📊 Month Totals Explained

### What's Included in Month Total
Only counts:
- ✅ Status: **Pending** (not paid)
- ✅ Type: **I Owe** (not "owed to me")
- ✅ Partial payments: **Remaining balance** (not full amount)

**Example:**
```
February 2026 payments:
- Rent: $1,500 (pending, I owe) ✅ Counted
- Car: $350 (pending, I owe) ✅ Counted
- Loan: $5,000 total, $1,000 paid (pending, partial) ✅ $4,000 remaining counted
- Invoice: $2,000 (pending, owed to me) ❌ Not counted
- Old rent: $1,500 (paid) ❌ Not counted

Month Total = $1,500 + $350 + $4,000 = $5,850
```

### Why This Matches Calendar Total
The month total in the Payments tab **exactly matches** the monthly total shown in the Calendar view!

**Consistency:**
```
Calendar:
  February 2026
  Monthly Total: $3,450.00

Payments Tab (All Months):
  February 2026            $3,450.00

Same calculation, same number!
```

---

## 🚀 Benefits

### 1. Less Overwhelming
**Before:** 60 recurring payments in one long list
**After:** 6 months × 10 payments each = organized groups

### 2. Quick Navigation
**Before:** Scroll through everything to find February payments
**After:** Select "February 2026" → see only 10 payments

### 3. Monthly Budgeting
**Before:** Manually count up each month's total
**After:** See total automatically at top of each month

### 4. Context Awareness
**Before:** "Is this payment Feb or Mar?"
**After:** Clear month headers show exactly when

### 5. Better Comparisons
**Before:** Hard to compare months
**After:** Scroll and see each month's total side-by-side

---

## 💭 Common Questions

**Q: Why does the dropdown show months I haven't created payments for?**
A: It only shows months where you DO have payments. Empty months don't appear.

**Q: Can I view multiple specific months at once?**
A: Not yet. Either view one month, or "All Months" (which groups all).

**Q: What if I delete all payments in a month?**
A: That month disappears from the dropdown automatically.

**Q: Do the month groups include paid payments?**
A: Yes, if you filter by "Paid" or "All", you'll see paid payments grouped by month too. The month total only counts pending "I Owe" though.

**Q: Can I hide the month totals?**
A: Not currently - they're always shown in the grouped view.

**Q: What happens when I create a new recurring payment?**
A: New months appear in the dropdown automatically. The grouping updates to show the new payments.

**Q: Does bulk select work across months?**
A: Yes! Select payments from multiple months, then bulk mark paid or delete.

**Q: Do the month headers scroll with me?**
A: Yes! They're "sticky" - when you scroll past a month header, it stays visible at the top until you reach the next month.

---

## 🎨 Example Workflows

### Workflow 1: Pay This Month's Bills

```
Step 1: Select current month (e.g., "February 2026")
Step 2: Filter: "Pending"
Step 3: See all unpaid bills for this month
Step 4: Mark each as paid after paying
Step 5: When done, list is empty!
```

### Workflow 2: Review Last 3 Months

```
Step 1: Select "All Months"
Step 2: Filter: "Paid"
Step 3: Scroll through December, January, February
Step 4: See totals for each month
Step 5: Compare spending patterns
```

### Workflow 3: Find That One Payment

```
Step 1: Remember it was "sometime in March"
Step 2: Select "March 2026"
Step 3: Now only ~10 payments to look through
Step 4: Or use search within March
Step 5: Edit/delete as needed
```

### Workflow 4: Plan Ahead

```
Step 1: Select "April 2026" (next month)
Step 2: See all upcoming payments
Step 3: Note the total
Step 4: Flag any large or important ones
Step 5: Set aside money accordingly
```

---

## 🔄 Works With All Existing Features

### ✅ Search Still Works
```
Search: "rent"
Month: "All Months"

Result: Shows rent payments grouped by month
```

### ✅ Status Filters Still Work
```
Filter: "Pending"
Month: "All Months"

Result: Shows only pending payments, grouped by month
```

### ✅ Bulk Actions Still Work
```
1. Select "March 2026"
2. Select multiple payments
3. Bulk mark as paid
4. All at once!
```

### ✅ Flags Still Work
```
Filter: "Flagged"
Month: "All Months"

Result: Flagged payments only, grouped by month
```

### ✅ Recurring Indicator Still Shows
```
♻️ Monthly Rent - $1,500
♻️ Car Payment - $350

Still see ♻️ for recurring payments
```

---

## 📱 Mobile Experience

On mobile, the month headers are slightly smaller but still sticky:

```
┌─────────────────────────┐
│ Feb 2026     $3,450.00  │ ← Sticky
├─────────────────────────┤
│ Rent                    │
│ $1,500                  │
├─────────────────────────┤
│ Car                     │
│ $350                    │
└─────────────────────────┘
```

Scroll naturally - headers stay visible!

---

## 🎊 Summary

**Monthly filtering and grouping makes managing payments easy:**

✅ **Filter:** Select specific month or view all
✅ **Group:** Automatic month headers when viewing all
✅ **Totals:** See each month's total at a glance
✅ **Navigate:** Quickly find the month you want
✅ **Compare:** See month-over-month expenses
✅ **Organize:** No more endless scrolling through lists

**Perfect for when you have lots of recurring payments!** ♻️

---

**Try it now:** Go to Payments tab and select different months from the dropdown! 🚀
