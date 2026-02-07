# Payment Reminder Dashboard - Setup Instructions

## 📱 Complete Setup Guide for Self-Hosting with Phone Sync

### What You'll Get:
- ✅ Self-hosted on your own server
- ✅ Install as home screen app on iPhone/Android
- ✅ Automatic cloud sync between all devices
- ✅ Works offline with service worker caching
- ✅ All data syncs in real-time

---

## 🚀 Step 1: Upload to Your Server

1. **Upload these 4 files to your web server:**
   - `index.html` (main app file)
   - `manifest.json` (PWA configuration)
   - `sw.js` (service worker for offline support)
   - This `SETUP-INSTRUCTIONS.md` (optional)

2. **Server Requirements:**
   - Must support HTTPS (required for PWA and service workers)
   - Any web hosting works: Apache, Nginx, shared hosting, etc.
   - No server-side code needed - pure HTML/JavaScript

3. **Upload Methods:**
   - FTP/SFTP
   - cPanel File Manager
   - Git deploy
   - Whatever your hosting supports

---

## ☁️ Step 2: Setup Cloud Sync (JSONBin.io)

### Why JSONBin.io?
- Free tier: 100 API requests/month (plenty for personal use)
- No credit card required
- Simple REST API
- Perfect for syncing between devices

### Setup Instructions:

1. **Create Account:**
   - Go to [jsonbin.io](https://jsonbin.io)
   - Click "Sign Up" (free account)
   - Verify your email

2. **Create a Bin:**
   - After login, click "Create Bin"
   - Name it: "payment-tracker-data"
   - Initial content: `{"payments": []}`
   - Click "Create"

3. **Get Your Credentials:**
   - **Bin URL**: Look at the top of your bin page
     - Format: `https://api.jsonbin.io/v3/b/YOUR_BIN_ID`
     - Example: `https://api.jsonbin.io/v3/b/65f9a8b2c8e7a2f0a1234567`
   - **Master Key**: Click your profile → "API Keys" → Copy "Master Key"
     - Format: `$2a$10$abc123...` (long string)

4. **Configure in the App:**
   - Open your hosted app
   - Click the ⚙️ Settings icon (top right)
   - Paste your Bin URL and Master Key
   - Click "Save & Sync"

---

## 📱 Step 3: Install on Your Phone

### For iPhone (iOS):

1. **Open in Safari** (must use Safari, not Chrome!)
   - Navigate to your app URL: `https://yourdomain.com/`

2. **Add to Home Screen:**
   - Tap the Share button (square with arrow)
   - Scroll down and tap "Add to Home Screen"
   - Tap "Add" in the top right
   - App icon will appear on your home screen!

3. **Launch:**
   - Tap the app icon from your home screen
   - It opens in fullscreen mode (no Safari UI)
   - Data syncs automatically

### For Android:

1. **Open in Chrome:**
   - Navigate to your app URL: `https://yourdomain.com/`

2. **Install Prompt:**
   - You'll see a banner: "Install app on your home screen?"
   - Tap "Install"

   OR manually:
   - Tap the ⋮ menu (three dots)
   - Select "Add to Home screen"
   - Tap "Add"

3. **Launch:**
   - Tap the app icon from your home screen
   - Opens as standalone app
   - Data syncs automatically

---

## 🔄 Step 4: Sync Between Devices

### How Sync Works:
- **Automatic Push**: Every time you add/edit/delete a payment, it syncs to the cloud
- **Auto Pull**: App checks for updates every 60 seconds
- **Manual Sync**: Click Settings → "Pull Data" to force sync

### Setting Up Second Device:

1. **On Computer:**
   - Open browser, go to your app URL
   - Click Settings (⚙️ icon)
   - Enter same Bin URL and Master Key
   - Click "Pull Data" to download existing payments

2. **On Phone:**
   - Install app (see Step 3)
   - Open Settings (⚙️ icon)
   - Enter same Bin URL and Master Key
   - Click "Pull Data"

3. **Done!**
   - All devices now sync automatically
   - Changes on one device appear on all others within 1 minute

### Sync Status Indicator:
- **"Auto-sync on"** = Connected, waiting
- **"Syncing..."** = Uploading changes
- **"Synced"** = Successfully synced
- **"Sync Error"** = Check your internet/credentials

---

## 💡 Usage Tips

### Adding Your First Payment:
1. Click "Add Payment" button
2. Fill in:
   - Payment Name (e.g., "Dinner money")
   - Person (who owes or who you owe)
   - Amount
   - Due Date
   - Type (Owed to Me / I Owe)
   - Optional: Category, Recurring schedule
3. Click "Add Payment"
4. Watch it sync to cloud automatically!

### Using Recurring Payments:
- Set "Recurring" to Weekly/Monthly/Yearly
- When you mark a recurring payment as "Paid"
- A new payment is automatically created with the next due date
- Perfect for regular IOUs or loan repayments

### Views:
- **Dashboard**: See overview, charts, and upcoming payments
- **Calendar**: Visual timeline of all due dates
- **All Payments**: Complete list with edit/delete options

---

## 🔧 Troubleshooting

### Sync Not Working?
1. Check your internet connection
2. Verify Bin URL and Master Key are correct
3. Make sure you're using HTTPS (not HTTP)
4. Check JSONBin.io - you might have hit rate limit (100 requests/month on free tier)

### App Won't Install on iPhone?
- Must use Safari browser (not Chrome/Firefox)
- Must be accessed via HTTPS
- Try closing Safari and opening again

### App Won't Install on Android?
- Must use Chrome browser
- Must be accessed via HTTPS
- Check if you dismissed the install prompt - you can trigger it again by going to Chrome menu → "Add to Home screen"

### Data Not Syncing Between Devices?
1. Make sure all devices use the SAME Bin URL and Master Key
2. Click "Pull Data" on the device that's missing data
3. Wait 60 seconds for auto-sync to kick in
4. Check sync status indicator (top right)

### Lost Your Data?
- Data is stored in 3 places:
  1. Browser localStorage (local backup)
  2. JSONBin.io cloud (synced backup)
  3. Other devices (if you set them up)
- Click "Pull Data" to restore from cloud
- If you cleared browser data, sync from another device or JSONBin.io

---

## 🔐 Security & Privacy

### Your Data:
- Stored locally in browser localStorage
- Synced to YOUR private JSONBin bin
- Master Key required to access
- Never shared with anyone else
- HTTPS encryption in transit

### Best Practices:
- Don't share your Master Key
- Use a strong password for JSONBin.io
- Keep backup of your Bin URL and Master Key somewhere safe
- Consider using a password manager

---

## 📊 Features Summary

✅ **Payment Management**
- Add, edit, delete IOUs and loans
- Track who owes you vs. who you owe
- Categories and notes

✅ **Smart Tracking**
- Automatic overdue detection
- Status tracking (Paid/Pending/Overdue)
- Visual color indicators

✅ **Calendar View**
- Monthly calendar showing all payments
- Color-coded by type
- Navigate between months

✅ **Analytics**
- Total owed to you vs. total you owe
- Net balance calculation
- Charts by person and category
- Upcoming payments list

✅ **Recurring Payments**
- Weekly, monthly, or yearly
- Auto-generates next payment when marked paid

✅ **Cloud Sync**
- Real-time sync between all devices
- Automatic every 60 seconds
- Manual sync available
- Sync status indicator

✅ **PWA Features**
- Install on home screen
- Works offline
- Full-screen app experience
- Fast loading with service worker

---

## 🆘 Need Help?

### Common Questions:

**Q: Can I use a different sync service instead of JSONBin?**
A: Yes! The app uses a simple REST API. You can modify the `SyncManager` class in `index.html` to work with any service that supports GET/PUT requests.

**Q: What if I want to stop syncing?**
A: Just clear the Bin URL and Master Key in settings. App will work offline-only.

**Q: Can multiple people share the same bin?**
A: Technically yes, but not recommended. Each person should have their own bin for their personal IOUs.

**Q: How do I backup my data?**
A: Your data is in JSONBin.io. You can also export by opening browser console and typing: `console.log(JSON.stringify(JSON.parse(localStorage.getItem('paymentReminders'))))`

**Q: Does this work on desktop too?**
A: Yes! Open the URL in any modern browser (Chrome, Firefox, Safari, Edge). PWA install works on desktop Chrome/Edge too.

---

## 🎉 You're All Set!

Your payment reminder dashboard is now:
- ✅ Hosted on your server
- ✅ Installed on your phone
- ✅ Syncing between all devices
- ✅ Working offline

Enjoy tracking your IOUs and loans with style! 💰

---

## 📝 File Checklist

Make sure all these files are in the same directory on your server:

```
your-website-folder/
├── index.html          ← Main app (required)
├── manifest.json       ← PWA config (required)
├── sw.js              ← Service worker (required)
└── SETUP-INSTRUCTIONS.md ← This file (optional)
```

---

**Version:** 1.0
**Last Updated:** January 2026
**License:** Free to use and modify