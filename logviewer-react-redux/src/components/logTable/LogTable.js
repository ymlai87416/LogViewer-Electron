import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getColorMap,
  getLogEntriesList,
  getLogFileList,
  getLogLevelFilterList,
  getIgnoreTextList,
  getIncludeTextList,
} from '../../selectors';
import './LogTable.css';

class LogTable extends Component {

  constructor(props) {
    super(props);
  }

  rgbToHex = (rgb) => {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };

  encodeColorString = ({ r, g, b }) => {
    var red = this.rgbToHex(r);
    var green = this.rgbToHex(g);
    var blue = this.rgbToHex(b);
    return "#" + red + green + blue;
  }

  filterReadLog = (logEntries, logFileList, logLevelFilterList, ignoreTextList, includeTextList) => {
    console.time("filterReadLog");

    var resultArray = [];
    var arrayContainsSubString = function (filterArr, val) {
      return filterArr.some(function (e) {
        return val.toLowerCase().indexOf(e.toLowerCase()) >= 0;
      })
    }
    var logFileIdList = logFileList.filter(x => x.isEnabled).map(x => x.serialNumber);

    logEntries.forEach(function (val) {
      if (!logFileIdList.includes(val.id))
        return;
      if (!logLevelFilterList.includes(val.logLevel))
        return;
      if (arrayContainsSubString(ignoreTextList, val.content))
        return;
      if (includeTextList.length > 0) {
        if (!arrayContainsSubString(includeTextList, val.content))
          return;
      }
      resultArray.push(val);
    });

    console.timeEnd("filterReadLog");

    return resultArray;
  }

  render() {
    const colorMap = this.props.colorMap;
    const logEntries = this.props.logEntriesList;
    const logFileList = this.props.logFileList;
    const logLevelFilterList = this.props.logLevelFilterList;
    const ignoreTextList = this.props.ignoreTextList;
    const includeTextList = this.props.includeTextList;

    const filteredList = this.filterReadLog(logEntries, logFileList, logLevelFilterList, ignoreTextList, includeTextList);

    return (
      <div className="LogTable">
        <div className="LogTableInner">
          {
            filteredList.map((element, index) => {
              var color = colorMap[element.id];
              return (
                <div className="row" key={index}>
                  <div className="column">
                    {index + 1}
                  </div>
                  <div className="column" style={{ color: this.encodeColorString(color) }}>
                    <pre>{element.content}</pre>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorMap: getColorMap(state),
  logEntriesList: getLogEntriesList(state),
  logFileList: getLogFileList(state),
  logLevelFilterList: getLogLevelFilterList(state),
  ignoreTextList: getIgnoreTextList(state),
  includeTextList: getIncludeTextList(state),
});

export default connect(
  mapStateToProps
)(LogTable);
