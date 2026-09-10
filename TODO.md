# TODO — D365 ERD Builder

Prioritized backlog from the v2.8.1 review (`REVIEW.md`). Ordered so that
**foundations that reduce future rework come first**, then security hardening,
then features/polish. Check off as completed; keep newest release notes in
`CHANGELOG.md`.

Legend: **P0** do first (blocks safe iteration / is a live vuln) · **P1**
important · **P2** nice-to-have. IDs match `REVIEW.md`.

---

## P0 — foundations & security (do first)

- [ ] **P0-1 · Commit build sources to the repo** (MAINT-1). Add `src/`
  (`d365-body.txt`, `d365-css.txt`, `d365-js.txt`, `fontface.css`, `sample.xml`)
  and `build-d365.py`; document `python3 build-d365.py` in the README. Without
  this, every change means editing a 270 KB generated file and the source can be
  lost. *Everything below is cheaper once this is done.*
- [ ] **P0-2 · Fix HTML attribute-injection XSS** (SEC-1/BUG-1). Escape `"` and
  `'` in `esc()` (one-line change covering text + attribute contexts). Add a
  regression test that loads a schema whose display name contains `">` and
  `" onmouseover=` and asserts no attribute/handler injection.
- [ ] **P0-3 · Add a strict Content-Security-Policy** (SEC-1/SEC-2).
  `script-src 'self'` (+ whatever is needed for the inline bundle — hash the
  inline `<script>`/`<style>` or externalize them in the build). Ship via
  `vercel.json` `headers` and/or a `<meta http-equiv>` fallback. Verify the app
  still runs (it makes no external requests, so this is low-risk).

## P1 — hardening, correctness, trust

- [ ] **P1-1 · `vercel.json` security headers** (SEC-2): `X-Content-Type-Options:
  nosniff`, `Referrer-Policy: no-referrer`, `frame-ancestors 'self'`,
  `Permissions-Policy` (camera=(), microphone=(), geolocation=()). Confirm HSTS.
- [ ] **P1-2 · "Forget this file" control + retention note** (SEC-3). Promote
  `revertBuiltIn` to a clearly labelled button (e.g. on the landing and in the
  header when a file is loaded), and note that imports persist locally until
  cleared.
- [ ] **P1-3 · Split restyle vs. rebuild in `drawLinks`** (BUG-2). On hover/
  select, toggle `dim/hot` classes on existing paths instead of rebuilding all
  edges + the minimap. Measure on a 50-table schema.
- [ ] **P1-4 · Add a committed test suite + CI** (MAINT-2). Port the Playwright
  smoke scripts into `tests/`; GitHub Action builds `index.html` and runs them on
  every PR (parse, render, export CSV/XLSX, theme cycle, touch, no console
  errors).
- [ ] **P1-5 · LICENSE** (LEG-1) — add MIT (or chosen license).
- [ ] **P1-6 · Font license attribution** (LEG-2) — add `THIRD_PARTY_LICENSES.md`
  / `licenses/OFL.txt` for Archivo + IBM Plex Mono; keep font names unchanged.
- [ ] **P1-7 · `PRIVACY.md` + louder privacy note** (LEG-4/MKT-2) — 100%
  client-side, local storage only + user-clearable, host sees delivery logs
  only, no analytics.
- [ ] **P1-8 · SEO / social meta** (MKT-1) — `<meta description>`, Open Graph /
  Twitter tags, canonical URL, social preview image.
- [ ] **P1-9 · Undo (single level)** (UX-2) — at least "restore previous layout"
  after hide/move/reset.
- [ ] **P1-10 · Theme name at rest** (UX-1) — show the active theme name/label
  near the cycle button, not only in tooltip/toast.

## P2 — polish, scale, features

- [ ] **P2-1 · Canvas accessibility** (UX-3): focusable cards, ARIA roles for the
  diagram, modal focus trap; keep the Data Dictionary as the accessible view.
- [ ] **P2-2 · Search → locate on canvas** (UX-4): center/flash the matched table.
- [ ] **P2-3 · Large-file UX** (UX-5/BUG-3): parse in a Web Worker; spinner during
  parse and PNG render; document a practical table ceiling.
- [ ] **P2-4 · Version single-source** (MAINT-4): stamp `APP_VERSION` + `.lver`
  from one value in `build-d365.py`.
- [ ] **P2-5 · Lint/format (+ optional module split)** (MAINT-3): Biome or
  ESLint+Prettier once sources are committed; optionally esbuild-bundle to one
  inlined file.
- [ ] **P2-6 · Layout scale** (perf): Barnes-Hut or iteration cap in
  `forceLayout`; consider virtualizing offscreen nodes for very large schemas.
- [ ] **P2-7 · Trademark disclaimer** (LEG-3): "Not affiliated with Microsoft."
- [ ] **P2-8 · Remove/guard `window.__erd`** (SEC-5) in production.
- [ ] **P2-9 · Shareable view state in URL hash** (MKT-3) — view/layout only,
  never the schema.

## Done (recent, for context)

- v2.8.1 connector/marker gap · v2.8.0 mobile gesture help · v2.7.0 theme
  swatches + touch gestures · v2.6.0 seven themes · v2.5.x minimap/mobile fixes ·
  v2.4.0 minimap · v2.3.0 card ⋯ menu + export dialog + XLSX · v2.2.0 DD column
  controls · v2.1.0 panel + card detail. See `CHANGELOG.md`.
