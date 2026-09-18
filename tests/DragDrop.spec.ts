import {test, expect} from '@playwright/test'
import { appendFile } from 'node:fs';

test('Drag & Drop', async({page}) => {
    await page.goto("https://practice.expandtesting.com/drag-and-drop");
    await page.locator('#column-a').dragTo(page.locator('#column-b'));

})

    //Drag the circles
 test('Drag & Drop with cricles', async({page}) => {
    await page.goto("https://practice.expandtesting.com/drag-and-drop-circles");
    await page.locator(".red").dragTo(page.locator("#target"));
    await page.locator(".green").dragTo(page.locator("#target"));
    await page.locator(".blue").dragTo(page.locator("#target"));



})
