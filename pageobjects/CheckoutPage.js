import BasePage from "./BasePage";

export default class CheckoutPage extends BasePage{
    constructor(pageIn) {
        super(pageIn);
        this.page = pageIn;

        this.firstnameField = this.page.locator('[data-test="firstName"]');
        this.lastnameField = this.page.locator('[data-test="lastName"]')
        this.zipcodeField = this.page.locator('[data-test="postalCode"]');
        this.continueButton = this.page.locator('[data-test="continue"]');
    }

    async fillOutPurchaseForm(data) {
        await this.firstnameField.fill(data.firstname);
        await this.lastnameField.fill(data.lastname);
        await this.zipcodeField.fill(data.zipcode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}