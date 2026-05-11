# Copilot instructions for this repository

## Build, test, and lint commands

This repository is a static site (HTML/CSS/JS) with no package manager files or repo-defined build, test, or lint scripts.

- **Build:** none configured
- **Lint:** none configured
- **Test suite:** none configured
- **Run a single test:** not available (no test runner in this repo)

## High-level architecture

- The site is delivered directly from root files: `index.html`, `style.css`, and `script.js`, plus static assets in `assets/`.
- `index.html` contains both page structure and SEO/schema metadata, and wires all interactive regions through stable IDs/classes and `data-*` attributes consumed by JavaScript.
- `script.js` is a single `DOMContentLoaded` orchestration layer with feature blocks (navigation/sidebar, theme toggle, typewriter, counters, skill tabs, projects loader, contact form, Three.js scenes, particles, preloader, cursor effects, section reveal, and anchor handling).
- `style.css` is monolithic and sectioned with large comment banners. It defines theme tokens in `:root`, section/component styling, state-class styling, then extensive responsive/upgrade overrides later in the file.
- External runtime dependencies are loaded via CDN in `index.html` and used in `script.js`: Three.js, particles.js, AOS, and EmailJS.

### Dynamic data flow to know

- The **Projects** section is not static cards in HTML. `script.js` builds cards at runtime by combining:
  1. `CURATED_PROJECTS` (hardcoded featured entries), and
  2. live GitHub repos from `https://api.github.com/users/divyanshuX72/repos`
- It deduplicates by repo name, computes categories, renders DOM cards, and applies filter logic based on `data-filter` and `data-categories`.
- The contact form uses EmailJS placeholders by default; if keys remain placeholders, submission is simulated and UI states/toasts still run.

## Key codebase conventions

- Keep **HTML IDs/classes/data attributes synchronized with JS selectors**. Most behaviors are selector-driven (`getElementById`, `querySelectorAll`) rather than component abstractions.
- Preserve existing **state class names**; JS toggles these and CSS renders behavior from them:
  - navigation/layout: `active`, `scrolled`, `visible`, `sidebar-open`
  - projects/skills: `hidden`, `card-visible`, `skill-hidden`, `skill-visible`
  - contact UX: `is-loading`, `is-success`, toast `.active`
  - reveal effects: `section-in-view`
- Follow the existing `data-*` contract when adding/updating UI:
  - counters use `data-count`
  - skill bars use `data-width`
  - skill filters use `data-category` + `data-skill-category`
  - project filters use `data-filter` + card `data-categories`
- Theme switching is implemented by mutating CSS custom properties (`--bg`, `--text-primary`, etc.) in JS, not by swapping a global theme class.
- Heavy visual features are guarded for performance (mobile checks, `IntersectionObserver`, throttled scroll logic). Preserve these guards when extending animations.
- For deployment behavior changes, keep `netlify.toml` headers in mind (cache rules differ for HTML vs CSS/JS/assets).
