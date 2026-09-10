# D365 ERD Builder

Upload a Dynamics 365 / Dataverse solution **`customizations.xml`** and get an
interactive entity-relationship diagram — drag tables around, follow lookups,
toggle relationship categories, and export the result to PNG or SVG.

It's a single, self-contained static page (`index.html`). There is no backend and
no build step: **the XML is parsed and rendered entirely in your browser**, so your
schema never leaves your machine.

## New in 2.5.0

- The **minimap is draggable** (drag its header; double-click to reset) and keeps
  the view in frame at any zoom.
- **Mobile fixes** — the "> " open-panel button replaces the hamburger, and hiding
  the panel no longer makes the diagram disappear.

## New in 2.4.0

- **Minimap** — a collapsible **Overview** panel with a live viewport rectangle;
  click or drag inside it to pan the diagram.

## New in 2.3.0

- **A ⋯ menu on every diagram table** — open a **data-dictionary dialog** for
  that table, jump to the Data Dictionary tab filtered to it, switch its detail
  level, or hide it.
- **Export dialog** — choose format (**Excel `.xlsx`** or CSV), which columns to
  include, and the row scope. Excel export can put **each table on its own
  worksheet** (with an Overview sheet), generated entirely in the browser.

## New in 2.2.0

- **Data Dictionary columns are now yours to arrange** — a per-column **⋯** menu
  with filters matched to each column's data type, **drag-to-reorder** headings,
  and **drag-to-resize** widths. Order, widths and filters all persist across
  refreshes.

## New in 2.0.0

- **Data Dictionary** — a searchable, sortable table of every column, with CSV export.
- **Settings** — theme, card density, edge-label mode, PNG scale, and an optional
  title + legend block on exports.
- **S-curve** connectors and **mandatory / optional** cardinality on the one-end
  (double bar vs circle; `1` vs `0..1` in UML mode).
- **Persistent imports** via IndexedDB — a loaded schema reopens on refresh.
- Resizable tables, a top ribbon for arrange/style controls, and embedded fonts
  in PNG / SVG exports.

See [CHANGELOG.md](CHANGELOG.md) for the full list.

## Use it

- **Locally:** open `index.html` in any modern browser (or serve the folder with
  `python3 -m http.server` and visit it).
- **Hosted:** publish this repo with GitHub Pages, Vercel, Netlify, or any static
  host — just point it at `index.html`.

Then drop your `customizations.xml` onto the page (or click *Explore a sample
schema* to try it without a file).

## Getting `customizations.xml`

1. In **Power Apps** (make.powerapps.com), create or open a **solution** that
   contains the tables you want to diagram.
2. **Export** the solution (Unmanaged is fine).
3. **Unzip** the downloaded `.zip` — inside you'll find `customizations.xml`.
4. Upload that file. (Upload the `.xml`, not the `.zip`.)

The diagram reflects exactly what the export contains: if a table or relationship
isn't included in the solution, it won't appear in the ERD.

## Features

- **In-browser XML parsing** — reads entities, attributes (type, required level,
  display name, description) and `OneToMany` relationships from the solution file.
- **PK / FK detection** — primary keys and lookup foreign keys are badged, with the
  lookup target table shown inline (`→ Company`).
- **Dynamic grouping** — tables are grouped by their publisher prefix (e.g. all
  `cff_*` tables) plus a *Standard / System* group, each with its own colour.
- **Relationship categories** — business lookups, ownership, created/modified-by,
  portal (`adx_` / `mspp_`), and generic/activity-party links can each be toggled
  on or off. Only business lookups are shown by default.
- **Interactive canvas** — pan, zoom, drag and resize cards, auto-arrange
  (force-directed layout), fit-to-view, expand/collapse columns, and search.
- **Crow's-foot or UML** notation, straight or curved connectors.
- **Light / dark theme**, and your layout is remembered per-schema via
  `localStorage`.
- **Export** the current view to **PNG** or **SVG**.

## How it maps the XML

| ERD concept        | Source in `customizations.xml`                                             |
|--------------------|-----------------------------------------------------------------------------|
| Table              | `Entities/Entity/EntityInfo/entity` (logical name from `@Name`)             |
| Table display name | `Entity/Name@LocalizedName`, falling back to the entity's localized names   |
| Column             | `entity/attributes/attribute` (`LogicalName`, `Type`, `RequiredLevel`, …)   |
| Primary key        | attribute of type `primarykey` (or `<entity>id`)                            |
| Foreign key        | lookup / customer / owner attributes                                        |
| Relationship       | `EntityRelationship` with `EntityRelationshipType = OneToMany`              |
| Lookup target      | the `ReferencedEntityName` of that relationship                             |

Tag casing is matched case-insensitively, so exports from different platform
versions parse the same way.

## Acknowledgements

The visual explorer is modelled on the standalone `erd-explorer.html` schema viewer;
this project generalises it so that the schema is built at runtime from any uploaded
solution file rather than being baked in.
