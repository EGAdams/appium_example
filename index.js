//
//
//
const webdriver = require( 'selenium-webdriver' );
const assert = require( 'assert' );
const By = webdriver.By;

const capabilities = {
	platformName: "Android",
	platformVersion: "8.0",
	deviceName: "Android Emulator",
	app: "C:/Users/EG/Downloads/ApiDemos-debug.apk",
	appPackage: "io.appium.android.apis",
	appActivity: ".view.TextFields",
	automationName: "UiAutomator2"
};

const driver = new webdriver.Builder().forBrowser( 'chrome' )
	.usingServer( 'http://localhost:4723/wd/hub' )
	.withCapabilities( capabilities )
	.build();

driver.findElement( By.id( 'android.widget.EditText' ) ).sendKeys( 'Hello World!' );

driver.findElement( By.id( 'android.widget.EditText' ) ).getText().then( function ( value ) {
	assert.equal( value, 'Hello World!' );
});

driver.quit();

