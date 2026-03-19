---
name: nextjs-patterns
description: Next.js App Router, Server/Client Components, data fetching, caching, and deployment patterns
---

# Next.js Patterns

Production patterns for Next.js App Router. Assumes React fundamentals (see `react-best-practices` skill).

## Server vs Client Components

### Decision Matrix

```
Does it need browser APIs (window, document)?
  -> YES -> 'use client'

Does it need user interaction (onClick, onChange, useState)?
  -> YES -> 'use client'

Does it fetch data from DB/API directly?
  -> YES -> Server Component (default)

Is it purely presentational?
  -> YES -> Server Component (default)
```

### The Pattern

```tsx
// ✅ Server Component (default -- no directive needed)
// Can: access DB, fetch APIs, read files, use secrets
// Cannot: useState, useEffect, onClick, browser APIs
async function ProductList() {
  const products = await db.product.findMany();  // Direct DB access!
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>
          <AddToCartButton productId={p.id} />  {/* Client child */}
        </li>
      ))}
    </ul>
  );
}

// ✅ Client Component -- only what NEEDS interactivity
'use client';
function AddToCartButton({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false);
  return <button onClick={() => setAdded(true)}>Add</button>;
}
```

> 🔴 **Rule:** Default to Server Components. Push `'use client'` to the leaf nodes.

---

## App Router Structure

```
app/
+-- layout.tsx          <- Root layout (wraps everything)
+-- page.tsx            <- Home page (/)
+-- loading.tsx         <- Loading UI for this segment
+-- error.tsx           <- Error UI for this segment
+-- not-found.tsx       <- 404 page
|
+-- products/
|   +-- page.tsx        <- /products
|   +-- [id]/
|   |   +-- page.tsx    <- /products/123
|   |   +-- loading.tsx
|   +-- layout.tsx      <- Products layout (shared sidebar)
|
+-- api/
|   +-- webhooks/
|       +-- route.ts    <- API route: POST /api/webhooks
|
+-- (auth)/             <- Route group (no URL segment)
    +-- login/page.tsx  <- /login
    +-- signup/page.tsx <- /signup
```

| File | Purpose |
|------|---------|
| `layout.tsx` | Shared UI, persists across navigations |
| `page.tsx` | Unique UI for a route |
| `loading.tsx` | Instant loading state (Suspense boundary) |
| `error.tsx` | Error boundary for segment |
| `route.ts` | API endpoint (GET, POST, PUT, DELETE) |
| `(folder)` | Route group -- organize without affecting URL |

---

## Data Fetching

### Server Components (Preferred)

```tsx
// ✅ Fetch directly in Server Components
async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetch(`https://api.example.com/posts/${params.id}`, {
    next: { revalidate: 3600 },  // ISR: revalidate every hour
  }).then(r => r.json());
  
  return <article>{post.title}</article>;
}
```

### Caching Strategies

| Strategy | When | How |
|----------|------|-----|
| **Static (SSG)** | Content rarely changes (blog, docs) | `fetch()` with no options (cached forever) |
| **ISR** | Content changes periodically | `{ next: { revalidate: 3600 } }` |
| **Dynamic (SSR)** | Content changes per request | `{ cache: 'no-store' }` |
| **On-demand** | Content changes on specific events | `revalidatePath()` / `revalidateTag()` |

```tsx
// Static -- cached until next build
const data = await fetch('https://api.example.com/static');

// ISR -- revalidate every 60 seconds
const data = await fetch('https://api.example.com/posts', {
  next: { revalidate: 60 },
});

// Dynamic -- fresh every request
const data = await fetch('https://api.example.com/user', {
  cache: 'no-store',
});

// On-demand -- revalidate when data changes
import { revalidatePath, revalidateTag } from 'next/cache';
revalidatePath('/products');
revalidateTag('products');
```

---

## Server Actions

```tsx
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  
  await db.post.create({ data: { title } });
  revalidatePath('/posts');
}

// app/posts/new/page.tsx
import { createPost } from '@/app/actions';

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <button type="submit">Create</button>
    </form>
  );
}
```

---

## Metadata & SEO

```tsx
// Static metadata
export const metadata = {
  title: 'My Product',
  description: 'Description for SEO',
  openGraph: {
    title: 'My Product',
    description: 'Description for social sharing',
    images: ['/og-image.png'],
  },
};

// Dynamic metadata
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  return {
    title: product.name,
    description: product.description,
  };
}
```

---

## Optimization

### Images

```tsx
import Image from 'next/image';

// ✅ Automatic optimization, lazy loading, WebP conversion
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority          // Above-the-fold images: disable lazy loading
  placeholder="blur" // Show blur while loading
/>
```

### Fonts

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

---

## API Routes

```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}
```

---

## Anti-Patterns

| ❌ DON'T | ✅ DO |
|----------|------|
| `'use client'` on every component | Default Server, only leaf nodes need client |
| `useEffect` + `fetch` for data | `async` Server Component + direct fetch |
| `getServerSideProps` (Pages Router) | App Router `async` component |
| Huge client bundles | Push interactivity to smallest components |
| Fetch same data in multiple components | `fetch` deduplicates automatically |
| `router.push` for all navigation | `<Link>` for prefetching, `router` for programmatic only |

## See Also

- [react-best-practices](../react-best-practices/SKILL.md) � Component patterns, hooks, state
- [typescript-patterns](../typescript-patterns/SKILL.md) � Type-safe Next.js APIs
- [performance-optimization](../performance-optimization/SKILL.md) � Core Web Vitals, SSR/SSG
- [css-architecture](../css-architecture/SKILL.md) � CSS Modules, design tokens
