import { test, expect } from '@playwright/test';
import { appendFile } from 'node:fs';

test('Test Login Page ', async ({ page }) => {

    await page.goto("https://practice.expandtesting.com/#examples");
    await page.goto("https://practice.expandtesting.com/login");
    await page.locator("#username").fill('practice');
    await page.locator("#password").fill('SuperSecretPassword!');
    await page.locator("#submit-login").click();
    const mes = page.locator('text=Welcome to the Secure Area.');
    console.log(await mes.textContent());

})