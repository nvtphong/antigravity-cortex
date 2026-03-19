---
name: problem-solving
description: Systematic techniques for when you're stuck -- 5 methods to break through complexity, assumptions, and dead ends
---

# Problem-Solving Techniques

When decomposition isn't enough. These techniques target specific types of "stuck."

## Quick Dispatch

| Symptom | Technique | Section |
|---------|-----------|---------|
| "Just one more special case..." (repeating) | **Simplification Cascade** | §1 |
| "There's only one way to do this" | **Inversion Exercise** | §2 |
| "Will this work in production?" | **Scale Game** | §3 |
| "I've tried everything" | **Rubber Duck Protocol** | §4 |
| Fixing symptom, not root cause | **5 Whys** | §5 |

---

## §1 -- Simplification Cascade

**When:** Implementation keeps growing. Special cases multiply. Each fix adds complexity.

**Process:**
1. List ALL special cases you're handling
2. Ask: "What single insight would eliminate 3+ of these?"
3. Find the general pattern they're all special cases OF
4. Rewrite using the general pattern

**Red flag -> Trigger:**
> "Just need to handle one more edge case" (for the 4th time)

**Example:**
```
❌ 12 functions: parseCSV(), parseJSON(), parseXML(), parseYAML()...
   each with error handling, encoding, streaming variants

✅ 1 insight: "All formats are text -> structured data"
   -> parseFile(format, options) with format-specific adapters
   -> 12 functions -> 1 function + 4 tiny adapters
```

---

## §2 -- Inversion Exercise

**When:** You feel forced into one approach. "This is the only way."

**Process:**
1. State your current assumption explicitly
2. Write the EXACT OPPOSITE
3. Ask: "In what scenario would the opposite be TRUE?"
4. The scenario reveals hidden constraints you can exploit

**Example:**
```
Assumption: "We must validate all input before processing"
Inverse: "Process first, validate never"
Scenario: "What if data is pre-validated at the boundary?"
Insight: Internal functions don't need re-validation -> remove 200 lines of redundant checks
```

---

## §3 -- Scale Game

**When:** "Should work fine" but you haven't tested extremes.

**Process:**
1. Take your solution
2. Test at: 0 items, 1 item, 1M items
3. Test at: 0ms latency, 10s latency
4. Test at: 1 user, 1000 concurrent users
5. What breaks first? That's your real design constraint.

**Key question:** "What happens at 1000x?"

| Scale | What it reveals |
|-------|----------------|
| **0** (empty) | Missing null/empty handling |
| **1** (single) | Off-by-one errors, edge cases |
| **1000x** (massive) | Performance bottlenecks, memory limits |
| **Concurrent** | Race conditions, deadlocks |

---

## §4 -- Rubber Duck Protocol

**When:** You're going in circles. Can't see the problem.

**Process:**
1. STOP coding
2. Open a new blank comment block or text file
3. Explain the problem as if teaching a junior developer:
   - What should happen?
   - What actually happens?
   - What have you tried?
   - What's your current theory?
4. The answer usually appears during step 3

**Why it works:** Explaining forces serialization of parallel confused thoughts. Confusion is parallel; clarity is sequential.

---

## §5 -- 5 Whys (Root Cause Analysis)

**When:** You're fixing symptoms instead of causes. Same bug class keeps reappearing.

**Process:**
```
Problem: "API returns 500 error"
Why 1: "Null pointer in user service" -> Fix: add null check? NO, keep asking.
Why 2: "User object is null" 
Why 3: "Database query returns null"
Why 4: "User ID doesn't exist in DB"
Why 5: "Frontend sends stale cached user ID after deletion"
ROOT CAUSE: Cache invalidation bug, not null handling!
```

**Rule:** If your fix is "add a null check" or "add a try-catch" -- you stopped too early. Keep asking Why.

---

## Combining Techniques

| Combination | When |
|-------------|------|
| 5 Whys -> Inversion | Found root cause, now challenge your fix assumption |
| Scale Game -> Simplification | Extremes reveal what to eliminate |
| Rubber Duck -> 5 Whys | Explain problem, then drill into root cause |

---

## See Also

- **sequential-thinking** -- Structured decomposition when problem is clear but complex
- **refactoring** -- Simplification Cascade applied to code structure
