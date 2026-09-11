# Changelog

All notable changes to **D365 ERD Builder** are recorded here. The version shown
on the page (bottom of the sidebar and on the upload screen) matches the latest
released version below.

The format follows [Keep a Changelog](https://keepachangelog.com/), and the
project uses [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

## [2.16.5] — 2026-09-10

### Changed
- **Version moved to Settings.** The version number no longer prefixes the
  diagram status bar (which now reads just "N of M tables · K relationships
  shown"); it's shown in **Settings → Data source** with a link to the
  changelog.

## [2.16.4] — 2026-09-10

### Fixed
- **Active tab stands out on dark themes.** On Dark, High Contrast (and Low
  Light) the selected top-bar tab (Diagram / Data Dictionary / Settings) was a
  surface pill nearly identical to the tab bar; it's now filled with the theme
  accent so the current page is clearly visible. Light / Monochrome / Rainbow
  keep the existing pill.

## [2.16.3] — 2026-09-10

### Changed
- **Table column filter respects "Visible tables".** When the **Visible tables**
  toggle is on, the Table column's filter now lists only the distinct **visible**
  tables (labelled "visible only"); otherwise it lists all tables in the
  dictionary.

## [2.16.2] — 2026-09-10

### Changed
- **Data Dictionary search now persists** across a refresh (alongside the other
  dictionary settings).
- **Table column filter lists only the tables in the dictionary.** The Tables
  checklist in the Table column's filter now shows just the distinct tables
  present in the current dictionary rows, rather than every table in the schema.

## [2.16.1] — 2026-09-10

### Fixed
- **More Data Dictionary settings now persist across a refresh.** The **sort**
  column/direction, the **"Visible tables"** toggle, and the **Export dialog**
  choices (format, Excel layout, row scope, selected columns) are now saved to
  the browser alongside the column order, widths, filters and metadata-column
  visibility that already persisted. (The dictionary search box stays transient
  by design.)

## [2.16.0] — 2026-09-10

### Added
- **Data Dictionary — optional metadata columns.** The dictionary now reads
  extra per-attribute metadata from `customizations.xml` when present and can
  show it as columns: **Max length, Format, Precision, Min, Max, Audit, Secured,
  Custom, Version, Source (calculated/rollup), Searchable, Option set**. A new
  **Columns** button opens a chooser to show/hide each column — only the ones
  actually present in the loaded file are offered. The columns sort, filter
  (text/blank or Yes/No), reorder, resize, persist, and are available in the
  CSV/XLSX export. Max length, Format, Precision, Min/Max, Audit, Secured,
  Custom, Version and Source are shown by default when present; Searchable and
  Option set are off by default.

  _Note:_ these populate from a real exported `customizations.xml` (an unmanaged
  solution export is richest); the built-in sample carries only type and
  required level, so the chooser reports no extra metadata for it.

## [2.15.1] — 2026-09-10

### Changed
- **Scrollbar tracks now match the field colour.** Scrollbars across the app use
  the theme's `--field` background for their track (and corner) — the same colour
  as inputs and checkboxes — with a `--border-strong` thumb, so they blend in
  rather than showing the browser's default grey track. Applies in every theme.

## [2.15.0] — 2026-09-10

### Added
- **Data Dictionary — pick individual tables in the Table column filter.** The
  Table column's filter menu now lists **every table** (with its group colour)
  as a checklist, so you can select one or more specific tables to show —
  alongside the existing "Table contains…" search and the Groups picker (all
  combine). The selection persists and is included in the filtered/export scope.

## [2.14.0] — 2026-09-10

### Changed
- **Lighter fields and checkboxes in every theme.** Text inputs, the search
  boxes, the weight dropdown, checkboxes and radio buttons now share a new
  theme-relative `--field` background that's lighter than the surrounding
  surface — so they read as clearly lighter, filled boxes rather than dark
  wells. Checkboxes and radios are now custom-drawn (accent fill with a white
  check/dot when selected) so their color follows the active theme instead of
  the browser's dark form palette.

## [2.13.3] — 2026-09-10

### Changed
- **Lightened the Light theme.** The page background and secondary surfaces
  (toolbar chips, table header row, hover rows) were noticeably grey; they're
  now closer to white (`--bg` #eef1f5→#f7f9fc, `--surface-2` #e7ecf2→#eef2f7,
  `--surface-3` #dde3eb→#e4eaf1) with borders lightened to match. White cards
  and popovers still read against the ground; other themes are unchanged.

## [2.13.2] — 2026-09-10

### Fixed
- **Data Dictionary column filter — "Contains…" field readability.** The text
  input in a column's filter menu had no explicit colors, so on a system in
  dark mode it rendered as a dark field on the light popover. It now uses the
  app's own field styling (light ground, themed text, accent focus ring) in
  every theme.

## [2.13.1] — 2026-09-10

### Changed
- The **Weight** dropdown now uses numbered levels **1–5** (1 = thinnest,
  5 = thickest; 2 is the default) instead of Thin / Normal / Thick. Existing
  saved preferences migrate automatically (thin→1, normal→2, thick→4).

## [2.13.0] — 2026-09-10

### Added
- **Connector weight control.** A new **Weight** dropdown in the diagram ribbon
  (Thin / Normal / Thick) sets the thickness of the connection lines, and the
  crow's-foot / one / IDEF1X markers scale with it. The choice persists and
  applies to SVG/PNG exports too.

### Changed
- **IDEF1X now distinguishes identifying vs. non-identifying relationships by
  line style.** A **mandatory** lookup is drawn as a **solid** line (treated as
  identifying — the child depends on the parent); an **optional** lookup is
  drawn **dashed** (non-identifying) with the hollow parent diamond. This
  refines the earlier IDEF1X adaptation: in IDEF1X mode the dash carries the
  identifying distinction rather than the relationship category. Crow's-foot and
  UML modes are unchanged (dash still marks the audit / generic / ownership
  categories).

## [2.12.0] — 2026-09-10

### Changed
- **Reworked the diagram toolbar into a ribbon bar.** Commands are now
  grouped, icon-over-label buttons with a caption under each group (Arrange,
  Notation, Lines), so the same controls take **less horizontal width** and
  degrade gracefully — the bar scrolls horizontally only when truly narrow.
- **Collapsible toolbar.** A chevron at the right edge **minimizes the ribbon**
  to a slim strip (and restores it); the state persists across refreshes, so
  you can reclaim vertical space for the diagram.

## [2.11.0] — 2026-09-10

### Added
- **IDEF1X notation.** The Notation ribbon now offers a third style alongside
  Crow's-foot and UML. It draws the IDEF1X **filled dot** at the child (many)
  end of every relationship, and a **hollow diamond** at the parent end for
  **optional** (nullable-lookup) relationships — a mandatory relationship shows
  no parent glyph. Applies on the canvas and in SVG/PNG exports, and the choice
  persists like the other notations.

  _Adaptation note:_ classic IDEF1X also uses solid vs. dashed lines for
  identifying vs. non-identifying relationships. Dataverse primary keys are
  always a single system GUID, so lookups are never truly identifying; the tool
  therefore keeps its category-colored line styling rather than dashing every
  connector, and conveys required vs. optional through the diamond.

## [2.10.0] — 2026-09-10

### Added
- **Connector tooltips.** Hovering a relationship line now shows a tooltip
  describing it — child → parent tables, the relationship category and lookup
  attribute, and the cardinality (many-to-one, required vs optional). The line
  also thickens slightly on hover so it's easy to tell which connector you're
  reading.
- **Search → locate on the canvas.** Pressing **Enter** in the sidebar search
  box centers the diagram on the first matching table and pulses it;
  **double-clicking** any table in the sidebar list does the same (showing it
  first if it was hidden).

### Changed
- Removed the "‖ mandatory · ○| optional" legend from the Notation ribbon group
  — the connector tooltips (and UML `1` / `0..1`) now convey this, and the
  ribbon is less cluttered.
- **Version is now single-sourced** in `build-d365.py` (stamped into the page
  and the script at build time), so a release bumps one value.

## [2.9.1] — 2026-09-10

### Changed
- **Hovering/selecting a table no longer rebuilds the diagram.** Connectors are
  now rebuilt only when geometry actually changes (move, show/hide, arrange,
  resize, notation/line/detail change); hover and selection just toggle
  highlight/dim classes on the existing SVG elements, and the minimap is no
  longer redrawn on hover. Smoother on large schemas.

## [2.9.0] — 2026-09-10

### Added
- **Undo** (single level) in the ribbon (and Ctrl/⌘Z) — reverts the last move,
  hide/show, or auto-arrange.
- **Active theme name** is shown next to the theme button (not just in the
  tooltip); hidden on narrow screens.
- **"Forget this file"** control in Settings → Data source — clears the imported
  schema and layout from this browser (localStorage + IndexedDB) and returns to
  the upload screen, with a note about shared/public computers.
- **SEO / social metadata** — description, Open Graph + Twitter tags, canonical
  URL, theme-color, and an inline SVG favicon.
- Landing and Settings now link to `PRIVACY.md` ("how your data is handled").

## [2.8.2] — 2026-09-10

### Security
- **Fixed an attribute-injection / DOM-XSS vector.** `esc()` now escapes quotes
  (`"` and `'`) in addition to `& < >`, so a crafted table/column display name or
  description in an imported `customizations.xml` can no longer break out of an
  HTML attribute to inject an event handler.
- **Added a strict Content-Security-Policy** (build-injected `<meta>`): scripts
  run only via the hash of the app's own inline bundle — no external or injected
  inline script/handlers — with `connect-src 'none'` (nothing is ever sent off
  the page), `img-src data: blob:`, `font-src data:`, and `default-src 'none'`.
- **Added transport security headers** via `vercel.json`:
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`,
  `X-Frame-Options: DENY` + `frame-ancestors 'none'`, `Cross-Origin-Opener-Policy`,
  and a locked-down `Permissions-Policy`.

_No user-facing behaviour change; the app still parses and renders entirely in
your browser._

## [2.8.1] — 2026-09-10

### Fixed
- Connector lines no longer run underneath the crow's-foot / one markers. Each
  connector's endpoints are inset by the marker length so the line begins at the
  crow's-foot apex and ends before the one-marker, with the markers seated
  cleanly against the box edge (applies to straight, curved and S-curve routing,
  and to exports).

## [2.8.0] — 2026-09-10

### Added
- **Touch-gesture help on mobile.** A **?** button (top-right of the diagram on
  narrow screens) opens a card explaining the touch gestures — pinch to zoom,
  drag to pan, drag/resize cards, tap ⋯, open the panel, and resize/reorder Data
  Dictionary columns. It appears automatically the first time on a touch device
  and is dismissible; it won't reappear once seen.

## [2.7.0] — 2026-09-10

### Added
- **Theme swatches.** Each theme button in Settings → Appearance now shows a
  small colour preview of that theme (ground, accent and two group hues).
- **Touch gestures for mobile / touchscreens.** The diagram supports
  **pinch-to-zoom** and **one-finger pan**, and **drag** moves and **corner-drag**
  resizes table cards. The **side panel** resizes by touch, and in the Data
  Dictionary you can **drag a column edge to resize** and **drag a heading to
  reorder** (a tap still sorts). The minimap can be panned and repositioned by
  touch too.

## [2.6.0] — 2026-09-10

### Added
- **More color themes.** The top-bar theme button now cycles through seven
  numbered themes — **System, Light, Dark, High Contrast, Monochrome, Low Light,
  Rainbow** — showing the name as it switches. Each can also be picked directly
  from **Settings → Appearance**. The choice persists and applies with no flash
  on load; markers, the minimap, and exports all follow the active theme.

## [2.5.2] — 2026-09-10

### Changed
- Decluttered the table-card header: the detail (maximize / keys / title) icons
  and the close **✕** are gone, leaving just the **⋯** menu — which already
  offers those detail levels plus *Hide table*, so nothing is lost. (Clicking a
  card's header still toggles between all-columns and PK & FK.)

## [2.5.1] — 2026-09-10

### Fixed
- Hiding the side panel no longer collapses the canvas to the left edge (which
  had dragged the minimap to the far left and made it hard to move). With the
  panel hidden, the diagram now fills the full width and the minimap stays put
  and fully draggable.

## [2.5.0] — 2026-09-10

### Added
- The minimap can be **dragged to any corner** by its header (double-click the
  header to snap it back to the default position); its position is remembered.

### Fixed
- The minimap now keeps the whole view in frame at every zoom level — the
  viewport rectangle no longer disappears past the edge when zoomed out.
- **Mobile / narrow browser:** the hamburger is replaced by the **">" open-panel
  button**, and the panel's **"<" Hide** button now closes the overlay instead of
  collapsing the layout — the ERD boxes no longer disappear when hiding the panel.

## [2.4.0] — 2026-09-10

### Added
- **Minimap.** A bottom-right **Overview** panel shows the whole diagram in
  miniature, with a live rectangle marking the current view. **Click or drag**
  inside it to pan the diagram. It can be **minimized** to a small button (and
  reopened), and that state is remembered.

## [2.3.0] — 2026-09-10

### Added
- **Table menu on diagram cards.** Each entity box has a **⋯** button (next to
  the close button) opening a menu: **Data dictionary…** (a dialog listing that
  table's columns — display name, type, required, PK/FK, references, description),
  **Show in Data Dictionary tab** (jumps to the tab filtered to that table),
  quick detail-level switches, and **Hide table**.
- **Export dialog.** The Data Dictionary's Export button now opens a dialog to
  choose the **format** (Excel `.xlsx` or CSV), which **columns** to include, and
  the **row scope** (current filter or all tables).
- **Excel workbook export.** Export an `.xlsx` with **one worksheet per table**
  (plus an Overview sheet) or a single combined sheet. The workbook is generated
  entirely in the browser — no libraries, no upload.
- The per-table dialog has its own **Export table…** button (Excel/CSV scoped to
  that one table).

## [2.2.0] — 2026-09-10

### Added
- **Data Dictionary — per-column filters.** Each column heading has a **⋯**
  menu with filters suited to that column's data: text-contains on Table,
  Column, Display name, References and Description (with Any / Has value /
  Blank); a group picker on Table; a multi-select of the data types present on
  Type; Required / Optional on Req; and PK / FK / Any key / No key on Key. A
  filtered column is badged, and **Clear filters** resets them all.
- **Data Dictionary — adjustable column widths.** Drag a heading's right edge
  to resize a column; double-click that edge to reset it. Widths persist across
  refreshes.
- **Data Dictionary — drag-and-drop column order.** Drag a heading to reorder
  the columns; the order persists across refreshes.

### Changed
- The Data Dictionary toolbar's per-field group / type / keys / required /
  description controls moved into the new per-column menus; global search and
  the *Visible tables* toggle remain.

## [2.1.0] — 2026-09-10

### Added
- The side panel is now **resizable** (drag its right edge; double-click to
  reset) and **collapsible** (a hide button in the panel; a show button appears
  over the canvas).
- Each table card has **detail controls** next to the close button: **maximize**
  (all columns), **minimize** (PK & FK — the default), and **minimize again**
  (table name only). The per-card choice overrides the default and is remembered.
- **Settings → Table cards** sets the default card detail for the whole diagram.

### Changed
- Ribbon **Expand all / Collapse** now switch cards between all-columns and PK & FK.

## [2.0.1] — 2026-09-10

### Fixed
- Connectors no longer overlap where they meet a table. With S-curve routing,
  each connection is distributed into its own slot along the box's left/right
  edge (ordered to reduce crossings), instead of all attaching at the mid-edge.

## [2.0.0] — 2026-09-10

Major upgrade — same in-browser, upload-first tool, rebuilt on a more capable
engine with a richer feature set.

### Added
- **Data Dictionary** tab — searchable, sortable table of every column (table,
  column, display name, type, required, PK/FK, lookup target, description) with
  **CSV export**.
- **Settings** page — theme (light / dark / system), collapsed-card column
  density, edge-label mode, PNG export scale (2× / 3× / 4×), and an optional
  title + colour-legend block on exported images.
- **S-curve** connector routing (alongside straight / curved) so crow's-foot
  markers read clearly against the sides of tables.
- **Mandatory vs optional** cardinality on the "one" end — double bar vs
  circle, derived from the lookup's required level; UML mode shows `1` vs `0..1`.
- **IndexedDB** persistence for an imported schema (replaces the localStorage
  size limit) — a loaded file reopens automatically on refresh.
- Embedded fonts so exported PNG / SVG carry the correct typography; export via
  a normal browser download.
- Top **ribbon** for Arrange and diagram-style controls; **resizable** table
  cards with persisted sizes.

### Changed
- Table grouping is dynamic by publisher prefix (e.g. `CFF_ tables`) plus a
  Standard / System group.
- The version shown on the page is now 2.0.0.

## [1.0.0] — 2026-09-09

First public release.

### Added
- Upload (or drag-and-drop) a Dynamics 365 / Dataverse solution
  `customizations.xml` and render it as an interactive ERD — entirely in the
  browser, no upload to any server.
- XML parser for entities, attributes (type, required level, display name,
  description) and `OneToMany` relationships, with case-insensitive tag matching
  across platform versions.
- Primary-key / foreign-key detection with inline lookup targets.
- Dynamic grouping by publisher prefix plus a *Standard / System* group, each
  colour-coded.
- Toggleable relationship categories: business lookups, ownership,
  created/modified-by, portal (`adx_` / `mspp_`), and generic/activity-party.
- Interactive canvas: pan, zoom, drag, resize, force-directed auto-arrange,
  fit-to-view, expand/collapse columns, and table search.
- Crow's-foot or UML notation; straight or curved connectors.
- Light / dark theme; per-schema layout persistence via `localStorage`.
- PNG / SVG export.
- Built-in sample schema for exploring without a file.
- Version number displayed on the page, linking to this changelog.
- Deployed to Vercel with auto-redeploy on merge to `main`.
