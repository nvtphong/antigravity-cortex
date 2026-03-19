---
description: "Auto-calibrate response depth based on task complexity -- concise for simple, detailed for complex"
---

# Output Calibration

**MANDATORY: Match your response depth to the task's actual complexity. Don't over-explain simple things or under-explain complex ones.**

> 🔴 A 500-token explanation for a 1-line CSS fix is **wasted context**.
> 🔴 A 100-token response for a microservice architecture question is **irresponsible**.

## Signal Detection

Read the user's request and detect these signals to auto-calibrate:

| Signal | Indicator | Calibration |
|--------|-----------|-------------|
| **Request length** | Short (< 20 words) | -> Concise response |
| **Request length** | Long (> 50 words, multi-paragraph) | -> Detailed response |
| **Explicit speed** | "nhanh", "quick", "just", "--fast" | -> Minimum viable response |
| **Explicit depth** | "giải thích", "explain", "why", "compare", "trade-offs" | -> Detailed with reasoning |
| **Workflow context** | Inside `/cook` or `/fix` | -> Action-focused, less talk |
| **Workflow context** | Inside `/plan` or `/brainstorm` | -> Analytical, more reasoning |
| **Follow-up** | User already saw context | -> Don't repeat, build on it |
| **Language** | Vietnamese input | -> Vietnamese output |
| **Language** | English input | -> English output |
| **Emoji/casual tone** | "fix giúp", "xem hộ", "thử xem" | -> Casual, concise |
| **Formal tone** | "Please implement", "I need" | -> Professional, structured |

## Response Depth Levels

### Level 1 -- Minimal (< 100 tokens)
**When:** Trivial change, 1-line fix, yes/no question, user said "nhanh"

```
✅ Done -- changed button color to #3B82F6 in styles.css:42

✅ Yes, that function is safe to delete -- nothing imports it.
```

**Rules:** Code change only. Max 1 sentence explanation. No headers.

---

### Level 2 -- Concise (100-400 tokens)
**When:** Single-file edit, bug fix, small feature, user is already in context

```
Fixed the login redirect -- root cause was missing `await` on line 28.

Changes:
- `auth.ts:28` -- added await to session check
- `middleware.ts:15` -- added null guard for edge case

Build passes ✅
```

**Rules:** State what + why in 1-2 sentences. List files changed. Show evidence.

---

### Level 3 -- Standard (400-1000 tokens)
**When:** Multi-file change, new feature, refactoring, design decision needed

**Rules:** Include brief rationale for choices. Use tables for comparisons. Show code diffs. Add Self-Check summary.

---

### Level 4 -- Detailed (1000-2500 tokens)
**When:** Architecture design, system analysis, `/plan`, `/brainstorm`, complex debugging, explicit "explain" request

**Rules:** Trade-off tables. Mermaid diagrams if helpful. Multiple approaches with pros/cons. Full reasoning chain. References to docs/patterns.

---

## Calibration Matrix

| Task Type | Level | Code | Explanation | Diagram |
|-----------|-------|------|-------------|---------|
| Color/text change | 1 | ✅ | ❌ | ❌ |
| Bug fix (obvious) | 2 | ✅ | 1 sentence | ❌ |
| Bug fix (complex) | 3 | ✅ | Root cause analysis | ❌ |
| New feature (small) | 2 | ✅ | Brief | ❌ |
| New feature (complex) | 3 | ✅ | Trade-offs + decisions | Maybe |
| Architecture/design | 4 | Maybe | Detailed | ✅ |
| `/plan` output | 4 | ❌ | Full analysis | ✅ |
| `/fix --fast` | 1 | ✅ | ❌ | ❌ |
| "Explain this code" | 4 | Reference | Full walkthrough | ✅ |
| Follow-up question | 1-2 | If needed | Don't repeat context | ❌ |

## Override Rules

Users can override calibration explicitly:

| User says | Override to |
|-----------|------------|
| "chi tiết hơn" / "more detail" | +1 level |
| "ngắn gọn hơn" / "shorter" / "tl;dr" | -1 level (min 1) |
| "giải thích" / "explain" / "why" | Level 4 |
| "cứ làm đi" / "just do it" | Level 1 |

## Anti-Patterns

| ❌ DON'T | ✅ DO |
|----------|------|
| 500-word essay for renaming a variable | Change it, say "Done ✅" |
| Explain what `forEach` does to a senior dev | Use it without commentary |
| Say "Here's what I did" then repeat the diff | Show the diff, skip narration |
| Repeat context user already provided | Reference it: "As you mentioned..." |
| Write English when user writes Vietnamese | Match their language |
| Use headers and sections for a 2-line answer | Just write the answer |
