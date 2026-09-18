import { test, expect } from "@playwright/test";

test('Auto Complete', async ({ page }) => {
    await page.route('https://pagead2.googlesyndication.com/**', route => route.abort());

    await page.goto("https://practice.expandtesting.com/autocomplete", { waitUntil: "domcontentloaded" });
    const countryInput = page.getByPlaceholder("Country name");
    await expect(countryInput).toBeVisible({ timeout: 30000 });
    await countryInput.fill("Singapore");
    await page.locator('button:has-text("Submit")').click();
    const msg3 = await page.locator("#result");
    console.log(await msg3.textContent());
})


test("Auto Complete - random country", async ({ page }) => {
  await page.route('https://pagead2.googlesyndication.com/**', route => route.abort());
  await page.goto("https://practice.expandtesting.com/autocomplete", { waitUntil: "domcontentloaded" });

  const countries = [
    "Singapore", "India", "Australia", "Brazil",
    "Canada", "Germany", "Japan", "France", "Spain"
  ];

  const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  console.log("Random country selected:", randomCountry);

  const input = page.getByPlaceholder("Country name");
  await expect(input).toBeVisible({ timeout: 30000 });

  // Type directly (no dropdown exists on this page)
  await input.fill(randomCountry);

  // Assert echoed value appears in the UI
  await expect(page.locator("strong")).toHaveText(randomCountry);

  // Submit form
  await page.getByRole("button", { name: "Submit" }).click();

  // Optional: verify result
  await expect(page.locator("#result")).toContainText(randomCountry);
});