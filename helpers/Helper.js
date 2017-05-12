"use strict";

var NwaaDemoConstants = require('../constants/NwaaDemoConstants');
var NwaaDemoUtils = require('../utils/NwaaDemoUtils');
var _windiw = $(window);

var _priceRegex = new RegExp();
_priceRegex.compile("^0*([0-9]+)([0-9]{1})$","g");

var _self = {

    createPlaceId: function (auctionId, placeId) {
        return auctionId + "_" + placeId;
    },

    createRowId: function (auctionId, placeId, channelId) {
        return auctionId + "_" + placeId + "_" + channelId;
    },


    _createImageName: function (auctionId, placeId, entryNumber) {
        return auctionId + placeId + entryNumber + "s.jpg";
    },

    createImageUrl: function (auctionId, placeId, entryNumber) {
        return "https://" + NwaaDemoConstants.CloudFrontHost + "/" +
            NwaaDemoUtils.getTodayStr() + "/" + _self._createImageName(auctionId, placeId, entryNumber);
    },

    _createLiveInfoFileName: function (auctionId, placeId) {
        return "live_" + auctionId + "_" + placeId + ".js";
    },

    createLiveInfoFileUrl: function (auctionId, placeId) {
        return "https://" + NwaaDemoConstants.CloudFrontHost + "/" +
            NwaaDemoUtils.getTodayStr() + "/" + _self._createLiveInfoFileName(auctionId, placeId);
    },


    createPlaceInfoFileUrl: function() {
        return "https://" + NwaaDemoConstants.CloudFrontHost + "/" +
            NwaaDemoUtils.getTodayStr() + "/live_plc.js";
    },

    createPlaceTopicName: function (auctionId, placeId) {
        if (_self.getRequestParameters()["perf"]) {
            // パフォーマンス計測用トピック
            return "/topic/perf.auction." + auctionId + "." + placeId + ".*";
        }
        return "/topic/car.auction." + auctionId + "." + placeId + ".*";
    },

    isBikePlace: function (placeId) {
        return NwaaDemoConstants.BikePlaces[placeId];
    },


    isBrandPlace: function (placeId) {
        return NwaaDemoConstants.BrandPlaces[placeId];
    },


    isArtPlace: function (placeId) {
        return NwaaDemoConstants.ArtPlaces[placeId];
    },

   

    isPcPlace: function (placeId) {
        return NwaaDemoConstants.PcPlaces[placeId];
    },

    isCarPlace: function (placeId) {
        return (!NwaaDemoConstants.BrandPlaces[placeId] &&
        !NwaaDemoConstants.BikePlaces[placeId] &&
        !NwaaDemoConstants.ArtPlaces[placeId] &&
        !NwaaDemoConstants.PcPlaces[placeId]);
    },

    getDefaultPlaceImage: function (placeId) {
        var imgPath = "img/noPhoto_m.jpg";
        if (!placeId) {
            return imgPath;
        }

        if (_self.isBikePlace(placeId)) {
            imgPath = "img/bike.jpg"
        }
        if (_self.isBrandPlace(placeId)) {
            imgPath = "img/brand.jpg"
        }
        if (_self.isArtPlace(placeId)) {
            imgPath = "img/art.jpg"
        }
        if (_self.isPcPlace(placeId)) {
            imgPath = "img/pc.jpg"
        }
        return imgPath;
    },

    getChannelIndex: function (channelID) {
        var code = channelID.charCodeAt(0);

        if (code % 2 == 0) {
            return 1;
        }
        return 0;
    },

    toWareki: function (year) {
        if (year.length > 4) {
            year = year.substr(0, 4);
        }
        if (year > 1988) {
            return "H" + (year - 1988) + "年";
        } else if (year > 1925) {
            return "S" + (year - 1925) + "年";
        }
        return year;
    },

    _containsZenkaku: function (str) {
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if ((c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
                continue;
            }
            return true;
        }
        return false;
    },


    formatEstimate: function (estimate) {
        if (!estimate) {
            return estimate;
        }

        // trim
        estimate = estimate.replace(/^\s+|\s+$/g, "");

        if (_self._containsZenkaku(estimate)) {
            return estimate;
        }

        if (estimate.length == 1 || estimate == "RA") {
            return estimate;
        }

        return estimate.charAt(0) + "." + estimate.charAt(1);
    },

    formatPrice: function(price) {
        if(!price) {
            return price;
        }
        return (("0000" + price).slice(-5)).replace(_priceRegex, "$1.$2");
    },


    isElementInView: function(element) {
        var top = _windiw.scrollTop();
        var bottom = _windiw.height() + top;
        var _element = $(element);
        var elemTop = _element.offset().top;
        var elemBottom = elemTop + _element.height();

        return (top <= elemTop && elemTop <= bottom) || (top <= elemBottom && elemBottom <= bottom);
    },

    getRequestParameters: function() {
        if(!window) {
            return {};
        }

        var url = location.href;
        var params = url.split("?");
        if(!params || params.length == 1) {
            return false;
        }

        var keyValuesStrs = params[1].split("&");
        if(!keyValuesStrs) {
            return false;
        }

        var keyValues = {};
        for (var i = 0; i < keyValuesStrs.length; i++ ) {
            var kv = keyValuesStrs[i].split("=");
            keyValues[kv[0]] = kv[1];
        }

        return keyValues;
    }

};

module.exports = _self;
