"use strict";

var NwaaDemoConstants = require('../constants/NwaaDemoConstants');
var NwaaDemoDispatcher = require('../dispatcher/NwaaDemoDispatcher');
var ActionTypes = NwaaDemoConstants.ActionTypes;

module.exports = {

    receiveMessage: function (message) {
        NwaaDemoDispatcher.handleMessage({
            type: ActionTypes.RECEIVE_MESSAGE,
            message: message
        });
    }

};