---
name: testing-patterns
description: Test pyramid, AAA pattern, mocking strategies, naming conventions, and coverage guidance
---

# Testing Patterns Skill

Reference material for writing effective tests.

## When to Use
- Writing new tests for features or bug fixes
- Choosing test strategy (unit vs integration vs e2e)
- Setting up mocking and test doubles
- Evaluating test coverage quality (not just numbers)

## Test Pyramid

```
        ╱  E2E  ╲           ~10% -- slow, expensive, fragile
       ╱---------╲
      ╱Integration╲        ~20% -- test boundaries
     ╱-------------╲
    ╱   Unit Tests  ╲    ~70% -- fast, cheap, focused
   ╱-----------------╲
```

| Level | Test What | Mock What | Speed |
|-------|----------|-----------|-------|
| **Unit** | Single function/class logic | External dependencies (DB, API, FS) | <1ms |
| **Integration** | Component boundaries, API routes | Nothing (or only external services) | <1s |
| **E2E** | Full user workflows | Nothing | <30s |

## AAA Pattern (Arrange-Act-Assert)

```typescript
it('should calculate total with discount', () => {
  // Arrange -- set up preconditions
  const cart = createCart([
    { product: 'Widget', price: 100, quantity: 2 }
  ]);
  const discount = 0.1; // 10%

  // Act -- perform the action
  const total = cart.calculateTotal(discount);

  // Assert -- verify the outcome
  expect(total).toBe(180);
});
```

## Test Naming

| Pattern | Example |
|---------|---------|
| **should [behavior] when [condition]** | `should return 404 when user not found` |
| **given [context] when [action] then [result]** | `given empty cart when checkout then throw error` |

> **Rule:** If you can't name the test clearly, the function might be doing too much.

## What to Test

| ✅ Test | ❌ Don't Test |
|---------|--------------|
| Business logic | Framework internals |
| Edge cases (null, empty, boundary) | Getters/setters with no logic |
| Error handling paths | Private methods directly |
| Input validation | Third-party library internals |
| Integration boundaries | Implementation details |

## Mocking Strategy

| Mock When | Don't Mock When |
|-----------|----------------|
| External API calls | Testing the actual integration |
| Database operations (in unit tests) | Integration tests (use real DB) |
| File system I/O | Logic under test |
| Time/Date (for determinism) | Simple collaborators |
| Random/UUID generation | Internal data structures |

### Mock Hierarchy
1. **Stub** -- returns fixed values (simplest)
2. **Spy** -- records calls, can verify interactions
3. **Mock** -- stubs + expectations on how it's called
4. **Fake** -- working implementation (in-memory DB, fake API)

## Coverage Guidelines

| Metric | Target | Notes |
|--------|--------|-------|
| **Line coverage** | >80% | Not a goal in itself -- quality > quantity |
| **Branch coverage** | >70% | More meaningful than line coverage |
| **Critical paths** | 100% | Auth, payments, data mutations |

> **Warning:** 100% coverage != good tests. A test that asserts nothing has 100% coverage but catches 0 bugs.

## Common Anti-Patterns

| ❌ Anti-Pattern | ✅ Better |
|----------------|----------|
| Testing implementation details | Test behavior and output |
| Multiple assertions per test | One concept per test |
| Test depends on other tests | Independent, isolated tests |
| Test depends on execution order | Each test sets up its own state |
| Flaky tests (sometimes pass/fail) | Fix the flakiness or delete the test |
| Mocking everything | Mock only external boundaries |

## See Also

- [code-review](../code-review/SKILL.md) � Test coverage assessment
- [api-patterns](../api-patterns/SKILL.md) � API endpoint testing
- [react-best-practices](../react-best-practices/SKILL.md) � Component testing patterns
- [refactoring](../refactoring/SKILL.md) � Tests as safety net
