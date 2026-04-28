import { test, expect, Locator } from "@playwright/test"

test('single select drop down', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // select option from the dropdown(4 ways) 
    //await page.locator("#country").selectOption("India");
    //await page.locator("#country").selectOption({value:"canada"});
    //await page.locator("#country").selectOption({label:"India"});
    await page.locator("#country").selectOption({ index: 3 });

    //check number of options in drop down
    const dropdownoptions: Locator = page.locator("#country>option");
    await expect(dropdownoptions).toHaveCount(10);

    //check an option present int the dropdown
    const optiontext: string[] =( await dropdownoptions.allTextContents()).map(text=>text.trim());
    console.log(optiontext);
    expect(optiontext).toContain("Japan");

    //printing all options
    for(const option of  optiontext)
    {
        console.log(option);
    }
    await page.waitForTimeout(5000);
})