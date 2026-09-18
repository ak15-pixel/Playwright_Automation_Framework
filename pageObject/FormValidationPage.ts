import { Page, Locator } from "@playwright/test";

export class FormValidationPage {
  readonly page: Page;
  readonly url = "https://practice.expandtesting.com/form-validation";

  readonly firstNameInput: Locator;
  readonly contactNumberInput: Locator;
  readonly pickUpDateSection: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator("#validationCustom01");
    this.contactNumberInput = page.locator('[name="contactnumber"]');
    this.pickUpDateSection = page.locator('div').filter({ hasText: "PickUp Date" }).first();
  }

  async open() {
    await this.page.goto(this.url);
  }

  async enterFirstName(name: string) {
    await this.firstNameInput.clear();
    await this.firstNameInput.fill(name);
  }

  async enterContactNumber(number: string) {
    await this.contactNumberInput.fill(number);
  }

  async scrollToPickupDate() {
    await this.pickUpDateSection.scrollIntoViewIfNeeded();
  }
}