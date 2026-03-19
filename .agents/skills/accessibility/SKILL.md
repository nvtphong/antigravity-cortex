---
name: accessibility
description: WCAG compliance, ARIA patterns, keyboard navigation, screen reader support, and a11y testing
---

# Accessibility (a11y)

Build inclusive interfaces. WCAG 2.1 AA compliance as the minimum standard.

## Quick Reference -- POUR Principles

| Principle | Rule | Example |
|-----------|------|---------|
| **Perceivable** | All content accessible to all senses | Alt text, captions, contrast |
| **Operable** | All functions work with keyboard | Tab navigation, focus management |
| **Understandable** | Content and UI are predictable | Clear labels, error messages |
| **Robust** | Works across assistive technologies | Semantic HTML, ARIA |

---

## Semantic HTML (First Line of Defense)

```html
<!-- ❌ Div soup -- screen reader sees nothing -->
<div class="header">
  <div class="nav">
    <div class="link" onclick="goHome()">Home</div>
  </div>
</div>

<!-- ✅ Semantic -- screen reader understands structure -->
<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
  </nav>
</header>
```

| Instead of | Use |
|-----------|-----|
| `<div onclick>` | `<button>` |
| `<div class="header">` | `<header>` |
| `<div class="nav">` | `<nav>` |
| `<div class="main">` | `<main>` |
| `<div class="footer">` | `<footer>` |
| `<div class="list">` | `<ul>` / `<ol>` |
| `<span class="heading">` | `<h1>` - `<h6>` |

---

## ARIA -- When HTML Isn't Enough

### Key Rules

> 🔴 **Rule 1:** Don't use ARIA if native HTML works.
> `<button>` is always better than `<div role="button">`

```html
<!-- Common ARIA patterns -->
<button aria-label="Close dialog" aria-expanded="false">✕</button>

<div role="alert" aria-live="polite">Form submitted successfully</div>

<nav aria-label="Main navigation">...</nav>
<nav aria-label="Footer navigation">...</nav>

<input aria-describedby="password-hint" type="password" />
<p id="password-hint">Must be at least 8 characters</p>
```

### ARIA Roles Quick Reference

| Role | When | Element |
|------|------|---------|
| `role="alert"` | Important message (errors, success) | Status messages |
| `role="dialog"` | Modal/popup | Modals, dialogs |
| `role="tablist"` | Tab interface | Tab containers |
| `role="tab"` | Individual tab | Tab buttons |
| `role="tabpanel"` | Tab content | Tab content areas |
| `role="search"` | Search region | Search forms |
| `role="status"` | Live region (polite) | Loading states |

---

## Color Contrast

| Size | WCAG AA | WCAG AAA |
|------|---------|----------|
| Normal text (< 18px) | 4.5:1 | 7:1 |
| Large text (>= 18px bold / 24px) | 3:1 | 4.5:1 |
| UI components & icons | 3:1 | -- |

**Tools:**
- Chrome DevTools -> Inspect -> Color contrast ratio
- https://webaim.org/resources/contrastchecker/

---

## Keyboard Navigation

### Every Interactive Element Must Be

| Requirement | How |
|-------------|-----|
| **Focusable** | Use native elements or `tabindex="0"` |
| **Visible focus** | Never `outline: none` without replacement |
| **Operable** | Enter/Space activates, Escape closes |
| **Logical order** | Tab order follows visual order |

### Focus Management

```tsx
// Modal: trap focus inside, return focus on close
function Modal({ isOpen, onClose, children }) {
  const closeRef = useRef(null);
  const previousFocus = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement;
      closeRef.current?.focus();
    } else {
      previousFocus.current?.focus();  // Return focus
    }
  }, [isOpen]);

  return isOpen ? (
    <div role="dialog" aria-modal="true">
      <button ref={closeRef} onClick={onClose}>Close</button>
      {children}
    </div>
  ) : null;
}
```

---

## Forms

```html
<!-- ✅ Every input needs a label -->
<label for="email">Email address</label>
<input id="email" type="email" required aria-describedby="email-error" />
<p id="email-error" role="alert">Please enter a valid email</p>

<!-- ✅ Group related fields -->
<fieldset>
  <legend>Shipping Address</legend>
  <label for="street">Street</label>
  <input id="street" />
</fieldset>
```

| Rule | Why |
|------|-----|
| Label every input | Screen readers announce the purpose |
| Use `for` + `id` linking | Clicking label focuses input |
| Show errors inline | Don't rely on color alone |
| Use `aria-describedby` | Links help text to input |
| Mark required fields | `required` + visual indicator |

---

## Testing

```bash
# Automated
npx @axe-core/cli https://localhost:3000
npx lighthouse --accessibility https://localhost:3000

# Browser
# Chrome DevTools -> Accessibility tab
# Chrome DevTools -> Lighthouse -> Accessibility
```

### Manual Testing Checklist
- [ ] Navigate entire page with keyboard only (Tab, Enter, Escape)
- [ ] Verify all focus indicators are visible
- [ ] Check with screen reader (VoiceOver / NVDA)
- [ ] Verify color contrast passes AA
- [ ] Check page with 200% zoom
- [ ] Test with images disabled (alt text visible?)

## See Also

- [ui-ux-design](../ui-ux-design/SKILL.md) � Design systems, color, typography
- [css-architecture](../css-architecture/SKILL.md) � Responsive layouts, CSS patterns
- [react-best-practices](../react-best-practices/SKILL.md) � Component patterns for accessible UIs
