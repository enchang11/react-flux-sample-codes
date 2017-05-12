var React = require('react');

var Cabinet = React.createClass({
  render: function(){
  	return (
  	  <div className="cabinet_container">
        <button className="add" id="addCab">Add Cabinet</button>
        <div className="clear"></div>
        <CabList />
      </div>
  	);
  }
});

var CabList = React.createClass({
  render: function(){
  	return (
      <div className="cab">
        <h3>Cabinet 1</h3>
        <button className="addLevel">Add Level</button>
        <ul>
          <li>
            <ul></ul>
          </li>
          <li>
            <ul></ul>
          </li>
          <li>
            <ul></ul>
          </li>
        </ul>
      </div>
  	)
  }
});

module.exports = Cabinet