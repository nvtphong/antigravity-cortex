---
description: "Feature implementation pipeline with review gates"
---

# /cook -- Smart Feature Implementation

> **Role:** You are a senior software engineer implementing features systematically. You write clean, tested, production-ready code.

End-to-end implementation workflow. Ensures quality through structured phases and review gates.

**Principles:** YAGNI (You Aren't Gonna Need It) . KISS (Keep It Simple) . DRY (Don't Repeat Yourself)

**Rules reference:** Read `.agents/rules/development-rules.md`, `.agents/rules/clean-code.md`, `.agents/rules/self-check.md` before starting.

## Usage

```
/cook [task description]
/cook [task description] --fast     # Skip research, go straight to plan->code
/cook [task description] --auto     # Skip review gates, auto-approve all steps
/cook [task description] --turbo    # No research, no review gates, maximum speed
```

## Workflow Steps

### Step 0: Intent Detection & Socratic Gate
// turbo
1. Read the task description carefully
2. Determine complexity: **Simple** (1-2 files) / **Moderate** (multi-file) / **Complex** (architecture-level)
3. **Apply Socratic Gate** (see `.agents/rules/socratic-gate.md`):
   - New feature/complex -> ASK 3 strategic questions before proceeding
   - Bug fix -> confirm understanding + ask impact
   - Skip if `--fast` or `--turbo` or request is perfectly clear
4. Set up task boundary with PLANNING mode
5. Log: `[x] Step 0: [complexity] detected -- [mode]`

### Step 1: Research (skip if --fast or --turbo)
1. Use `grep_search`, `find_by_name`, `view_file` to understand existing code
2. Search for related patterns, similar implementations in the codebase
3. Read relevant documentation (`README.md`, docs/, etc.)
4. Summarize findings in max 10 bullet points
5. **REVIEW GATE:** Use `notify_user` to present findings and ask: "Proceed to planning?"

### Step 2: Plan
1. Switch task boundary to PLANNING mode
2. Create `implementation_plan.md` artifact with:
   - Problem description
   - Proposed changes (grouped by component, files listed with `[NEW]`/`[MODIFY]`/`[DELETE]`)
   - Verification plan
3. For complex tasks: break into phases (Phase 1, Phase 2...)
4. **REVIEW GATE:** Use `notify_user` to present plan and ask for approval
5. Wait for user to approve before proceeding

### Step 3: Implement
1. Switch task boundary to EXECUTION mode
2. Follow the approved plan step by step
3. After creating/modifying each code file:
   - **Compile check:** Run build/compile command to verify no syntax errors
   - **Modularization check:** If file exceeds 200 lines, split into focused modules
4. Rules:
   - DO NOT create new "enhanced" versions of files -- update existing files directly
   - Keep files under 200 lines -- modularize if needed
   - Use descriptive file names (kebab-case, long names OK)
   - Handle edge cases and error scenarios
   - Write self-documenting code with meaningful comments for complex logic
5. Update `task.md` checkboxes as you complete each item
6. **REVIEW GATE:** Use `notify_user` to present implementation summary (files changed, key decisions)

### Step 4: Test & Verify
1. Switch task boundary to VERIFICATION mode
2. Run build/compile commands to verify no errors
3. Run existing test suites if applicable
4. Manually verify the implementation matches requirements
5. Check for regressions in related functionality
6. Log: `[x] Step 4: Verified -- [results]`
7. **REVIEW GATE:** Present test results via `notify_user`

### Step 5: Self Code Review

Before claiming done, systematically review your own work:

| Lens | Key Questions |
|------|---------------|
| **Security** | Hardcoded credentials? SQL injection? XSS? Input validation? |
| **Performance** | N+1 queries? Unnecessary loops? Missing indexes? Memory leaks? |
| **Correctness** | Edge cases handled? Error scenarios covered? Null/empty checks? |
| **Standards** | Follows existing patterns? Naming conventions? File structure? |
| **Dependencies** | Affected dependents? Data flow risks? Boundary conditions? |

- **Edge-case scouting:** Search for files affected by your changes (`grep_search` for function/class names you touched). Check callers and dependents.
- Rate the implementation 1-10. If <8, fix issues before proceeding.

### Step 6: Finalize
1. Create `walkthrough.md` artifact documenting:
   - What was changed and why
   - What was tested
   - Validation results
2. Update `task.md` -- mark all items complete
3. Use `notify_user` to present final summary to user

## Critical Rules

- 🔴 **NEVER skip plan approval** (except in `--auto` or `--turbo` mode)
- ⛔ **DO NOT use fake data, mocks, or temporary solutions** just to pass tests
- 🔴 **Always fix failing tests** -- do not ignore them
- ⛔ **DO NOT commit confidential info** (env files, API keys, database credentials)
- 🔴 Files **MUST** be under 200 lines. If exceeding -> STOP and modularize before continuing.

## Example

```
Input: /cook add dark mode toggle

Step 0: Moderate complexity. Socratic Gate -> "CSS-only or save preference to DB?"
Step 1: Research -> found CSS variables in theme.css, no dark mode yet
Step 2: Plan -> 1. Add CSS dark variables 2. Add toggle button 3. Save to localStorage
Step 3: Implemented -> theme.css, toggle.ts, header.tsx modified
Step 4: Verified -> build passes, toggle works in browser
Step 5: Self-review 9/10 -> clean, no security issues
Step 6: Finalized -> walkthrough created
```

## 🏁 Exit Gate (MANDATORY)

Before completing, verify:
✅ Goal met? -> ✅ All files edited? -> ✅ Code works? -> ✅ No errors? -> ✅ Nothing forgotten?
⛔ DO NOT finalize until all 5 pass. See `.agents/rules/self-check.md`.

## Output Format

Each step logs progress:
```
[x] Step 0: Moderate complexity -- interactive mode
[x] Step 1: Research complete -- 3 related patterns found
[x] Step 2: Plan created -- 2 phases
[x] Step 3: Implemented -- 5 files changed
[x] Step 4: Verified -- build passes, manual checks OK
[x] Step 5: Self-review 9/10 -- no critical issues
[x] Step 6: Finalized -- walkthrough created
```
