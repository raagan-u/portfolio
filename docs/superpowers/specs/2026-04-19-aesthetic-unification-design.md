# Design: Extend Hero Aesthetic to About & Projects + Dark Mode

**Date**: 2026-04-19
**Scope**: Restyle About and Projects pages to match the hero section's retro/terminal aesthetic. Add a site-wide dark mode toggle.

## Problem

The hero section (Home.vue) has a distinctive retro/terminal aesthetic:
- DotGothic16 font for display text
- Courier New monospace body
- Lowercase typography
- Black on white, no accent colors
- Underscore cursor (`_`) motif from the typing animation
- Sharp edges, no rounded corners or soft shadows

The About and Projects pages were styled separately with a generic "modern web" look:
- Apple system sans-serif
- Rounded 12px corners
- Soft drop shadows
- Title-case section headers
- Blue (`#007bff`) accent on contract links
- Pill-shaped tech tags with light gray background

Result: the site feels half-finished — the hero promises a strong aesthetic the rest of the site doesn't honor.

## Goals

1. Make About and Projects feel like the same site as the hero.
2. Preserve scannability — this is a portfolio, recruiters need to read it fast.
3. Keep the existing content and information architecture untouched.
4. Add a dark mode that suits the terminal aesthetic.

## Non-goals

- No copy or content changes.
- No layout restructure beyond styling (existing grid columns preserved).
- No changes to the hero section itself, except wiring the dark mode toggle.
- No global state library (Pinia, etc.) — composables only.

## Design

### Typography & color tokens

All section headings switch to `DotGothic16`, lowercase. Body text inherits `Courier New` from `body` (already in `src/style.css`).

Color palette is reduced to two tokens (`--fg`, `--bg`) plus `--muted` and `--border`. The existing `#007bff` link blue is dropped; links indicate interactivity via underline-on-hover. CSS custom properties are defined in `src/style.css`:

```css
:root {
  --bg: #ffffff;
  --fg: #000000;
  --muted: #666666;
  --border: #000000;
  --shadow: rgba(0, 0, 0, 1);
}
html.dark {
  --bg: #0a0a0a;
  --fg: #f5f5f5;
  --muted: #999999;
  --border: #f5f5f5;
  --shadow: rgba(245, 245, 245, 1);
}
```

Both Tailwind utilities (via `bg-[var(--bg)]` arbitrary value syntax, supported in Tailwind v4) and scoped component CSS reference these variables. No hard-coded `#000`/`#fff` remain in styled components.

### Type-on-scroll composable

New file `src/composables/useTypeOnScroll.js` exports a function that takes `(targetRef, fullText, opts)` and:

- Initializes the displayed text to empty.
- Creates an `IntersectionObserver` on `targetRef` with threshold 0.3.
- On first intersection, types `fullText` character by character at ~80ms/char.
- Disconnects the observer after firing — fires once per session per element, not on every scroll back.
- Returns a reactive `displayed` ref and a `done` ref the consumer can use to render the persistent blinking `_` cursor after typing completes.

Used by the page-level headings on About (`_about`) and Projects (`_projects`). Per-section subheaders (`featured projects`, `all projects`, `contributions`) get the static `_` cursor only — three more typing animations would be visual noise.

### Theme composable

New file `src/composables/useTheme.js`:

- Module-level `isDark` ref, shared across imports (singleton).
- `toggle()` flips `isDark`, writes to `localStorage.theme` (`'dark'` or `'light'`), and toggles `html.dark` class.
- Initialization: reads `localStorage.theme` first; if absent, checks `window.matchMedia('(prefers-color-scheme: dark)')`; otherwise defaults to light.
- Initialization runs once on first import (module side effect).

### Anti-flash script

Inline `<script>` in `index.html` `<head>` runs before any CSS or Vue mounts:

```html
<script>
  (function () {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  })();
</script>
```

Prevents the white-flash on first paint when a returning dark-mode user loads the page.

### Toggle UI

Replaces the existing commented placeholder at `Home.vue:223-225`. Reads `dark mode.` when in light, `light mode.` when in dark. Same DotGothic16 font as the rest of the hero, hover-underline cue for interactivity. Click invokes `useTheme().toggle()`.

### About page restyle

Restructured for the "hybrid" treatment:

- **Page heading** (`_about`): DotGothic16, lowercase, type-on-scroll animation, persistent blinking `_` cursor after typing. Replaces the current `.about-title` + `.title-underline` divider.
- **Profile name** (`Raagan U`): DotGothic16, no other change.
- **Bio**: flat, no card. Sits directly under the name.
- **Social icons**: keep image links and grid, drop any card wrappers, retain hover opacity.
- **Skills row** (Backend / Blockchain / Adaptive Learning): flat blocks separated by a horizontal monospace divider rendered as a `<hr>` with `border-top: 1px dashed var(--border)` (visually evokes terminal output without using a literal `─────` text glyph that fights variable widths).
- **Experience row** (`I've had experiences with` / `Currently getting better at`): same flat-block treatment with the same divider.
- All `border-radius` and `box-shadow` declarations removed from this file.

### Projects page restyle

- **Page heading** (`_projects`): DotGothic16, lowercase, type-on-scroll, persistent `_` cursor.
- **Section subheaders** (`featured projects`, `all projects`, `contributions`): DotGothic16, lowercase, with a static (non-animated) `_` cursor.
- **Project cards**: kept as visual containers. Restyled to:
  - `border: 1px solid var(--border)` (2px for `.featured`).
  - No `border-radius`.
  - No default `box-shadow`.
  - Hover state: `transform: translate(-2px, -2px)` + `box-shadow: 4px 4px 0 var(--shadow)` (hard-offset 8-bit shadow).
- **Tech stack tags**: rendered as `[rust]` `[bitcoin]` in monospace. No background, no border, just text. Implemented in template by wrapping the tech name with literal `[` and `]` characters.
- **Contract addresses**: monospace, `color: var(--fg)`, underline on hover. Drop the blue text and the gray pill background.
- **GitHub link**: `> github` styled as a terminal command — no button background, no border, underline on hover. Replaces the black-pill button.

### Color references in scoped CSS

All hard-coded color references in `About.vue` and `Projects.vue` are replaced with the CSS variables introduced above. Specifically:

- `color: #000` → `color: var(--fg)`
- `color: #333` → `color: var(--fg)` (these were used for subdued body text where `#666` would have been more correct anyway — unifying to `--fg` keeps it readable in both themes)
- `color: #666` and `color: #999` → `color: var(--muted)`
- `background: #fff` → `background: var(--bg)` (or removed where the inherited body background suffices)
- `border: ... #f0f0f0` → `border: ... var(--border)` with reduced opacity not needed; if the original visual intent was a soft divider, we use the dashed `--border` style instead.

## Files

**New**:
- `src/composables/useTypeOnScroll.js`
- `src/composables/useTheme.js`

**Modified**:
- `src/style.css` — CSS variables on `:root` and `html.dark`.
- `index.html` — anti-flash inline script in `<head>`.
- `src/pages/Home.vue` — wire the dark mode toggle into the existing placeholder slot.
- `src/pages/About.vue` — template + scoped styles.
- `src/pages/Projects.vue` — template + scoped styles.

**Untouched**:
- `src/pages/Home.vue` hero content (typing animation, layout, cover screen) — only the toggle slot changes.
- `src/components/HomeContent.vue` (unused).
- All asset files.

## Testing

This is a styling refactor with one piece of new logic (theme persistence + scroll observer). Verification is primarily visual:

1. **Manual QA in browser** (light + dark, desktop + narrow viewport):
   - Click cover screen → typing animation runs as before.
   - Scroll to About → `_about` types out once, cursor persists. Scroll up and back down → does not re-trigger.
   - Scroll to Projects → `_projects` types out once.
   - Toggle dark mode → all sections invert correctly, no leftover white/black hard-coded zones.
   - Reload after toggling → starts in the correct theme, no white flash.
   - Reload in a fresh browser with system dark mode → starts dark.
   - Hover project card → 8-bit offset shadow appears.
   - Click contract link → opens explorer in new tab.
   - Mobile breakpoint → existing single-column behavior preserved.

2. **No automated tests added.** The project has no test infrastructure currently; setting it up is out of scope for a styling refactor.

## Open questions

None — all design decisions resolved during brainstorming.

## Out of scope

- Sticky navigation that follows scroll past the hero.
- Section-level type-on-scroll for subheaders within Projects.
- Refactoring the existing typing animation in `Home.vue` to use the new composable (it's complex multi-step state — sharing isn't worth the abstraction cost).
- Replacing the cover screen.
- Adding test infrastructure.
