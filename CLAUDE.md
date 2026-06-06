# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Family Movie Night** is a static web app — plain HTML, CSS, and JavaScript with no frameworks or build tools. It is hosted on GitHub Pages at https://shalinpei.github.io/family-movie-night.

The app displays a curated grid of 20 show cards (17 real shows + 3 Coming Soon placeholders) that deep-link to streaming platforms. Click counts are tracked in a Supabase database via `db.js`.

## File Structure

- `index.html` — app shell and card markup
- `style.css` — all styles for both themes
- `script.js` — sorting, theme toggling, card interactions
- `db.js` — Supabase client and click-count logic
- `images/` — show thumbnails

## Development

Open `index.html` directly in a browser or serve locally:

```bash
npx serve .
# or
python3 -m http.server
```

No build step required. Deploy by pushing to the `main` branch (GitHub Pages serves from root).

## Architecture

### Themes
Two visual themes toggled by a single button:
- **Dreamy Wonderland** — purple gradient, glowing cards, whimsical aesthetic
- **Blockbuster Friday** — blue/yellow, video store aesthetic with two shelves: Classics and New Releases

Theme state is toggled in `script.js` and reflected via a CSS class on `<body>` (or similar root element), with all theme-specific styles in `style.css`.

### Sorting
Cards support three sort orders: Most Popular, Recently Added, and Alphabetical. Sorting is handled client-side in `script.js`.

### Click Tracking
`db.js` holds the Supabase connection. Each card click increments a counter in Supabase, which also powers the Most Popular sort.

### Design Constraints
- Mobile-first layout, tablet-ready, castable to TV
- No frameworks, no build tools — keep it vanilla
