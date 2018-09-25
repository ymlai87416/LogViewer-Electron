import React, { Component } from 'react';
import style from './TextListPanelContent.css';

class TextPanelContent extends Component {

  constructor(props) {
    super(props)
  }

  addTextFilter = (event) => {
    let input = this.textInput.value;
    this.textInput.value = "";
    if(input){
      const newList = [...this.props.textList, input]
      this.props.onTextListUpdate(newList);
    }
  }

  clearTextFilter = (event) => {
    this.props.onTextListUpdate([]);
  }

  createTextEntry = (value, index) => {
    return (
      <p style={{ fontWeight: 'bold', textAlign: 'left' }} key={index}>{value}</p>
    )
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
            <input type="textbox" ref={(input) => { this.textInput = input }} />
            <button onClick={this.addTextFilter}>Add</button>
            <button onClick={this.clearTextFilter}>Clear All</button>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.column}>
            <div>
              {
                this.props.textList.map((value, index) => {
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

export default TextPanelContent;