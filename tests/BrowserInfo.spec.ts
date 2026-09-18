import {test, expect } from "@playwright/test";

test('Browser Information', async ({page})=>{

await page.goto("https://practice.expandtesting.com/my-browser");
await page.locator("#browser-toggle").click();
const userAgent = await page.locator('tbody:visible');
console.log(await userAgent.textContent());
await page.locator("#browser-toggle").click();

})