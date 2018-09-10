import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    this.state = {
      logEntry = []
    };
  }

  handler = (param) => {
    regex_date = param.regex_date;
    date_format = param.date_format;
    log_regex = param.log_regex;
    log_level_regex = param.log_level_regex;

    log_file_list = param.log_file_list;
    log_level_list = param.log_level_list;
    ignore_text_list = param.ignore_text_list;
    include_text_list = param.include_text_list;
    
    //TODO: later processing
  }

  render() {
    const logEntry = this.state.logEntry
    return (
      <div className="App">
        <PanelContent action={handler}/>
        <LogTable logEntry={logEntry}/>
      </div>
    );
  }
}

export default App;
