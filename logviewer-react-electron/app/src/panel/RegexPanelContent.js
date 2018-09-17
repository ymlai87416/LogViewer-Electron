import React, { Component } from 'react';
import PanelContent from './PanelContent';
import update from 'immutability-helper';
import './RegexPanelContent.css';

class RegexPanelContent extends PanelContent {

  constructor(props){
    super(props);
  }

  logFileFormatConfigHandler = (tag, event) => {
    const currConfig = this.props.logFileFormatConfig;
    const value = event.target.value;
    
    var newConfig = update(this.props.logFileFormatConfig, {
      [tag]: {$set: value}
    })

    this.props.onChanged(newConfig);
  }

  render() {

    return (
      <div className="RegexPanelContent">
        <label>Regex for date:</label>
        <input id="dateRegex" value={this.props.logFileFormatConfig.RegexForDate} onChange={(event) => this.logFileFormatConfigHandler("regForDate", event)}/><br/>

        <label>Datetime format:</label>
        <input id="dateFormat" value={this.props.logFileFormatConfig.DatetimeFormat} onChange={(event) => this.logFileFormatConfigHandler("dateFormat", event)}/><br/>

        <label>Log Regex format:</label>
        <input id="logRegexFormat" value={this.props.logFileFormatConfig.LogRegexFormat} onChange={(event) => this.logFileFormatConfigHandler("logRegexFormat", event)}/><br/>

        <label>Loglevel Regex format:</label>
        <input id="logLevelRegexFormat" value={this.props.logFileFormatConfig.LogLevelRegexFormat} onChange={(event) => this.logFileFormatConfigHandler("logLevelRegexFormat", event)}/><br/>
      </div>
    );
  }
}

export default RegexPanelContent;
