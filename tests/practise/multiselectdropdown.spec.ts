import { test, expect, Locator } from "@playwright/test"

test('multi select drop down', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    // select option from the dropdown(4 ways) 
    //await page.locator("#colors").selectOption(["Red","Green","Blue"]);
    //await page.locator("#colors").selectOption(["red","blue","green"]);
    //await page.locator("#colors").selectOption([{label:"Red"},{label:"Blue"},{label:"Green"}]);
    await page.locator("#colors").selectOption([{ index: 2 }, { index: 3 }]);

    // check the number of options
    const dropdownoptions: Locator = page.locator("#colors>option");
    await expect(dropdownoptions).toHaveCount(7);

    //check an option present int the dropdown
    const optiontext: string[] = (await dropdownoptions.allTextContents()).map(text => text.trim());
    console.log(optiontext);
    expect(optiontext).toContain("Green");

    //printing all options
    for (const option of optiontext) {
        console.log(option);
    }
    await page.waitForTimeout(5000);
});