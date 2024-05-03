const spawn = require( 'child_process' ).spawn;
const java_class = "com.awm.mcba.floridascarwash";
// const device_name = "R58R1207VAT"; // "R58MC1M2H9P";
const device_name = "SM-A515U";
const app_path = "C:\\Android\\app-release.apk";

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
                "appium:newCommandTimeout": 60000,
                // "appium:chromedriverExecutable": "C:\\Android\\chromedriver.exe",
            }
		};
	}

	async execute () {
		const FIRST_NAME = "Giz"
		const LAST_NAME = "Elle"
		const EMAIL = "giz@gmail.com"
		const PASSWORD = "princess"
		const client = await this.wdio.remote(this.opts);
        let contexts = await client.getContexts();
        console.log('Available contexts:', contexts); // Log available contexts

        try {
            contexts = await client.getContexts();

            let new_context = null;
            if ( contexts[ 1 ]) {
                if ( contexts[ 1 ].includes( 'floridascarwash' )) {
                    console.log( "Context 1:", contexts[ 1 ] );
                    console.log('Switching to context:', contexts[ 1 ]);
                    await client.switchContext(contexts[ 1 ]); // switch to webview
                    new_context = contexts[ 1 ];
                    console.log('Switched to WebView context');
                }
            } else { console.log( "Context 1: contexts[ 1 ] is null" ); }
            
            if ( contexts[ 2 ]) {
                if ( contexts[ 2 ].includes( 'floridascarwash' ) ) {
                    console.log('Switching to context:', contexts[ 2 ]);
                    await client.switchContext(contexts[ 2 ]); // switch to webview
                    new_context = contexts[ 2 ];
                    console.log('Switched to WebView context');
                }
            } else { 
                throw new Error('WebView context not found'); }

            const chatButton = await client.$('//*[@class="mcba_button"]');
            console.log('Chat button found:', chatButton);
            await chatButton.click();
            console.log('Clicked on chat button');
            console.log('Switching back to context:', contexts[0]);
            await client.switchContext(contexts[0]); // switch to native context
            console.log('Switched to native context');
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
            const create_account_button = await client.$( '//*[@resource-id="' + java_class + ':id/email_create_account_button"]' );
            await create_account_button.click();
            await client.pause( 30000 );
            await client.pause(30000);
        } catch ( error ) { console.error( 'Error occurred:', error );}
	}
}

module.exports = RegisterUserSMA205U;
