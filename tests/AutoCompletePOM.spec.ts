import { test, expect } from "@playwright/test";
import { AutoCompletePage } from "../pageObject/AutoCompletePage";

  test("Auto Complete - specific country", async ({ page }) => {
    const auto = new AutoCompletePage(page);

    await auto.open();
    await auto.fillCountry("Singapore");
    await auto.submit();

    const result = await auto.getResultText();
    console.log("Result:", result);

    await auto.assertResultContains("Singapore");
  });

  test("Auto Complete - random country", async ({ page }) => {
    const auto = new AutoCompletePage(page);

    const countries = [
      "Singapore", "India", "Australia", "Brazil",
      "Canada", "Germany", "Japan", "France", "Spain"
    ];

    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];

    console.log("Random country selected:", randomCountry);

    await auto.open();
    await auto.fillCountry(randomCountry);

    // The page echoes the entered value in a <strong> element
    await auto.assertEchoedEquals(randomCountry);

    await auto.submit();

    // Verify result block also reflects the country
    await auto.assertResultContains(randomCountry);
  });