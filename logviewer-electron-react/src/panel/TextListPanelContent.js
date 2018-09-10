import React, { Component } from 'react';

class IgnoreTextPanelContent extends PanelContent {

  constructor(props){
    this.state = {
      textFilter: props.textList, 
      inputText: ""
    }
  }

  addTextFilter = (event) => {
    if (input != "") {
      const currState = this.state;
      var newState = update(currState, 
        {
          textFilter: {$push: [input]}
        }
      )

      this.setState(newState);
      this.props.onChanged(newState.textFilter);
    }
  }

  clearTextFilter = (event) => {
    const currState = this.state;
    var newState = update(currState, 
    {
      textFilter: {$set: []}
    })

    this.setState(newState)

    this.props.onChanged(newState.textFilter);
  }

  createTextEntry = (value) => {
    return(
      <div>
        <p>value</p><br/>
      </div> 
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
  }

  render() {
    return (
      <div style="display: table;width:100%;border:0">
          <div class="row">
            <div class="column">
              <span>
                {this.props.header}
              </span>
            </div>
            <div class="column">
              <input type="textbox" onChange={handleTextChange} value={this.state.inputText}/>
              <button onClick={addTextFilter}>Add</button>
              <button onClick={clearTextFilter}>Clear All</button>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <div id="filteredText" style="font-weight:bold">
                {
                  this.state.ignoreTextList.foreach(function (value){
                    createTextEntry(value)
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
