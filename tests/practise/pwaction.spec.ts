import { test, expect, Locator } from "@playwright/test"

test('Text Input Actions', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const textBox: Locator = page.locator("#name");
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();
    const maxlength: string | null = await textBox.getAttribute("maxlength");
    expect(maxlength).toBe("15");
    await textBox.fill("John canedy");
    // console.log("the content of first name",await textBox.textContent());//returns empty
    const enteredvalue = await textBox.inputValue();
    console.log("the content of first name", enteredvalue);//returns value of particular element
    expect(enteredvalue).toBe("John canedy");
    await page.waitForTimeout(3000);
});

test('Radio Button Actions', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const maleradio: Locator = page.locator("#male");
    await expect(maleradio).toBeVisible();
    await expect(maleradio).toBeEnabled();
    expect(await maleradio.isChecked()).toBe(false);
    await maleradio.check();
    expect(await maleradio.isChecked()).toBe(true);
    await expect(maleradio).toBeChecked();
    await page.waitForTimeout(3000);
});

test.only('CheckBox Actions', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    //select specific checkbox and assert
    const sundaycheckBox: Locator = page.getByLabel('Sunday');
    await sundaycheckBox.check();
    await expect(sundaycheckBox).toBeChecked();
    //capture all checkboxes
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes: Locator[] = days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);

    //select all checkboxes and assert
    for (const checkBox of checkboxes) {
        await checkBox.check();
        await expect(checkBox).toBeChecked();
    }
    await page.waitForTimeout(2000);
    //unselect last 3 boxes and assert
    for (const checkBox of checkboxes.slice(-3)) {
        await checkBox.uncheck();
        await expect(checkBox).not.toBeChecked();
    }
    await page.waitForTimeout(5000);
   //toggle checkboxes select if unchecked uncheck if checked
    for (const checkBox of checkboxes) {
        if (await checkBox.isChecked()) {
            //if checked
            await checkBox.uncheck();
            await expect(checkBox).not.toBeChecked();
        } else {
            //if unchecked
            await checkBox.check();
            await expect(checkBox).toBeChecked();
        }
    }
    await page.waitForTimeout(3000);

   //select random checkbox 1 3 6
    const indexes: number[] = [1, 3, 6];
    for (const i of indexes) {
        await checkboxes[i].check();
        await expect(checkboxes[i]).toBeChecked();
    }
    await page.waitForTimeout(5000);

   //select the checkbox based on label
    const weekname: string = "Friday";
    for (const label of days) {
        if (label.toLowerCase() === weekname.toLowerCase()) {
            const checkbox = await page.getByLabel(label);
            checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }
    await page.waitForTimeout(5000);
});