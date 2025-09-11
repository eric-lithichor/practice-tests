import { test, expect } from '@playwright/test';
import LoginAction from '../actionobjects/LoginAction';
import Products from "../data/Products";
import ProductsPage from '../pageobjects/ProductsPage';
import { assert } from 'chai';

import dotenv from 'dotenv';
import ShoppingCartPage from '../pageobjects/ShoppingCartPage';
dotenv.config();

const username = process.env.USERNAME;;

test('Add to and remove from cart', async ({page}) => {
    const loginAction = new LoginAction(page);
    const productsPage = new ProductsPage(page);
    const shoppingCart = new ShoppingCartPage(page);

    await loginAction.login(username);
    
    // Get random product and add it to the cart
    const product = Products.getRandomProduct();
    await productsPage.addProductToCart(product);

    // Verify item is in cart
    // badge has correct number
    let itemCount = await productsPage.getNumbersOfItemsInCart();
    assert.isTrue(itemCount == 1, `Expected 1 item, but got ${itemCount}`);

    // shopping cart contains the correct item
    await productsPage.viewCart();
    const itemInCart = await shoppingCart.verifyItemInCart(product);
    assert.isTrue(itemInCart, `Expected ${product} to be in the shopping cart, but it wasn't.`);
});