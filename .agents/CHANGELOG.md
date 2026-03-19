# Changelog

All notable changes to the `.agents` kit will be documented in this file.

## [1.0.0] - 2026-03-19

### 🎉 Initial Public Release

**9 Rules -- Always-active behavioral constraints:**
- `task-lifecycle.md` -- 6-phase pipeline orchestrator (Classify -> Gate -> Plan -> Execute -> Check -> Deliver)
- `socratic-gate.md` -- Ask clarifying questions before implementation
- `development-rules.md` -- Request classification, core principles (YAGNI, KISS, DRY)
- `output-calibration.md` -- Auto-calibrate response depth (4 levels)
- `skill-routing.md` -- Auto-load skills by keyword detection
- `clean-code.md` -- Naming, functions, anti-patterns
- `error-recovery.md` -- SCDFV loop for systematic error handling
- `self-check.md` -- 5-point mandatory verification + confidence scoring (1-10)
- `documentation-management.md` -- Post-task documentation updates

**14 Workflows -- On-demand slash commands:**
- `/cook` -- Feature implementation pipeline with review gates
- `/debug` -- Root-cause-first debugging with SCDFV methodology
- `/fix` -- Auto-complexity issue resolution (simple/moderate/hard routing)
- `/plan` -- Technical planning with red-team adversarial review
- `/review` -- Multi-lens code review (security, performance, correctness)
- `/scout` -- Fast parallel codebase exploration
- `/test` -- Test generation, execution, coverage, and fix-failing-tests
- `/brainstorm` -- Structured ideation with multi-perspective scoring
- `/design` -- UI/UX design workflow with prototyping
- `/docs` -- Documentation analysis and synchronization
- `/explain` -- Visual explanations with Mermaid diagrams
- `/git` -- Conventional commits with pre-push checks
- `/init` -- Project bootstrapper with stack detection
- `/watzup` -- Quick project status review

**18 Skills -- Domain knowledge loaded on-demand:**
- accessibility, api-patterns, code-review, css-architecture
- database-design, devops, git-patterns, nextjs-patterns
- performance-optimization, problem-solving, react-best-practices
- refactoring, security-audit, sequential-thinking
- technical-writing, testing-patterns, typescript-patterns, ui-ux-design

**Key Features:**
- Socratic Gate -- strategic questioning before implementation
- Self-Check Protocol with confidence scoring
- Red-Team Review from 3 hostile personas
- Context Efficiency -- token-aware response calibration
- Standardized exit gates across all workflows
- Cross-references ("See Also") between related skills
- Role prompts in all 14 workflows
