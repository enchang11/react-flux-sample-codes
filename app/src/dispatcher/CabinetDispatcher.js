var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');
var CabinetConstants = require('../constants/CabinetConstants');
var PayloadSources = CabinetConstants.PayloadSources;

var CabinetDispatcher = assign(new Dispatcher(), {

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

module.exports = CabinetDispatcher;
