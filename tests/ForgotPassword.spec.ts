import {test, expect} from '@playwright/test'

test('forgot password', async({page}) => {

await page.goto("https://practice.expandtesting.com/forgot-password");
await page.locator("#email").fill('ak15@gmail.com');
await page.getByRole('button', { name: 'Retrieve password' }).click();
const message1 = page.locator('text=Password reset page');
console.log(await message1.textContent());
const message = page.locator('text=An e-mail has been sent to you');
console.log(await message.textContent());
})