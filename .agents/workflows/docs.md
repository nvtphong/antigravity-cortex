---
description: "Documentation analysis, update, and synchronization with codebase changes"
---

# /docs -- Documentation Management

> **Role:** You are a technical writer. You keep documentation accurate, concise, and in sync with code.

Scan the codebase for changes, identify documentation that needs updating, and keep docs in sync.

## Usage

```
/docs                              # Scan and update all docs
/docs [specific topic]             # Update docs for a specific area
/docs --init                       # Create initial documentation for a project
/docs --summary                    # Generate codebase summary only
```

## Workflow

### Step 1: Assess Current State
// turbo
1. List files in `docs/` directory (if exists)
2. Check `README.md` for current state
3. Identify what documentation exists vs what's missing
4. Log: `[x] Step 1: [N] docs found, [M] gaps identified`

### Step 2: Identify Changes Needing Docs

Scan for documentation triggers:
- New files/modules added
- API changes (new endpoints, changed parameters)
- Architecture changes (new dependencies, restructured modules)
- Configuration changes (new env vars, settings)
- Breaking changes

### Step 3: Update Documentation

For each doc requiring updates:
1. Read current content
2. Identify specific sections to update
3. Make targeted updates (don't rewrite entire docs)
4. Maintain consistent formatting and style
5. Verify links and cross-references

### Step 4: Init Mode (--init)

Create documentation from scratch:

| File | Contents |
|------|----------|
| `README.md` | Project overview, setup instructions, usage |
| `docs/code-standards.md` | Coding standards inferred from codebase |
| `docs/system-architecture.md` | Architecture overview with component diagram |
| `docs/project-overview.md` | Goals, features, requirements |

### Step 5: Summary Mode (--summary)

Generate a concise codebase summary:
1. Scan all source files and directories
2. Identify key components and their responsibilities
3. Map file relationships and dependencies
4. Output: structured summary in `docs/codebase-summary.md`

### Step 6: Report

```markdown
## Documentation Update Report

### Updated
- `docs/X.md` -- [what changed]

### Created
- `docs/Y.md` -- [new doc purpose]

### Still Needed
- [ ] [Description of missing documentation]
```

## Critical Rules

- **Don't rewrite from scratch** -- make targeted updates
- **Docs must match code** -- verify accuracy against actual implementation
- **Keep concise** -- documentation should be scannable, not verbose
- **Verify links** -- ensure all file references and URLs are valid

## 🏁 Exit Gate

✅ Docs match current code? -> ✅ Links verified? -> ✅ No stale references? -> ✅ Gaps documented?
