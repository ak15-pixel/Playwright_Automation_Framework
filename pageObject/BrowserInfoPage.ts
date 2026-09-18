import { Page, Locator } from "@playwright/test";

export class BrowserInfoPage {
  readonly page: Page;
  readonly url = "https://practice.expandtesting.com/my-browser";

  readonly toggleButton: Locator;
  readonly browserInfoTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toggleButton = page.locator("#browser-toggle");
    this.browserInfoTable = page.locator("tbody:visible");
  }

  async open() {
    await this.page.goto(this.url);
  }

  async toggleBrowserInfo() {
    await this.toggleButton.click();
  }

  async getBrowserInfo(): Promise<string | null> {
    return this.browserInfoTable.textContent();
  }
}