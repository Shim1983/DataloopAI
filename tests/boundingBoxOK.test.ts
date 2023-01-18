import {chromium, expect, test} from "@playwright/test"
import dotenv from "dotenv";
import path from 'path';
dotenv.config();

test("login",async() =>{

    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await browser.newPage();

    await page.goto("https://console.dataloop.ai/")
    await page.click("//*[@id=\"loginButton\"]/button")

    //login
    await page.fill("input[name='email']", process.env.email) 
    await page.fill("input[name='password']", process.env.password) 
    await page.click("//*[@id=\"auth0-lock-container-1\"]/div/div[2]/form/div/div/button")

    //enter studio
    await page.click("//*[@id=\"app\"]/div/div[4]/div/div/div[2]/div/div/div/div/div/div/div/div/td[1]/div/div[3]/div/button/span[2]/span/span")
    await page.dblclick("text=dataset1") 
    await page.dblclick("//*[@id=\"item_open_button_63c547ea7a4c3aadcdd5a900\"]")
    

    //delete previous annotations
    await page.waitForTimeout(3000) //this is to allow UI to update
    const isAnnotations=await page.locator("text=All Annotations").textContent()
    console.log("annotations "+ isAnnotations)
    if(isAnnotations!="All Annotations (0)")
    {
        await page.click("//*[@id=\"tabs-panel\"]/div[2]/div/div/div/div/div[3]/div[2]/div[1]/div")
        await page.click("//*[@id=\"tabs-panel\"]/div[2]/div/div/div/div/div[2]/div/div[4]/button")
        await page.click("text=yes")
    }

    //verify all annotaions are deleted
    const areAnnotationsDeleted=await page.locator("text=All Annotations").textContent()
    await expect(areAnnotationsDeleted).toContain('All Annotations (0)')
    

    //draw box
     await page.click("//*[@id=\"toolsMenu\"]/div[4]/div/button")
     const image = page.locator("id=box_container")
     const imageBox = await image.boundingBox()
     console.log("box ",imageBox.width+" "+imageBox.height+" "+imageBox.x+" "+imageBox.y)
     if(imageBox)
     {
        await page.mouse.move(imageBox.x + imageBox.width/4 , imageBox.y + imageBox.height/4 )
        await page.mouse.down()
        await page.mouse.move(imageBox.x + imageBox.width/2 + imageBox.width/4, imageBox.y + imageBox.height/2 + imageBox.height/4 )
        await page.mouse.up()
     }
     
     //save
     await page.click("//*[@id=\"app\"]/div/div[4]/div/div/div[1]/div/div/div[2]/div[3]/div[3]/div/div/div/div/button")

     await page.waitForTimeout(3000);

})
