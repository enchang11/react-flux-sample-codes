var CabinetDispatcher = require('../dispatcher/CabinetDispatcher');
var CabinetConstants = require('../constants/CabinetConstants');
var ActionTypes = CabinetConstants.ActionTypes;

var CabinetActions = {
  // Login
  login: function (username, password) {
    CabinetDispatcher.handleViewAction({
      type: ActionTypes.LOGIN,
      username: username,
      password: password
    })
  },

  //Alert error Message
  loginErrorMessage: function(message,error_display) {
    CabinetDispatcher.handleViewAction({
      type: ActionTypes.ERROR_LOGIN,
      message: message,
      error_display: error_display
    })
  },

  updateHistoryVisible: function(historyVisible) {
    CabinetDispatcher.handleViewAction({
      type: ActionTypes.HISTORY_VISIBLE,
      historyVisible: historyVisible
    })
  },

  updateMemRegVisible: function(memRegVisible){
    CabinetDispatcher.handleViewAction({
      type: ActionTypes.MEMREG_VISIBLE,
      memRegVisible: memRegVisible
    })
  }

};

module.exports = CabinetActions;
