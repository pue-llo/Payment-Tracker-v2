# Payment Tracker Pro v2.0

A powerful, self-hosted payment tracking application with a beautiful dark mode interface, comprehensive financial insights, and advanced calendar management features.

## 🎉 Version 2.0 - What's New

### Phase 1: Core Infrastructure
- **Event Bus System** - Decoupled architecture for real-time updates across all components
- **Toast Notification System** - Beautiful, non-intrusive notifications with undo support

### Phase 2: Enhanced User Experience
- **Inline Editing** - Edit payments directly in the list without opening modals
- **Smart Auto-Refresh** - Stay on your current tab and maintain scroll position when making changes

### Phase 3: Advanced Analytics
- **Charts & Insights Dashboard** - Visual analytics with Chart.js integration
- **Cash Flow Projection** - See your financial future with monthly projections
- **Payment Trends** - Track spending patterns over time

### Phase 4: Calendar Enhancements
- **Live Calendar Cell Updates** - Real-time calendar updates when payments change
- **Drag-to-Reschedule** - Drag payments between calendar dates to reschedule
- **Agenda View** - List view of upcoming payments sorted by date
- **ICS Calendar Export** - Export payments to your favorite calendar app (Google Calendar, Apple Calendar, etc.)

### Phase 5: Productivity Features
- **Command Palette (Global Search)** - Press `Ctrl+K` or `Cmd+K` to quickly search and navigate
- **Payment Templates** - Save common payments as templates for quick entry
- **Mobile Card Layout** - Optimized responsive design for mobile devices

## ✨ Key Features

### 📊 Dashboard
- Real-time statistics and financial overview
- Visual charts for spending trends
- Cash flow projections
- Goal tracking with progress indicators

### 📅 Calendar View
- Monthly calendar with payment indicators
- Dollar amounts displayed on each date
- Drag-and-drop rescheduling
- Color-coded status indicators (pending/paid)
- Monthly expense totals

### 💰 Payment Management
- Track payments you owe and payments owed to you
- Multiple payment categories (Personal, Business, Emergency, etc.)
- Recurring payment support
- Partial payment tracking
- Payment history and audit trail

### 🎯 Goals & Savings
- Dynamic savings goals
- Progress tracking
- Two-month and six-month savings projections
- Emergency fund tracking

### 📱 Progressive Web App (PWA)
- Install as a home screen app
- Offline support via service workers
- Cloud sync capability (JSONBin.io integration)
- Responsive mobile design

### 🔍 Search & Filter
- Global command palette (`Ctrl+K` / `Cmd+K`)
- Filter by person, category, status, date range
- Quick search across all payments

### 📤 Export & Import
- Export data as JSON
- Import from previous versions
- ICS calendar export
- Data backup and restore

## 🚀 Quick Start

### Option 1: Direct Use
1. Open `payment-tracker-v2.1.html` in your web browser
2. Start adding payments!

### Option 2: Self-Hosted Setup
1. Upload `payment-tracker-v2.1.html`, `manifest.json`, and `sw.js` to your web server
2. Ensure HTTPS is enabled (required for PWA features)
3. Access via your domain

### Option 3: Cloud Sync Setup
1. Create a free account at [JSONBin.io](https://jsonbin.io)
2. Create a new bin and copy your API key
3. Open the app and configure cloud sync in settings
4. Your data will sync across all devices

## 📋 Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- HTTPS (for PWA and service worker features)
- No server-side code required - pure HTML/CSS/JavaScript

## 🎨 Design

- **Dark Mode Only** - Premium dark blue theme optimized for extended use
- **Glassmorphism** - Modern glass-effect UI elements
- **Smooth Animations** - Polished transitions and interactions
- **Accessible** - Keyboard navigation and screen reader support

## ⌨️ Keyboard Shortcuts

- `Ctrl+K` / `Cmd+K` - Open command palette
- `N` - Add new payment
- `Esc` - Close modals/dialogs
- `?` - Show keyboard shortcuts help

## 📁 File Structure

```
├── payment-tracker-v2.1.html    # Main application file (CURRENT VERSION) ⭐
├── payment-tracker-v2.0.html    # Previous version
├── manifest.json                 # PWA manifest
├── sw.js                         # Service worker for offline support
├── vercel.json                   # Vercel deployment configuration
└── README.md                     # This file
```

### Main Application File

**`payment-tracker-v2.1.html`** - This is the current, production-ready version of Payment Tracker Pro. It's a single HTML file containing all the code, styles, and functionality. Simply open it in your browser to use it. No build process or installation required!

## 🔄 Migration from Previous Versions

Your existing data is fully compatible! Simply:
1. Export your data from previous versions (if needed)
2. Open v2.1
3. Import your data (if exported)
4. All your payments, goals, and settings will be preserved

**Note:** v2.1 is fully compatible with v2.0 data - no migration needed!

## 🛠️ Technical Details

- **Pure JavaScript** - No frameworks, no build process required
- **LocalStorage** - Data stored locally in your browser
- **Chart.js** - For beautiful, interactive charts
- **Service Workers** - For offline functionality and caching
- **Event-Driven Architecture** - Clean, maintainable code structure

## 📝 Version History

### v2.1 (Current) - `payment-tracker-v2.1.html` ⭐

**Release Date:** February 2026

**What's New:**
- Latest stable release with all v2.0 features
- Bug fixes and performance improvements
- Enhanced stability and reliability

**All Features from v2.0:**
- **Complete UI Overhaul** - Glassmorphism design with premium dark blue theme
- **Event Bus System** - Decoupled architecture for real-time updates across all components
- **Toast Notification System** - Beautiful, non-intrusive notifications with undo support
- **Inline Editing** - Edit payments directly in the list without opening modals
- **Smart Auto-Refresh** - Stay on your current tab and maintain scroll position when making changes
- **Advanced Charts & Analytics** - Visual analytics with Chart.js integration
- **Cash Flow Projection** - See your financial future with monthly projections
- **Live Calendar Cell Updates** - Real-time calendar updates when payments change
- **Drag-to-Reschedule** - Drag payments between calendar dates to reschedule
- **Agenda View** - List view of upcoming payments sorted by date
- **ICS Calendar Export** - Export payments to your favorite calendar app (Google Calendar, Apple Calendar, etc.)
- **Command Palette (Global Search)** - Press `Ctrl+K` or `Cmd+K` to quickly search and navigate
- **Payment Templates** - Save common payments as templates for quick entry
- **Mobile-Optimized Card Layout** - Optimized responsive design for mobile devices

**Technical Improvements:**
- Event-driven architecture
- Improved performance and code organization
- Enhanced PWA capabilities
- Better error handling

---

### v2.0 - `payment-tracker-v2.0.html`

**Release Date:** February 2026

**Major Features:**
- **Complete UI Overhaul** - Glassmorphism design with premium dark blue theme
- **Event Bus System** - Decoupled architecture for real-time updates across all components
- **Toast Notification System** - Beautiful, non-intrusive notifications with undo support
- **Inline Editing** - Edit payments directly in the list without opening modals
- **Smart Auto-Refresh** - Stay on your current tab and maintain scroll position when making changes
- **Advanced Charts & Analytics** - Visual analytics with Chart.js integration
- **Cash Flow Projection** - See your financial future with monthly projections
- **Live Calendar Cell Updates** - Real-time calendar updates when payments change
- **Drag-to-Reschedule** - Drag payments between calendar dates to reschedule
- **Agenda View** - List view of upcoming payments sorted by date
- **ICS Calendar Export** - Export payments to your favorite calendar app (Google Calendar, Apple Calendar, etc.)
- **Command Palette (Global Search)** - Press `Ctrl+K` or `Cmd+K` to quickly search and navigate
- **Payment Templates** - Save common payments as templates for quick entry
- **Mobile-Optimized Card Layout** - Optimized responsive design for mobile devices

**Technical Improvements:**
- Event-driven architecture
- Improved performance and code organization
- Enhanced PWA capabilities
- Better error handling

---

### v1.2 - `payment-tracker-v1.2.html`

**Release Date:** January 2026

**Features:**
- Enhanced dashboard with trend indicators
- Improved goal progress tracking
- Better calendar view with dollar amounts
- UI refinements and bug fixes

---

### v1.1 - `payment-tracker-v1.1.html`

**Release Date:** January 2026

**Major Features:**
- **Monthly Expense Totals** - See total expenses per month at a glance in the calendar view
- **Recurring Payments** - Automatically create monthly bills with one setup
  - Support for Monthly, Bi-weekly, and Weekly frequencies
  - Configurable look-ahead (1, 2, 3, 6, or 12 months)
- **Dynamic Goals** - Goals now calculate based on actual upcoming 6 months of obligations instead of historical averages
- **Emergency Expense Tracking** - Track unexpected costs separately (Medical, Car/Vehicle, Home Repair, Other)
- **Dashboard Enhancements:**
  - Month-over-month trend indicators (↑↓) with percentage changes
  - Enhanced goal progress with milestones (25%, 50%, 75%)
  - Required monthly savings calculations
  - Enhanced calendar view with better visual indicators

**Bug Fixes:**
- Fixed DOM element access errors (null checks added to all render functions)
- Fixed recurring payment ID generation (now uses proper integer IDs)
- Fixed recurring payment date edge cases (handles months with fewer days correctly)
- Improved error handling and data validation

**Files:** `payment-tracker-v1.1.html`, `payment-tracker-v1.1-test.html`, `payment-tracker-v1.1-backup.html`

---

### v1.0 - Initial Release

**Release Date:** December 2025 / January 2026

**Core Features:**
- Basic payment tracking (I Owe / Owed to Me)
- Calendar view with payment indicators
- Dashboard statistics
- Payment categories (Personal, Business, Emergency, etc.)
- Payment status tracking (Pending/Paid)
- Partial payment support
- Payment history and audit trail
- Export/Import functionality
- LocalStorage data persistence
- Basic goal tracking
- Heatmap visualization
- Search and filter capabilities

**Foundation:**
- Pure HTML/CSS/JavaScript (no frameworks)
- Progressive Web App (PWA) support
- Service Worker for offline functionality
- Responsive design

---

## 📦 Previous Version Files

The following files are available in the repository for reference but are not the current version:

- `payment-tracker-v1.1.html` - Version 1.1 with recurring payments and monthly totals
- `payment-tracker-v1.2.html` - Version 1.2 with enhanced dashboard
- Various backup and test files (excluded from git via .gitignore)

**Note:** Always use `payment-tracker-v2.1.html` for the latest features and improvements!

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

Free to use and modify for personal use.

## 🙏 Acknowledgments

- Chart.js for beautiful charts
- JSONBin.io for cloud sync capabilities
- All the open-source tools that made this possible

---

**Made with ❤️ for better financial management**
