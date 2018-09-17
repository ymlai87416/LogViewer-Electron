import React, { Component } from 'react';
import './App.css';
import Panel from './panel/Panel';
import LogTable from './logTable/LogTable';
import update from 'immutability-helper';

var moment = require('moment');

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      logEntriesList: [],
      filteredEntriesList: [],
      colorMap: {},
    };
  }

  filterReadLog = (logEntries, logFileList, logLevelFilterList, ignoreTextList, includeTextList) => {
    console.time("filterReadLog");

    var resultArray = [];
    var arrayContainsSubString = function (filterArr, val) {
      return filterArr.some(function (e) {
        return val.toLowerCase().indexOf(e.toLowerCase()) >= 0;
      })
    }
    var logFileIdList = logFileList.map(x => x.serialNumber);

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

  readTextFile = (file, id, index) => {
    return new Promise(function (resolve, reject) {
      console.time("XMLHttpRequest: " + file);
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, true);
      rawFile.onload = function () {
        if (rawFile.readyState === 4) {
          console.timeEnd("XMLHttpRequest: " + file);
          if (rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            resolve({ allText: allText, file: file, id: id, index: index });
          }
          if (rawFile.status !== 200) {
            var errorMsg = 'URL: ' + rawFile.responseURL + '\nStatus code: ' + rawFile.status + '\nMessage: ' + rawFile.statusText;
            alert(errorMsg);
            reject(errorMsg);
          }
        }
      }
      rawFile.onerror = function (e) {
        alert("Failed to load file " + file);
        reject("Failed to load file.");
      }

      try {
        rawFile.send(null);
      } catch (err) {
        alert("Failed to load file " + file + "," + err);
        reject(err);
      }
    });
  }
  
  readFromLogFiles = (logFileList, regexForDate, datetimeFormat, logRegexFormat, logLevelRegexFormat) => {
    console.time("readFromLogFiles");
    var logArr = [];

    console.time("readFromLogFiles: read all files");
    var promises = [];
    
    for (var i = 0; i < logFileList.length; i++) {
      var path = logFileList[i].path;
      var id = logFileList[i].serialNumber;
      var isEnabled = logFileList[i].isEnabled;
      if (path == "" || !isEnabled) {
        continue
      }
      var tmpTimerName = "Read " + path;

      console.time(tmpTimerName);
      var promise = this.readTextFile(path, id, i).then(function ({ allText, file, id, index }) {
        var myRegex = new RegExp(logRegexFormat, "gm");
        var arr = allText.match(myRegex);
        if (arr == null || arr.length == 0) {
          alert("Regex match failed for file " + file + "!");
          return;
        }
        var regexp = new RegExp(regexForDate);

        var singleFileContent = []
        for (var i = 0; i < arr.length; i++) {
          try {
            var dateStr = regexp.exec(arr[i])[0];
            var date = moment(dateStr, datetimeFormat);
            var logLevelRegex = new RegExp(logLevelRegexFormat, "gm");
            var logLevel = logLevelRegex.exec(arr[i])[1];
            //logArr.push({datetime: date, content: arr[i], url: file, id: id, logLevel: logLevel, index: index});
            singleFileContent.push({datetime: date, content: arr[i], url: file, id: id, logLevel: logLevel, index: index});
          } catch (err) {
            console.log(err);
          }
        }

        return singleFileContent
      });
      console.timeEnd(tmpTimerName);
      promises.push(promise);
    }

    const result = Promise.all(promises).then(function (value) {
      var mergedFileContent = [];

      var sortlogArrByDatetime = (a, b) => {
        var aDate = a.datetime;
        var bDate = b.datetime;
        if (aDate.isSame(bDate)) {
          return ((a.index < b.index) ? -1 : ((a.index > b.index) ? 1 : 0));
        }
        return ((aDate < bDate) ? -1 : ((aDate > bDate) ? 1 : 0));
      }

      for(var i=0; i<value.length; ++i)
        mergedFileContent.push(...value[i]);

      console.timeEnd("readFromLogFiles: read all files");
      console.time("readFromLogFiles: sort");
      mergedFileContent.sort(sortlogArrByDatetime);
      console.timeEnd("readFromLogFiles: sort");
      console.timeEnd("readFromLogFiles");
      
      return mergedFileContent;
    }, function () {
      //TODO: anything?  
    })

    return result;
  }

  getColorMap = (logFileList) => {
    var result = {}
    
    logFileList.forEach(logFile => {
      result[logFile.serialNumber] = logFile.color
    });
  
    return result;
  }

  onReload = (param) => {
    var readPromise = this.readFromLogFiles(param.LogFileList, 
      param.LogFileFormatConfig.RegexForDate, param.LogFileFormatConfig.DatetimeFormat, param.LogFileFormatConfig.LogRegexFormat, param.LogFileFormatConfig.LogLevelRegexFormat,
      param.LogLevelFilterList, param.IgnoreTextList, param.IncludeTextList);

    var colorMap = this.getColorMap(param.LogFileList)
    var self = this;

    readPromise.then(function (value){
      var fullContent = value;
      var filteredLogContent = self.filterReadLog(value, param.LogFileList, param.LogLevelFilterList, param.IgnoreTextList, param.IncludeTextList);

      const currState = self.state;
      var newState = update(currState, 
        {
          colorMap: {$set: colorMap},
          logEntriesList: {$set: fullContent},
          filteredEntriesList: {$set: filteredLogContent}
        }
      )
      self.setState(newState);
    });
  }

  onFilterChange = (param) => {
    const fullContent = this.state.logEntriesList;
    var resultArray = this.filterReadLog(fullContent, param.LogFileList, 
      param.LogLevelFilterList, param.IgnoreTextList, param.IncludeTextList);

    var colorMap = this.getColorMap(param.LogFileList)

    const currState = this.state;
    var newState = update(currState, 
      {
        colorMap: {$set: colorMap},
        filteredEntriesList: {$set: resultArray}
      }
    )

    this.setState(newState);
  }

  render() {
    const logEntriesList = this.state.filteredEntriesList;
    const colorMap = this.state.colorMap;
    const rowLoad = this.state.filteredEntriesList.length;

    return (
      <div className="App">
        <Panel onReload={this.onReload} onFilterChange={this.onFilterChange} rowLoaded={rowLoad}/>
        <LogTable logEntriesList={logEntriesList} colorMap={colorMap}/>
      </div>
    );
  }
}

export default App;
