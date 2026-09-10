# AGENTS.md — working on D365 ERD Builder

Guidance for AI coding agents (Codex, Claude Code) and humans. Goal: **make
correct changes with the least token use and rework.** Read this + `ARCHITECTURE.md`
before touching code — do not scan the 270 KB `index.html` blind.

## Orient first (cheap)

1. `ARCHITECTURE.md` — how it's built and a function-map by concept. Start here.
2. `REVIEW.md` — known issues by ID. `TODO.md` — prioritized plan.
3. `CHANGELOG.md` — what shipped and when.

Do **not** read all of `index.html` into context to make a small change. Use
`grep` for a function name from the map, read only that region.

## Golden rules

- **Edit sources, not the artifact.** `index.html` is generated. Change
  `src/d365-{body,css,js}.txt` (or `fontface.css` / `sample.xml`) and run
  `python3 build-d365.py`. If `src/` is not in the repo yet, that is TODO **P0-1**
  — commit it before other work (see `ARCHITECTURE.md`).
- **Stay self-contained.** No external scripts, styles, fonts, CDNs, or network
  calls — ever. This is a privacy/security/offline guarantee and a CSP
  precondition. XLSX is hand-rolled on purpose; don't add a library.
- **Preserve the privacy invariant.** No `fetch`/XHR/WebSocket/beacon/analytics.
  The schema must never leave the browser.
- **Escape correctly.** Anything derived from the parsed XML that lands in
  `innerHTML` must be escaped for **both text and attribute** contexts (see
  SEC-1). Prefer `textContent`/`setAttribute` for user data where practical.
- **Match the house style.** Terse, dependency-free vanilla JS/CSS/SVG; theme via
  CSS custom properties (`--bg`, `--accent`, `--g-*`, `--rel-*`); respect all 7
  `[data-theme]` palettes and both light/dark.
- **Mobile + touch parity.** New draggable/resizable UI needs a touch path
  (reuse `onTouchDrag`) and appropriate `touch-action`. Update the gesture help
  (`GESTURES`) if you add a gesture.
- **Never** commit secrets, tokens, or a model identifier into the repo.

## Release checklist (every user-visible change)

1. Edit `src/*` → `python3 build-d365.py` → regenerates `index.html`.
2. Bump the version in lockstep: `APP_VERSION` (JS), `.lver` (body), a new
   `CHANGELOG.md` entry (P2-4 will make this one source).
3. Validate locally: `python3 -m http.server` + a Playwright smoke check
   (parse → render → the feature you changed → **no console errors**). Test at
   desktop (~1400px) and mobile (~390px, touch).
4. Branch from latest `origin/main`, copy the built `index.html` in, commit,
   push, open a PR, **squash-merge to `main`**. Vercel auto-deploys `main`;
   confirm the Vercel bot's "Ready" comment.

## Gotchas (bite here if ignored)

- The whole app lives inside `startApp(...)`'s closure; top-level helpers
  (parse, IndexedDB, boot) are outside it. New app logic goes **inside**
  `startApp`.
- Sample schema is **not** persisted (only imported files go to IndexedDB), so a
  reload with the sample returns to the landing page — re-enter via "Explore a
  sample" when testing persistence.
- `esc()` currently does NOT escape quotes — until P0-2 lands, never place raw
  parsed values in an HTML attribute.
- Mobile rail is an overlay; never let `rail-collapsed` shrink the stage grid
  column to 0 (that regressed twice — see CHANGELOG 2.5.1).
- Minimap/edges rebuild on hover today (BUG-2) — don't add more per-hover work.
- `xmlEsc` in the XLSX writer must strip invalid XML control chars; don't paste
  raw control characters into source (it corrupted the file once).
- **Vercel is static-only.** The repo has a `package.json` (dev tooling) but the
  site is prebuilt — `vercel.json` sets `framework:null`, no-op install/build
  commands, and `outputDirectory:"."` so Vercel just serves the committed files.
  Do NOT remove those keys or add a real Vercel build step: adding a build made
  Vercel look for an output dir and fail the deploy (production went stale).
  Keep committing the prebuilt `index.html`.

## What "done" looks like

Green smoke test, no console errors on desktop **and** mobile, version bumped in
all three places, `CHANGELOG.md` updated, PR squash-merged to `main`, Vercel
"Ready". For security/legal items, cross-check the relevant `REVIEW.md` ID.
