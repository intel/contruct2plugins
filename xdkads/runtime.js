/* Copyright (c) 2014 Intel Corporation. All rights reserved.
* Use of this source code is governed by a MIT-style license that can be
* found in the LICENSE file.
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