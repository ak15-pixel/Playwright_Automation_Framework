import { Page, Locator } from "@playwright/test";

export class DragDropCirclesPage {
  readonly page: Page;
  readonly url = "https://practice.expandtesting.com/drag-and-drop-circles";

  readonly redCircle: Locator;
  readonly greenCircle: Locator;
  readonly blueCircle: Locator;
  readonly target: Locator;

  constructor(page: Page) {
    this.page = page;

    this.redCircle = page.locator(".red");
    this.greenCircle = page.locator(".green");
    this.blueCircle = page.locator(".blue");

    this.target = page.locator("#target");
  }

  async open() {
    await this.page.goto(this.url);
  }

  async dragRed() {
    await this.redCircle.dragTo(this.target);
  }

  async dragGreen() {
    await this.greenCircle.dragTo(this.target);
  }

  async dragBlue() {
    await this.blueCircle.dragTo(this.target);
  }

  async dragAll() {
    await this.dragRed();
    await this.dragGreen();
    await this.dragBlue();
  }
}