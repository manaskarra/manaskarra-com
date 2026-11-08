import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../public/demos/magenta-wsp/", import.meta.url));
const page = fs.readFileSync(path.join(root, "index.html"), "utf8");
const jsonBlock = id => JSON.parse(page.match(new RegExp(`<script id="${id}" type="application/json">(.*?)</script>`, "s"))[1]);

test("hosted release files retain their recorded hashes", () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
  for (const [name, expected] of Object.entries(manifest.files)) {
    const bytes = fs.readFileSync(path.join(root, name));
    assert.equal(bytes.length, expected.bytes, name);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), expected.sha256, name);
  }
});

test("friendly demo route resolves assets and embedded document links", () => {
  const documents = jsonBlock("document-data");
  for (const markup of [page, ...Object.values(documents).map(document => document.html)]) {
    for (const [, target] of markup.matchAll(/\b(?:href|src)="([^"\s]+)"/g)) {
      const url = new URL(target.replaceAll("&amp;", "&"), "https://manaskarra.com/projects/magenta-wsp");
      if (url.origin !== "https://manaskarra.com") continue;
      if (url.pathname.startsWith("/demos/magenta-wsp/")) {
        assert.ok(fs.existsSync(path.join(root, decodeURIComponent(url.pathname.slice("/demos/magenta-wsp/".length)))), target);
      } else {
        assert.ok(["/blog/magenta-wsp", "/blog/magenta-wsp/piano-flute.jpg", "/projects/magenta-wsp"].includes(url.pathname), target);
      }
      const doc = new URLSearchParams(url.hash.slice(1)).get("doc");
      if (doc) assert.ok(Object.hasOwn(documents, doc), target);
    }
  }
  assert.match(page, /data-asset-base="\/demos\/magenta-wsp\/"/);
  for (const example of jsonBlock("demo-data")) {
    for (const clip of Object.values(example.clips)) assert.ok(fs.existsSync(path.join(root, clip.src)), clip.src);
  }
  assert.match(page, /href="https:\/\/manaskarra.com\/blog\/magenta-wsp"/);
  assert.match(page, /name="twitter:card" content="summary_large_image"/);
});
