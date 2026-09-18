import {test, expect} from '@playwright/test'

test('Add or Remove Elements', async ({page})=>{

    await page.goto("https://practice.expandtesting.com/add-remove-elements");
    await page.locator('button:has-text("Add Element")').click();
    await page.locator("#elements").click();

})