import { Page } from "@playwright/test";

export class CartPage {
    constructor(private page: Page) {}

    async proceedToCheckout() {
        await this.page.locator('a:has-text("Proceed To Checkout")').first().click();
    }
}