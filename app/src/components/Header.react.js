var React = require('react');
var CabinetActions = require('../actions/CabinetActions');

var Header = React.createClass({
  render: function(){
    return (
      <header>
        <Search />
        <LoggedUser />
        <Nav />
      </header>
    );
  }
});


var Search = React.createClass({
  
  search: function(val){
    console.log(val);
  },

  onClick: function(){
    var input = document.getElementById('searchInput');
    if((input.value).replace(/^\s+|\s+$/g, "") !== "" ){
      this.search(input.value);
    } else {
      if(input.className === 'active') {
        input.className = '';
        input.value = '';
      } else {
        input.className = 'active';
      }
    }
  },

  render: function(){
    return (
      <div className="search">
        <button id="searchBtn" onClick = {this.onClick}></button>
        <input type="text" id="searchInput" />
      </div>
    )
  }

});

var LoggedUser = React.createClass({
  render: function(){
    return (
      <div className="username"><span>Logged in as: </span>UserName</div>
    )
  }
});

var Nav = React.createClass({

  showHistory: function(){
    CabinetActions.updateHistoryVisible(true);
  },

  showMemReg: function(){
    CabinetActions.updateMemRegVisible(true);
  },

  render: function(){
    return (
      <div>
        <nav>
          <ul>
            <li>
              <button id="history" onClick={this.showHistory} >History</button>
            </li>
            <li>
              <button id="reg" onClick={this.showMemReg} >Member Registration</button>
            </li>
          </ul>
        </nav>
        <div className="delete" id="del">Drag Items Here to Delete</div>
        <button className="logout">LOG OUT</button>
      </div>
    )
  }
});

module.exports = Header;