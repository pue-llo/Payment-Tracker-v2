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
1. Open `payment-tracker-v2.0.html` in your web browser
2. Start adding payments!

### Option 2: Self-Hosted Setup
1. Upload `payment-tracker-v2.0.html`, `manifest.json`, and `sw.js` to your web server
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
├── payment-tracker-v2.0.html    # Main application file
├── manifest.json                 # PWA manifest
├── sw.js                         # Service worker for offline support
├── assets/                       # Compiled assets (if using build process)
└── README.md                     # This file
```

## 🔄 Migration from v1.x

Your existing data is fully compatible! Simply:
1. Export your data from v1.x (if needed)
2. Open v2.0
3. Import your data (if exported)
4. All your payments, goals, and settings will be preserved

## 🛠️ Technical Details

- **Pure JavaScript** - No frameworks, no build process required
- **LocalStorage** - Data stored locally in your browser
- **Chart.js** - For beautiful, interactive charts
- **Service Workers** - For offline functionality and caching
- **Event-Driven Architecture** - Clean, maintainable code structure

## 📝 Version History

### v2.0 (Current)
- Complete UI overhaul with glassmorphism design
- Event bus system for real-time updates
- Toast notifications
- Inline editing
- Advanced charts and analytics
- Drag-to-reschedule payments
- ICS calendar export
- Command palette
- Payment templates
- Mobile-optimized layout

### v1.1
- Monthly expense totals
- Recurring payments

### v1.0
- Initial release
- Basic payment tracking
- Calendar view
- Dashboard statistics

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
