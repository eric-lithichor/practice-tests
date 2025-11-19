import { test, expect } from '@playwright/test';
import LoginAction from '../actionobjects/LoginAction';
import Products from "../data/Products";
import ProductsPage from '../pageobjects/ProductsPage';
import { assert } from 'chai';

import dotenv from 'dotenv';
import ShoppingCartPage from '../pageobjects/ShoppingCartPage';
import CheckoutData from '../data/CheckoutData';
import CheckoutPage from '../pageobjects/CheckoutPage';
import CheckoutAction from '../actionobjects/CheckoutAction';
import CheckoutOverviewPage from '../pageobjects/CheckoutOverviewPage';
dotenv.config();

const username = process.env.USERNAME;

// This test adds one item to the shopping cart, then removes it by
// clicking Remove in the shopping cart
test('Add to and remove from cart', async ({page}) => {
    const loginAction = new LoginAction(page);
    const productsPage = new ProductsPage(page);
    const shoppingCart = new ShoppingCartPage(page);

    await loginAction.login(username);
    
    // Get random product and add it to the cart
    const product = Products.getRandomProduct();
    await productsPage.addItemToCart(product);

    // Verify item is in cart
    // badge has correct number
    let itemCount = await productsPage.getNumbersOfItemsInCart();
    assert.isTrue(itemCount == 1, `Expected 1 item, but got ${itemCount}`);

    // shopping cart contains the correct item
    await productsPage.viewCart();
    let itemInCart = await shoppingCart.verifyItemInCart(product);
    assert.isTrue(itemInCart, `Expected ${product} to be in the shopping cart, but it wasn't.`);

    // Remove item from the cart
    await shoppingCart.removeItemFromCart(product);
    // verify item was removed
    itemInCart = await shoppingCart.verifyItemInCart(product);
    assert.isFalse(itemInCart);
});

// This test adds more than one item to the shopping cart, then removes
// them by clicking Remove on the Product page
test('Add and remove multiple items from cart', async ({page}) => {
    const loginAction = new LoginAction(page);
    const productsPage = new ProductsPage(page);
    const shoppingCart = new ShoppingCartPage(page);
    const maxItems = 3;

    await loginAction.login(username);

    // add three random products to shopping cart
    const products = Products.createListOfProducts(maxItems);
    await productsPage.addListOfItemsToCart(products);
    
    // go to the cart and verify the items were added
    let productsPresent = false;
    productsPresent = await productsPage.verifyProductsPresent(products);
    assert.isTrue(productsPresent, "Expected all items to be in the cart, but not all were.");

    // remove the items from the cart while still on the Products page
    await shoppingCart.continueShopping();
    for(let x = 0; x < products.length; x ++) {
        await productsPage.removeItemFromCart(products[x]);
    }

    // verify items were removed
    productsPresent = true;
    productsPresent = await productsPage.verifyProductsNotPresent(products);
    assert.isFalse(productsPresent, "Expected none of the items to be in the cart, but at least one was.");
})

test('Checkout with multiple items', async ({page}) => {
    const loginAction = new LoginAction(page);
    const productsPage = new ProductsPage(page);
    const checkoutAction = new CheckoutAction(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);

    const checkoutData = CheckoutData.getPersonalData();

    await loginAction.login(username);

    // Add two random items to shopping cart
    const products = Products.createListOfProducts(2);
    await productsPage.addListOfItemsToCart(products);

    // go to the cart and fill out the form
    await checkoutAction.beginCheckout(checkoutData);

    // verify correct items are in the cart
    const itemsInOverview = await checkoutOverviewPage.verifyItemsInOverview(products);
    assert.isTrue(itemsInOverview, "At least one item was not in the checkout overview");
    // click finish
    await checkoutOverviewPage.finish();
    // verify message
    const checkoutMessageCorrect = await checkoutOverviewPage.verifyCheckoutMessage();
    assert.isTrue(checkoutMessageCorrect);
})