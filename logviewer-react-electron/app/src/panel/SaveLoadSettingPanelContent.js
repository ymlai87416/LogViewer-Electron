import React, { Component } from 'react';
import PanelContent from './PanelContent';
import style from'./SaveLoadSettingPanelContent.css';

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
          <div className={style.row}>
            <div className={style.columnHeader}>
              <span>
                Clipboard:
              </span>
            </div>
            <div className={style.column}>
              <button className={style.button} onClick={this.props.onClipboardGenerate}>Generate</button>
              <button className={style.button} onClick={this.props.onClipboardLoad}>Load</button>
            </div>
          </div>
          <div className={style.row}>
            <div className={style.columnHeader}>
              <span>
                File:
              </span>
            </div>
            <div className={style.column}>
              <button className={style.button} onClick={this.props.onFileGenerate}>Generate</button>
              <button className={style.button} onClick={()=>{this.jsonFile.click()}} id="FileLoadConfigBtn">Load</button>
              <input type="file" ref={(ref) => this.jsonFile = ref} style={{display:'none'}} onChange={this.onChangeFile}/>
            </div>
          </div>

        </div>
    );
  }
}

export default SaveLoadSettingPanelContent;
