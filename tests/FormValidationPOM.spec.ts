import { test } from "@playwright/test";
import { FormValidationPage } from "../pageObject/FormValidationPage";

test("Form Validations - POM", async ({ page }) => {
  const formPage = new FormValidationPage(page);

  await formPage.open();

  await formPage.enterFirstName("abcdefg");
  await formPage.enterContactNumber("123456789");
  await formPage.scrollToPickupDate();

  console.log("Form fields filled successfully");
});