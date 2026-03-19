# 🧠 Antigravity Cortex

> **The intelligent `.agents` kit that makes AI coding agents actually think before they code.**

[![npm version](https://img.shields.io/npm/v/antigravity-cortex.svg)](https://www.npmjs.com/package/antigravity-cortex)
[![npm downloads](https://img.shields.io/npm/dm/antigravity-cortex.svg)](https://www.npmjs.com/package/antigravity-cortex)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Quick Start

**One command. Zero config. Instant intelligence.**

```bash
# Navigate to your project and run:
npx antigravity-cortex
```

That's it. The `.agents/` directory is now installed in your project. Open VS Code with Gemini and start coding smarter.

---

## What is this?

**Antigravity Cortex** is a structured `.agents` kit -- a collection of rules, workflows, and skills that transform how AI coding agents behave. Instead of blindly generating code, your AI agent will:

- 🤔 **Ask before coding** (Socratic Gate)
- 📋 **Plan before implementing** (structured workflows)
- 🔍 **Review its own work** (multi-lens self-check)
- 🛡️ **Follow security practices** (OWASP-aware)
- ✅ **Verify before claiming done** (mandatory exit gates)

## Why?

Most AI coding agents suffer from:

| Problem | Without Cortex | With Cortex |
|---------|---------------|-------------|
| Rushes into code | ❌ Starts coding immediately | ✅ Asks clarifying questions first |
| Ignores edge cases | ❌ Happy path only | ✅ Systematic edge-case scouting |
| Claims "done" prematurely | ❌ "Should work now!" | ✅ 5-point mandatory self-check |
| No security awareness | ❌ SQL injection? What's that? | ✅ OWASP Top 10 built-in |
| Inconsistent quality | ❌ Varies wildly | ✅ Structured workflows every time |

## Installation

### Option 1: npx (Recommended)

The fastest way to get started. No global install needed.

```bash
cd your-project
npx antigravity-cortex
```

This will copy the `.agents/` directory into your project with all rules, workflows, and skills.

**Already have `.agents/`?** Use `--force` to overwrite:

```bash
npx antigravity-cortex --force
```

### Option 2: npm Global Install

Install once, use everywhere:

```bash
npm install -g antigravity-cortex

# Then in any project:
cd your-project
antigravity-cortex
```

### Option 3: Git Clone

For contributors or those who want to inspect the source:

```bash
git clone https://github.com/nvtphong/antigravity-cortex.git
cp -r antigravity-cortex/.agents /path/to/your/project/
```

### Prerequisites

- **IDE:** [VS Code](https://code.visualstudio.com/) or [Cursor](https://cursor.sh/) (or any editor with Gemini integration)
- **AI Agent:** [Gemini Code Assist](https://cloud.google.com/gemini/docs/codeassist/overview) (Antigravity) -- the `.agents` structure is natively supported by Google Gemini's agent system
- **No extra extensions needed** -- Gemini automatically detects the `.agents/` directory in your project root

> **Note:** This kit is built exclusively for **Antigravity (Gemini)**. Other AI agents (Copilot, Cursor AI, etc.) may not fully support the `.agents/` structure.

---

## Usage Guide

### How It Works -- The 3-Layer System

Cortex operates on **3 layers** that work together automatically:

```
📦 Your Request
  |
  +-- 🔒 Rules (always active, invisible)
  |     Agent automatically asks questions, follows clean code standards,
  |     validates its own work -- you don't need to do anything.
  |
  +-- ⚡ Workflows (you trigger with /commands)
  |     Type a slash command to activate a structured workflow.
  |     e.g. /cook, /debug, /fix, /plan
  |
  +-- 📚 Skills (auto-loaded by keywords)
        Agent detects keywords in your request and loads
        relevant domain knowledge behind the scenes.
```

### Using Workflows (Slash Commands)

Type a `/command` followed by your task description in the chat. The agent will follow a structured, multi-step process:

#### 🍳 `/cook` -- Build a Feature

The main implementation workflow. Research -> Plan -> Code -> Test -> Self-review -> Done.

```
/cook add dark mode toggle to the settings page
/cook implement user avatar upload with image cropping
/cook create a REST API endpoint for order history
```

**What happens when you type `/cook add dark mode toggle`:**
1. **Classify** -- Agent detects "moderate complexity" (multi-file)
2. **Socratic Gate** -- Agent asks: _"CSS-only or save preference to DB? Which pages should support dark mode?"_
3. **Research** -- Agent scans your codebase for existing theme/CSS patterns
4. **Plan** -- Agent creates an implementation plan and asks for your approval
5. **Implement** -- Agent writes the code, following your existing patterns
6. **Self-Review** -- Agent checks for security issues, edge cases, performance
7. **Verify** -- Agent runs build/tests and confirms everything works

#### 🐛 `/debug` -- Investigate a Bug

For when you don't know **why** something is broken. Systematic investigation, not random guesses.

```
/debug login returns 500 error after upgrading auth library
/debug images don't load on the product page in production
/debug memory usage spikes every 30 minutes
```

**What happens:** Agent traces the error backwards through the call stack, generates competing hypotheses, tests each one, and only fixes when the root cause is confirmed.

#### 🔧 `/fix` -- Fix a Known Issue

For when you **know what's broken** and just need it fixed. Faster than `/debug`.

```
/fix TypeError: Cannot read property 'map' of undefined in UserList.tsx
/fix missing import for useState in Dashboard component
/fix --test                        (run tests, fix all failures)
/fix --ci                          (read CI logs, fix pipeline errors)
```

**Rule of thumb:** Can you describe the fix in one sentence? -> Use `/fix`. Need to investigate? -> Use `/debug`.

#### 📐 `/plan` -- Design Before Building

Creates a detailed implementation plan without writing code. Perfect for complex features.

```
/plan migrate from REST to GraphQL
/plan add multi-tenant support to the database layer
/plan --hard redesign the authentication system    (includes red-team review)
```

**What happens with `--hard`:** After planning, the agent adopts 3 hostile personas (Security Adversary, Assumption Destroyer, Scope Critic) and tries to tear apart its own plan. Catches flaws before a single line of code is written.

#### 🔍 `/scout` -- Explore the Codebase

Find files fast. Use before starting any feature work.

```
/scout authentication logic
/scout database migration files
/scout "error handling patterns"
/scout payment module --edge-cases     (find potential edge cases too)
```

#### Other Workflows

| Command | Example | What It Does |
|---------|---------|-------------|
| `/review` | `/review src/auth/` | Multi-lens code review (security, performance, quality) |
| `/test` | `/test src/utils/` | Generate tests, run them, report coverage |
| `/brainstorm` | `/brainstorm caching strategy` | Structured ideation with pros/cons |
| `/design` | `/design dashboard for analytics` | UI/UX design with prototyping |
| `/explain` | `/explain how the auth flow works` | Visual explanation with Mermaid diagrams |
| `/docs` | `/docs --init` | Generate/update project documentation |
| `/git` | `/git commit` | Stage and commit with conventional commit format |
| `/init` | `/init` | Scaffold a new project with best-practice structure |
| `/watzup` | `/watzup` | Quick project status: recent changes + next actions |

### Understanding Flags

Flags modify how a workflow runs. Here's what each one means:

| Flag | Available In | What It Does |
|------|-------------|-------------|
| `--fast` | `/cook`, `/fix`, `/plan`, `/design` | **Skip research phase.** Jump straight to plan/fix. Use when you already know the codebase well. |
| `--auto` | `/cook` | **Skip review gates.** Agent won't pause to ask for approval between steps. Use when you trust the agent. |
| `--turbo` | `/cook` | **Maximum speed.** No research, no review gates, no pause. Combines `--fast` + `--auto`. |
| `--hard` | `/fix`, `/plan` | **Deep mode.** Full investigation for `/fix`. Plan + Red-Team + Validate interview for `/plan`. |
| `--quick` | `/debug`, `/brainstorm` | **Abbreviated process.** Fewer phases, faster result. For small issues. |
| `--test` | `/fix` | **Test-first mode.** Run tests first, then fix all failures automatically. |
| `--ci` | `/fix` | **CI/CD mode.** Read pipeline logs and fix deployment/build failures. |
| `--red-team` | `/plan` | **Adversarial review only.** Plan + 3 hostile personas critique it. |
| `--validate` | `/plan` | **Critical questions only.** Plan + self-interview with key questions. |
| `--edge-cases` | `/scout` | **Find edge cases.** Also check for boundary conditions and affected dependents. |
| `--security` | `/review` | **Security-focused review.** Emphasize OWASP, auth, injection vectors. |
| `--performance` | `/review` | **Performance-focused review.** Emphasize N+1 queries, memory leaks, bundle size. |
| `--proto` | `/design` | **Prototype mode.** Generate interactive prototypes. |

### How Skills Work (Automatic)

Skills are **loaded automatically** -- you don't need to do anything special. The agent detects keywords in your request and loads the relevant domain knowledge.

| Your Request Contains... | Skill Loaded | What Agent Gets |
|--------------------------|-------------|-----------------|
| "database", "schema", "SQL", "migration" | `database-design` | Schema patterns, indexing strategy, query optimization |
| "API", "endpoint", "REST", "JWT" | `api-patterns` | REST standards, auth patterns, pagination, versioning |
| "test", "coverage", "mock", "unit test" | `testing-patterns` | Test pyramid, AAA pattern, mocking strategies |
| "security", "OWASP", "injection", "XSS" | `security-audit` | OWASP Top 10 deep reference with code examples |
| "React", "component", "hooks", "useState" | `react-best-practices` | Component patterns, hooks, state, performance |
| "TypeScript", "generics", "type", "Zod" | `typescript-patterns` | Advanced patterns, type narrowing, utility types |
| "CSS", "design tokens", "responsive", "animation" | `css-architecture` | Modern CSS patterns, design tokens, responsive layouts |
| "refactor", "modularize", "code smell" | `refactoring` | 5 core refactoring patterns, safety protocols |
| "docker", "CI/CD", "deploy", "pipeline" | `devops` | Docker, CI/CD, deployment patterns |
| "accessibility", "a11y", "WCAG", "ARIA" | `accessibility` | WCAG compliance, ARIA patterns, keyboard navigation |
| "performance", "Lighthouse", "bundle size" | `performance-optimization` | Core Web Vitals, bundle analysis, lazy loading |
| "Next.js", "App Router", "RSC", "SSR" | `nextjs-patterns` | App Router, Server Components, data fetching |
| "stuck", "kẹt", "root cause", "simplify" | `problem-solving` | 5 techniques for breaking through complexity |
| "README", "changelog", "API docs" | `technical-writing` | Documentation templates and guidelines |
| "branch", "merge", "rebase", "conflict" | `git-patterns` | Branching strategies, conflict resolution |
| "UI", "UX", "design", "layout", "color" | `ui-ux-design` | Design systems, color theory, typography, UX |
| "review", "code quality" | `code-review` | Checklists, security reference, quality assessment |
| "problem", "complex", "step by step" | `sequential-thinking` | Structured problem decomposition |

> **Example:** If you type _"Add a REST API endpoint with JWT authentication"_, the agent automatically loads both `api-patterns` and `security-audit` skills. You don't need to tell it.

### How Rules Work (Invisible)

Rules are **always active** -- they shape the agent's behavior on every single request, without you needing to do anything.

| Rule | What It Does | You'll Notice... |
|------|-------------|-----------------|
| **Task Lifecycle** | Every task flows through Classify -> Gate -> Plan -> Execute -> Check -> Deliver | Agent follows a consistent, structured process |
| **Socratic Gate** | Agent must ask strategic questions before complex tasks | Agent asks 2-3 questions before coding |
| **Development Rules** | Classifies requests by complexity, applies YAGNI/KISS/DRY | Small tasks get fast responses, big tasks get plans |
| **Output Calibration** | Response depth matches task complexity | Simple fixes get short answers, complex tasks get detailed reports |
| **Skill Routing** | Auto-loads relevant skills based on keywords | Agent suddenly knows about TypeScript generics when you mention "type" |
| **Clean Code** | Enforces naming conventions, function size limits, anti-patterns | Agent writes readable, consistent code |
| **Error Recovery** | SCDFV loop: Stop -> Capture -> Diagnose -> Fix -> Verify | When something fails, agent investigates instead of blindly retrying |
| **Self-Check** | 5-point verification before claiming done | Agent verifies: Goal met? Files edited? Code works? No errors? Nothing forgotten? |
| **Documentation** | Updates docs after code changes | Agent updates README/comments when it changes functionality |

---

## Architecture

```
.agents/
+-- rules/          <- Always active behavioral constraints (9 rules)
|   +-- README.md                     Priority & conflict resolution
|   +-- task-lifecycle.md             6-phase pipeline orchestrator
|   +-- socratic-gate.md              Ask before coding
|   +-- development-rules.md          Request classification, core principles
|   +-- output-calibration.md         Auto-calibrate response depth
|   +-- skill-routing.md              Auto-load skills by keyword
|   +-- clean-code.md                 Naming, functions, anti-patterns
|   +-- error-recovery.md             SCDFV loop -- diagnose, don't retry
|   +-- self-check.md                 5-point mandatory exit verification
|   +-- documentation-management.md   Post-task docs updates
|
+-- workflows/      <- On-demand slash commands (14 workflows)
|   +-- cook.md       /cook       Feature implementation pipeline
|   +-- debug.md      /debug      Root-cause-first debugging
|   +-- fix.md        /fix        Auto-complexity issue resolution
|   +-- plan.md       /plan       Technical planning + red-team
|   +-- review.md     /review     Multi-lens code review
|   +-- scout.md      /scout      Fast codebase exploration
|   +-- test.md       /test       Test generation & execution
|   +-- brainstorm.md /brainstorm Structured ideation
|   +-- design.md     /design     UI/UX design workflow
|   +-- docs.md       /docs       Documentation management
|   +-- explain.md    /explain    Mermaid diagrams + visual explanations
|   +-- git.md        /git        Conventional commits
|   +-- init.md       /init       Project bootstrapper
|   +-- watzup.md     /watzup     Quick project status
|
+-- skills/         <- Domain knowledge loaded on-demand (18 skills)
    +-- accessibility/            WCAG, ARIA, keyboard nav, a11y testing
    +-- api-patterns/             REST, auth, pagination, versioning
    +-- code-review/              Checklists, OWASP, anti-patterns
    +-- css-architecture/         Design tokens, responsive, animations
    +-- database-design/          Schema, indexes, query optimization
    +-- devops/                   Docker, CI/CD, deployment patterns
    +-- git-patterns/             Branching, conflict resolution, rebase
    +-- nextjs-patterns/          App Router, RSC, data fetching
    +-- performance-optimization/ Core Web Vitals, bundle analysis
    +-- problem-solving/          5 techniques for breaking through
    +-- react-best-practices/     Components, hooks, state, structure
    +-- refactoring/              5 core patterns, safety protocol
    +-- security-audit/           OWASP Top 10 deep reference
    +-- sequential-thinking/      Structured problem decomposition
    +-- technical-writing/        README, changelog, API docs, ADRs
    +-- testing-patterns/         Test pyramid, AAA, mocking
    +-- typescript-patterns/      Generics, narrowing, Zod, branded types
    +-- ui-ux-design/             Design systems, color, typography, UX
```

### Three-Layer Design

| Layer | Count | Purpose | Loading |
|-------|-------|---------|------------|
| **Rules** | 9 | Behavioral guardrails | Always active |
| **Workflows** | 14 | Step-by-step procedures | Triggered by `/command` |
| **Skills** | 18 | Domain reference knowledge | Auto-loaded by keyword |

## Key Features

### 🤔 Socratic Gate
Every complex request must pass through strategic questioning before implementation. Prevents wasted work from misunderstood requirements.

```
You: "Add authentication to the app"

❌ Without Cortex: Agent immediately starts coding JWT auth
✅ With Cortex: 
   "Before I implement authentication, let me clarify:
    1. What auth method? (email/password, OAuth, SSO?)
    2. What roles/permissions are needed? (admin, user, guest?)
    3. Should sessions persist? (remember me, token expiry?)
    
    This ensures I build exactly what you need."
```

### ✅ Self-Check Protocol
5-point mandatory verification before any task is marked complete:
1. Goal met? 2. All files edited? 3. Code works? 4. No errors? 5. Nothing forgotten?

### 🔴 Red-Team Review
The `/plan --hard` workflow includes adversarial review from 3 hostile personas:
- 🔴 Security Adversary
- 🟠 Assumption Destroyer
- 🟡 Scope & Complexity Critic

### 📊 Context Efficiency
Built-in token awareness -- the kit includes guidance on efficient context window usage to avoid overflowing the AI's working memory.

## Choosing the Right Workflow

Not sure which command to use? Here's a decision guide:

```
                    What do you need?
                         |
            +------------+------------+
            ▼            ▼            ▼
       Build new     Fix something   Understand
       feature       broken          codebase
            |            |            |
            ▼            |            ▼
         /cook           |          /scout
                    +----+----+     /explain
                    ▼         ▼
              Know the    Don't know
              cause?      the cause?
                |            |
                ▼            ▼
              /fix        /debug
```

| Scenario | Command |
|----------|---------|
| "Build me a new login page" | `/cook` |
| "TypeError on line 42 of auth.ts" | `/fix` |
| "Login is broken but I don't know why" | `/debug` |
| "I need to plan a database migration" | `/plan` |
| "Where is the payment logic?" | `/scout` |
| "Review my PR for security issues" | `/review --security` |
| "Generate tests for the utils module" | `/test src/utils/` |
| "How does the auth flow work?" | `/explain auth flow` |
| "What changed this week?" | `/watzup` |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding new workflows, skills, and rules.

## License

[MIT](LICENSE)

---

**Made with 🧠 by developers who got tired of AI agents that don't think.**
