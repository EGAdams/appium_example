from appium import webdriver
from appium.options.android import UiAutomator2Options
import subprocess
import time

def start_appium_server():
    subprocess.Popen(['appium'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    print("Appium server started")
    time.sleep(5)  # Wait for the server to start

def create_driver_session(device_name, app_path, java_class):
    options = UiAutomator2Options()
    options.platform_name = 'Android'
    options.platform_version = '10'
    options.device_name = device_name
    options.app = app_path
    options.app_package = java_class
    options.app_activity = 'MainActivity'
    options.automation_name = 'UiAutomator2'
    options.chromedriver_autodownload = True
    options.new_command_timeout = 60000

    driver = webdriver.Remote('http://127.0.0.1:4723', options=options)
    return driver

if __name__ == '__main__':
    device_name = "R58R1207VAT"
    app_path = r"C:\Users\NewUser\Desktop\Android_Source\AndroidBase\app\build\outputs\apk\debug\app-debug.apk"
    java_class = "com.awm.mcba.floridascarwash"

    start_appium_server()
    driver = create_driver_session(device_name, app_path, java_class)

    # Keep the server running
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        driver.quit()
        print("Appium server stopped")

