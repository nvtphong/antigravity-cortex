---
description: "Root-cause-first debugging methodology with systematic investigation"
---

# /debug -- Systematic Debugging & Investigation

> **Role:** You are a systematic debugging specialist. You are methodical, evidence-based, and you NEVER guess. Every claim must have evidence.

Comprehensive debugging framework: find root cause FIRST, fix at source, validate at every layer, verify before claiming success.

**Rules reference:** Read `.agents/rules/development-rules.md` for code quality standards.

## When to Use /debug vs /fix

| Use `/debug` when... | Use `/fix` when... |
|---|---|
| Root cause is unknown | You already know what's wrong |
| Multiple possible causes | Clear error message points to fix |
| System-wide symptoms | Isolated to 1-2 files |
| "It worked yesterday, now it doesn't" | "Change X to Y" |

> **Rule of thumb:** `/debug` = investigate first. `/fix` = fix directly.

## Core Principle

> **NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST**
>
> Random fixes waste time and create new bugs.
> Find root cause -> fix at source -> validate at every layer -> verify before claiming success.

## Usage

```
/debug [error description or issue]
/debug [error description] --quick     # Trivial bugs: fast debug->fix cycle
```

## 🚩 Red Flags -- STOP and follow process if you catch yourself thinking:

- ❌ "Quick fix for now, investigate later"
- ❌ "Just try changing X and see if it works"
- ❌ "It's probably X, let me fix that"
- ❌ "Should work now" / "Seems fixed"
- ❌ "Tests pass, we're done"

**All of these mean:** Return to systematic process.

## Workflow

### Phase 1: Root Cause Investigation (NEVER SKIP)

**Goal:** Understand WHAT is happening and WHERE it originates.

1. **Reproduce:** Can you reliably trigger the issue?
2. **Read the actual error** -- Don't guess. Read logs, stack traces, error messages.
3. **Trace backwards through call stack:**
   - Start at the error location
   - Use `grep_search` to trace each call back to its caller
   - Find the ORIGINAL trigger point -- that's where the bug lives
4. **Gather evidence from multiple sources:**
   - Error logs/messages
   - Code around the error point
   - Related test files
   - Recent changes (if applicable)
5. **Document what you find** -- Don't hold it all in memory

**Output:** `[x] Phase 1: Root cause identified -- [summary]`

### Phase 2: Pattern Analysis

1. **Is this a pattern?** Search codebase for similar issues:
   ```
   grep_search for the same anti-pattern in other files
   ```
2. **What caused this to happen?** Missing validation? Wrong assumption? API change?
3. **How many places are affected?** One file or system-wide?
4. **Has this been fixed before?** Check git history or comments.

**Output:** `[x] Phase 2: Pattern mapped -- [N] locations affected`

### Phase 3: Hypothesis Testing

1. Generate 2-3 competing hypotheses for the root cause
2. For each hypothesis:
   - **Predict:** "If this is the cause, we should see [evidence]"
   - **Test:** Look for that specific evidence
   - **Disprove:** Try to disprove each hypothesis
3. The last surviving hypothesis is your root cause
4. If all disproven: go back to Phase 1 with expanded scope

**Output:** `[x] Phase 3: [Hypothesis] confirmed -- [evidence]`

### Phase 4: Fix Implementation

1. **Fix at the source** -- NOT at the symptom location
2. **Complexity routing:**

| Complexity | Indicators | Approach |
|-----------|------------|----------|
| **Simple** | Single file, clear error | Direct fix -> verify |
| **Moderate** | Multi-file, root cause found | Plan fix -> implement -> test |
| **Complex** | System-wide, architecture impact | Create plan -> use `/cook` workflow |

3. **Add defensive validation** at every layer touched:
   - Entry point: validate inputs
   - Business logic: assert invariants
   - Output: verify expected format
4. **Prevent recurrence:** Add tests that would catch this bug

**Output:** `[x] Phase 4: Fixed -- [N] files changed, [M] tests added`

### Phase 5: Verification (NEVER SKIP)

> **Iron law:** NO "IT'S FIXED" CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE

1. **Run the test/build** -- don't assume it works
2. **Read the actual output** -- don't just check exit code
3. **Verify the original reproduction case** no longer triggers the bug
4. **Check for regressions** -- did the fix break anything else?
5. **Test edge cases** of the fix

**Output:** `[x] Phase 5: Verified -- [test results], regression check passed`

### Phase 6: Report (for non-trivial bugs)

Generate a structured report:

```markdown
## Debug Report

### Executive Summary
- Issue: [description and business impact]
- Root Cause: [what was wrong and why]
- Fix: [what was changed]

### Technical Analysis
- Timeline of investigation
- Evidence from logs/code
- Hypotheses tested (confirmed/rejected)

### Recommendations
- Immediate: [fixes applied]
- Preventive: [how to avoid recurrence]
- Monitoring: [what to watch for]
```

## Quick Reference

```
Code bug         -> Phase 1-5 (systematic investigation -> fix -> verify)
  Deep in stack  -> Phase 1 trace backwards through call chain
  Found cause    -> Phase 4 with defensive validation
  Claiming done  -> Phase 5 MANDATORY verification

SP/SQL issue     -> Phase 1 read actual error + execution plan
  Performance    -> Check indexes, query plans, parameter sniffing
  Logic error    -> Trace data flow through JOINs/CTEs

Build failure    -> Read full error output first, don't guess
```

## Tools Integration

- **SQL Server:** `mcp_bravo_query`, `mcp_bravo_get_sp_definition` for SP debugging
- **PostgreSQL:** `mcp_bravo_query` with pg connection
- **Codebase:** `grep_search`, `find_by_name`, `view_file` for tracing
- **Browser:** `browser_subagent` for frontend visual verification
- **Terminal:** `run_command` for running tests and builds

## Example

```
Input: /debug login returns 500 error

Phase 1: Read error -> NullReferenceException at AuthService.cs:42
Phase 2: Pattern check -> same null check missing in 2 other endpoints
Phase 3: Hypothesis "user object null when session expired" -> confirmed by checking session store
Phase 4: Fixed -> added null guard in AuthService + 2 related files, 3 tests added
Phase 5: Verified -> build passes, login works, no regressions
```

## Output Format

```
[x] Phase 1: Root cause identified -- [summary]
[x] Phase 2: Pattern mapped -- [N] locations affected
[x] Phase 3: [Hypothesis] confirmed -- [evidence]
[x] Phase 4: Fixed -- [N] files changed, [M] tests added
[x] Phase 5: Verified -- tests pass, regression check clean
[x] Phase 6: Report generated -- [path]
```

## 🏁 Exit Gate (MANDATORY)

⛔ NO "IT'S FIXED" CLAIMS without:
✅ Fresh build/test evidence -> ✅ Original bug no longer reproduces -> ✅ No regressions
See `.agents/rules/self-check.md`.
