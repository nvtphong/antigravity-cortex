---
name: code-review
description: Code review checklists, templates, and security reference for systematic quality assessment
---

# Code Review Skill

Reference material for performing thorough code reviews. Use alongside the `/review` workflow.

## When to Use
- Performing self-review before finalizing implementation
- Running `/review` workflow on changed files
- Checking OWASP security compliance
- Evaluating code quality for pull requests

## Review Checklist

### Structure & Organization
- [ ] Files under 200 lines (modularize if larger)
- [ ] Clear separation of concerns
- [ ] Consistent naming conventions (kebab-case files, meaningful names)
- [ ] No duplicate code across files (DRY)
- [ ] Proper module boundaries

### Logic & Correctness
- [ ] Edge cases handled (null, empty, boundary values)
- [ ] Error scenarios have proper handling (try-catch, error propagation)
- [ ] Async operations properly awaited
- [ ] No race conditions in concurrent code
- [ ] Input validation at entry points

### Type Safety
- [ ] No implicit `any` types (TypeScript projects)
- [ ] Null/undefined checks where needed
- [ ] Function return types explicit for public APIs
- [ ] Generic types used appropriately

### Performance
- [ ] No N+1 query patterns
- [ ] No unnecessary loops or iterations
- [ ] Database indexes for frequently queried columns
- [ ] Large data sets paginated
- [ ] No memory leaks (event listeners cleaned up, subscriptions unsubscribed)
- [ ] Caching used where appropriate

### Security (OWASP Top 10)

| # | Vulnerability | What to Check |
|---|--------------|---------------|
| 1 | **Injection** | Parameterized queries? No string concatenation in SQL? |
| 2 | **Broken Auth** | Password hashing? Session management? Token expiry? |
| 3 | **Sensitive Data** | Encrypted at rest/transit? No secrets in code? |
| 4 | **XXE** | XML parsing disabled external entities? |
| 5 | **Access Control** | Authorization checks on every endpoint? Role validation? |
| 6 | **Misconfiguration** | Debug mode off? Default credentials removed? |
| 7 | **XSS** | Output encoding? CSP headers? No dangerouslySetInnerHTML? |
| 8 | **Deserialization** | Validated before deserializing? Schema validation? |
| 9 | **Known Vulns** | Dependencies up to date? No known CVEs? |
| 10 | **Logging** | Security events logged? No sensitive data in logs? |

## Review Report Template

```markdown
## Code Review: [Scope]

**Reviewer:** AI agent
**Date:** [date]
**Files:** [count]
**Score:** [1-10]

### ðŸ”´ Critical (Must Fix)
- [Issue + file:line + fix suggestion]

### ðŸŸ  High (Should Fix)
- [Issue + file:line + fix suggestion]

### ðŸŸ¡ Medium (Nice to Fix)
- [Issue + file:line + fix suggestion]

### ðŸŸ¢ Positive
- [Good practices observed]

### Summary
[1-2 sentences overall assessment]
```

## Common Anti-Patterns

| Anti-Pattern | Why Bad | Better |
|-------------|---------|--------|
| God function (>50 lines) | Hard to test, maintain | Split into focused functions |
| Magic numbers | Unclear intent | Use named constants |
| Silent error swallowing | Hides bugs | Log error, throw or return error result |
| Deep nesting (>3 levels) | Hard to read | Early returns, extract functions |
| String-based type checking | Fragile, no IDE support | Use proper types/enums |
| Copy-paste code | Maintenance nightmare | Extract shared function |

## See Also

- [security-audit](../security-audit/SKILL.md) — Security-focused review lens
- [testing-patterns](../testing-patterns/SKILL.md) — Test coverage in reviews
- [refactoring](../refactoring/SKILL.md) — Post-review refactoring patterns
