import { test, expect, Page } from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com";

const EMAIL = `qa_test_${Date.now()}_${Math.random().toString(36).slice(2, 8)}@gmail.com`;
const PASSWORD = "Test@1234";

async function loginAndGoToBooking(page: Page) {
  await page.goto(`${BASE_URL}/login`, { waitUntil: "domcontentloaded", timeout: 60000 });

  const emailInput = page.getByPlaceholder("you@email.com");
  const passwordInput = page.getByPlaceholder("••••••");
  const signInButton = page.getByRole("button", { name: "Sign In" });

  await emailInput.fill(EMAIL);
  await passwordInput.fill(PASSWORD);
  await signInButton.click();

  await page.waitForTimeout(2000);

  if (page.url().includes("/login")) {
    await page.getByRole("link", { name: "Register" }).click();
    await page.waitForURL("**/register", { timeout: 15000 });

    await page.locator('#register-email').fill(EMAIL);
    await page.locator('#register-password').fill(PASSWORD);
    await page.getByPlaceholder('Repeat your password').fill(PASSWORD);
    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("Discover & Book")).toBeVisible({ timeout: 20000 });
    await expect(page.getByRole("link", { name: "Browse Events →" })).toBeVisible({ timeout: 20000 });
    return;
  }

  await expect(page.getByRole("link", { name: "Browse Events →" })).toBeVisible({ timeout: 20000 });
}

test("Single ticket booking is eligible for refund", async ({ page }) => {
  // Step 1 — Login
  await loginAndGoToBooking(page);

  // Step 2 — Book first event with 1 ticket
  await page.goto(`${BASE_URL}/events`, { waitUntil: "domcontentloaded", timeout: 60000 });

  const bookNow = page.locator('[data-testid="book-now-btn"]:not([aria-disabled="true"])').first();

  await expect(bookNow).toBeVisible();

  await bookNow.click();

  // Wait for booking form to appear before interacting
  await expect(page.getByLabel("Full Name")).toBeVisible({ timeout: 10000 });

  await page.getByLabel("Full Name").fill("John Doe");
  await page.locator("#customer-email").fill(EMAIL);
  await page.getByLabel("Phone").fill("+91 9876543210");

  await page.locator(".confirm-booking-btn").click();

  // Wait for bookings link (confirm booking processed)
  await expect(
    page.getByRole("link", { name: "View My Bookings" })
  ).toBeVisible({ timeout: 15000 });

  // Step 3 — Navigate to booking detail
  await page.getByRole("link", { name: "View My Bookings" }).click();

  await page.waitForURL(`${BASE_URL}/bookings`, { timeout: 10000 });

  await page.getByRole("link", { name: "View Details" }).first().click();

  await expect(
    page.getByText("Booking Information")
  ).toBeVisible({ timeout: 10000 });

  // Step 4 — Validate booking ref
    // Booking reference appears just before the "confirmed" label
    const bookingRefElement = page.locator("xpath=//*[normalize-space(text())='confirmed']/preceding-sibling::*[1]");
  
    await expect(bookingRefElement).toBeVisible({ timeout: 10000 });
  
    const bookingRef = (await bookingRefElement.innerText()).trim();

  const eventTitle =
    (await page.locator("h1").innerText()).trim();

  expect(bookingRef.charAt(0)).toBe(
    eventTitle.charAt(0)
  );

  // Step 5 — Check refund eligibility
  await page
    .getByRole("button", {
      name: /refund/i,
    })
    .click();

  await expect(
    page.locator("#refund-spinner")
  ).toBeVisible();

  await expect(
    page.locator("#refund-spinner")
  ).toBeHidden({
    timeout: 6000,
  });

  // Step 6 — Validate result
  const refundResult =
    page.locator("#refund-result");

  await expect(refundResult).toBeVisible();

  await expect(refundResult).toContainText(
    "Eligible for refund"
  );

  await expect(refundResult).toContainText(
    "Single-ticket bookings qualify for a full refund"
  );
});

test("Group ticket booking is NOT eligible for refund", async ({
  page,
}) => {
  // Step 1 — Login
  await loginAndGoToBooking(page);

  // Step 2 — Book first event with 3 tickets
  await page.goto(`${BASE_URL}/events`, { waitUntil: "domcontentloaded", timeout: 60000 });

  const bookNow = page.locator('[data-testid="book-now-btn"]:not([aria-disabled="true"])').first();

  await expect(bookNow).toBeVisible();

  await bookNow.click();

  const plusButton = page.locator('button:has-text("+")');

  await plusButton.click();
  await plusButton.click();

  await page.getByLabel("Full Name").fill("John Doe");
  await page.locator("#customer-email").fill(EMAIL);
  await page.getByLabel("Phone").fill("+91 9876543210");

  await page.locator(".confirm-booking-btn").click();

  // Step 3 — Navigate to booking detail
  await page.getByRole("link", { name: "View My Bookings" }).click();

  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  await page.getByRole("link", { name: "View Details" }).first().click();

  await expect(
    page.getByText("Booking Information")
  ).toBeVisible();

  // Step 4 — Validate booking ref
    // Booking reference appears just before the "confirmed" label
    const bookingRefElement = page.locator("xpath=//*[normalize-space(text())='confirmed']/preceding-sibling::*[1]");
  
    await expect(bookingRefElement).toBeVisible({ timeout: 10000 });
  
    const bookingRef = (await bookingRefElement.innerText()).trim();

  const eventTitle =
    (await page.locator("h1").innerText()).trim();

  expect(bookingRef.charAt(0)).toBe(
    eventTitle.charAt(0)
  );

  // Step 5 — Check refund eligibility
  await page
    .getByRole("button", {
      name: /refund/i,
    })
    .click();

  await expect(
    page.locator("#refund-spinner")
  ).toBeVisible();

  await expect(
    page.locator("#refund-spinner")
  ).toBeHidden({
    timeout: 6000,
  });

  // Step 6 — Validate result
  const refundResult =
    page.locator("#refund-result");

  await expect(refundResult).toBeVisible();

  await expect(refundResult).toContainText(
    "Not eligible for refund"
  );

  await expect(refundResult).toContainText(
    "Group bookings (3 tickets) are non-refundable"
  );
});