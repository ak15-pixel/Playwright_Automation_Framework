import { Page, Locator } from "@playwright/test";

export class DragDropPage {
  readonly page: Page;
  readonly url = "https://practice.expandtesting.com/drag-and-drop";

  readonly columnA: Locator;
  readonly columnB: Locator;

  constructor(page: Page) {
    this.page = page;
    this.columnA = page.locator("#column-a");
    this.columnB = page.locator("#column-b");
  }

  async open() {
    await this.page.goto(this.url);
  }

  async dragAtoB() {
    await this.columnA.dragTo(this.columnB);
  }
}