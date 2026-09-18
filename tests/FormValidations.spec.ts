import {test, expect} from '@playwright/test'

test('Form Validations', async ({page}) => {
    await page.goto("https://practice.expandtesting.com/form-validation");
    const fl = await page.locator("#validationCustom01");
    fl.clear();
    fl.fill("abcdefg");
    await page.locator('[name="contactnumber"]').fill('123456789');
    await page.locator('div').filter({ hasText: 'PickUp Date' }).first();

    
})