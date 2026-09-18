import { test, expect } from '@playwright/test'

test('One Time Password', async ({ page }) => {

    await page.goto("https://practice.expandtesting.com/otp-login");
    await page.locator("#email").fill('practice@expandtesting.com');
    await page.locator("#btn-send-otp").click();
    await page.locator("#otp").fill('214365');
    await page.locator("#btn-send-verify").click();
    const mess = page.locator("#flash");
    console.log(await mess.textContent());
    const mes = page.locator('text=Welcome to the Secure Area.');
    console.log(await mes.textContent());
    await page.getByRole('link', { name: 'Logout' }).click();






})

