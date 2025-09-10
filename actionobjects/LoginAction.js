import LoginPage from "../pageobjects/LoginPage";
import ActionBaseClass from "./ActionBaseClass";

export default class LoginAction extends ActionBaseClass {
    constructor(pageIn) {
        super(pageIn);
        
        this.page = pageIn;
    }

    async login(username){
        const loginPage = new LoginPage(this.page);

        await loginPage.navigateToBasePage();
        await loginPage.login(username);
    }
}