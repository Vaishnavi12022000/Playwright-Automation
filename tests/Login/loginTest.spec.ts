
import loginData from "../../src/testdata/login.json";
import { test, expect } from "../../src/Fixture/Fixture"

test.beforeEach(async ({ page }) => {
    await page.goto(loginData.baseUrl);
})

test('TC01 -valid user should login successfully', async ({ appAction }) => {
    await appAction.login(loginData.validUser.Username, loginData.validUser.Password);
    //await expect(page).toHaveTitle(loginData.PageTile);
    //await expect(page).toHaveURL(/inventory/);
});

test('TC02 -lock user should not login', async ({ appAction }) => {
    await appAction.login(loginData.lockedUser.Username, loginData.lockedUser.Password);
    const errorMessage = await appAction.getErrorMessage();
    await expect(errorMessage).toHaveText(loginData.lockedUser.errorMessage);
});

test('TC03 -invalid user should not login ', async ({ appAction }) => {
    await appAction.login(loginData.invalidUser.Username, loginData.invalidUser.Password);
    const errorMessage = await appAction.getErrorMessage();
    await expect(errorMessage).toHaveText(loginData.invalidUser.errorMessages);
});
