import { Page, Locator } from "@playwright/test";

export class ForgotPasswordPage {
  readonly page: Page;
  readonly url = "https://practice.expandtesting.com/forgot-password";

  readonly emailInput: Locator;
  readonly retrieveButton: Locator;
  readonly resetPageMessage: Locator;
  readonly emailSentMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.locator("#email");
    this.retrieveButton = page.getByRole("button", { name: "Retrieve password" });

    this.resetPageMessage = page.locator("text=Password reset page");
    this.emailSentMessage = page.locator("text=An e-mail has been sent to you");
  }

  async open() {
    await this.page.goto(this.url);
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async submitRequest() {
    await this.retrieveButton.click();
  }

  async getResetPageMessage(): Promise<string | null> {
    return this.resetPageMessage.textContent();
  }

  async getEmailSentMessage(): Promise<string | null> {
    return this.emailSentMessage.textContent();
  }
}