from appium import webdriver
import subprocess
import time

def start_appium_server():
    subprocess.Popen(['C:\Program Files\Appium\Appium.exe'], stdout=subprocess.PIPE, stderr=subprocess.PIPE )
    print( "Appium server started" )
    time.sleep( 5 )  # Wait for the server to start

def create_driver_session(device_name, app_path, java_class):
    desired_caps = {
        'platformName': 'Android',
        'appium:platformVersion': '10',
        'appium:deviceName': device_name,
        'appium:app': app_path,
        'appium:appPackage': java_class,
        'appium:appActivity': 'MainActivity',
        'appium:automationName': 'UiAutomator2',
        "appium:chromedriverAutoDownload": True, # // Add this line
        'appium:newCommandTimeout': 60000
    }

    driver = webdriver.Remote( 'http://127.0.0.1:4723/wd/hub', desired_caps )
    return driver

if __name__ == '__main__':
    device_name = "R58R1207VAT"
    app_path = "C:\\Android\\app-debug.apk"
    java_class = "com.awm.mcba.floridascarwash"

    start_appium_server()
    driver = create_driver_session( device_name, app_path, java_class )

    # Keep the server running
    try:
        while True:
            time.sleep( 1 )
    except KeyboardInterrupt:
        driver.quit()
        print( "Appium server stopped" )
