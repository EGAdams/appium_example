# Your role
- Expert Node.js Developer
- Expert Debugger

# Your goal
- Given the error message below, find the bug in the Source code.

## Bash output including error message
```bash
 node index.js
2024-01-23T01:04:48.294Z INFO webdriver: Initiate new session using the WebDriver protocol
2024-01-23T01:04:48.296Z INFO @wdio/utils: Connecting to existing driver at http://localhost:4723/wd/hub
2024-01-23T01:04:49.328Z INFO webdriver: [POST] http://localhost:4723/wd/hub/session
2024-01-23T01:04:49.328Z INFO webdriver: DATA {
  capabilities: {
    alwaysMatch: {
      platformName: 'Android',
      'appium:platformVersion': '10',
      'appium:deviceName': 'R58R1207VAT',
      'appium:app': './app-debug.apk',
      'appium:appPackage': 'com.awm.mcba.floridascarwash',
      'appium:appActivity': 'MainActivity',
      'appium:automationName': 'UiAutomator2',
      'appium:': 'C:\\Android\\chromedriver.exe',
      'appium:newCommandTimeout': 60000
    },
    firstMatch: [ {} ]
  },
  desiredCapabilities: {
    platformName: 'Android',
    'appium:platformVersion': '10',
    'appium:deviceName': 'R58R1207VAT',
    'appium:app': './app-debug.apk',
    'appium:appPackage': 'com.awm.mcba.floridascarwash',
    'appium:appActivity': 'MainActivity',
    'appium:automationName': 'UiAutomator2',
    'appium:': 'C:\\Android\\chromedriver.exe',
    'appium:newCommandTimeout': 60000
  }
}
2024-01-23T01:04:49.648Z ERROR webdriver: RequestError: connect ECONNREFUSED 127.0.0.1:4723
    at ClientRequest.<anonymous> (file:///mnt/c/Users/EG/appium_example/node_modules/got/dist/source/core/index.js:790:107)
    at Object.onceWrapper (node:events:629:26)
    at ClientRequest.emit (node:events:526:35)
    at ClientRequest.emit (node:domain:489:12)
    at Socket.socketErrorListener (node:_http_client:495:9)
    at Socket.emit (node:events:514:28)
    at Socket.emit (node:domain:489:12)
    at emitErrorNT (node:internal/streams/destroy:151:8)
    at emitErrorCloseNT (node:internal/streams/destroy:116:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1595:16)
file:///mnt/c/Users/EG/appium_example/node_modules/webdriver/build/utils.js:69
        throw new Error('Failed to create session.\n' + message);
              ^

Error: Failed to create session.
Unable to connect to "http://localhost:4723/wd/hub", make sure browser driver is running on that address.
It seems like the service failed to start or is rejecting any connections.
    at startWebDriverSession (file:///mnt/c/Users/EG/appium_example/node_modules/webdriver/build/utils.js:69:15)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async WebDriver.newSession (file:///mnt/c/Users/EG/appium_example/node_modules/webdriver/build/index.js:19:45)
    at async remote (file:///mnt/c/Users/EG/appium_example/node_modules/webdriverio/build/index.js:45:22)
    at async RegisterUserSMA205U.execute (/mnt/c/Users/EG/appium_example/RegisterUserSMA205U.js:42:18)

Node.js v20.5.0
```

## Source code
``` javascript
/*
  This will open the car wash app and click on the chat button
*/
const CreateAdmin = require(  './CreateAdmin'         );
const RegisterUser = require( './RegisterUserSMA205U' );
const spawn = require( 'child_process' ).spawn;

const java_class = "com.awm.mcba.floridascarwash";
const device_name = "R58R1207VAT"; // "R58MC1M2H9P";
// const app_path = "C:\\Users\\EG\\AndroidStudioProjects\\floridascarwash\\release\\app-release.apk";
// const app_path = "C:\\Users\\EG\\AndroidStudioProjects\\floridascarwash\\app\\build\\outputs\\apk\\release\\app-release.apk";
const app_path = "./app-debug.apk"; // move this from the build folder to this directory
// const java_class = "com.awm.mcba.basecopy";
// const device_name = "R58MC1M2H9P";
// const app_path = "C:\\Users\\EG\\AndroidStudioProjects\\baseparent\\app\\build\\outputs\\apk\\release\\app-release.apk";

class AutomationExpert {
	constructor( wdio ) {
		this.wdio = wdio;
		this.opts = {
			path: '/wd/hub',
			port: 4723,
			hostname: 'localhost',
			capabilities: {
                platformName: "Android",
                "appium:platformVersion": "10", // Updated from platformVersion
                "appium:deviceName": device_name,
                "appium:app": app_path,
                "appium:appPackage": java_class,
                "appium:appActivity": "MainActivity",
                "appium:automationName": "UiAutomator2",
                "appium:chromedriverExecutable": "C:\\Android\\chromedriver.exe",
                "appium:newCommandTimeout": 60000,
            }
		};
	}

	async createTestUser() {
        const PASSWORD   = "princess"
		const FIRST_NAME = "Giz"
		const LAST_NAME  = "Elle"
        const EMAIL      = "giz@gmail.com"

        // const script = spawn('bash', ['./clean_all_but_admin.sh']);
        // script.stdout.on('data', (data) => { console.log(`stdout: ${data}`); });
        // script.stderr.on('data', (data) => { console.error(`stderr: ${data}`); });
        // script.on('close', (code) => { 
        //     console.log(`child process exited with code ${code}`); });

		const client = await this.wdio.remote( this.opts );
		let contexts = await client. getContexts();
		await client.switchContext( contexts[ 1 ] ); // switch to webview
		const chatButton = await client.$( '//*[@class="mcba_button fas fa-comments"]' );
		await chatButton.click();
		await client.switchContext( contexts[ 0 ] );	// switch to native context

		// wait for name field in Android widget, not webview
		const first_name = await client.$( '//*[@resource-id="' + java_class + ':id/field_fname"]' );
		await first_name.setValue( FIRST_NAME );
		const last_name = await client.$( '//*[@resource-id="' + java_class + ':id/field_lname"]' );
		await last_name.setValue( LAST_NAME );
		const email = await client.$( '//*[@resource-id="' + java_class + ':id/field_email"]' );
		await email.setValue( EMAIL );
		const password = await client.$( '//*[@resource-id="' + java_class + ':id/field_password"]' );
		await password.setValue( PASSWORD );
		const confirm_password = await client.$( '//*[@resource-id="' + java_class + ':id/field_confirm_password"]' );
		await confirm_password.setValue( PASSWORD );
		// click button with id "email_create_account_button"
		const create_account_button = await client.$( '//*[@resource-id="' + java_class + ':id/email_create_account_button"]' );
		await create_account_button.click();
		
		await client.pause( 30000 );
		//await client.deleteSession();
	}
}

const wdio = require( "webdriverio" );
// const adminCreator     = new CreateAdmin(      wdio ); adminCreator.execute();
// const automationExpert = new AutomationExpert( wdio ); automationExpert.createTestUser();
const registerNewUser = new RegisterUser( wdio ); registerNewUser.execute();
const spawn = require( 'child_process' ).spawn;
const java_class = "com.awm.mcba.floridascarwash";
const device_name = "R58R1207VAT"; // "R58MC1M2H9P";
const app_path = "./app-debug.apk";

class RegisterUserSMA205U {
	constructor( wdio ) {
		this.wdio = wdio;
		this.opts = {
			path: '/wd/hub',
			port: 4723,
			hostname: 'localhost',
			capabilities: {
                platformName: "Android",
                "appium:platformVersion": "10", // Updated from platformVersion
                "appium:deviceName": device_name,
                "appium:app": app_path,
                "appium:appPackage": java_class,
                "appium:appActivity": "MainActivity",
                "appium:automationName": "UiAutomator2",
                "appium:": "C:\\Android\\chromedriver.exe",
                "appium:newCommandTimeout": 60000,
            }
		};
	}

	async execute () {
		const FIRST_NAME = "Giz"
		const LAST_NAME = "Elle"
		const EMAIL = "giz@gmail.com"
		const PASSWORD = "princess"

		// console.log( "cleaning all users but admin..." );
		// const script = spawn( 'bash', [ './clean_all_but_admin.sh' ] );
		// script.stdout.on( 'data', ( data ) => { console.log( `stdout: ${data}` ); } );
		// script.stderr.on( 'data', ( data ) => { console.error( `stderr: ${data}` ); } );
		// script.on( 'close', ( code ) => { console.log( `child process exited with code ${code}` ); } );

		const client = await this.wdio.remote( this.opts );
		let contexts = await client.getContexts();
		await client.switchContext( contexts[ 1 ] ); // switch to webview
		const chatButton = await client.$( '//*[@class="mcba_button fas fa-comments"]' );
		await chatButton.click();
		await client.switchContext( contexts[ 0 ] );	// switch to native context

		// wait for name field in Android widget, not webview
		const first_name = await client.$( '//*[@resource-id="' + java_class + ':id/field_fname"]' );
		await first_name.setValue( FIRST_NAME );
		const last_name = await client.$( '//*[@resource-id="' + java_class + ':id/field_lname"]' );
		await last_name.setValue( LAST_NAME );
		const email = await client.$( '//*[@resource-id="' + java_class + ':id/field_email"]' );
		await email.setValue( EMAIL );
		const password = await client.$( '//*[@resource-id="' + java_class + ':id/field_password"]' );
		await password.setValue( PASSWORD );
		const confirm_password = await client.$( '//*[@resource-id="' + java_class + ':id/field_confirm_password"]' );
		await confirm_password.setValue( PASSWORD );
		// click button with id "email_create_account_button"
		const create_account_button = await client.$( '//*[@resource-id="' + java_class + ':id/email_create_account_button"]' );
		await create_account_button.click();

		await client.pause( 30000 );
		//await client.deleteSession();
	}
}

module.exports = RegisterUserSMA205U;
```