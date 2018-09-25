const getRegexForDate = ({ controlPanelState }) => {
    return controlPanelState.LogFileFormatConfig.RegexForDate;
}

const getDatetimeFormat = ({ controlPanelState }) => {
    return controlPanelState.LogFileFormatConfig.DatetimeFormat;
}

const getLogRegexFormat = ({ controlPanelState }) => {
    return controlPanelState.LogFileFormatConfig.LogRegexFormat;
}

const getLogLevelRegexFormat = ({ controlPanelState }) => {
    return controlPanelState.LogFileFormatConfig.LogLevelRegexFormat;
}

const getIgnoreTextList = ({ controlPanelState }) => {
    return controlPanelState.IgnoreTextList;
}

const getIncludeTextList = ({ controlPanelState }) => {
    return controlPanelState.IncludeTextList;
}

const getLogLevelFilterList = ({ controlPanelState }) => {
    return controlPanelState.LogLevelFilterList;
}

const getShowControlPanel = ({ controlPanelState }) => {
    return controlPanelState.ShowControlPanel;
}

const getRowLoaded = ({ logState }) => {
    return logState.logEntriesList.length;
}

const getLogFileList = ({ controlPanelState }) => {
    return controlPanelState.LogFileList;
}

const getLogEntriesList = ({ logState }) => {
    return logState.logEntriesList;
}

const getIsConfigDialogOpen = ({ controlPanelState }) => {
    return controlPanelState.IsDialogOpen;
}

const getControlPanelState = ({ controlPanelState }) => {
    return controlPanelState;
}

const getColorMap = ({ controlPanelState }) => {
    var result = {}

    controlPanelState.LogFileList.forEach(logFile => {
        result[logFile.serialNumber] = logFile.color
    });

    return result;
}

const getIsLoading = ({controlPanelState}) => {
    return controlPanelState.IsLoading;
} 

export {
    getRegexForDate,
    getDatetimeFormat,
    getLogRegexFormat,
    getLogLevelRegexFormat,
    getIgnoreTextList,
    getIncludeTextList,
    getLogLevelFilterList,
    getShowControlPanel,
    getRowLoaded,
    getLogFileList,
    getIsConfigDialogOpen,
    getControlPanelState,
    getLogEntriesList,
    getColorMap,
    getIsLoading,
};