import { test as base, expect } from "@playwright/test"
import { LoginAction } from "../Action/loginAction"
import { LoginPage } from "../Pages/loginPage";
import{AppAction} from "../Action/appAction";
import { CartAction } from "../Action/cartAction";
import { CartPage } from "../Pages/cartPage";

type Fixtures = {
    loginAction: LoginAction;
    loginPage: LoginPage
    appAction:AppAction
    cartAction:CartAction
    cartPage:CartPage

}

export const test = base.extend<Fixtures>({
    loginAction: async ({ page }, use) => {
        await use( new LoginAction(page));
       
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    cartPage: async ({ page }, use) => {
  await use(new CartPage(page));
  },
    cartAction: async ({ cartPage }, use) => {
  await use(new CartAction(cartPage));
},
    appAction: async ({ page,loginAction,cartAction }, use) => {
        await use(new AppAction(page,loginAction,cartAction));
    },
    });

export {  expect } from "@playwright/test"
