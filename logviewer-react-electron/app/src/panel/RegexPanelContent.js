import React, { Component } from 'react';
import PanelContent from './PanelContent';
import update from 'immutability-helper';
import './RegexPanelContent.css';

class RegexPanelContent extends PanelContent {

  constructor(props){
    super(props);

    this.state = {
      logFileFormatConfig: this.props.logFileFormatConfig
    }
  }

  logFileFormatConfigHandler = (tag, event) => {
    const currConfig = this.state.logFileFormatConfig;
    const value = event.target.value;
    
    var newConfig = update(currConfig, {
      [tag]: {$set: value}
    })

    this.props.onChanged(newConfig);
  }

  componentWillReceiveProps(nextProps) {
    const newState = {
      logFileFormatConfig: nextProps.logFileFormatConfig
    };

    this.setState(newState);
  }

  render() {

    return (
      <div className="RegexPanelContent">
        <label>Regex for date:</label>
        <input id="dateRegex" value={this.state.logFileFormatConfig.RegexForDate} onChange={(event) => this.logFileFormatConfigHandler("RegexForDate", event)}/><br/>

        <label>Datetime format:</label>
        <input id="dateFormat" value={this.state.logFileFormatConfig.DatetimeFormat} onChange={(event) => this.logFileFormatConfigHandler("DatetimeFormat", event)}/><br/>

        <label>Log Regex format:</label>
        <input id="logRegexFormat" value={this.state.logFileFormatConfig.LogRegexFormat} onChange={(event) => this.logFileFormatConfigHandler("LogRegexFormat", event)}/><br/>

        <label>Loglevel Regex format:</label>
        <input id="logLevelRegexFormat" value={this.state.logFileFormatConfig.LogLevelRegexFormat} onChange={(event) => this.logFileFormatConfigHandler("LogLevelRegexFormat", event)}/><br/>
      </div>
    );
  }
}

export default RegexPanelContent;
