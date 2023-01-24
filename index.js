/*
  This will open the car wash app and click on the chat button
*/
// import the needed modules
const wdio = require( "webdriverio" );
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
const app = wdio.remote( opts );

async function main () {
	const client = await wdio.remote( opts );
	let contexts = await client.getContexts();

	// switch to the webview
	await client.switchContext( contexts[ 1 ] );

	// locate the Android WebView button with the class name "mcba_button fas fa-comments" with xpath
	const chatButton = await client.$( '//*[@class="mcba_button fas fa-comments"]' );

	// click the button
	await chatButton.click();

	// Enter the name and email
	const name = await client.$( '//*[@id="name"]' );
	await name.setValue( "John Doe" );
	const email = await client.$( '//*[@id="email"]' );
	await email.setValue( "john@gmail.com" );

	// wait for Android Activity to load
	await client.pause( 15000 );
	await client.deleteSession();
}

main();
