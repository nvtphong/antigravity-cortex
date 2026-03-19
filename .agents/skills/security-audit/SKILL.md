---
name: security-audit
description: OWASP Top 10 deep reference with code examples, input validation patterns, and auth checklists
---

# Security Audit Skill

Deep security reference for code review and security audits. Use with `/review --security`.

## When to Use
- Running security-focused code reviews (`/review --security`)
- Implementing authentication or authorization logic
- Handling user input, file uploads, or external data
- Checking OWASP Top 10 compliance before deployment

## OWASP Top 10 -- Deep Reference

### 1. Injection (SQL, OS, LDAP)

**Risk:** Attacker sends malicious input that executes as code.

| ❌ Vulnerable | ✅ Secure |
|--------------|----------|
| `"SELECT * FROM users WHERE id=" + userId` | `"SELECT * FROM users WHERE id=@Id"` (parameterized) |
| `exec("ping " + userInput)` | Whitelist allowed commands, validate input |
| String concatenation in queries | Always use parameterized queries / ORMs |

**Checklist:**
- [ ] All SQL uses parameterized queries or ORM
- [ ] No string concatenation in ANY query construction
- [ ] Dynamic SQL uses `sp_executesql` (SQL Server) or prepared statements
- [ ] User input validated/sanitized before use in any command

### 2. Broken Authentication

**Checklist:**
- [ ] Passwords hashed with bcrypt/scrypt/argon2 (NOT MD5/SHA-1)
- [ ] Rate limiting on login attempts
- [ ] Session tokens are cryptographically random
- [ ] Tokens expire (access: 15-30min, refresh: 7-30 days)
- [ ] No credentials in logs, URLs, or error messages
- [ ] Multi-factor authentication available for sensitive operations

### 3. Sensitive Data Exposure

**Checklist:**
- [ ] HTTPS everywhere (no HTTP fallback)
- [ ] Sensitive data encrypted at rest (DB, files)
- [ ] No secrets in code, config files, or version control
- [ ] PII data masked in logs
- [ ] Response headers: `X-Content-Type-Options`, `Strict-Transport-Security`
- [ ] Credit card/SSN data never stored unless absolutely necessary

### 4. XML External Entities (XXE)

**Checklist:**
- [ ] XML parsing disables external entity processing
- [ ] Use JSON instead of XML where possible
- [ ] If XML required, use defused parsers (`defusedxml` in Python)

### 5. Broken Access Control

**Checklist:**
- [ ] Authorization checked on EVERY endpoint (not just frontend)
- [ ] Users can only access their OWN resources (IDOR check)
- [ ] Admin endpoints require admin role validation
- [ ] CORS configured to allow only trusted origins
- [ ] Directory listing disabled on web server
- [ ] Rate limiting on sensitive operations

### 6. Security Misconfiguration

**Checklist:**
- [ ] Debug mode OFF in production
- [ ] Default credentials removed/changed
- [ ] Stack traces not exposed to users
- [ ] Unnecessary features/ports/services disabled
- [ ] Security headers set (CSP, HSTS, X-Frame-Options)

### 7. Cross-Site Scripting (XSS)

| Type | Attack Vector | Prevention |
|------|---------------|-----------|
| **Stored** | User input saved to DB, rendered to others | Encode output, sanitize input |
| **Reflected** | Malicious URL parameter reflected in page | Encode URL params, CSP headers |
| **DOM-based** | Client-side JS processes untrusted data | Avoid `innerHTML`, use `textContent` |

**Checklist:**
- [ ] Output encoding on all user-generated content
- [ ] Content Security Policy (CSP) headers set
- [ ] No `dangerouslySetInnerHTML` (React) without sanitization
- [ ] Input sanitization for rich text (use DOMPurify or similar)

### 8. Insecure Deserialization

**Checklist:**
- [ ] Never deserialize untrusted data without validation
- [ ] Use JSON schema validation before processing
- [ ] Avoid language-native serialization for external data (pickle, Java serialization)

### 9. Using Components with Known Vulnerabilities

**Checklist:**
- [ ] Dependencies regularly updated
- [ ] `npm audit` / `pip audit` run before deployment
- [ ] No dependencies with known CVEs in production
- [ ] Lock file committed (package-lock.json, requirements.txt)

### 10. Insufficient Logging & Monitoring

**Checklist:**
- [ ] Authentication events logged (login, logout, failed attempts)
- [ ] Authorization failures logged
- [ ] Input validation failures logged
- [ ] No sensitive data in logs (passwords, tokens, PII)
- [ ] Logs monitored for anomalies
- [ ] Alerting configured for suspicious patterns

## Input Validation Patterns

| Validation | Pattern |
|-----------|---------|
| **Email** | Regex + DNS check for production |
| **Phone** | Strip non-digits, validate length/format |
| **Password** | Min 8 chars, complexity requirements |
| **File upload** | Whitelist extensions, check MIME type, size limit |
| **URL** | Whitelist protocols (http/https), validate format |
| **Integer** | Parse + range check, reject non-numeric |
| **Free text** | Max length, encode/sanitize before display |

> **Golden Rule:** Validate on server side ALWAYS. Client-side validation is UX only.

---

## See Also

- **api-patterns** -- Auth headers, JWT, rate limiting, CORS configuration
- **code-review** -- Security lens in multi-lens review process
- **database-design** -- Parameterized queries, SQL injection prevention
