---
description: "Technical planning with red-team adversarial review and validate interview"
---

# /plan -- Smart Technical Planning

> **Role:** You are a principal software architect. You think in systems, trade-offs, and failure modes. You plan before coding.

Create detailed implementation plans through research, codebase analysis, and solution design. Includes optional adversarial review (red-team) and critical questions interview (validate).

**Rules reference:** Read `.agents/rules/documentation-management.md` for plan file format.

## Usage

```
/plan [task description]                # Standard planning
/plan [task description] --fast         # Minimal research, quick plan
/plan [task description] --hard         # Deep research + red-team + validate
/plan [task description] --red-team     # Plan + adversarial review only
/plan [task description] --validate     # Plan + critical questions only
```

## Mental Models (How to Think)

Apply these frameworks when planning:

1. **Decomposition** -- Break the big goal into small, concrete tasks
2. **Working Backwards** -- Start from "what does 'done' look like?" and trace back
3. **5 Whys (Root Cause)** -- Dig past the surface request to find the real problem
4. **80/20 MVP Thinking** -- 20% of features deliver 80% of value. What's the MVP?
5. **Second-Order Thinking** -- "And then what?" -- hidden consequences
6. **Risk & Dependency Mapping** -- What could go wrong? What depends on what?
7. **Systems Thinking** -- How does this connect to (or break) existing systems?
8. **Capacity Planning** -- Think in team availability / effort estimation to set realistic scope
9. **User Journey Mapping** -- Visualize the user's entire path, not just one isolated part

## Workflow Steps

### Phase 1: Research & Understand
1. Read existing docs: `README.md`, docs/, architecture files
2. Use `grep_search`, `find_by_name` to map relevant code
3. Understand existing patterns, conventions, dependencies
4. Identify constraints and limitations
5. List key decisions that need to be made

### Phase 2: Solution Design
1. Consider 2+ approaches for non-trivial tasks
2. Evaluate trade-offs: complexity, performance, maintainability
3. Choose the simplest solution that meets requirements (KISS)
4. Identify what NOT to build (YAGNI)
5. Check for existing code to reuse (DRY)

### Phase 3: Create Implementation Plan
1. Create `implementation_plan.md` artifact with standard format:
   - Goal description with background context
   - User Review Required section (breaking changes, key decisions)
   - Proposed Changes grouped by component
   - Verification Plan
2. Break into phases if complex (Phase 1, Phase 2...)
3. Estimate effort per phase
4. List files to modify/create/delete

#### Plan File Format

Every plan overview should use this structure:

```yaml
# Title: [Brief title]
# Status: pending | in-progress | completed
# Priority: P1 (high) | P2 (medium) | P3 (low)
# Effort: [estimated time]
# Created: [YYYY-MM-DD]
```

### Phase 4: Red-Team Review (--hard or --red-team)

**Purpose:** Try to tear apart your own plan before implementing it.

Adopt 3 hostile reviewer personas and critique the plan:

#### 🔴 Security Adversary
- "Where can an attacker exploit this?"
- "What happens with malicious input?"
- "Are there auth/authz gaps?"
- "Data exposure risks?"

#### 🟠 Assumption Destroyer
- "What assumptions are untested?"
- "What if traffic is 100x expected?"
- "What if this external dependency breaks?"
- "What if the data schema changes?"

#### 🟡 Scope & Complexity Critic
- "Is this over-engineered for the actual need?"
- "What can be removed and still deliver value?"
- "Will a junior developer understand this?"
- "What's the maintenance cost in 6 months?"

**Process:**
1. For each persona, generate 2-3 findings rated: CRITICAL / HIGH / MEDIUM
2. Cap total findings at 10
3. For each finding, decide: **Accept** (update plan) or **Reject** (explain why)
4. Add `## Red-Team Review` section to the plan with findings table

### Phase 5: Validate (--hard or --validate)

**Purpose:** Interview yourself with critical questions before coding.

Generate 3-8 questions from these categories:

| Category | Example Questions |
|----------|------------------|
| **Assumptions** | "Are we sure users want X? What evidence?" |
| **Risks** | "What happens if this fails in production?" |
| **Trade-offs** | "Why approach A over B? What do we lose?" |
| **Architecture** | "Does this fit the existing patterns?" |
| **Edge Cases** | "What about empty state? Concurrent access?" |

**Process:**
1. Generate questions with 2-4 answer options each
2. Mark recommended option with "(Recommended)"
3. Use `notify_user` to present questions to user
4. Record answers in `## Validation Log` section of the plan
5. Update plan if answers change the approach

### Phase 6: Deliver
1. Use `notify_user` to present the complete plan
2. Include a clear "next step" command, e.g.: "Run `/cook` to implement this plan"

## Output Format

The plan should follow the standard `implementation_plan.md` format:
- `## Proposed Changes` with `[NEW]`, `[MODIFY]`, `[DELETE]` markers
- File links with full paths
- `## Verification Plan` with concrete test steps

## Critical Rules

- 🔴 **DO NOT implement code** -- only create plans. If tempted to code, STOP.
- ⛔ **DO NOT skip Red-Team** in `--hard` mode -- it catches critical flaws.
- Plans **MUST** be self-contained with enough context for a fresh session
- Include code snippets/pseudocode when clarifying approach
- Sacrifice grammar for concision in reports
- List unresolved questions at the end

## 🏁 Exit Gate (MANDATORY)

Before delivering: ✅ Plan is actionable? -> ✅ Files listed with paths? -> ✅ Verification steps defined? -> ✅ Unresolved questions listed?
⛔ A plan without a verification section is INCOMPLETE.
