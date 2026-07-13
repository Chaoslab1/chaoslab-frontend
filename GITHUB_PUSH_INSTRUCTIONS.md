# How to Push to GitHub

## 🚀 Quick Method (Automated)

### Option 1: Use the Batch Script

Simply double-click the file:
```
push-to-github.bat
```

This will:
1. Initialize Git (if needed)
2. Add the remote repository
3. Stage all files
4. Commit with a message
5. Push to GitHub

---

## 📝 Manual Method (Step by Step)

### Step 1: Open Terminal

Open PowerShell or Command Prompt in the project directory:

```cmd
cd C:\Users\user\Documents\Chaoslab\chaoslab-frontend
```

### Step 2: Initialize Git (if not already done)

```bash
git init
```

### Step 3: Add Remote Repository

```bash
git remote add origin https://github.com/Chaoslab1/chaoslab-frontend.git
```

Or if remote already exists, update it:

```bash
git remote set-url origin https://github.com/Chaoslab1/chaoslab-frontend.git
```

### Step 4: Stage All Files

```bash
git add .
```

### Step 5: Commit Changes

```bash
git commit -m "feat: production-ready documentation portal with full testing and CI/CD"
```

### Step 6: Rename Branch to Main (if needed)

```bash
git branch -M main
```

### Step 7: Push to GitHub

```bash
git push -u origin main
```

---

## 🔐 Authentication

### If Prompted for Credentials

#### Option 1: Personal Access Token (Recommended)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - [x] repo (all)
   - [x] workflow
4. Generate and copy the token
5. Use the token as your password when prompted

#### Option 2: GitHub CLI

```bash
# Install GitHub CLI
winget install GitHub.cli

# Login
gh auth login

# Push
git push -u origin main
```

---

## ⚙️ After Pushing - Configure GitHub

### 1. Enable GitHub Pages

1. Go to: https://github.com/Chaoslab1/chaoslab-frontend/settings/pages
2. Under "Source", select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Click "Save"
4. Wait a few minutes for deployment
5. Access your site at: https://chaoslab1.github.io/chaoslab-frontend/

### 2. Configure GitHub Secrets

Go to: https://github.com/Chaoslab1/chaoslab-frontend/settings/secrets/actions

Add these secrets:

#### Required for CI/CD:

```
REGISTRY_USERNAME=chaoslab1
REGISTRY_PASSWORD=<your-docker-hub-token>
```

#### Optional but Recommended:

```
CODECOV_TOKEN=<your-codecov-token>
SNYK_TOKEN=<your-snyk-token>
NETLIFY_AUTH_TOKEN=<your-netlify-token>
NETLIFY_SITE_ID=<your-netlify-site-id>
```

#### Optional for Search:

```
ALGOLIA_APP_ID=<your-algolia-app-id>
ALGOLIA_API_KEY=<your-algolia-api-key>
ALGOLIA_INDEX_NAME=chaoslab-frontend
```

### 3. Enable Branch Protection (Recommended)

1. Go to: https://github.com/Chaoslab1/chaoslab-frontend/settings/branches
2. Click "Add rule"
3. Branch name pattern: `main`
4. Enable:
   - [x] Require a pull request before merging
   - [x] Require status checks to pass before merging
   - Select: `Security Scan`, `Code Quality`, `Test`, `Build`
   - [x] Require branches to be up to date before merging
5. Click "Create"

---

## 🔍 Verify Push Was Successful

### Check GitHub Repository

1. Go to: https://github.com/Chaoslab1/chaoslab-frontend
2. Verify all files are present
3. Check the commit message

### Check CI/CD Pipeline

1. Go to: https://github.com/Chaoslab1/chaoslab-frontend/actions
2. You should see workflows running:
   - CI (Continuous Integration)
   - CD (Continuous Deployment)

### Check GitHub Pages

After 5-10 minutes:
- Visit: https://chaoslab1.github.io/chaoslab-frontend/
- Documentation should be live

---

## 🐛 Troubleshooting

### Error: Repository not found

**Solution**: Ensure the repository exists at https://github.com/Chaoslab1/chaoslab-frontend

If not, create it:
1. Go to: https://github.com/new
2. Repository name: `chaoslab-frontend`
3. Owner: `Chaoslab1`
4. Click "Create repository"

### Error: Permission denied

**Solutions**:

1. **Check repository access**:
   - Ensure you're a collaborator or owner

2. **Use Personal Access Token**:
   - Generate at: https://github.com/settings/tokens
   - Use token as password

3. **Configure Git credentials**:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

### Error: Failed to push some refs

**Solution**: Pull first, then push

```bash
git pull origin main --rebase
git push -u origin main
```

### Error: Remote already exists

**Solution**: Update the remote URL

```bash
git remote set-url origin https://github.com/Chaoslab1/chaoslab-frontend.git
```

---

## 📦 What Gets Pushed

All production-ready files including:

- ✅ Source code (src/)
- ✅ Documentation (docs/)
- ✅ CI/CD workflows (.github/)
- ✅ Configuration files
- ✅ Tests
- ✅ Docker files
- ✅ All markdown documentation

Excluded (in .gitignore):
- ❌ node_modules/
- ❌ build/
- ❌ .docusaurus/
- ❌ coverage/
- ❌ .env files

---

## 🎯 Next Steps After Pushing

1. **Wait for CI/CD**: Check Actions tab for pipeline status
2. **Configure Secrets**: Add required secrets for deployments
3. **Enable GitHub Pages**: Configure Pages in repository settings
4. **Test Deployment**: Visit the live URL after deployment
5. **Set Up Monitoring**: Configure uptime monitoring

---

## 📞 Need Help?

- **GitHub Docs**: https://docs.github.com
- **Git Docs**: https://git-scm.com/doc
- **Project Issues**: https://github.com/Chaoslab1/chaoslab-frontend/issues

---

**Last Updated**: 2026-07-10  
**Status**: Ready to Push ✅
