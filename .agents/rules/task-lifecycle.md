---
description: "Connects all rules into a coherent pipeline -- every task flows through Gate -> Plan -> Execute -> Check"
---

# Task Lifecycle Pipeline

**MANDATORY: Every non-trivial task follows this pipeline. Rules don't work in isolation -- they chain.**

> Each phase consumes the OUTPUT of the previous phase.
> Skip phases only when skip conditions are explicitly met.

## The Pipeline

```
Request
  |
  ▼
+-----------------+
| 1. CLASSIFY      | -> development-rules.md
|   What type?     |   Determines which phases to run
+--------+--------+
         |
         ▼
+-----------------+
| 2. GATE          | -> socratic-gate.md
|   Ask first?     |   Produces: confirmed requirements
+--------+--------+
         |
         ▼
+-----------------+
| 3. PLAN          | -> /plan or /cook workflow
|   How to build?  |   Produces: implementation plan
+--------+--------+
         |
         ▼
+-----------------+
| 4. EXECUTE       | -> clean-code.md + skill-routing.md
|   Build it       |   Produces: code changes
+--------+--------+
         |
    Error? ---> error-recovery.md (SCDFV loop)
         |
         ▼
+-----------------+
| 5. CHECK         | -> self-check.md
|   Verify it      |   Produces: verification report
+--------+--------+
         |
         ▼
+-----------------+
| 6. DELIVER       | -> output-calibration.md
|   Report back    |   Calibrated to complexity
+-----------------+
```

## Phase Routing by Task Type

| Task Type | Gate | Plan | Execute | Check | Deliver |
|-----------|------|------|---------|-------|---------|
| **Trivial** (rename, color change) | Skip | Skip | ✅ | Quick (1-3) | Level 1 |
| **Simple** (single-file fix/feature) | Verify | Skip | ✅ | Standard (1-5) | Level 2 |
| **Medium** (multi-file, new feature) | ✅ Full | ✅ | ✅ | Full (1-10) | Level 3 |
| **Complex** (architecture, system design) | ✅ Full | ✅ + Review | ✅ | Full (1-10) | Level 4 |
| **Slash command** | Per workflow | Per workflow | ✅ | Per workflow | Per workflow |

## Phase Handoff Protocol

Each phase produces an output that the next phase consumes:

| From -> To | What's Passed |
|-----------|---------------|
| Classify -> Gate | Task type + complexity level |
| Gate -> Plan | Confirmed requirements + scope |
| Plan -> Execute | List of files to change + approach |
| Execute -> Check | Changed files + build output |
| Check -> Deliver | Verification score + evidence |

## Skip Conditions

| Phase | Skip When |
|-------|-----------|
| **Gate** | Request is unambiguous AND trivial AND < 20 words |
| **Plan** | Single-file change OR following an approved plan |
| **Execute** | Question-only requests ("what is X?") |
| **Check** | Question-only requests |

> 🔴 **Rule:** When in doubt about skipping, DON'T skip. Over-checking is cheap; under-checking breaks things.

## Pipeline Violations (Anti-Patterns)

| ❌ Violation | Why It Fails |
|-------------|-------------|
| Execute without Gate | You build the wrong thing |
| Execute without Plan (for complex tasks) | You build it wrong |
| Deliver without Check | User gets broken code |
| Skip to Execute because "it's obvious" | Obvious to you != obvious to user |
| Check without running build/test | "Should work" is not evidence |
