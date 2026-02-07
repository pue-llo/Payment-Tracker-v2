#!/bin/bash

echo "🚀 Payment Tracker v2.0 - Push to GitHub"
echo "=========================================="
echo ""
echo "Current branch: $(git branch --show-current)"
echo ""

# Prompt for repository URL
read -p "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

# Add remote
echo ""
echo "📡 Adding remote repository..."
git remote remove origin 2>/dev/null
git remote add origin "$REPO_URL"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
BRANCH=$(git branch --show-current)
git push -u origin "$BRANCH"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 View your repository at: $REPO_URL"
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "   1. Repository URL is correct"
    echo "   2. You have access to the repository"
    echo "   3. You're authenticated with GitHub"
    exit 1
fi
