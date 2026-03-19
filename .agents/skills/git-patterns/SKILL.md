---
name: git-patterns
description: Branching strategies, conflict resolution, rebase patterns, and collaborative Git workflows
---

# Git Patterns

Beyond basics -- branching strategies, history management, and team workflows.

## Branching Strategies

### GitHub Flow (Recommended for most projects)

```
main --*------*------*------*-- (always deployable)
        \    /        \    /
  feat   *--*    fix   *--*
```

| Rule | Detail |
|------|--------|
| `main` is always deployable | Never push broken code directly |
| Feature branches from `main` | `feat/user-auth`, `fix/login-redirect` |
| PR + review before merge | No direct pushes to main |
| Delete branch after merge | Keep branch list clean |

### Branch Naming Convention

```
feat/short-description     -> New features
fix/issue-description       -> Bug fixes
refactor/what-changed       -> Code restructuring
docs/what-documented        -> Documentation
chore/task-description      -> Maintenance
hotfix/critical-issue       -> Emergency production fix
```

---

## Commit Messages (Conventional Commits)

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

| Type | When |
|------|------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code change that doesn't fix bug or add feature |
| `test` | Adding/updating tests |
| `chore` | Build, CI, tooling |
| `perf` | Performance improvement |

**Examples:**
```
feat(auth): add JWT refresh token rotation
fix(api): handle null response from payment gateway
refactor(user): extract validation into shared module
docs: update API endpoint documentation
```

---

## Conflict Resolution

### Step-by-step

```bash
# 1. Fetch latest
git fetch origin

# 2. Rebase your branch on main
git rebase origin/main

# 3. When conflict appears:
#    - Open conflicted file
#    - Choose: keep ours / theirs / merge manually
#    - Remove conflict markers (<<<<<<, ======, >>>>>>)

# 4. Stage resolved files
git add <resolved-files>

# 5. Continue rebase
git rebase --continue

# 6. If things go wrong:
git rebase --abort    # Start over
```

### Conflict Prevention

| Strategy | How |
|----------|-----|
| **Small PRs** | < 300 lines, merge fast |
| **Rebase often** | `git pull --rebase` daily |
| **Communicate** | Announce refactoring that touches shared files |
| **Lock files** | `package-lock.json` conflicts -> delete and `npm install` |

---

## History Management

### Interactive Rebase (Clean up before PR)

```bash
# Squash last 3 commits into 1
git rebase -i HEAD~3

# In editor:
pick   abc123 feat: add login form
squash def456 fix: typo in login
squash ghi789 fix: style adjustment

# Result: 1 clean commit instead of 3
```

### When to Rebase vs Merge

| Situation | Use | Why |
|-----------|-----|-----|
| Updating feature branch from main | `rebase` | Clean linear history |
| Merging feature into main (PR) | `merge` (squash) | Preserves PR boundary |
| Shared branch (2+ people) | `merge` | Don't rewrite shared history |
| Local cleanup before push | `rebase -i` | Clean commits before sharing |

> 🔴 **Golden Rule:** Never rebase commits that have been pushed and shared with others.

---

## Undo Operations

| Situation | Command |
|-----------|---------|
| Undo last commit (keep changes) | `git reset --soft HEAD~1` |
| Undo last commit (discard changes) | `git reset --hard HEAD~1` |
| Undo a specific pushed commit | `git revert <sha>` (creates new commit) |
| Discard all local changes | `git checkout -- .` |
| Recover deleted branch | `git reflog` -> find sha -> `git checkout -b <branch> <sha>` |
| Unstage a file | `git reset HEAD <file>` |

---

## .gitignore Essentials

```gitignore
# Dependencies
node_modules/
vendor/
.venv/

# Build output
dist/
build/
*.pyc

# Environment
.env
.env.local
.env.*.local

# IDE
.idea/
.vscode/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

## See Also

- [devops](../devops/SKILL.md) � CI/CD pipelines, deployment automation
- [code-review](../code-review/SKILL.md) � PR review workflows
- [technical-writing](../technical-writing/SKILL.md) � Commit messages, changelogs
