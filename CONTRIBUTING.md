# Contributing to Chaoslab Documentation Portal

Thank you for your interest in contributing to the Chaoslab Documentation Portal! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

## Getting Started

### Prerequisites

- Node.js 20+ (LTS)
- npm 10+
- Git

### Local Development Setup

1. **Fork and clone the repository**

```bash
git clone https://github.com/chaoslab/chaoslab-docs.git
cd chaoslab-docs
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
```

The site will be available at `http://localhost:3001`

4. **Run tests**

```bash
npm test
```

## Development Workflow

### Branch Strategy

- `main` - Production branch (protected)
- `develop` - Development branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates
- `chore/*` - Maintenance tasks

### Making Changes

1. **Create a new branch**

```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**

- Write clean, maintainable code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

3. **Run quality checks**

```bash
npm run validate
```

This runs:
- TypeScript type checking
- ESLint
- Prettier
- Tests

4. **Commit your changes**

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat(component): add new feature"
git commit -m "fix(api): resolve navigation bug"
git commit -m "docs: update README"
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without functionality changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD configuration changes
- `build`: Build system changes

### Examples

```bash
feat(search): add Algolia DocSearch integration
fix(navigation): resolve mobile menu closing issue
docs(readme): update installation instructions
style(components): format code with prettier
refactor(api): simplify error handling logic
perf(images): optimize image loading
test(components): add SwaggerUI component tests
chore(deps): update dependencies
ci(github): add Lighthouse CI workflow
```

## Pull Request Process

### Before Submitting

1. ✅ Ensure all tests pass
2. ✅ Run `npm run validate`
3. ✅ Update documentation if needed
4. ✅ Add tests for new features
5. ✅ Rebase on latest `develop` branch

### Submitting a Pull Request

1. **Push your branch**

```bash
git push origin feature/your-feature-name
```

2. **Create a Pull Request**

- Go to GitHub and create a PR against `develop`
- Fill in the PR template
- Link any related issues
- Request reviews from maintainers

3. **PR Checklist**

- [ ] Clear, descriptive title
- [ ] Description explains what and why
- [ ] Tests added or updated
- [ ] Documentation updated
- [ ] No merge conflicts
- [ ] All CI checks passing

### PR Review Process

- Maintainers will review your PR
- Address any feedback or requested changes
- Once approved, a maintainer will merge your PR

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Place tests next to the component: `ComponentName.test.tsx`
- Use descriptive test names
- Follow the AAA pattern: Arrange, Act, Assert
- Aim for high coverage on critical paths

### Test Example

```typescript
import { render, screen } from "@testing-library/react";
import MyComponent from "../MyComponent";

describe("MyComponent", () => {
  it("renders without crashing", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });

  it("handles user interaction", () => {
    // Arrange
    render(<MyComponent />);
    
    // Act
    // ... user interactions
    
    // Assert
    // ... expectations
  });
});
```

## Documentation

### Adding Documentation

1. Create markdown files in the `docs/` directory
2. Update `sidebars.ts` to include new pages
3. Use clear, concise language
4. Include code examples where appropriate
5. Add diagrams using Mermaid syntax

### Documentation Standards

- Use proper markdown formatting
- Include a clear title and description
- Organize content with headers
- Provide examples and use cases
- Link to related documentation

## Questions?

If you have questions or need help:

1. Check existing [GitHub Issues](https://github.com/chaoslab/chaoslab-docs/issues)
2. Create a new issue with the `question` label
3. Reach out to maintainers

---

**Thank you for contributing to Chaoslab! 🚀**
