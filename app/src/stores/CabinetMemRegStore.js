var CabinetDispatcher = require('../dispatcher/CabinetDispatcher');
var CabinetConstants = require('../constants/CabinetConstants');
var ActionTypes = CabinetConstants.ActionTypes;
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var _memreg_visible = false;

function setMemRegVisible(show){
  _memreg_visible = show;
}

var CabinetStore = _.extend({}, EventEmitter.prototype, {
  // Return history visibility state
  
  getMemRegVisible: function () {
    return _memreg_visible;
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
    case ActionTypes.MEMREG_VISIBLE:
      setMemRegVisible(action.memRegVisible);
      break;
    default:
      return true;
  }
  // If action was responded to, emit change event
  CabinetStore.emitChange();
  return true;
});

module.exports = CabinetStore;
