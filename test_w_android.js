//
// Description: This file contains the test cases for the Florida Car Wash app.
const webdriverio = require( 'webdriverio' );
// const wdio = webdriverio.remote();
const opts = {
	path: '/wd/hub',
	port: 4723,
	hostname: 'localhost',
	capabilities: {
		"appium:platformName": "Android",
		"appium:platformVersion": "10",
		"appium:deviceName":  "R58R1207VAT", // "R58MC1M2H9P",
		"appium:app": "C:\\Users\\EG\\Desktop\\2022\\florida_car_wash\\baseparent\\app\\build\\outputs\\apk\\debug\\app-debug.apk",
		"appium:appPackage": "com.awm.mcba.floridascarwash",
		"appium:appActivity": "MainActivity",
		"appium:automationName": "UiAutomator2",
		"appium:chromedriverExecutable": "C:\\Android\\chromedriver.exe",
        "appium:chromedriverAutoDownload": true, // Add this line
		"appium:newCommandTimeout": 60000,
	}
};

( async function test () {
	const client = await webdriverio.remote( opts );

	// test openCarWashAppAndClickChatButton
	let contexts = await client.getContexts();
	await client.switchContext( contexts[ 1 ] ); // switch to webview // changed to 0 "NATIVE_APP"
	// const chatButton = await client.$( '//*[@class="mcba_button"]' );
    const chatButton = await client.$( '//*[@class="mcba_button" and contains(span, "Chat")]' );
	await chatButton.click();

	// test fillAndSubmitRegistrationForm
	await client.switchContext( contexts[ 0 ] ); // switch to native context
	const first_name = await client.$( '//*[@resource-id="com.awm.mcba.floridascarwash:id/field_fname"]' );
	await first_name.setValue( "Hans" );
	const last_name = await client.$( '//*[@resource-id="com.awm.mcba.floridascarwash:id/field_lname"]' );
	await last_name.setValue( "Schulz" );
	const email = await client.$( '//*[@resource-id="com.awm.mcba.floridascarwash:id/field_email"]' );
	await email.setValue( "hans@gmail.com" );
	const password = await client.$( '//*[@resource-id="com.awm.mcba.floridascarwash:id/field_password"]' );
	await password.setValue( "princess" );
	const confirm_password = await client.$( '//*[@resource-id="com.awm.mcba.floridascarwash:id/field_confirm_password"]' );
	await confirm_password.setValue( "princess" );
	const create_account_button = await client.$( '//*[@resource-id="com.awm.mcba.floridascarwash:id/button_create_account"]' );
	await create_account_button.click();
	await client.pause( 10000 );
	await client.deleteSession();

    const appOpener = new AppOpener(client);
    await appOpener.openCarWashAppAndClickChatButton();

    const formFiller = new FormFiller(client);
    await formFiller.fillAndSubmitRegistrationForm("Hans", "Schulz", "hans@gmail.com", "princess");

    await client.pause(10000);
    await client.deleteSession();
})();

