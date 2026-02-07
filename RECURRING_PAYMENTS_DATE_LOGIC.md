# Recurring Payments - Date Logic Explanation

## The Problem

When creating recurring monthly payments, there's an edge case where the payment day doesn't exist in certain months:

**Example:**
- Payment is due on the **31st** of each month
- February only has **28 days** (29 in leap years)
- March, April, June, September, November only have **30 days**

**What should happen?** The payment should still appear for those months, just on the last available day.

## The Solution

The updated logic now handles this intelligently:

### How It Works

1. **Store the original day** from the base payment (e.g., 31st)
2. **For each month**, check if that day exists
3. **If it doesn't exist**, use the **last day of that month** instead
4. **If it does exist**, use the original day

### Code Logic

```javascript
// Store the original day of month for monthly recurrence
const originalDayOfMonth = currentDate.getDate(); // e.g., 31

// When advancing to next month:
// 1. Get the last day of the target month
const lastDayOfMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

// 2. Use the smaller of: original day OR last day of month
const targetDay = Math.min(originalDayOfMonth, lastDayOfMonth);

// 3. Set the new date
currentDate = new Date(targetYear, targetMonth, targetDay);
```

## Examples

### Example 1: Payment Due on 31st

| Month | Original Day | Last Day | Payment Created On |
|-------|--------------|----------|-------------------|
| January | 31 | 31 | **Jan 31** ✅ |
| February | 31 | 28 | **Feb 28** ✅ (last day) |
| March | 31 | 31 | **Mar 31** ✅ |
| April | 31 | 30 | **Apr 30** ✅ (last day) |
| May | 31 | 31 | **May 31** ✅ |
| June | 31 | 30 | **Jun 30** ✅ (last day) |

### Example 2: Payment Due on 30th

| Month | Original Day | Last Day | Payment Created On |
|-------|--------------|----------|-------------------|
| January | 30 | 31 | **Jan 30** ✅ |
| February | 30 | 28 | **Feb 28** ✅ (last day) |
| March | 30 | 31 | **Mar 30** ✅ |
| April | 30 | 30 | **Apr 30** ✅ |

### Example 3: Payment Due on 15th (No Edge Case)

| Month | Original Day | Last Day | Payment Created On |
|-------|--------------|----------|-------------------|
| January | 15 | 31 | **Jan 15** ✅ |
| February | 15 | 28 | **Feb 15** ✅ |
| March | 15 | 31 | **Mar 15** ✅ |
| April | 15 | 30 | **Apr 15** ✅ |

## Weekly and Biweekly

For weekly and biweekly recurring payments, this logic **doesn't apply** because they're based on adding a fixed number of days (7 or 14), not months:

- **Weekly:** Always adds exactly 7 days
- **Biweekly:** Always adds exactly 14 days

## Benefits

✅ **No skipped months** - Every month gets a payment, even if the exact day doesn't exist
✅ **Predictable behavior** - Always uses the last day of month when the original day doesn't exist
✅ **User-friendly** - Matches how most billing systems handle this scenario
✅ **Maintains intent** - Payment still appears at the end of the month where it belongs

## Real-World Use Cases

### Rent Payment (Due on 31st)
- Your rent is $2000 due on the 31st of each month
- In February, it will automatically appear on Feb 28th (or 29th in leap years)
- You won't miss February's payment!

### Credit Card Payment (Due on 30th)
- Credit card payment due on the 30th
- February payment will appear on Feb 28th
- All other months will use the 30th as expected

### Utility Bill (Due on 15th)
- Since 15th exists in all months, no adjustment needed
- Works perfectly every month without any special handling

## Testing

To verify this works correctly:

1. Create a recurring payment with due date on **January 31st**
2. Set it to recur for **6 months**
3. Check the Payments tab - you should see:
   - Jan 31
   - Feb 28 (or 29 in leap year)
   - Mar 31
   - Apr 30
   - May 31
   - Jun 30

All payments should be present with appropriate dates! ✅
