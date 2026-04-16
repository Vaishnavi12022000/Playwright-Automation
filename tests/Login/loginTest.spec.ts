import { test, expect } from "@playwright/test"
import { LoginAction } from "../../src/Actions/loginAction"
import loginData from "../../src/testdata/login.json";

test.beforeEach(async ({ page }) => {
    await page.goto(loginData.baseUrl);
})

test('TC01 -valid user should login successfully', async ({ page }) => {
    const loginAction = new LoginAction(page);
    await loginAction.login(loginData.validUser.Username, loginData.validUser.Password);
    await expect(page).toHaveTitle(loginData.PageTile);
    await expect(page).toHaveURL(/inventory/);
});

test('TC02 -lock user should not login', async ({ page }) => {
    const loginAction = new LoginAction(page);
    await loginAction.login(loginData.lockedUser.Username, loginData.lockedUser.Password);
  const errorMessage=await loginAction.getErrorMessage();
  await expect(errorMessage).toHaveText(loginData.lockedUser.errorMessage);
});

test('TC03 -invalid user should not login ', async ({ page }) => {
    const loginAction = new LoginAction(page);
    await loginAction.login(loginData.invalidUser.Username, loginData.invalidUser.Password);
      const errorMessage=await loginAction.getErrorMessage();
  await expect(errorMessage).toHaveText(loginData.invalidUser.errorMessages);
});
