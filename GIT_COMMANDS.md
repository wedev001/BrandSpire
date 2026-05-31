# Quick Copy-Paste Git Commands

## 📋 All Commands in One Place

### 1️⃣ Initialize Git (Run Once)

```bash
cd /Users/suraj/Desktop/BrandSpire
git init
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

### 2️⃣ Stage and Commit

```bash
git add -A
git status
```

**Expected output**: All files should be green and listed as new files

Then commit:

```bash
git commit -m "Initial commit: BrandSpire v1.1.0 with pricing updates"
```

---

### 3️⃣ Create GitHub Repository

Go to: **https://github.com/new**

Fill in:
- **Repository name**: brandspire
- **Description**: Digital marketing agency website
- **Visibility**: Public or Private
- **Uncheck**: Initialize with README

Click **Create repository**

---

### 4️⃣ Connect & Push to GitHub

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/brandspire.git
git push -u origin main
```

**⚠️ Important**: Replace `YOUR_USERNAME` with your GitHub username

---

### 5️⃣ Verify on GitHub

Visit: `https://github.com/YOUR_USERNAME/brandspire`

You should see all your files there!

---

## 🚀 Deploy to Vercel

```bash
npm i -g vercel
cd /Users/suraj/Desktop/BrandSpire/packages/frontend
vercel
vercel --prod
```

---

## 📝 For Future Updates

```bash
# Make changes...

git add .
git commit -m "Your change description"
git push origin main
```

---

## 🌳 Check Remote

```bash
git remote -v
```

Should show:
```
origin  https://github.com/YOUR_USERNAME/brandspire.git (fetch)
origin  https://github.com/YOUR_USERNAME/brandspire.git (push)
```

---

## 📊 Check Commit History

```bash
git log --oneline
```

---

## 🆘 If Something Goes Wrong

### Reset (undo changes not committed)
```bash
git reset --hard
```

### Check status
```bash
git status
```

### See what changed
```bash
git diff
```

---

## ✅ Step-by-Step Summary

1. ✅ `cd /Users/suraj/Desktop/BrandSpire`
2. ✅ `git init`
3. ✅ `git config --global user.name "Your Name"`
4. ✅ `git config --global user.email "your@email.com"`
5. ✅ `git add -A`
6. ✅ `git commit -m "Initial commit: BrandSpire v1.1.0"`
7. ✅ Create repo at https://github.com/new
8. ✅ `git branch -M main`
9. ✅ `git remote add origin https://github.com/YOUR_USERNAME/brandspire.git`
10. ✅ `git push -u origin main`
11. ✅ Check at https://github.com/YOUR_USERNAME/brandspire
12. ✅ Deploy with `vercel --prod` (optional but recommended)

---

**Done! 🎉**
