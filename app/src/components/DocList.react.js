var React = require('react');

var DocList = React.createClass({
  render: function(){	
    return (
  	  <div className="list">
        <button className="addDoc">Add File</button>
        <h2>List</h2>
        <List />
      </div>
    );
  }
});

var List = React.createClass({
  render: function(){
    return (
      <ul>
        <li id="doc1" draggable="true"><span className="icon1"></span>Document 1</li>
      </ul>
    )
  }
})


module.exports = DocList;
