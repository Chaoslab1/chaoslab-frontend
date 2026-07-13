# Deployment Guide

Comprehensive guide for deploying the Chaoslab Documentation Portal to production.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Deployment Options](#deployment-options)
- [GitHub Pages](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
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

## Deployment Options

### GitHub Pages

#### Automatic Deployment (Recommended)

The CD workflow automatically deploys to GitHub Pages on successful staging deployment.

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

### Vercel

#### Automatic Deployment

1. **Import Project**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import from GitHub

2. **Configure Project**
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm ci`

3. **Set Environment Variables**
   - Project Settings → Environment Variables
   - Add production variables

#### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Build
npm run build

# Deploy to production
vercel --prod
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
