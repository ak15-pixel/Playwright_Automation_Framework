import { test, expect } from "@playwright/test";
import { ColorWheelPage } from "../pageObject/ColorWheelPage";

test("Color Wheel Game - POM Version", async ({ page }) => {
  const colorWheel = new ColorWheelPage(page);

  await colorWheel.open();
  await colorWheel.startGameIfVisible();

  // Get all the color buttons
  const buttons = await colorWheel.getColorButtons();
  expect(buttons.length).toBeGreaterThan(0);

  // Loop through each color button
  for (const btn of buttons) {
    const result = await colorWheel.clickColorButton(btn);

    if (result.feedback) {
      console.log(`Clicked "${result.name}" → Feedback: ${result.feedback}`);
    } else {
      console.log(`Clicked "${result.name}"`);
    }
  }
});