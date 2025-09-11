import StringHelper from "../data/StringHelper";
import BasePage from "./BasePage";

export default class ProductsPage extends BasePage {
    constructor(pageIn) {
        super(pageIn);
        this.page = pageIn;

        this.cart = this.page.locator('[data-test="shopping-cart-link"]');
        this.itemsInCart = this.cart.locator('.shopping_cart_badge');
    }

    // This function is unstable; sometimes the element resolves to multiple elements, even
    // after waiting, checking that it's attached and visible, and disabling strict mode
    async addItemToCart(product) {
        await this.page.waitForSelector('#inventory_container.inventory_container');
        const buttonId = `add-to-cart-${StringHelper.spacesToDashes(product)}`.toLowerCase();
        let addItemButton = await this.page.locator(`#${buttonId}`);
        let looping = true;
        let counter = 0;

        while(looping) {
            try {
                await this.page.reload();
                addItemButton = await this.page.locator(`#${buttonId}`);
                await addItemButton.click({timeout: 1000});
                looping = false;
            }
            catch(error) {
                counter++;
                if(counter >= 8) {
                    throw new Error(`Retries: ${counter}`, error);
                }
                await this.page.waitForTimeout(250);
            }
        }
    }

    async removeItemFromCart(product) {
        const buttonId = `remove-${StringHelper.spacesToDashes(product)}`.toLowerCase();
        let removeItemButton = await this.page.locator(`#${buttonId}`);
        let looping = true;
        let counter = 0;

        while(looping) {
            try {
                removeItemButton = await this.page.locator(`#${buttonId}`);
                await removeItemButton.click({timeout: 1000});
                looping = false;
            }
            catch(error) {
                counter++;
                if(counter >= 8) {
                    throw new Error(`Retries: ${counter}`, error);
                }
                await this.page.waitForTimeout(250);
            }
        }
    }

    async getNumbersOfItemsInCart() {
        const numberOfItems = await this.itemsInCart.textContent();
        return numberOfItems;
    }

    async viewCart() {
        await this.cart.click();
    }
}