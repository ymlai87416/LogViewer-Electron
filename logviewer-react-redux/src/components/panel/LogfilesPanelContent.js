import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogfileEntry from './LogfileEntry';
import './LogfilesPanelContent.css';
import { MAX_LOG_FILE } from '../../constants/controlPanel'
import { getLogFileList } from '../../selectors';
import { doLogfileSlotAdd, doLogFileSlotRemove } from '../../actions';

class LogfilesPanelContent extends Component {

  constructor(props) {
    super(props);
  }

  addLogFileSlot = () => {
    this.props.onAddFileSlot();
  }

  removeLogFileSlot = () => {
    this.props.onRemoveFileSlot();
  }

  render() {
    var fileslots = this.props.logFileEntires.map((logFile, index) => {
      return <LogfileEntry key={index} logEntry={logFile}></LogfileEntry>
    })

    const entryCount = this.props.logFileEntires.length;
    const enableAddButton = entryCount < MAX_LOG_FILE
    const enableRemoveButton = entryCount > 1

    return (
      <div className="LogfilesPanelContent">
        <div style={{ padding: '5px' }} >
          <input type="button" value="Add" class="btnAddRemove" onClick={this.addLogFileSlot} disabled={!enableAddButton} />
          <input type="button" value="Remove" class="btnAddRemove" onClick={this.removeLogFileSlot} disabled={!enableRemoveButton} />
          <span id="ICntValue">{entryCount}</span>
          <span>/</span>
          <span id="MAX_LOG_COUNT"> { MAX_LOG_FILE }</span>
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

const mapStateToProps = state => ({
  logFileEntires: getLogFileList(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAddFileSlot: () => dispatch(doLogfileSlotAdd()),
  onRemoveFileSlot: () => dispatch(doLogFileSlotRemove()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogfilesPanelContent);