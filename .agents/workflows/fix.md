---
description: "Analyze and fix issues with auto-detected complexity routing"
---

# /fix -- Issue Resolution

> **Role:** You are a pragmatic problem solver. You assess complexity first, then apply the right level of investigation before fixing.

Quick issue analysis and fix workflow. Auto-detects complexity and routes to the appropriate approach.

## When to Use /fix vs /debug

| Use `/fix` when... | Use `/debug` when... |
|---|---|
| You know WHAT is broken | You don't know the root cause |
| Error message is clear | Behavior is "weird" but unclear why |
| Single file or small scope | System-wide or architectural issue |
| "Change X to fix Y" | "Something is wrong but I'm not sure what" |

> **Rule of thumb:** If you can describe the fix in one sentence, use `/fix`. If you need to investigate, use `/debug`.

## Usage

```
/fix [issue description]            # Auto-detect complexity, fix it
/fix [issue description] --fast     # Simple direct fix, no planning
/fix [issue description] --hard     # Deep investigation, plan before fix
/fix [issue description] --test     # Run tests first, fix failures
/fix [issue description] --ci       # Analyze CI/CD logs, fix pipeline
```

## Workflow

### Step 1: Assess Complexity
// turbo
1. Read the issue description
2. Use `grep_search` and `view_file` to understand the scope
3. Auto-classify:

| Complexity | Indicators | Route |
|-----------|------------|-------|
| **Simple** | Single file, clear error message, typo, missing import | -> Step 2A |
| **Moderate** | Multi-file, requires understanding data flow | -> Step 2B |
| **Hard** | Architecture impact, system-wide, unclear root cause | -> Step 2C |

4. Log: `[x] Step 1: [complexity] detected`

### Step 2A: Simple Fix (--fast always uses this)
1. Identify the exact line(s) to change
2. Make the fix directly
3. Run build/compile to verify
4. Log: `[x] Fixed -- [file:line] [description]`

### Step 2B: Moderate Fix
1. Trace the issue through the codebase (use `/debug` Phase 1-3 methodology)
2. Plan the fix (which files, what changes)
3. Implement fix
4. Run build/compile
5. Check for regressions in related files
6. Log: `[x] Fixed -- [N] files changed`

### Step 2C: Hard Fix (--hard always uses this)
1. Run `/debug` workflow for full investigation
2. Create a mini implementation plan
3. Present plan to user via `notify_user`
4. After approval, implement fix
5. Run full verification
6. Log: `[x] Fixed -- see debug report`

### Step 3: Test Fix Mode (--test)
1. Run the test suite: `run_command` with test command
2. Parse test output for failures
3. For each failure:
   - Read the test file to understand expected behavior
   - Read the source file to understand actual behavior
   - Fix the source (NOT the test, unless the test is wrong)
4. Re-run tests until all pass
5. Log: `[x] All tests passing -- [N] fixes applied`

### Step 4: CI/CD Fix Mode (--ci)
1. Read CI/CD log output (paste from user or fetch from URL)
2. Identify the failing step and error
3. Classify: build error / test failure / deployment issue / config error
4. Apply appropriate fix
5. Log: `[x] CI fix -- [step]: [description]`

## Critical Rules

- ⛔ DO NOT fix tests by weakening assertions -- fix the source code
- ⛔ DO NOT use mocks or temporary solutions
- 🔴 Always verify the fix compiles and doesn't break other things
- For hard issues, always investigate before fixing (use `/debug` methodology)

## 🏁 Exit Gate

✅ Fix applied? -> ✅ Build passes? -> ✅ Original issue resolved? -> ✅ No regressions?
