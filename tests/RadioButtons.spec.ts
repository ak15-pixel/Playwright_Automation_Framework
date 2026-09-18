import {test, expect} from '@playwright/test'

test('Radio Buttons', async({page})=>{
    await page.goto("https://practice.expandtesting.com/radio-buttons");
    await page.locator("#black").click();
    await page.locator("#football").click();




})