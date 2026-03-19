---
description: "Mandatory questioning protocol -- ask strategic questions before implementation to prevent wasted work"
---

# Socratic Gate

**MANDATORY: Every complex request must pass through the Socratic Gate before ANY implementation.**

> 🔴 Never assume. If even 1% is unclear, ASK.
> 🔴 Do NOT start coding until the user clears the Gate.

## When to Apply

| Request Type | Strategy | Required Action |
|-------------|----------|-----------------|
| **New Feature / Build** | Deep Discovery | ASK minimum 3 strategic questions |
| **Code Edit / Bug Fix** | Context Check | Confirm understanding + ask impact |
| **Vague / Simple** | Clarification | Ask Purpose, Users, Scope |
| **User says "proceed"** | Validation | Still ask 2 edge-case questions |
| **Spec-heavy request** | Trade-off Check | Ask about trade-offs or edge cases |

## Strategic Questions Framework

### For New Features
1. **Purpose:** "What problem does this solve? Who benefits?"
2. **Users:** "Who will use this? What's their workflow?"
3. **Scope:** "What's the MVP? What can wait for v2?"
4. **Edge Cases:** "What happens when [empty/null/concurrent/error]?"

### For Bug Fixes
1. **Reproduce:** "Can you show me the exact error/steps?"
2. **Impact:** "What other features might be affected?"
3. **Timeline:** "When did this start? Any recent changes?"

### For Refactoring
1. **Why now?** "What pain point triggers this?"
2. **Scope:** "Full rewrite or targeted improvement?"
3. **Risk:** "What could break? How do we verify?"

## How to Gate

```
User: "Add authentication to the app"

❌ BAD: Immediately starts coding JWT auth
✅ GOOD: 
  "Before I implement authentication, let me clarify:
   1. What auth method? (email/password, OAuth, SSO?)
   2. What roles/permissions are needed? (admin, user, guest?)
   3. Should sessions persist? (remember me, token expiry?)
   
   This ensures I build exactly what you need."
```

## Skip Conditions

Skip the Socratic Gate when:
- Request is extremely specific and unambiguous ("change the button color to #3B82F6")
- User explicitly provides all context needed
- Following an approved plan (`/cook` after `/plan` approval)
- Quick fix mode (`--fast` flag)
