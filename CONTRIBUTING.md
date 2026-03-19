# Contributing to Antigravity Cortex

Thank you for your interest in improving the kit! Here's how to contribute.

## Adding a New Workflow

1. Create a file in `.agents/workflows/` with kebab-case name: `your-workflow.md`
2. Use this template:

```markdown
---
description: "Short description for the workflow"
---

# /command -- Title

> **Role:** You are a [specific role]. You [specific behavior].

[What this workflow does -- 1 sentence.]

## Usage

\```
/command [args]
/command [args] --fast
\```

## Workflow

### Step 1: [Name]
// turbo (if safe to auto-run)
1. [Specific action]
2. [Specific action]

### Step 2: [Name]
...

## Critical Rules
- [Non-negotiable rules]

## 🏁 Exit Gate (MANDATORY)
✅ [Check 1] -> ✅ [Check 2] -> ✅ [Check 3]
```

## Adding a New Skill

1. Create a directory in `.agents/skills/your-skill/`
2. Create `SKILL.md` with this template:

```markdown
---
name: your-skill
description: Short description
---

# Skill Title

## When to Use
- [Specific scenario 1]
- [Specific scenario 2]

## [Content sections with tables and examples]
```

3. Add a trigger entry in `.agents/rules/skill-routing.md`

## Adding a New Rule

1. Create a file in `.agents/rules/`: `your-rule.md`
2. Add YAML frontmatter with `description`
3. Update priority table in `.agents/rules/README.md`

## Quality Standards

- Use **tables** over long prose (AI reads tables better)
- Include **negative examples** (❌/✅ pairs) where possible
- Every workflow needs an **Exit Gate**
- Every skill needs a **When to Use** section
- Keep files **under 200 lines**
- Use `// turbo` annotation only for safe-to-auto-run steps

## Pull Request Checklist

- [ ] File has YAML frontmatter with `description`
- [ ] Content uses tables for structured information
- [ ] Workflow has `🏁 Exit Gate` section
- [ ] Skill has `When to Use` section
- [ ] Updated `CHANGELOG.md`
- [ ] Updated `rules/skill-routing.md` (if adding a skill)
- [ ] Updated `rules/README.md` priority table (if adding a rule)
