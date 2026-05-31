# GitHub Setup & Deployment Guide

This guide explains how to push BrandSpire to GitHub and deploy it.

## 📋 Prerequisites

- GitHub account (https://github.com/signup)
- Git installed on your machine
- Terminal/Command line access

---

## 🔧 Step 1: Initialize Git Locally

```bash
cd /Users/suraj/Desktop/BrandSpire

# Initialize git repository
git init

# Configure git (if not already configured globally)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add all files to staging
git add -A

# Verify files are ready to commit
git status
```

---

## 📝 Step 2: Create Initial Commit

```bash
git commit -m "Initial commit: BrandSpire v1.1.0 with pricing updates

- Added interactive billing frequency toggle
- Removed testimonials section from pricing
- Fixed card selection styling in light/dark modes
- Updated theme toggle button with modern design
- Improved text contrast and readability
- Added staggered animations to features list
- Enhanced overall UX with smooth transitions"
```

---

## 🌐 Step 3: Create Repository on GitHub

1. Go to https://github.com/new
2. **Repository name**: `brandspire` (or your preferred name)
3. **Description**: Digital marketing agency website - Modern React + Vite + Tailwind CSS
4. **Visibility**: Choose Public or Private
5. **DO NOT initialize with README** (you already have one)
6. Click **Create repository**

---

## 🚀 Step 4: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Rename branch to main (if needed)
git branch -M main

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/brandspire.git

# Push to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your actual GitHub username.

---

## ✅ Verify Upload

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/brandspire`
2. You should see all files and commits
3. README.md should display nicely on the main page

---

## 🔄 Future Commits

After the initial push, use these commands for updates:

```bash
# Make changes to files
# ... edit files ...

# Stage changes
git add .

# Commit with a message
git commit -m "Brief description of changes"

# Push to GitHub
git push origin main
```

---

## 🌍 Deployment Options

### Option 1: Deploy Frontend on Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend
cd packages/frontend

# Deploy
vercel

# For production deployment
vercel --prod
```

### Option 2: Deploy Frontend on Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Navigate to frontend
cd packages/frontend

# Deploy
netlify deploy --prod --dir=dist
```

### Option 3: Deploy on Your Own Server

```bash
# Build for production
cd packages/frontend
npm run build

# Output will be in: packages/frontend/dist/
# Upload dist/ folder to your server
```

---

## 📊 GitHub Repository Features to Enable

Once your repository is on GitHub:

1. **Enable GitHub Pages** (if deploying from repo):
   - Settings → Pages → Deploy from branch → main → /docs

2. **Add GitHub Actions** for CI/CD:
   - Create `.github/workflows/deploy.yml` for automated deployments

3. **Enable Discussions** for community engagement

4. **Add Topics** for better discoverability:
   - `react`, `vite`, `tailwind-css`, `portfolio`, `website`

---

## 📝 Common Git Commands Reference

```bash
# Check status
git status

# View commit history
git log --oneline

# View remote URLs
git remote -v

# Change remote URL
git remote set-url origin https://github.com/NEW_USERNAME/brandspire.git

# Pull latest changes
git pull origin main

# Create and switch to new branch
git checkout -b feature/new-feature

# Push specific branch
git push origin feature/new-feature

# Delete local branch
git branch -d feature/new-feature

# Delete remote branch
git push origin --delete feature/new-feature
```

---

## 🆘 Troubleshooting

### Issue: "Permission denied" when pushing

**Solution**: 
```bash
# Check your git credentials
git config --list

# Update remote URL if needed
git remote set-url origin git@github.com:YOUR_USERNAME/brandspire.git
```

### Issue: "fatal: not a git repository"

**Solution**:
```bash
cd /Users/suraj/Desktop/BrandSpire
git init
git add -A
git commit -m "Initial commit"
```

### Issue: "rejected" error when pushing

**Solution**:
```bash
# Pull latest changes first
git pull origin main --rebase

# Then push
git push origin main
```

---

## 📞 Need Help?

- GitHub Docs: https://docs.github.com
- Git Documentation: https://git-scm.com/doc
- Vercel Deployment: https://vercel.com/docs
- Netlify Deployment: https://docs.netlify.com

---

**Last Updated**: May 31, 2024
