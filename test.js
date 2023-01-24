const webdriverio = require( 'webdriverio' );
const wdio = webdriverio.remote();

const appOpener = new AppOpener( wdio );
await appOpener.openCarWashAppAndClickChatButton();

const formFiller = new FormFiller( wdio );
await formFiller.fillAndSubmitRegistrationForm( "Hans", "Schulz", "hans@gmail.com", "princess" );

await wdio.pause( 10000 );
await wdio.deleteSession();

const opts = {
	path: '/wd/hub',
	port: 4723,
	hostname: '0.0.0.0',
	capabilities: {
		platformName: "Android",
		platformVersion: "10",
		"appium:deviceName": "R58MC1M2H9P",
		"appium:app": "C:\\Users\\EG\\AndroidStudioProjects\\floridascarwash\\release\\app-release.apk",
		"appium:appPackage": "com.awm.mcba.floridascarwash",
		"appium:appActivity": "MainActivity",
		"appium:automationName": "UiAutomator2",
		"appium:chromedriverExecutable": "C:\\Android\\chromedriver.exe",
		"appium:newCommandTimeout": 60000,
	}
};


( async function test () {
	const client = await wdio.remote( opts );

	// test openCarWashAppAndClickChatButton
	let contexts = await client.getContexts();
	await client.switchContext( contexts[ 1 ] ); // switch to webview
	const chatButton = await client.$( '//*[@class="mcba_button fas fa-comments"]' );
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
	// click button with id "email_create_account_button"
	const create_account_button = await client.$( '//*[@resource-id="com.awm.mcba.floridascarwash:id/button_create_account"]' );
	await create_account_button.click();
	await client.pause( 10000 );
	await client.deleteSession();
})();
