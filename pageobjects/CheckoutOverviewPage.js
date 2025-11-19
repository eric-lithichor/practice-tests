import BasePage from "./BasePage";

const checkoutMessageExpectedOne = "Thank you for your order!";
const checkoutMessageExpectedTwo = "Your order has been dispatched, and will arrive just as fast as the pony can get there!";

export default class CheckoutOverviewPage extends BasePage {
    constructor(pageIn) {
        super(pageIn);
        this.page = pageIn;

        this.cartList = this.page.locator('[data-test="cart-list"]');
        this.finishButton = this.page.locator('[data-test="finish"]');
        this.checkoutCompleteContainer = this.page.locator('[data-test="checkout-complete-container"]');
    }

    async verifyItemsInOverview(items) {
        const cartListText = await this.cartList.textContent();
        let itemsPresent = true;

        for(let x = 0; x < items.length; x++) {
            if(!cartListText.includes(items[x])) {
                itemsPresent = false;
            }
        }

        return itemsPresent;
    }

    async finish() {
        await this.finishButton.click();
    }

    async verifyCheckoutMessage() {
        const checkoutMessage = await this.checkoutCompleteContainer.textContent();
        if(!checkoutMessage.includes(checkoutMessageExpectedOne)) {
            return false;
        }
        if(!checkoutMessage.includes(checkoutMessageExpectedTwo)) {
            return false;
        }
        return true;
    }
}