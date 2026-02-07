# 🚀 Deploy Payment Tracker v2.0 to Vercel

## Application Preset to Use

When deploying to Vercel, use: **"Other"** preset

Vercel will auto-detect your `vercel.json` configuration file, which is already set up for your Payment Tracker v2.0 application.

---

## Quick Deploy Steps

### Option 1: Deploy from GitHub (Recommended)

Since your code is already on GitHub at `https://github.com/pue-llo/Payment-Tracker-v2`:

1. **Go to [vercel.com/new](https://vercel.com/new)**
2. **Sign in** with GitHub
3. **Click "Import Git Repository"**
4. **Select** `pue-llo/Payment-Tracker-v2`
5. **Configure Project:**
   - **Framework Preset:** Select **"Other"** (or "Static Site" if available)
   - **Root Directory:** Leave as `./` (default)
   - **Build Command:** Leave empty (no build needed)
   - **Output Directory:** Leave empty
   - **Install Command:** Leave empty
6. **Click "Deploy"**

Vercel will:
- ✅ Auto-detect your `vercel.json` configuration
- ✅ Serve `payment-tracker-v2.0.html` as the main file
- ✅ Configure service worker correctly
- ✅ Set up HTTPS automatically
- ✅ Give you a live URL in ~30 seconds

---

### Option 2: Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Navigate to your project
cd "/Users/puello/Wisemen Dashboard/outputs"

# Login to Vercel
vercel login

# Deploy (first time - will ask questions)
vercel

# When prompted:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? payment-tracker-v2 (or your choice)
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

---

## Vercel Configuration Explained

Your `vercel.json` is configured to:

1. **Serve the main file:** `payment-tracker-v2.0.html` as the root
2. **Handle service worker:** Proper headers for `sw.js`
3. **Serve manifest:** `manifest.json` for PWA features
4. **Route all paths:** All routes serve the main HTML (SPA behavior)

This ensures:
- ✅ PWA features work correctly
- ✅ Service worker can register
- ✅ Offline functionality works
- ✅ Install prompts appear on mobile

---

## After Deployment

### 1. Get Your Live URL
Vercel will give you: `https://payment-tracker-v2-xxxxx.vercel.app`

### 2. Test Your App
- Open the URL in your browser
- Check that the app loads correctly
- Test adding a payment
- Verify service worker registers (check DevTools → Application → Service Workers)

### 3. Install on Mobile
- **iPhone:** Open in Safari → Share → Add to Home Screen
- **Android:** Open in Chrome → Install prompt will appear

### 4. Set Up Cloud Sync (Optional)
- Sign up at [jsonbin.io](https://jsonbin.io)
- Create a bin
- Configure sync in app Settings

---

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS instructions
4. HTTPS is automatic!

---

## Automatic Deployments

Once connected to GitHub:
- Every `git push` automatically deploys
- Preview deployments for pull requests
- Instant rollbacks if needed

---

## Troubleshooting

### App Not Loading?
- Check Vercel dashboard for deployment errors
- Verify `vercel.json` is in the repository
- Check that `payment-tracker-v2.0.html` exists

### Service Worker Not Working?
- Make sure you're accessing via HTTPS (Vercel does this automatically)
- Check browser console for errors
- Verify `sw.js` file is in the root directory

### Wrong File Being Served?
- Check `vercel.json` routes configuration
- Ensure `payment-tracker-v2.0.html` is the correct file name

---

## Summary

**Preset to Use:** **"Other"** (or "Static Site")

**Key Points:**
- ✅ No build command needed
- ✅ No install command needed  
- ✅ Vercel auto-detects `vercel.json`
- ✅ Deploys in ~30 seconds
- ✅ Free forever for personal projects

Your Payment Tracker v2.0 is ready to deploy! 🎉
