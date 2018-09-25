import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './SaveLoadSettingPanelContent.css';
import {
  doConfigClipboardGenerate,
  doConfigClipboardLoadOpen,
  doConfigFileGenerate,
  doConfigFileLoad,
} from '../../actions';


class SaveLoadSettingPanelContent extends Component {

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
            <button className={style.button} onClick={() => { this.jsonFile.click() }} id="FileLoadConfigBtn">Load</button>
            <input type="file" ref={(ref) => this.jsonFile = ref} style={{ display: 'none' }} onChange={this.onChangeFile} />
          </div>
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onClipboardGenerate: () => dispatch(doConfigClipboardGenerate()),
  onClipboardLoad: () => dispatch(doConfigClipboardLoadOpen()),
  onFileGenerate: () => dispatch(doConfigFileGenerate()),
  onFileLoad: (path) => dispatch(doConfigFileLoad(path)),
});

export default connect(
  null,
  mapDispatchToProps
)(SaveLoadSettingPanelContent);

