import { test, expect } from '@playwright/test';

test('Color Wheel Game', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/color-wheel');
  const playGame = page.getByRole('button', { name: /play game/i });
  if (await playGame.isVisible()) {
    await playGame.click();
  }

  // Discover the color buttons actually present on the page

  const colorButtons = await page
    .getByRole('button')
    .filter({ hasNotText: /^(play game|reset game)$/i })
    .all();

  // Sanity check
  expect(colorButtons.length).toBeGreaterThan(0);

  // Click each color button once and log any visible feedback if available
  for (const btn of colorButtons) {
    const name = (await btn.innerText()).trim();
    await btn.click();

    // If the app shows a feedback element/heading, assert it here.
    // Example: look for a heading or region that updates (adjust selector to the real one).
    const feedback = page.locator('h3, [role="status"], [data-testid="result"]');
    if (await feedback.first().isVisible()) {
      const text = (await feedback.first().innerText()).trim();
      console.log(`Clicked "${name}" → Feedback: ${text}`);
    } else {
      console.log(`Clicked "${name}"`);
    }
  }
});
