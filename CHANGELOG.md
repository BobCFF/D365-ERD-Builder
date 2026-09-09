# Changelog

All notable changes to **D365 ERD Builder** are recorded here. The version shown
on the page (bottom of the sidebar and on the upload screen) matches the latest
released version below.

The format follows [Keep a Changelog](https://keepachangelog.com/), and the
project uses [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

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
