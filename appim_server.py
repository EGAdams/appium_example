from appium import webdriver
from appium.options.android import UiAutomator2Options
import subprocess
import time
import os

def start_appium_server():
    subprocess.Popen(
        ['appium', '--base-path', '/wd/hub'],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        shell=True
    )
    print("Appium server started with base path /wd/hub")
    time.sleep(5)  # Wait for the server to start

def create_driver_session(device_name, app_path, java_class, chromedriver_path):
    options = UiAutomator2Options()
    options.platform_name = 'Android'
    options.platform_version = '10'
    options.device_name = device_name
    options.app = app_path
    options.app_package = java_class
    options.app_activity = 'MainActivity'
    options.automation_name = 'UiAutomator2'
    options.new_command_timeout = 60000
    options.chromedriver_executable = chromedriver_path  # Specify the ChromeDriver path

    driver = webdriver.Remote('http://127.0.0.1:4723/wd/hub', options=options)
    return driver

if __name__ == '__main__':
    device_name = "R58R1207VAT"
    app_path = r"C:\\Users\\NewUser\Desktop\\Android_Source\\AndroidBase\\app\build\\outputs\\apk\debug\\app-debug.apk"
    java_class = "com.awm.mcba.floridascarwash"

    # Determine the absolute path to the ChromeDriver executable in node_modules
    chromedriver_path = os.path.abspath(
        './node_modules/chromedriver/lib/chromedriver/chromedriver'
    )

    start_appium_server()
    driver = create_driver_session(device_name, app_path, java_class, chromedriver_path)

    # Keep the server running
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        driver.quit()
        print("Appium server stopped")
