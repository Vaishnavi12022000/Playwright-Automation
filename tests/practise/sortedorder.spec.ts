import{test,expect,Locator} from "@playwright/test"
 test('verify drop down is sorted', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
const dropdownoptions:Locator=page.locator("#animals>option");//sorted
//const dropdownoptions: Locator = page.locator("#colors>option");//not sorted
//console.log(await dropdownoptions.allTextContents());

const optiontext:string[]=(await dropdownoptions.allTextContents()).map(text=>text.trim());
const originaltext:string[]=[...optiontext];
const sortedlist:string[]=[...optiontext].sort();
console.log("originalist",originaltext);
console.log("sortedlist",sortedlist);
expect(originaltext).toEqual(sortedlist);
    await page.waitForTimeout(5000);
 });