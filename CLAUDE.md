# CLAUDE.md — D365 ERD Builder

Project guidance for Claude Code. The full working guide is shared with all
agents in **`AGENTS.md`** — read that plus **`ARCHITECTURE.md`** before making
changes. This file only highlights the essentials so you don't re-derive them.

## TL;DR

- Single self-contained static page (`index.html`, ~270 KB) that parses a
  Dynamics 365 / Dataverse `customizations.xml` **entirely in the browser** and
  renders an interactive ERD. No backend, no network calls, no telemetry.
  Deployed to Vercel on merge to `main`.
- `index.html` is **generated** from `src/*` via `python3 build-d365.py`. **Edit
  the sources, not the artifact.** (Committing `src/` is TODO **P0-1** if it
  isn't in the repo yet — see `ARCHITECTURE.md`.)
- Keep it **dependency-free and self-contained** (no CDNs/fonts/fetches). This is
  a privacy + CSP guarantee, not a style preference.

## Before you code

1. `ARCHITECTURE.md` — build + function map (grep by name; don't read the whole
   artifact).
2. `AGENTS.md` — golden rules, release checklist, gotchas.
3. `REVIEW.md` / `TODO.md` — known issues (by ID) and priorities.

## Non-negotiables

- No external resources or network I/O; the schema must never leave the browser.
- Escape parsed-XML values for **text and attribute** contexts before `innerHTML`
  (SEC-1 / P0-2). Prefer `textContent`/`setAttribute` for user data.
- Every user-visible change: bump `APP_VERSION` + `.lver` + `CHANGELOG.md`, run a
  desktop **and** mobile smoke test (no console errors), then PR → squash-merge to
  `main` and confirm the Vercel "Ready".
- New drag/resize UI needs a touch path (`onTouchDrag`) + `touch-action`, and a
  line in `GESTURES` if it's a new gesture.
- Respect all 7 `[data-theme]` palettes and light/dark via CSS variables.
- Never commit secrets or a model identifier.

See `AGENTS.md` for the detailed workflow and the gotchas list.
