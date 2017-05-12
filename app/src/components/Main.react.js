var React = require('react');
var DocList = require('./DocList.react.js');
var Cabinet = require('./Cabinet.react.js');

var Main = React.createClass({
  render: function(){
  	return(
  	  <div className="clear">
        <DocList />
        <Cabinet />
      </div>
  	);
  }
});

module.exports = Main;