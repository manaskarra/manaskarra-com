import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import test from "node:test";

const html = fs.readFileSync(new URL("../public/explainers/magenta-wsp/index.html", import.meta.url), "utf8");
const scripts = [...html.matchAll(/<script(?: [^>]*)?>(.*?)<\/script>/gs)].map(match => match[1]);
for (const script of scripts) new vm.Script(script);
const math = vm.runInNewContext(scripts[0] + "\nWSP");
function close(actual, expected) {
  assert.equal(actual.length, expected.length);
  actual.forEach((value, i) => assert.ok(Math.abs(value - expected[i]) < 1e-12, value + " != " + expected[i]));
}

test("the toy calibration and direction agree with the stated examples", () => {
  assert.equal(math.weightedSum(1, 2, 2, 3), 8);
  close(math.travel(0), [2, 1]);
  close(math.travel(1), [1, 3]);
  assert.equal(math.dot(math.presets.piano, math.gate), 1);
  assert.equal(math.dot(math.presets.guitar, math.gate), 0);
  assert.equal(math.dot(math.presets.flute, math.gate), 0);
  const inputDifference = math.presets.flute.map((v, i) => v - math.presets.piano[i]);
  close(math.multiply(inputDifference, math.original), [-1, 2]);
});

test("the saved matrix and expanded calculation agree across inputs and strengths", () => {
  const inputs = [...Object.values(math.presets), [2, -1.7, 0.3], [-2, 2, -2], [0, 0, 0]];
  for (const x of inputs) {
    for (const alpha of [0, 0.1, 1, 1.4, 2]) {
      const result = math.edit(x, alpha);
      close(result.direct, result.expanded);
      assert.ok(result.error < 1e-12);
      if (alpha === 0) close(result.direct, result.base);
    }
  }
});

test("the example retargets piano, preserves controls, and reverses for a negative gate", () => {
  close(math.edit(math.presets.piano, 1).direct, math.multiply(math.presets.flute, math.original));
  for (const name of ["guitar", "flute"]) {
    const result = math.edit(math.presets[name], 1.4);
    close(result.direct, result.base);
  }
  const negative = math.edit(math.presets.negative, 1.4);
  assert.equal(negative.score, -0.5);
  close(negative.shift, [0.7, -1.4]);
  assert.equal(math.format(-1e-8), "0");
});

test("the examples need no external scripts and all chapter links and labels resolve", () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, "Duplicate IDs");
  for (const [, id] of html.matchAll(/(?:href="#|for=")([^"]+)"/g)) assert.ok(ids.includes(id), id);
  assert.doesNotMatch(html, /<(?:script|img)[^>]+src="https?:/);
  assert.equal((html.match(/class="chapter"/g) || []).length, 12);
});


test("the explainer is linked after the article and in the demo footer", () => {
  const root = new URL("../", import.meta.url);
  const blog = fs.readFileSync(new URL("content/posts/magenta-wsp.mdx", root), "utf8");
  const demo = fs.readFileSync(new URL("public/demos/magenta-wsp/index.html", root), "utf8");
  const config = fs.readFileSync(new URL("next.config.ts", root), "utf8");
  const route = "/projects/magenta-wsp/explained";
  assert.ok(blog.lastIndexOf(route) > blog.indexOf("## What I checked"));
  assert.ok(demo.match(/<footer[^>]*>(.*?)<\/footer>/s)?.[1].includes(route));
  assert.match(config, /source: "\/projects\/magenta-wsp\/explained", destination: "\/explainers\/magenta-wsp\/index.html"/);
  assert.match(html, /href="https:\/\/manaskarra.com\/blog\/magenta-wsp"/);
  assert.match(html, /href="https:\/\/manaskarra.com\/projects\/magenta-wsp"/);
  assert.match(html, /rel="icon" type="image\/svg\+xml" href="\/icon.svg"/);
});
