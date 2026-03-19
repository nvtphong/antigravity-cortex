---
name: css-architecture
description: Modern CSS patterns -- design tokens, responsive layouts, CSS Modules, animations, and scalable architecture
---

# CSS Architecture

Scalable, maintainable styling patterns for production applications.

## Design Tokens

```css
/* ✅ Single source of truth for all design values */
:root {
  /* Colors */
  --color-primary: #6d28d9;
  --color-primary-hover: #5b21b6;
  --color-secondary: #0ea5e9;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  --color-text: #1a1a2e;
  --color-text-secondary: #64748b;
  --color-bg: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-border: #e2e8f0;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  
  /* Spacing (4px base) */
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 25px rgba(0,0,0,0.15);
  
  /* Borders */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}

/* Dark mode override */
[data-theme="dark"] {
  --color-text: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-bg: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-border: #334155;
}
```

---

## Layout Patterns

### Responsive Container

```css
.container {
  width: min(100% - 2rem, 1200px);
  margin-inline: auto;
}
```

### Holy Grail Layout (CSS Grid)

```css
.layout {
  display: grid;
  grid-template:
    "header header"  auto
    "sidebar main"   1fr
    "footer footer"  auto
    / 280px 1fr;
  min-height: 100dvh;
}

@media (max-width: 768px) {
  .layout {
    grid-template:
      "header"  auto
      "main"    1fr
      "footer"  auto
      / 1fr;
  }
  .sidebar { display: none; }
}
```

### Flexbox Patterns

```css
/* Center anything */
.center { display: grid; place-items: center; }

/* Space between */
.space-between { display: flex; justify-content: space-between; align-items: center; }

/* Stack with gap */
.stack { display: flex; flex-direction: column; gap: var(--space-4); }

/* Wrap grid */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--space-4);
}
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile-first approach */
/* Default: mobile (< 640px) */

@media (min-width: 640px)  { /* sm: tablet */ }
@media (min-width: 768px)  { /* md: small laptop */ }
@media (min-width: 1024px) { /* lg: desktop */ }
@media (min-width: 1280px) { /* xl: large desktop */ }
```

### Modern Responsive Techniques

```css
/* ✅ Fluid typography -- scales with viewport */
.heading {
  font-size: clamp(1.5rem, 3vw + 1rem, 3rem);
}

/* ✅ Container queries -- respond to parent, not viewport */
.card-container { container-type: inline-size; }

@container (min-width: 400px) {
  .card { flex-direction: row; }
}

/* ✅ Aspect ratio -- consistent media dimensions */
.video { aspect-ratio: 16 / 9; }
.avatar { aspect-ratio: 1; border-radius: var(--radius-full); }
```

---

## Animations

### Micro-interactions

```css
/* Smooth button press */
.btn {
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
.btn:hover { transform: translateY(-1px); box-shadow: var(--shadow-md); }
.btn:active { transform: translateY(0); box-shadow: var(--shadow-sm); }

/* Fade in on load */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in {
  animation: fadeIn var(--transition-base) ease-out;
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Styling Approaches

| Approach | Best for | Scoped? | Runtime? |
|----------|----------|---------|----------|
| **CSS Modules** | Component isolation | ✅ Yes | ❌ No |
| **Tailwind CSS** | Rapid prototyping | ✅ Yes | ❌ No |
| **Vanilla CSS** | Simple projects | ❌ No | ❌ No |
| **styled-components** | Dynamic styles | ✅ Yes | [!]️ Yes |
| **CSS-in-JS (Emotion)** | Dynamic + SSR | ✅ Yes | [!]️ Yes |

> 🔴 **Rule:** Prefer zero-runtime solutions (CSS Modules, Tailwind) for performance-critical apps.

---

## Anti-Patterns

| ❌ DON'T | ✅ DO |
|----------|------|
| Magic numbers (`padding: 13px`) | Design tokens (`padding: var(--space-3)`) |
| `!important` everywhere | Fix specificity with proper selectors |
| Inline styles for complex CSS | CSS Modules or utility classes |
| `px` for font sizes | `rem` for accessibility (user zoom) |
| `height: 100vh` on mobile | `height: 100dvh` (dynamic viewport) |
| Deeply nested selectors | Max 2 levels of nesting |
| Animation without `prefers-reduced-motion` | Always respect user preference |

## See Also

- [ui-ux-design](../ui-ux-design/SKILL.md) � Design systems, typography, color theory
- [accessibility](../accessibility/SKILL.md) � WCAG compliance, ARIA patterns
- [performance-optimization](../performance-optimization/SKILL.md) � CSS performance, Core Web Vitals
