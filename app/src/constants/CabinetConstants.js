var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    LOGIN: null,
    ERROR_LOGIN: null,
    HISTORY_VISIBLE: null,
    MEMREG_VISIBLE: null
  }),

  PayloadSources: keyMirror({
      SERVER_ACTION: null,
      VIEW_ACTION: null
  }),

  Messages: {
    USERNAME_EMPTY: "Please enter your username",
    PASSWORD_EMPTY: "Please enter your password"
  }
};
