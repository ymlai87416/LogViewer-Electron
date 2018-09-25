import { takeEvery, all } from 'redux-saga/effects';
import { call, put, select } from 'redux-saga/effects';
import { LOGS_FETCH, LOGS_FILTER, CONFIG_FILE_LOAD } from '../constants/actionTypes';
import { getControlPanelState } from '../selectors';
import { doLoadingToggle, doLogsRefresh, doLogsFetchError, doConfigClipboardLoadClose } from '../actions';
import update from 'immutability-helper';

var moment = require('moment');

const readTextFile = (file, id, index) => {
    return new Promise(function (resolve, reject) {
        console.time("XMLHttpRequest: " + file);
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, true);
        rawFile.onload = function () {
            if (rawFile.readyState === 4) {
                console.timeEnd("XMLHttpRequest: " + file);
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    var result = { allText: allText, file: file, id: id, index: index };
                    resolve(result);
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

const filterReadLog = (logEntries, logFileList, logLevelFilterList, ignoreTextList, includeTextList) => {
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

const readFromLogFiles = (controlPanelState) => {
    let logFileList = controlPanelState.LogFileList;
    let regexForDate = controlPanelState.LogFileFormatConfig.RegexForDate;
    let datetimeFormat = controlPanelState.LogFileFormatConfig.DatetimeFormat;
    let logRegexFormat = controlPanelState.LogFileFormatConfig.LogRegexFormat;
    let logLevelRegexFormat = controlPanelState.LogFileFormatConfig.LogLevelRegexFormat;
    console.time("readFromLogFiles");

    console.time("readFromLogFiles: read all files");
    var promises = [];

    for (var i = 0; i < logFileList.length; i++) {
        var path = logFileList[i].path;
        var id = logFileList[i].serialNumber;
        var isEnabled = logFileList[i].isEnabled;
        if (path == "") {
            continue
        }
        var tmpTimerName = "Read " + path;

        console.time(tmpTimerName);
        var promise = readTextFile(path, id, i).then(function ({ allText, file, id, index }) {
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
                    singleFileContent.push({ datetime: date, content: arr[i], url: file, id: id, logLevel: logLevel, index: index });
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

        for (var i = 0; i < value.length; ++i)
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

const getColorMap = (logFileList) => {
    var result = {}

    logFileList.forEach(logFile => {
        result[logFile.serialNumber] = logFile.color
    });

    return result;
}

const onFilterChange = (controlPanelState) => {
    new Promise(function (resolve, reject) {
        const fullContent = controlPanelState.logEntriesList;
        var resultArray = filterReadLog(fullContent, controlPanelState.LogFileList,
            controlPanelState.LogLevelFilterList, controlPanelState.IgnoreTextList, controlPanelState.IncludeTextList);

        var colorMap = getColorMap(controlPanelState.LogFileList)

        resolve({ resultArray: resultArray, colorMap: colorMap });
    }).then(function ({ resultArray, colorMap }) {
        const currState = controlPanelState;
        var newState = update(currState,
            {
                colorMap: { $set: colorMap },
                filteredEntriesList: { $set: resultArray },
                isLoading: { $set: false },
            }
        )

        return newState;
    });
}

function* handleLogsFetch(action) {
    try {
        yield put(doLoadingToggle(true));
        let controlPanelState = yield select(getControlPanelState);
        const result = yield call(readFromLogFiles, controlPanelState);
        yield put(doLogsRefresh(result));
        yield put(doLoadingToggle(false));
    } catch (error) {
        yield put(doLogsFetchError(error));
    }
}

function* handleLogFilter(action) {
    try {
        yield put(doLoadingToggle(true));
        let controlPanelState = yield select(getControlPanelState);
        const result = yield call(onFilterChange, controlPanelState);
        yield put(doLogsRefresh(result));
        yield put(doLoadingToggle(false));
    } catch (error) {
        yield put(doLogsFetchError(error));
    }
}

const readConfigFile = (filename) => {
    let reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        reader.onload = () => {
            let jsonString = reader.result;
            resolve(jsonString);
        };
        reader.readAsBinaryString(filename);
    });
}

function* handleConfigFileLoad(action) {
    console.log("handleConfigFileLoad")
    try {
        let filename = action.path;

        const result = yield call(readConfigFile, filename);
        yield put(doConfigClipboardLoadClose(true, result));
    } catch (err) {
        alert("Error when opening config file.")
    }
}

function* watchAll() {
    yield all([
        takeEvery(LOGS_FETCH, handleLogsFetch),
        takeEvery(LOGS_FILTER, handleLogFilter),
        takeEvery(CONFIG_FILE_LOAD, handleConfigFileLoad)
    ])
}

export default watchAll;
