import {test, expect } from "@playwright/test";

test('ShadowDOM', async ({page})=>{
    await page.goto("https://practice.expandtesting.com/shadowdom");
    await page.locator(':text-is("This button is inside a Shadow DOM.")').hover();
    await page.locator(':text-is("This button is inside a Shadow DOM.")').screenshot({ path: 'partialScreenshot.png' }); 

})

test('Infinite Scroll', async ({page})=>{
    await page.goto("https://practice.expandtesting.com/infinite-scroll");
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(`Initial Scroll Height: ${scrollHeight}`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000); 
    const newScrollHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(`New Scroll Height: ${newScrollHeight}`);


})