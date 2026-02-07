# Export/Import Guide - Payment Tracker Pro V1

## Quick Reference

**Export Button:** 💾 (Save icon in header)
**Import Button:** 📥 (Download icon in header)

---

## How to Export Your Data

### Step 1: Click the Export Button
- Look for the **💾** icon in the top-right header
- Click it once

### Step 2: File Downloads Automatically
- Your browser will download a file named: `payment-tracker-backup-2026-01-31.json`
- The date in the filename is the export date
- File is saved to your default Downloads folder

### Step 3: Store the File Safely
- **Keep multiple backups:** Save to cloud storage (Google Drive, Dropbox, etc.)
- **Before major changes:** Export before making lots of edits
- **Weekly backup:** Export once a week if you use the tracker heavily
- **Before V2:** Export your V1 data before migrating to V2

---

## What Gets Exported

The export includes **everything**:

✅ All payments (pending and paid)
✅ All history entries
✅ Your theme preference (light/dark)
✅ Your savings amounts (2-month and 6-month goals)
✅ Flags on payments
✅ Partial payment progress
✅ All categories, subcategories, business names

**Nothing is left behind!**

---

## How to Import Data

### Step 1: Export First (IMPORTANT!)
**⚠️ Import will REPLACE all current data**

Before importing:
1. Click **💾** to export your current data
2. Confirm the file downloaded
3. Now you're safe to import

### Step 2: Click the Import Button
- Look for the **📥** icon in the header
- Click it
- You'll see a warning: "Import will replace ALL current data"
- Click **OK** if you're ready

### Step 3: Select Your Backup File
- File picker will open
- Navigate to your backup file (`.json`)
- Select it
- Click **Open**

### Step 4: Confirm Success
- You'll see: "✅ Import successful! X payments imported"
- Your data is now loaded
- All tabs will update automatically

---

## Common Use Cases

### 1. Moving to a New Device
```
Old Device:
  1. Click 💾 Export
  2. Upload JSON file to cloud storage or email it to yourself

New Device:
  3. Open Payment Tracker
  4. Download your JSON file
  5. Click 📥 Import
  6. Select the JSON file
  ✅ All your data is now on the new device
```

### 2. Switching Browsers
```
Chrome:
  1. Click 💾 Export

Firefox:
  2. Open Payment Tracker
  3. Click 📥 Import
  4. Select exported file
  ✅ Data moved to Firefox
```

### 3. Preparing for V2
```
V1 Tracker:
  1. Click 💾 Export
  2. Save file as "v1-final-backup.json"

V2 Tracker (when ready):
  3. Open V2 tracker
  4. Look for "Import from V1" feature
  5. Select your v1-final-backup.json file
  ✅ All V1 data migrated to V2
```

### 4. Testing/Experimentation
```
Before testing:
  1. Click 💾 Export
  2. Save as "before-changes.json"

Test/experiment:
  3. Make changes, try things out

If you want to undo:
  4. Click 📥 Import
  5. Select "before-changes.json"
  ✅ Back to original state
```

### 5. Sharing Data (with caution)
```
⚠️ Your exported data may contain sensitive information!

If you want to share payment structure without personal data:
  1. Click 💾 Export
  2. Open the .json file in a text editor
  3. Manually remove sensitive information
  4. Share the sanitized file

Better approach: Use V2 when it has "Export Template" feature
```

---

## File Format Details

### What's Inside the JSON File

```json
{
  "version": "1.0",
  "exportDate": "2026-01-31T20:00:00.000Z",
  "data": {
    "payments": [ /* all your payments */ ],
    "history": [ /* all history entries */ ],
    "theme": "dark",
    "twoMonthSavings": 2500,
    "sixMonthSavings": 6000
  }
}
```

### File Size
- Small dataset (10-50 payments): ~5-25 KB
- Medium dataset (100-200 payments): ~50-100 KB
- Large dataset (500+ payments): ~200-500 KB

**Very small and easy to backup!**

---

## Troubleshooting

### Export Issues

**"Nothing happens when I click 💾"**
- Check if your browser blocks downloads
- Try a different browser
- Check browser console for errors (F12)

**"File downloaded but it's empty"**
- This shouldn't happen if you have data
- Check if you have any payments in the tracker
- Try refreshing the page and exporting again

### Import Issues

**"Error importing data: Invalid data format"**
- Make sure you're importing a Payment Tracker export file
- File must be valid JSON
- Check that the file wasn't corrupted during transfer

**"Error importing data: Payment missing required fields"**
- The file might be from an older version
- Or the file was manually edited incorrectly
- Check DATA_STRUCTURE_V1.md for required fields

**"Import successful but I don't see my data"**
- Refresh the page
- Check all tabs (Dashboard, Calendar, Payments, History)
- If still missing, re-import

**"I imported and lost my data!"**
- This is why we say "Export first!"
- Check your Downloads folder for any backup files
- Check browser localStorage (see below)

### Emergency Data Recovery

If you imported and lost data WITHOUT exporting first:

**Option 1: Browser History**
- If you JUST imported (within seconds)
- Press Ctrl+Z or Cmd+Z in the tracker
- (This won't work, but worth a try)

**Option 2: Browser Console Recovery**
Unfortunately, localStorage is overwritten. If you didn't export, the data is lost.

**Prevention:** Always export before importing!

---

## Best Practices

### Regular Backups

**Daily Users:**
- Export weekly
- Keep last 3-4 backups
- Store in cloud (Google Drive, etc.)

**Occasional Users:**
- Export before and after major updates
- Keep at least 1 backup in cloud

**Before Important Events:**
- Export before upgrading browsers
- Export before clearing browser data
- Export before migrating to V2
- Export before switching devices

### Backup Naming Convention

Good naming helps you find the right backup:

```
✅ Good names:
payment-tracker-backup-2026-01-31.json  (default)
payment-tracker-before-V2-migration.json
payment-tracker-Q1-2026.json
payment-tracker-100-payments.json

❌ Confusing names:
backup.json
data.json
download.json
```

### Storage Locations

**Recommended:**
- ✅ Cloud storage (Google Drive, Dropbox, OneDrive)
- ✅ Email to yourself
- ✅ USB drive (as secondary backup)

**Not Recommended:**
- ❌ Only in Downloads folder (easily deleted)
- ❌ Only on one device
- ❌ Only in browser bookmarks

---

## Advanced: Manual Data Editing

**⚠️ Advanced users only!**

You can manually edit the JSON file:

1. Export data
2. Open `.json` file in text editor
3. Make changes (be careful!)
4. Save file
5. Import modified file

**Common manual edits:**
- Bulk rename a person across all payments
- Bulk change category from Personal to Business
- Delete all paid payments to start fresh
- Fix typos in descriptions

**Rules:**
- JSON must be valid (use a JSON validator)
- Don't break the structure
- Don't remove required fields
- Keep date format YYYY-MM-DD
- Keep IDs unique

**Example:** Rename all instances of "John" to "John Smith"
```json
// Find and replace all:
"person": "John"
// With:
"person": "John Smith"
```

---

## V2 Migration Notes

When V2 is ready:

### Before Migration
1. ✅ Export from V1 using 💾
2. ✅ Save as `v1-final-backup-[date].json`
3. ✅ Keep a second copy in cloud storage

### During Migration
4. Open V2 tracker
5. Look for "Import V1 Data" or "Import" button
6. Select your V1 backup file
7. V2 will handle the conversion

### After Migration
8. Verify all payments imported correctly
9. Check that categories, flags, and partial payments are intact
10. Keep your V1 backup file (don't delete it yet!)
11. Use V2 for a week to ensure everything works
12. Once confident, you can archive V1 backup

### If Migration Fails
- You still have your V1 tracker (it's just an HTML file)
- You still have your V1 backup JSON
- You can continue using V1 while V2 issues are fixed

---

## FAQs

**Q: Can I have multiple backup files?**
A: Yes! Keep as many as you want. Each export creates a new file with the date in the filename.

**Q: Can I import old backups?**
A: Yes! As long as it's a valid V1 export, you can import backups from months ago.

**Q: What happens to my current data when I import?**
A: It's completely replaced. That's why we warn you to export first!

**Q: Can I merge two backup files?**
A: Not automatically. You'd need to manually edit the JSON to combine payment arrays. Better to keep one main tracker and export regularly.

**Q: Is my data safe in the export file?**
A: The file is plain JSON text. Anyone who gets the file can read your payment data. Treat it like sensitive financial information!

**Q: Can I open the tracker on two devices at once?**
A: Yes, but they won't sync automatically. Each device has its own localStorage. Use export/import to manually sync between devices.

**Q: Will export work if I have thousands of payments?**
A: Yes! JSON can handle large datasets. Your browser might take a second longer to download the file.

**Q: Can I import into a fresh tracker with no data?**
A: Yes! That's actually the safest way to import.

---

## Summary

**To Export:**
1. Click 💾
2. File downloads
3. Store safely

**To Import:**
1. Export current data first! (💾)
2. Click 📥
3. Select backup file
4. Confirm

**Before V2 Migration:**
1. Export from V1
2. Save as `v1-final-backup.json`
3. Keep it safe!

---

**Questions or issues?** Check `DATA_STRUCTURE_V1.md` for technical details.
