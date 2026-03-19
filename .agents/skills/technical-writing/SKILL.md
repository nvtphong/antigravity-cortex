---
name: technical-writing
description: README templates, changelogs, API docs, decision records, and code comment guidelines
---

# Technical Writing

Standards for project documentation -- READMEs, changelogs, API docs, and decision records.

## README Template

Every project README should have:

```markdown
# Project Name

> One-line description of what this does.

[![CI](badge-url)](link) [![License](badge-url)](link)

## Quick Start

​```bash
npm install
npm run dev
​```

## Features

- Feature 1 -- brief description
- Feature 2 -- brief description

## Usage

[Code examples showing primary use case]

## API Reference

[If applicable -- link to docs or inline reference]

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `DB_URL` | -- | Database connection string |

## Contributing

[Link to CONTRIBUTING.md or brief guidelines]

## License

MIT (c) [Author]
```

### README Anti-Patterns

| ❌ DON'T | ✅ DO |
|----------|------|
| Start with project history | Start with what it DOES |
| Wall of text | Badges + Quick Start + Features |
| "See docs for more" (no link) | Direct link to specific doc |
| Outdated install instructions | Test your own Quick Start regularly |
| No examples | Show the most common use case |

---

## Changelog (Keep a Changelog)

```markdown
# Changelog

## [1.2.0] - 2026-03-19

### Added
- User authentication with JWT refresh tokens
- Rate limiting middleware

### Changed
- Upgraded database driver to v5

### Fixed
- Login redirect loop on expired sessions

### Removed
- Deprecated v1 API endpoints
```

| Category | When to use |
|----------|-------------|
| **Added** | New features |
| **Changed** | Existing functionality changes |
| **Deprecated** | Soon-to-be removed features |
| **Removed** | Removed features |
| **Fixed** | Bug fixes |
| **Security** | Vulnerability patches |

---

## API Documentation

### Endpoint Documentation Pattern

```markdown
### POST /api/users

Create a new user account.

**Request:**
​```json
{
  "email": "user@example.com",
  "password": "securePass123",
  "name": "John Doe"
}
​```

**Response (201):**
​```json
{
  "id": "usr_abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2026-03-19T10:00:00Z"
}
​```

**Errors:**
| Status | Code | Description |
|--------|------|-------------|
| 400 | `VALIDATION_ERROR` | Missing required fields |
| 409 | `DUPLICATE_EMAIL` | Email already registered |
| 429 | `RATE_LIMITED` | Too many requests |
```

---

## Architecture Decision Records (ADRs)

Document important technical decisions:

```markdown
# ADR-001: Use PostgreSQL over MongoDB

## Status: Accepted

## Context
We need a database for user data with complex relationships (users -> orders -> items).

## Decision
PostgreSQL -- relational data, ACID transactions, mature ecosystem.

## Consequences
- ✅ Strong data integrity with foreign keys
- ✅ Complex queries with JOINs
- [!]️ Schema migrations needed for changes
- [!]️ Slightly more setup than MongoDB
```

**When to write an ADR:**
- Choosing a database, framework, or architecture pattern
- Making a trade-off (performance vs simplicity, etc.)
- Deviating from team standards
- Any decision you'd want to explain to a new team member

---

## Code Comments

### When to Comment

| ✅ Comment | ❌ Don't Comment |
|-----------|-----------------|
| **WHY** -- business reason, trade-off | **WHAT** -- the code already says what |
| **WARNING** -- non-obvious side effects | Obvious logic (`i++; // increment i`) |
| **TODO** -- known tech debt with ticket | Closing braces (`} // end if`) |
| **HACK** -- workaround with context | Every function/variable |
| **API contracts** -- public interface docs | Internal implementation details |

### Comment Format

```typescript
// HACK: API returns dates as strings, server timezone inconsistent.
// Normalize to UTC until backend fix (JIRA-1234).
const date = normalizeToUTC(response.date);

// WARNING: This function is called 10K+ times per request.
// Keep it allocation-free -- no object creation inside.
function fastLookup(key: string): number { ... }

// TODO(phong): Replace with Redis when we hit 1M users
const cache = new Map<string, User>();
```

## See Also

- [code-review](../code-review/SKILL.md) � Documentation quality in reviews
- [api-patterns](../api-patterns/SKILL.md) � API documentation standards
- [git-patterns](../git-patterns/SKILL.md) � Commit messages, changelogs
