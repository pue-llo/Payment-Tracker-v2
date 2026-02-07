#!/bin/bash

# Payment Tracker v2.0 - Push to GitHub Script
# This script will help you push the payment tracker v2.0 to GitHub

echo "🚀 Payment Tracker v2.0 - GitHub Push Script"
echo "=============================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized. Run 'git init' first."
    exit 1
fi

# Add all files
echo "📦 Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "⚠️  No changes to commit. All files are already committed."
else
    # Commit changes
    echo "💾 Committing changes..."
    git commit -m "Release Payment Tracker v2.0

✨ New Features:
- Event Bus System for real-time updates
- Toast Notification System with undo support
- Inline Editing for payments
- Advanced Charts & Analytics Dashboard
- Live Calendar Cell Updates
- Drag-to-Reschedule payments
- ICS Calendar Export
- Command Palette (Global Search)
- Payment Templates
- Mobile-optimized Card Layout
- Cash Flow Projections
- Agenda View

🎨 UI Improvements:
- Glassmorphism design
- Premium dark mode theme
- Smooth animations and transitions
- Enhanced mobile responsiveness

🔧 Technical:
- Event-driven architecture
- Improved performance
- Better code organization
- PWA enhancements"
    
    echo "✅ Changes committed!"
fi

# Check if remote exists
if git remote | grep -q "^origin$"; then
    echo ""
    echo "📡 Remote 'origin' already exists."
    REMOTE_URL=$(git remote get-url origin)
    echo "   Current URL: $REMOTE_URL"
    echo ""
    read -p "Do you want to push to this remote? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🚀 Pushing to GitHub..."
        git push -u origin main 2>/dev/null || git push -u origin master 2>/dev/null || {
            echo ""
            echo "⚠️  Could not determine default branch. Trying common branches..."
            BRANCH=$(git branch --show-current)
            echo "   Current branch: $BRANCH"
            git push -u origin "$BRANCH"
        }
        echo "✅ Push complete!"
    else
        echo "⏭️  Skipped push. Run 'git push' manually when ready."
    fi
else
    echo ""
    echo "📡 No remote repository configured."
    echo ""
    echo "To connect to GitHub:"
    echo "1. Create a new repository on GitHub (https://github.com/new)"
    echo "2. Copy the repository URL"
    echo "3. Run: git remote add origin <your-repo-url>"
    echo "4. Run: git push -u origin main (or 'master' if that's your default branch)"
    echo ""
    read -p "Do you want to add a remote now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter your GitHub repository URL: " REPO_URL
        if [ ! -z "$REPO_URL" ]; then
            git remote add origin "$REPO_URL"
            echo "✅ Remote added!"
            echo ""
            echo "🚀 Pushing to GitHub..."
            git push -u origin main 2>/dev/null || git push -u origin master 2>/dev/null || {
                BRANCH=$(git branch --show-current)
                git push -u origin "$BRANCH"
            }
            echo "✅ Push complete!"
        else
            echo "❌ No URL provided. Skipping remote setup."
        fi
    fi
fi

echo ""
echo "✨ Done! Your Payment Tracker v2.0 is ready on GitHub!"
echo ""
echo "Next steps:"
echo "- Update your repository description on GitHub"
echo "- Add topics/tags: payment-tracker, pwa, finance, javascript"
echo "- Consider adding a LICENSE file"
echo "- Share your repository with others!"
