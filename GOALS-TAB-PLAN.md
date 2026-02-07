# Goals Tab Design Plan
## "Focus Spotlight" - A Unique Vision-Driven Goals Experience

---

## 🎯 Design Concept: Focus Spotlight

A visually stunning goals interface where **one goal takes center stage** as your "Focus Goal" - displayed large with your uploaded image as a hero backdrop. Other goals orbit around it as sleek cards, creating a clear visual hierarchy of what matters most right now.

**The Unique Element:** Your focus goal becomes an immersive visual experience - the uploaded image fills the spotlight area with a subtle parallax effect, overlaid with your goal details in elegant glassmorphism cards.

---

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  GOALS                                           [+ Add Goal]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │              🔦 FOCUS SPOTLIGHT AREA                    │   │
│  │                                                         │   │
│  │    ┌─────────────────────────────────────────────┐     │   │
│  │    │  [Your Uploaded Image as Background]        │     │   │
│  │    │                                             │     │   │
│  │    │   ┌─────────────────────────────────┐      │     │   │
│  │    │   │  🏠 Dream Home                  │      │     │   │
│  │    │   │  Investment Goal                │      │     │   │
│  │    │   │                                 │      │     │   │
│  │    │   │  $45,000 / $100,000            │      │     │   │
│  │    │   │  ████████████░░░░░░░ 45%       │      │     │   │
│  │    │   │                                 │      │     │   │
│  │    │   │  [Update Progress] [Edit]       │      │     │   │
│  │    │   └─────────────────────────────────┘      │     │   │
│  │    │                                             │     │   │
│  │    └─────────────────────────────────────────────┘     │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ── Other Goals ─────────────────────────────────────────────   │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ [img thumb]  │  │ [img thumb]  │  │ [img thumb]  │          │
│  │ Tesla Model 3│  │ Japan Trip   │  │ 6-Month Fund │          │
│  │ Life Goal    │  │ Achievement  │  │ Investment   │          │
│  │ ████░░ 35%   │  │ ██░░░░ 15%   │  │ ██████░ 72%  │          │
│  │ [Set Focus]  │  │ [Set Focus]  │  │ [Set Focus]  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│           ┌──────────────┐                                     │
│           │     ➕       │                                     │
│           │  Add Goal    │                                     │
│           └──────────────┘                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Visual Design Elements

### Focus Spotlight Area
- **Hero Image**: User's uploaded image fills the background (16:9 aspect ratio recommended)
- **Gradient Overlay**: Dark gradient from bottom (for text readability)
- **Glassmorphism Info Card**: Floating card with goal details
- **Subtle Animation**: Gentle pulse glow around the spotlight border
- **Progress Ring**: Large circular progress indicator overlaid on image

### Goal Cards (Non-Focused)
- **Thumbnail Image**: Square crop of uploaded image
- **Compact Layout**: Name, category badge, mini progress bar
- **Hover Effect**: Slight lift + "Set as Focus" button appears
- **Click Action**: Opens edit modal or sets as focus (configurable)

### Category Badges
```
🏆 Achievement  → Gold/Amber gradient
💰 Investment   → Green gradient
🌟 Life Goal    → Purple/Pink gradient
```

---

## 📊 Goal Data Structure

```javascript
// Addition to data object
goals: [
    {
        id: 1706745600000,
        name: "Dream Home Down Payment",
        category: "investment",        // "achievement" | "investment" | "life"
        description: "Save for a 20% down payment on our forever home",
        targetAmount: 100000,
        currentAmount: 45000,
        image: "data:image/jpeg;base64,...",  // Base64 stored image
        imageThumb: "data:image/jpeg;base64,...", // Smaller thumbnail
        isFocused: true,               // Only one goal can be focused
        targetDate: "2027-06-01",      // Optional target date
        createdAt: "2024-01-15T10:30:00Z",
        notes: "Contributing $2,000/month from savings",
        milestones: [                  // Optional sub-milestones
            { amount: 25000, label: "25% there!", reached: true },
            { amount: 50000, label: "Halfway!", reached: false },
            { amount: 75000, label: "Almost there!", reached: false }
        ]
    }
]
```

---

## 🖼️ Image Upload Flow

### Add/Edit Goal Modal
1. **Drag & Drop Zone**: Large area with dashed border
2. **Or Click to Browse**: Standard file picker
3. **Image Preview**: Shows uploaded image with crop/adjust option
4. **Auto-Thumbnail**: Generates smaller version for card view
5. **Fallback**: Category-based default gradient if no image

### Technical Implementation
- Store as Base64 in localStorage (with size limits)
- Compress images client-side before storing (max 500KB)
- Generate thumbnail at 200x200 for cards
- Use FileReader API for upload handling

---

## ⚡ Interactions

### Focus Management
- **Set Focus**: Click "Set as Focus" on any card → animates to spotlight
- **Swap Focus**: New goal slides into spotlight, old one animates to card grid
- **Remove Focus**: Option to have no focused goal (spotlight shows "Set a Focus Goal" prompt)

### Progress Updates
- **Quick Update Button**: Opens mini-modal with just amount input
- **Full Edit**: Opens complete edit modal
- **Milestone Celebrations**: Toast notification when milestone reached

### Animations
- **Card to Spotlight**: Smooth scale + position transition
- **Progress Bar Fill**: Animated on render
- **Image Load**: Fade-in effect
- **Hover States**: Subtle lift + glow

---

## 📱 Responsive Behavior

### Desktop (> 1024px)
- Full spotlight layout as shown above
- 3 cards per row in grid

### Tablet (768px - 1024px)
- Spotlight takes 60% height
- 2 cards per row

### Mobile (< 768px)
- Spotlight becomes card-style (stacked)
- Focused goal has colored border highlight
- 1 card per row, swipeable

---

## 🔧 Implementation Phases

### Phase 1: Core Structure
- [ ] Add Goals tab button and container
- [ ] Create data structure with localStorage
- [ ] Build basic goal cards (no images yet)
- [ ] Implement add/edit/delete functions

### Phase 2: Focus Spotlight
- [ ] Build spotlight hero area
- [ ] Implement focus toggle mechanism
- [ ] Add spotlight-to-card animations
- [ ] Style glassmorphism overlay card

### Phase 3: Image Upload
- [ ] Create drag & drop upload zone
- [ ] Implement image compression
- [ ] Generate and store thumbnails
- [ ] Build image preview in modal

### Phase 4: Polish
- [ ] Add milestone tracking
- [ ] Progress update quick-action
- [ ] Celebration toasts
- [ ] Mobile responsive tweaks
- [ ] Empty state design

---

## 🎯 Empty State Design

When no goals exist:
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                         🎯                                  │
│                                                             │
│              What are you working towards?                  │
│                                                             │
│     Upload an image of your dream and start tracking        │
│              your journey to achieving it.                  │
│                                                             │
│              ┌─────────────────────────┐                   │
│              │   ➕ Create First Goal   │                   │
│              └─────────────────────────────┘               │
│                                                             │
│     💡 Ideas: Dream car, vacation, home, education,        │
│        emergency fund, retirement, side business           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Summary

This "Focus Spotlight" design creates an emotional connection to goals through:

1. **Visual Motivation**: See your dreams as images, not just numbers
2. **Clear Priority**: One focused goal keeps you centered
3. **Progress Satisfaction**: Beautiful progress indicators
4. **Flexibility**: Three goal categories for different life areas
5. **S-Tier Glassmorphism**: Matches existing Payment Tracker aesthetic
