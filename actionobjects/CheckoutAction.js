import CheckoutPage from "../pageobjects/CheckoutPage";
import ProductsPage from "../pageobjects/ProductsPage";
import ShoppingCartPage from "../pageobjects/ShoppingCartPage";
import ActionBaseClass from "./ActionBaseClass";

export default class CheckoutAction extends ActionBaseClass {
    constructor(pageIn) {
        super(pageIn);
        
        this.page = pageIn;
    }

    async beginCheckout(checkoutData) {
        const productsPage = new ProductsPage(this.page);
        const shoppingCartPage = new ShoppingCartPage(this.page);
        const checkoutPage = new CheckoutPage(this.page);

        await productsPage.viewCart();
        await shoppingCartPage.checkout();
        await checkoutPage.fillOutPurchaseForm(checkoutData);
        await checkoutPage.clickContinue();
    }
}