import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Panel from './panel/Panel';
import LogTable from './logTable/LogTable';
import update from 'immutability-helper';
import { connect } from 'react-redux';

var moment = require('moment');

class App extends Component {

  constructor(props){
    super(props)
  }

  

  render() {
    return (
      <div className="App">
        <Panel/>
        <LogTable/>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(App);
