# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Family Movie Night** is a static web app — plain HTML, CSS, and JavaScript with no frameworks or build tools. It is hosted on GitHub Pages at https://shalinpei.github.io/family-movie-night.

The app displays a curated grid of 20 show cards (17 real shows + 3 Coming Soon placeholders) that deep-link to streaming platforms. Click counts are tracked in a Supabase database via `db.js`.

## File Structure

- `index.html` — app shell and card markup
- `style.css` — all styles for both themes
- `script.js` — sorting, theme toggling, card interactions
- `db.js` — Supabase client, TMDB poster fetching, and click-count logic
- `config.js` — generated at deploy time by CI; never committed (see .gitignore)
- `.github/workflows/deploy.yml` — GitHub Actions workflow that builds and deploys to Pages
- `images/` — show thumbnails

## Development

Open `index.html` directly in a browser or serve locally:

```bash
npx serve .
# or
python3 -m http.server
```

For local development, create a `config.js` in the repo root (it is gitignored) with:

```js
export const SUPABASE_URL = '...';
export const SUPABASE_ANON_KEY = '...';
export const TMDB_READ_TOKEN = '...';
```

## Deployment

**Deployment is handled by GitHub Actions, not the simple "Deploy from branch" Pages setting.**

The workflow at `.github/workflows/deploy.yml` triggers on every push to `main`. It:
1. Checks out the repo
2. Generates `config.js` by injecting the GitHub Secrets `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `TMDB_READ_TOKEN`
3. Deploys the site to GitHub Pages via the official Pages actions

In the GitHub repo settings, the Pages source must be set to **GitHub Actions** (not "Deploy from a branch").

Secrets to configure in GitHub → Settings → Secrets and variables → Actions:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `TMDB_READ_TOKEN`

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
