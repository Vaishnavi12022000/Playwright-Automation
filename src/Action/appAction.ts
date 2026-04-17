import { Page } from "@playwright/test";
import { LoginAction } from "./loginAction";
import { CartAction } from "./cartAction"; 


export class AppAction {


    constructor(
        private readonly page:Page,
      private readonly loginAction: LoginAction,
private readonly cartAction: CartAction

    ){}
     async login(username: string, password: string) {
    await this.loginAction.login(username, password);
  }

  async getErrorMessage() {
    return await this.loginAction.getErrorMessage();
  }
}