# GitHub Setup Guide for Personal Account

## Current Configuration
- **Repository**: Not yet connected to GitHub
- **Local Git User**: ayeshatoor
- **Email**: Need to set your personal GitHub email

## Steps to Push to Your Personal GitHub

### Step 1: Set Your Personal GitHub Email (if different from office)

Run this command with your **personal GitHub email**:
```bash
cd D:\AliMaternityClinic
git config user.email "your-personal-email@example.com"
```

### Step 2: Create Repository on GitHub

1. Go to https://github.com (make sure you're logged into your **personal account**)
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `AliMaternityClinic` (or any name you prefer)
4. Description: "MERN Stack Clinic Management System"
5. Choose: **Private** (recommended for clinic data) or **Public**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

### Step 3: Add Remote and Push

After creating the repository, GitHub will show you commands. Use these:

```bash
cd D:\AliMaternityClinic

# Add all files
git add .

# Commit
git commit -m "Initial commit: Ali Maternity Clinic Management System"

# Add your personal GitHub repository as remote
# Replace YOUR_USERNAME with your personal GitHub username
git remote add origin https://github.com/YOUR_USERNAME/AliMaternityClinic.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Verify It's Your Personal Account

After pushing, check:
- The repository URL should be: `https://github.com/YOUR_PERSONAL_USERNAME/...`
- Not your office GitHub account

## Important Notes

### Using SSH Instead of HTTPS (More Secure)

If you have SSH keys set up for your personal GitHub:

1. Use SSH URL instead:
```bash
git remote add origin git@github.com:YOUR_USERNAME/AliMaternityClinic.git
```

2. To check which SSH key is being used:
```bash
ssh -T git@github.com
```

### If You Have Multiple GitHub Accounts

If you need to switch between accounts frequently, consider:

1. **Use SSH with different keys** for each account
2. **Use GitHub CLI** (`gh auth login`) to manage multiple accounts
3. **Use local git config** (already set) - this repo will always use your personal account

### Current Local Config (This Repository Only)

This repository is configured to use:
- **User**: ayeshatoor
- **Email**: (set your personal email in Step 1)

This won't affect your office repositories.

## Troubleshooting

### If you get "Permission denied"
- Make sure you're logged into your **personal** GitHub account in browser
- Check if you're using the correct credentials
- Consider using SSH keys instead of HTTPS

### If you accidentally push to office account
- Remove the remote: `git remote remove origin`
- Add correct remote: `git remote add origin https://github.com/YOUR_PERSONAL_USERNAME/...`
- Force push: `git push -u origin main --force` (be careful!)

### To check current remote
```bash
git remote -v
```

This will show which GitHub account the repository is connected to.

