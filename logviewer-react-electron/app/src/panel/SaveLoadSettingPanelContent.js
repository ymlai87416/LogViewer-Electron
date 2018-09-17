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
              <button onClick={this.props.GenerateConfig}>Generate</button>
              <button onClick={this.props.PromptLoadConfig}>Load</button>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <span>
                File:
              </span>
            </div>
            <div className="column">
              <button onClick={this.props.GenerateConfigAndSaveToFile}>Generate</button>
              <button onClick={this.props.SelectConfigFile} id="FileLoadConfigBtn">Load</button>
              <input className="jsonFile" type="file" style={{display:'none'}}/>
            </div>
          </div>

        </div>
    );
  }
}

export default SaveLoadSettingPanelContent;
