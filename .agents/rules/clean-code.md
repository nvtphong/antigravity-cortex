---
description: "Pragmatic coding standards -- naming, functions, structure, and anti-patterns"
---

# Clean Code Standards

Pragmatic coding standards for AI-assisted development. Focus on what matters.

## Naming Rules

| Element | Convention | Example |
|---------|-----------|---------|
| **Variables** | Reveal intent | `userCount` not `n`, `isActive` not `flag` |
| **Functions** | Verb + noun | `getUserById()` not `user()` |
| **Booleans** | Question form | `isActive`, `hasPermission`, `canEdit` |
| **Constants** | SCREAMING_SNAKE | `MAX_RETRY_COUNT`, `API_BASE_URL` |
| **Files** | kebab-case | `user-service.ts`, `auth-middleware.cs` |

> **Rule:** If you need a comment to explain a name, rename it.

## Function Rules

| Rule | Standard |
|------|----------|
| **Small** | Max 20 lines, ideally 5-10 |
| **One Thing** | Does one thing, does it well |
| **One Level** | One level of abstraction per function |
| **Few Args** | Max 3 arguments, prefer 0-2 |
| **No Side Effects** | Don't mutate inputs unexpectedly |
| **Early Returns** | Guard clauses at top, happy path at bottom |

## Code Structure

| Pattern | Apply |
|---------|-------|
| **Guard Clauses** | Early returns for edge cases |
| **Flat > Nested** | Avoid deep nesting (max 2 levels) |
| **Composition** | Small functions composed together |
| **Colocation** | Keep related code close |
| **Single exit** | Prefer one return point when logic is complex |

## Anti-Patterns

| ❌ DON'T | ✅ DO |
|----------|-------|
| Comment every line | Delete obvious comments |
| Helper for one-liner | Inline the code |
| `utils.ts` with 1 function | Put code where it's used |
| Deep nesting (>3 levels) | Guard clauses + extract |
| Magic numbers | Named constants |
| God functions (>50 lines) | Split by responsibility |
| Silent error swallowing | Log error, throw or return error |
| String-based type checking | Proper types/enums |
| Copy-paste code | Extract shared function |

## AI Coding Style

| Situation | Action |
|-----------|--------|
| User asks for feature | Write it directly |
| User reports bug | Fix it, explain root cause briefly |
| No clear requirement | Ask (Socratic Gate), don't assume |
| Multiple approaches | Briefly state choice and WHY |

> **Remember:** The user wants working code, not a programming lesson.
