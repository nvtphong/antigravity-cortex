---
description: "Auto-load skills based on keywords in user requests"
---

# Skill Routing

When the user's request contains these keywords, load the corresponding skill by reading its `SKILL.md` file.

| Keywords in Request | Load Skill | Path |
|---|---|---|
| "database", "schema", "query", "index", "migration", "SQL" | database-design | `.agents/skills/database-design/` |
| "API", "endpoint", "REST", "auth", "JWT", "pagination" | api-patterns | `.agents/skills/api-patterns/` |
| "test", "coverage", "mock", "unit test", "e2e" | testing-patterns | `.agents/skills/testing-patterns/` |
| "security", "vulnerability", "OWASP", "injection", "XSS" | security-audit | `.agents/skills/security-audit/` |
| "review", "code quality", "code review" | code-review | `.agents/skills/code-review/` |
| "problem", "complex", "decompose", "step by step" | sequential-thinking | `.agents/skills/sequential-thinking/` |
| "UI", "UX", "design", "layout", "color", "responsive", "CSS", "animation" | ui-ux-design | `.agents/skills/ui-ux-design/` |
| "refactor", "extract", "split file", "modularize", "code smell", "god function" | refactoring | `.agents/skills/refactoring/` |
| "stuck", "kẹt", "5 whys", "root cause", "rubber duck", "simplify" | problem-solving | `.agents/skills/problem-solving/` |
| "docker", "CI/CD", "deploy", "pipeline", "infrastructure", "devops" | devops | `.agents/skills/devops/` |
| "branch", "merge", "rebase", "conflict", "git flow", "commit message" | git-patterns | `.agents/skills/git-patterns/` |
| "README", "changelog", "API docs", "ADR", "documentation template" | technical-writing | `.agents/skills/technical-writing/` |
| "React", "component", "hooks", "useState", "useEffect", "JSX", "Vite" | react-best-practices | `.agents/skills/react-best-practices/` |
| "Next.js", "App Router", "RSC", "Server Component", "SSR", "SSG", "ISR" | nextjs-patterns | `.agents/skills/nextjs-patterns/` |
| "performance", "Lighthouse", "Core Web Vitals", "LCP", "bundle size", "lazy load" | performance-optimization | `.agents/skills/performance-optimization/` |
| "accessibility", "a11y", "WCAG", "ARIA", "screen reader", "keyboard navigation" | accessibility | `.agents/skills/accessibility/` |
| "TypeScript", "generics", "type", "interface", "Zod", "type guard", "utility type" | typescript-patterns | `.agents/skills/typescript-patterns/` |
| "CSS", "design tokens", "responsive", "grid", "flexbox", "animation", "dark mode" | css-architecture | `.agents/skills/css-architecture/` |

## Rules

- Load skills by reading the `SKILL.md` file in the skill directory
- Skills are **reference material** -- consult them, don't execute them blindly
- Multiple skills can be loaded simultaneously if the request spans domains
- **Unload mentally** after use -- don't carry skill context into unrelated tasks
