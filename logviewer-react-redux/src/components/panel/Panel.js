import React, { Component } from 'react';
import './Panel.css';
import RegexPanelContent from './RegexPanelContent';
import LogfilePanelContent from './LogfilesPanelContent';
import LogLevelPanelContent from './LogLevelPanelContent';
import TextListPanelContent from './TextListPanelContent';
import SaveLoadSettingPanelContent from './SaveLoadSettingPanelContent';
import SubPanel from './SubPanel';
import update from 'immutability-helper';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import Dialog from 'react-dialog'

class Panel extends Component {

  constructor(props) {
    super(props);

    const DEFAULT_DATE_REGEX = "[\\S]+\\s+[\\S]+";
    const DEFAULT_DATE_FORMAT = "YYYY-MM-DD hh:mm:ss"; 
    const DEFAULT_LOG_REGEX_FORMAT = "^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}[\\s\\S]+?((?=^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}|$)(?!\\n|\\s))";
    const DEFAULT_LOG_LEVEL_REGEX_FORMAT = "^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\S*\\s([\\S]+)";
    const LOG_LEVELS = ["ALL", "DEBUG", "ERROR", "FATAL", "INFO", "OFF", "TRACE", "WARN"];

    this.state = {
      LogFileFormatConfig: {
        RegexForDate: DEFAULT_DATE_REGEX,
        DatetimeFormat: DEFAULT_DATE_FORMAT,
        LogRegexFormat: DEFAULT_LOG_REGEX_FORMAT,
        LogLevelRegexFormat: DEFAULT_LOG_LEVEL_REGEX_FORMAT,
      },

      LogFileList:  [
        {
          serialNumber: 1,
          path: "",
          color: {r: 74, g: 224, b: 140},
          isEnabled: true
        }
      ],
      LogLevelFilterList: LOG_LEVELS,
      IgnoreTextList: [],
      IncludeTextList: [],

      ShowMenu: true,
      IsDialogOpen: false,
      IsLoading: false,
    };
  }
  
  onChangeHandler = (key, value) => {
    var newState = update(this.state, {
      [key]: {$set: value}
    })

    this.setState(newState)
  }

  onChangeHandlerWithReload = (key, value) => {
    var newState = update(this.state, {
      [key]: {$set: value}
    })

    this.setState(newState)
    this.props.onFilterChange(newState);
  }

  onExecuteReload = (param) => {
    this.props.onReload(this.state)
  }

  getConfigurationJson = () => {
    return JSON.stringify(this.state);
  }

  loadConfig = (jsonString) => {
    try {
      var loadedState = JSON.parse(jsonString);
      loadedState["IsDialogOpen"] = false;
      console.log(loadedState);
      this.setState(loadedState, () => 
        console.log("loadConfig: setstate completed"));
    } catch (err) {
      alert("Error format. " + err);
      return;
    }
  }

  copyToClipboard = (text) => {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  generateConfig = () => {
    var config = this.getConfigurationJson();
    this.copyToClipboard(config);
    alert("Configuration copied to clipboard.")
  }

  openLoadConfigDialog = () => {
    var newState = update(this.state, {
      IsDialogOpen: {$set: true}
    })

    this.setState(newState);
  }
 
  closeLoadConfigDialog = (jsonMessage) => 
  { 
    if (jsonMessage != null){
      this.loadConfig(jsonMessage);
    }
    else{
      var newState = update(this.state, {
        IsDialogOpen: {$set: false}
      })
  
      this.setState(newState);
    }
  };

  generateConfigAndSaveToFile = () =>{
    var textToSave = this.getConfigurationJson();

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'config.json';
    hiddenElement.click();
  }

  selectConfigFile = (filename) => {
    var self = this;
    try {	
      var reader = new FileReader();
      reader.onloadend = function () {
        var jsonString = reader.result;
        self.loadConfig(jsonString);
      }
      reader.readAsBinaryString(filename);

    } catch (err) {
      alert("Could not load file." + err);
      return;
    }
  }

  openMenu = () => {
    const currValue = this.state.ShowMenu
    
    var newState = update(this.state, {
      ShowMenu: {$set: !currValue}
    })

    this.setState(newState)
  }

  render() {
    const currState = this.state

    return (
      <div className="ControlPanel" aria-expanded={currState.ShowMenu ? true: false} >
        <button className="MenuButton" onClick={this.openMenu}>≡</button>
        <div className="ControlPanelContent">
          <Accordion>
            <AccordionItem>
              <AccordionItemTitle><h3><div className="accordion__arrow" role="presentation" />Regex Settings</h3></AccordionItemTitle>
              <AccordionItemBody>
                <RegexPanelContent 
                  logFileFormatConfig={currState.LogFileFormatConfig} onChanged={(event) => this.onChangeHandler("LogFileFormatConfig", event)}>
                </RegexPanelContent>
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>

          <hr className="panel-hr"/>

          <Accordion>
            <AccordionItem expanded='true'>
              <AccordionItemTitle><h3><div className="accordion__arrow" role="presentation" />Log files</h3></AccordionItemTitle>
              <AccordionItemBody>
                <LogfilePanelContent logFileList={currState.LogFileList} 
                  onChanged={(event) => {this.onChangeHandlerWithReload("LogFileList", event); }}></LogfilePanelContent>
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>
          
          <hr className="panel-hr"/>

          <LogLevelPanelContent logLevelFilterList={currState.LogLevelFilterList} 
            onChanged={(event) => {this.onChangeHandlerWithReload("LogLevelFilterList", event);}}></LogLevelPanelContent>

          <hr className="panel-hr"/>

          <Accordion>
            <AccordionItem>
              <AccordionItemTitle><h3><div className="accordion__arrow" role="presentation" />Ignore Text</h3></AccordionItemTitle>
              <AccordionItemBody>
                <TextListPanelContent header="Ignore text: " textList={currState.IgnoreTextList} 
                  onChanged={(event) => {this.onChangeHandlerWithReload("IgnoreTextList", event);}}></TextListPanelContent>
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>

          <hr className="panel-hr"/>

          <Accordion>
            <AccordionItem>
              <AccordionItemTitle><h3><div className="accordion__arrow" role="presentation" />Include Text</h3></AccordionItemTitle>
              <AccordionItemBody>
                <TextListPanelContent header="Include text: " textList={currState.IncludeTextList} 
                  onChanged={(event) => {this.onChangeHandlerWithReload("IncludeTextList", event);}}></TextListPanelContent>
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>

          <hr className="panel-hr"/>

          <Accordion>
            <AccordionItem>
              <AccordionItemTitle><h3><div className="accordion__arrow" role="presentation" />Save/Load setting</h3></AccordionItemTitle>
              <AccordionItemBody>
              <SaveLoadSettingPanelContent onClipboardGenerate={this.generateConfig} onClipboardLoad={this.openLoadConfigDialog} 
                onFileGenerate={this.generateConfigAndSaveToFile} onFileLoad={this.selectConfigFile}></SaveLoadSettingPanelContent>
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>

          <hr className="panel-hr"/>
          
          <div className="finalRow" style={{textAlign: 'left'}}>          
            <button className="GogogoBtn" onClick={(event) => this.onExecuteReload(event)}> Go Go Go</button>
            <div className="loader" style={{display: 'inline-block', verticalAlign: 'middle', visibility: this.props.isLoading ? 'visible': 'hidden'}}></div>
            <span>Number of log row: </span>
            <span className="NumOfLog">{this.props.rowLoaded}</span>
          </div>
        </div>

        {
            this.state.IsDialogOpen &&
            <Dialog
                title="Enter config in json format here."
                className="ConfigDialog"
                onClose={() => this.closeLoadConfigDialog(null)}
                model="true"
                height='130px'
                buttons={
                    [
                      {
                        text: "OK",
                        onClick: () => {
                          const json = this.loadConfigTextInput.value
                          this.closeLoadConfigDialog(json)
                        },
                        className: "ConfigDialogButton"
                      },
                      {
                        text: "Cancel",
                        onClick: () => this.closeLoadConfigDialog(null),
                        className: "ConfigDialogButton"
                      }
                  ]
                }>
                <form>
                  <input type="text" ref={(ref) => this.loadConfigTextInput= ref} style={{width: '450px'}}/>
                </form>
            </Dialog>
        }
      </div>
    );
  }
}

export default Panel;
