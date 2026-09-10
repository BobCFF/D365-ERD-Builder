# Privacy

**Short version: your schema never leaves your browser.** D365 ERD Builder is a
single static page that parses and renders your `customizations.xml` entirely on
your device. There is no backend, no account, and no tracking.

## What the app does with your data

- **Parsing & rendering:** 100% client-side (in-browser JavaScript). The uploaded
  `customizations.xml` is read with the browser's `FileReader` — it is **never**
  transmitted anywhere.
- **No network calls:** the page makes no `fetch`/XHR/WebSocket/beacon requests.
  Its Content-Security-Policy sets `connect-src 'none'`, so the app *cannot* send
  your data off the page even if it tried. No analytics, no cookies, no
  third-party scripts or fonts.
- **Exports** (PNG / SVG / CSV / XLSX) are generated in the browser and saved via
  a normal browser download. They are not uploaded.

## What is stored, and where

All storage is **local to your browser** and never leaves it:

- **`localStorage`** (`d365-erd-v1`): your UI preferences and layout — theme,
  positions/sizes, visible tables, column settings, etc.
- **`IndexedDB`** (`tdp-erd-db`): the text of a `customizations.xml` you import,
  so it reopens automatically next time. The bundled *sample* schema is **not**
  stored.

Because an imported file persists locally, on a **shared or public computer** the
next person could reopen it. Clear it any time with **Settings → Reset** (or the
"forget this file" control), which deletes both the localStorage state and the
IndexedDB copy. Clearing your browser's site data for this origin also removes
everything.

## Hosting

The app is served as static files by Vercel. Like any web host, Vercel may log
standard request metadata (IP address, timestamp, user agent) for delivery and
abuse-prevention — this is transport-level and unrelated to your schema, which
never reaches the server. See Vercel's privacy documentation for details.

## Your responsibility

Solution files can contain commercially sensitive table/column names and
descriptions. Since everything stays local, treat your browser profile
accordingly and clear stored data on shared machines.

## Contact / changes

This is an open-source tool (MIT — see `LICENSE`). Material changes to data
handling will be noted in `CHANGELOG.md`.
