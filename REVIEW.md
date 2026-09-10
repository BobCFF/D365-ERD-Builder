# Project Review — D365 ERD Builder

Reviewed at **v2.8.1**. Scope: the single-file client-side app (`index.html`)
and its repo. Findings are cross-referenced by ID in `TODO.md`. Severity:
**P0** ship-blocker / security · **P1** important · **P2** nice-to-have.

The app's core design is sound and genuinely strong: **100% client-side, no
network calls, no telemetry, no backend**. The schema never leaves the browser.
That is a real, marketable privacy property and the review does not undermine
it. Most findings are hardening, maintainability, and polish.

---

## 1. Software engineer

**Correctness / robustness**
- **SEC/BUG-1 (P0): HTML attribute-injection via `esc()`.** `esc()` escapes only
  `& < >`, not quotes. It is interpolated into attribute contexts (e.g.
  `cardHTML` `title="${esc(a.display)}…"`) and the result is assigned with
  `innerHTML`. A field value like `x" onmouseover="…"` injects an event-handler
  attribute → **DOM XSS** driven by a crafted `customizations.xml`. See §4.
- **BUG-2 (P1): hover re-renders the whole edge/minimap layer.** `highlight()` →
  `drawLinks()` rebuilds *all* edges (SVG string), all labels, and the minimap
  (`mmRenderNodes`) on every mouseenter/leave — only to toggle `dim/hot`
  classes. On a 50-table / 600-relationship schema this is avoidable churn and
  GC pressure. Separate "restyle" (class toggle on existing paths) from
  "rebuild" (geometry changed).
- **BUG-3 (P2): synchronous parse can freeze the tab** for a very large
  `customizations.xml` (DOMParser + traversal on the main thread). Consider a
  Web Worker + a parse spinner for files over a few MB.
- **BUG-4 (P2): `fit()` reads `getBoundingClientRect()`** while the diagram view
  may be display-driven; already mitigated by re-measure on view switch, but the
  initial `pendingFit` path is timing-sensitive. Low impact.

**Architecture / maintainability**
- **MAINT-1 (P0): build sources are not in the repo.** `index.html` is generated
  but `src/*` + `build-d365.py` live only in a session scratchpad. Editing means
  diffing a 270 KB artifact; a lost scratchpad = lost source. This is the single
  biggest rework/token risk. Commit the sources + build script (see
  `ARCHITECTURE.md`).
- **MAINT-2 (P1): no tests / no CI.** Playwright `.cjs` smoke scripts exist in the
  scratchpad but aren't committed or run. Add a `tests/` suite + a GitHub Action
  that builds and runs them on PRs (there have been 14 PRs; a smoke gate pays
  for itself).
- **MAINT-3 (P2): no linter/formatter.** A single giant file with terse code is
  hard to review. If sources are committed, add ESLint + Prettier (or Biome) and
  optionally split JS into ES modules bundled by esbuild — still emitting one
  self-contained file.
- **MAINT-4 (P2): version string duplicated in 3 places** (`APP_VERSION`,
  `.lver`, CHANGELOG). The build script should stamp it from one source.

**Memory / performance**
- Cards are HTML in `<foreignObject>`; fine for typical solutions but heavy for
  many hundreds of nodes. Document a practical table ceiling, or virtualize
  offscreen nodes (P2).
- `forceLayout` is O(n²)·360 iters — acceptable < ~150 nodes; add a Barnes-Hut or
  cap iterations for larger sets (P2).
- Good: IndexedDB (not localStorage) for the schema; rAF-throttled minimap;
  per-drag listeners are removed on mouseup; `getComputedStyle` results cached in
  `_mmGroupCol`.

## 2. Security analyst / penetration tester

- **SEC-1 (P0): DOM XSS via attribute injection** (same as BUG-1). Attack: send a
  victim a malicious `customizations.xml`; on load, a crafted display
  name/description injects an inline event handler that runs in the app's
  origin. The app persists imports in IndexedDB, so the payload re-fires on every
  visit until cleared. **Fix:** (a) escape `"` and `'` in `esc()` (covers both
  text and attribute contexts), *and* (b) add a strict Content-Security-Policy
  (`script-src 'self'`; the app is self-contained so a nonce-free strict CSP is
  feasible once the inline `<script>`/`<style>` are handled — either hash them or
  externalize). A strict CSP blocks inline-handler execution as defense-in-depth.
- **SEC-2 (P1): no security headers.** Add `vercel.json` headers:
  `Content-Security-Policy`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: no-referrer`, `X-Frame-Options`/CSP `frame-ancestors`
  (clickjacking — low impact with no auth, but standard), `Permissions-Policy`
  (disable camera/mic/geolocation), and HSTS (Vercel sets it, verify).
- **SEC-3 (P1): stored-data lifecycle / shared-machine privacy.** The imported
  schema persists in IndexedDB indefinitely. On a shared/kiosk browser the next
  person can open the last-loaded (possibly confidential) schema. `revertBuiltIn`
  clears it but is buried in Settings → Reset. Surface a clear "Forget this file
  / clear from this browser" control and document retention.
- **SEC-4 (good): no exfiltration path.** No `fetch`/XHR/WebSocket/beacon; the
  only `new Image()` renders the inline SVG for PNG export locally; the SVG uses
  only `data:` fonts so the canvas is not tainted. Verified no third-party
  scripts or trackers.
- **SEC-5 (P2): `window.__erd` exposes internals** (`exportSVG`, `svgToPng`,
  `importXmlText`). Harmless functionally; drop it in production or guard behind a
  debug flag to reduce surface.

## 3. UX designer

- **UX-1 (P1): theme cycle discoverability.** The top-bar swatch button cycles 7
  themes but doesn't show the current name at rest (only a tooltip + transient
  toast). Consider a small caption or a popover list; Settings swatches (good)
  already cover direct selection.
- **UX-2 (P1): no undo.** Hiding/moving/resizing has no undo; "Reset" is
  all-or-nothing. A single-level undo (or "restore last layout") would reduce
  fear of experimenting.
- **UX-3 (P2): canvas accessibility.** Nodes are non-focusable divs; the diagram
  isn't keyboard-navigable or screen-reader friendly. The Data Dictionary table
  is the accessible fallback (good). Add: focusable table cards, ARIA roles, a
  focus trap in modals (Escape works; Tab currently escapes the dialog).
- **UX-4 (P2): search is sidebar-only.** No "find this table on the canvas / pan
  to it." Wire the search box to also center/flash a match.
- **UX-5 (P2): large-file feedback.** No progress/spinner during parse or PNG
  render of big diagrams; the UI can appear frozen.
- Strengths: upload-first flow is clear; per-column DD filters, per-worksheet
  Excel, minimap, theming, and mobile gestures + help overlay are all above bar
  for a free tool.

## 4. Marketer

- **MKT-1 (P1): SEO / social.** No `<meta name="description">`, no Open Graph /
  Twitter card, no canonical URL. A shared link renders no preview. Add OG tags +
  a static social image (can be a baked data-URI to stay self-contained, or a
  small PNG in the repo).
- **MKT-2 (P2): the privacy story is the pitch** — "your schema never leaves your
  browser." Say it louder on the landing and back it with `PRIVACY.md`.
- **MKT-3 (P2): shareable state.** Optional: encode layout/selection in the URL
  hash so users can share a specific view (careful — the *schema* must stay
  local; only share view state, or nothing).
- **MKT-4 (P2): privacy-friendly analytics** (e.g. Plausible/self-host) if usage
  metrics are wanted — but this trades against the "no network" guarantee;
  default to none and make it an explicit, documented choice.

## 5. Founder / executive

- Differentiators to lean on: zero-install, offline-capable, privacy-preserving,
  no per-seat cost, exports (PNG/SVG/CSV/multi-sheet XLSX). Good wedge for
  Dynamics consultants and solution architects.
- Risks: single-maintainer bus factor amplified by MAINT-1 (no source in repo);
  no license/ownership clarity (LEG-1); trademark exposure (LEG-2).
- Cheap credibility wins: LICENSE, PRIVACY.md, a short "How it works
  (client-side)" section, and CI green checks on PRs.

## 6. Legal / compliance

- **LEG-1 (P1): no LICENSE.** Add one (MIT recommended for a tool like this) to
  clarify usage/contribution rights.
- **LEG-2 (P1): embedded-font licensing.** Archivo and IBM Plex Mono are SIL OFL
  1.1. The app **redistributes** them (base64 in the page **and** baked into
  SVG/PNG exports). OFL requires the license/attribution accompany the fonts.
  Add the OFL notice (a `THIRD_PARTY_LICENSES.md` / `licenses/` folder) and keep
  the reserved font names intact. Confirm neither font is renamed.
- **LEG-3 (P2): trademarks.** "Dynamics 365", "Dataverse", "Microsoft",
  "Power Apps" are Microsoft marks. Usage here is nominative (describing
  compatibility) which is generally fine, but add a disclaimer: "Not affiliated
  with or endorsed by Microsoft." Consider whether "D365" in the product name is
  worth the ambiguity.
- **LEG-4 (P1): privacy claim substantiation.** The UI claims files never leave
  the browser. That's true today (SEC-4) — add `PRIVACY.md` stating: no data
  collected, processing is 100% client-side, storage is local (localStorage +
  IndexedDB) and user-clearable, host (Vercel) sees standard request logs (IP,
  timestamp) for delivery only. This backs GDPR/CCPA "no personal data
  processing" positioning.
- Note for **end users** loading real solution files: table/column names and
  descriptions can be commercially sensitive; they persist locally until
  cleared. Covered by SEC-3.

---

## Suggested tools / services (optional)

- Build/bundle: **esbuild** or **Vite** (emit one inlined file); **Biome** or
  ESLint+Prettier for lint/format.
- Tests: **Playwright** (already used ad-hoc) as a committed smoke suite; run in
  **GitHub Actions**.
- Headers/CSP: **`vercel.json`** `headers` (no code needed).
- Analytics (only if wanted): **Plausible** / **Umami** (self-host, cookieless) —
  but it breaks "no network"; keep opt-in and documented.
- Parsing at scale: move `parseCustomizationsXml` into a **Web Worker**.
