import { Locator, Page } from "@playwright/test";
export class CartPage {
    readonly page: Page;
    readonly cartItem: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.cartItem = page.locator('.cart_item');
    }

    }