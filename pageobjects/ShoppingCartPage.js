import StringHelper from "../data/StringHelper";
import BasePage from "./BasePage";
import dotenv from 'dotenv';
dotenv.config();

export default class ShoppingCartPage extends BasePage {
    constructor(pageIn) {
        super(pageIn);
        this.page = pageIn;
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
}