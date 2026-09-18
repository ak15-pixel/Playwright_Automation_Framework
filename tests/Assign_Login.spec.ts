import { test, expect, Page } from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const EMAIL = `qa_test_${Date.now()}_${Math.random().toString(36).slice(2, 8)}@gmail.com`;
const PASSWORD = "Test@1234";

function futureDateValue(days = 7) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 16);
}

async function registerAndLogin(page: Page) {
  await page.goto(`${BASE_URL}/login`, { waitUntil: "domcontentloaded", timeout: 60000 });

  const emailInput = page.getByPlaceholder("you@email.com");
  const passwordInput = page.getByPlaceholder("••••••");
  const signInButton = page.getByRole("button", { name: "Sign In" });

  await expect(emailInput).toBeVisible({ timeout: 30000 });
  await expect(passwordInput).toBeVisible({ timeout: 30000 });
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

//ASSIGNMENT -01

test("Login and create a new event", async ({ page }) => {
  await registerAndLogin(page);

  // Step 2 — Create a new event
  await page.goto(`${BASE_URL}/admin/events`, { waitUntil: "domcontentloaded", timeout: 60000 });
  const eventTitle = `Test Event ${Date.now()}`;
  await page.locator("#event-title-input").fill(eventTitle);
  await page
    .locator("#admin-event-form textarea")
    .fill("This is a test event created by Playwright automation.");
  await page.getByLabel("City").fill("New York");
  await page.getByLabel("Venue").fill("Test Venue");
  await page.getByLabel("Event Date & Time").fill(futureDateValue());
  await page.getByLabel("Price ($)").fill("100");
  await page.getByLabel("Total Seats").fill("50");
  await page.locator("#add-event-btn").click();
  await expect(page.getByText("Event created!")).toBeVisible();

  // Step 3 — Find the event card and capture seat
  await page.goto(`${BASE_URL}/events`, { waitUntil: "domcontentloaded", timeout: 60000 });
  const eventCards = page.getByTestId("event-card");
  await expect(eventCards.first()).toBeVisible();
  const targetCard = eventCards.filter({ has: page.getByText(eventTitle) });
  await expect(targetCard).toBeVisible({ timeout: 5000 });
  const seatText = await targetCard.locator("text=/seat/i").first().innerText();
  const seatsBeforeBooking = parseInt(seatText.match(/\d+/)?.[0] || "0", 10);
  console.log("Seats before booking:", seatsBeforeBooking);

  // Step 4 and 5 — Start & Fill booking
  await targetCard.locator('[data-testid="book-now-btn"]').click();
  await expect(page.locator("#ticket-count")).toBeVisible();
  await page.getByLabel("Full Name").fill("John");
  await page.locator("#customer-email").fill(EMAIL);
  await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
  await page.locator(".confirm-booking-btn").click();

  // Step 6 — Verify booking confirmation
  const bookingRefElement = page.locator(".booking-ref").first();
  await expect(bookingRefElement).toBeVisible();
  const bookingRef = (await bookingRefElement.innerText()).trim();
  console.log("Booking Reference:", bookingRef);

  // Step 7 — Verify in My Bookings
  await page.getByText("View My Bookings").click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  const bookingCards = page.locator('[data-testid="booking-card"]');
  const matchedCard = bookingCards.filter({ has: page.locator(".booking-ref", { hasText: bookingRef }) });
  await expect(matchedCard).toBeVisible();
  await expect(matchedCard).toContainText(eventTitle);

  // Step 8 — Verify seat reduction
  await page.goto(`${BASE_URL}/events`, { waitUntil: "domcontentloaded", timeout: 60000 });
  const eventCards1 = page.getByTestId("event-card");
  await expect(eventCards1.first()).toBeVisible();
  const updatedEventCard = eventCards.filter({ hasText: eventTitle });
  await expect(updatedEventCard).toBeVisible();
  const seatTextAfter = await updatedEventCard.getByText(/seat/i).first().innerText();
  const seatsAfterBooking = parseInt(seatTextAfter.match(/\d+/)?.[0] || "0");
  console.log("Seats Before Booking:", seatsBeforeBooking);
  console.log("Seats After Booking:", seatsAfterBooking);
  expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
});

//ASSIGNMENT -02