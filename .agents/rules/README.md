---
description: "Rule priority ordering and conflict resolution -- read this first"
---

# Rules -- Priority & Conflict Resolution

When rules conflict, follow this priority order (highest first):

| Priority | Rule | Purpose |
|----------|------|---------|
| 1 | **task-lifecycle** | Pipeline orchestrator -- routes tasks through all phases |
| 2 | **socratic-gate** | Safety net -- clarify before coding |
| 3 | **development-rules** | Request classification & core principles |
| 4 | **output-calibration** | Auto-calibrate response depth to task complexity |
| 5 | **skill-routing** | Load domain-specific knowledge when needed |
| 6 | **clean-code** | Coding standards & anti-patterns |
| 7 | **error-recovery** | SCDFV loop -- diagnose errors, don't retry blindly |
| 8 | **self-check** | Exit verification before claiming done |
| 9 | **documentation-management** | Post-task documentation updates |

## Conflict Examples

| Situation | Resolution |
|-----------|------------|
| "Simple fix" but requirements unclear | Socratic Gate wins -> ask first, then direct fix |
| Clean code says "small functions" but user wants quick fix | Development-rules wins -> do what user asks, follow clean-code where practical |
| Self-check says "verify all" but user is in `--fast` mode | Checks 1-3 still mandatory, skip extended checks 6-10 |

## Rule Loading

- **Always active:** All rules are loaded as behavioral constraints
- **Rules != workflows:** Rules define HOW to behave. Workflows define WHAT to do
- **Rules != skills:** Rules are mandatory. Skills are optional reference material
