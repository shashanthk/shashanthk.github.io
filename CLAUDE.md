# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal technical knowledge base built with **Astro + Starlight**, deployed as a static site to GitHub Pages at `shashanthk.github.io`. Content is authored entirely in Markdown under `src/content/docs/`; there is no custom application code, API, or backend — this is a docs site.

## Commands

```bash
npm ci              # install dependencies (Node.js v20+)
npm run dev          # local dev server at http://localhost:4321
npm run build        # production build -> dist/ (includes Pagefind search index)
npm run preview      # serve the production build locally
```

There is no test suite, linter, or typecheck script defined in `package.json` (despite `@astrojs/check` being a devDependency, no `astro check` script is wired up — run `npx astro check` directly if type-checking `.astro`/content is needed).

## Architecture

**Content is the source of truth.** Adding or editing a topic means creating/editing a single `.md` file under `src/content/docs/<category>/`; there is no manual routing, navigation registration, or page scaffolding — Starlight's sidebar `autogenerate` (configured in `astro.config.mjs`) derives navigation directly from the directory structure.

Key pieces:
- `astro.config.mjs` — the site's structural definition: registers the `astro-mermaid`, `@astrojs/starlight`, and `@astrojs/sitemap` integrations, and defines the **sidebar categories** (`java`, `spring-boot`, `databases`, `system-design`, `distributed-systems`, `devops-cloud`, `architecture`, `security`, `interview-prep`). Each sidebar entry maps 1:1 to a directory under `src/content/docs/`. A new top-level category requires both a new directory and a new sidebar entry here.
- `src/content/config.ts` — registers the `docs` content collection using Starlight's built-in `docsSchema()`. Frontmatter (`title`, `description`, optional `sidebar.order`) is validated against this schema at build time.
- `src/content/docs/index.md` — the portal homepage; it hand-maintains a categorized index linking to each topic page. When adding a new doc page, update this index too if it should be discoverable from the homepage (sidebar autogeneration alone won't add it here).
- `src/content/docs/<category>/NN-topic-name.md` — individual notes. Existing files use a two-digit numeric prefix (`01-`) for ordering within a category, combined with `sidebar: order:` in frontmatter.
- `src/styles/custom.css` — Starlight theme overrides (typography scale, table/code-block styling, reduced-motion support). Uses Starlight's CSS custom properties (`--sl-color-*`, `--sl-font-*`) rather than hardcoded values.
- `.github/workflows/deploy.yml` — CI/CD: on push to `main` or `master`, runs `npm ci && npm run build`, adds `.nojekyll`, and deploys `dist/` to GitHub Pages via `actions/deploy-pages`. No test gate before deploy.

Notable content conventions (visible in existing pages, e.g. `src/content/docs/java/01-java-memory-model.md`):
- Frontmatter requires `title` and `description`; `sidebar: order: N` controls position within a category.
- Diagrams use fenced ` ```mermaid ` code blocks, rendered natively via `astro-mermaid` — no separate diagram tooling.
- Callouts use Starlight's `:::note[Label]` / `:::tip` / `:::caution` aside syntax.
