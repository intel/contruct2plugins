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

// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.crosswalkads = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	var pluginProto = cr.plugins_.crosswalkads.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};

	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		// Not supported in directCanvas
		if (this.runtime.isDomFree)
		{
			cr.logexport("[Construct 2] crosswalkads plugin not supported on this platform - the object will not be created");
			return;
		}

		if(!window.AdMob){
			cr.logexport("[Construct 2] cordova-admob-pro plugin is required to show ads on Crosswalk.");
			return;
		}

		var pos=this.properties[2];
		var isTestMode=this.properties[3];
		this.AdMob=window.AdMob;
		isTestMode=isTestMode===0?true:false;

		this.androidBannerId=this.properties[0];
		this.androidInterstitalID=this.properties[1];
		this.bannerTopPosition=pos===1?true:false;
		this.isShowBannerAd=false;
		this.isShowingFullscreenAd=false;
		this.AdMob.setOptions({isTesting:isTestMode});
	};

	//////////////////////////////////////
	// Conditions
	function Cnds() {}

	Cnds.prototype.IsShowingBanner=function(){
		return this.isShowBannerAd;
	};


	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {}

	Acts.prototype.ShowBanner = function (layout_)
	{
		 this.AdMob.createBanner( {adId:this.androidBannerId, adSize: 'SMART_BANNER', position:this.bannerTopPosition?2:8});
		 this.isShowBannerAd=true;

	};

	Acts.prototype.ShowFullscreen = function ()
	{
		this.AdMob.prepareInterstitial({adId:this.androidInterstitalID, autoShow:true});
	};

	Acts.prototype.HideBanner = function ()
	{
		this.AdMob.removeBanner();
		this.isShowBannerAd=false;
	};



	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {}

	pluginProto.exps = new Exps();

}());