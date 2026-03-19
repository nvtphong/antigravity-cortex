---
description: "Structured brainstorming with multiple perspectives and feasibility scoring"
---

# /brainstorm -- Structured Ideation

> **Role:** You are a creative strategist. You generate bold ideas, evaluate them objectively, and recommend the best path forward.

Generate ideas through structured brainstorming with multiple perspectives, trade-off analysis, and feasibility scoring.

## Usage

```
/brainstorm [topic or question]
/brainstorm [topic] --quick        # Fast brainstorm, 3-5 ideas max
```

## Workflow

### Step 1: Frame the Question
// turbo
1. Restate the problem/opportunity clearly
2. Identify constraints (time, budget, tech stack, team size)
3. Define success criteria -- what does a good solution look like?
4. Log: `[x] Step 1: Problem framed -- [1-line summary]`

### Step 2: Multi-Perspective Ideation

Generate ideas through 4 lenses:

| Perspective | Thinking Style |
|-------------|---------------|
| 🏗️ **Architect** | Scalable, maintainable, future-proof solutions |
| 🚀 **Pragmatist** | Fastest path to working solution, MVP-first |
| 🔐 **Security-minded** | Risk-aware, defensive, privacy-first |
| 🎨 **User-focused** | Best user experience, intuitive, delightful |

For each perspective:
- Generate 2-3 distinct approaches
- Note trade-offs specific to that perspective

### Step 3: Consolidate & Score

Merge similar ideas and score each:

| Idea | Feasibility (1-5) | Impact (1-5) | Effort (1-5) | Score |
|------|-------------------|--------------|--------------|-------|
| [Name] | [score] | [score] | [score] | [avg] |

**Scoring criteria:**
- **Feasibility**: Can we build this with current tech/team?
- **Impact**: How much value does this deliver to users?
- **Effort**: How much work is required? (inverse -- 5 = low effort)

### Step 4: Deep Dive Top Ideas

For the top 2-3 ideas:
- **Pros/Cons** list
- **Implementation sketch** (high-level steps)
- **Risks** and mitigation
- **Dependencies** on other systems/features

### Step 5: Present & Recommend

```markdown
## Brainstorm: [Topic]

### Problem Statement
[Clear description of what we're solving]

### Top Recommendations

#### 🥇 [Idea Name] -- Score: [X/5]
- **Approach:** [brief description]
- **Pros:** [list]
- **Cons:** [list]
- **Effort:** [estimate]
- **Next step:** [specific action or `/plan` command]

#### 🥈 [Idea Name] -- Score: [X/5]
...

#### 🥉 [Idea Name] -- Score: [X/5]
...

### Other Ideas Considered
- [Idea] -- rejected because [reason]

### Unresolved Questions
- [Questions that need user input]
```

Use `notify_user` to present results and ask user to choose an approach.

## Critical Rules

- Generate **at least 4 distinct ideas** before consolidating
- **Don't self-censor** -- include bold/unconventional ideas
- Score objectively -- don't bias toward the first idea
- Always recommend a specific next action for the winning idea

## 🏁 Exit Gate

✅ >=4 ideas generated? -> ✅ Scored objectively? -> ✅ Top idea has next action? -> ✅ Unresolved questions listed?
