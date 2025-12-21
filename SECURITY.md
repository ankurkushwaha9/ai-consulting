# 🔐 Security Policy

## Supported Versions

This project is actively maintained. Security updates are applied to the latest version.

| Version | Supported          |
| ------- | ------------------ |
| Latest  | ✅ Yes             |

## Reporting a Vulnerability

I take security seriously. If you discover a security vulnerability, please follow these steps:

### 📧 How to Report

1. **DO NOT** create a public GitHub issue for security vulnerabilities
2. Instead, please report via one of these methods:
   - **GitHub Private Vulnerability Reporting**: Use the "Security" tab → "Report a vulnerability"
   - **Email**: Create a private gist and share the link with me via GitHub

### 📋 What to Include

When reporting a vulnerability, please include:

- **Description**: A clear description of the vulnerability
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Impact**: What could an attacker potentially do?
- **Affected Component**: Frontend, Backend, Database, or Authentication?
- **Suggested Fix**: If you have ideas on how to fix it (optional)

### ⏱️ Response Timeline

| Action | Timeline |
|--------|----------|
| Initial Response | Within 48 hours |
| Status Update | Within 7 days |
| Fix (if applicable) | Depends on severity |

### 🏆 Recognition

If you report a valid security vulnerability, I'll:
- Credit you in the fix commit (unless you prefer anonymity)
- Add you to a contributors list (if applicable)

## Security Considerations for This Project

### Authentication & Sessions
- Session-based authentication with Passport.js
- Passwords are hashed (never stored in plain text)
- Session secrets should be stored in environment variables

### Database Security
- PostgreSQL with Drizzle ORM
- Parameterized queries to prevent SQL injection
- Database credentials stored in environment variables

### API Security
- Input validation on all endpoints
- CORS configuration for frontend origin

### Environment Variables
Required secrets that should **NEVER** be committed:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Express session secret
- Any API keys

### Dependencies
- Dependencies are regularly reviewed
- Dependabot alerts are monitored
- Updates are applied promptly for security patches

## Security Best Practices

This project follows these security practices:

- ✅ No secrets committed to repository
- ✅ Secret scanning enabled
- ✅ Environment variables for sensitive data
- ✅ Password hashing for user credentials
- ✅ Parameterized database queries
- ✅ MIT License for transparency

---

Thank you for helping keep this project secure! 🙏

## Author

**Ankur Kushwaha** - [@ankurkushwaha9](https://github.com/ankurkushwaha9)
