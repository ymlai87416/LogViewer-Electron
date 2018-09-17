import React, { Component } from 'react';
import PanelContent from './PanelContent';
import update from 'immutability-helper';

class LogLevelPanelContent extends PanelContent {

  static LOG_LEVELS = ["ALL", "DEBUG", "ERROR", "FATAL", "INFO", "OFF", "TRACE", "WARN"];

  constructor(props){
    super(props);

    this.state = {
      selectedLogLevelList: LogLevelPanelContent.LOG_LEVELS
    }
  }

  selectAllbtnOnClick = () => {
    var newState = update(this.state, {
      selectedLogLevelList: {$set: LogLevelPanelContent.LOG_LEVELS}
    })

    this.setState(newState)

    this.props.onChanged(newState.selectedLogLevelList);
  }

  unSelectAllbtnOnClick = () => {
    var newState = update(this.state, {
      selectedLogLevelList: {$set: []}
    })

    this.setState(newState)

    this.props.onChanged(newState.selectedLogLevelList);
  }

  onCheckBoxChange = (event) => {
    const isSelected = event.target.checked;
    const logLevel = event.target.id;
    const currState = this.state;
    var newState = null;

    console.log("onCheckBoxChange")
    if(isSelected){
      if(!currState.selectedLogLevelList.includes(logLevel)){
        var newselectedLogLevelList = update(this.state.selectedLogLevelList, {
          $push: [logLevel]
        });

        newState = update(this.state, {
          selectedLogLevelList: {$set: newselectedLogLevelList}
        });

        this.setState(newState)
      }  
    }
    else{
      if(currState.selectedLogLevelList.includes(logLevel)){
        var newselectedLogLevelList = []

        var count = currState.selectedLogLevelList.length;
        for(var i=0; i<count; ++i){
          if(currState.selectedLogLevelList[i] != logLevel)
            newselectedLogLevelList.push(currState.selectedLogLevelList[i]);
        }

        newState = update(this.state, {
          selectedLogLevelList: {$set: newselectedLogLevelList}
        });
        
        this.setState(newState);
      }
    }

    if(newState != null){
      this.props.onChanged(newState.selectedLogLevelList);
    }
  }

  createLogLevelCheckBox = (element, index, currState) => {
    const isSelected = currState.selectedLogLevelList.includes(element);
    return(
      <span key={index}>
        <input type="checkbox" id={element} checked={isSelected} onChange={this.onCheckBoxChange}/>
        <label for={element}>{element}</label>
      </span>
    )
  }

  render() {
    const currState = this.state;
    return (
      <div className="LogLevelPanelContent">
        <div>
          {LogLevelPanelContent.LOG_LEVELS.map((element, index) => {return this.createLogLevelCheckBox(element, index, currState);})}
        </div>
        <br/>
        <button onClick={this.selectAllbtnOnClick} style={{margin: '2px'}}>Select All</button>
        <button onClick={this.unSelectAllbtnOnClick} style={{margin: '2px'}}>Unselect All</button>
      </div>
    );
  }
}

export default LogLevelPanelContent;
