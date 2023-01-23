const wdio = require("webdriverio");
const assert = require("assert");

console.log( "Starting test");
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
    "appium:automationName": "UiAutomator2"
  }
};

async function main () {
  console.log("inside main");
  const client = await wdio.remote(opts);

  const field = await client.$("com.awm.mcba.floridascarwash.MainActivity");
  await field.setValue("Hello World!");
  const value = await field.getText();
  assert.strictEqual(value,"Hello World!");

  await client.deleteSession();
}

main();
