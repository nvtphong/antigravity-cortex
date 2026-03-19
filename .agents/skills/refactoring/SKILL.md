---
name: refactoring
description: Code refactoring patterns -- when, why, and how to restructure code safely
---

# Refactoring Patterns

Reference guide for systematic code refactoring. Use when code smells are detected or complexity needs to be reduced.

## When to Refactor

| Smell | Signal | Pattern to Apply |
|-------|--------|-----------------|
| **God Function** (> 50 lines) | Too many responsibilities | Extract Method |
| **God File** (> 200 lines) | Too many concerns | Extract Module |
| **Deep Nesting** (> 3 levels) | Complex conditionals | Guard Clauses + Early Return |
| **Long Parameter List** (> 3 args) | Too many inputs | Introduce Parameter Object |
| **Duplicate Code** | Same logic in 2+ places | Extract Shared Function |
| **Primitive Obsession** | Strings/numbers everywhere | Value Objects / Enums |
| **Feature Envy** | Function uses other class's data more than its own | Move Method |
| **Shotgun Surgery** | 1 change requires editing 5+ files | Consolidate into Module |

## Core Patterns

### 1. Extract Method

**When:** Function does more than one thing.

```
❌ Before: 80-line function handling validation + processing + saving

✅ After:
  validateInput(data)     -> 15 lines
  processData(validated)  -> 20 lines
  saveResult(processed)   -> 10 lines
  
  // Orchestrator: 5 lines calling the 3 functions
```

**Rules:**
- New function name = what it DOES, not how
- Each extracted function should be testable independently
- Pass only the data the function needs, not the entire context

### 2. Extract Module

**When:** File exceeds 200 lines or has multiple unrelated concerns.

```
❌ Before: user-service.ts (350 lines)
  - User CRUD
  - Auth logic  
  - Email sending
  - Password hashing

✅ After:
  user-service.ts      -> CRUD only (80 lines)
  auth-service.ts      -> Login/logout/tokens (90 lines)
  email-service.ts     -> Send/template (60 lines)
  password-utils.ts    -> Hash/verify (30 lines)
```

**Rules:**
- Split by RESPONSIBILITY, not by size
- Each module should have a clear single purpose
- Update all imports after splitting

### 3. Guard Clauses (Flatten Conditionals)

**When:** Deeply nested if/else blocks.

```
❌ Before:
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        // actual logic (buried 3 levels deep)
      }
    }
  }

✅ After:
  if (!user) return null;
  if (!user.isActive) throw new Error('Inactive');
  if (!user.hasPermission) throw new Error('Forbidden');
  // actual logic (top level, clear)
```

### 4. Introduce Parameter Object

**When:** Function takes more than 3 parameters.

```
❌ Before:
  createUser(name, email, role, department, startDate, manager)

✅ After:
  createUser({ name, email, role, department, startDate, manager })
  
  // Or with a type:
  interface CreateUserParams { name: string; email: string; ... }
  createUser(params: CreateUserParams)
```

### 5. Replace Conditional with Map/Strategy

**When:** Large switch/case or if/else chains.

```
❌ Before:
  if (type === 'pdf') { generatePdf() }
  else if (type === 'csv') { generateCsv() }
  else if (type === 'xlsx') { generateXlsx() }
  // ... 10 more types

✅ After:
  const generators = {
    pdf: generatePdf,
    csv: generateCsv,
    xlsx: generateXlsx,
  };
  generators[type]?.() ?? throwUnsupported(type);
```

## Safety Protocol

**Before refactoring:**
1. Ensure tests exist for the code being refactored
2. If no tests -> write characterization tests FIRST
3. Refactor in small steps -- commit after each step
4. Run tests after EVERY change

**After refactoring:**
1. All existing tests still pass
2. No new functionality added (refactoring != new features)
3. Run full build to catch broken imports
4. Review diff -- should be moving code, not rewriting logic

## Anti-Patterns

| ❌ DON'T | ✅ DO |
|----------|------|
| Refactor + add features in same commit | Separate commits: refactor THEN feature |
| Rename everything at once | Rename one thing, verify, repeat |
| "Improve" code that works and isn't changing | Only refactor code you're actively working on |
| Create abstractions for 1 use case | Wait for 3 duplicates before abstracting (Rule of Three) |
| Refactor without tests | Write tests FIRST, then refactor |

## See Also

- [code-review](../code-review/SKILL.md) � Identifying refactoring opportunities
- [testing-patterns](../testing-patterns/SKILL.md) � Test safety net for refactoring
- [problem-solving](../problem-solving/SKILL.md) � Breaking through complexity
- [sequential-thinking](../sequential-thinking/SKILL.md) � Structured decomposition
