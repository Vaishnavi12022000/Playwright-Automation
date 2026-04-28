import { test, expect } from '@playwright/test';

test('homepage visual test', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Wait for page to load properly
  await page.waitForLoadState('networkidle');

  // Take screenshot and compare
  await expect(page).toHaveScreenshot('homepage.png', {
    maxDiffPixelRatio: 0.02,
  mask: [page.locator('text=Get started')]
});
});

test('header visual test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.waitForLoadState('networkidle');

  const header = page.locator('header');
  await expect(header).toHaveScreenshot('header.png');
});