import {
    LOG_LEVELS,
    LOG_FILE_COLORS,
    MAX_LOG_FILE,
} from '../constants/controlPanel';
import update from 'immutability-helper';
import {
    REGEX_PANEL_FIELD_UPDATE,
    LOG_FILE_SLOT_ADD,
    LOG_FILE_SLOT_REMOVE,
    LOG_FILE_UPDATE,
    LOG_LEVEL_FILTER_CHANGE,
    TEXT_LIST_IGNORE_UPDATE,
    TEXT_LIST_INCLUDE_UPDATE,
    CONFIG_CILPBOARD_GENERATE,
    CONFIG_CILPBOARD_LOAD_OPEN,
    CONFIG_CILPBOARD_LOAD_CLOSE,
    CONFIG_FILE_GENERATE,
    CONFIG_FILE_LOAD,
    LOGS_FETCH_ERROR,
    CONTROL_PANEL_TOGGLE,
    LOADING_TOGGLE,
} from '../constants/actionTypes'

const DEFAULT_DATE_REGEX = "[\\S]+\\s+[\\S]+";
const DEFAULT_DATE_FORMAT = "YYYY-MM-DD hh:mm:ss";
const DEFAULT_LOG_REGEX_FORMAT = "^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}[\\s\\S]+?((?=^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}|$)(?!\\n|\\s))";
const DEFAULT_LOG_LEVEL_REGEX_FORMAT = "^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\S*\\s([\\S]+)";

const INITIAL_STATE = {
    LogFileFormatConfig: {
        RegexForDate: DEFAULT_DATE_REGEX,
        DatetimeFormat: DEFAULT_DATE_FORMAT,
        LogRegexFormat: DEFAULT_LOG_REGEX_FORMAT,
        LogLevelRegexFormat: DEFAULT_LOG_LEVEL_REGEX_FORMAT,
    },

    LogFileList: [
        {
            serialNumber: 1,
            path: "",
            color: LOG_FILE_COLORS[0],
            isEnabled: true
        }
    ],
    LogLevelFilterList: LOG_LEVELS,
    IgnoreTextList: [],
    IncludeTextList: [],

    ShowControlPanel: true,
    IsDialogOpen: false,
    IsLoading: false,
};

const doRegexPanelFieldUpdate = (state, action) => {
    let newLogFileFormatConfig = update(state.LogFileFormatConfig, {
        [action.field]: { $set: action.value }
    });
    let newState = update(state, {
        LogFileFormatConfig: { $set: newLogFileFormatConfig }
    });

    return newState;
}

const getMaxSerialNumber = (logFileList) => {
    var result = 0;
    for (var i = 0; i < logFileList.length; ++i) {
        if (logFileList[i].serialNumber > result)
            result = logFileList[i].serialNumber;
    }

    return result;
}

const getNewColor = (state) => {
    var existingRGBArr = []
    state.LogFileList.forEach(function (value) {
        existingRGBArr.push(value.color);
    });

    var resultColor = LOG_FILE_COLORS[Math.floor(Math.random() * LOG_FILE_COLORS.length)];

    var isNewColor = false;

    while (!isNewColor) {
        var matchColorFound = false;
        for (var i = 0; i < existingRGBArr.length; i++) {
            var tmp = existingRGBArr[i];
            if (resultColor.r == tmp.r && resultColor.g == tmp.g && resultColor.b == tmp.b) {
                matchColorFound = true;
                resultColor = LOG_FILE_COLORS[Math.floor(Math.random() * LOG_FILE_COLORS.length)];
                break;
            }
        }
        if (!matchColorFound) {
            isNewColor = true;
        }
    }

    return resultColor;
}

const applyLogFileSlotAdd = (state, action) => {
    if (state.LogFileList.length < MAX_LOG_FILE) {
        const newColor = getNewColor(state);
        const newSerialNum = getMaxSerialNumber(state.LogFileList) + 1;
        const newFileSlots = update(state.LogFileList, {
            $push: [{
                serialNumber: newSerialNum,
                path: "",
                color: newColor,
                isEnabled: true
            }]
        });
        const newState = update(state, {
            LogFileList: { $set: newFileSlots }
        })
        return newState;
    }
    else
        return state;
}

const applyLogFileSlotRemove = (state, action) => {
    if (state.LogFileList.length > 1) {
        const logFileListLen = state.LogFileList.length;
        const newLogFileList = update(state.LogFileList, { $splice: [[logFileListLen - 1, 1]] });
        const newState = update(state, {
            LogFileList: { $set: newLogFileList }
        })

        return newState;
    }
    else
        return state;
}

const applyLogFileUpdate = (state, action) => {
    const currLogFileEntry = state.LogFileList.find(x => x.serialNumber == action.logFileId)
    const newLogFileEntry = update(currLogFileEntry, {
        [action.field]: { $set: action.value }
    });
    const newlogFileList = update(state.LogFileList, {
        $splice: [[action.logFileId - 1, 1, newLogFileEntry]]
    });

    const newState = update(state, { LogFileList: { $set: newlogFileList } });

    return newState;
}

const applyLogLevelFilterChange = (state, action) => {
    const newState = update(state, {
        LogLevelFilterList: { $set: action.logLevelList }
    });

    return newState;
}

const applyTextListIgnoreUpdate = (state, action) => {
    const newState = update(state, {
        IgnoreTextList: { $set: action.ignoreList }
    });

    return newState;
}

const applyTextListIncludeUpdate = (state, action) => {
    const newState = update(state, {
        IncludeTextList: { $set: action.includeList }
    });

    return newState;
}

const loadConfig = (jsonString) => {
    try {
        var loadedState = JSON.parse(jsonString);
        loadedState["IsDialogOpen"] = false;
        return loadedState;
    } catch (err) {
        alert("Error format. " + err);
        return null;
    }
}

const copyToClipboard = (text) => {
    let dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

const applyConfigClipboardGenerate = (state, action) => {
    const config = JSON.stringify(state);
    copyToClipboard(config);
    alert("Configuration copied to clipboard.")

    return state;
}

const applyConfigClipboardLoadOpen = (state, action) => {
    const newState = update(state, {
        IsDialogOpen: { $set: true }
    })

    return newState;
}

const applyConfigClipboardLoadClose = (state, action) => {
    if (action.dialogResult) {
        var result = state;
        try {
            result = JSON.parse(action.text);
        } catch (err) {
            alert("It is not a valid config string.")
        }
        const newState = update(result, {
            IsDialogOpen: { $set: false }
        })
        return newState;
    }
    else {
        const newState = update(state, {
            IsDialogOpen: { $set: false }
        })
        return newState;
    }
}

const applyConfigFileGenerate = (state, action) => {
    const textToSave = JSON.stringify(state);

    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'config.json';
    hiddenElement.click();

    return state;
}

const applyControlPanelToggle = (state, action) => {
    const newState = update(state, {
        ShowControlPanel: { $set: !state.ShowControlPanel }
    })

    return newState;
}

const applyLoadingToggle = (state, action) => {
    const newState = update(state, {
        IsLoading: { $set: action.isLoading }
    })

    return newState;
}

function controlPanelReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REGEX_PANEL_FIELD_UPDATE: return doRegexPanelFieldUpdate(state, action);
        case LOG_FILE_SLOT_ADD: return applyLogFileSlotAdd(state, action);
        case LOG_FILE_SLOT_REMOVE: return applyLogFileSlotRemove(state, action);
        case LOG_FILE_UPDATE: return applyLogFileUpdate(state, action);
        case LOG_LEVEL_FILTER_CHANGE: return applyLogLevelFilterChange(state, action);
        case TEXT_LIST_IGNORE_UPDATE: return applyTextListIgnoreUpdate(state, action);
        case TEXT_LIST_INCLUDE_UPDATE: return applyTextListIncludeUpdate(state, action);
        case CONFIG_CILPBOARD_GENERATE: return applyConfigClipboardGenerate(state, action);
        case CONFIG_CILPBOARD_LOAD_OPEN: return applyConfigClipboardLoadOpen(state, action);
        case CONFIG_CILPBOARD_LOAD_CLOSE: return applyConfigClipboardLoadClose(state, action);
        case CONFIG_FILE_GENERATE: return applyConfigFileGenerate(state, action);
        //case CONFIG_FILE_LOAD: return applyConfigFileLoad(state, action);
        case LOGS_FETCH_ERROR: return applyTextListIncludeUpdate(state, action);
        case CONTROL_PANEL_TOGGLE: return applyControlPanelToggle(state, action);
        case LOADING_TOGGLE: return applyLoadingToggle(state, action)
        default: return state;
    }
}

export default controlPanelReducer;