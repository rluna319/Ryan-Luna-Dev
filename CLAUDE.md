# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A static single-page developer portfolio site (Pug → HTML, SCSS/Bootstrap → CSS), deployed to GitHub Pages via the `gh-pages` branch. There is no client-side framework and no test suite — this is a build-and-render pipeline, not an app.

## Commands

- `npm run build` — full production build: `clean` → `build:pug` → `build:scss` → `build:scripts` → `build:assets`, output to `dist/`.
- `npm start` — build once, then run `scripts/start.js`, which runs `sb-watch.js` (chokidar watcher, incremental re-render on change) concurrently with `browser-sync` serving `dist/` with live reload.
- `npm run start:debug` — same as `start`, but launches `sb-watch.js` with `--inspect` and without reload debounce tuning.
- `npm run deploy` — publishes `dist/` to the `gh-pages` branch via the `gh-pages` CLI (`gh-pages -d dist -m "v$npm_package_version"`). Always run `npm run build` first — `deploy` does not build for you.
- `npm run cleanup-deployments` — runs `scripts/cleanup-deployments.mjs`, which uses Octokit to delete inactive GitHub deployment records for this repo. Requires `DEV_PORTFOLIO_GITHUB_API_TOKEN` in the environment.
- There is no lint or test command configured.

## Architecture

**Source → build → dist pipeline.** Everything under `src/` is compiled into `dist/` by the scripts in `scripts/`; nothing in `dist/` should be edited by hand (it's blown away by `clean.js` on every build). Each `scripts/build-*.js` is a thin CLI entry point that just calls the matching `scripts/render-*.js`, which holds the actual logic — when changing build behavior, edit the `render-*.js` file:

- `render-pug.js` — globs `src/**/*.pug` (excluding `include/`, `mixin/`, `pug/layouts/`), renders each with the `pug` package, formats the output with `prettier`, and writes to `dist/` with the same relative path (`.pug` → `.html`).
- `render-scss.js` — compiles `src/scss/styles.scss` with `sass`, runs it through `postcss`/`autoprefixer`, prepends a version banner from `package.json`, writes `dist/css/styles.css`.
- `render-scripts.js` — copies the three known JS files (`form.js`, `navbar.js`, `skills.js`) from `src/js/` to `dist/js/` individually (not a glob — a new file in `src/js/` must be added here explicitly to be picked up).
- `render-assets.js` — empties `dist/assets/` and recursively copies `src/assets/`.

`scripts/sb-watch.js` (used by `npm start`) mirrors this dispatch logic for the file watcher: it maps a changed file's path to the right `render-*` call, and re-renders **all** Pug files (not just the changed one) when a file under `includes/`, `mixins/`, or `pug/layouts/` changes, since those are shared partials.

`scripts/deploy.js` exists but is **not** wired into any npm script — the actual `deploy` script invokes the `gh-pages` CLI directly. Don't assume `deploy.js` runs; treat it as dead/legacy code unless a script is updated to call it.

**Site content.** The entire page is one template, `src/pug/index.pug` — sections for nav, masthead, projects, publications, about, skills, and contact are all inline in that one file, not split into includes. `src/pug/includes/icons.pug` holds a large icon-name mixin/data set; `includes/portfolio-modal-template.pug` exists but is currently unreferenced (commented out at the bottom of `index.pug`).

**Styles.** `src/scss/styles.scss` is the single entry point: it imports `variables/*` → Bootstrap → `global.scss` → `components/*` → `sections/*`, in that order. Bootstrap variable overrides must happen in the `variables/` imports, before the Bootstrap import, per normal Sass override rules.

**Content changes** (projects, publications, skills, bio text) are made directly in `src/pug/index.pug`; there is no CMS or data file driving that content.
