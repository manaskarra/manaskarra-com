import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import { chromium } from "playwright";

const baseURL = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const track = {
  title: "Trance (with Travis Scott & Young Thug)",
  artist: "Metro Boomin",
  url: "https://www.last.fm/music/Metro+Boomin/_/Trance",
};
const available = { available: true, track };
let browser;

before(async () => { browser = await chromium.launch({ channel: "chromium" }); });
after(async () => { await browser?.close(); });

async function open(t, response = available, options = {}) {
  const context = await browser.newContext(options);
  t.after(() => context.close());
  const page = await context.newPage();
  await page.route("**/api/top-track", route => route.fulfill({ json: response }));
  const received = page.waitForResponse("**/api/top-track");
  await page.goto(baseURL);
  await received;
  return page;
}

function card(page) {
  return page.getByRole("complementary", { name: "Weekly listening pick" });
}

describe("weekly listening card", { concurrency: true }, () => {
  it("waits four seconds, then shows the track outside the sidebar", async t => {
    const page = await open(t);
    await page.waitForTimeout(2500);
    assert.equal(await card(page).count(), 0);
    assert.equal(await page.getByText("Loading weekly chart…").count(), 0);
    await card(page).waitFor({ state: "visible" });
    assert.equal(await card(page).getByText(track.title).count(), 1);
    assert.equal(await card(page).getByText(track.artist).count(), 1);
    assert.equal(await page.locator("#workspace-sidebar .listening-card").count(), 0);
    assert.equal(await card(page).getByRole("link").getAttribute("href"), "https://www.last.fm/user/manask_");
    const bounds = await card(page).boundingBox();
    assert.ok(bounds.y >= 0 && bounds.y + bounds.height <= 64, "widget stays inside the top toolbar");
    assert.ok(bounds.width <= 270 && bounds.height <= 60, "widget remains compact even with a long title");
    await page.getByRole("heading", { name: "Experience", exact: true }).scrollIntoViewIfNeeded();
    const scrolled = await card(page).boundingBox();
    assert.ok(scrolled.y >= 0 && scrolled.y + scrolled.height <= 64, "widget remains at the top while scrolling");
  });

  it("stays hidden beyond the delay until a slow response is ready", async t => {
    const context = await browser.newContext();
    t.after(() => context.close());
    const page = await context.newPage();
    let release;
    const pending = new Promise(resolve => { release = resolve; });
    await page.route("**/api/top-track", async route => {
      await pending;
      await route.fulfill({ json: available });
    });
    await page.goto(baseURL);
    await page.waitForTimeout(4500);
    assert.equal(await card(page).count(), 0);
    assert.equal(await page.getByText("Loading weekly chart…").count(), 0);
    release();
    await card(page).waitFor({ state: "visible" });
  });

  for (const [name, response] of [
    ["an unavailable chart", { available: false, track: null }],
    ["an invalid track", { available: true, track: { title: " ", artist: "", url: "" } }],
  ]) {
    it(`stays hidden for ${name}`, async t => {
      const page = await open(t, response);
      await page.waitForTimeout(4500);
      assert.equal(await card(page).count(), 0);
      assert.equal(await page.getByText("Loading weekly chart…").count(), 0);
    });
  }

  it("stays hidden when the request fails", async t => {
    const context = await browser.newContext();
    t.after(() => context.close());
    const page = await context.newPage();
    await page.route("**/api/top-track", route => route.abort());
    await page.goto(baseURL);
    await page.waitForTimeout(4500);
    assert.equal(await card(page).count(), 0);
  });

  it("supports keyboard dismissal and remembers it after reloading", async t => {
    const page = await open(t);
    await card(page).waitFor({ state: "visible" });
    const close = card(page).getByRole("button", { name: "Dismiss weekly listening pick" });
    await close.focus();
    await close.press("Enter");
    assert.equal(await card(page).count(), 0);
    await page.reload();
    await page.waitForTimeout(4500);
    assert.equal(await card(page).count(), 0);
  });

  it("fits a small mobile screen and honors reduced motion", async t => {
    const page = await open(t, available, { viewport: { width: 320, height: 640 }, reducedMotion: "reduce" });
    await card(page).waitFor({ state: "visible" });
    const bounds = await card(page).boundingBox();
    assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= 320);
    assert.ok(bounds.y >= 0 && bounds.y + bounds.height <= 640);
    const header = await page.locator(".workspace-mobile-header").boundingBox();
    const main = await page.locator("main").boundingBox();
    assert.ok(bounds.y >= header.y + header.height, "widget does not cover mobile navigation");
    assert.ok(bounds.y + bounds.height <= main.y, "widget does not cover page content");
    const close = await card(page).getByRole("button").boundingBox();
    assert.ok(close.width >= 44 && close.height >= 44);
    assert.equal(await card(page).evaluate(element => getComputedStyle(element).animationName), "none");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.getByRole("link", { name: "Work", exact: true }).click();
    const section = await page.getByRole("heading", { name: "Experience", exact: true }).boundingBox();
    assert.ok(section.y >= 125, "anchor navigation keeps headings below both mobile bars");
    await card(page).getByRole("link").focus();
    await page.keyboard.press("Escape");
    assert.equal(await card(page).count(), 0);
  });

  it("can still be shown and dismissed when browser storage is blocked", async t => {
    const context = await browser.newContext();
    t.after(() => context.close());
    await context.addInitScript(() => {
      Object.defineProperty(window, "sessionStorage", { get() { throw new Error("Storage blocked"); } });
    });
    const page = await context.newPage();
    await page.route("**/api/top-track", route => route.fulfill({ json: available }));
    await page.goto(baseURL);
    await card(page).waitFor({ state: "visible" });
    await card(page).getByRole("button").click();
    assert.equal(await card(page).count(), 0);
  });
});
