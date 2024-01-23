//
// Description: This file contains the test cases for the Florida Car Wash app.
const webdriverio = require( 'webdriverio' );
// const wdio = webdriverio.remote();

const AppOpener = require('./AppOpener');

const opts = {
	path: '/wd/hub',
	port: 4723,
	hostname: 'localhost',
	capabilities: {
        "appium:platformName": "Android",
		"appium:platformVersion": "10",
		"appium:deviceName": "R58R1207VAT", // "R58MC1M2H9P",
		"appium:app": "./app-debug.apk",
		"appium:appPackage": "com.awm.mcba.floridascarwash",
		"appium:appActivity": "MainActivity",
		"appium:automationName": "UiAutomator2",
		"appium:chromedriverExecutable": "C:\\Android\\chromedriver.exe",
        "appium:chromedriverAutoDownload": true, // Add this line
		"appium:newCommandTimeout": 60000,
	}
};

const client = await webdriverio.remote( opts );

( async function test () {
    const appOpener = new AppOpener(client);
    await appOpener.openCarWashAppAndClickChatButton();

    const formFiller = new FormFiller(client);
    await formFiller.fillAndSubmitRegistrationForm("Hans", "Schulz", "hans@gmail.com", "princess");

    await client.pause(10000);
    await client.deleteSession();
})();

