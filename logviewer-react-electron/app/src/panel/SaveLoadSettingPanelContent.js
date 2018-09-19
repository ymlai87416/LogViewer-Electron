import React, { Component } from 'react';
import PanelContent from './PanelContent';
import './SaveLoadSettingPanelContent.css';

class SaveLoadSettingPanelContent extends PanelContent {

  onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);
    this.props.onFileLoad(file);
  }

  render() {
    return (
      <div className="SaveLoadSettingPanelContent">
          <div className="row">
            <div className="column">
              <span>
                Clipboard:
              </span>
            </div>
            <div className="column">
              <button onClick={this.props.onClipboardGenerate}>Generate</button>
              <button onClick={this.props.onClipboardLoad}>Load</button>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <span>
                File:
              </span>
            </div>
            <div className="column">
              <button onClick={this.props.onFileGenerate}>Generate</button>
              <button onClick={()=>{this.jsonFile.click()}} id="FileLoadConfigBtn">Load</button>
              <input type="file" ref={(ref) => this.jsonFile = ref} style={{display:'none'}} onChange={this.onChangeFile}/>
            </div>
          </div>

        </div>
    );
  }
}

export default SaveLoadSettingPanelContent;
