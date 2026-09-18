import { test, expect } from "@playwright/test";
import { BrowserInfoPage } from "../pageObject/BrowserInfoPage";

test("Browser Information", async ({ page }) => {
  const browserPage = new BrowserInfoPage(page);

  await browserPage.open();

  // Expand section
  await browserPage.toggleBrowserInfo();

  // Read browser info
  const info = await browserPage.getBrowserInfo();
  console.log("Browser Info:", info);

  // Collapse section
  await browserPage.toggleBrowserInfo();

  await expect(browserPage.browserInfoTable).toBeHidden();
});