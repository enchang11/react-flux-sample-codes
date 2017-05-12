var React = require('react');
var CabinetActions = require('../actions/CabinetActions');
var CabinetStore = require('../stores/CabinetStore');
var CabinetUtils = require('../utils/CabinetUtils');
var CabinetConstants = require('../constants/CabinetConstants');
var ConstantMessage = CabinetConstants.Messages;


// Method to retrieve state from Stores
function getLoginState() {
  return {
    errorVisible: CabinetStore.getErrorVisible(),
    errorMessage: CabinetStore.getErrorMessage(),
  };
}

var Login = React.createClass({
    // Get initial state from stores
    getInitialState: function () {
      return getLoginState();
    },

    // Add change listeners to stores
    componentDidMount: function () {
      CabinetStore.addChangeListener(this._onChange);
    },

    // Remove change listeners from stores
    componentWillUnmount: function () {
      CabinetStore.removeChangeListener(this._onChange);
    },

    // login
    login: function (event) {
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      if(username == ""){
         console.log('bbb',ConstantMessage);
          CabinetActions.loginErrorMessage(ConstantMessage.USERNAME_EMPTY, true);
      }else if(password == ""){
          CabinetActions.loginErrorMessage(ConstantMessage.PASSWORD_EMPTY, true);
      }else{
          CabinetActions.login(username, password);
      }
    },
 
    //Render Login Elements
    render: function () {
      return (
            <div>
              <div className="login_icon"></div>
              <input type="text" placeholder="Username" id="username" />
              <input type="password" placeholder="Password" id="password" />
              <div className={"error " + (this.props.errorVisible ? 'active' : '')}>{this.state.errorMessage}</div>
              <button onClick={this.login}>Submit</button>
            </div>
        );
    },

    // Method to setState based upon Store changes
    _onChange: function () {
      this.setState(getLoginState());
    }
});

module.exports = Login;