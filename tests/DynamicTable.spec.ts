import {test, expect } from "@playwright/test";

test('Dynamic Pagination Table', async ({page})=>{

await page.goto("https://practice.expandtesting.com/dynamic-pagination-table");
await page.locator(".form-select").selectOption('All');
await page.locator('input[type="search"]').fill('bio');
const data = await page.locator('#demo');
console.log(await data.textContent());
})