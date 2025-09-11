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
    async addProductToCart(product) {
        await this.page.waitForSelector('#inventory_container.inventory_container');
        const itemButton = await this.page.getByText(product).locator('../../../..').getByRole('button');

        await itemButton.click();
    }

    async getNumbersOfItemsInCart() {
        const numberOfItems = await this.itemsInCart.textContent();
        return numberOfItems;
    }

    async viewCart() {
        await this.cart.click();
    }
}