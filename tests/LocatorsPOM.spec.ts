import { test } from "@playwright/test";
import { LocatorsPage } from "../pageObject/LocatorsPage";

test("Locators - POM", async ({ page }) => {
  const locators = new LocatorsPage(page);

  await locators.open();

  await locators.clickContact();
  await locators.goBack();

  await locators.verifyHotDealVisible();
  await locators.selectCountry("Japan");

  await locators.focusSearchBox();
  await locators.validateUserAvatarVisible();
  await locators.validateStatusMessageVisible();
});