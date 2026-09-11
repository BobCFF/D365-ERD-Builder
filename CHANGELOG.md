# Changelog

All notable changes to **D365 ERD Builder** are recorded here. The version shown
on the page (bottom of the sidebar and on the upload screen) matches the latest
released version below.

The format follows [Keep a Changelog](https://keepachangelog.com/), and the
project uses [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

## [2.31.0] — 2026-09-11

### Changed
- **Access-level legend on the Security page.** Replaced the small, easily-missed
  legend strip (top-right of the toolbar, hidden on narrow screens) with a
  dedicated **Access levels** bar below the toolbar. It lists every level —
  **None**, User (Basic), Business Unit (Local), Parent: Child (Deep), and
  Organization (Global) — each with its classic pie icon or text label
  (matching the "Classic icons" toggle) and full Dynamics name. It stays visible
  at all widths (wraps instead of hiding) and shows in both single-role and
  Compare views (hidden in the Field security section, which doesn't use access
  levels).

## [2.30.0] — 2026-09-11

### Added
- **Notation legend in the Security export.** The Security roles CSV export
  gains a "Relationship notation" section and the XLSX export a matching
  **Notation** sheet, so the notation legend now travels with every export
  (diagram image, Insights, Data Dictionary, and Security).

### Changed
- **Diagram export moved to the ribbon.** The **PNG** and **SVG** export buttons
  now live in an **Export** group on the ribbon toolbar (next to Weight),
  instead of a section in the left panel — keeping the diagram tools together
  and freeing space in the panel.

## [2.29.0] — 2026-09-11

### Added
- **Notation legend in the Data Dictionary export.** The Data Dictionary CSV
  export gains a "Relationship notation" section, and the XLSX export gains a
  matching **Notation** sheet, naming the active notation and its cardinality
  markers — the same legend now carried by the diagram image and Insights
  exports.
- **Draggable notation legend.** The on-screen notation legend on the Diagram
  can be dragged by its header to any spot on the canvas (like the minimap);
  double-click the header to snap it back to the default corner. Its position is
  saved in the browser.

## [2.28.1] — 2026-09-11

### Fixed
- **Self-referencing loop is now a clear "U" / horseshoe.** The loop for a
  table's self-referencing lookup left the box edge diagonally, pinching the
  curve so the cardinality markers crowded the card. Its tips now leave the edge
  horizontally (control points level with each endpoint) and the endpoints are
  spread further apart, so the notation markers (crow's-foot / one, or the
  IDEF1X dot / diamond) sit clear of the box and point straight into it.

## [2.28.0] — 2026-09-11

### Added
- **Notation legend on the Insights report.** The Insights page gains a
  **Relationship notation** card showing the cardinality-marker legend for the
  active notation (crow's foot / UML / IDEF1X), so it's included when you
  **Print / Save as PDF**. The Insights **CSV** export also gains a
  "Relationship notation" section naming the notation and its markers.

## [2.27.0] — 2026-09-11

### Added
- **Notation legend in PNG / SVG exports.** The exported image's title block now
  includes the same relationship-notation legend shown on the Diagram — the
  cardinality markers for the active notation (crow's foot, UML `* / 1 / 0..1`,
  or IDEF1X dot / diamond) — as a second row beneath the relationship-type
  colour legend. It appears whenever the **Title & legend block** export setting
  is on (the default) and there are relationships to show.

## [2.26.0] — 2026-09-11

### Added
- **Notation legend on the Diagram.** A small legend (bottom-left of the
  canvas) explains the relationship-notation markers for the notation you have
  selected, and updates live when you switch notation:
  - **Crow's foot** — many (child), one and only one, zero or one.
  - **UML** — `*`, `1`, `0..1` multiplicities.
  - **IDEF1X** — child (many) dot, identifying (solid) vs. non-identifying
    (dashed + hollow diamond) relationships.
  The glyphs mirror the ones drawn on the connectors and follow the active
  theme. The legend can be minimized to a small button, and that state persists
  in the browser like the minimap.

## [2.25.1] — 2026-09-11

### Changed
- **Larger self-referencing (parent/child) loop.** The loop drawn for a table's
  self-referencing lookup (e.g. `parentaccountid` → Account) is bigger and
  rounder, so its notation marker and direction read clearly instead of
  crowding against the card's edge. Stacked self-loops on one table also spread
  further apart.

## [2.25.0] — 2026-09-11

### Added
- **Insights page** — a new tab between Security and Settings that turns the
  loaded `customizations.xml` into a one-page dashboard/report:
  - **Headline metrics** — tables (custom vs standard), columns and average per
    table, relationships (with self-referencing count), custom fields, and, when
    the file carries role metadata, a security summary (roles + field profiles).
  - **Composition charts** — tables by publisher prefix, relationships by
    category, columns by data type (top 10), and columns by requirement level,
    all as theme-aware bars reusing the app's group/relationship colors.
  - **Metadata coverage meters** — share of columns with a display name, a
    description, audit enabled, field-secured, and required.
  - **Ranked lists** — largest tables by column count, most-connected tables by
    business lookups, and tables with no business lookups.
  - **Export** — a **CSV** button downloads the summary metrics, and a
    **Print / PDF** button prints just the report (dedicated print stylesheet).
  The active tab (including Insights) persists across reloads like the rest of
  the app.

## [2.24.2] — 2026-09-11

### Fixed
- **Diagram sidebar search now persists.** The table-search box in the diagram
  sidebar is saved and restored on reload, and — critically — the restored
  filter is now re-applied *after* the sidebar is rebuilt on boot, so the rail
  actually shows the filtered set instead of every table. This was the one
  remaining Diagram/Data Dictionary control that didn't survive a reload; all
  other Data Dictionary settings (column order, widths, per-column filters,
  hidden columns, sort, export options, visibility, search) and Diagram settings
  (positions, visibility, categories, group collapse, theme, viewport, sizes,
  notation, line mode/weight, detail, labels, PNG scale, export title, active
  view, rail/ribbon/minimap state) were confirmed to persist.

### Changed
- **Security permission-column menus honor "Classic icons".** When the Classic
  icons toggle is on, the Access-level checklist in each permission column's ⋯
  menu renders the classic Dynamics access-level pie glyphs instead of the text
  pills, matching the grid.

## [2.24.1] — 2026-09-11

### Fixed
- **Security page fully persists.** The Security **table filter text** is now
  saved and restored like the rest of the page's settings (it was the only
  control that didn't persist). Everything on the page — section (Table
  privileges / Field security), role, privilege, compared roles, field-security
  profile, "with access only", classic icons, search, sort, and column/level/
  table filters — is stored in the browser (`localStorage`) and restored when
  the schema re-opens.

## [2.24.0] — 2026-09-11

### Added
- **Field-level security on the Security page.** When the file's
  `<FieldSecurityProfiles>` carry field permissions, a **Table privileges /
  Field security** switch appears. **Field security** picks a profile and lists
  its **secured columns** with **Create / Read / Update** (Yes / —). The bundled
  sample now ships two demo profiles.
- **Import validation & feedback.** Importing an `.xml` now reports a clear
  message when the file isn't valid XML or isn't a Dynamics 365
  `customizations.xml` (with the parser's reason), and a successful import
  confirms what was loaded — tables, relationships, roles, and field profiles.

### Changed
- The **Security tab** appears only when the file contains security metadata —
  security **roles** and/or **field-security profiles** — and stays hidden
  otherwise.

## [2.23.0] — 2026-09-11

### Added
- **Role comparison view.** A **Single role / Compare** toggle on the Security
  page. In **Compare** mode you pick a **privilege** (Create / Read / … / Share)
  and a set of **roles**, and the grid becomes a **Table × Role** matrix showing
  each role's access level for that privilege — so you can line roles up side by
  side. Honours the table filter, search, "with access only", classic icons, and
  per-column sorting; the mode, privilege, and role selection persist.

### Changed
- The Security column **⋯ menus are right-aligned under their icon**, matching
  the Data Dictionary.

## [2.22.0] — 2026-09-11

### Added
- **Export the Security page.** An **Export…** button opens a dialog to choose
  what to include: **format** (Excel .xlsx / CSV), **roles** (this role, or all
  roles — one worksheet each), **tables** (current filter or all), which
  **privilege columns** (Table logical name + any of the eight verbs), and the
  **access value** form (short "BU/PC" or full name). Choices persist.
- **Tooltips** on **With access only**, **Classic icons**, and each **Access**
  legend level (explaining User / BU / PC / Org scope).

### Changed
- **Condensed the Security toolbar** — the table filter is capped instead of
  stretching full width, and the count, Export button, and legend are grouped
  on the right, removing the large gap.

## [2.21.0] — 2026-09-11

### Added
- **Filter the Security page by table.** The **Table** column's ⋯ menu now has a
  searchable checklist of tables — pick one or more to show only those rows
  (empty = all). The header flags an active table filter, and the choice persists.

### Changed
- **Classic icons match the product.** The pie glyphs are re-oriented to match
  the Dynamics access-level icons: **User** is a quarter centred at the top,
  **BU** is the bottom half, **PC** is filled with a quarter open at the top,
  **Org** is the full disc.

## [2.20.0] — 2026-09-11

### Added
- **Security page column controls.** Each column now has a **⋯** menu — sort
  ascending/descending and (for privilege columns) filter by access level with
  a checklist; the header shows a dot when a column filter is active, and
  clicking a heading sorts by it. Sort + filters persist.
- **Classic icons toggle.** A **Classic icons** switch renders the familiar
  Dynamics pie glyphs (outlined circle → quarter/half/three-quarter wedge →
  full disc) instead of the text pills; choice persists.
- **Demo roles in the sample.** The bundled sample now ships four example roles
  (Salesperson, Sales Manager, Customer Service Rep, Read Only) so the Security
  tab is visible without importing a file.

### Changed
- Security access level **Deep** is now labelled **PC** (Parent: Child).
- The Security **access legend** hides on narrow screens so the toolbar stays tidy.

## [2.19.0] — 2026-09-11

### Added
- **Security page.** When the imported `customizations.xml` includes security
  role metadata (a `<Roles>` block), a new **Security** tab appears. Pick a
  role and see its **table privileges** as a grid — one row per table, columns
  for **Create / Read / Write / Delete / Append / Append To / Assign / Share**,
  each cell showing the access level (**User / BU / Deep / Org**) as a
  colour-coded pill; blank means no privilege. Includes a role picker, a table
  filter, a "with access only" toggle, a level legend, and a table count.
  Privileges are matched to tables in the model (miscellaneous / non-entity
  privileges are ignored); levels accept both the word form
  (Basic/Local/Deep/Global) and the numeric depth mask (1/2/4/8). The tab stays
  hidden for files without role metadata (including the bundled sample).

## [2.18.0] — 2026-09-11

### Changed
- **Sample schema now uses standard Dynamics 365 entities.** Replaced the
  custom `cff_*` demo tables (Project, Project Task, Stage, Industry) with
  out-of-the-box entities — **Account, Contact, User, Business Unit, Lead,
  Opportunity, Opportunity Product, Product, Case** — and removed the custom
  `cff_industryid` lookup from Account. The bundled demo now shows a familiar
  Sales/Service model (9 tables, all Standard / System, no custom prefix).

## [2.17.4] — 2026-09-11

### Changed
- **Data dictionary menu icon.** The table card's ⋯ menu now shows a small
  table icon (rather than a dots glyph) next to **Data dictionary**, and the
  trailing "…" was dropped from the label.

## [2.17.3] — 2026-09-11

### Changed
- **Version shown at the top-right of Settings.** The `D365 ERD Builder vX ·
  changelog` line now sits in the Settings page header (top-right, beside the
  "Settings" title) instead of at the bottom of the Data source card.

## [2.17.2] — 2026-09-11

### Changed
- **Compact column-menu buttons.** The column filter menu's footer buttons are
  now **Clear** and **Remove** (dropping the redundant "column"), each with a
  small icon — a reset arrow for Clear, an eye-off for Remove.

## [2.17.1] — 2026-09-11

### Added
- **Remove a column from its own filter menu.** A column's **⋯** menu now has a
  **Remove column** button beside **Clear column**; it hides the column (a
  removed column is restored from the **Columns** menu). The Columns chooser now
  lists **every** column — base columns as well as the optional metadata ones —
  so any column can be toggled off and back on. The last visible column can't be
  removed. Works on the main Data Dictionary tab and in the per-table dialog.

## [2.17.0] — 2026-09-11

### Added
- **The per-table Data Dictionary dialog is now the full grid.** Opening a
  table's **Data dictionary…** from its card menu gives the same column controls
  as the main Data Dictionary tab: click a heading to **sort**, use each
  column's **⋯** to **filter**, **drag** a heading to reorder, drag its right
  edge to **resize** (double-click to reset), and a **Columns** button to add
  the optional **metadata columns** (max length, required, audit enabled, …)
  when the file carries them. Column layout, sort, and filters are shared with
  the main tab, so the dialog is simply that dictionary focused on one table
  (its redundant *Table* column is hidden). A **Clear filters** button and the
  live column count round out the toolbar.

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
