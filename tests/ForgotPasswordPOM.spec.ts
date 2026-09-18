import { test, expect } from "@playwright/test";
import { ForgotPasswordPage } from "../pageObject/ForgotPasswordPage";

test("Forgot Password Flow", async ({ page }) => {
  const forgot = new ForgotPasswordPage(page);

  await forgot.open();
  await forgot.enterEmail("ak15@gmail.com");
  await forgot.submitRequest();

  const msg1 = await forgot.getResetPageMessage();
  console.log("Message 1:", msg1);

  const msg2 = await forgot.getEmailSentMessage();
  console.log("Message 2:", msg2);

  await expect(forgot.resetPageMessage).toBeVisible();
  await expect(forgot.emailSentMessage).toBeVisible();
});