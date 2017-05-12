var CabinetDispatcher = require('../dispatcher/CabinetDispatcher');
var CabinetConstants = require('../constants/CabinetConstants');
var ActionTypes = CabinetConstants.ActionTypes;
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var _errorVisible = false, _errorMessage = "";

//Login
function login(username, password) {
  location.href = "index.html";
}

//Update Login State
function updateLoginState(message,error_display) {
  _errorMessage = message;
  _errorVisible = error_display;
}

var CabinetStore = _.extend({}, EventEmitter.prototype, {

  //Return login Error visibility state
  getErrorVisible: function() {
    return _errorVisible;
  },

  //Return Error Message
  getErrorMessage: function() {
    return _errorMessage;
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
    case ActionTypes.LOGIN:
      login(action.username, action.password);
      break;
    // Respond to ERRORMSG action
    case ActionTypes.ERROR_LOGIN:
      updateLoginState(action.message, action.error_display);
      break;
    default:
      return true;
  }
  // If action was responded to, emit change event
  CabinetStore.emitChange();
  return true;
});

module.exports = CabinetStore;
