import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Login Tests', () => {

  // Valid login tests
  test('Valid Login - standard_user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForSelector('.inventory_list');
    expect(await page.title()).toContain('Swag Labs');
  });

  test('Valid Login - problem_user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'problem_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForSelector('.inventory_list');
    expect(await page.title()).toContain('Swag Labs');
  });

  test('Valid Login - performance_glitch_user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'performance_glitch_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForSelector('.inventory_list');
    expect(await page.title()).toContain('Swag Labs');
  });

  // Invalid login tests
  test('Invalid Login - incorrect username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForSelector('.error-message-container');
    expect(await page.isVisible('.error-message-container')).toBe(true);
  });

  test('Invalid Login - incorrect password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');
    await page.waitForSelector('.error-message-container');
    expect(await page.isVisible('.error-message-container')).toBe(true);
  });

  test('Invalid Login - both fields empty', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.click('#login-button');
    await page.waitForSelector('.error-message-container');
    expect(await page.isVisible('.error-message-container')).toBe(true);
  });

  test('Invalid Login - locked_out_user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForSelector('.error-message-container');
    expect(await page.isVisible('.error-message-container')).toBe(true);
  });

  test('Invalid Login - username with special characters', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', '@#!$%user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForSelector('.error-message-container');
    expect(await page.isVisible('.error-message-container')).toBe(true);
  });
});
