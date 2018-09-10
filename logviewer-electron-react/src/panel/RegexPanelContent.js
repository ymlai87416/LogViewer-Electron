import React, { Component } from 'react';

class RegexPanelContent extends PanelContent {

  logFileFormatConfigHandler = (tag, event) => {
    const currConfig = this.props.logFileFormatConfig;
    
    var newConfig = update(this.state, {
      [key]: {$set: value}
    })

    this.props.onChanged(newConfig);
  }

  render() {
    return (
      <div className="RegexPanelContent">
        <h3>Regex Settings</h3>
        <div>
          <label>Regex for date:</label>
          <input id="dateRegex" value={this.prop.logFileFormatConfig.regForDate} onChange={(event) => logFileFormatConfigHandler("regForDate", event)}/>

          <label>Datetime format:</label>
          <input id="dateFormat" value={this.prop.logFileFormatConfig.dateFormat} onChange={(event) => logFileFormatConfigHandler("dateFormat", event)}/>

          <label>Log Regex format:</label>
          <input id="logRegexFormat" value={this.prop.logFileFormatConfig.logRegexFormat} onChange={(event) => logFileFormatConfigHandler("logRegexFormat", event)}/>

          <label>Loglevel Regex format:</label>
          <input id="logLevelRegexFormat" value={this.prop.logFileFormatConfig.logLevelRegexFormat} onChange={(event) => logFileFormatConfigHandler("logLevelRegexFormat", event)}/>
        </div>
      </div>
    );
  }
}

export default RegexPanelContent;
