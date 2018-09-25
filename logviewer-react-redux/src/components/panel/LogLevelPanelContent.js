import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LOG_LEVELS } from '../../constants/controlPanel';
import { doLogLevelFilterChange } from '../../actions';
import { getLogLevelFilterList } from '../../selectors';

class LogLevelPanelContent extends Component {

  constructor(props){
    super(props);
    this.logLevelCheckBox = [];
  }

  selectAllbtnOnClick = () => {
    this.props.onLogLevelFilterChange(LOG_LEVELS);
  }

  unSelectAllbtnOnClick = () => {
    this.props.onLogLevelFilterChange([]);
  }

  onCheckBoxChange = (event) => {
    let logLevelsEnabled = this.logLevelCheckBox.filter(x => x.checked).map(x => x.id);
    this.props.onLogLevelFilterChange(logLevelsEnabled);
  }

  createLogLevelCheckBox = (element, index) => {
    const isSelected = this.props.logLevelFilterList.includes(element);
    return(
      <span key={index}>
        <input type="checkbox" id={element} checked={isSelected} ref={(input) => {this.logLevelCheckBox[index] = input }} onChange={this.onCheckBoxChange}/>
        <label for={element}>{element}</label>
      </span>
    )
  }

  render() {
    return (
      <div className="LogLevelPanelContent">
        <div>
          {LOG_LEVELS.map((element, index) => {return this.createLogLevelCheckBox(element, index);})}
        </div>
        <br/>
        <button onClick={this.selectAllbtnOnClick} style={{margin: '2px'}}>Select All</button>
        <button onClick={this.unSelectAllbtnOnClick} style={{margin: '2px'}}>Unselect All</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  logLevelFilterList: getLogLevelFilterList(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogLevelFilterChange: (logLevelList) => dispatch(doLogLevelFilterChange(logLevelList)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogLevelPanelContent);

