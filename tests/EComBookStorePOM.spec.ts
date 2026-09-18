import { test, expect } from "@playwright/test";
import { HomePage } from "../pageObject/HomePage";
import { BookDetailsPage } from "../pageObject/BookDetailsPage";
import { CartPage } from "../pageObject/AddToCartPage";
import { LoginPage } from "../pageObject/LoginPage";
import { CheckoutPage } from "../pageObject/CheckoutPage";

test("E-Commerce Book Store", async ({ page }) => {
    
    const home = new HomePage(page);
    const book = new BookDetailsPage(page);
    const cart = new CartPage(page);
    const login = new LoginPage(page);
    const checkout = new CheckoutPage(page);

    // Navigate to Home
    await home.open();

    // Select a book
    await home.openBook("The DevOps Handbook");

    // Open Cart
    await book.openCart();

    // Proceed to Checkout
    await cart.proceedToCheckout();

    // Login
    await login.login("ak15@gmail.com", "AK1506");

    // Checkout process
    await checkout.fillCheckoutForm();
    await checkout.purchase();

    // Flash message
    const message = await checkout.getFlashMessage();
    console.log(message);

    await expect(message).toContain("success");
});