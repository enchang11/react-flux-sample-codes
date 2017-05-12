var React = require('react');
var CabinetStore = require('../stores/CabinetStore');
var CabinetHistoryStore = require('../stores/CabinetHistoryStore');
var CabinetMemRegStore = require('../stores/CabinetMemRegStore');
var Header = require('./Header.react.js');
var History = require('./History.react.js');
var MemReg = require('./MemReg.react.js');
var Main = require('./Main.react.js');

function getCabinetState() {
  return {
    historyVisible: CabinetHistoryStore.getHistoryVisible(),
    memRegVisible: CabinetMemRegStore.getMemRegVisible()
  };
}

var Index = React.createClass({
  getInitialState: function () {
    return getCabinetState();
  },

  // Add change listeners to stores
  componentDidMount: function () {
    CabinetStore.addChangeListener(this._onChange);
    CabinetHistoryStore.addChangeListener(this._onChange);
    CabinetMemRegStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function () {
    CabinetStore.removeChangeListener(this._onChange);
    CabinetHistoryStore.removeChangeListener(this._onChange);
    CabinetMemRegStore.removeChangeListener(this._onChange);
  },
  
  render: function(){
    return (
      <div>
        <History visible={this.state.historyVisible}/>
        <MemReg visible={this.state.memRegVisible} />
        <Header />
        <Main />
      </div>
    );
  },

  // Method to setState based upon Store changes
  _onChange: function () {
    this.setState(getCabinetState());
  }

});

module.exports = Index;
