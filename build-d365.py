#!/usr/bin/env python3
"""Build the self-contained index.html from src/.

Usage: python3 build-d365.py
Reads src/{d365-css,d365-body,d365-js}.txt + src/fontface.css + src/sample.xml,
inlines the font faces and the sample schema, wraps in a minimal HTML skeleton,
and writes index.html next to this script. No external tooling required.
"""
import os

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

    css = css.replace("/*FONTFACE*/", ff)
    body = body.replace("<!--SAMPLE-->", sample)

    html = (
        "<!doctype html>\n<html lang=\"en\">\n<head>\n"
        "<meta charset=\"utf-8\">\n"
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n"
        + css + "\n</head>\n<body>\n"
        + body + "\n<script>\n" + js + "\n</script>\n</body>\n</html>\n"
    )

    out = os.path.join(ROOT, "index.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print("built index.html bytes:", len(html))


if __name__ == "__main__":
    main()
