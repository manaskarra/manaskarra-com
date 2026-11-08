// Import a verified release from a clean magenta-wsp checkout.
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const prefix = "/demos/magenta-wsp/";
const output = path.join(root, "public", prefix);
if (process.argv.length !== 3) throw new Error("Usage: node scripts/sync-magenta-demo.mjs /path/to/magenta-wsp");
const source = path.resolve(process.argv[2]);
const git = (...args) => execFileSync("git", ["-C", source, ...args], { encoding: "utf8" }).trim();
if (git("status", "--porcelain")) throw new Error("Commit the source release before importing it.");
const revision = git("rev-parse", "HEAD");
const manifest = JSON.parse(fs.readFileSync(path.join(source, "manifest.json"), "utf8"));
const hash = data => createHash("sha256").update(data).digest("hex");
const files = new Map();

// Validate the entire input before replacing the hosted snapshot.
for (const [name, expected] of Object.entries(manifest.files)) {
  if (name.startsWith(".")) continue;
  const filename = path.resolve(source, name);
  if (!filename.startsWith(source + path.sep)) throw new Error(`Invalid release path: ${name}`);
  const bytes = fs.readFileSync(filename);
  if (bytes.length !== expected.bytes || hash(bytes) !== expected.sha256) {
    throw new Error(`Release checksum mismatch: ${name}`);
  }
  files.set(name, bytes);
}

const assetLinks = html => html.replace(/\b(href|src)="([^"\s]+)"/g, (match, attribute, url) => {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(url)) return match;
  return `${attribute}="${prefix}${url}"`;
});
let html = files.get("index.html").toString();
const documentPattern = /(<script id="document-data" type="application\/json">)(.*?)(<\/script>)/s;
const documentMatch = html.match(documentPattern);
if (!documentMatch) throw new Error("Missing embedded documentation.");
const documents = JSON.parse(documentMatch[2]);
for (const document of Object.values(documents)) document.html = assetLinks(document.html);
const serialized = JSON.stringify(documents).replaceAll("<", "\\u003c").replaceAll(">", "\\u003e").replaceAll("&", "\\u0026");
html = html.replace(documentPattern, (_, start, _body, end) => start + serialized + end);
if (!html.includes('data-asset-base=""')) throw new Error("Unexpected demo asset base.");
html = assetLinks(html.replace('data-asset-base=""', `data-asset-base="${prefix}"`));
files.set("index.html", Buffer.from(html));
files.set("source.json", Buffer.from(JSON.stringify({
  repository: "https://github.com/manaskarra/magenta-wsp",
  revision,
  note: "Hosted snapshot. Only HTML asset paths and the file manifest are adapted for this site.",
}, null, 2) + "\n"));
manifest.files = Object.fromEntries([...files].map(([name, bytes]) => [name, { bytes: bytes.length, sha256: hash(bytes) }]));
files.set("manifest.json", Buffer.from(JSON.stringify(manifest, null, 2) + "\n"));

// This directory is managed by this importer; keep source edits in magenta-wsp.
fs.rmSync(output, { recursive: true, force: true });
for (const [name, bytes] of files) {
  const filename = path.join(output, name);
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, bytes);
}
console.log(`Imported ${files.size} files from magenta-wsp ${revision.slice(0, 7)}.`);
