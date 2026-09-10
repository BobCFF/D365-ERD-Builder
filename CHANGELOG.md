# Changelog

All notable changes to **D365 ERD Builder** are recorded here. The version shown
on the page (bottom of the sidebar and on the upload screen) matches the latest
released version below.

The format follows [Keep a Changelog](https://keepachangelog.com/), and the
project uses [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

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
