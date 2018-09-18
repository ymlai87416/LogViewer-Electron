import React, { Component } from 'react';
import PanelContent from './PanelContent';
import LogfileEntry from './LogfileEntry';
import update from 'immutability-helper';
import './LogfilesPanelContent.css';

class LogfilesPanelContent extends PanelContent {
  static MAX_LOG_FILE = 10;

  constructor(props){
    super(props);

    this.rgbArr = this.InitRGBList();

    this.state = {
      logFileList: props.logFileList
    };
    
  }

  InitRGBList = () => {
    var rgbArr = []
    rgbArr.push({r: 74, g: 224, b: 140});
    rgbArr.push({r: 0, g: 250, b: 154});
    rgbArr.push({r: 107, g: 185, b: 240});
    rgbArr.push({r: 0, g: 255, b: 255});
    rgbArr.push({r: 174, g: 168, b: 211});
    rgbArr.push({r: 220, g: 198, b: 224});
    rgbArr.push({r: 217, g: 179, b: 0});
    rgbArr.push({r: 242, g: 121, b: 39});
    rgbArr.push({r: 255, g: 99, b: 71});
    rgbArr.push({r: 231, g: 76, b: 60});
    return rgbArr;
  }

  addLogFileSlot = () => {
    if(this.state.logFileList.length < 10){
      const newColor = this.getNewColor();
      const newSerialNum = this.getMaxSerialNumber(this.state.logFileList)+1;
      const newFileSlots = update(this.state.logFileList, {$push: [{
        serialNumber: newSerialNum,
        path: "",
        color: newColor,
        isEnabled: true
      }]});

      /*
      const newState  = update(this.state,{
        logFileList: {$set: newFileSlots}
      });

      this.setState(newState);
      */
      this.props.onChanged(newFileSlots)
    }
  } 
  
  removeLogFileSlot = () => {
    if(this.state.logFileList.length > 1){
      const logFileListLen = this.state.logFileList.length;
      var newLogFileList = update(this.state.logFileList, {$splice: [[logFileListLen-1, 1 ]]});
      
      /*
      const newState  = update(this.state,{
        logFileList: {$set: newLogFileList}
      });

      this.setState(newState);
      */

      this.props.onChanged(newLogFileList)
    }
  }

  getMaxSerialNumber = (logFileList) => {
    var result = 0;
    for(var i=0; i<logFileList.length; ++i){
      if(logFileList[i].serialNumber > result)
        result =logFileList[i].serialNumber;
    }

    return result;
  }

  getNewColor = () => {
    var existingRGBArr = []
    this.state.logFileList.forEach(function (value) {
      existingRGBArr.push(value.color);
    });

    var resultColor = this.rgbArr[Math.floor(Math.random() * this.rgbArr.length)];

    var isNewColor = false;

    while (!isNewColor) {
      var matchColorFound = false;
      for (var i = 0; i < existingRGBArr.length; i++) {
        var tmp = existingRGBArr[i];
        if (resultColor.r == tmp.r && resultColor.g == tmp.g && resultColor.b == tmp.b) {
          matchColorFound = true;
          resultColor = this.rgbArr[Math.floor(Math.random() * this.rgbArr.length)];
          break;
        }
      }
      if (!matchColorFound) {
        isNewColor = true;
      }
    }

    return resultColor;
  }

  logEntryChangeHandler = (newValue) => {
    const changeIdx = newValue.serialNumber;
    const logFileList = this.state.logFileList;
    
    var newlogFileList = update(logFileList, {
      $splice: [[changeIdx-1, 1, newValue]]
    });

    /*
    var newState = update(this.state,{
      logFileList: {$set: newlogFileList}
    });

    this.setState(newState);
    */

    this.props.onChanged(newlogFileList)
  } 

  componentWillReceiveProps(nextProps) {
    const newState = {
      logFileList: nextProps.logFileList
    };

    console.log("componentWillReceiveProps");
    console.log(newState);

    this.setState(newState);
  }

  render() {
    var fileslots = this.state.logFileList.map((logFile, index) => {
      return <LogfileEntry key={index} logEntry={logFile} onChanged={this.logEntryChangeHandler}></LogfileEntry>
    })
    
    const entryCount = this.state.logFileList.length;
    const enableAddButton = entryCount < 10
    const enableRemoveButton = entryCount > 1

    return (
      <div className="LogfilesPanelContent">
        <div style={{padding: '5px'}} >
          <input type="button" value="Add" class="btnAddRemove" onClick={this.addLogFileSlot} disabled={!enableAddButton}/>
          <input type="button" value="Remove" class="btnAddRemove" onClick={this.removeLogFileSlot} disabled={!enableRemoveButton}/>
          <span id="ICntValue">{entryCount}</span>
          <span>/</span>
          <span id="MAX_LOG_COUNT">{LogfilesPanelContent.MAX_LOG_FILE}</span>
        </div>
        {/*--TODO overflow-y..?*/}
        <div id="links">
          {
            fileslots
          }
        </div>
      </div>
    );
  }
}

export default LogfilesPanelContent;
