#Construct 2 plugin

This plugin is for Construct 2 to enable Google* IAP in Cordova* applications.  These instructions are for Google* Play IAP inside the Intel® XDK


###Next
To install the plugin and test it, you need to do a few steps.

1. Create your Intel® XDK Project
2. Add the plugin to your project
3. *Build* your project and create an Alpha version (does not require assets)
4. Generate the billing key
5. Add the IAP entries to Google Play
6. Add the billing key to your Intel® XDK Project
7. Rebuild the APK
8. Setup the Alpha testing and enable users to test your app


###Adding the plugin

We will add the wizPurchase plugin to support IAP.  After you export your application, you must create your project in the Intel® XDK from the exported directory.  In the Cordova 3.x Hybrid Mobile App Settings, configure your build settings for Crosswalk or Android.   

First, create a folder inside your "www" directory in your project. We suggest "plugins", since you will store your local Cordova plugins here. We cannot install this plugin via "3rd party" plugins menu in the XDK due to the requirement of modifying files in the plugin.

Download the plugin from Github*. Copy the folder into your "www/plugins" directory inside your XDK project.

In Plugins and Permissions -> Third Party Plugins select "import local plugin" and enter the following values.

```
Name: IAP
Plugin ID: jp.wizcorp.phonegap.plugin.wizPurchase
Import From:  -- navigate to the directory above you created
```

After you have added the plugin, build your application to get the APK.

###Build Alpha

With the APK you have recieved, go into the Google Play Dashboard and create a new application, or upload to an existing application, to the Alpha slot.  This will enabel the billing permission.  After you have uploaded it, click the "Services and API's" menu link to get your "LICENSING & IN-APP BILLING" key.  

Make sure you fill out all the info so you can "publish" your Alpha application!

###Add IAP

Click on "In App Products" and add your IAP products.  The ID's should match what you added in Construct 2

###Billing Key

You will need to build your application and submit it to the Google* Play store to get your billing key. Navigate to the dashboard and create a new application if needed. Submit a new Alpha APK, and fill out all the information you can. You must publish the Alpha APK before you can test on device. After filling out the "

Once you have completed the above steps, add your In-app Products. The ID needs to match what you used in your application. After this, click "Services & API's" and locate your YOUR LICENSE KEY FOR THIS APPLICATION . You will need to modify a file in the Wizcorp plugin and enter the license key.

Go to www->plugins->phonegap-plugin-wizPurchase-develop->platforms->android->res->values and edit billing_key.xml . You will need to copy your key into the value for "billing_key". Without this, your app will NOT work.



##Build/Test

You can now build your application to test on device. But you must enable "Test Users" in your application. You have to build your app and submit the APK in the "Alpha" slot. It must be published, and users must be configured for testing. The easiest way is to set up a Google+* community and invite your test users to that group. Follow the instructions then on inviting your users to test.

##Updates/Testing

It takes about 2-6 hours for updates to go through the Google Play store, so be patient. When you get the link to install the apk as a tester, it may be hours until it is available. Same goes for any updates you push to your code.

Helpful Links

The following are links from Google will help you in implementing IAP in your app.

<a href="http://developer.android.com/google/play/billing/index.html" target="_blank">Google Play In-app Billing</a>

<a href="http://developer.android.com/google/play/billing/billing_testing.html" target="_blank">Testing In-app Billing</a>