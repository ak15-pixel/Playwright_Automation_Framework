import { Page, Locator } from "@playwright/test";

export class LocatorsPage {
  readonly page: Page;
  readonly url = "https://practice.expandtesting.com/locators";

  readonly contactLink: Locator;
  readonly hotDealText: Locator;
  readonly countrySelect: Locator;
  readonly searchBox: Locator;
  readonly userAvatar: Locator;
  readonly statusMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.contactLink = page.getByRole("link", { name: /Contact/i });
    this.hotDealText = page.getByText("🔥 Hot Deal: Buy 1 Get 1 Free");
    this.countrySelect = page.getByLabel("Choose a country");
    this.searchBox = page.getByPlaceholder("Search the site", { exact: true });
    this.userAvatar = page.getByAltText("User avatar");
    this.statusMessage = page.getByTestId("status-message");
  }

  async open() {
    await this.page.goto(this.url);
  }

  async clickContact() {
    await this.contactLink.click();
  }

  async goBack() {
    await this.page.goBack();
  }

  async selectCountry(country: string) {
    await this.countrySelect.selectOption(country);
  }

  async verifyHotDealVisible() {
    await this.hotDealText.isVisible();
  }

  async focusSearchBox() {
    await this.searchBox.click();
  }

  async validateUserAvatarVisible() {
    await this.userAvatar.isVisible();
  }

  async validateStatusMessageVisible() {
    await this.statusMessage.isVisible();
  }
}