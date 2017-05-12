var React = require('react');
var CabinetActions = require('../actions/CabinetActions');
var CabinetStore = require('../stores/CabinetStore');
var CabinetMemRegStore = require('../stores/CabinetMemRegStore');
var CabinetConstants = require('../constants/CabinetConstants');

var MemReg = React.createClass({
  
  hideMemReg: function(){
  	//CabinetActions.updateMemRegVisible(false);
  },
   
  render: function(){
  	return (
  	  <div>
  	    <div className="reg_modal" style= {{display:  (this.props.visible ? 'block' : 'none')}}>
  	      <a href="#" className="close" onClick={this.hideMemReg} ></a>
          <h1>Registration</h1>
          <div>
            <label>Username</label>
            <input type="text" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" />
          </div>
          <div>
            <label>Retype-Password</label>
            <input type="password" />
          </div>
          <div>
            <label>User Type</label>
            <select>
              <option>Administrator</option>
              <option>Member</option>
            </select>
          </div>
          <button>Register</button>
        </div>
        <div className="overlay" style= {{display:  (this.props.visible ? 'block' : 'none')}}></div>
      </div>
  	);
  }
});

module.exports = MemReg;