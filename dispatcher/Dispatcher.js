"use strict";

var NwaaDemoConstants = require('../constants/NwaaDemoConstants');
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');
var PayloadSources = NwaaDemoConstants.PayloadSources;

var NwaaDemoDispatcher = assign(new Dispatcher(), {

    handleMessage: function (action) {
        this.dispatch({
            source: PayloadSources.SERVER_ACTION,
            action: action
        });
    },

    handleViewAction: function (action) {
        this.dispatch({
            source: PayloadSources.VIEW_ACTION,
            action: action
        });
    }

});

module.exports = NwaaDemoDispatcher;