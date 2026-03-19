---
description: "Fast codebase exploration using parallel tool calls to find relevant files"
---

# /scout -- Fast Codebase Scouting

> **Role:** You are a codebase explorer. You find files fast using parallel searches and map relationships between components.

Find relevant files quickly using parallel tool calls. Use before starting features, debugging, or exploring unfamiliar code.

## Usage

```
/scout [what to find]
/scout auth logic                    # Find authentication-related files
/scout database migration files      # Find migration scripts
/scout "error handling patterns"     # Find error handling implementations
/scout [files] --edge-cases          # Find edge cases and affected dependents
```

## When to Use

- Beginning work on a feature spanning multiple directories
- Need to "find", "locate", or "search for" files
- Starting a debugging session requiring file relationship understanding
- Understanding project structure or where functionality lives
- Before changes that might affect multiple codebase parts
- **Before code review**: find affected dependents and edge cases (`--edge-cases`)

## Workflow

### Step 1: Analyze Task
// turbo
Parse the search request to identify:
- **Keywords** to grep for (function names, class names, identifiers)
- **File patterns** to search (*.cs, *.sql, *.tsx, etc.)
- **Directories** to search in or exclude
- **Related concepts** (synonyms, abbreviations, related terms)

### Step 2: Parallel Exploration
// turbo
Launch multiple search tools **in parallel** for maximum speed:

```
# In parallel:
grep_search  -> Search for exact identifiers and function names
find_by_name -> Search for files by naming pattern
grep_search  -> Search for related terms/synonyms
```

**Search strategy:**
1. **Exact match:** grep for the exact term
2. **Broader match:** grep for related identifiers
3. **File discovery:** find_by_name for file naming patterns
4. **Documentation:** grep for comments/docs mentioning the concept

### Step 3: Read Key Files
// turbo
For the top results, use `view_file` on the most relevant files to understand:
- What the file does
- How it connects to other files
- Key functions/classes/exports

### Step 4: Edge-Case Detection (--edge-cases mode)

When scouting for edge cases (used before code review or after changes):

1. **Find affected dependents**: grep for function/class names in changed files -> find all callers
2. **Data flow risks**: trace input -> transformation -> output for each changed function
3. **Boundary conditions**: find min/max/empty/null handling in affected code
4. **Async races**: check for concurrent access to shared state
5. **State mutations**: find places where the same state is modified from multiple locations

### Step 5: Dependency Mapping

Map relationships between found files:

```markdown
### Dependency Map
FileA.cs --calls---> FileB.cs --depends on---> FileC.cs
                                              ↑
FileD.cs --imports-----------------------------+
```

### Step 6: Generate Report

Output a structured scout report:

```markdown
## Scout Report: [search term]

### Relevant Files
- `path/to/file.cs` -- Brief description of what this file does
- `path/to/another.cs` -- Brief description
- ...

### Key Patterns Found
- Pattern 1: How X is implemented
- Pattern 2: Where Y is configured

### File Relationships
- `FileA.cs` calls -> `FileB.cs` which depends on -> `FileC.cs`

### Edge Cases Found (if --edge-cases)
- [ ] Input validation missing in FileB.cs:L42
- [ ] Null check needed in FileC.cs:L88
- [ ] Concurrent access risk in FileD.cs:L15

### Unresolved Questions
- Could not determine where Z is configured
- May be additional files in [directory] not explored
```

## Tips for Effective Scouting

1. **Start broad, then narrow** -- First find_by_name for file patterns, then grep specific terms
2. **Follow the chain** -- When you find one file, grep for its imports/callers
3. **Check multiple naming conventions** -- PascalCase, camelCase, snake_case, UPPER_CASE
4. **Don't forget config files** -- `.json`, `.xml`, `.yaml`, `.env` often hold key information
5. **Read directory names** -- Often the directory structure reveals architecture

## Parallel Call Patterns

Maximize speed by grouping independent searches:

```
# Group 1 (parallel): Initial discovery
grep_search("functionName", path)
find_by_name("*pattern*", dir)
grep_search("relatedTerm", path)

# Group 2 (parallel): Deep dive on findings
view_file(found_file_1)
view_file(found_file_2)
view_file(found_file_3)
```

## Output

The scout report should be **concise** -- max 20 relevant files, each with a 1-line description. Focus on actionable findings, not exhaustive listings.

## 🏁 Exit Gate

✅ Report has <=10 relevant files? -> ✅ Relationships mapped? -> ✅ Unresolved questions listed?
