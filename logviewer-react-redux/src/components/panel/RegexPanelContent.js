import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  getRegexForDate,
  getDatetimeFormat,
  getLogRegexFormat,
  getLogLevelRegexFormat,
} from '../../selectors';
import { doRegexPanelFieldUpdate } from '../../actions';

import './RegexPanelContent.css';

class RegexPanelContent extends Component {

  constructor(props) {
    super(props);
  }

  logFileFormatConfigHandler = (tag, event) => {
    const value = event.target.value;
    this.props.onRegexPanelFieldUpdate(tag, value);
  }

  render() {

    return (
      <div className="RegexPanelContent">
        <label>Regex for date:</label>
        <input id="dateRegex" value={this.props.regexForDate} onChange={(event) => this.logFileFormatConfigHandler("RegexForDate", event)} /><br />

        <label>Datetime format:</label>
        <input id="dateFormat" value={this.props.datetimeFormat} onChange={(event) => this.logFileFormatConfigHandler("DatetimeFormat", event)} /><br />

        <label>Log Regex format:</label>
        <input id="logRegexFormat" value={this.props.logRegexFormat} onChange={(event) => this.logFileFormatConfigHandler("LogRegexFormat", event)} /><br />

        <label>Loglevel Regex format:</label>
        <input id="logLevelRegexFormat" value={this.props.logLevelRegexFormat} onChange={(event) => this.logFileFormatConfigHandler("LogLevelRegexFormat", event)} /><br />
      </div>
    );
  }
}

const mapStoreToProps = state => ({
  regexForDate: getRegexForDate(state),
  datetimeFormat: getDatetimeFormat(state),
  logRegexFormat: getLogRegexFormat(state),
  logLevelRegexFormat: getLogLevelRegexFormat(state),
})

const mapDispatchToProps = (dispatch) => ({
  onRegexPanelFieldUpdate: (field, value) => dispatch(doRegexPanelFieldUpdate(field, value)),
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(RegexPanelContent);
