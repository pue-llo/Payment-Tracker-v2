# Payment Day Heatmap - Redesigned 4x7 Layout

## Overview

The payment heatmap has been redesigned with a clean, minimal 4x7 grid layout and an 8-color gradient from green to red, making it easier to visualize when your bills are due throughout the month.

## Design Changes

### Old Design ❌
- 31 cells (one for each possible day)
- 6 intensity levels (0-5)
- All green color scheme
- Based on payment count

### New Design ✅
- **4 rows × 7 columns = 28 cells**
- **8 intensity levels (0-7)**
- **Green → Yellow → Orange → Red gradient**
- **Based on payment amount** (not just count)

## Visual Layout

```
┌────┬────┬────┬────┬────┬────┬────┐
│ 1  │ 2  │ 3  │ 4  │ 5  │ 6  │ 7  │
├────┼────┼────┼────┼────┼────┼────┤
│ 8  │ 9  │ 10 │ 11 │ 12 │ 13 │ 14 │
├────┼────┼────┼────┼────┼────┼────┤
│ 15 │ 16 │ 17 │ 18 │ 19 │ 20 │ 21 │
├────┼────┼────┼────┼────┼────┼────┤
│ 22 │ 23 │ 24 │ 25 │ 26 │ 27 │ 28 │
└────┴────┴────┴────┴────┴────┴────┘
```

**Note:** Days 29-31 are not shown but are still tracked in the stats below the heatmap.

## Color Gradient (8 Levels)

### Light Mode
| Level | Color | Meaning | Example |
|-------|-------|---------|---------|
| 0 | 🔲 Gray | No payments | Empty day |
| 1 | 💚 Light Green | Very low | $50 bill |
| 2 | 💚 Green | Low | $100 bill |
| 3 | 💚 Dark Green | Moderate | $200 bill |
| 4 | 💛 Yellow | Getting High | $400 bill |
| 5 | 🧡 Orange | High | $600 bill |
| 6 | 🔶 Dark Orange | Very High | $800 bill |
| 7 | 🔴 Red | Extreme | $1000+ bill |

### Dark Mode
Same gradient but with adjusted colors for better contrast on dark backgrounds.

## How Intensity is Calculated

### Based on Amount, Not Count
**Before:** If you had 3 small $10 bills on one day, it would show as high intensity.
**Now:** Intensity is based on the dollar amount, so 3 × $10 = $30 shows as low intensity.

### Calculation Logic
```javascript
// Find the maximum total amount across all days
maxTotal = highest dollar amount on any single day

// For each day:
ratio = dayTotal / maxTotal
intensity = Math.ceil(ratio × 7)  // Results in 0-7

Examples:
- Day with $100 when max is $1000 → ratio: 0.1 → intensity: 1 (light green)
- Day with $500 when max is $1000 → ratio: 0.5 → intensity: 4 (yellow)
- Day with $1000 when max is $1000 → ratio: 1.0 → intensity: 7 (red)
```

## Interactive Features

### Hover Effect
- **Scale up** - Cell grows 15% on hover
- **Shadow** - Adds depth with box shadow
- **Tooltip** - Shows exact details

### Tooltip Information
Hover over any day to see:
```
Day 15: 2 payment(s), $450.00
```

Or for empty days:
```
Day 8: No payments
```

## Color Codes (Exact Values)

### Light Mode
```css
intensity-0: #f0f0f0 (Gray - No payments)
intensity-1: #a8e6a3 (Light Green)
intensity-2: #7dd977 (Green)
intensity-3: #4ccc44 (Dark Green)
intensity-4: #ffeb3b (Yellow)
intensity-5: #ff9800 (Orange)
intensity-6: #ff5722 (Dark Orange)
intensity-7: #d32f2f (Red)
```

### Dark Mode
Adjusted for better contrast with dark backgrounds while maintaining the same gradient flow.

## Stats Below Heatmap

The heatmap displays three key statistics:

1. **Heaviest day** - Day with the most dollar amount
2. **Most bills** - Day with the most individual payments
3. **Total days with bills** - How many days have at least one payment

**Example:**
```
Heaviest day: 15th ($450.00)
Most bills: 15th (3 payments)
Total days with bills: 8 days
```

## Use Cases

### Scenario 1: Evenly Distributed Bills
```
All days show green (1-3) → Good distribution
Bills spread throughout the month
Easy to manage cash flow
```

### Scenario 2: Clustered Bills
```
Days 1-5: Red (7)
Days 15-20: Orange (5-6)
Other days: Green/Gray (0-2)
→ Bills clustered at start and mid-month
→ May need to negotiate different due dates
```

### Scenario 3: End-of-Month Spike
```
Days 25-28: Red/Orange (6-7)
Other days: Green (1-3)
→ Most bills due at month end
→ Should save more at month start
```

## Benefits

### Visual Clarity
✅ **At-a-glance understanding** - See your payment pattern instantly
✅ **Color coding** - Green = safe, Red = attention needed
✅ **Minimal design** - Clean 4x7 grid is easy to scan

### Actionable Insights
💡 **Identify clusters** - See which days have heavy payment loads
💡 **Plan cash flow** - Know when you need more liquidity
💡 **Negotiate dates** - Move bills from red days to green days

### Better Than Count-Based
📊 **Amount matters** - $1000 on one day is more important than 5 × $10
📊 **True priority** - High dollar amounts show in red
📊 **Realistic view** - Reflects actual financial impact

## Technical Details

### Grid System
```css
.heatmap-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 0.5rem;
    max-width: 600px;
}
```

### Responsive Design
- **Desktop**: Full 600px width grid
- **Mobile**: Scales down proportionally
- **Maintains aspect ratio**: Each cell stays square

### Performance
- **Efficient rendering**: Only 28 cells vs 31
- **CSS-based colors**: No JavaScript color calculations
- **Smooth animations**: Hardware-accelerated transforms

## Future Enhancements

Possible improvements:
- 📅 Show week labels (Sun, Mon, Tue...)
- 🎨 Custom color themes
- 📊 Compare month-to-month patterns
- 💾 Export heatmap as image
- 📈 Show trend over multiple months

## Example Scenarios

### Example 1: Rent-Heavy Start of Month
```
Day 1: 🔴 $1,200 (Rent)
Day 5: 🧡 $400 (Car payment + insurance)
Day 15: 💛 $200 (Utilities)
Day 20: 💚 $100 (Subscriptions)
```
**Visual**: First week is red/orange, then calms to yellow/green

---

### Example 2: Evenly Distributed
```
Days 5, 10, 15, 20, 25: 💚 $150-200 each
Other days: 🔲 No payments
```
**Visual**: Nice green pattern throughout month

---

### Example 3: Month-End Crunch
```
Days 1-20: 💚 Light activity
Days 25-28: 🔴🧡 Heavy payments ($1500 total)
```
**Visual**: Starts green, ends red - need better planning!

## Comparison: Before vs After

### Before (31 cells, count-based, all green)
❌ Hard to see which days are actually heavy
❌ 5 small bills looked the same as 1 large bill
❌ Too many cells to scan quickly
❌ All green made it hard to prioritize

### After (28 cells, amount-based, gradient)
✅ Immediately see high-dollar days in red
✅ Amount-based shows true financial impact
✅ Cleaner 4x7 grid is easier to scan
✅ Gradient guides attention to problem areas

## Summary

The redesigned payment heatmap gives you a **powerful visual tool** to understand your payment distribution throughout the month. The green-to-red gradient instantly shows which days need your attention, helping you plan better and avoid cash flow crunches.

**Key Takeaway:** Red days = heavy payment days. Green days = light payment days. Plan accordingly! 📊💡
