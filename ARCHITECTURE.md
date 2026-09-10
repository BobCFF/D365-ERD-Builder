# Architecture — D365 ERD Builder

A single, self-contained static page that parses a Dynamics 365 / Dataverse
`customizations.xml` **entirely in the browser** and renders an interactive
entity-relationship diagram. No backend, no build step at runtime, no network
calls. Deployed to Vercel (`cff7/d365-erd-builder`) at
https://d365-erd-builder-five.vercel.app/ via merge-to-`main`.

> Read this file first when working on the project — it maps the code by
> concept so you don't have to scan the ~270 KB `index.html`.

## Repository layout

```
index.html                     # THE deployed app — a single generated file (~270 KB)
examples/sample-customizations.xml
README.md  CHANGELOG.md
```

### ⚠️ The source files are NOT in this repo (tech-debt #1)

`index.html` is **generated** by concatenating separate source files with a
Python script. Those sources currently live only in a Claude Code session
scratchpad, so the repo ships a build artifact with no reproducible source.
Anyone editing today must hand-edit the 270 KB single file. **First
maintenance task: commit the sources** (see `TODO.md` P0-1). Intended layout:

```
src/
  d365-body.txt     # <body> markup (landing + #app shell); has <!--SAMPLE--> placeholder
  d365-css.txt      # <title> + <style> (has /*FONTFACE*/ placeholder)
  d365-js.txt       # all app logic (IIFE-ish; wrapped by startApp)
  fontface.css      # @font-face with base64 woff2 (Archivo, IBM Plex Mono)
  sample.xml        # bundled demo schema (7 tables)
build-d365.py       # assembles src/* -> index.html
```

`build-d365.py` does: read the four sources, inline `fontface.css` into the
`/*FONTFACE*/` marker and `sample.xml` into the `<!--SAMPLE-->` marker, wrap in
`<!doctype html><html><head>{css}</head><body>{body}<script>{js}</script>`,
write `index.html`. (It asserts the sample contains no `</script>`.)

## Runtime model

Everything runs in one module scope. Startup:

1. `boot()` (async IIFE) — `applySavedTheme()` (paints theme pre-app, no flash),
   then reads any imported schema from **IndexedDB** with a 2 s timeout race.
   If found → `startApp(model, true, meta)`; else → `initLanding()`.
2. `initLanding()` wires the upload/drop landing (`#landing`) and the
   "Explore a sample" link.
3. `startApp(MODEL, isImported, importMeta)` **wraps the entire app** — all
   diagram/dictionary/settings logic and its event wiring live inside this
   function's closure. It runs once, when a schema is chosen.

## Data model (from the parser)

`parseCustomizationsXml(text)` → `{ entities, relationships }` using `DOMParser`
(`application/xml`; browser DOMParser does not resolve external entities → no
XXE). Shapes:

- `entities[logical] = { logical, display, group, attributes:[ {name,type,required,display,desc, pk?, fk?, biz?, targets?[] } ] }`
- `relationships[] = { name,type,referenced,referencing,attr,label, cat }` where
  `cat` ∈ `business | ownership | audit | portal | generic` (from `catFn`).
- `O2M` = relationships filtered to `OneToMany` with both ends present.
- PK detection: attribute named `<entity>id` or `activityid`. FK: attributes
  that are the `ReferencingAttributeName` of a OneToMany. `biz` marks
  business-category FKs.
- Grouping: by publisher prefix (`prefixOf`) → dynamic groups + `Standard/System`
  (`__std`). Group colors map to CSS vars via `GVAR` / `PALETTE`.

## Function map (by concept — names are stable across builds)

| Area | Key functions / symbols |
|------|------------------------|
| Parse | `parseCustomizationsXml`, `catFn` |
| Persistence | IndexedDB: `idbOpen/idbGet/idbSet/idbDel` (`tdp-erd-db`); UI state: `loadState/saveState` in `localStorage['d365-erd-v1']`; `saveViewSoon` (400 ms debounce) |
| Boot / landing | `boot`, `initLanding`, `loadSampleSchema`, `importFromLanding`, `startApp` |
| Transform / camera | `curT {x,y,k}`, `applyT`, `zoomAt`, `fit`; wheel + `#zin/#zout` |
| Pointer (mouse) | stage `mousedown`/window `mousemove`/`mouseup`; `pan`, `dragN`; `startDrag/endDrag` |
| Pointer (touch) | stage `touchstart/move/end` (pinch via `pinch`, `_dist`); `onTouchDrag(el,{start,move,end})` helper for handles |
| Nodes / cards | `buildNode`, `refreshNode`, `cardHTML`, `nodeMeasure`, `place`, `wireNode`; per-card detail `detailOf/setDetail`; card ⋯ menu `openCardMenu` |
| Edges | `edgeList`, `buildEdges` (S-curve slotting + straight/curved + self-loops), `insetEnds` (marker gap), `drawLinks`; markers `markerDefs` (`MK_CF/MK_ONEM/MK_ONEO`) |
| Layout | `forceLayout` (grid seed + 360-iter relax), `arrange` button |
| Sidebar | `buildSidebar`, `toggleEntity`, `setVisible`, `syncCheckboxes`, relationship-category checkboxes |
| Minimap | `mmCompute/mmDrawNodes/mmDrawView/mmRender/mmSchedule`, `mmPanTo`, `mmApplyDock`, `applyMinimap`; state `minimapCollapsed`, `mmPos` |
| Data Dictionary | `buildDict`, `dictFiltered`, `dictCell`, `renderDict`; per-column model `DCOLDEF/dcolOrder/dcolW/dcolF`; menu `openDMenu/dmenuHTML/wireDMenu`; header interactions in `wireDictHead` (sort/menu/resize/drag-reorder, mouse + touch) |
| Export | `openExportDialog/runExport`; CSV (`csvCell`); XLSX writer `buildXlsx/zipStore/crc32/sheetXml/xmlEsc/colLetter`; SVG/PNG `exportSVG/nodeSVG/svgToPng`; `saveFile` (claude downloads → Blob+anchor) |
| Modals / menus | `openModal/closeModal` (`#modal`), `openFloatMenu/closeFloatMenu` (`.floatmenu`), entity dialog `openEntityDict` |
| Theme | `THEMES` (7), `themeMeta/currentDark`, `applyTheme`, `cycleTheme`, `recolorMarkers`, `buildThemeSwatches`; palettes in CSS `:root[data-theme="…"]` |
| Mobile help | `GESTURES`, `openGestureHelp`; `#gestureHelp` button; one-time `gestureSeen` |
| Rail (panel) | `applyRail`, `railW/railCollapsed`; `#railCollapse` "<" / `#railReopen` ">"; `isMobile()` gate |

## Persistence keys

- `localStorage['d365-erd-v1']` — UI state object (`saveState`): `pos, vis,
  cardState, cats, gc, theme, vp, sizes, notation, lineMode, defaultDetail,
  labelsMode, pngScale, exportTitle, view, railW, railCollapsed, minimapCollapsed,
  mmPos, gestureSeen, dcolOrder, dcolW, dcolF`.
- IndexedDB `tdp-erd-db` store `kv` key `import` — `{ xml, meta }` (the imported
  file text; can be large). `revertBuiltIn()` clears both and reloads.

## Deploy / release workflow

1. Edit sources in the scratchpad, `python3 build-d365.py` → writes
   `/home/user/d365-erd-builder/index.html`.
2. Bump version in **three** places (kept in lockstep): `APP_VERSION` in the JS,
   `.lver` in the body, and a `CHANGELOG.md` entry. README "New in" optional.
3. Branch from latest `origin/main`, copy the built `index.html`, commit, push,
   open a PR, **squash-merge to `main`** — Vercel auto-deploys `main` to the
   production URL. Confirm via the Vercel bot's "Ready" PR comment.

## Non-goals / constraints

- **Self-contained**: no external scripts, styles, fonts, or fetches. Keep it
  that way (privacy + offline + CSP-friendly). No dependency was added even for
  XLSX — see the hand-rolled ZIP writer.
- All Graph/Dataverse specifics are irrelevant here — this app only reads an
  exported solution file; it never talks to Dataverse.
