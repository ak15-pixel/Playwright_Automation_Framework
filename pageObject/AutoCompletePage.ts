import { Page, Locator, expect } from "@playwright/test";

export class AutoCompletePage {
  private readonly page: Page;
  readonly url: string = "https://practice.expandtesting.com/autocomplete";

  // Locators
  readonly inputCountry: Locator;
  readonly submitButton: Locator;
  readonly resultText: Locator;
  readonly echoedStrong: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputCountry = page.getByPlaceholder("Country name");
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.resultText = page.locator("#result");
    this.echoedStrong = page.locator("strong");
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  }

  async fillCountry(name: string) {
    await this.inputCountry.fill(name);
  }

  async submit() {
    await this.submitButton.click();
  }

  async getEchoedValue(): Promise<string | null> {
    return this.echoedStrong.textContent();
  }

  async getResultText(): Promise<string | null> {
    return this.resultText.textContent();
  }

  async assertEchoedEquals(expected: string) {
    await expect(this.echoedStrong).toHaveText(expected);
  }

  async assertResultContains(text: string) {
    await expect(this.resultText).toContainText(text);
  }
}