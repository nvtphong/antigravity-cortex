---
name: performance-optimization
description: Web performance profiling, Core Web Vitals, bundle analysis, and runtime optimization techniques
---

# Performance Optimization

Measure first, optimize second. This skill covers profiling, Core Web Vitals, and proven optimization techniques.

## Core Web Vitals

| Metric | Good | Needs Work | Poor | What it measures |
|--------|------|------------|------|-----------------|
| **LCP** | < 2.5s | 2.5-4s | > 4s | Largest visible content load time |
| **INP** | < 200ms | 200-500ms | > 500ms | Interaction responsiveness |
| **CLS** | < 0.1 | 0.1-0.25 | > 0.25 | Visual stability (layout shifts) |

### How to Fix Each

**LCP (Largest Contentful Paint):**
```
Slow LCP?
  -> Is hero image optimized? -> Use WebP/AVIF, proper sizing, priority loading
  -> Is CSS blocking? -> Inline critical CSS, defer non-critical
  -> Is server slow? -> Check TTFB, add CDN, cache responses
  -> Is font blocking? -> Use font-display: swap
```

**INP (Interaction to Next Paint):**
```
Slow interactions?
  -> Long tasks on main thread? -> Break into chunks with requestIdleCallback
  -> Heavy computation? -> Move to Web Worker
  -> Too many re-renders (React)? -> useMemo, useCallback, React.memo
  -> Heavy DOM manipulation? -> Batch updates, virtualize long lists
```

**CLS (Cumulative Layout Shift):**
```
Layout shifts?
  -> Images without dimensions? -> Always set width/height or aspect-ratio
  -> Fonts causing reflow? -> font-display: optional or swap + preload
  -> Dynamic content injected? -> Reserve space with min-height
  -> Ads/embeds loading late? -> Set explicit container dimensions
```

---

## Bundle Optimization

### Analysis

```bash
# Next.js
npx @next/bundle-analyzer

# Vite
npx vite-bundle-visualizer

# Webpack
npx webpack-bundle-analyzer stats.json
```

### Optimization Techniques

| Technique | Impact | Effort |
|-----------|--------|--------|
| **Tree shaking** | High | Low (automatic with ESM) |
| **Code splitting** | High | Medium (lazy imports) |
| **Dynamic imports** | High | Low (`import()`) |
| **Barrel file removal** | Medium | Low (import directly) |
| **Image optimization** | High | Low (WebP/AVIF, srcset) |
| **Font subsetting** | Medium | Low (only used characters) |

```tsx
// ❌ Barrel import -- pulls entire library
import { Button } from '@/components';

// ✅ Direct import -- tree shakeable
import { Button } from '@/components/Button';

// ❌ Full library import
import _ from 'lodash';

// ✅ Individual function import
import debounce from 'lodash/debounce';
```

---

## Runtime Performance

### Long Task Detection

```javascript
// Detect tasks blocking the main thread > 50ms
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.warn(`Long task: ${entry.duration}ms`, entry);
  }
});
observer.observe({ type: 'longtask', buffered: true });
```

### Virtualization (Long Lists)

```tsx
// For lists with 100+ items, virtualize
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(row => (
          <div key={row.key} style={{
            position: 'absolute',
            top: row.start,
            height: row.size,
          }}>
            {items[row.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Performance Checklist

### Before Launch
- [ ] Lighthouse score > 90 (Performance)
- [ ] No layout shifts (CLS < 0.1)
- [ ] Images: WebP/AVIF, lazy loaded, sized
- [ ] Fonts: preloaded, font-display: swap
- [ ] JS bundle < 200KB (gzipped, initial load)
- [ ] CSS: critical inline, rest deferred
- [ ] API responses cached appropriately
- [ ] Long lists virtualized (> 100 items)

### Monitoring
- [ ] Real User Monitoring (RUM) via web-vitals
- [ ] Error tracking (Sentry)
- [ ] Performance budgets in CI

## See Also

- [react-best-practices](../react-best-practices/SKILL.md) � React rendering optimization
- [nextjs-patterns](../nextjs-patterns/SKILL.md) � SSR/SSG, caching strategies
- [css-architecture](../css-architecture/SKILL.md) � CSS performance patterns
- [database-design](../database-design/SKILL.md) � Query optimization, indexing
