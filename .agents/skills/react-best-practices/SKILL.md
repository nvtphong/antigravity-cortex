---
name: react-best-practices
description: React component patterns, hooks, performance, state management, and project structure for production apps
---

# React Best Practices

Universal React patterns for production apps. Framework-agnostic (works with Next.js, Vite, Remix).

## Component Patterns

### Component Structure (Top to Bottom)

```tsx
// 1. Imports
import { useState, useCallback, useMemo } from 'react';

// 2. Types
interface UserCardProps {
  user: User;
  onEdit?: (id: string) => void;
}

// 3. Component
export function UserCard({ user, onEdit }: UserCardProps) {
  // 3a. State
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 3b. Derived state (useMemo)
  const fullName = useMemo(
    () => `${user.firstName} ${user.lastName}`,
    [user.firstName, user.lastName]
  );
  
  // 3c. Handlers (useCallback)
  const handleEdit = useCallback(() => {
    onEdit?.(user.id);
  }, [user.id, onEdit]);
  
  // 3d. Effects (if any)
  
  // 3e. Render
  return (
    <div className="user-card">
      <h3>{fullName}</h3>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}
```

### Component Types

| Type | When | Example |
|------|------|---------|
| **Presentational** | Pure UI, no logic | `<Button>`, `<Card>`, `<Badge>` |
| **Container** | Data fetching + state | `<UserList>`, `<Dashboard>` |
| **Layout** | Page structure | `<Sidebar>`, `<PageWrapper>` |
| **Feature** | Domain-specific | `<CheckoutForm>`, `<UserProfile>` |

---

## Hooks Best Practices

### useState

```tsx
// ✅ Lazy initialization for expensive defaults
const [data, setData] = useState(() => computeExpensiveDefault());

// ✅ Functional updates when depending on previous state
setCount(prev => prev + 1);

// ❌ Object in useState -> split into multiple states
const [form, setForm] = useState({ name: '', email: '', age: 0 });
// ✅ Unless they ALWAYS change together
const [name, setName] = useState('');
const [email, setEmail] = useState('');
```

### useEffect

```tsx
// ✅ Cleanup subscriptions
useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(setData);
  
  return () => controller.abort();  // Cleanup!
}, []);

// ✅ Primitive dependencies
useEffect(() => { ... }, [user.id]);       // ✅ Stable
useEffect(() => { ... }, [user]);          // ❌ New object every render

// ❌ Don't do state sync -- use derived state instead
useEffect(() => setFullName(`${first} ${last}`), [first, last]);  // ❌
const fullName = `${first} ${last}`;  // ✅ Just compute it
```

### Custom Hooks

```tsx
// Extract reusable logic into hooks
function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debounced;
}

// Usage
const searchTerm = useDebounce(inputValue, 500);
```

---

## Performance

### When to Optimize

| Technique | When | NOT when |
|-----------|------|----------|
| `useMemo` | Expensive computation (sort/filter 1000+ items) | Simple string concat |
| `useCallback` | Handler passed to memoized child | Handler used inline |
| `React.memo` | Component re-renders often with same props | Small/simple components |
| `React.lazy` | Route-level, heavy libs (chart, editor, map) | Small utilities |

> 🔴 **Rule:** Measure first. Premature optimization adds complexity without benefit.

### Code Splitting

```tsx
// ✅ Route-level lazy loading
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

// ✅ Heavy component lazy loading
const RichEditor = lazy(() => import('./components/RichEditor'));
const ChartWidget = lazy(() => import('./components/ChartWidget'));

// ✅ Always wrap with Suspense
<Suspense fallback={<Skeleton />}>
  <Dashboard />
</Suspense>
```

### Render Optimization

```tsx
// ❌ Creates new object every render -> children always re-render
<Context.Provider value={{ user, theme, setTheme }}>

// ✅ Memoize context value
const contextValue = useMemo(
  () => ({ user, theme, setTheme }),
  [user, theme, setTheme]
);
<Context.Provider value={contextValue}>
```

---

## State Management

### Decision Tree

```
Is state used by 1 component?
  -> YES -> useState

Is state shared by parent + children?
  -> YES -> Lift state up (prop drilling 1-2 levels is fine)

Is state shared by distant components?
  -> YES -> Context (if updates are infrequent)
  -> YES -> Zustand / Jotai (if updates are frequent)

Is state from server?
  -> YES -> TanStack Query / SWR (cache, refetch, stale management)
```

### Server State vs Client State

| | Server State | Client State |
|--|--|--|
| **Source** | Database/API | User interaction |
| **Tool** | TanStack Query, SWR | useState, Zustand |
| **Caching** | Stale-while-revalidate | In-memory |
| **Examples** | User list, orders, products | Modal open, form input, theme |

---

## Project Structure

### Feature-based (Recommended)

```
src/
+-- features/              <- Domain-specific code
|   +-- auth/
|   |   +-- components/    LoginForm.tsx, SignupForm.tsx
|   |   +-- hooks/         useAuth.ts, useSession.ts
|   |   +-- api/           authApi.ts
|   |   +-- types/         auth.types.ts
|   |   +-- index.ts       <- Public API (re-exports)
|   +-- users/
|   +-- orders/
|
+-- components/            <- Shared/reusable UI
|   +-- Button/
|   +-- Modal/
|   +-- Layout/
|
+-- hooks/                 <- Shared hooks
|   +-- useDebounce.ts
|   +-- useMediaQuery.ts
|
+-- lib/                   <- Utilities, API client
|   +-- api-client.ts
|   +-- format.ts
|
+-- pages/ or routes/      <- Route components
+-- types/                 <- Shared type definitions
```

| Rule | Why |
|------|-----|
| Feature folders group by domain | Find all auth code in one place |
| `index.ts` exports public API | Control what's exposed |
| Shared components are truly reusable | Used by 2+ features |
| Colocation > separation by type | `auth/hooks/` not `hooks/auth/` |

---

## Forms

### React Hook Form + Zod (Standard Pattern)

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // data is fully typed and validated
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## Error Boundaries

```tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; }

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error boundary caught:', error, info);
    // Report to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

// Usage: Wrap around feature boundaries, not the entire app
<ErrorBoundary fallback={<ErrorFallback />}>
  <UserProfile />
</ErrorBoundary>
```

---

## Anti-Patterns

| ❌ DON'T | ✅ DO |
|----------|------|
| `useEffect` for derived state | Compute directly during render |
| `useEffect` for event handlers | Call function in the event handler |
| Prop drilling > 3 levels | Context or state library |
| `index.tsx` for everything | Named files: `UserCard.tsx`, not `index.tsx` in every folder |
| Fetch in useEffect without cleanup | Use TanStack Query/SWR or AbortController |
| `any` type | Proper TypeScript types |
| Inline styles for complex CSS | CSS Modules, Tailwind, or styled-components |
| Giant components (> 200 lines) | Extract sub-components and custom hooks |

---

## See Also

- **typescript-patterns** -- Generics, type narrowing, Zod validation for React props
- **nextjs-patterns** -- Server Components, App Router, data fetching with React
- **css-architecture** -- Design tokens, responsive layouts, animations
- **testing-patterns** -- Component testing with React Testing Library
- **performance-optimization** -- React-specific: memo, lazy, Suspense, bundle splitting
