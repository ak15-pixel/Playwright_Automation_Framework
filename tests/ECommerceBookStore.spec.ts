import { test, expect } from '@playwright/test';

test('E-Commerce Book Store', async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/bookstore");
    await page.locator("//a[@alt='The DevOps Handbook']").click();
    await page.locator("//img[@alt='Cart']").click();
    await page.locator('a:has-text("Proceed To Checkout")').first().click();
    await page.locator("#email").fill('ak15@gmail.com');
    await page.locator("#password").fill('AK1506');
    await page.locator("#submit").click();

    //Checkout
    await page.locator("#name").fill('AK');
    await page.locator("#address").fill('Bangalore');
    await page.locator("#card-name").fill('AK');
    await page.locator("#card-number").fill('4242424242424242');
    await page.locator("#card-expiry-month").fill('06');
    await page.locator("#card-expiry-year").fill('2028');
    await page.locator("#card-cvc").fill('987');
    await page.getByRole('button', { name: 'Purchase' }).click();
    const DMSG = await page.locator("#flash-message");
    console.log(await DMSG.textContent());

})