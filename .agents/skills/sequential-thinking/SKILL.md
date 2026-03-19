---
name: sequential-thinking
description: Structured problem decomposition and step-by-step reasoning for complex tasks
---

# Sequential Thinking Skill

Use this skill when facing complex problems that need structured breakdown, when debugging subtle issues, or when making architectural decisions with many trade-offs.

## When to Activate

- Complex debugging requiring methodical investigation
- Architecture decisions with multiple trade-offs
- Multi-step problems where order matters
- Any situation where "just thinking about it" leads to confusion

## Framework

### 1. Problem Definition
- State the problem in ONE sentence
- List known facts vs assumptions
- Identify what "solved" looks like

### 2. Decomposition
Break into atomic steps:
```
Big Problem
+-- Sub-problem A (independent)
+-- Sub-problem B (depends on A)
|   +-- Sub-task B1
|   +-- Sub-task B2
+-- Sub-problem C (independent, can parallel with A)
```

### 3. Dependency Ordering
- Which sub-problems are independent? (can solve in parallel)
- Which depend on others? (must solve sequentially)
- What's the critical path?

### 4. Solve Incrementally
For each sub-problem:
1. **State** what you're solving now
2. **Attempt** a solution
3. **Verify** it works (don't just assume)
4. **Record** the result before moving on

### 5. Synthesis
- Combine sub-solutions
- Check for conflicts between sub-solutions
- Verify the overall solution against the original problem

## Anti-Patterns to Avoid

| Anti-Pattern | Better Approach |
|-------------|----------------|
| Solving everything at once | Break down, solve one piece at a time |
| Assuming intermediate results | Verify each step before continuing |
| Ignoring dependencies | Map dependencies first |
| Starting with implementation | Start with problem definition |
| Holding too much in memory | Document findings as you go |

## Decision Template

When choosing between approaches:

```markdown
### Decision: [What we're deciding]

| Criterion | Option A | Option B |
|-----------|----------|----------|
| Complexity | [1-5] | [1-5] |
| Risk | [1-5] | [1-5] |
| Effort | [1-5] | [1-5] |
| Maintainability | [1-5] | [1-5] |

**Choice:** [Option] because [reason]
**Trade-off accepted:** [what we're giving up]
```

---

## See Also

- **problem-solving** -- 5 specific techniques for when decomposition isn't enough
- **refactoring** -- Structured patterns for safely restructuring complex code
