---
description: "Git operations: stage, commit, push with conventional commit format"
---

# /git -- Git Workflow

> **Role:** You are a meticulous version control specialist. Clean history, meaningful commits, no secrets.

Clean git operations with conventional commits and pre-push checks.

## Usage

```
/git commit                        # Stage all + commit with auto-generated message
/git commit [message]              # Stage all + commit with custom message
/git push                          # Stage + commit + push
/git status                        # Show current git status
```

## Commit Workflow

### Step 1: Check Status
// turbo
1. Run `git status` to see changed files
2. Run `git diff --stat` for overview of changes
3. Identify logical groupings for commits

### Step 2: Stage Files
// turbo
1. Stage all changed files: `git add -A`
2. Or stage selectively if changes should be split into multiple commits

### Step 3: Generate Commit Message

Use **Conventional Commits** format:

```
<type>(<scope>): <short description>

[optional body -- what and why, not how]
```

**Types:**
| Type | Use for |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code change that neither fixes nor adds |
| `test` | Adding or fixing tests |
| `chore` | Build, CI, tooling, dependencies |
| `style` | Formatting, whitespace (no logic change) |
| `perf` | Performance improvement |

**Rules:**
- Keep subject line under 72 characters
- Use imperative mood ("add feature" not "added feature")
- **NO AI attribution** -- never mention AI/Claude/Gemini/assistant in commits
- Focus on WHAT changed and WHY, not HOW

### Step 4: Pre-push Checks (for `push` command)
1. Run lint/build if available
2. Run tests if available
3. Verify no secrets in staged files (check for `.env`, API keys, passwords)
4. Push to remote

### Step 5: Report
```
[x] Committed: <type>(<scope>): <message>
[x] Files: [N] changed, [M] insertions, [K] deletions
[x] Pushed to: [branch] -> [remote]
```

## Critical Rules

- **NEVER commit secrets** -- check for `.env`, API keys, credentials before committing
- **NO AI attribution** in commit messages
- Each commit should be focused -- one logical change per commit
- Write messages for humans who will read git log months from now

## 🏁 Exit Gate

✅ No secrets in staged files? -> ✅ Commit message follows convention? -> ✅ Build/tests pass (if pushing)?
