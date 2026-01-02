import StringHelper from "../data/StringHelper";
import BasePage from "./BasePage";
import dotenv from 'dotenv';
dotenv.config();

export default class ShoppingCartPage extends BasePage {
    constructor(pageIn) {
        super(pageIn);
        this.page = pageIn;

        this.checkoutButton = this.page.locator('[data-test="checkout"]');
        this.listOfItems = this.page.locator('[data-test="inventory-item"]');
    }
    
    async verifyItemInCart(item) {
        const listOfItems = await this.page.locator('[data-test="cart-list"]').textContent();
        const itemPresent = listOfItems.includes(item);
        return itemPresent;
    }

    async removeItemFromCart(item) {
        const buttonTestId = `remove-${StringHelper.spacesToDashes(item)}`.toLowerCase();
        const removeButton = await this.page.locator(`[data-test="${buttonTestId}"]`);
        await removeButton.click();
    }

    async continueShopping() {
        await this.page.locator('#continue-shopping').click();
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async verifyProductsPresent(products) {
        const shoppingCart = new ShoppingCartPage(this.page);
        let itemsInCart = true;
        for(let x = 0; x < products.length; x++) {
            itemsInCart = itemsInCart && await shoppingCart.verifyItemInCart([products[x]]);
        }
        return itemsInCart;
    }

    async countItemsInCart() {
        const items = await this.listOfItems;
        const count = await items.count();
        // the two remaining divs are the quantity and description labels
        return count;
    }
}