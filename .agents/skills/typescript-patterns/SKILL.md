---
name: typescript-patterns
description: Advanced TypeScript patterns -- generics, utility types, type narrowing, and production type safety
---

# TypeScript Patterns

Beyond basics -- advanced type patterns for production code.

## Utility Types Quick Reference

| Type | What it does | Example |
|------|-------------|---------|
| `Partial<T>` | All props optional | `Partial<User>` -> `{ name?: string }` |
| `Required<T>` | All props required | `Required<Config>` |
| `Pick<T, K>` | Select specific props | `Pick<User, 'id' \| 'name'>` |
| `Omit<T, K>` | Exclude specific props | `Omit<User, 'password'>` |
| `Record<K, V>` | Key-value map | `Record<string, number>` |
| `Readonly<T>` | All props readonly | `Readonly<State>` |
| `ReturnType<T>` | Function return type | `ReturnType<typeof getUser>` |
| `Parameters<T>` | Function parameter types | `Parameters<typeof createUser>` |
| `Awaited<T>` | Unwrap Promise type | `Awaited<Promise<User>>` -> `User` |
| `NonNullable<T>` | Remove null/undefined | `NonNullable<string \| null>` -> `string` |

---

## Generics

### Constrained Generics

```typescript
// ✅ Constrain to objects with 'id'
function findById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}

// ✅ Constrain to specific keys
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Usage -- fully type-safe
const user = { id: '1', name: 'Phong', role: 'admin' };
const name = getProperty(user, 'name');  // type: string
const bad = getProperty(user, 'foo');    // ❌ Error: 'foo' not in keyof User
```

### Generic Components (React)

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage -- T is inferred from items
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}  // user is typed!
  keyExtractor={(user) => user.id}
/>
```

---

## Type Narrowing

```typescript
// Discriminated unions -- the best pattern for variants
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function handleResult(result: Result<User>) {
  if (result.success) {
    console.log(result.data);    // TS knows: data exists
  } else {
    console.error(result.error); // TS knows: error exists
  }
}

// Type guards -- for custom type checking
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  );
}

// Exhaustive checking -- catch missing cases
type Shape = 'circle' | 'square' | 'triangle';

function getArea(shape: Shape): number {
  switch (shape) {
    case 'circle': return Math.PI * 10 ** 2;
    case 'square': return 10 * 10;
    case 'triangle': return (10 * 10) / 2;
    default:
      const _exhaustive: never = shape;  // ❌ Error if case is missing
      return _exhaustive;
  }
}
```

---

## API Type Safety

```typescript
// Type-safe API client
interface ApiRoutes {
  'GET /users': { response: User[]; params: { page: number } };
  'GET /users/:id': { response: User; params: { id: string } };
  'POST /users': { response: User; body: CreateUserInput };
  'DELETE /users/:id': { response: void; params: { id: string } };
}

// Zod for runtime validation
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.string().datetime(),
});

type User = z.infer<typeof UserSchema>;  // Type from schema!

// Runtime validation
const parsed = UserSchema.safeParse(apiResponse);
if (parsed.success) {
  // parsed.data is fully typed User
}
```

---

## Common Patterns

### Branded Types (Prevent ID Mixups)

```typescript
type UserId = string & { __brand: 'UserId' };
type OrderId = string & { __brand: 'OrderId' };

function getUser(id: UserId): User { ... }
function getOrder(id: OrderId): Order { ... }

const userId = 'abc' as UserId;
const orderId = 'xyz' as OrderId;

getUser(userId);     // ✅
getUser(orderId);    // ❌ Type error -- can't mix up IDs!
```

### Builder Pattern

```typescript
class QueryBuilder<T> {
  private filters: Partial<T> = {};

  where<K extends keyof T>(key: K, value: T[K]): this {
    this.filters[key] = value;
    return this;
  }

  build(): Partial<T> {
    return { ...this.filters };
  }
}

// Usage -- fully type-safe chaining
const query = new QueryBuilder<User>()
  .where('role', 'admin')     // ✅ 'role' and 'admin' are validated
  .where('name', 123)         // ❌ Error: 123 is not string
  .build();
```

---

## Anti-Patterns

| ❌ DON'T | ✅ DO |
|----------|------|
| `any` everywhere | `unknown` + type narrowing |
| Type assertions (`as`) | Type guards (`is`) |
| `interface` for everything | `type` for unions, `interface` for objects |
| Skip `strict: true` | Always enable strict mode |
| Duplicate types for API | Single source: Zod schema -> infer type |
| `string` for all IDs | Branded types or opaque types |

---

## See Also

- **react-best-practices** -- Typed React components, hooks, and props
- **api-patterns** -- Type-safe API clients and request/response validation
- **testing-patterns** -- Typed test fixtures and mocking strategies
