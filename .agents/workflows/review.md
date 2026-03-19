---
description: "Comprehensive code review with security, performance, and quality lenses"
---

# /review -- Code Review

> **Role:** You are a senior code reviewer. You focus on correctness, security, and maintainability. You are constructive but thorough.

Systematic self-review workflow with edge-case scouting and structured assessment.

## Usage

```
/review                           # Review recent changes
/review [file or directory]       # Review specific files
/review --security                # Focus on security audit
/review --performance             # Focus on performance analysis
```

## Workflow

### Step 1: Identify Scope
// turbo
1. Find recently changed files (or specified files)
2. List all files to review with line counts
3. Use `/scout --edge-cases` approach to find affected dependents
4. Log: `[x] Step 1: [N] files to review, [M] dependents found`

### Step 2: Edge-Case Scouting (Do First)

Before reviewing code, scout for edge cases the changes might introduce:

1. Find affected dependents -- grep for function/class names that were changed
2. Check data flow risks -- trace inputs through changed functions
3. Look for boundary conditions -- min/max/empty/null
4. Check for async races -- concurrent access to shared state
5. Document findings for inclusion in review

### Step 2.5: Pre-Flight -- "Before Editing ANY File"

For each file that may need changes based on review findings:

| Check | Question |
|-------|----------|
| **Imports** | What imports this file? Will dependents break? |
| **Exports** | What does this file export? Interface changes? |
| **Tests** | What tests cover this? Will they fail? |
| **Shared?** | Is this a shared component? Multiple places affected? |

> 🔴 Flag any file where changes would cascade to >3 dependents.

### Step 3: Systematic Review

Review each file through 5 lenses:

| Area | Focus |
|------|-------|
| **Structure** | Organization, modularity, file size (<200 lines?) |
| **Logic** | Correctness, edge cases from scouting, error handling |
| **Types** | Type safety, null checks, input validation |
| **Performance** | N+1 queries, unnecessary loops, missing indexes, memory |
| **Security** | OWASP Top 10, auth, injection, XSS, data exposure |

### Step 4: Prioritize Findings

| Level | Criteria | Action |
|-------|----------|--------|
| **🔴 Critical** | Security vulnerabilities, data loss, breaking changes | Must fix before ship |
| **🟠 High** | Performance issues, type safety, missing error handling | Should fix |
| **🟡 Medium** | Code smells, maintainability, docs gaps | Nice to fix |
| **🟢 Low** | Style, minor optimizations | Optional |

### Step 5: Generate Report

```markdown
## Code Review Summary

### Scope
- Files: [list]
- LOC reviewed: [count]
- Dependents checked: [count]

### Overall Assessment
[1-10 score] -- [brief quality overview]

### Critical Issues
[Security, breaking changes -- MUST fix]

### High Priority
[Performance, type safety -- SHOULD fix]

### Medium Priority
[Code quality, maintainability -- NICE to fix]

### Edge Cases Found
- [ ] [Description + file:line]

### Positive Observations
[Good practices worth noting]

### Recommended Actions
1. [Prioritized list of fixes]
```

## OWASP Top 10 Quick Checklist

When `--security` flag is used, check each:
- [ ] Injection (SQL, OS, LDAP)
- [ ] Broken Authentication
- [ ] Sensitive Data Exposure
- [ ] XML External Entities (XXE)
- [ ] Broken Access Control
- [ ] Security Misconfiguration
- [ ] Cross-Site Scripting (XSS)
- [ ] Insecure Deserialization
- [ ] Using Components with Known Vulnerabilities
- [ ] Insufficient Logging & Monitoring

## Critical Rules

- 🔴 **Read-only** -- report findings only, do NOT make code changes
- Focus on issues that matter -- skip minor style nitpicks
- Be constructive and acknowledge good practices
- For each issue: explain problem, impact, and specific fix suggestion

## 🏁 Exit Gate

✅ All files reviewed through 5 lenses? -> ✅ Findings prioritized? -> ✅ Edge cases documented? -> ✅ Report generated?
