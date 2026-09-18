import {test, expect} from '@playwright/test'

test('Locators', async({page}) => {
  await page.goto("https://practice.expandtesting.com/locators");
  await page.getByRole('link', { name: /Contact/i }).click();
  await page.goBack();
  await page.getByText('🔥 Hot Deal: Buy 1 Get 1 Free');
  await page.getByLabel('Choose a country').selectOption('Japan');
  await page.getByPlaceholder('Search the site', { exact: true });
  await page.getByAltText('User avatar');
  await page.getByTestId("status-message");
})