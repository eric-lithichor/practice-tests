import { test } from '@playwright/test';
import LoginAction from '../actionobjects/LoginAction';
import ProductsPage from '../pageobjects/ProductsPage';
import { assert } from 'chai';
import dotenv from 'dotenv';
import SortOrder from '../data/SortOrder';

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
    assert.notEqual(initialText.toString(), finalText.toString(), 'Expected the text to change after sort, but it didn\'t');
    assert.isTrue(SortOrder.isDescending(finalText), 'Expected the sort order to be descending, but it wasn\'t');
});

test('Sort A to Z', async ({page}) => {
    const username = process.env.USERNAME;
    const loginAction = new LoginAction(page);
    const productsPage = new ProductsPage(page);

    // log in and get default text
    await loginAction.login(username);
    const initialText = await productsPage.getProductTitles();

    // sort from A to Z
    await productsPage.sortProducts('ztoa');
    const intermediateText = await productsPage.getProductTitles();

    // make sure the order changed before changing it back
    assert.notEqual(initialText.toString(), intermediateText.toString(), 'Expected the text to change after intermediate sort, but it didn\'t');
    await productsPage.sortProducts('atoz');
    const finalText = await productsPage.getProductTitles();

    // Verify the results are equal and the titles go in ascending order
    assert.equal(initialText.toString(), finalText.toString(), 'Expected the text to be the same after sort, but it wasn\'t');
    assert.isTrue(SortOrder.isAscending(finalText), 'Expected the sort order to be ascending, but it wasn\'t');
});

test('Sort price high to low', async ({page}) => {
    const username = process.env.USERNAME;
    const loginAction = new LoginAction(page);
    const productsPage = new ProductsPage(page);

    // log in and get default text
    await loginAction.login(username);
    const initialText = await productsPage.getProductPrices();

    // sort Price from high to low
    await productsPage.sortProducts('hightolow');
    const finalText = await productsPage.getProductPrices();

    // Verify the results are not equal and the titles go in descending order
    assert.notEqual(initialText, finalText, 'Expected the text to change after sort, but it didn\'t');
    assert.isTrue(SortOrder.isDescending(finalText), 'Expected the sort order to be descending, but it wasn\'t');
});

test('Sort price low to high', async ({page}) => {
    const username = process.env.USERNAME;
    const loginAction = new LoginAction(page);
    const productsPage = new ProductsPage(page);

    // log in and get default text
    await loginAction.login(username);
    const initialText = await productsPage.getProductPrices();

    // sort Price from low to high
    await productsPage.sortProducts('lowtohigh');
    const finalText = await productsPage.getProductPrices();

    // Verify the results are not equal and the titles go in ascending order
    assert.notEqual(initialText, finalText, 'Expected the text to change after sort, but it didn\'t');
    assert.isTrue(SortOrder.isAscending(finalText), 'Expected the sort order to be ascending, but it wasn\'t');
});