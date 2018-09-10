import React, { Component } from 'react';
import './Panel.css';
import RegexPanelContent from './RegexPanelContent';
import LogfilePanelContent from './LogfilesPanelContent';
import LogLevelPanelContent from './LogLevelPanelContent';
import TextListPanelContent from './TextListPanelContent';
import update from 'immutability_helper'

class Panel extends Component {

  DEFAULT_DATE_REGEX = "[\\S]+\\s+[\\S]+";
  DEFAULT_DATE_FORMAT = "YYYY-MM-DD hh:mm:ss"; 
  DEFAULT_LOG_REGEX_FORMAT = "^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}[\\s\\S]+?((?=^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}|$)(?!\\n|\\s))";
  DEFAULT_LOG_LEVEL_REGEX_FORMAT = "^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\S*\\s([\\S]+)";

  constructor(props) {
    super(props);
    this.state = {
      LogFileFormatConfig = {
        RegexForDate = DEFAULT_DATE_REGEX,
        DatetimeFormat = DEFAULT_DATE_FORMAT,
        LogRegexFormat = DEFAULT_LOG_REGEX_FORMAT,
        LogLevelRegexFormat = DEFAULT_LOG_LEVEL_REGEX_FORMAT,
      },

      LogFileList = [],
      LogLevelFilterList = LogLevelPanelContent.LOG_LEVELS,
      IgnoreTextList = [],
      IncludeTextList = []
    };
  }

  onChangeHandler = (key, value) => {
    var newState = update(this.state, {
      [key]: {$set: value}
    })

    this.setState(newState)
  }

  GenerateConfig(){}
  PromptLoadConfig(){}
  GenerateConfigAndSaveToFile(){}
  jsonFileClick(){}

  render() {
    const currState = this.state

    return (
      <div className="Panel">
        <SubPanel header="Regex Settings">
          <RegexPanelContent 
            logFileFormatConfig={currState.LogFileFormatConfig} onChanged={(event) => onChangeHandler("LogFileFormatConfig", event)}
            ></RegexPanelContent>
        </SubPanel>
        <hr></hr>
        <SubPanel header="Log files">
          <LogfilePanelContent logFileList={currState.LogFileList} onChanged={(event) => onChangeHandler("LogFileList", event)}></LogfilePanelContent>
        </SubPanel>
        <hr></hr>
        <LogLevelPanelContent logLevelFilterList={currState.logLevelFilterList} onChanged={(event) => onChangeHandler("LogLevelFilterList", event)}></LogLevelPanelContent>
        <hr></hr>
        <SubPanel header="Ignore Text">
          <TextListPanelContent header="Ignore text: " textList={currState.IgnoreTextList} onChanged={(event) => onChangeHandler("IgnoreTextList", event)}></TextListPanelContent>
        </SubPanel>
        <hr></hr>
        <SubPanel header="Include Text">
          <TextListPanelContent header="Include text: " textList={currState.IncludeTextList} onChanged={(event) => onChangeHandler("IncludeTextList", event)}></TextListPanelContent>
        </SubPanel>
        <hr></hr>
        <SubPanel header="Save/Load setting">
          <SaveLoadSettingPanelContent></SaveLoadSettingPanelContent>
        </SubPanel>
        <hr></hr>
        <div class="finalRow">          
          <button id="GogogoBtn" onClick={this.props.action(this.state)}> Go Go Go</button>
          <span id="Timer"></span>
          <div class="loader" style="display: inline-block;vertical-align: middle;visibility: hidden;"></div>
          <span>Number of log row: </span>
          <span id="NumOfLog">0</span>
        </div>
      </div>
    );
  }
}

export default Panel;
