# Cloudflare Pages Deployment Guide

This guide explains how to deploy FuelBillForge to Cloudflare Pages (free tier) and manage updates using Git.

## Prerequisites

- GitHub account with repository access: https://github.com/gautamkeshri/FuelBillForge
- Cloudflare account (free tier): https://dash.cloudflare.com/sign-up

## Architecture Overview

FuelBillForge is a **client-side only** application that requires:
- ✅ **Cloudflare Pages** - Static site hosting (FREE)
- ❌ **No Workers needed** - All logic runs in the browser
- ❌ **No Storage needed** - No data persistence required

## Deployment Methods

### Method 1: Automatic Deployment via GitHub (Recommended)

This method automatically deploys your app whenever you push changes to GitHub.

#### Step 1: Connect GitHub to Cloudflare Pages

1. **Log in to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com/
   - Navigate to **Workers & Pages** in the left sidebar

2. **Create New Pages Project**
   - Click **"Create application"**
   - Select **"Pages"** tab
   - Click **"Connect to Git"**

3. **Authorize Cloudflare**
   - Select **GitHub**
   - Click **"Authorize Cloudflare"**
   - Grant access to your repository

4. **Select Repository**
   - Choose: `gautamkeshri/FuelBillForge`
   - Click **"Begin setup"**

#### Step 2: Configure Build Settings

On the setup page, enter these exact settings:

| Setting | Value |
|---------|-------|
| **Project name** | `fuel-bill-forge` (or your preferred name) |
| **Production branch** | `main` |
| **Framework preset** | `None` |
| **Build command** | `npm run build:pages` |
| **Build output directory** | `dist/public` |
| **Root directory** | `/` (leave empty) |

#### Step 3: Environment Variables (Optional)

Currently, no environment variables are needed. If you add backend features in the future:

- Click **"Add variable"**
- Add your variables (e.g., `DATABASE_URL`, `API_KEY`)

#### Step 4: Deploy

1. Click **"Save and Deploy"**
2. Wait 2-5 minutes for the build to complete
3. Your app will be available at: `https://fuel-bill-forge.pages.dev`

#### Step 5: Custom Domain (Optional)

1. In the Pages project dashboard, go to **"Custom domains"**
2. Click **"Set up a custom domain"**
3. Enter your domain (e.g., `fuelbillforge.com`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate to be provisioned (~15 minutes)

---

### Method 2: Manual Deployment via Wrangler CLI

For one-time deployments or testing without Git integration.

#### Step 1: Install Wrangler

```bash
npm install -g wrangler
```

#### Step 2: Login to Cloudflare

```bash
wrangler login
```

This opens a browser window for authentication.

#### Step 3: Build and Deploy

```bash
# Build the frontend
npm run build:pages

# Deploy to Cloudflare Pages
wrangler pages deploy dist/public --project-name=fuel-bill-forge
```

Your app will be deployed to: `https://fuel-bill-forge.pages.dev`

---

## Git Workflow for Major Changes

### Daily Development

```bash
# Make changes to your code
# Test locally
npm run dev

# Check TypeScript errors
npm run check
```

### When Making Major Changes

#### 1. Commit Your Changes

```bash
# Check what files changed
git status

# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Add custom logo upload feature"
```

#### 2. Push to GitHub

```bash
# Push to main branch
git push origin main
```

#### 3. Automatic Deployment

- Cloudflare Pages will **automatically detect** the push
- A new build will start within seconds
- Check deployment status: https://dash.cloudflare.com/
- Build takes 2-5 minutes
- Once complete, changes are live!

### Commit Message Guidelines

Use clear, descriptive commit messages:

```bash
# ✅ Good examples
git commit -m "Add torn paper effect to receipts"
git commit -m "Fix calculation bug in Amount preset mode"
git commit -m "Update Bharat Petroleum brand template layout"

# ❌ Avoid vague messages
git commit -m "fix"
git commit -m "update"
git commit -m "changes"
```

---

## Viewing Deployment Status

### Via Cloudflare Dashboard

1. Go to: https://dash.cloudflare.com/
2. Click **Workers & Pages**
3. Select your project: **fuel-bill-forge**
4. View:
   - **Latest deployments** with status (Success/Failed)
   - **Build logs** for debugging
   - **Analytics** (traffic, bandwidth)

### Via Wrangler CLI

```bash
# View recent deployments
wrangler pages deployments list --project-name=fuel-bill-forge

# View deployment details
wrangler pages deployments tail
```

---

## Rollback to Previous Version

If a deployment breaks something:

### Via Dashboard

1. Go to your Pages project
2. Click **"Deployments"** tab
3. Find the working version
4. Click **"⋯"** menu → **"Rollback to this deployment"**

### Via CLI

```bash
# List deployments
wrangler pages deployments list --project-name=fuel-bill-forge

# Promote a specific deployment
wrangler pages deployments promote <DEPLOYMENT_ID> --project-name=fuel-bill-forge
```

---

## Troubleshooting

### Build Fails on Cloudflare

**Problem:** Build command fails with `MODULE_NOT_FOUND` error

**Solution:**
```bash
# Ensure package.json is committed
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Images Not Loading

**Problem:** Brand logos don't appear on deployed site

**Solution:** Images are bundled by Vite. Ensure:
1. Images are in `attached_assets/stock_images/`
2. Imports use the `@assets/` alias
3. Files are committed to git:
   ```bash
   git add attached_assets/
   git commit -m "Add brand logos"
   git push
   ```

### Build Output Directory Error

**Problem:** Cloudflare can't find `dist/public`

**Solution:** Ensure build command is exactly:
- Build command: `npm run build:pages`
- Build output directory: `dist/public`

### Port 5000 Issues (Local Dev)

**Problem:** Development server won't start

**Solution:**
```bash
# Kill process on port 5000
npx kill-port 5000

# Then restart
npm run dev
```

---

## Monitoring and Analytics

Cloudflare Pages (free tier) provides:

- ✅ **Request analytics** - Page views, unique visitors
- ✅ **Bandwidth usage** - Unlimited on free tier
- ✅ **Build history** - Last 500 builds
- ✅ **Error logs** - Build and runtime errors
- ✅ **Deployment previews** - Test branches before merging

Access analytics at: https://dash.cloudflare.com/ → Your Project → **Analytics**

---

## Production URLs

- **Main site:** `https://fuel-bill-forge.pages.dev`
- **Custom domain (if configured):** `https://yourdomain.com`
- **Branch previews:** `https://BRANCH.fuel-bill-forge.pages.dev`

---

## Cost Summary (Free Tier Limits)

| Feature | Free Tier Limit | FuelBillForge Usage |
|---------|----------------|---------------------|
| **Bandwidth** | Unlimited | ✅ Well within limit |
| **Builds per month** | 500 | ✅ More than enough |
| **Concurrent builds** | 1 | ✅ Sufficient |
| **Sites** | 100 | ✅ Only need 1 |
| **Custom domains** | 100 | ✅ Only need 1-2 |

**Total monthly cost:** $0 (free tier is perfect for this app)

---

## Next Steps

1. ✅ Push current changes to GitHub
2. ✅ Set up Cloudflare Pages with GitHub integration
3. ✅ Configure custom domain (optional)
4. ✅ Share your live URL!

For questions or issues, check:
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages/
- GitHub Issues: https://github.com/gautamkeshri/FuelBillForge/issues

---

**Made with ❤️ for Indian fuel station owners and operators**
