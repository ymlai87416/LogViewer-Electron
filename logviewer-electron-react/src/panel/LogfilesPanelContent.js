import React, { Component } from 'react';
import PanelContent from './PanelContent';

class LogfilesPanelContent extends PanelContent {
  MAX_LOG_FILE = 10;
  logFileList = []

  AddLogFileSlot(){

  } 
  
  RemoveLogFileSlot(){

  }

  getNewColor() {
    var existingRGBArr = []
    idArr.forEach(function (value) {
      var rgbString = $("#" + value + "_CP").css("background");
      if (rgbString != null) {
        var rgb = getRGBfromString(rgbString);
        existingRGBArr.push(rgb);
      }
    });

    var resultColor = rgbArr[Math.floor(Math.random() * rgbArr.length)];

    var isNewColor = false;

    while (!isNewColor) {
      var matchColorFound = false;
      for (var i = 0; i < existingRGBArr.length; i++) {
        var tmp = existingRGBArr[i];
        if (resultColor.r == tmp.r && resultColor.g == tmp.g && resultColor.b == tmp.b) {
          matchColorFound = true;
          resultColor = rgbArr[Math.floor(Math.random() * rgbArr.length)];
          break;
        }
      }
      if (!matchColorFound) {
        isNewColor = true;
      }
    }

    return resultColor;
  }

  logEntryChangeHandler = (updatedLogEntry) => {
    const changeIdx = newValue.serialNumber;
    const logEntryList = this.props.logEntryList;
    
    var newLogEntryList = update(logEntryList, {
      $splice: [[changeIdx, 1, newValue]]
    })

    this.props.onChanged(newLogEntryList)
  } 

  createFileSlot = (logEntry) =>{
    return (
      <LogFileEntry logEntry={logEntry} onChanged={logEntryChangeHandler}></LogFileEntry>
    )
  }

  render() {
    return (
      <div className="RegexPanelContent">
        <div style="padding:5px" id="main">
          <input type="button" id="btAdd" value="Add" class="bt" />
          <input type="button" id="btRemove" value="Remove" class="bt" />
          <span id="ICntValue">0</span>
          <span>/</span>
          <span id="MAX_LOG_COUNT"></span>
        </div>
        {/*--TODO overflow-y..?*/}
        <div id="links">
          {
            logEntry.forEach(function (value) {
              createFileSlot(value)
            })
          }
        </div>
      </div>
    );
  }
}

export default LogfilePanelContent;
