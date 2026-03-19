---
description: "Mandatory 5-point verification before claiming any task is done"
---

# Self-Check Protocol

**MANDATORY: Before saying "task complete", verify ALL 5 checks pass.**

## The 5-Point Check

| # | Check | Question |
|---|-------|----------|
| 1 | ✅ **Goal met?** | Did I do exactly what user asked? No more, no less? |
| 2 | ✅ **All files edited?** | Did I modify all necessary files? No missing changes? |
| 3 | ✅ **Code works?** | Did I test/verify the change? Build passes? |
| 4 | ✅ **No errors?** | Lint passes? No syntax errors? No broken imports? |
| 5 | ✅ **Nothing forgotten?** | Edge cases? Dependent files? Documentation? |

> 🔴 **Rule:** If ANY check fails, fix it before completing.

## Extended Checks (for complex tasks)

| # | Check | Question |
|---|-------|----------|
| 6 | ✅ **Dependents OK?** | Did I check what imports/calls the files I changed? |
| 7 | ✅ **No regressions?** | Did I verify existing functionality still works? |
| 8 | ✅ **Security OK?** | No hardcoded secrets? Input validated? Auth checked? |
| 9 | ✅ **Clean code?** | Files under 200 lines? Functions under 20 lines? |
| 10 | ✅ **Documented?** | Complex logic commented? API docs updated? |

## Confidence Scoring

After passing all checks, rate your confidence:

| Score | Meaning | Required Action |
|-------|---------|-----------------|
| **9-10** | Very confident, all checks pass with evidence | Deliver normally |
| **7-8** | Confident, minor uncertainties | Note what you're uncertain about |
| **4-6** | Partially confident, untested assumptions | List assumptions explicitly, ask user to verify |
| **1-3** | Low confidence, significant unknowns | STOP -- tell user what you don't know before delivering |

> 🔴 **Rule:** If confidence < 7, you MUST explain what you're uncertain about. Never claim "done" while hiding doubts.

## When to Apply

- **Always:** Checks 1-5 + confidence score (every task, every time)
- **Complex tasks:** Checks 1-10 + confidence score (multi-file changes, architecture changes)
- **Quick fixes:** Checks 1-3 minimum

## How to Report

```
✅ Self-Check: 5/5 passed | Confidence: 9/10
  1. Goal met -- implemented login feature as requested
  2. All files -- 3 files modified (auth.ts, middleware.ts, routes.ts)
  3. Code works -- build passes, manual test OK
  4. No errors -- no lint/compile errors
  5. Nothing forgotten -- added input validation, updated docs
```

If confidence < 7:
```
[!]️ Self-Check: 5/5 passed | Confidence: 5/10
  ...checks...
  [!]️ Uncertainties:
  - Not sure if auth middleware handles expired tokens correctly
  - Could not test with concurrent users -- needs manual verification
```

## Common Failures (Anti-Patterns)

| ❌ DON'T | ✅ DO |
|----------|------|
| "Task complete!" without running build | Run build/test, read output, THEN claim done |
| Edit 2 of 3 related files | `grep_search` for all callers/dependents first |
| "Should work now" (no evidence) | Provide specific evidence: test output, build log |
| Skip self-check for "simple" tasks | Even 1-line fixes need checks 1-3 minimum |
| Assume tests still pass | Actually run them -- assumptions cause regressions |

