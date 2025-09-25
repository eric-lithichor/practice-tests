import { test, expect } from '@playwright/test';
import LoginAction from '../actionobjects/LoginAction';
import ProductsPage from '../pageobjects/ProductsPage';
import { assert } from 'chai';
import dotenv from 'dotenv';

dotenv.config();

test('Sort Z to A', async ({page}) => {
    const username = process.env.USERNAME;
    const loginAction = new LoginAction(page);
    const productsPage = new ProductsPage(page);

    // log in and get default text
    await loginAction.login(username);
    const initialText = await productsPage.getProductTitles();

    // sort from Z to A
    await productsPage.sortProducts('ztoa');
    const finalText = await productsPage.getProductTitles();

    // Verify the results are not equal and the titles go in descending order
    assert.notEqual(initialText, finalText, 'Expected the text to change after sort, but it didn\'t');
    assert.isTrue(initialText < finalText, 'Expected the sort order to be descending, but it wasn\'t');
});