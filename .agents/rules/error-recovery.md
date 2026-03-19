---
description: "Systematic error handling -- stop retrying blindly, diagnose first, fix once"
---

# Error Recovery Protocol

**MANDATORY: When you encounter ANY error during implementation, follow this protocol. Never retry blindly.**

> 🔴 Retrying the same approach 3x is a bug in YOUR process, not the code.
> 🔴 "Let me try a different approach" without diagnosing WHY = wasted tokens.

## The SCDFV Loop

| Step | Action | Time spent |
|------|--------|------------|
| **S -- STOP** | Halt. Don't retry. Don't "try another approach." | 0s |
| **C -- CLASSIFY** | What type of error? (see table below) | 5s |
| **D -- DIAGNOSE** | Read the FULL error. What file? What line? What's the actual message? | 10s |
| **F -- FIX** | Apply ONE targeted fix based on diagnosis | varies |
| **V -- VALIDATE** | Confirm fix works AND original task still passes | 10s |

## Error Classification

| Type | Signals | Recovery Strategy |
|------|---------|-------------------|
| **Syntax** | `SyntaxError`, `unexpected token`, parse failures | Read error line -> fix typo/missing bracket |
| **Import** | `ModuleNotFoundError`, `Cannot find module` | Check path, check package.json, check spelling |
| **Type** | `TypeError`, `is not a function`, `undefined` | Check variable exists, check API signature |
| **Logic** | Wrong output, silent failure, infinite loop | Add logging/print at key points, trace data flow |
| **Build** | Compile errors, webpack/vite failures | Read FULL build output, fix first error only |
| **Test** | Assertion failures, test timeout | Read expected vs actual, check test setup |
| **Environment** | Permission denied, port in use, missing tool | Check OS, check PATH, check prerequisites |
| **API/Network** | 4xx/5xx, timeout, CORS | Check URL, auth headers, request payload |

## Anti-Patterns (NEVER DO)

| ❌ Anti-Pattern | ✅ Correct Behavior |
|----------------|---------------------|
| Retry same code hoping for different result | STOP -> diagnose -> fix root cause |
| "Let me rewrite this entirely" | Fix the specific broken part |
| Ignore the error message | Read ALL of it -- line number, file, stack trace |
| Fix error #3 before error #1 | Fix errors in order -- later ones are often caused by earlier ones |
| Add `try/catch` to silence errors | Fix the cause, don't mask symptoms |
| Delete and recreate a file | Edit the existing file -- understand what went wrong |
| "This should work now" (no evidence) | Run build/test, show output, THEN claim fixed |

## Escalation Rules

| Situation | Action |
|-----------|--------|
| Same error after 2 targeted fixes | Step back. Re-read error from scratch. Assumption is wrong. |
| Error you don't understand | Search for it. Check docs. Tell user what you found. |
| Environment/tooling issue | Tell user immediately -- you can't fix their system config. |
| Multiple unrelated errors | Fix ONE at a time. Re-run after each fix. |

## Integration with Self-Check

After recovering from an error:
1. Re-run the original task's verification
2. Check that the fix didn't introduce new issues
3. Include error + fix in the Self-Check report

```
✅ Self-Check: 5/5 passed
  ...
  [!]️ Error encountered: [TypeError: x.map is not a function]
  -> Root cause: API returns object when empty, not array
  -> Fix: Added Array.isArray() guard in data-processor.ts:42
  -> Validated: build passes, original feature works
```
