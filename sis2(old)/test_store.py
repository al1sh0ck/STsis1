import pytest
from playwright.sync_api import Page, expect

BASE_URL = "https://practicesoftwaretesting.com/"


def test_01_home_page_title(page: Page):
    """TC01: Verify home page loads and has correct title"""
    page.goto(BASE_URL)
    expect(page).to_have_title("Practice Software Testing - Toolshop - v5.0")


def test_02_product_search(page: Page):
    """TC02: Search for a product"""
    page.goto(BASE_URL)
    search_input = page.get_by_placeholder("Search")
    search_input.fill("Pliers")
    page.get_by_role("button", name="Search").click()
    product_link = page.get_by_text("Combination Pliers")
    expect(product_link).to_be_visible()


def test_03_open_product_details(page: Page):
    """TC03: Open product details page"""
    page.goto(BASE_URL)
    page.get_by_text("Combination Pliers").click()
    add_to_cart_btn = page.locator("#btn-add-to-cart")
    expect(add_to_cart_btn).to_be_visible()


def test_04_add_to_cart(page: Page):
    """TC04: Add product to cart and check success message"""
    page.goto(BASE_URL)
    page.get_by_text("Combination Pliers").click()
    page.locator("#btn-add-to-cart").click()
    success_message = page.get_by_text("Product added to shopping cart.")
    expect(success_message).to_be_visible()


def test_05_contact_page_navigation(page: Page):
    """TC05: Navigate to Contact page"""
    page.goto(BASE_URL)
    page.get_by_role("link", name="Contact").click()
    expect(page.get_by_role("heading", name="Contact")).to_be_visible()