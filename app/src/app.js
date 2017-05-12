var React = require('react');
var Render = require('react-dom').render;

var Login = require('./components/Login.react');
var Index = require('./components/Index.react');

var loginCont = document.getElementById('loginCont');
var indexCont = document.getElementById('indexCont');

if(typeof(loginCont) !== 'undefined' && loginCont !== null){
  Render(<Login />, document.getElementById("loginCont"));	
}

if(typeof(indexCont) !== 'undefined' && indexCont !== null){
  Render(<Index />, document.getElementById("indexCont"));	
}
