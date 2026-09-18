import {test, expect} from '@playwright/test'

test('Notification Message', async({page}) => {
    await page.goto("https://practice.expandtesting.com/notification-message-rendered");
    await page.locator("a[href='/notification-message']").click();
   const msg = await page.locator("#flash");
   console.log(await msg.textContent());




})