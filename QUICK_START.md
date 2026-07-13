# Quick Start Guide

Get up and running with the Chaoslab Documentation Portal in minutes.

## ⚡ 5-Minute Setup

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/chaoslab/chaoslab-docs.git
cd chaoslab-docs

# Install dependencies (takes ~2 minutes)
npm install

# Start development server
npm start
```

**That's it!** The site will open at `http://localhost:3001`

---

## 🎯 Common Tasks

### Development

```bash
# Start dev server with hot reload
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve

# Clear Docusaurus cache
npm run clear
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode (for TDD)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Code Quality

```bash
# Run all quality checks at once
npm run validate

# Or run individually:
npm run typecheck    # TypeScript checking
npm run lint         # ESLint
npm run format:check # Prettier check

# Auto-fix issues
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
```

### Docker

```bash
# Build and run production container
docker-compose up docs

# Or run development mode with hot reload
docker-compose --profile development up docs-dev

# Stop containers
docker-compose down
```

---

## 📝 Making Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

Edit files in:
- `docs/` - Documentation (Markdown)
- `src/components/` - React components
- `src/pages/` - Custom pages
- `src/css/` - Styles

### 3. Test Your Changes

```bash
# Run tests
npm test

# Check code quality
npm run validate

# Preview locally
npm start
```

### 4. Commit

Use [conventional commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "feat: add new documentation page"
git commit -m "fix: resolve navigation bug"
git commit -m "docs: update README"
```

Git hooks will:
- ✅ Format your code
- ✅ Run linter
- ✅ Validate commit message

### 5. Push & Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## 🐳 Docker Commands

### Production

```bash
# Build image
docker build -t chaoslab-docs .

# Run container
docker run -p 3001:80 chaoslab-docs

# Check health
curl http://localhost:3001/health
```

### Development

```bash
# Using Docker Compose (recommended)
docker-compose --profile development up

# Or manually
docker build -f Dockerfile.dev -t chaoslab-docs:dev .
docker run -p 3002:3000 -v $(pwd):/app chaoslab-docs:dev
```

---

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Change port in start command
npm start -- --port 3002
```

### Dependencies Out of Sync

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Cache Issues

```bash
# Clear all caches
npm run clear
rm -rf node_modules/.cache
```

### Tests Failing

```bash
# Update snapshots if needed
npm test -- -u

# Run specific test file
npm test -- SwaggerUI.test.tsx

# Debug mode
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Docker Build Issues

```bash
# Clear Docker cache
docker system prune -a

# Build without cache
docker build --no-cache -t chaoslab-docs .
```

---

## 📚 Documentation Structure

```
docs/
├── ARCHITECTURE.md          # System architecture
├── API_VERSIONING.md        # API versioning guide
├── CICD_PIPELINE.md         # CI/CD documentation
├── CODE_COVERAGE.md         # Coverage docs
├── DOCKER_DEV.md            # Docker development
├── GRAPHQL.md               # GraphQL docs
├── JWT_AUTHENTICATION.md    # Auth docs
├── KYC_INTEGRATION.md       # KYC docs
├── OBSERVABILITY.md         # Monitoring docs
├── SECRETS_MANAGEMENT.md    # Secrets handling
└── ... (68 total files)
```

### Adding Documentation

1. Create a new `.md` file in `docs/`
2. Add it to `sidebars.ts`
3. Use frontmatter for metadata:

```markdown
---
sidebar_position: 1
title: My Page Title
---

# My Page Title

Content here...
```

---

## 🎨 Customization

### Change Theme Colors

Edit `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #your-color;
  --ifm-color-primary-dark: #your-darker-color;
  /* ... */
}
```

### Update Navbar

Edit `docusaurus.config.ts`:

```typescript
navbar: {
  items: [
    { to: '/new-page', label: 'New Page', position: 'left' },
    // ...
  ],
}
```

### Add Custom Page

Create `src/pages/my-page.tsx`:

```typescript
import Layout from '@theme/Layout';

export default function MyPage() {
  return (
    <Layout title="My Page">
      <div>
        <h1>My Custom Page</h1>
      </div>
    </Layout>
  );
}
```

Access at: `http://localhost:3001/my-page`

---

## 🚀 Deployment

### GitHub Pages (Automatic)

Just push to `main` branch - CI/CD handles it!

### Manual Deployment

```bash
# Build
npm run build

# Deploy to GitHub Pages
GIT_USER=your_username npm run deploy

# Or deploy to Netlify
netlify deploy --prod --dir=build

# Or deploy to Vercel
vercel --prod
```

---

## 🔐 Environment Variables

Create `.env` file (optional):

```bash
# Algolia DocSearch (for search functionality)
ALGOLIA_APP_ID=your_app_id
ALGOLIA_API_KEY=your_search_api_key
ALGOLIA_INDEX_NAME=your_index_name

# Analytics (optional)
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Note:** Never commit `.env` to Git!

---

## 📊 Useful Scripts

```bash
# Optimize images in static/
npm run optimize:images

# Generate i18n files
npm run write-translations

# Generate heading IDs
npm run write-heading-ids

# Type check only (no emit)
npm run typecheck

# Lint and fix
npm run lint:fix

# Format all files
npm run format
```

---

## 🆘 Getting Help

### Documentation

- **README.md** - Overview and features
- **CONTRIBUTING.md** - Contribution guidelines
- **DEPLOYMENT.md** - Deployment guide
- **PRODUCTION_CHECKLIST.md** - Production readiness

### Support Channels

- **Issues**: https://github.com/chaoslab/chaoslab-docs/issues
- **Discussions**: https://github.com/chaoslab/chaoslab-docs/discussions
- **Email**: support@chaoslab.io

### Common Links

- Docusaurus Docs: https://docusaurus.io
- React Docs: https://react.dev
- TypeScript Docs: https://www.typescriptlang.org

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

```bash
# 1. Run full validation
npm run validate

# 2. Build successfully
npm run build

# 3. Test production build
npm run serve

# 4. Test Docker build
docker-compose build

# 5. Check for updates
npm outdated
```

---

## 🎓 Learning Resources

### For Contributors

1. **Docusaurus**: https://docusaurus.io/docs
2. **MDX**: https://mdxjs.com/
3. **React**: https://react.dev/learn
4. **TypeScript**: https://www.typescriptlang.org/docs/

### For DevOps

1. **Docker**: https://docs.docker.com/
2. **GitHub Actions**: https://docs.github.com/en/actions
3. **Nginx**: https://nginx.org/en/docs/
4. **Lighthouse**: https://developers.google.com/web/tools/lighthouse

---

## 🏃 Next Steps

### For Developers

1. ✅ Complete this quick start
2. ✅ Read [CONTRIBUTING.md](CONTRIBUTING.md)
3. ✅ Explore the codebase
4. ✅ Pick an issue and start coding!

### For DevOps

1. ✅ Complete this quick start
2. ✅ Read [DEPLOYMENT.md](DEPLOYMENT.md)
3. ✅ Set up GitHub secrets
4. ✅ Test CI/CD pipeline
5. ✅ Deploy to staging
6. ✅ Deploy to production

---

**Ready to build? Let's go! 🚀**
