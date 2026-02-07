# Deploy to Vercel - Quick Guide

## 🚀 Deploy Your Payment Tracker to Vercel in 5 Minutes

### Why Vercel?
- ✅ **100% Free** for personal projects
- ✅ **Automatic HTTPS** (no setup needed)
- ✅ **Blazing fast** global CDN
- ✅ **No server management**
- ✅ **Automatic deployments** from Git
- ✅ **Perfect for PWAs**

---

## Method 1: Drag & Drop (Recommended for First Time)

### Step 1: Prepare Your Files
Make sure you have all 5 files:
```
payment-tracker/
├── index.html
├── manifest.json
├── sw.js
├── vercel.json          ← New! This configures Vercel
└── SETUP-INSTRUCTIONS.md (optional)
```

### Step 2: Deploy
1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Sign up with GitHub, GitLab, or Email (free)
3. Click **"Browse"** or drag your folder into the upload area
4. Vercel auto-detects it's a static site
5. Click **"Deploy"**
6. Wait 30 seconds... **Done!** 🎉

### Step 3: Get Your URL
- Vercel gives you: `https://your-app-name.vercel.app`
- You can customize the name in project settings
- Optional: Add your own custom domain

---

## Method 2: Deploy from GitHub (Recommended for Updates)

### Step 1: Push to GitHub
```bash
# In your project folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/payment-tracker.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Click **"Import Git Repository"**
3. Select your GitHub repo
4. Click **"Deploy"**

### Benefits:
- Every `git push` automatically deploys
- Instant previews of changes
- Rollback to any previous version
- Production + preview environments

---

## Method 3: Vercel CLI (For Developers)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to your project
cd payment-tracker

# Login to Vercel
vercel login

# Deploy (first time - will ask questions)
vercel

# Deploy to production
vercel --prod

# That's it!
```

### CLI Benefits:
- Deploy from terminal
- Faster than web UI
- Great for testing
- Integrates with CI/CD

---

## 📱 After Deployment: Setup Cloud Sync

Your app is now live at `https://your-app.vercel.app`

### 1. Setup JSONBin.io
1. Go to [jsonbin.io](https://jsonbin.io) → Sign up (free)
2. Create a new bin with: `{"payments": []}`
3. Copy your:
   - **Bin URL**: `https://api.jsonbin.io/v3/b/YOUR_BIN_ID`
   - **Master Key**: From API Keys section

### 2. Configure Sync in Your App
1. Open your deployed app: `https://your-app.vercel.app`
2. Click **Settings ⚙️** (top right)
3. Paste Bin URL and Master Key
4. Click **"Save & Sync"**
5. Done! Your data now syncs to cloud

---

## 📱 Install on Your Phone

### iPhone (Safari):
1. Open `https://your-app.vercel.app` in **Safari**
2. Tap **Share** button (square with arrow up)
3. Scroll and tap **"Add to Home Screen"**
4. Tap **"Add"**
5. App icon appears on home screen!

### Android (Chrome):
1. Open `https://your-app.vercel.app` in **Chrome**
2. You'll see install banner → Tap **"Install"**

   OR

3. Tap **menu (⋮)** → **"Add to Home screen"**
4. Tap **"Add"**
5. App icon appears on home screen!

### On Other Devices:
1. Open same URL on computer/tablet
2. Click Settings → Enter same sync credentials
3. Click "Pull Data" to sync
4. All devices now stay in sync!

---

## 🔧 Vercel Configuration Explained

The `vercel.json` file ensures:
- Service worker loads correctly
- Manifest.json is accessible
- All routes work properly
- PWA features work perfectly

You don't need to modify it - it's ready to go!

---

## 🎨 Customization Options

### Change App Name:
1. Go to Vercel dashboard
2. Click your project
3. Settings → General → Project Name
4. Your URL becomes: `https://new-name.vercel.app`

### Add Custom Domain:
1. Buy domain from Namecheap, GoDaddy, etc.
2. Vercel dashboard → Domains → Add
3. Follow DNS instructions
4. Your app is now at: `https://yourdomain.com`
5. HTTPS is automatic!

### Environment Variables (Optional):
If you want to pre-configure sync for users:
1. Vercel dashboard → Settings → Environment Variables
2. Add `JSONBIN_URL` and `JSONBIN_KEY`
3. Modify `index.html` to read from environment
4. Redeploy

---

## 🔄 Updating Your App

### Via GitHub (Automatic):
```bash
# Make changes to your files
git add .
git commit -m "Updated feature X"
git push

# Vercel automatically deploys! ✨
```

### Via Vercel Dashboard:
1. Make changes to files locally
2. Go to Vercel dashboard
3. Click "Redeploy"
4. Upload new files
5. Deploy!

### Via CLI:
```bash
# Make changes
vercel --prod
# Deployed in seconds!
```

---

## 📊 Vercel Features You'll Love

### Analytics (Free):
- See page views
- Track performance
- Monitor errors
- All in Vercel dashboard

### Speed Insights:
- Real user performance data
- Core Web Vitals
- Performance score

### Preview Deployments:
- Every branch gets its own URL
- Test before going live
- Share with friends for feedback

### Instant Rollbacks:
- Something broke?
- Click "Rollback" in dashboard
- Back to previous version instantly

---

## 🆘 Troubleshooting

### Service Worker Not Loading?
- Make sure `vercel.json` is included
- Check browser console for errors
- Clear cache and hard reload (Ctrl+Shift+R)

### PWA Install Not Showing?
- Must use HTTPS (Vercel does this automatically)
- Must use Safari on iOS, Chrome on Android
- Try closing and reopening browser

### Sync Not Working?
- Check Settings → Verify credentials
- Make sure you're online
- Check JSONBin.io rate limits (100/month free)

### App Not Loading?
- Check Vercel dashboard for deployment errors
- Verify all files uploaded correctly
- Check browser console (F12)

---

## 💰 Vercel Pricing (as of 2026)

### Hobby (Free):
- ✅ Unlimited projects
- ✅ HTTPS included
- ✅ 100GB bandwidth/month
- ✅ Commercial use allowed
- **Perfect for personal payment tracker!**

### Pro ($20/month):
- More bandwidth
- Custom domains
- Team features
- Priority support
- **Not needed for personal use**

---

## 🎉 You're Done!

Your payment tracker is now:
- ✅ Live on Vercel
- ✅ Accessible from anywhere
- ✅ HTTPS enabled
- ✅ PWA installable
- ✅ Cloud syncing
- ✅ Lightning fast

Share your URL with yourself on all devices and enjoy seamless payment tracking! 💰

---

## 📝 Quick Checklist

- [ ] Sign up for Vercel
- [ ] Upload/deploy your files
- [ ] Get your vercel.app URL
- [ ] Sign up for JSONBin.io
- [ ] Create a bin and get credentials
- [ ] Configure sync in app Settings
- [ ] Install on phone (Safari/Chrome)
- [ ] Open on computer and configure sync
- [ ] Test by adding a payment on one device
- [ ] Check if it syncs to other device
- [ ] Done! 🎉

---

**Need help?** Vercel has great documentation at [vercel.com/docs](https://vercel.com/docs)

**Questions about the app?** Check the main SETUP-INSTRUCTIONS.md file!