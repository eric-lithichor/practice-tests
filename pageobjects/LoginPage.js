import BasePage from "./BasePage";
import dotenv from 'dotenv';
dotenv.config();

let page;

let usernameField;
let passwordField;
let loginButton;

const standardPassword = process.env.PASSWORD;
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

    async login(username, password = standardPassword) {
        await usernameField.fill(username);
        await passwordField.fill(password);
        await loginButton.click();
    }

    async getErrorMessage() {
        let loginErrorMessage = await page.locator('[data-test="error"]').innerText();
        return loginErrorMessage;
    }
}