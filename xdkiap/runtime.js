/* Copyright (c) 2014 Intel Corporation. All rights reserved.
* Use of this source code is governed by a MIT-style license that can be
* found in the LICENSE file.
*/

function xdkIAP()
{
    this.onpurchasesuccess = null;
    this.onpurchasefail = null;

    this.onconsumesuccess = null;
    this.onconsumefail = null;

    this.onstorelistingsuccess = null;
    this.onstorelistingfail = null;

    this.product_id_list = [];

    this.existing_purchases = [];
    this.product_info = [];


    this.restorePurchases(); //restore the purchases to see what we have
    this.storeBroker=window.wizPurchase||null;
}

xdkIAP.prototype.isAvailable = function () {
    return this.storeBroker;
};
xdkIAP.prototype.supportsConsumables = function () {
    return this.isAvailable();
};
xdkIAP.prototype.addProductIds = function (ids) {
    if(ids.indexOf(",")===-1){
        this.product_id_list.push(ids);
    }
    else{
        this.product_id_list.push.apply(this.product_id_list,ids.split(","));
    }
};
xdkIAP.prototype.isTrial = function () {
    return !this.isLicensed();
};
xdkIAP.prototype.isLicensed = function () {
    return this.hasProduct("app");
};
xdkIAP.prototype.hasProduct = function (product_) {
    return this.existing_purchases.hasOwnProperty(product_);
};
xdkIAP.prototype.purchaseApp = function () {
    return this.purchaseProduct("app");
};
xdkIAP.prototype.purchaseProduct = function (product_) {
    if(!this.isAvailable() ) return;
    var self=this;
    this.storeBroker.makePurchase(product_,function(success){
        //update products
        self.existing_purchases[product_]=true;
        if(self.onpurchasesuccess){
            self.onpurchasesuccess(product_,success);
        }
    },function(res){
        if(self.onpurchasefail){
            self.onpurchasefail(product_,res);
        }
    });
};
xdkIAP.prototype.restorePurchases = function () {
    var self=this;
    if(!this.isAvailable()) return;
    this.storeBroker.restoreAll(function(res){
        //iterate through
        for(var i=0;i<res.length;i++){
            self.existing_purchases[res[i].productId]=true;
        }

    },function(res){
    });
};
xdkIAP.prototype.requestStoreListing = function () {

    //iterate through product ids and fetch info
    var self=this;
    this.storeBroker.getProductDetail(this.product_id_list,function(res){
        self.product_info=res;
        if(self.onstorelistingsuccess)
            self.onstorelistingsuccess();
    },function(err){
        if(self.onstorelistingfail)
            self.onstorelistingfail();
    });

};
xdkIAP.prototype.getAppName = function () {
    return this.getProductName("app");
};
xdkIAP.prototype.getAppFormattedPrice = function () {
    return this.getProductFormattedPrice("app");
};
xdkIAP.prototype.getProductName = function (product_) {
    if(this.product_info[product_]){
        return this.product_info[product_].name;
    }
    else{
        return "";
    }
};
xdkIAP.prototype.getProductFormattedPrice = function (product_) {
    if(this.product_info[product_]){
        return this.product_info[product_].price;
    }
    else{
        return "";
    }
};