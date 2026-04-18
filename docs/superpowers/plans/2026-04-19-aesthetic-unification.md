# Aesthetic Unification + Dark Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle About and Projects pages to match the hero's retro/terminal aesthetic, and add a site-wide dark mode toggle with persistence.

**Architecture:** CSS custom properties as the single source of truth for theming, consumed by both Tailwind (via arbitrary value syntax `bg-[var(--bg)]`) and scoped component CSS. Two new Vue composables: `useTheme` (singleton state + localStorage persistence) and `useTypeOnScroll` (IntersectionObserver-based one-shot typewriter for section headings). Anti-flash inline script in `index.html` applies the stored theme before paint.

**Tech Stack:** Vue 3 Composition API, Tailwind v4 (already installed), DotGothic16 (already imported in style.css), no new dependencies.

**Spec reference:** `docs/superpowers/specs/2026-04-19-aesthetic-unification-design.md`

**Note on testing:** This is a styling + small-logic refactor with no test infrastructure in the project. Verification is visual QA in the browser; each task ends with explicit manual verification steps before commit.

---

## File Map

**New:**
- `src/composables/useTheme.js` — singleton theme state, persistence, html class toggle
- `src/composables/useTypeOnScroll.js` — IntersectionObserver-driven one-shot typewriter

**Modified:**
- `src/style.css` — CSS variables on `:root` and `html.dark`
- `index.html` — anti-flash inline script in `<head>`
- `src/pages/Home.vue` — wire dark mode toggle into existing placeholder slot; swap hard-coded colors for variables
- `src/pages/About.vue` — restyle template + scoped CSS, add type-on-scroll heading
- `src/pages/Projects.vue` — restyle template + scoped CSS, add type-on-scroll heading

**Untouched:** `src/components/HomeContent.vue` (unused), all assets, router, App.vue, main.js, vite.config.js.

---

## Task 1: CSS Variables Foundation

Adds the theme tokens. Dormant until consumers reference them — safe to land first.

**Files:**
- Modify: `src/style.css`

- [ ] **Step 1: Add CSS variables to `src/style.css`**

Replace the entire contents of `src/style.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
@import "tailwindcss";

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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Courier New', monospace;
  overflow-x: hidden;
  background-color: var(--bg);
  color: var(--fg);
  scroll-behavior: smooth;
}

#app {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.dotgothic16-regular {
  font-family: "DotGothic16", sans-serif;
  font-weight: 400;
  font-style: normal;
}
```

Notes on this change vs. the original:
- `body` `background-color` flipped from hard-coded `#E5E5E5` to `var(--bg)` so the gutter follows the theme.
- `body` gains `color: var(--fg)` so any unstyled text inherits the theme color.
- Tailwind import order preserved (must be at top so utilities can override variable usage if needed).

- [ ] **Step 2: Run dev server and verify nothing visually broke**

Run: `npm run dev`
Open the dev URL printed in the terminal. Click the cover screen to dismiss it.

Expected: site looks identical to before. The only visible change is the body background, which previously was `#E5E5E5` (light gray) and is now `#ffffff` (pure white) — but since every section already declares its own `bg-white`, you should see no perceptible difference.

If the page is broken (blank, console errors), stop and debug before committing.

- [ ] **Step 3: Commit**

```bash
git add src/style.css
git commit -m "style: add CSS variables for theming"
```

---

## Task 2: Anti-Flash Theme Bootstrap

Inline script in `<head>` reads stored theme and applies the `dark` class to `<html>` before any CSS evaluates. Prevents the white-flash on reload for dark-mode users. Dormant until `localStorage.theme` exists.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace `index.html` with anti-flash version**

Replace the entire contents of `index.html` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Raagan U</title>
    <script>
      (function () {
        try {
          var stored = localStorage.getItem('theme');
          var dark = stored
            ? stored === 'dark'
            : window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (dark) document.documentElement.classList.add('dark');
        } catch (e) {}
      })();
    </script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

Notes:
- Wrapped in `try/catch` because `localStorage` access throws in some privacy-mode contexts.
- IIFE so the variables don't leak to `window`.
- Runs synchronously in `<head>` before any CSS or app code, so the `.dark` class is on `<html>` by the time CSS is parsed.

- [ ] **Step 2: Verify in dev server**

Run: `npm run dev` (if not already running).
Open DevTools → Application → Local Storage → set `theme = dark`.
Reload the page.

Expected: `<html>` has class `dark` (visible in DevTools Elements panel). No visual change yet because nothing consumes the variables for the dark theme.

Clear `localStorage.theme` before continuing.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: anti-flash theme bootstrap in index.html"
```

---

## Task 3: useTheme Composable

Singleton-style composable: module-level reactive state shared across imports, persisted to localStorage, and synced to the `<html>` class.

**Files:**
- Create: `src/composables/useTheme.js`

- [ ] **Step 1: Create the directory and file**

Run: `mkdir -p src/composables`

Create `src/composables/useTheme.js` with:

```javascript
import { ref } from 'vue';

const STORAGE_KEY = 'theme';

function readInitial() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored === 'dark';
  } catch (e) {}
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

const isDark = ref(readInitial());

function applyToDocument(dark) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', dark);
}

applyToDocument(isDark.value);

function toggle() {
  isDark.value = !isDark.value;
  applyToDocument(isDark.value);
  try {
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light');
  } catch (e) {}
}

export function useTheme() {
  return { isDark, toggle };
}
```

Notes:
- `isDark` declared at module scope, not inside `useTheme()`, so every caller shares the same ref.
- `applyToDocument` runs once on module load to keep the class in sync if (somehow) the inline script in `index.html` and the composable's reading of localStorage diverge.
- All `localStorage` reads/writes wrapped in `try/catch` for privacy-mode safety.

- [ ] **Step 2: Quick smoke test in browser console**

Run: `npm run dev` (if not already running).
Open the site, dismiss the cover screen, open DevTools console, and run:

```javascript
// In the browser console — verify the module is bundled in once Home.vue uses it.
// At this point nothing imports useTheme yet, so this verification happens in Task 4.
```

Skip the in-browser test — there's no consumer yet. Just verify the file is syntactically valid by checking the Vite dev server didn't print errors after saving.

- [ ] **Step 3: Commit**

```bash
git add src/composables/useTheme.js
git commit -m "feat: add useTheme composable with persistence"
```

---

## Task 4: Wire Dark Mode Toggle Into Hero

Replace the commented placeholder in `Home.vue` with a working toggle. Also flip the hero's hard-coded `bg-white text-black` Tailwind classes to CSS variables so the hero responds to dark mode.

**Files:**
- Modify: `src/pages/Home.vue`

- [ ] **Step 1: Add the import and use the composable**

In `src/pages/Home.vue`, find the existing imports at the top of `<script setup>` (around line 6):

```javascript
import vineBoomFile from '../assets/vine_boom.mp3';
```

Add immediately below it:

```javascript
import { useTheme } from '../composables/useTheme';

const { isDark, toggle: toggleTheme } = useTheme();
```

- [ ] **Step 2: Replace the commented-out toggle with a working one**

In `src/pages/Home.vue`, find this block (around lines 222-226):

```vue
      <!-- Right Side -->
      <div class="absolute right-8 bottom-8">
        <!-- <div class="text-lg cursor-pointer hover:underline">
          dark mode.
        </div> -->
      </div>
```

Replace it with:

```vue
      <!-- Right Side -->
      <div class="absolute right-8 bottom-8">
        <div
          class="text-lg cursor-pointer hover:underline dotgothic16-regular select-none"
          @click="toggleTheme"
        >
          {{ isDark ? 'light mode.' : 'dark mode.' }}
        </div>
      </div>
```

- [ ] **Step 3: Make the hero respond to dark mode**

In `src/pages/Home.vue`, find the root container (around line 145):

```vue
  <div class="min-h-screen bg-white text-black relative w-full">
```

Change it to:

```vue
  <div class="min-h-screen bg-[var(--bg)] text-[var(--fg)] relative w-full">
```

The cover screen at line 147-156 stays as-is (`bg-black ... text-white`) — it's a pre-interaction screen and should remain inverted.

The Garden Finance tooltip (around line 169) currently uses `bg-[#e5e5e5] ... text-gray-800`. Find this exact string:

```vue
<div class="absolute top-0 left-0 transform -translate-x-full bg-[#e5e5e5] border border-gray-300 shadow-lg rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1/2 translate-y-2 whitespace-nowrap text-sm font-medium text-gray-800">
```

Replace it with:

```vue
<div class="absolute top-0 left-0 transform -translate-x-full bg-[var(--bg)] border border-[var(--border)] shadow-lg rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1/2 translate-y-2 whitespace-nowrap text-sm font-medium text-[var(--fg)]">
```

- [ ] **Step 4: Visual QA in browser**

Run: `npm run dev` (if not already running). Open the site.

Verify each of the following in order:
1. Click the cover screen → typing animation runs as before.
2. Look at the bottom-right corner → see the text `dark mode.` in DotGothic16.
3. Click `dark mode.` → background flips to near-black, text flips to near-white, the toggle now reads `light mode.`.
4. Click `light mode.` → flips back to white/black.
5. Hover over the Garden Finance SVG → tooltip appears in the current theme's colors (white-on-dark in dark mode, dark-on-light in light mode).
6. Reload the page in dark mode → page loads in dark mode with no white flash.
7. Reload again with localStorage cleared → page loads in your system's preferred theme.
8. Reopen DevTools → Application → Local Storage → confirm `theme` key is `dark` or `light` after toggling.

If any of these fails, debug before committing. The most likely failure mode is the Tailwind v4 arbitrary-value syntax `bg-[var(--bg)]` not being picked up — if so, check the Tailwind v4 docs for the correct syntax in this project's setup.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.vue
git commit -m "feat: wire dark mode toggle into hero"
```

---

## Task 5: useTypeOnScroll Composable

Reusable composable that types out a string when the bound element scrolls into view. One-shot per element (disconnects observer after firing).

**Files:**
- Create: `src/composables/useTypeOnScroll.js`

- [ ] **Step 1: Create the file**

Create `src/composables/useTypeOnScroll.js` with:

```javascript
import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useTypeOnScroll(targetRef, fullText, opts = {}) {
  const speed = opts.speed ?? 80;
  const threshold = opts.threshold ?? 0.3;

  const displayed = ref('');
  const done = ref(false);

  let observer = null;
  let typingTimer = null;
  let started = false;

  function typeNext(index) {
    if (index > fullText.length) {
      done.value = true;
      return;
    }
    displayed.value = fullText.substring(0, index);
    typingTimer = setTimeout(() => typeNext(index + 1), speed);
  }

  function startTyping() {
    if (started) return;
    started = true;
    typeNext(0);
  }

  onMounted(() => {
    const el = targetRef.value;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      startTyping();
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            startTyping();
            observer.disconnect();
            observer = null;
            break;
          }
        }
      },
      { threshold }
    );
    observer.observe(el);
  });

  onBeforeUnmount(() => {
    if (observer) observer.disconnect();
    if (typingTimer) clearTimeout(typingTimer);
  });

  return { displayed, done };
}
```

Notes:
- `started` flag prevents double-firing if `onMounted` re-runs in HMR or if observer fires twice.
- Falls back to immediate typing if `IntersectionObserver` isn't available (SSR or very old browsers).
- `displayed` is the typed text so far; `done` flips to `true` once typing completes — consumers use `done` to render the persistent blinking cursor.
- `onBeforeUnmount` cleans up both the observer and the in-flight `setTimeout` to avoid leaks.

- [ ] **Step 2: Verify it parses**

Save the file. Check the Vite dev server output for syntax errors. No browser test yet — verified end-to-end in Task 6.

- [ ] **Step 3: Commit**

```bash
git add src/composables/useTypeOnScroll.js
git commit -m "feat: add useTypeOnScroll composable"
```

---

## Task 6: Restyle About.vue

Replace the entire file with a version that uses the type-on-scroll heading, drops cards/shadows/Apple-sans-serif, and references CSS variables.

**Files:**
- Modify: `src/pages/About.vue`

- [ ] **Step 1: Replace `src/pages/About.vue` entirely**

Replace the entire contents of `src/pages/About.vue` with:

```vue
<script setup>
import { ref } from 'vue';
import { useTypeOnScroll } from '../composables/useTypeOnScroll';

const headingRef = ref(null);
const { displayed, done } = useTypeOnScroll(headingRef, '_about', { speed: 80 });
</script>

<template>
  <div class="about-container">
    <div class="header" ref="headingRef">
      <h1 class="about-title dotgothic16-regular">
        {{ displayed }}<span v-if="done" class="cursor">_</span>
      </h1>
    </div>

    <div class="profile-section">
      <h2 class="name dotgothic16-regular">Raagan U</h2>
      <p class="bio">
        The name's Raagan. You can also call me a potential candidate for your next project :)<br />
        I code, and I solve problems through code. You can also count on me for DB optimizations, devops.
      </p>
      <div class="social-links">
        <a href="https://www.instagram.com/_raagan" class="social-link" target="_blank">
          <img src="../assets/social/instagram.png" alt="Instagram" class="social-icon" />
        </a>
        <a href="https://github.com/raagan-u" class="social-link" target="_blank">
          <img src="../assets/social/github.png" alt="Github" class="social-icon" />
        </a>
        <a href="mailto:raaganuthayaargn@gmail.com" class="social-link">
          <img src="../assets/social/gmail.png" alt="Email" class="social-icon" />
        </a>
        <a href="https://in.linkedin.com/in/raagan-u-01a170203" class="social-link" target="_blank">
          <img src="../assets/social/linkedin.png" alt="Linkedin" class="social-icon" />
        </a>
      </div>
    </div>

    <hr class="block-divider" />

    <div class="flat-row">
      <div class="flat-block">
        <h3 class="flat-title dotgothic16-regular">backend</h3>
        <p class="flat-description">Backend development with Rust, Go, etc.</p>
      </div>
      <div class="flat-block">
        <h3 class="flat-title dotgothic16-regular">blockchain</h3>
        <p class="flat-description">Solidity, Bitcoin scripts, Lightning Network.</p>
      </div>
      <div class="flat-block">
        <h3 class="flat-title dotgothic16-regular">adaptive learning</h3>
        <p class="flat-description">
          Give me a topic and a deadline — I'll learn it fast, then I'll get better at it every day.
        </p>
      </div>
    </div>

    <hr class="block-divider" />

    <div class="flat-row">
      <div class="flat-block">
        <h3 class="flat-title dotgothic16-regular">i've had experiences with</h3>
        <div class="tech-grid">
          <img src="../assets/tech_stack/react.png" alt="React" class="tech-logo" />
          <img src="../assets/tech_stack/mongo.png" alt="MongoDB" class="tech-logo" />
          <img src="../assets/tech_stack/python.ico" alt="Python" class="tech-logo" />
          <img src="../assets/tech_stack/ts.png" alt="TypeScript" class="tech-logo" />
          <img src="../assets/tech_stack/vue.png" alt="Vue" class="tech-logo" />
        </div>
      </div>
      <div class="flat-block">
        <h3 class="flat-title dotgothic16-regular">currently getting better at</h3>
        <div class="tech-grid">
          <img src="../assets/current/rust.png" alt="Rust" class="tech-logo" />
          <img src="../assets/current/go.svg" alt="Go" class="tech-logo" />
          <img src="../assets/current/solidity.ico" alt="Solidity" class="tech-logo" />
          <img src="../assets/current/icons8-bitcoin-500.png" alt="Bitcoin" class="tech-logo" />
          <img src="../assets/current/postgres.png" alt="PostgreSQL" class="tech-logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Courier New', monospace;
  color: var(--fg);
  background: var(--bg);
}

.header {
  margin-bottom: 3rem;
}

.about-title {
  font-size: 2.5rem;
  font-weight: 400;
  margin: 0;
  color: var(--fg);
}

.cursor {
  animation: blink 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.profile-section {
  margin-bottom: 3rem;
}

.name {
  font-size: 2.5rem;
  font-weight: 400;
  margin: 0 0 1rem 0;
  color: var(--fg);
}

.bio {
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  color: var(--fg);
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-link {
  text-decoration: none;
  color: var(--fg);
  height: 40px;
  width: 40px;
  transition: opacity 0.2s;
}

.social-link:hover {
  opacity: 0.6;
}

.social-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.block-divider {
  border: 0;
  border-top: 1px dashed var(--border);
  margin: 3rem 0;
}

.flat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
}

.flat-block {
  padding: 0;
}

.flat-title {
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0 0 0.8rem 0;
  color: var(--fg);
}

.flat-description {
  font-size: 0.95rem;
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.tech-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.tech-logo:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .social-links {
    justify-content: flex-start;
  }
  .flat-row {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
```

Key changes from the original:
- Imports and uses `useTypeOnScroll` for the page heading.
- Heading switched from static `<h1>about me</h1>` + `<div class="title-underline">` to typed `_about` with persistent blinking `_` cursor.
- All `font-family` references switched from Apple system stack to `'Courier New', monospace` (body) with `dotgothic16-regular` class on headings.
- All `color: #000` / `#333` / `#666` / `#999` replaced with `var(--fg)` or `var(--muted)`.
- Removed the unused `.profile-image`, `.pixel-portrait`, `.pixel-art`, `.head`, `.eyes`, `.beard`, `.mustache` rule blocks (legacy from a removed pixel-portrait feature).
- Removed `.skill-card` and `.experience-card` cards entirely; replaced with `.flat-block` (no border, no shadow, no padding wrapper).
- Added `<hr class="block-divider">` between sections — dashed top-border in the theme's foreground color.
- Section titles lowercased to match the aesthetic.
- Added `target="_blank"` to external social links (was missing in the original).

- [ ] **Step 2: Visual QA**

Run `npm run dev` if not already running. Open the site, dismiss the cover screen, scroll down to the About section.

Verify in order:
1. As the About section enters the viewport, the heading types out `_about` character by character.
2. Once typing completes, a blinking `_` cursor stays visible after the text.
3. Scroll up past the section and back down → the heading does NOT re-type (stays as `_about_`).
4. The name `Raagan U` renders in DotGothic16.
5. The bio renders in monospace (Courier New).
6. The four social icons render in a row, no card backgrounds.
7. Three "skills" blocks (`backend`, `blockchain`, `adaptive learning`) render flat with monospace descriptions.
8. Two "experience" blocks render flat with their tech logos in a grid.
9. Dashed dividers separate the profile from skills, and skills from experience.
10. Toggle dark mode → all text and dividers invert correctly. No leftover white text on white background or vice versa.
11. Resize to mobile width (~375px) → blocks stack into a single column.

If any check fails, debug before committing.

- [ ] **Step 3: Commit**

```bash
git add src/pages/About.vue
git commit -m "style: restyle About to match hero aesthetic + type-on-scroll"
```

---

## Task 7: Restyle Projects.vue

Replace the entire file. Project cards are kept as visual containers but restyled to sharp-bordered with hard-offset hover shadow. Tech tags render as `[bracketed]` monospace text. GitHub link styled as terminal command.

**Files:**
- Modify: `src/pages/Projects.vue`

- [ ] **Step 1: Replace `src/pages/Projects.vue` entirely**

Replace the entire contents of `src/pages/Projects.vue` with:

```vue
<script setup>
import { ref } from 'vue';
import { useTypeOnScroll } from '../composables/useTypeOnScroll';

const headingRef = ref(null);
const { displayed, done } = useTypeOnScroll(headingRef, '_projects', { speed: 80 });

const projects = [
  {
    id: 1,
    title: "Particle-PartiSync",
    description: "Particle - an ERC20 with blacklisting and whitelisting, PartiSync - a subscription smart contract",
    tech: ["Solidity"],
    github: "https://github.com/raagan-u/particle-partisync",
    featured: true,
    contracts: [
      {
        name: "Particle Token",
        address: "0x733E0CF1fFcBdB93f456e1317Ec8306F8acea404",
        network: "Arbitrum Sepolia",
        explorer: "https://sepolia.arbiscan.io/address/"
      },
      {
        name: "PartiSync",
        address: "0x4fe06c9d281F66a2D9849d60ACa9ef4c506B4d7A",
        network: "Arbitrum Sepolia",
        explorer: "https://sepolia.arbiscan.io/address/"
      }
    ]
  },
  {
    id: 2,
    title: "Garden-TUI",
    description: "A TUI for the Garden Finance API.",
    tech: ["Rust", "Bitcoin", "Ratatui", "Alloy"],
    github: "https://github.com/raagan-u/garden-tui",
    featured: true
  },
  {
    id: 3,
    title: "Wallet-rs",
    description: "A blockchain wallet in rust.",
    tech: ["Rust", "Bitcoin", "Alloy"],
    github: "https://github.com/raagan-u/wallet-rs",
    featured: false
  }
];

const contributions = [
  {
    id: 1,
    title: "Merry",
    description: "multi-blockchain testing environment",
    tech: ["Docker", "Go"],
    github: "https://github.com/raagan-u/merry",
    featured: false
  }
];
</script>

<template>
  <div class="projects-container">
    <div class="header" ref="headingRef">
      <h1 class="projects-title dotgothic16-regular">
        {{ displayed }}<span v-if="done" class="cursor">_</span>
      </h1>
    </div>

    <div class="section">
      <h2 class="section-title dotgothic16-regular">_featured projects</h2>
      <div class="featured-grid">
        <div
          v-for="project in projects.filter(p => p.featured)"
          :key="project.id"
          class="project-card featured"
        >
          <div class="project-content">
            <h3 class="project-title dotgothic16-regular">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="tech-stack">
              <span v-for="tech in project.tech" :key="tech" class="tech-tag">
                [{{ tech.toLowerCase() }}]
              </span>
            </div>
            <div class="project-links">
              <a :href="project.github" class="project-link" target="_blank">
                &gt; github
              </a>
            </div>

            <div v-if="project.contracts" class="contract-addresses">
              <h4 class="contract-title">deployed contracts:</h4>
              <div class="contract-list">
                <div
                  v-for="contract in project.contracts"
                  :key="contract.name"
                  class="contract-item"
                >
                  <span class="contract-name">{{ contract.name }}:</span>
                  <a
                    :href="`${contract.explorer}${contract.address}`"
                    class="contract-link"
                    target="_blank"
                  >
                    {{ contract.address }}
                  </a>
                  <span class="contract-network">({{ contract.network }})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title dotgothic16-regular">_all projects</h2>
      <div class="projects-grid">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <div class="project-content">
            <h3 class="project-title dotgothic16-regular">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="tech-stack">
              <span v-for="tech in project.tech" :key="tech" class="tech-tag">
                [{{ tech.toLowerCase() }}]
              </span>
            </div>
            <div class="project-links">
              <a :href="project.github" class="project-link" target="_blank">
                &gt; github
              </a>
            </div>

            <div v-if="project.contracts" class="contract-addresses">
              <h4 class="contract-title">deployed contracts:</h4>
              <div class="contract-list">
                <div
                  v-for="contract in project.contracts"
                  :key="contract.name"
                  class="contract-item"
                >
                  <span class="contract-name">{{ contract.name }}:</span>
                  <a
                    :href="`${contract.explorer}${contract.address}`"
                    class="contract-link"
                    target="_blank"
                  >
                    {{ contract.address }}
                  </a>
                  <span class="contract-network">({{ contract.network }})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title dotgothic16-regular">_contributions</h2>
      <div class="projects-grid">
        <div
          v-for="contribution in contributions"
          :key="contribution.id"
          class="project-card"
        >
          <div class="project-content">
            <h3 class="project-title dotgothic16-regular">{{ contribution.title }}</h3>
            <p class="project-description">{{ contribution.description }}</p>
            <div class="tech-stack">
              <span v-for="tech in contribution.tech" :key="tech" class="tech-tag">
                [{{ tech.toLowerCase() }}]
              </span>
            </div>
            <div class="project-links">
              <a :href="contribution.github" class="project-link" target="_blank">
                &gt; github
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Courier New', monospace;
  color: var(--fg);
  background: var(--bg);
}

.header {
  margin-bottom: 3rem;
}

.projects-title {
  font-size: 2.5rem;
  font-weight: 400;
  margin: 0;
  color: var(--fg);
}

.cursor {
  animation: blink 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 0 2rem 0;
  color: var(--fg);
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--bg);
  border: 1px solid var(--border);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.project-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--shadow);
}

.project-card.featured {
  border-width: 2px;
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0 0 0.8rem 0;
  color: var(--fg);
}

.project-description {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--muted);
  margin: 0 0 1.2rem 0;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  color: var(--fg);
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  text-decoration: none;
  color: var(--fg);
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  padding: 0;
  border: 0;
  background: transparent;
}

.project-link:hover {
  text-decoration: underline;
}

.contract-addresses {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--border);
}

.contract-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--fg);
}

.contract-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.contract-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  flex-wrap: wrap;
}

.contract-name {
  color: var(--muted);
  min-width: fit-content;
}

.contract-link {
  color: var(--fg);
  text-decoration: none;
  font-family: monospace;
  word-break: break-all;
}

.contract-link:hover {
  text-decoration: underline;
}

.contract-network {
  color: var(--muted);
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .featured-grid,
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .project-card {
    margin-bottom: 1rem;
  }
  .projects-title {
    font-size: 2rem;
  }
  .section-title {
    font-size: 1.2rem;
  }
}
</style>
```

Key changes from the original:
- Imports and uses `useTypeOnScroll` for the page heading.
- Page heading switched from static `<h1>projects</h1>` to typed `_projects` with persistent blinking `_` cursor.
- Subheaders prefixed with `_`: `_featured projects`, `_all projects`, `_contributions`. Lowercased.
- All `font-family: -apple-system, ...` switched to `'Courier New', monospace` with `dotgothic16-regular` class on headings.
- All hard-coded colors (`#000`, `#333`, `#666`, `#999`, `#007bff`, `#f0f0f0`, `#f8f9fa`, etc.) replaced with `var(--fg)`, `var(--muted)`, `var(--border)`, `var(--bg)`, `var(--shadow)`.
- `border-radius` removed from cards. `box-shadow` removed from default state.
- Hover state: hard `4px 4px 0 var(--shadow)` offset shadow + `translate(-2px, -2px)` (8-bit feel).
- Featured cards: 2px border instead of 1px, no separate color rule.
- Tech tags rendered as `[rust]` `[bitcoin]` (lowercased, bracketed, monospace, no background, no border).
- GitHub button → `> github` plain text link, no background, no border.
- Contract link styling: black/white monospace with hover underline; pill background and blue color removed. `word-break: break-all` keeps long addresses from overflowing on narrow viewports.
- "Deployed Contracts:" → lowercase `deployed contracts:`.
- Removed unused dataset fields: `image` (no `<img>` was rendered), `live: "#"` (the "live" link was never rendered in the template).

- [ ] **Step 2: Visual QA**

Run `npm run dev` if not already running. Open the site, dismiss the cover screen, scroll down past About to the Projects section.

Verify in order:
1. As Projects scrolls into view, the heading types out `_projects` character by character.
2. Persistent blinking `_` cursor remains after typing.
3. Scroll up and back down → heading does NOT re-type.
4. Three subsection titles render: `_featured projects`, `_all projects`, `_contributions`. All lowercase, DotGothic16, with a static `_` prefix. They do NOT animate.
5. Project cards have a 1px solid border (2px on featured), no rounded corners, no default shadow.
6. Hover a project card → it slides up-left 2px and a hard 4px-offset shadow appears (no soft blur).
7. Tech tags render as `[solidity]`, `[rust]`, `[bitcoin]`, etc. — bracketed, monospace, no background.
8. GitHub link reads `> github`, no button background, underlines on hover.
9. Contract addresses render in monospace, theme `--fg` color (black in light, near-white in dark), underline on hover. No blue.
10. Toggle dark mode → all cards, borders, hover shadows, and contract links invert correctly.
11. Mobile width → cards collapse to single column, addresses wrap rather than overflowing horizontally.

If any check fails, debug before committing.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Projects.vue
git commit -m "style: restyle Projects to match hero aesthetic + type-on-scroll"
```

---

## Task 8: Final Visual QA Pass

End-to-end sanity check across the whole site in both themes.

**Files:** none modified.

- [ ] **Step 1: Light mode end-to-end pass**

With dev server running, hard-reload the page (Cmd+Shift+R). Make sure `localStorage.theme` is unset and your system is set to light mode (or override by setting `localStorage.theme = 'light'` and reloading).

1. Cover screen: black background, white text, click works.
2. Hero: typing animation runs, GIF appears on `_frontend`, audio plays.
3. Bottom-right toggle says `dark mode.` in DotGothic16.
4. Garden Finance hover tooltip displays correctly.
5. Scroll to About: `_about` types out, blinks, sections render flat with dashed dividers.
6. Scroll to Projects: `_projects` types out, project cards have sharp borders, tech tags are bracketed, hover gives hard offset shadow.
7. Click a GitHub link → opens in new tab.
8. Click a contract link → opens block explorer in new tab.

- [ ] **Step 2: Dark mode end-to-end pass**

Click the toggle. Verify the same flow:

1. Hero background flips to near-black, text to near-white.
2. Toggle now reads `light mode.`.
3. Scroll back up to confirm hero typing area, nav, and Garden Finance area all readable.
4. Scroll to About: dividers visible against dark background.
5. Scroll to Projects: card borders visible (white-on-black), hover shadows visible, tech tags readable, contract addresses readable.
6. Hard-reload the page → no white flash, dark mode persists.

- [ ] **Step 3: Mobile viewport pass**

Resize browser to ~375px wide (or use DevTools device emulation, e.g. iPhone SE).

1. Hero: title still readable, mobile nav appears at bottom-left.
2. Toggle in bottom-right still tappable.
3. About: blocks collapse to single column, social links left-aligned.
4. Projects: cards collapse to single column, tech tags wrap, contract addresses wrap (no horizontal scroll).

- [ ] **Step 4: Confirm no console errors**

In DevTools Console, hard-reload and walk through all sections again. Expected: no red errors. Audio errors are pre-existing and acceptable if no audio plays.

- [ ] **Step 5: No commit needed**

Task 8 is verification only. If any issue surfaced, go back to the relevant task, fix, and re-commit there.

---

## Self-Review Notes

- All seven task files covered: `style.css`, `index.html`, `useTheme.js`, `Home.vue`, `useTypeOnScroll.js`, `About.vue`, `Projects.vue`. Matches the spec's File Map.
- Spec sections mapped:
  - "Typography & color tokens" → Task 1 (variables) + Tasks 6 & 7 (consumed in scoped CSS).
  - "Type-on-scroll composable" → Task 5.
  - "Theme composable" → Task 3.
  - "Anti-flash script" → Task 2.
  - "Toggle UI" → Task 4.
  - "About page restyle" → Task 6.
  - "Projects page restyle" → Task 7.
  - "Color references in scoped CSS" → covered inline within Tasks 6 & 7.
- No placeholders. Every step has the actual code.
- Type/name consistency: `useTheme()` returns `{ isDark, toggle }`; consumed in Task 4 as `const { isDark, toggle: toggleTheme } = useTheme()`. `useTypeOnScroll(targetRef, fullText, opts)` returns `{ displayed, done }`; consumed identically in Tasks 6 & 7.
- Tailwind v4 arbitrary value syntax `bg-[var(--bg)]` is the documented v4 approach; if the user's Tailwind setup differs, the visual QA in Task 4 step 4 catches it before further tasks build on the assumption.
