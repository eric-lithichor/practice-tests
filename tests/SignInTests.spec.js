import { test, expect } from '@playwright/test';
import LoginPage from '../pageobjects/LoginPage';

import dotenv from 'dotenv';
dotenv.config();

const username = process.env.USERNAME;
const lockedOut = process.env.LOCKEDOUTUSER;
const password = process.env.PASSWORD;
const url = process.env.BASEURL;

const itemName = "Sauce Labs Fleece Jacket";

test("Sign in", async ({page}) => {
    const usernameField = page.locator("#user-name");
    const passwordField = page.locator("#password");
    const loginButton = page.locator("#login-button");
    const inventoryContainer = page.locator("#inventory_container");

    await page.goto(url);

    await usernameField.fill(username);
    await passwordField.fill(password);
    await loginButton.click();

    const fleece = inventoryContainer.locator(".inventory_item ", { hasText: itemName });
    const description = await fleece.locator(".inventory_item_description").locator(".pricebar").locator(".inventory_item_price").textContent();

    expect(description).toContain("49.99");

    const menu = page.getByRole('button', { name: 'Open Menu' });
    const logout = page.locator('[data-test="logout-sidebar-link"]');

    await menu.click();
    await logout.click();
});

test("Locked Out", async ({page}) => {
    const loginPage = new LoginPage(page);
    const lockedOutError = "Epic sadface: Sorry, this user has been locked out.";

    await loginPage.navigateToBasePage();
    await loginPage.login(lockedOut);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain(lockedOutError);
});

test("Invalid user", async ({page}) => {
    const loginPage = new LoginPage(page);
    const invalidUserError = "Epic sadface: Username and password do not match any user in this service";

    await loginPage.navigateToBasePage();
    await loginPage.login("IUGFDX");

    const error = await loginPage.getErrorMessage();
    expect(error).toContain(invalidUserError);
});
    