#Construct 2 plugin

This plugin is for Construct 2 to enable Admob* ads in apps built for the Intel® XDK.  Developers can add banner ads and interstial ads.

##Usage

Select the object to add plugins.  You only need one for your game.  There are three actions you can select

```
ShowBanner						Shows a banner ad
HideBanner						Hides the banner ad
ShowFullScreen					Shows an interstitial ad
```

There are four properties you must configure

```
Android ID 						Admob ID for banner ad
Banner Position (Top|Bottom)	Display the banner at the top or bottom
Android Interstitial			Admob ID for interstitial ad
Test Mode (False|True)         When true, serve test ads
```

###Next
After you export your application, you must create your project in the Intel® XDK from the exported directory.  In the Cordova 3.x Hybrid Mobile App Settings, configure your build settings for Crosswalk.  In Plugins and Permissions -> Third Party Plugins select "get plugin from the web" and enter the following values.

```
Name: Cordova Admob Pro
Plugin ID: com.google.cordova.admob
Repo URL: https://github.com/floatinghotpot/cordova-admob-pro
```

For more instructions visit the <a href="https://software.intel.com/en-us/html5/articles/ads-for-crosswalk-and-construct-2" target="_blank">Intel Developer Zone</a>

##Build
Now you are ready to build your application and test it.
