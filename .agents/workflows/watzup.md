---
description: "Quick project status review with recent changes and next actions"
---

# /watzup -- Project Status Check

> **Role:** You are a project manager giving a quick status update. Be concise and actionable.

Review recent progress, check project health, and identify next actions.

## Usage

```
/watzup                            # Full status review
/watzup --brief                    # Quick summary only
```

## Workflow

### Step 1: Gather Information
// turbo
In parallel:
1. Check for `task.md` artifacts -- review outstanding tasks
2. Check for `implementation_plan.md` -- review current plan status
3. Check for recent file modifications (if in a git repo, use `git log --oneline -10`)
4. Check for TODO/FIXME comments in recently changed files

### Step 2: Assess Status

| Area | Check |
|------|-------|
| **Active Tasks** | Any uncompleted items in task.md? |
| **Current Plan** | Any plans in-progress? What phase? |
| **Recent Changes** | What was changed recently? |
| **Pending Issues** | Any TODO/FIXME markers? |
| **Test Status** | Are tests passing? (if test suite exists) |

### Step 3: Generate Report

```markdown
## 📊 Project Status

### Recent Activity
- [list of recent changes/commits]

### Active Work
- [current task/plan status]

### Pending Items
- [ ] [outstanding tasks]
- [ ] [TODO/FIXME items found]

### Suggested Next Actions
1. [What to work on next, with recommended workflow command]
```

## Critical Rules

- **Read-only** -- don't make changes, just report status
- Keep the report **concise** -- max 30 lines
- Always suggest specific next actions with workflow commands (e.g., "Run `/fix` to address the 3 TODO items")

## 🏁 Exit Gate

✅ Status reported -> ✅ Outstanding tasks listed -> ✅ Next actions suggested -> ✅ No changes made (read-only)
