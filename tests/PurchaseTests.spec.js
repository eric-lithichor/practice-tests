import { test, expect } from '@playwright/test';
import LoginAction from '../actionobjects/LoginAction';
import Products from "../data/Products";
import ProductsPage from '../pageobjects/ProductsPage';
import { assert } from 'chai';

import dotenv from 'dotenv';
import ShoppingCartPage from '../pageobjects/ShoppingCartPage';
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
    if(maxItems > Products.getNumberOfProducts()) {
        throw new Error("You can't add more items than there are products");
    }

    await loginAction.login(username);
    
    // get unique products to add to the cart
    const products = [];
    let product;
    while(products.length < maxItems) {
        product = Products.getRandomProduct();
        if(!products.includes(product)) {
            products.push(product);
        }
    }

    // add items to the cart
    for(let x = 0; x < products.length; x++) {
        console.log(products[x]);
        await productsPage.addItemToCart(products[x]);
    }

    // go to the cart and verify the items were added
    await productsPage.viewCart();
    let itemsInCart = true;
    for(let x = 0; x < products.length; x++) {
        itemsInCart = itemsInCart && await shoppingCart.verifyItemInCart(product);
    }
    assert.isTrue(itemsInCart, "Expected all items to be in the cart, but not all were.");

    // remove the items from the cart while still on the Products page
    await shoppingCart.continueShopping();
    for(let x = 0; x < products.length; x ++) {
        await productsPage.removeItemFromCart(products[x]);
    }

    // verify items were removed
    await productsPage.viewCart();
    itemsInCart = false;
    for(let x = 0; x < products.length; x++) {
        itemsInCart = itemsInCart || await shoppingCart.verifyItemInCart(product);
    }
    assert.isFalse(itemsInCart, "Expected none of the items to be in the cart, but at least one was.");
})