# Dynamic Goals - How They Work

## 🎯 What Changed

The financial goals are now **dynamic** and calculate based on your **actual upcoming monthly payment obligations** instead of a simple average of all payments.

---

## 📊 Old Way vs New Way

### ❌ Old Way (V1.0 & V1.1 before this update)
```
Average Monthly Bills = (All pending payments) / (Number of months with data)

Example:
- January: $2,000
- February: $3,000
- March: $1,500
- April: $0 (no payments yet)
- May: $0 (no payments yet)

Average = ($2,000 + $3,000 + $1,500) / 3 = $2,167/month

Problem: Doesn't account for future months, uses historical average
```

### ✅ New Way (V1.1 Dynamic Goals)
```
Average Monthly Bills = Average of NEXT 6 MONTHS of actual obligations

Example:
- February: $3,000 (current month)
- March: $3,200 (rent + bills)
- April: $3,150 (recurring payments)
- May: $3,100 (recurring payments)
- June: $3,200 (recurring payments)
- July: $3,150 (recurring payments)

Average = ($3,000 + $3,200 + $3,150 + $3,100 + $3,200 + $3,150) / 6 = $3,133/month

Benefit: Reflects ACTUAL upcoming obligations, more accurate planning
```

---

## 🔄 How It Calculates

### Step 1: Identify Upcoming 6 Months
Starting from current month (e.g., February 2026), look at:
- February 2026
- March 2026
- April 2026
- May 2026
- June 2026
- July 2026

### Step 2: Calculate Total Per Month
For each month, sum all pending "I Owe" payments:

**February 2026:**
- Rent: $1,500
- Car Payment: $350
- Internet: $80
- Phone: $60
- Netflix: $15
= $2,005

**March 2026:**
- Rent: $1,500
- Car Payment: $350
- Electric: $120
- Internet: $80
- Phone: $60
- Netflix: $15
= $2,125

...and so on for each month

### Step 3: Average the Months
```
Average = (Feb + Mar + Apr + May + Jun + Jul) / 6
Average = ($2,005 + $2,125 + $2,005 + $2,125 + $2,005 + $2,125) / 6
Average = $2,065/month
```

### Step 4: Calculate Goals
```
2 Month Goal = $2,065 × 2 = $4,130
6 Month Emergency Fund = $2,065 × 6 = $12,390
```

---

## 💡 Why This Is Better

### 1. Reflects Current Reality
If you just set up recurring payments for all your bills, the goals immediately reflect your actual monthly burden.

**Example:**
- You add $3,000/month in recurring bills
- Goals update instantly to reflect $6,000 (2 months) and $18,000 (6 months)
- Not based on old data or incomplete information

### 2. Forward-Looking
Goals are based on what you WILL owe, not what you used to owe.

**Example:**
- Rent increases from $1,500 to $1,800 in March
- You update the March payment
- Goals recalculate to include the higher rent
- You know you need more savings to stay ahead

### 3. Handles Missing Months Gracefully
If some future months have no payments yet:
- Uses months that DO have payments for average
- Doesn't penalize you for not planning 6 months out

**Example:**
- Next 2 months have full recurring payments ($3,000/month)
- Months 3-6 are empty
- Average = ($3,000 + $3,000) / 2 = $3,000/month
- Goals based on $3,000/month (realistic)

### 4. Responds to Changes Immediately
Add, edit, or delete payments → Goals update automatically.

**Example:**
- Cancel Netflix ($15/month recurring)
- All future months reduce by $15
- New average: $3,118/month (was $3,133)
- Goals adjust down slightly

---

## 📈 Real-World Scenarios

### Scenario 1: Just Starting Out

**Situation:**
- Only added this month's rent ($1,500)
- No recurring payments yet
- No future months populated

**Result:**
```
Upcoming 6 months:
- This month: $1,500
- Next 5 months: $0 each

Average = $1,500 / 1 month = $1,500/month
2 Month Goal = $3,000
6 Month Goal = $9,000

Status: "Based on next 1 months avg: $1,500/mo"
```

**As you add more:**
- Add recurring rent (next 3 months)
- Average = $1,500/month (4 months of data)
- Goals stay at $3,000 and $9,000
- Status updates: "Based on next 4 months avg: $1,500/mo"

### Scenario 2: Fully Populated

**Situation:**
- Set up all recurring bills for 6 months
- Realistic monthly obligations

**Result:**
```
Upcoming 6 months:
- Month 1: $2,800
- Month 2: $2,900 (electric higher in summer)
- Month 3: $2,850
- Month 4: $2,900
- Month 5: $2,850
- Month 6: $2,900

Average = $2,867/month
2 Month Goal = $5,734
6 Month Goal = $17,202

Status: "Based on next 6 months avg: $2,867/mo"
```

**Accuracy:** Very high - reflects actual upcoming obligations

### Scenario 3: Variable Months

**Situation:**
- Some months have more bills than others
- Holiday spending in December
- Car insurance every 6 months

**Result:**
```
Upcoming 6 months:
- Feb: $3,000 (normal)
- Mar: $3,000 (normal)
- Apr: $3,000 (normal)
- May: $3,600 (car insurance $600)
- Jun: $3,000 (normal)
- Jul: $3,000 (normal)

Average = $3,100/month
2 Month Goal = $6,200
6 Month Goal = $18,600

Status: "Based on next 6 months avg: $3,100/mo"
```

**Benefit:** Accounts for the insurance spike, goals are higher than if it was just $3,000/month

### Scenario 4: Seasonal Changes

**Situation:**
- Electric bill varies by season
- Higher in summer (AC) and winter (heat)

**Result:**
```
Upcoming 6 months (summer):
- Jun: $3,150 (high electric)
- Jul: $3,200 (high electric)
- Aug: $3,180 (high electric)
- Sep: $3,050 (moderate)
- Oct: $3,000 (moderate)
- Nov: $3,000 (moderate)

Average = $3,097/month
Goals: $6,194 (2mo) and $18,582 (6mo)

vs

Upcoming 6 months (winter):
- Dec: $3,100 (high heating)
- Jan: $3,150 (high heating)
- Feb: $3,000 (moderate)
- Mar: $3,000 (moderate)
- Apr: $2,950 (low)
- May: $2,950 (low)

Average = $3,025/month
Goals: $6,050 (2mo) and $18,150 (6mo)
```

**Benefit:** Goals adjust seasonally based on actual upcoming costs

---

## 🎓 Understanding the Status Messages

### 2 Month Goal Status
```
"💪 65% there! $2,100.00 to go (Based on next 4 months avg: $3,000/mo)"
```

**Breaking it down:**
- `65% there!` - You've saved 65% of the 2-month goal
- `$2,100.00 to go` - You need $2,100 more to reach the goal
- `Based on next 4 months avg` - Only 4 of the 6 upcoming months have payments
- `$3,000/mo` - Your average monthly obligation

**What it means:**
- Goal is dynamic and updates as you add/remove payments
- Based on realistic upcoming obligations
- Only months with actual payments are counted

### 6 Month Goal Status
```
"📊 2.3 months covered. $10,500.00 to reach 6 months. (Avg: $3,000/mo)"
```

**Breaking it down:**
- `2.3 months covered` - Current savings covers 2.3 months of expenses
- `$10,500.00 to reach 6 months` - Amount needed for full 6-month fund
- `Avg: $3,000/mo` - Your average monthly obligation

**What it means:**
- You can survive 2.3 months on current savings
- Based on realistic $3,000/month obligation
- Need $10,500 more to survive 6 months

---

## 🚀 How to Use This

### Step 1: Set Up Recurring Payments
```
Add all your monthly bills as recurring:
- Rent
- Car payment
- Insurance
- Utilities (if fixed)
- Subscriptions
- Phone/Internet

Set to create 3-6 months ahead
```

**Result:** Upcoming months populated with realistic obligations

### Step 2: Check Your Goals
```
Look at Dashboard > Financial Goals
See your 2 Month and 6 Month targets

Example:
- 2 Month Goal: $6,200
- 6 Month Goal: $18,600
```

### Step 3: Update Your Savings
```
Input your current savings:
- 2 Month buffer: $4,000 (entered)
- Emergency fund: $8,000 (entered)

See progress:
- 2 Month: 64% (need $2,200 more)
- 6 Month: 43% (need $10,600 more)
```

### Step 4: Track Progress
```
As you save:
- Update savings amounts monthly
- Watch progress bars fill up
- See "months covered" increase

When bills change:
- Update payments
- Goals recalculate automatically
- Adjust savings target if needed
```

---

## 🔔 When Goals Change

Goals update automatically when:

### ✅ You Add a Payment
- Add recurring rent for 6 months
- Average increases
- Goals increase

### ✅ You Edit a Payment
- Rent increases from $1,500 to $1,800
- All future months update
- Average increases
- Goals increase

### ✅ You Delete a Payment
- Cancel Netflix subscription
- Future months decrease
- Average decreases
- Goals decrease

### ✅ Time Passes
- Current month becomes previous month
- New future month enters the 6-month window
- Average recalculates
- Goals may change

### ✅ You Mark Payments as Paid
- Paid payments don't count toward future obligations
- Average may change if that month had unique payments
- Goals adjust

---

## 💭 Common Questions

**Q: Why does my goal change when I mark a payment as paid?**
A: If that payment was part of the next 6 months calculation, removing it (by marking paid) changes the average. Usually minimal impact if you have recurring payments.

**Q: Why is my average based on "next 3 months" not 6?**
A: Only 3 of the next 6 months have payments. The system uses months with actual data to avoid inflating the average with $0 months.

**Q: Should I populate all 6 months ahead?**
A: Recommended! More data = more accurate goals. But 3 months is usually sufficient for good accuracy.

**Q: What if I have a huge payment one month (like car insurance)?**
A: That's good! The average includes it, so your goals account for it. Your emergency fund needs to cover those spikes.

**Q: Can I manually override the calculation?**
A: No, goals are fully automatic based on your actual payments. To change them, add/edit your payment data.

**Q: How often do goals recalculate?**
A: Every time the dashboard renders - so basically whenever you add/edit/delete payments or refresh the page.

---

## 📊 Example Timeline

### Month 1: Just Started
```
Payments:
- Feb: $1,500 (rent only)

Goals:
- 2 Month: $3,000 ($1,500 × 2)
- 6 Month: $9,000 ($1,500 × 6)
- Based on: 1 month
```

### Month 1: Added Recurring Bills
```
Payments:
- Feb: $3,000
- Mar: $3,000
- Apr: $3,000

Goals:
- 2 Month: $6,000 ($3,000 × 2)
- 6 Month: $18,000 ($3,000 × 6)
- Based on: 3 months
```

### Month 2: Next Month Starts
```
Payments:
- Mar: $3,000 (now current)
- Apr: $3,000
- May: $3,000 (auto-created)

Goals:
- 2 Month: $6,000 (still $3,000/mo average)
- 6 Month: $18,000
- Based on: 3 months
```

### Month 3: Rent Increase
```
Payments:
- Apr: $3,000
- May: $3,300 (rent increased $300)
- Jun: $3,300
- Jul: $3,300

Goals:
- 2 Month: $6,450 ($3,225 × 2)
- 6 Month: $19,350 ($3,225 × 6)
- Based on: 4 months
```

---

## ✨ Benefits Summary

1. ✅ **Accurate** - Based on real upcoming obligations
2. ✅ **Forward-looking** - What you WILL owe, not what you owed
3. ✅ **Dynamic** - Updates automatically as payments change
4. ✅ **Transparent** - Shows which months and average used
5. ✅ **Realistic** - Accounts for seasonal variations
6. ✅ **Actionable** - Clear targets based on actual needs

---

**Your goals now reflect reality!** 🎯
