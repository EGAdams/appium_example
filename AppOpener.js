const webdriverio = require( 'webdriverio' );

class AppOpener {
	constructor( wdio, opts ) {
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
	}
}
