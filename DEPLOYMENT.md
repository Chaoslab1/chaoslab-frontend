# Deployment Guide

Comprehensive guide for deploying the Chaoslab public site (landing page + documentation portal) to production.

## Deployment strategy (current decision)

**Vercel is the canonical deployment target** for this repository going forward.
It's the only target this repo is actively configured and verified for
(`vercel.json`, root `baseUrl`, the Vercel-aware `url` resolution in
`docusaurus.config.ts` — see [Vercel](#vercel) below).

**Netlify** (`.github/workflows/cd.yml`) and **GitHub Pages** (manual
`npm run deploy`) are **not being deleted in this change**. They're left in
place deliberately so the site keeps deploying somewhere if Vercel isn't set
up yet, and so this isn't a one-way door. Once a Vercel deployment has been
live and verified for a reasonable period:

1. Point the production domain (if any) at Vercel.
2. Remove or disable `.github/workflows/cd.yml` (Netlify).
3. Remove the GitHub Pages instructions below and the `deploy` script in
   `package.json` if GitHub Pages was never actually enabled for this repo.

Until that cleanup happens, treat Netlify/GitHub Pages instructions below as
**legacy/coexisting**, not canonical.

## 📋 Table of Contents

- [Deployment strategy](#deployment-strategy-current-decision)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [OpenAPI Sync](#openapi-sync)
- [Deployment Options](#deployment-options)
- [Vercel](#vercel)
- [GitHub Pages](#github-pages)
- [Netlify](#netlify)
- [AWS S3 + CloudFront](#aws-s3--cloudfront)
- [Docker Deployment](#docker-deployment)
- [Post-Deployment](#post-deployment)
- [Rollback Procedures](#rollback-procedures)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Tools

- Node.js 20+ (LTS)
- npm 10+
- Git
- Docker (for container deployments)

### Required Accounts

Depending on your deployment target:

- GitHub account (for GitHub Pages)
- Netlify account (for Netlify)
- Vercel account (for Vercel)
- AWS account (for S3/CloudFront)
- Container registry account (for Docker deployments)

## Environment Setup

### 1. Environment Variables

Create appropriate `.env` files for each environment:

#### Production `.env.production`

```bash
# Algolia DocSearch (optional)
ALGOLIA_APP_ID=your_production_app_id
ALGOLIA_API_KEY=your_production_search_key
ALGOLIA_INDEX_NAME=chaoslab_prod

# Analytics (optional)
GA_MEASUREMENT_ID=G-XXXXXXXXXX
ANALYTICS_ENDPOINT=https://analytics.chaoslab.io/events

# API Endpoints
API_BASE_URL=https://api.chaoslab.io
GRAPHQL_ENDPOINT=https://api.chaoslab.io/graphql
```

#### Staging `.env.staging`

```bash
# Algolia DocSearch (optional)
ALGOLIA_APP_ID=your_staging_app_id
ALGOLIA_API_KEY=your_staging_search_key
ALGOLIA_INDEX_NAME=chaoslab_staging

# Analytics (optional)
GA_MEASUREMENT_ID=G-YYYYYYYYYY
ANALYTICS_ENDPOINT=https://analytics-staging.chaoslab.io/events

# API Endpoints
API_BASE_URL=https://api-staging.chaoslab.io
GRAPHQL_ENDPOINT=https://api-staging.chaoslab.io/graphql
```

### 2. GitHub Secrets

Configure the following secrets in GitHub repository settings:

**Settings → Secrets and variables → Actions → New repository secret**

#### Required Secrets

```bash
# Container Registry
REGISTRY_USERNAME=your_docker_username
REGISTRY_PASSWORD=your_docker_token

# Code Coverage
CODECOV_TOKEN=your_codecov_token

# Security Scanning
SNYK_TOKEN=your_snyk_token

# Deployment - Netlify
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id

# Optional - Algolia
ALGOLIA_APP_ID=your_app_id
ALGOLIA_API_KEY=your_admin_key
ALGOLIA_INDEX_NAME=your_index
```

## OpenAPI Sync

`npm run build` and `npm start` both run `scripts/sync-openapi.mjs` first.
That script fetches the backend's live OpenAPI document from
`${OPENAPI_SOURCE_URL}/docs/openapi.json` and writes it to
`static/openapi.yaml`, which the `/api` (Redoc) and `/sandbox` (Swagger UI)
pages read from at runtime.

- **`OPENAPI_SOURCE_URL`** (falls back to `API_BASE_URL`, then
  `http://localhost:3000`) — must point at a reachable `chaoslab-backend`
  deployment for those two pages to have real content.
- **This is non-fatal by design.** If the URL isn't reachable — no backend
  configured, a contributor running `npm start` locally with no API, or a
  CI/Vercel build with no `OPENAPI_SOURCE_URL` set — the script logs a
  warning and leaves any previously-synced `static/openapi.yaml` in place
  (or none, on a fresh checkout). The rest of the site, including the new
  landing page, builds and deploys successfully regardless.
- **No secret is required or exposed here.** The endpoint being fetched is a
  public OpenAPI document, not an authenticated API — do not set this to a
  URL that requires credentials, since the fetch in `sync-openapi.mjs`
  doesn't send any.
- If `OPENAPI_SOURCE_URL` is never set, the API Reference and Sandbox pages
  will 404 in that deployment. That's expected and documented here rather
  than silently guessed at — set it once a stable `chaoslab-backend` URL
  exists.

## Deployment Options

### Vercel

This is the **canonical** deployment target — see
[Deployment strategy](#deployment-strategy-current-decision) above.

#### Configuration (already in this repo)

- `vercel.json` pins the build explicitly rather than relying on
  auto-detection, since the build runs a custom script
  (`sync:openapi && docusaurus build`) ahead of the framework's own build
  step:
  - Install command: `npm ci`
  - Build command: `npm run build`
  - Output directory: `build` (confirmed against `docusaurus.config.ts` —
    Docusaurus's default, unchanged in this repo)
- `docusaurus.config.ts` resolves `url` from `SITE_URL` →
  `VERCEL_PROJECT_PRODUCTION_URL` → `VERCEL_URL` → `http://localhost:3001`,
  and `baseUrl` is `/` (root), matching how Vercel serves a project.

#### Environment variables

None are required for the build to succeed. Set these if you want full
functionality:

| Variable                                                    | Required? | Effect if unset                                                         |
| ----------------------------------------------------------- | --------- | ----------------------------------------------------------------------- |
| `OPENAPI_SOURCE_URL`                                        | No        | API Reference / Sandbox pages 404 (see [OpenAPI Sync](#openapi-sync))   |
| `SITE_URL`                                                  | No        | Falls back to Vercel's own `VERCEL_PROJECT_PRODUCTION_URL`/`VERCEL_URL` |
| `ALGOLIA_APP_ID` / `ALGOLIA_API_KEY` / `ALGOLIA_INDEX_NAME` | No        | Search is simply not enabled                                            |

#### Deploying

1. [vercel.com](https://vercel.com) → **Add New → Project** → import this
   GitHub repository.
2. Vercel reads `vercel.json` automatically — no manual build/output
   configuration needed. If the dashboard shows different values, they're
   safe to leave as-is; `vercel.json` takes precedence.
3. Add any environment variables from the table above under **Project
   Settings → Environment Variables**.
4. Deploy. Every push to `main` redeploys production; every PR gets a
   preview URL.

#### Manual deployment (Vercel CLI)

```bash
npm install -g vercel
vercel login
vercel --prod
```

### GitHub Pages

_Legacy path — see [Deployment strategy](#deployment-strategy-current-decision). Not the canonical target._

#### Automatic Deployment (Recommended)

GitHub Pages deployment is **not currently wired up in CI** — the CD
workflow (`.github/workflows/cd.yml`) deploys to Netlify, not GitHub Pages
(see [Netlify](#netlify) below). The steps below are for manual/future setup
only.

1. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`

2. **Configure Base URL**

Update `docusaurus.config.ts`:

```typescript
url: "https://chaoslab.github.io",
baseUrl: "/chaoslab-docs/",
```

3. **Deploy**

Push to `main` branch - automatic deployment via GitHub Actions.

#### Manual Deployment

```bash
# Build the site
npm run build

# Deploy to GitHub Pages
GIT_USER=your_username npm run deploy
```

### Netlify

_Legacy path — see [Deployment strategy](#deployment-strategy-current-decision). Currently the only pipeline actually wired up in CI (`.github/workflows/cd.yml`), but no longer the canonical target going forward._

#### Automatic Deployment (Recommended)

Configured in `.github/workflows/cd.yml` for automatic deployments.

1. **Create Netlify Site**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: `20`

3. **Set Environment Variables**
   - Site settings → Environment variables
   - Add production environment variables

4. **Get Deployment Tokens**

   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login
   netlify login

   # Get site ID
   netlify sites:list

   # Create auth token
   # Go to: https://app.netlify.com/user/applications
   ```

5. **Add Secrets to GitHub**
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_SITE_ID`

#### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy to production
netlify deploy --prod --dir=build
```

### AWS S3 + CloudFront

#### Prerequisites

- AWS CLI installed and configured
- S3 bucket created
- CloudFront distribution created
- Route 53 (optional, for custom domain)

#### Setup S3 Bucket

```bash
# Create S3 bucket
aws s3 mb s3://chaoslab-docs-prod --region us-east-1

# Configure bucket for static website hosting
aws s3 website s3://chaoslab-docs-prod \
  --index-document index.html \
  --error-document index.html

# Set bucket policy for public read access
aws s3api put-bucket-policy \
  --bucket chaoslab-docs-prod \
  --policy file://s3-bucket-policy.json
```

**s3-bucket-policy.json**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::chaoslab-docs-prod/*"
    }
  ]
}
```

#### Deploy to S3

```bash
# Build the site
npm run build

# Sync to S3
aws s3 sync build/ s3://chaoslab-docs-prod/ \
  --delete \
  --cache-control max-age=31536000,public \
  --exclude "*.html" \
  --exclude "page-data/*"

# Upload HTML files separately (no cache)
aws s3 sync build/ s3://chaoslab-docs-prod/ \
  --exclude "*" \
  --include "*.html" \
  --include "page-data/*" \
  --cache-control max-age=0,no-cache,no-store,must-revalidate \
  --content-type "text/html"

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

#### Setup CloudFront

```bash
# Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name chaoslab-docs-prod.s3.amazonaws.com \
  --default-root-object index.html
```

### Docker Deployment

#### Docker Hub

```bash
# Build image
docker build -t chaoslab/chaoslab-docs:latest .

# Tag with version
docker tag chaoslab/chaoslab-docs:latest chaoslab/chaoslab-docs:1.0.0

# Login to Docker Hub
docker login

# Push image
docker push chaoslab/chaoslab-docs:latest
docker push chaoslab/chaoslab-docs:1.0.0

# Run container
docker run -d \
  -p 80:80 \
  --name chaoslab-docs \
  --restart unless-stopped \
  chaoslab/chaoslab-docs:latest
```

#### AWS ECS

```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

docker build -t chaoslab-docs .
docker tag chaoslab-docs:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/chaoslab-docs:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/chaoslab-docs:latest

# Create ECS service (via AWS Console or CLI)
```

#### Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: chaoslab-docs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: chaoslab-docs
  template:
    metadata:
      labels:
        app: chaoslab-docs
    spec:
      containers:
        - name: chaoslab-docs
          image: chaoslab/chaoslab-docs:latest
          ports:
            - containerPort: 80
          livenessProbe:
            httpGet:
              path: /health
              port: 80
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: chaoslab-docs
spec:
  selector:
    app: chaoslab-docs
  ports:
    - port: 80
      targetPort: 80
  type: LoadBalancer
```

Deploy:

```bash
kubectl apply -f deployment.yaml
```

## Post-Deployment

### 1. Verify Deployment

```bash
# Check if site is accessible
curl -I https://your-deployment-url.com

# Check health endpoint
curl https://your-deployment-url.com/health

# Run Lighthouse audit
npm install -g @lhci/cli
lhci autorun --url=https://your-deployment-url.com
```

### 2. Test Critical Paths

- [ ] Homepage loads
- [ ] Documentation pages load
- [ ] API Reference page works
- [ ] GraphQL Playground works
- [ ] Search functionality works (if configured)
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] Dark mode toggle works

### 3. Configure Monitoring

Set up monitoring for:

- **Uptime**: Pingdom, UptimeRobot, or AWS Route 53 health checks
- **Performance**: Google PageSpeed Insights, Lighthouse CI
- **Errors**: Sentry, LogRocket
- **Analytics**: Google Analytics, Plausible

### 4. Set Up Alerts

Configure alerts for:

- Site downtime (> 1 minute)
- Performance degradation (Lighthouse score < 80)
- Error rate increases
- SSL certificate expiration

## Rollback Procedures

### GitHub Pages

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or deploy specific version
git checkout v1.0.0
npm run build
GIT_USER=your_username npm run deploy
```

### Netlify

```bash
# Via Netlify CLI
netlify rollback

# Or via Web UI
# Go to Deploys → Select previous deploy → Publish deploy
```

### Docker

```bash
# Stop current container
docker stop chaoslab-docs
docker rm chaoslab-docs

# Run previous version
docker run -d \
  -p 80:80 \
  --name chaoslab-docs \
  --restart unless-stopped \
  chaoslab/chaoslab-docs:1.0.0
```

### AWS S3

```bash
# Enable versioning (do this before issues occur)
aws s3api put-bucket-versioning \
  --bucket chaoslab-docs-prod \
  --versioning-configuration Status=Enabled

# Restore from backup
aws s3 sync s3://chaoslab-docs-prod-backup/ s3://chaoslab-docs-prod/ --delete
```

## Monitoring

### Health Checks

```bash
# Basic health check
curl https://your-site.com/health

# Detailed health check script
#!/bin/bash
SITE_URL="https://your-site.com"

# Check HTTP status
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $SITE_URL)
if [ "$HTTP_CODE" != "200" ]; then
  echo "Site returned HTTP $HTTP_CODE"
  exit 1
fi

# Check response time
RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" $SITE_URL)
if (( $(echo "$RESPONSE_TIME > 2.0" | bc -l) )); then
  echo "Slow response time: ${RESPONSE_TIME}s"
  exit 1
fi

echo "✅ Health check passed"
```

### Performance Monitoring

```bash
# Lighthouse CI (automated)
lhci autorun --url=https://your-site.com

# Web Vitals
# Integrated in Analytics component
```

## Troubleshooting

### Common Issues

#### 1. Build Fails

```bash
# Clear caches
npm run clear
rm -rf node_modules
npm install

# Check Node version
node --version  # Should be 20+

# Run build with verbose logging
npm run build -- --verbose
```

#### 2. Assets Not Loading

```bash
# Check base URL in docusaurus.config.ts
# For GitHub Pages: /repository-name/
# For custom domain: /

# Verify CORS headers if needed
```

#### 3. Search Not Working

```bash
# Verify Algolia credentials
echo $ALGOLIA_APP_ID
echo $ALGOLIA_API_KEY
echo $ALGOLIA_INDEX_NAME

# Test Algolia connection
curl -X GET \
  "https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX_NAME}" \
  -H "X-Algolia-API-Key: ${ALGOLIA_API_KEY}" \
  -H "X-Algolia-Application-Id: ${ALGOLIA_APP_ID}"
```

#### 4. Docker Container Won't Start

```bash
# Check logs
docker logs chaoslab-docs

# Inspect container
docker inspect chaoslab-docs

# Test locally
docker run -it --rm chaoslab-docs:latest sh
```

### Getting Help

- **Documentation**: Check this guide and README.md
- **Issues**: https://github.com/chaoslab/chaoslab-docs/issues
- **Discussions**: https://github.com/chaoslab/chaoslab-docs/discussions
- **Support**: support@chaoslab.io

---

**Last Updated**: 2026-07-10
