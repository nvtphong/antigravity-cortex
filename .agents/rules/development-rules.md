---
description: "Tier 0 universal rules -- always active. Request classification, clean code principles, file awareness."
---

# Development Rules (Tier 0 -- Universal)

These rules are ALWAYS active regardless of request type.

## Request Classification

Before ANY action, classify the request:

| Request Type | Trigger | Action |
|-------------|---------|--------|
| **Question** | "what is", "how does", "explain" | Text response only |
| **Simple Code** | "fix", "add", "change" (single file) | Direct edit, light verification |
| **Complex Code** | "build", "create", "implement", "refactor" | Apply Socratic Gate -> Plan -> Implement |
| **Design/UI** | "design", "UI", "page", "dashboard" | Apply Socratic Gate -> Design workflow |
| **Debug** | "error", "bug", "not working", "broken" | Confirm understanding -> `/debug` methodology |
| **Slash Command** | /cook, /plan, /debug, etc. | Follow workflow-specific flow |

## Core Principles

| Principle | Rule |
|-----------|------|
| **YAGNI** | Don't build unused features |
| **KISS** | Simplest solution that works |
| **DRY** | Extract duplicates, reuse |
| **SRP** | Each function/class does ONE thing |
| **Boy Scout** | Leave code cleaner than you found it |

## File Management

- **Naming**: kebab-case, descriptive names (long is fine -- self-documenting for search)
- **Size**: Code files under 200 lines. Modularize if exceeding.
- **Updates**: DO NOT create "enhanced" copies -- update existing files directly

## File Dependency Awareness

**Before editing ANY file, check:**

| Question | Why |
|----------|-----|
| What imports this file? | Dependents might break |
| What does this file import? | Interface changes propagate |
| What tests cover this? | Tests might fail |
| Is this shared? | Multiple places affected |

> 🔴 **Rule:** Edit the file + all dependent files in the SAME task. Never leave broken imports.

## Code Quality

- Prioritize **functionality and readability** over strict linting
- **NO syntax errors** -- always compile/build check after changes
- Use try-catch error handling & security standards
- Write self-documenting code with comments for complex logic only

## Pre-commit

- No secrets in commits (`.env`, API keys, credentials)
- Conventional commit format: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- No AI attribution in commits
- Keep commits focused -- one logical change per commit

## Skill Loading

See `.agents/rules/skill-routing.md` for the full keyword -> skill mapping table.

## Context Efficiency

| Rule | Why |
|------|-----|
| **Prefer tables over prose** | Denser information per token |
| **Summarize findings in <=10 bullets** | Prevents context overflow |
| **Read only relevant file sections** | Don't paste entire 500-line files |
| **Unload skill context after use** | Keep working memory focused |
| **Use `grep_search` before `view_file`** | Find the right lines first, then read only those |
