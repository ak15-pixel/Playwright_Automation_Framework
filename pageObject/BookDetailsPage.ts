import { Page } from "@playwright/test";

export class BookDetailsPage {
    constructor(private page: Page) {}

    async openCart() {
        await this.page.locator("//img[@alt='Cart']").click();
    }
}