/*
  This will open the car wash app and click on the chat button
*/
class AutomationExpert {
	constructor( wdio ) {
		this.wdio = wdio;
		this.opts = {
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
	}

	async openCarWashAppAndClickChatButton () {
		const client = await this.wdio.remote( this.opts );
		let contexts = await client.getContexts();
		await client.switchContext( contexts[ 1 ] ); // switch to webview
		const chatButton = await client.$( '//*[@class="mcba_button fas fa-comments"]' );
		await chatButton.click();

		// switch to native context
		await client.switchContext( contexts[ 0 ] );

		// wait for name field in Android widget, not webview
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
		const create_account_button = await client.$( '//*[@resource-id="com.awm.mcba.floridascarwash:id/email_create_account_button"]' );
		await create_account_button.click();
		
		await client.pause( 10000 );
		await client.deleteSession();
	}
}

const wdio = require( "webdriverio" );
const automationExpert = new AutomationExpert( wdio );
automationExpert.openCarWashAppAndClickChatButton();
