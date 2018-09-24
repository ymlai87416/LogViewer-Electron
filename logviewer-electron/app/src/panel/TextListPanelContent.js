import React, { Component } from 'react';
import PanelContent from './PanelContent';
import update from 'immutability-helper';
import style from './TextListPanelContent.css';

class IgnoreTextPanelContent extends PanelContent {

  constructor(props){
    super(props)
    this.state = {
      textFilter: props.textList, 
      inputText: ""
    }
    this.clearText = false;
  }

  addTextFilter = (event) => {
    var input = this.state.inputText;
    
    if (input !== "") {
      const currState = this.state;
      var newState = update(currState, 
        {
          textFilter: {$push: [input]},
        }
      )
      this.clearText = true;

      //this.setState(newState);
      this.props.onChanged(newState.textFilter);
    }
  }

  clearTextFilter = (event) => {
    const currState = this.state;
    var newState = update(currState, 
    {
      textFilter: {$set: []},
    })
    this.clearText = true;

    //this.setState(newState)
    this.props.onChanged(newState.textFilter);
  }

  createTextEntry = (value, index) => {
    return(
      <p style={{fontWeight: 'bold', textAlign: 'left'}} key={index}>{value}</p>
    )
  }

  handleTextChange = (event) => {
    const currState = this.state;
    const newText = event.target.value
    var newState = update(currState, 
    {
      inputText: {$set: newText}
    })
  
    this.setState(newState)
    //this.props.onChanged(newState.textFilter);
  }

  componentWillReceiveProps(nextProps) {
    const currState = this.state
    let newState;
    if(this.clearText){
      newState = update(currState, 
      {
        textFilter: {$set: nextProps.textList},
        inputText: {$set: ""}
      })
      this.clearText = false;
    }
    else{
      newState = update(currState, 
      {
        textFilter: {$set: nextProps.textList},
      })
    }

    this.setState(newState);
  }

  render() {
    return (
      <div className={style.TextListPanelContent}>
          <div className={style.row}>
            <div className={style.column}>
              <span>
                {this.props.header}
              </span>
            </div>
            <div className={style.column}>
              <input type="textbox" onChange={this.handleTextChange} value={this.state.inputText}/>
              <button onClick={this.addTextFilter}>Add</button>
              <button onClick={this.clearTextFilter}>Clear All</button>
            </div>
          </div>
          <div className={style.row}>
            <div className={style.column}>
              <div>
                {
                  this.state.textFilter.map((value, index) => {
                    return this.createTextEntry(value, index)
                  })
                }
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default IgnoreTextPanelContent;
