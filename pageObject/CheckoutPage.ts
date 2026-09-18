import { Page } from "@playwright/test";

export class CheckoutPage {
    constructor(private page: Page) {}

    async fillCheckoutForm() {
        await this.page.locator("#name").fill('AK');
        await this.page.locator("#address").fill('Bangalore');
        await this.page.locator("#card-name").fill('AK');
        await this.page.locator("#card-number").fill('4242424242424242');
        await this.page.locator("#card-expiry-month").fill('06');
        await this.page.locator("#card-expiry-year").fill('2028');
        await this.page.locator("#card-cvc").fill('987');
    }

    async purchase() {
        await this.page.getByRole('button', { name: 'Purchase' }).click();
    }

    async getFlashMessage() {
        return await this.page.locator("#flash-message").textContent();
    }
}