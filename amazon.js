const puppeteer = require('puppeteer');

const url = process.argv[2];

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({
        width: 1440,
        height: 960,
        deviceScaleFactor: 1,
    });

    let found = false;

    await page.goto(url);

    do {
        console.log(new Date().toLocaleTimeString());
        await page.waitForTimeout(1500);
        if(await page.$('#priceblock_ourprice_lbl')) {
            await page.screenshot({path: Date.now()+'.png'});
            await page.evaluate(() => {
                let test = new Audio("https://www.freesound.org/data/previews/391/391539_5235550-lq.mp3");
                test.loop = true;
                test.play();
            });

            console.log('Found!');
            found = true;
        } else {
            await page.waitForTimeout(30000);
            await page.goto(url);
        }
    } while (found !== true);
})();