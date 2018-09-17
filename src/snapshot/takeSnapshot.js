const puppeteer = require('puppeteer');
async function takeSnapshot(url,hideHeader=false){
	const browser = await puppeteer.launch({headless:hideHeader,
											// slowMo:250,
											defaultViewport:{width:1200,height:2600}
											// handleSIGINT:false
											});
	const page = await browser.newPage();
	page.on('load', () => console.log('Page loaded!: ' + page.url()));
    await page.goto(url); /* global url */
    await page.screenshot({path: 'EE.png'});
	
	console.log("Iam done!");
	await browser.close();
};

// login();
module.exports={
	takeSnapshot:takeSnapshot
};
