import BasePage from "./BasePage";
import dotenv from 'dotenv';
dotenv.config();

export default class MenuPage extends BasePage {
    constructor(pageIn) {
        super(pageIn);
        
        this.page = pageIn;

        this.menu = this.page.getByRole('button', { name: 'Open Menu' });
        this.logoutBtn = this.page.locator('[data-test="logout-sidebar-link"]');
        this.allItems = this.page.locator('[data-test="inventory-sidebar-link"]');
        this.resetAppStateBtn = this.page.locator('[data-test="reset-sidebar-link"]');
    }

    async logout() {
        await this.menu.click();
        await this.logoutBtn.click();
    }

    async navigateToProductsPage() {
        await this.menu.click();
        await this.allItems.click();
    }

    async resetAppState() {
        await this.menu.click();
        await this.resetAppStateBtn.click();
    }
}