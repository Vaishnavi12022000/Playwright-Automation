import { test as base } from "@playwright/test"
import { LoginAction } from "../Actions/loginAction"

type Fixtures = {
    loginAction: LoginAction;
}

export const test = base.extend<Fixtures>({
    loginAction: async ({ page }, use) => {
        const loginAction = new LoginAction(page);
        await use(loginAction);
    }
});

export { expect } from "@playwright/test"
