const {remote} = require('webdriverio');

const java_class = "com.awm.mcba.floridascarwash";
const device_name = "R58MC1M2H9P";
const app_path = "C:\\Android\\app-release-unsigned.apk";

const capabilities = {
    platformName: "Android",
    "appium:platformVersion": "12", // Corrected capability name
    "appium:deviceName": device_name,
    "appium:app": app_path,
    "appium:appPackage": java_class,
    "appium:appActivity": "MainActivity",
    "appium:automationName": "UiAutomator2",
    "appium:newCommandTimeout": 60000,
    "appium:chromedriverAutoDownload": true
    // "appium:chromedriverExecutable": "C:\\Android\\chromedriver.exe",
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || '0.0.0.0',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const batteryItem = await driver.$('//*[@text="Battery"]');
    await batteryItem.click();
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);