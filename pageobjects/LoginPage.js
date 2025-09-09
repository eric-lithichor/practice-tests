import BasePage from "./BasePage";
require('dotenv').config();

let page;

let usernameField;
let passwordField;
let loginButton;

const password = process.env.PASSWORD;
const url = process.env.BASEURL;

export default class LoginPage extends BasePage {
    constructor(pageIn) {
        super(pageIn);
        
        page = pageIn;

        usernameField = page.locator("#user-name");
        passwordField = page.locator("#password");
        loginButton = page.locator("#login-button");

    }

    async navigateToBasePage() {
        await page.goto(url);
    }

    async login(username) {
        await usernameField.fill(username);
        await passwordField.fill(password);
        await loginButton.click();
    }

    async getErrorMessage() {
        let loginErrorMessage = await page.locator('[data-test="error"]').innerText();
        // let loginErrorMessage = await page.locator('[data-test="error"]').textContext();

        return loginErrorMessage;
    }
}