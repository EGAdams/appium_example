/*
  This will open the car wash app and click on the chat button
  // C:\Users\EG\appium_example>"c:\Users\EG\AppData\Local\Programs\Microsoft VS Code\bin\code" .
*/
const CreateAdmin = require(  './CreateAdmin'         );
const RegisterUser = require( './RegisterUserSMA205U' );
const spawn = require( 'child_process' ).spawn;

const java_class = "com.awm.mcba.floridascarwash";
// const device_name = "R58R1207VAT"; // "R58MC1M2H9P";
const device_name = "SM-A515U";
// const app_path = "C:\\Users\\EG\\AndroidStudioProjects\\floridascarwash\\release\\app-release.apk";
// const app_path = "C:\\Users\\EG\\AndroidStudioProjects\\floridascarwash\\app\\build\\outputs\\apk\\release\\app-release.apk";
// const app_path = "C:\\Android\\app-debug.apk"; // move this from the build folder to this directory
// const java_class = "com.awm.mcba.basecopy";
// const device_name = "R58MC1M2H9P";
// const app_path = "C:\\Users\\EG\\AndroidStudioProjects\\baseparent\\app\\build\\outputs\\apk\\release\\app-release.apk";
const app_path = "C:\\Android\\app-release.apk";
// const app_path = "C:\\Users\\EG\\Desktop\\2022\\florida_car_wash\\baseparent\\app\\build\\outputs\\apk\\release\\app-release.apk";

class AutomationExpert {
	constructor( wdio ) {
		this.wdio = wdio;
		this.opts = {
			path: '/wd/hub',
			port: 4723,
			hostname: '0.0.0.0',
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

		const client = await this.wdio.remote(this.opts);
        let contexts = await client.getContexts();
        console.log('Available contexts:', contexts); // Log available contexts

        try {
            console.log('Switching to context:', contexts[1]);
            await client.switchContext(contexts[1]); // switch to webview
            console.log('Switched to WebView context');

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
        } catch (error) {
            console.error('Error occurred:', error);
        }
	}
}

const wdio = require( "webdriverio" );
// const adminCreator     = new CreateAdmin(      wdio ); adminCreator.execute();
// const automationExpert = new AutomationExpert( wdio ); automationExpert.createTestUser();
const registerNewUser = new RegisterUser( wdio ); registerNewUser.execute();
