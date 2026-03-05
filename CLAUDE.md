# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal portfolio website for Mahmud Nabi (Senior Data Engineer). No build tools, bundlers, or package managers — pure HTML, CSS, and vanilla JavaScript.

## Development

Serve locally with any static file server:
```bash
python3 -m http.server 8000
# or
npx serve .
```

No build, lint, or test commands exist.

## Architecture

- `index.html` — Single-page site with all content (nav, hero, about, skills, experience, projects, education, contact, footer)
- `css/main.css` — CSS custom properties (design tokens in `:root`), layout, typography, responsive styles
- `css/components.css` — Skill tags, experience cards, project cards, certifications, drawer, update chips, responsive breakpoints
- `css/animations.css` — Fade-in animation keyframes
- `js/main.js` — Mobile menu toggle, IntersectionObserver-based scroll animations, smooth scroll
- `js/projects.js` — Slide-out drawer for work history project details (`openDrawer()`/`closeDrawer()` via inline `onclick`). Drawer closes via X button, backdrop click, or Escape key. Scroll is trapped inside the drawer when open.
- `js/updates.js` — Hero notification chips that scroll to Featured Projects or blog article sections. Configurable via `FEATURED_PROJECTS` and `LATEST_BLOG` objects. Chips are dismissible (localStorage) and highlight target cards with a blink animation.
- `assets/images/` — Profile photo, company logos (e.g. `shohoz-logo.png`)
- `assets/resume/` — Downloadable resume PDF

## Key Conventions

- Dark theme using CSS custom properties (`--bg-primary`, `--accent-primary`, etc.)
- Scroll reveal uses `.fade-in` class + IntersectionObserver adding `.visible`
- SVG icons are inlined directly in HTML (no icon library)
- No frameworks or dependencies — keep it vanilla
- Featured Project cards are `<a>` tags wrapping the entire card (clickable to GitHub). Nested links use `<span onclick>` with `stopPropagation` to avoid invalid nested `<a>` elements.
- Work history project details use a slide-out drawer (`.drawer`) instead of inline accordion expand
- Company logos: Optimizely uses inline SVG, Shohoz uses a PNG from `assets/images/`
- Type badges (`.project-type`, `.cert-type`) indicate project/certification category
- Responsive: at ≤768px "View Details" text hides leaving only `>` chevron; at ≤400px further size reductions
- z-index hierarchy: nav=1000, drawer-backdrop=1001, drawer=1002
