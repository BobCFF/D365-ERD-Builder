# Third-party licenses

D365 ERD Builder's own code is under the MIT License (see `LICENSE`). It also
**bundles and redistributes** two typefaces — embedded as base64 `@font-face`
data in `index.html` **and** baked into PNG/SVG exports. Those fonts are covered
by their own license, reproduced below and in `licenses/OFL-1.1.txt`.

## Fonts — SIL Open Font License, Version 1.1

Full license text: [`licenses/OFL-1.1.txt`](licenses/OFL-1.1.txt) ·
canonical copy & FAQ: <https://openfontlicense.org>

| Font | Copyright | Reserved Font Name |
|------|-----------|--------------------|
| **Archivo** | Copyright © 2018 The Archivo Project Authors (<https://github.com/Omnibus-Type/Archivo>) | "Archivo" |
| **IBM Plex Mono** | Copyright © 2017 IBM Corp. | "Plex" |

Both fonts are used unmodified and under their original names, which the OFL
permits (embedding/bundling is allowed; only *modified* versions may not reuse
the Reserved Font Name). This notice + the license text accompany the fonts to
satisfy OFL §2. If you re-export or redistribute artifacts from this app that
contain the embedded fonts, keep this attribution with them.

## Runtime / build dependencies

- **Runtime:** none. The app ships as a single self-contained `index.html` with
  no third-party JavaScript, no CDN, and no network calls.
- **Build:** Python 3 standard library only (`build-d365.py`).
- **Tests (dev only):** [Playwright](https://playwright.dev) (Apache-2.0) — a
  devDependency; not shipped to users.
