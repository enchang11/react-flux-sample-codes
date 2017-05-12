var CabinetDispatcher = require('../dispatcher/CabinetDispatcher');
var CabinetConstants = require('../constants/CabinetConstants');
var ActionTypes = CabinetConstants.ActionTypes;
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var _history_visible = false;

function setHistoryVisible(show) {
    _history_visible = show;
}

var CabinetStore = _.extend({}, EventEmitter.prototype, {
  // Return history visibility state
  
  getHistoryVisible: function () {
    return _history_visible;
  },

  // Emit Change event
  emitChange: function () {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function (callback) {
    this.on('change', callback);
  },
  // Remove change listener
  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with CabinetDispatcher
CabinetDispatcher.register(function (payload) {
  var action = payload.action;
  var text;
  switch (action.type) {
    // Respond to LOGIN action
    case ActionTypes.HISTORY_VISIBLE:
      setHistoryVisible(action.historyVisible);
      break;
    default:
      return true;
  }
  // If action was responded to, emit change event
  CabinetStore.emitChange();
  return true;
});

module.exports = CabinetStore;
