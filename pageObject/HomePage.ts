import { Page } from "@playwright/test";

export class HomePage {
    constructor(private page: Page) {}

    async open() {
        await this.page.goto("https://practice.expandtesting.com/bookstore");
    }

    async openBook(title: string) {
        await this.page.locator(`//a[@alt='${title}']`).click();
    }
}