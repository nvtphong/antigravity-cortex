---
description: "Test generation, execution, coverage reporting, and fix-failed-tests workflow"
---

# /test -- Test Generation & Execution

> **Role:** You are a test engineer. You write tests that catch bugs, not tests that pass. You test behavior, not implementation.

Generate tests, run existing tests, check coverage, and fix failing tests.

## Usage

```
/test                              # Run all tests
/test [file or feature]            # Generate tests for specific target
/test coverage                     # Show test coverage report
/test fix                          # Find and fix failing tests
```

## Workflow

### Step 1: Detect Test Framework
// turbo
1. Check `package.json` for test runners (Jest, Vitest, Playwright, pytest, etc.)
2. Find existing test files (patterns: `*.test.*`, `*.spec.*`, `tests/`, `__tests__/`)
3. Identify test conventions used in the project
4. Log: `[x] Step 1: [framework] detected, [N] existing test files`

### Step 2: Analyze Target Code (for test generation)
1. Read the target file/feature
2. Identify:
   - Public functions/methods and their signatures
   - Input parameters and types
   - Return values and side effects
   - Dependencies to mock
   - Edge cases (null, empty, boundary values, error conditions)
3. Log: `[x] Step 2: [N] functions found, [M] edge cases identified`

### Step 3: Generate Test Plan

```markdown
## Test Plan: [Target]

| # | Test Case | Type | Category |
|---|-----------|------|----------|
| 1 | Should [happy path] | Unit | Happy path |
| 2 | Should reject [invalid input] | Unit | Validation |
| 3 | Should handle [error scenario] | Unit | Error case |
| 4 | Should [edge case] | Unit | Edge case |
```

### Step 4: Write Tests

Follow the **AAA Pattern** (Arrange-Act-Assert):

```typescript
describe('TargetModule', () => {
  describe('functionName', () => {
    it('should return expected result for valid input', () => {
      // Arrange -- set up test data
      const input = { /* ... */ };
      
      // Act -- call the function
      const result = targetFunction(input);
      
      // Assert -- verify the result
      expect(result).toEqual(expected);
    });

    it('should throw for invalid input', () => {
      // Arrange
      const invalidInput = null;
      
      // Act & Assert
      expect(() => targetFunction(invalidInput)).toThrow();
    });
  });
});
```

**Rules:**
- One assertion per test (when practical)
- Descriptive test names: "should [expected behavior] when [condition]"
- Mock external dependencies (DB, API, file system), NOT internal logic
- Test BEHAVIOR, not implementation details
- Follow existing test patterns in the project

### Step 5: Run Tests
// turbo
1. Execute: `run_command` with the project's test command
2. Parse output: count passed/failed/skipped
3. If failures: read error details

### Step 6: Fix Mode (`/test fix`)

When tests are failing:
1. Read the failing test to understand expected behavior
2. Read the source file to understand actual behavior
3. Determine: **Is the test wrong, or is the source wrong?**
   - Source wrong -> fix the source
   - Test wrong (outdated) -> fix the test
   - Test wrong (bad test) -> rewrite the test
4. Re-run tests until all pass
5. Log: `[x] Step 6: [N] failures fixed`

> 🔴 **DO NOT fix tests by weakening assertions.** If a test expects behavior X, fix the code to produce X (or confirm the test is wrong and update it).

## Test Pyramid

```
        ╱  E2E  ╲           Few -- slow, expensive, fragile
       ╱---------╲
      ╱Integration ╲        Some -- test component boundaries
     ╱---------------╲
    ╱   Unit Tests     ╲    Many -- fast, cheap, focused
   ╱---------------------╲
```

| Level | What to test | How many | Speed |
|-------|-------------|----------|-------|
| **Unit** | Individual functions, pure logic | ~70% | Fast |
| **Integration** | Component boundaries, API calls, DB queries | ~20% | Medium |
| **E2E** | Critical user workflows | ~10% | Slow |

## Output Format

```
[x] Step 1: Vitest detected, 12 existing test files
[x] Step 2: 5 functions found, 8 edge cases identified
[x] Step 3: Test plan -- 15 test cases
[x] Step 4: Tests written -- auth.test.ts (15 tests)
[x] Step 5: 15 passed, 0 failed
```

## 🏁 Exit Gate

✅ All tests pass -> ✅ Edge cases covered -> ✅ No weakened assertions -> ✅ Test pyramid respected
