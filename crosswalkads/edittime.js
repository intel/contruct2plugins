/**
 * @license Copyright 2013 - 2014 Intel Corporation All Rights Reserved.
 *
 * The source code, information and material ("Material") contained herein is owned by Intel Corporation or its
 * suppliers or licensors, and title to such Material remains with Intel Corporation or its suppliers or
 * licensors. The Material contains proprietary information of Intel or its suppliers and licensors. The
 * Material is protected by worldwide copyright laws and treaty provisions. No part of the Material may be used,
 * copied, reproduced, modified, published, uploaded, posted, transmitted, distributed or disclosed in any way
 * without Intel's prior express written permission. No license under any patent, copyright or other intellectual
 * property rights in the Material is granted to or conferred upon you, either expressly, by implication,
 * inducement, estoppel or otherwise. Any license under such intellectual property rights must be express and
 * approved by Intel in writing.
 *
 * Unless otherwise agreed by Intel in writing, you may not remove or alter this notice or any other notice
 * embedded in Materials by Intel or Intel's suppliers or licensors in any way.
 */

function GetPluginSettings()
{
	return {
		"name":			"Crosswalk Ads",
		"id":			"crosswalkads",
		"version":		"1.0",
		"description":	"AdMob ads for Crosswalk.",
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
	new cr.Property(ept_text,	"Android ID",				"",		"Android banner ad id"),
	new cr.Property(ept_text,	"Android Interstitial",				"",		"Android interstitial id"),
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