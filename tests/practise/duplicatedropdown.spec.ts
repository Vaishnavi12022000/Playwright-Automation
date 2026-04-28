import{test,expect,Locator} from "@playwright/test"
 test('verify drop down contains duplicates', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
const dropdownoptions:Locator=page.locator("#animals>option");//not having dupliactes
//const dropdownoptions: Locator = page.locator("#colors>option");//having duplicates
const optiontext:string[]=(await dropdownoptions.allTextContents()).map(text=>text.trim());

const myset =new Set<string>();
const duplicates:string[]=[];

for(const text of optiontext){
    if(myset.has(text))
    {
        duplicates.push(text);
    }
    else{
        myset.add(text);
    }
}

console.log("duplicateoptions are",duplicates);

if(duplicates.length>0){
    console.log("duplicates are found");
}
else{
    console.log("no duplicates are found");
}

expect(duplicates.length).toBe(0);
    await page.waitForTimeout(5000);
 });