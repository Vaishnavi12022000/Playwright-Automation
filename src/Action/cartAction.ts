import { Page } from "@playwright/test";
import { CartPage } from "../Pages/cartPage";

export class CartAction {
  private readonly cartPage: CartPage;

  constructor(cartPage: CartPage) {
    this.cartPage = cartPage;
  }

  async getCartItemsCount() {
    return await this.cartPage.cartItem.count();
  }
}