
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practicesoftwaretesting.com/';

// TC01: Verify home page loads and has correct title
test('TC01 - Home page title', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page).toHaveTitle(
        'Practice Software Testing - Toolshop - v5.0'
    );
});

// TC02: Search for a product
test('TC02 - Product search', async ({ page }) => {
    await page.goto(BASE_URL);

    const searchInput = page.getByPlaceholder('Search');
    await searchInput.fill('Pliers');

    await page.getByRole('button', { name: 'Search' }).click();

    const productLink = page.getByText('Combination Pliers');
    await expect(productLink).toBeVisible();
});

// TC03: Open product details page
test('TC03 - Open product details', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByText('Combination Pliers').click();

    const addToCartBtn = page.locator('#btn-add-to-cart');
    await expect(addToCartBtn).toBeVisible();
});

// TC04: Add product to cart and check success message
test('TC04 - Add product to cart', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByText('Combination Pliers').click();

    await page.locator('#btn-add-to-cart').click();

    const successMessage = page.getByText(
        'Product added to shopping cart.'
    );

    await expect(successMessage).toBeVisible();
});

// TC05: Navigate to Contact page
test('TC05 - Contact page navigation', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByRole('link', { name: 'Contact' }).click();

    await expect(
        page.getByRole('heading', { name: 'Contact' })
    ).toBeVisible();
});
