---
name: ui-ux-design
description: Complete UI/UX reference -- design systems, color theory, typography, layouts, components, accessibility, animations, and UX principles
---

# UI/UX Design Skill (ProMax)

Comprehensive reference for building premium, accessible, and delightful user interfaces.

## When to Use
- Building or redesigning UI components and pages
- Creating design systems, themes, or style guides
- Choosing colors, typography, spacing, or layouts
- Implementing animations, transitions, and micro-interactions
- Ensuring accessibility and responsive design
- Running the `/design` workflow

---

## UX Principles

### Core Mental Models

| Principle | Meaning | Application |
|-----------|---------|-------------|
| **Fitts's Law** | Larger + closer targets -> easier to click | Make CTAs big, place in thumb zones on mobile |
| **Hick's Law** | More choices -> longer decision time | Limit options to 5-7 per group. Progressive disclosure |
| **Miller's Law** | Working memory holds 7+/-2 items | Group items in chunks of 3-5 |
| **Jakob's Law** | Users expect your site to work like others | Follow platform conventions, don't reinvent navigation |
| **Doherty Threshold** | Response < 400ms feels instant | Skeleton screens, optimistic UI, loading indicators |
| **Aesthetic-Usability** | Beautiful things feel easier to use | Invest in visual polish -- it IS functional |

### UX Checklist

- [ ] **Feedback**: Every action produces visible response (hover, click, submit)
- [ ] **Error Prevention**: Validate before submit, confirm destructive actions
- [ ] **Recovery**: Clear error messages with fix instructions, undo support
- [ ] **Consistency**: Same action = same behavior everywhere
- [ ] **Hierarchy**: Most important content/action is visually dominant
- [ ] **Empty States**: Design what users see when there's no data

---

## Design System Foundation

### Spacing Scale (8px grid)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight text gaps |
| `--space-2` | 8px | Inline element spacing |
| `--space-3` | 12px | Compact padding |
| `--space-4` | 16px | Standard padding |
| `--space-6` | 24px | Card padding |
| `--space-8` | 32px | Section padding |
| `--space-12` | 48px | Large section gaps |
| `--space-16` | 64px | Page section gaps |

> **Rule:** Use multiples of 4px (or 8px). Never use arbitrary values like 13px or 37px.

### Typography Scale

```css
:root {
  /* Font families -- always specify fallbacks */
  --font-sans: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

  /* Type scale (Major Third -- 1.25 ratio) */
  --text-xs:   0.75rem;   /* 12px -- captions, labels */
  --text-sm:   0.875rem;  /* 14px -- secondary text */
  --text-base: 1rem;      /* 16px -- body text */
  --text-lg:   1.25rem;   /* 20px -- emphasized body */
  --text-xl:   1.563rem;  /* 25px -- card titles */
  --text-2xl:  1.953rem;  /* 31px -- section headings */
  --text-3xl:  2.441rem;  /* 39px -- page headings */
  --text-4xl:  3.052rem;  /* 49px -- hero headings */

  /* Line heights */
  --leading-tight: 1.25;  /* headings */
  --leading-normal: 1.5;  /* body */
  --leading-relaxed: 1.75; /* long reading */

  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Body | `--text-base` | 400 | 1.5 |
| Label / Caption | `--text-sm` | 500 | 1.25 |
| Card Title | `--text-xl` | 600 | 1.25 |
| Section Heading | `--text-2xl` | 700 | 1.25 |
| Page Heading | `--text-3xl` | 700 | 1.1 |
| Hero | `--text-4xl` | 700-800 | 1.1 |

> **Rule:** Max 2 font families per project. Max 3-4 weights per family.

---

## Color System

### Building a Palette

| Layer | Purpose | Example Token |
|-------|---------|---------------|
| **Primary** | Brand, main CTAs, active states | `--color-primary-500` |
| **Secondary** | Less prominent actions, accents | `--color-secondary-500` |
| **Neutral** | Text, borders, backgrounds | `--color-gray-100` to `--color-gray-900` |
| **Semantic** | Success, warning, error, info | `--color-success`, `--color-error` |
| **Surface** | Card/panel backgrounds | `--color-surface`, `--color-surface-elevated` |

### Shade Generation (10-stop scale)

```css
:root {
  --color-primary-50:  #EFF6FF;  /* Lightest -- backgrounds */
  --color-primary-100: #DBEAFE;  /* Hover backgrounds */
  --color-primary-200: #BFDBFE;  /* Borders */
  --color-primary-300: #93C5FD;  /* Disabled */
  --color-primary-400: #60A5FA;  /* Icons */
  --color-primary-500: #3B82F6;  /* Default -- buttons, links */
  --color-primary-600: #2563EB;  /* Hover state */
  --color-primary-700: #1D4ED8;  /* Active/pressed */
  --color-primary-800: #1E40AF;  /* Text on light bg */
  --color-primary-900: #1E3A8A;  /* Darkest -- headings */
}
```

### Dark Mode Strategy

| Approach | When |
|----------|------|
| **CSS Variables swap** | Simple -- toggle `:root` vs `[data-theme="dark"]` |
| **`prefers-color-scheme`** | Auto-detect system preference |
| **Class toggle** | User preference stored in localStorage |

```css
[data-theme="dark"] {
  --color-bg: #0F172A;
  --color-surface: #1E293B;
  --color-text: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-border: #334155;
}
```

> **Rule:** Don't just invert colors. Dark mode needs lower contrast, softer whites (#F1F5F9, not #FFFFFF), and elevated surfaces.

### Contrast Requirements

| Element | Min Ratio | WCAG Level |
|---------|-----------|------------|
| Normal text | 4.5:1 | AA |
| Large text (>=18px bold) | 3:1 | AA |
| UI components | 3:1 | AA |
| Enhanced (optional) | 7:1 | AAA |

---

## Layout Patterns

### Responsive Breakpoints

| Name | Width | Typical Device |
|------|-------|----------------|
| `xs` | < 576px | Phone portrait |
| `sm` | >= 576px | Phone landscape |
| `md` | >= 768px | Tablet |
| `lg` | >= 1024px | Desktop |
| `xl` | >= 1280px | Large desktop |
| `2xl` | >= 1536px | Ultra-wide |

### CSS Grid Quick Reference

```css
/* Dashboard layout */
.dashboard { display: grid; grid-template-columns: 250px 1fr; grid-template-rows: 64px 1fr; min-height: 100vh; }

/* Auto-responsive cards -- no media queries needed */
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }

/* Holy grail layout */
.page { display: grid; grid-template: "header header" auto "sidebar main" 1fr "footer footer" auto / 250px 1fr; }
```

### Container Width Rules

| Content Type | Max Width |
|---|---|
| Prose/reading | 65ch (~700px) |
| Form | 480-560px |
| Dashboard card | 400-600px |
| Full page content | 1200-1400px |

---

## Component Patterns

### Button Hierarchy

| Level | Style | Usage |
|-------|-------|-------|
| **Primary** | Solid fill, brand color | 1 per section -- main CTA |
| **Secondary** | Outline or muted fill | Alternative actions |
| **Tertiary** | Text-only, no border | Cancel, navigation, less important |
| **Destructive** | Red fill or outline | Delete, remove, irreversible |
| **Ghost** | Transparent background | Toolbars, icon buttons |

### States Every Component Needs

| State | Visual Treatment |
|-------|-----------------|
| **Default** | Base appearance |
| **Hover** | Subtle bg change, slight shadow lift |
| **Focus** | Visible ring/outline (2px, offset) |
| **Active/Pressed** | Slightly darker, scale(0.98) |
| **Disabled** | 50% opacity, `cursor: not-allowed` |
| **Loading** | Spinner or skeleton, disabled interaction |
| **Error** | Red border, error message below |
| **Success** | Green border or checkmark feedback |

### Modern UI Patterns

| Pattern | CSS | When |
|---------|-----|------|
| **Glassmorphism** | `backdrop-filter: blur(12px); background: rgba(255,255,255,0.1)` | Overlays, cards on image backgrounds |
| **Neumorphism** | `box-shadow: 8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff` | Subtle, soft UI (use sparingly) |
| **Gradient borders** | `border-image: linear-gradient(...) 1` or pseudo-element | Premium CTAs, featured cards |
| **Mesh gradients** | Multiple radial-gradient layers | Backgrounds, hero sections |
| **Frosted glass** | `backdrop-filter: blur() saturate()` | Navbars, modals |

---

## Animation & Micro-Interactions

### Timing Functions

| Easing | CSS | Feel |
|--------|-----|------|
| **Enter** | `cubic-bezier(0, 0, 0.2, 1)` | Deceleration -- element arriving |
| **Exit** | `cubic-bezier(0.4, 0, 1, 1)` | Acceleration -- element leaving |
| **Standard** | `cubic-bezier(0.4, 0, 0.2, 1)` | Natural movement |
| **Bounce** | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful, attention-grabbing |

### Duration Guide

| Action | Duration | Example |
|--------|----------|---------|
| Micro (hover, toggle) | 100-150ms | Button hover color |
| Small (fade, slide) | 200-300ms | Dropdown open |
| Medium (expand, modal) | 300-500ms | Modal entrance |
| Large (page transition) | 400-700ms | Route change |

### Must-Have Micro-Interactions

| Interaction | Implementation |
|-------------|---------------|
| **Button press** | `transform: scale(0.97)` + quick `transition: 100ms` |
| **Card hover** | `translateY(-4px)` + `box-shadow` increase |
| **Focus ring** | `box-shadow: 0 0 0 3px var(--color-primary-200)` |
| **Skeleton loading** | `background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)` + `animation: shimmer` |
| **Toast enter** | `slideInRight` + `fadeIn` combined |
| **Smooth scroll** | `scroll-behavior: smooth` on `html` |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

> **Rule:** ALWAYS include reduced motion. This is not optional.

---

## Accessibility (a11y)

| Requirement | Implementation |
|-------------|---------------|
| **Semantic HTML** | `<button>`, `<nav>`, `<main>`, `<article>`, `<section>` |
| **Alt text** | Descriptive for content images, `alt=""` for decorative |
| **Keyboard nav** | All interactive elements focusable via Tab |
| **Focus visible** | Never `outline: none` without `focus-visible` alternative |
| **ARIA labels** | When native semantics aren't enough |
| **Skip links** | "Skip to main content" link as first focusable element |
| **Form labels** | Every `<input>` has associated `<label>` |
| **Error announce** | Use `aria-live="polite"` for dynamic error messages |

---

## Anti-Patterns

| ❌ DON'T | ✅ DO |
|----------|------|
| Use arbitrary spacing (17px, 23px) | Use design tokens from spacing scale |
| More than 2 font families | 1 sans + 1 mono max |
| Tiny click targets (< 44px) | Min 44x44px touch targets (WCAG) |
| Pure white (#fff) on pure black (#000) | Softer tones (#F8FAFC on #0F172A) |
| `outline: none` without alternative | `outline: none` + custom `focus-visible` ring |
| Animate layout properties | Animate `transform` + `opacity` only |
| Text over images without overlay | Dark overlay or text shadow for readability |
| Infinite carousel without pause | Auto-play with pause control + `prefers-reduced-motion` |

---

## Professional UI Rules

### Icons & Visual Elements

| Rule | ✅ DO | ❌ DON'T |
|------|-------|---------|
| **No emoji as icons** | Use SVG icon sets (Lucide, Heroicons, Phosphor) | Use 🎨 🚀 ⚙️ as UI icons |
| **Consistent icon sizing** | Fixed viewBox (24x24), uniform sizing | Mix random icon sizes |
| **Correct brand logos** | Official SVGs from Simple Icons / brand kits | Guess logo colors or shapes |
| **Stable hover states** | Color/opacity transitions | Scale transforms that shift layout |

### Interaction Rules

| Rule | Implementation |
|------|---------------|
| **cursor-pointer** | Add to ALL clickable/hoverable cards and elements |
| **Hover feedback** | Visual change: color, shadow, border, or opacity |
| **Smooth transitions** | 150-300ms, never instant, never > 500ms |
| **Disable on submit** | Prevent double-click with loading state |
| **Accessible click area** | Min 44x44px, use padding not just content size |

### Light/Dark Mode Contrast

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| **Body text** | `#0F172A` (slate-900) | `#F1F5F9` (slate-100) |
| **Secondary text** | `#475569` (slate-600) min | `#94A3B8` (slate-400) min |
| **Glass card bg** | `rgba(255,255,255,0.8)` min | `rgba(255,255,255,0.1)` OK |
| **Borders** | `#E2E8F0` (slate-200) | `#334155` (slate-700) |
| **Shadows** | `rgba(0,0,0,0.1)` visible | `rgba(0,0,0,0.3)` or none |

> 🔴 **Rule:** Always test both modes before delivery. A common bug: glass/transparent elements invisible in light mode.

---

## Style Selection Guide

Match design style to product type:

| Product Type | Recommended Styles | Font Mood |
|-------------|-------------------|-----------|
| **SaaS / Dashboard** | Flat, minimal, glassmorphism | Clean, geometric (Inter, Plus Jakarta) |
| **E-commerce** | Modern, card-heavy, image-first | Neutral, readable (DM Sans, Outfit) |
| **Portfolio / Agency** | Bold, experimental, brutalist | Display, characterful (Space Grotesk, Clash Display) |
| **Finance / Fintech** | Conservative, trustworthy, data-dense | Serif or neutral sans (IBM Plex, Source Sans) |
| **Health / Wellness** | Soft, organic, rounded | Friendly, warm (Nunito, Quicksand) |
| **Blog / Content** | Clean, readable, editorial | Serif + sans pair (Lora + Inter) |
| **Landing Page** | Hero-centric, CTA-focused, visual | Bold display + clean body |

### Font Pairing Recommendations

| Heading | Body | Mood |
|---------|------|------|
| **Space Grotesk** | Inter | Modern, tech |
| **Playfair Display** | Source Sans 3 | Elegant, editorial |
| **Plus Jakarta Sans** | DM Sans | Clean, friendly |
| **Clash Display** | Satoshi | Bold, startup |
| **Lora** | Inter | Classic, content |
| **Outfit** | Work Sans | Minimal, SaaS |

---

## Multi-Framework Examples

### Button Component

**Vanilla CSS:**
```css
.btn { padding: var(--space-3) var(--space-6); border-radius: var(--radius-md); font-weight: var(--font-semibold); cursor: pointer; transition: all var(--transition-fast); }
.btn:hover { transform: translateY(-1px); box-shadow: var(--shadow-md); }
.btn:active { transform: translateY(0); }
```

**Tailwind:**
```html
<button class="px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0">
```

**React + CSS Modules:**
```tsx
import styles from './Button.module.css';
export function Button({ children, variant = 'primary', ...props }) {
  return <button className={`${styles.btn} ${styles[variant]}`} {...props}>{children}</button>;
}
```

---

## Pre-Delivery Checklist

### Visual Quality
- [ ] No emojis used as icons (use SVG icon set)
- [ ] Consistent icon sizing across all pages
- [ ] Brand logos verified (correct colors and shapes)
- [ ] Hover states don't cause layout shift
- [ ] Consistent spacing (multiples of 4px/8px)

### Interaction
- [ ] All clickable elements have `cursor: pointer`
- [ ] Hover states provide clear visual feedback
- [ ] Transitions are 150-300ms (not instant, not slow)
- [ ] Focus states visible for keyboard navigation
- [ ] Buttons disabled during async operations

### Light/Dark Mode
- [ ] Body text contrast >= 4.5:1 in both modes
- [ ] Glass/transparent elements visible in light mode
- [ ] Borders visible in both modes
- [ ] Shadows appropriate per mode
- [ ] Tested both modes in browser

### Responsive
- [ ] Works at 375px (mobile), 768px (tablet), 1024px (desktop)
- [ ] No horizontal scroll on any breakpoint
- [ ] Touch targets >= 44x44px on mobile
- [ ] Text readable without zooming (>= 16px body)
- [ ] Images have width/height or aspect-ratio (no CLS)

### Accessibility
- [ ] All images have alt text
- [ ] Form inputs have `<label>` elements
- [ ] Color is not the only indicator (icons/text too)
- [ ] `prefers-reduced-motion` respected
- [ ] Tab order matches visual order

---

## See Also

- **css-architecture** -- Design tokens, responsive layouts, CSS Modules, animations
- **accessibility** -- WCAG deep reference, ARIA patterns, keyboard navigation
- **react-best-practices** -- Component patterns for implementing UI designs
- **performance-optimization** -- Image optimization, CLS, LCP for visual performance
