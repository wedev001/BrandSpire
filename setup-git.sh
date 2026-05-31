#!/bin/bash

# BrandSpire Git Setup Script
# This script initializes git and prepares the project for GitHub push

set -e  # Exit on error

echo "🚀 BrandSpire Git Setup Script"
echo "================================"
echo ""

# Check if git is already initialized
if [ -d .git ]; then
    echo "✅ Git repository already initialized"
else
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
fi

echo ""
echo "📝 Configuring git..."

# Check if git user is configured
if git config user.name > /dev/null 2>&1; then
    echo "✅ Git user already configured"
else
    echo "❓ Git user not configured. Please enter your details:"
    read -p "Enter your name: " git_name
    read -p "Enter your email: " git_email
    git config --global user.name "$git_name"
    git config --global user.email "$git_email"
    echo "✅ Git user configured"
fi

echo ""
echo "📌 Adding files to staging..."
git add -A
git status
echo ""

echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "1. Review the changes above"
echo "2. Create a repository on GitHub (https://github.com/new)"
echo "3. Run: git commit -m 'Initial commit: BrandSpire v1.1.0 with pricing updates'"
echo "4. Run: git branch -M main"
echo "5. Run: git remote add origin https://github.com/YOUR_USERNAME/brandspire.git"
echo "6. Run: git push -u origin main"
echo ""
echo "💡 Tip: Replace YOUR_USERNAME with your GitHub username"
echo ""
