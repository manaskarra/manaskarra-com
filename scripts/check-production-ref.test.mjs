import assert from "node:assert/strict";
import { test } from "node:test";
import { checkProductionRef } from "./check-production-ref.mjs";

const current = "a".repeat(40);
const production = { VERCEL_ENV: "production", VERCEL_GIT_COMMIT_REF: "main", VERCEL_GIT_COMMIT_SHA: current };

test("local and preview builds do not depend on GitHub availability", () => {
  const offline = () => { throw new Error("Network unavailable"); };
  checkProductionRef({}, offline);
  checkProductionRef({ VERCEL_ENV: "preview", VERCEL_GIT_COMMIT_REF: "feature" }, offline);
});

test("production accepts only the current main commit", () => {
  checkProductionRef(production, () => current);
  assert.throws(() => checkProductionRef({ ...production, VERCEL_GIT_COMMIT_REF: "feature" }, () => current), /must deploy from main/);
  assert.throws(() => checkProductionRef(production, () => "b".repeat(40)), /not the latest main/);
});

test("missing metadata and failed remote lookup cannot approve production", () => {
  assert.throws(() => checkProductionRef({ ...production, VERCEL_GIT_COMMIT_SHA: "" }, () => current), /commit metadata/);
  assert.throws(() => checkProductionRef(production, () => ""), /unavailable/);
  assert.throws(() => checkProductionRef(production, () => { throw new Error("Network unavailable"); }), /Network unavailable/);
});

test("target production is guarded even when the source environment is preview", () => {
  assert.throws(() => checkProductionRef({ ...production, VERCEL_ENV: "preview", VERCEL_TARGET_ENV: "production", VERCEL_GIT_COMMIT_REF: "feature" }, () => current), /must deploy from main/);
});

test("a main update during the build fails the second check", () => {
  checkProductionRef(production, () => current);
  assert.throws(() => checkProductionRef(production, () => "c".repeat(40)), /not the latest main/);
});
