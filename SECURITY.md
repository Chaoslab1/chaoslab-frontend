# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The Chaoslab team takes security vulnerabilities seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report a Security Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via one of the following methods:

1. **Email**: Send details to security@chaoslab.io
2. **GitHub Security Advisories**: Use the [GitHub Security Advisory](https://github.com/chaoslab/chaoslab-docs/security/advisories/new) feature

### What to Include

Please include the following information in your report:

- Type of vulnerability (e.g., XSS, CSRF, SQL injection, etc.)
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it
- Your assessment of the severity

### What to Expect

When you report a vulnerability, you can expect:

1. **Acknowledgment**: We'll acknowledge receipt within 48 hours
2. **Assessment**: We'll assess the vulnerability and determine its severity
3. **Updates**: We'll keep you informed of our progress
4. **Resolution**: We'll work on a fix and coordinate disclosure timing
5. **Credit**: We'll credit you in the security advisory (if desired)

### Response Timeline

- **Critical vulnerabilities**: Patched within 24-48 hours
- **High severity**: Patched within 1 week
- **Medium severity**: Patched within 2-4 weeks
- **Low severity**: Patched in next regular release

## Security Measures

### Automated Security

Our project includes:

- **npm audit**: Runs on every CI build
- **Snyk scanning**: Continuous vulnerability monitoring
- **Dependabot**: Automated dependency updates
- **Dependency review**: On all pull requests
- **Container scanning**: Docker image vulnerability checks

### Code Security

- **TypeScript**: Strong typing to prevent runtime errors
- **ESLint**: Static code analysis for security issues
- **Content Security Policy**: Strict CSP headers
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.
- **Input validation**: All user inputs are validated
- **Output encoding**: XSS prevention

### Infrastructure Security

- **Non-root containers**: Docker runs as unprivileged user
- **Minimal base images**: Alpine Linux for reduced attack surface
- **Health checks**: Automated monitoring and alerting
- **HTTPS only**: All production traffic encrypted
- **Rate limiting**: Protection against DDoS attacks (configured in deployment)

## Security Best Practices for Contributors

### Development

- Never commit secrets, API keys, or credentials
- Use `.env` files for local configuration (never commit `.env`)
- Keep dependencies up to date
- Run `npm audit` before committing
- Follow secure coding practices

### Dependencies

- Only add dependencies from trusted sources
- Review dependency licenses before adding
- Keep dependencies minimal
- Update regularly with `npm update`
- Check for vulnerabilities with `npm audit`

### Code Review

All code changes go through:

1. Automated security scanning
2. Peer review by maintainers
3. CI/CD quality gates
4. Pre-deployment testing

## Known Security Considerations

### Third-Party Services

This project uses the following third-party services:

- **Docusaurus**: Static site generator (MIT license)
- **Swagger UI**: API documentation viewer
- **GraphQL Playground**: GraphQL IDE
- **Algolia DocSearch**: Search functionality (optional)

### Browser Security

The documentation portal is a static site and:

- Does not collect personal data
- Does not use authentication
- Does not store cookies (except Algolia search preferences)
- Does not execute user-submitted code

### Content Security

- All documentation content is version controlled
- Changes require pull request approval
- Automated checks prevent malicious content
- Content Security Policy prevents inline script execution

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find similar problems
3. Prepare fixes for all supported versions
4. Release patches as soon as possible
5. Publish a security advisory

We request that you:

- Give us reasonable time to fix the issue before public disclosure
- Make a good faith effort to avoid privacy violations, data destruction, and service interruption
- Do not access or modify data that doesn't belong to you
- Do not exploit the vulnerability beyond the minimal necessary testing

## Security Updates

Subscribe to security updates:

- Watch this repository for security advisories
- Enable Dependabot alerts on your fork
- Follow [@ChaoslabDev](https://twitter.com/ChaoslabDev) on Twitter

## Bug Bounty Program

We currently do not have a paid bug bounty program. However, we:

- Publicly acknowledge security researchers (with permission)
- Credit researchers in our security advisories
- Provide recognition in our SECURITY_HALL_OF_FAME.md file

## Security Hall of Fame

We thank the following researchers for responsibly disclosing security issues:

<!-- List will be maintained here -->

---

## Questions?

If you have questions about this security policy, please contact:

- Email: security@chaoslab.io
- GitHub: Open a [discussion](https://github.com/chaoslab/chaoslab-docs/discussions)

---

**Last updated**: 2026-07-10
