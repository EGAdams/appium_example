

# Read the instructions from the horse
Try this 1st.
# Enable Automatic ChromeDriver Download (Optional):

- Some automation tools, like Appium, offer features to automatically download the appropriate ChromeDriver version.
For Appium, you can start the server with the --allow-insecure chromedriver_autodownload flag to enable this feature. Refer to Appium's documentation for more details.

Here are the steps to select the version of ChromeDriver to download:

131.0.6778
https://chromedriver.storage.googleapis.com/LATEST_RELEASE_131.0.6778

1. First, find out which version of Chrome you are using. Go to Android chrome://version.  
In this case it is the 1st one `Google Chrome: 81.0.4044.138 ( chopped the .138 off )`.  Let's say you have Chrome 72.0.3626.81`.
Take the Chrome version number, remove the last part, and append the result to URL https://chromedriver.storage.googleapis.com/LATEST_RELEASE_. For example, with Chrome version 72.0.3626.81, you'd get a URL https://chromedriver.storage.googleapis.com/LATEST_RELEASE_72.0.3626.
    - The last one that worked:
    https://chromedriver.storage.googleapis.com/LATEST_RELEASE_81.0.4044
    
    - still working on this
    https://chromedriver.storage.googleapis.com/LATEST_RELEASE_131.0.6778


2. Use the URL created in the last step to retrieve a small file containing the version of ChromeDriver to use. For example, the above URL will get your a file containing 72.0.3626.69. (The actual number may change in the future, of course.)

3. Use the version number retrieved from the previous step to construct the URL to download ChromeDriver. With version 72.0.3626.69, the URL would be https://chromedriver.storage.googleapis.com/index.html?path=72.0.3626.69/.

That last step did not work.  I ended up finding this one in the same general area: 
https://chromedriver.storage.googleapis.com/index.html?path=81.0.4044.138/
`The win 32 driver works!`
## Just noticed.  This is the ORIGINAL value gotten from Android chrome://version

After the initial download, it is recommended that you occasionally go through the above process again to see if there are any bug fix releases.

## source
https://developer.chrome.com/docs/chromedriver/downloads/version-selection
