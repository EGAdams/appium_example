const java_class = "com.awm.mcba.floridascarwash";
const device_name = "R58R1207VAT";
const app_path = "C:\\Users\\NewUser\\Desktop\\Android_Source\\AndroidBase\\app\\build\\outputs\\apk\\debug\\app-debug.apk";
const CHROME_DRIVER_PATH = 'C:\\Users\\NewUser\\chromedriver-win64_v131.0.6778.85.exe'
// const CHROME_DRIVER_PATH = './' // Use this if the above fails.  then update the above please!

//  appium --base-path /wd/hub --allow-insecure chromedriver_autodownload
class AutomationExpert {
  constructor(wdio) {
    this.wdio = wdio;
    this.opts = {
        protocol: "http", // Ensure this matches the protocol used
        hostname: "127.0.0.1",
        port: 4723,
        path: "/wd/hub",
        automationProtocol: "webdriver", // Explicitly set the automation protocol
        capabilities: {
            platformName: "Android",
            "appium:androidUseRunningApp": false,
            "appium:deviceName": device_name,
            "appium:automationName": "UiAutomator2",
            "appium:appPackage": "com.awm.mcba.floridascarwash",
            "appium:appActivity": "MainActivity",
            "appium:newCommandTimeout": 60000,
            "appium:chromedriverAutodownload": true,
            "appium:chromedriverExecutableDir": CHROME_DRIVER_PATH,
        },
    };
  }
  

  async createTestUser() {
    const PASSWORD = process.env.PASSWORD || "princess";
    const FIRST_NAME = process.env.FIRST_NAME || "Giz";
    const LAST_NAME = process.env.LAST_NAME || "Elle";
    const EMAIL = process.env.EMAIL || "giz@gmail.com";

    let client;
    try {
      client = await this.wdio.remote(this.opts);
      let contexts = await client.getContexts();
      console.log(`Available contexts: ${JSON.stringify(contexts)}`);

      // Find the WebView context
      let webviewContext = contexts.find((context) => context.includes('WEBVIEW'));
      if (webviewContext) {
        await client.switchContext(webviewContext);
        console.log('Switched to WebView context:', webviewContext);
      } else {
        throw new Error('WebView context not found');
      }

      // Interact with the WebView element
      const chatButton = await driver.findElement("xpath", "//button[contains(@class, 'mcba')]");

      if (await chatButton.isDisplayed()) {
        await chatButton.click();
        console.log('Clicked on chat button');
      } else {
        console.error('Chat button not found or not visible');
      }

      // Switch back to the native context
      await client.switchContext('NATIVE_APP');
      console.log('Switched to native context');

      // Interact with native elements
      const fields = [
        { selector: `//*[@resource-id="${java_class}:id/field_fname"]`, value: FIRST_NAME },
        { selector: `//*[@resource-id="${java_class}:id/field_lname"]`, value: LAST_NAME },
        { selector: `//*[@resource-id="${java_class}:id/field_email"]`, value: EMAIL },
        { selector: `//*[@resource-id="${java_class}:id/field_password"]`, value: PASSWORD },
        { selector: `//*[@resource-id="${java_class}:id/field_confirm_password"]`, value: PASSWORD },
      ];

      for (const field of fields) {
        const element = await client.$(field.selector);
        await element.waitForDisplayed({ timeout: 5000 });
        await element.setValue(field.value);
        console.log(`Set value for element: ${field.selector}`);
      }

      const createAccountButton = await client.$(
        `//*[@resource-id="${java_class}:id/email_create_account_button"]`
      );
      await createAccountButton.waitForDisplayed({ timeout: 5000 });
      await createAccountButton.click();
      console.log('Clicked on create account button');

    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      if (client) {
        await client.deleteSession();
        console.log('Session deleted');
      }
    }
  }
}

const wdio = require('webdriverio');
const automationExpert = new AutomationExpert(wdio);
automationExpert.createTestUser();
