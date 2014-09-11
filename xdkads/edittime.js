/* Copyright (c) 2014 Intel Corporation. All rights reserved.
* Use of this source code is governed by a MIT-style license that can be
* found in the LICENSE file.
*/

function GetPluginSettings()
{
	return {
		"name":			"Intel® XDK Ads",
		"id":			"xdkads",
		"version":		"1.0",
		"description":	"AdMob ads for Intel® XDK.",
		"author":		"Intel",
		"help url":		"https://software.intel.com/en-us/html5/articles/ads-for-crosswalk-and-construct-2",
		"category":		"Platform specific",
		"type":			"object",			// appears in layout
		"rotatable":	false,
		"flags":		pf_position_aces | pf_size_aces | pf_singleglobal
	};
};

AddCondition(0, 0, "Is showing banner ad", "Ads", "Is showing banner ad", "True if currently showing a banner ad.", "IsShowingBanner");

/**
 * Actions
 */

 AddAction(0, 0, "Show banner ad", "Ads", "Show banner ad", "Show a banner ad on the screen while the game is running.", "ShowBanner");

 AddAction(1, 0, "Show fullscreen ad", "Ads", "Show fullscreen ad", "Show a fullscreen advert that hides the running game.", "ShowFullscreen");

 AddAction(2, 0, "Hide banner ad", "Ads", "Hide banner ad", "Hide any currently showing banner ad.", "HideBanner");


ACESDone();

// Property grid properties for this plugin
var property_list = [
	new cr.Property(ept_text,	"Banner ID",				"",		"Banner ad id"),
	new cr.Property(ept_text,	"Interstitial",				"",		"Interstitial id"),
	new cr.Property(ept_combo,	"Banner position",				"Bottom",		"Banner position","Bottom|Top"),
	new cr.Property(ept_combo,	"Test Mode",				"True",		"Show test ads.","False|True")
	];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");

	// Save the constructor parameters
	this.instance = instance;
	this.type = type;

	// Set the default property values from the property table
	this.properties = {};

	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;

	// Plugin-specific variables
	this.just_inserted = false;
}

IDEInstance.prototype.OnCreate = function()
{

}

IDEInstance.prototype.OnInserted = function()
{
}

IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor
IDEInstance.prototype.Draw = function(renderer)
{
}

IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}