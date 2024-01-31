# Persona
You are a world-class Node JS Developer specializing in automated Web UI testing.  
You are a master of the Selenium Webdriver API and can write tests in your sleep.
You know all about installing, configuring and running Appium, Selenium and Chromedriver.

The way the logic goes now if the context includes "floridascarwash", then we switch to that context.
The line that is hanging is:

```javascript
await client.switchContext(contexts[1]); // switch to webview
```
After switching contexts to WebView ( contexts[ 1 ]), the process does not move to the next line.

Here is the source code:
# Source Code
```javascript
const spawn = require( 'child_process' ).spawn;
const java_class = "com.awm.mcba.floridascarwash";
const device_name = "R58R1207VAT"; // "R58MC1M2H9P";
const app_path = "C:\\Android\\app-debug.apk";

class RegisterUserSMA205U {
	constructor( wdio ) {
		this.wdio = wdio;
		this.opts = {
			path: '/wd/hub',
			port: 4723,
			hostname: '127.0.0.1',
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

		const client = await this.wdio.remote(this.opts);
        let contexts = await client.getContexts();
        console.log('Available contexts:', contexts); // Log available contexts

        try {
             // Add a delay to ensure WebView is ready
            await client.pause(5000);

            // Re-fetch and validate contexts
            contexts = await client.getContexts();
            let new_context = null;
            if ( contexts[1].includes( 'floridascarwash' ) ) {
                console.log('Switching to context:', contexts[1]);
                await client.switchContext(contexts[1]); // switch to webview
                new_context = contexts[1];
                console.log('Switched to WebView context');
            } else if ( contexts[2].includes( 'floridascarwash' ) ) {
                console.log('Switching to context:', contexts[2]);
                await client.switchContext(contexts[2]); // switch to webview
                new_context = contexts[2];
                console.log('Switched to WebView context');
            } else {
                throw new Error('WebView context not found');
            }

            


            // console.log('Switching to context:', new_context );
            // await client.switchContext( new_context ); // switch to webview
            // console.log('Switched to WebView context');

            const chatButton = await client.$('//*[@class="mcba_button"]');
            console.log('Chat button found:', chatButton);
            await chatButton.click();
            console.log('Clicked on chat button');

            console.log('Switching back to context:', contexts[0]);
            await client.switchContext(contexts[0]); // switch to native context
            console.log('Switched to native context');


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
            await client.pause(30000);
        } catch (error) {
            console.error('Error occurred:', error);
        }
	}
}

module.exports = RegisterUserSMA205U;
```

If I switch to contexts[ 0 ], the next line is executed, but the element is not found.  I think it is because it needs to be in a web view context to find element.

# Error Message
```error
2024-01-31T14:47:22.081Z ERROR webdriver: Request failed with status 500 due to unknown error: An unknown server-side error occurred while processing the command. Original error: Can't stop process; it's not currently running (cmd: 'C:\\Android\\chromedriver.exe --url-base\=wd/hub --port\=8000 --adb-port\=5037 --verbose')
```

# Your Task
Analyze the source code and find out why the process is hanging.  Help me debug this error.
