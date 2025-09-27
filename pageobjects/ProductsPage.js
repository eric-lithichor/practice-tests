import SortOrder from "../data/SortOrder";
import StringHelper from "../data/StringHelper";
import BasePage from "./BasePage";

export default class ProductsPage extends BasePage {
    constructor(pageIn) {
        super(pageIn);
        this.page = pageIn;

        this.cart = this.page.locator('[data-test="shopping-cart-link"]');
        this.itemsInCart = this.cart.locator('.shopping_cart_badge');
    }

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

    async sortProducts(sortMethod) {
        const sortMethodSelector = await this.page.locator('[data-test="product-sort-container"]');
        const sortIdentifier = SortOrder.getSortidentifier(sortMethod, 'label');
        
        await sortMethodSelector.selectOption({label: sortIdentifier});
    }
    
    async getProductTitles() {
        await this.page.waitForSelector('.inventory_list');
        let allProductTitles = [];
        const arrayOfTitleElements = await this.page.locator('.inventory_list').locator('.inventory_item_name ').all();
        for(let x = 0; x < arrayOfTitleElements.length; x++) {
            let itemPrice = await arrayOfTitleElements[x].textContent();
            allProductTitles.push(itemPrice);
        }
        return allProductTitles;
    }
    
    async getProductPrices() {
        await this.page.waitForSelector('.inventory_list');
        let allProductPrices = [];
        const arrayOfTitleElements = await this.page.locator('.inventory_list').locator('.inventory_item_price ').all();
        for(let x = 0; x < arrayOfTitleElements.length; x++) {
            let itemPrice = Number((await arrayOfTitleElements[x].textContent()).replace('$', ''));
            allProductPrices.push(itemPrice);
        }
        return allProductPrices;
    }
}