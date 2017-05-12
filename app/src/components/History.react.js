var React = require('react');
var CabinetActions = require('../actions/CabinetActions');
var CabinetStore = require('../stores/CabinetStore');
var CabinetHistoryStore = require('../stores/CabinetHistoryStore');
var CabinetConstants = require('../constants/CabinetConstants');

var History = React.createClass({

    hideHistory: function(){
      CabinetActions.updateHistoryVisible(false);
    },
 
    //Render Login Elements
    render: function () {
      return (
            <div className="history_modal" style= {{display:  (this.props.visible ? 'block' : 'none')}}><a href="#" className="close" onClick={this.hideHistory}></a>
              <h1>History</h1>
              <ul>
                <li>
                  <h3>2/1/2017</h3>
                  <ul>
                    <li>
                      <time>3:00pm</time>
                      <div>DocumentName <i> (moved from cabinet1 level1 to cabinet2 level1)</i></div>
                      <div><span>Last Edited by: UserName</span></div>
                    </li>
                    <li>
                      <time>4:00pm</time>
                      <div>DocumentName <i> (moved from cabinet1 level1 to cabinet2 level1)</i></div>
                      <div><span>Last Edited by: UserName</span></div>
                    </li>
                  </ul>
                </li>
                <li>
                  <h3>2/2/2017</h3>
                  <ul>
                    <li>
                      <time>10:00am</time>
                      <div>DocumentName<i> (moved from cabinet2 level1 to cabinet2 level1)</i></div>
                      <div><span>Last Edited by: UserName</span></div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
        );
    }
});

module.exports = History;