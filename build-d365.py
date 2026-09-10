#!/usr/bin/env python3
"""Build the self-contained index.html from src/.

Usage: python3 build-d365.py
Reads src/{d365-css,d365-body,d365-js}.txt + src/fontface.css + src/sample.xml,
inlines the font faces and the sample schema, injects a strict Content-Security-
Policy whose script-src carries the sha256 hash of the (single) inline script,
wraps in a minimal HTML skeleton, and writes index.html next to this script.
No external tooling required.

The hashed script-src lets our one inline <script> run while blocking every other
inline script AND injected inline event handlers (e.g. a malicious display name
that tries `" onmouseover=...`), so it is defense-in-depth for the XSS class.
frame-ancestors and the other transport headers live in vercel.json.
"""
import base64
import hashlib
import os

# Single source of truth for the version shown on the page. The sources carry
# the literal `__APP_VERSION__` placeholder (in `APP_VERSION` and `.lver`); the
# build stamps this value into both, so the version lives in exactly one place.
# Bump this + add a CHANGELOG.md entry for each release.
VERSION = "2.13.3"

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")


def read(name):
    with open(os.path.join(SRC, name), encoding="utf-8") as f:
        return f.read()


def main():
    css = read("d365-css.txt")
    body = read("d365-body.txt")
    js = read("d365-js.txt")
    ff = read("fontface.css")
    sample = read("sample.xml")

    assert "/*FONTFACE*/" in css, "fontface placeholder missing in d365-css.txt"
    assert "<!--SAMPLE-->" in body, "sample placeholder missing in d365-body.txt"
    assert "</script>" not in sample, "sample.xml must not contain </script>"
    assert "__APP_VERSION__" in js, "version placeholder missing in d365-js.txt"
    assert "__APP_VERSION__" in body, "version placeholder missing in d365-body.txt"

    css = css.replace("/*FONTFACE*/", ff)
    body = body.replace("<!--SAMPLE-->", sample)
    # Stamp the single-source version into both the script and the sidebar label.
    js = js.replace("__APP_VERSION__", VERSION)
    body = body.replace("__APP_VERSION__", VERSION)

    # The <script> element's exact text content, used both for the tag and its hash.
    script_content = "\n" + js + "\n"
    digest = hashlib.sha256(script_content.encode("utf-8")).digest()
    script_hash = "sha256-" + base64.b64encode(digest).decode("ascii")

    # Strict CSP. No 'unsafe-inline' for scripts -> injected inline handlers are
    # blocked; our own script runs via its hash. Inline styles are allowed
    # (style attributes can't be hashed cleanly and are not a script vector, and
    # connect-src 'none' removes any exfiltration path). Fonts + the SVG->PNG
    # image are data: URIs. Nothing is fetched from the network.
    csp = (
        "default-src 'none'; "
        f"script-src '{script_hash}'; "
        "style-src 'unsafe-inline'; "
        "img-src data: blob:; "
        "font-src data:; "
        "connect-src 'none'; "
        "base-uri 'none'; "
        # frame-ancestors is ignored in a <meta> CSP (browsers warn); it is
        # enforced as a real header via vercel.json instead.
        "form-action 'none'"
    )
    csp_meta = f'<meta http-equiv="Content-Security-Policy" content="{csp}">\n'

    html = (
        "<!doctype html>\n<html lang=\"en\">\n<head>\n"
        "<meta charset=\"utf-8\">\n"
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n"
        + csp_meta
        + css + "\n</head>\n<body>\n"
        + body + "\n<script>" + script_content + "</script>\n</body>\n</html>\n"
    )

    out = os.path.join(ROOT, "index.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print("built index.html bytes:", len(html))
    print("script-src hash:", script_hash)


if __name__ == "__main__":
    main()
