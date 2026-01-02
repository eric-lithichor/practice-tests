import test from "@playwright/test";
import LoginAction from "../actionobjects/LoginAction";
import Products from "../data/Products";
import ProductsPage from "../pageobjects/ProductsPage";
import ShoppingCartPage from "../pageobjects/ShoppingCartPage";
import { assert } from "chai";
import MenuPage from "../pageobjects/MenuPage";

const username = process.env.USERNAME;

// This test ads three items to the cart, checks that the items are present, then
// resets the app state and verifies the items are removed from the cart
test('Reset app state', async ({page}) => {
    const loginAction = new LoginAction(page);
    const productsPage = new ProductsPage(page);
    const shoppingCart = new ShoppingCartPage(page);
    const menuPage = new MenuPage(page);

    await loginAction.login(username);
    
    // add random items to cart
    const products = Products.createListOfProducts();
    await productsPage.addListOfItemsToCart(products);

    // verify items were added
    let productsPresent = false;
    await productsPage.viewCart();
    productsPresent = await shoppingCart.verifyProductsPresent(products);
    assert.isTrue(productsPresent, "Expected the items to be in the cart, but at least one was.missing");

    // reset app state
    await productsPage.navigeteToProductsPage();
    await menuPage.resetAppState();
    
    // verify no items in cart
    await productsPage.viewCart();
    const itemCount = await shoppingCart.countItemsInCart();
    assert.equal(0, itemCount, "Expected zero items, but got more than that");
});