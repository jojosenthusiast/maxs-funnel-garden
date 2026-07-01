import { test, expect, type Page } from "@playwright/test";

// Browser smoke for the review blockers:
//   1. Landing page renders and Start CTA is present.
//   2. Playable flow: /garden/1 through /garden/8 -> /garden/complete.
//   3. Invalid route params (/garden/1abc etc.) 404 instead of resolving as
//      the numeric prefix.
//
// The full progress state machine is also covered deterministically in
// lib/__tests__/progress.test.ts — this suite adds a real-browser layer.

// next dev lazy-compiles each route on first hit; give clicks room to breathe.
async function advance(page: Page, expected: RegExp, label: RegExp): Promise<void> {
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: label }).click();
  await page.waitForURL(expected, { timeout: 15_000 });
}

test("landing page renders and exposes the Start CTA", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Max.?s Funnel Garden/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /open the gate/i }),
  ).toBeVisible();
});

test("Start button navigates from landing to level 1", async ({ page }) => {
  await page.goto("/");
  await advance(page, /\/garden\/1$/, /open the gate/i);
  await expect(
    page.getByRole("heading", { name: /Event seeds/i }),
  ).toBeVisible();
});

test("playable flow completes all 8 levels and reaches /garden/complete", async ({ page }) => {
  await page.goto("/garden/1");
  await expect(
    page.getByRole("heading", { name: /Event seeds/i }),
  ).toBeVisible();
  for (let i = 1; i <= 7; i++) {
    await advance(page, new RegExp(`/garden/${i + 1}$`), /complete level/i);
  }
  await advance(page, /\/garden\/complete$/, /finish the garden/i);
  await expect(
    page.getByRole("heading", { name: /the garden, tended/i }),
  ).toBeVisible();
});

test("invalid route /garden/1abc does not resolve as level 1", async ({ page }) => {
  const res = await page.goto("/garden/1abc");
  expect(res?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: /Event seeds/i }),
  ).toHaveCount(0);
});

test("invalid route /garden/3xyz does not resolve as level 3", async ({ page }) => {
  const res = await page.goto("/garden/3xyz");
  expect(res?.status()).toBe(404);
});

test("invalid route /garden/9 (out of range) 404s", async ({ page }) => {
  const res = await page.goto("/garden/9");
  expect(res?.status()).toBe(404);
});

test("invalid route /garden/01 (leading zero) 404s", async ({ page }) => {
  const res = await page.goto("/garden/01");
  expect(res?.status()).toBe(404);
});
