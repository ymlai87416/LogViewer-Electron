import React, { Component } from 'react';
import PanelContent from './PanelContent';
import './SaveLoadSettingPanelContent.css';

class SaveLoadSettingPanelContent extends PanelContent {

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
              <button onClick={this.props.onFileLoad} id="FileLoadConfigBtn">Load</button>
              <input className="jsonFile" type="file" style={{display:'none'}}/>
            </div>
          </div>

        </div>
    );
  }
}

export default SaveLoadSettingPanelContent;
