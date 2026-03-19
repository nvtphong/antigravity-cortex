---
description: "Documentation lifecycle, plan file organization, and docs update triggers"
---

# Documentation Management

## When to Update Docs

Update documentation when:
- A feature is implemented or released
- Significant bugs are resolved or security patches applied
- Project timeline or scope changes
- Architecture or breaking changes occur

## Update Protocol

1. **Before**: Read current docs status
2. **During**: Maintain version consistency and proper formatting
3. **After**: Verify links, dates, and cross-references are accurate
4. **Quality**: Ensure updates align with actual implementation progress

## Plan File Organization

Save plans in `./plans/` directory:

```
plans/
+-- {YYYYMMDD}-{HHMM}-{feature-slug}/
|   +-- plan.md                              # Overview (keep under 80 lines)
|   +-- phase-01-setup-environment.md
|   +-- phase-02-implement-core.md
|   +-- phase-03-implement-ui.md
|   +-- phase-04-write-tests.md
|   +-- reports/
|       +-- research-report.md
|       +-- review-report.md
```

## Plan Overview (plan.md)

Keep generic and under 80 lines:
- List each phase with status/progress
- Link to detailed phase files
- Key dependencies

## Phase File Template

Each phase file should contain:

| Section | Contents |
|---------|----------|
| **Context Links** | Related reports, files, documentation |
| **Overview** | Priority, status, brief description |
| **Key Insights** | Important findings from research |
| **Requirements** | Functional + non-functional |
| **Related Code Files** | Files to modify / create / delete |
| **Implementation Steps** | Detailed, numbered steps |
| **Todo List** | Checkbox list for tracking |
| **Success Criteria** | Definition of done |
| **Risk Assessment** | Potential issues + mitigation |
