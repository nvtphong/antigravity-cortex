---
name: api-patterns
description: REST API design standards, authentication patterns, error handling, versioning, and documentation
---

# API Patterns Skill

Reference material for designing and implementing APIs.

## When to Use
- Designing new REST endpoints or modifying existing ones
- Choosing authentication strategy (JWT, OAuth, API keys)
- Handling API errors and status codes
- Implementing pagination, versioning, or filtering

## RESTful Conventions

### HTTP Methods

| Method | Purpose | Idempotent | Request Body |
|--------|---------|------------|-------------|
| `GET` | Retrieve resource(s) | Yes | No |
| `POST` | Create resource | No | Yes |
| `PUT` | Replace resource entirely | Yes | Yes |
| `PATCH` | Partial update | No | Yes |
| `DELETE` | Remove resource | Yes | No |

### URL Structure

```
GET    /api/v1/users          # List users (with pagination)
GET    /api/v1/users/:id      # Get single user
POST   /api/v1/users          # Create user
PUT    /api/v1/users/:id      # Replace user
PATCH  /api/v1/users/:id      # Update user fields
DELETE /api/v1/users/:id      # Delete user

# Nested resources
GET    /api/v1/users/:id/orders
POST   /api/v1/users/:id/orders

# Filtering, sorting, pagination
GET    /api/v1/users?status=active&sort=-createdAt&page=2&limit=20
```

### Status Codes

| Code | Meaning | When |
|------|---------|------|
| `200` | OK | Successful GET/PUT/PATCH |
| `201` | Created | Successful POST |
| `204` | No Content | Successful DELETE |
| `400` | Bad Request | Validation error, malformed input |
| `401` | Unauthorized | Missing/invalid authentication |
| `403` | Forbidden | Authenticated but not authorized |
| `404` | Not Found | Resource doesn't exist |
| `409` | Conflict | Duplicate resource, state conflict |
| `422` | Unprocessable | Semantic validation error |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Error | Unexpected server error |

## Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" },
      { "field": "age", "message": "Must be >= 18" }
    ]
  }
}
```

**Rules:**
- Always return structured error objects (not plain strings)
- Include machine-readable `code` AND human-readable `message`
- Never expose internal stack traces in production
- Log full error details server-side, return safe summary to client

## Authentication Patterns

| Pattern | Best For | Notes |
|---------|----------|-------|
| **JWT (Bearer Token)** | SPAs, mobile apps | Stateless, include expiry, use refresh tokens |
| **Session Cookie** | Server-rendered apps | HttpOnly + Secure + SameSite flags |
| **API Key** | Server-to-server | In header (not URL), rotate regularly |
| **OAuth2** | Third-party auth | Use authorization code flow, not implicit |

### JWT Best Practices
- Short-lived access tokens (15-30 min)
- Long-lived refresh tokens (7-30 days) with rotation
- Store refresh token in HttpOnly cookie (not localStorage)
- Include `iss`, `exp`, `sub`, `iat` claims

## Pagination

```json
{
  "data": [/* items */],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

| Pattern | Use When |
|---------|----------|
| **Offset-based** | Simple UI with page numbers |
| **Cursor-based** | Real-time feeds, large datasets, infinite scroll |
| **Keyset** | High-performance, stable ordering required |

## Versioning

| Strategy | Example | Pros | Cons |
|----------|---------|------|------|
| **URL path** | `/api/v1/users` | Clear, easy to route | URL clutter |
| **Header** | `Accept: application/vnd.api.v1+json` | Clean URLs | Hidden, harder to test |
| **Query param** | `/api/users?version=1` | Simple | Caching issues |

**Recommended:** URL path versioning (`/api/v1/`) for simplicity and clarity.

## See Also

- [security-audit](../security-audit/SKILL.md) — OWASP Top 10, input validation
- [typescript-patterns](../typescript-patterns/SKILL.md) — API type safety with Zod
- [database-design](../database-design/SKILL.md) — Schema design for API data layer
- [testing-patterns](../testing-patterns/SKILL.md) — API endpoint testing strategies
