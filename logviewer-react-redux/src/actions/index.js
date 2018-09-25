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
    LOGS_FETCH,
    LOGS_FILTER,
    LOGS_REFRESH,
    LOGS_FETCH_ERROR,
    CONTROL_PANEL_TOGGLE,
    LOADING_TOGGLE,
} from '../constants/actionTypes'

const doRegexPanelFieldUpdate = (field, newValue) => ({
    type: REGEX_PANEL_FIELD_UPDATE,
    field: field,
    value: newValue,
})

const doLogfileSlotAdd = () => ({
    type: LOG_FILE_SLOT_ADD,
})

const doLogFileSlotRemove = () => ({
    type: LOG_FILE_SLOT_REMOVE,
})

const doLogFileUpdate = (id, field, newValue) => ({
    type: LOG_FILE_UPDATE,
    logFileId: id,
    field: field,
    value: newValue,
})

const doLogLevelFilterChange = (logLevelList) => ({
    type: LOG_LEVEL_FILTER_CHANGE,
    logLevelList: logLevelList,
})

const doTextListIgnoreUpdate = (ignoreList) => ({
    type: TEXT_LIST_IGNORE_UPDATE,
    ignoreList: ignoreList,
})

const doTextListIncludeUpdate = (includeList) => ({
    type: TEXT_LIST_INCLUDE_UPDATE,
    includeList: includeList,
})

const doConfigClipboardGenerate = () => ({
    type: CONFIG_CILPBOARD_GENERATE,
})

const doConfigClipboardLoadOpen = () => ({
    type: CONFIG_CILPBOARD_LOAD_OPEN
})

const doConfigClipboardLoadClose = (dialogResult, text) => ({
    type: CONFIG_CILPBOARD_LOAD_CLOSE,
    dialogResult: dialogResult,
    text: text
})

const doConfigFileGenerate = () => ({
    type: CONFIG_FILE_GENERATE
})

const doConfigFileLoad = (path) => ({
    type: CONFIG_FILE_LOAD,
    path: path,
})

const doLogsFetch = () => ({
    type: LOGS_FETCH
})

const doLogsFilter = () => ({
    type: LOGS_FILTER
})

const doLogsRefresh = (logEntries) => ({
    type: LOGS_REFRESH,
    logEntries: logEntries,
})

const doLogsFetchError = () => ({
    type: LOGS_FETCH_ERROR
})

const doControlPanelToggle = () => ({
    type: CONTROL_PANEL_TOGGLE
})

const doLoadingToggle = (isLoading) => ({
    type: LOADING_TOGGLE,
    isLoading: isLoading
})

export{
    doRegexPanelFieldUpdate,
    doLogfileSlotAdd,
    doLogFileSlotRemove,
    doLogFileUpdate,
    doLogLevelFilterChange,
    doTextListIgnoreUpdate,
    doTextListIncludeUpdate,
    doConfigClipboardGenerate,
    doConfigClipboardLoadOpen,
    doConfigClipboardLoadClose,
    doConfigFileGenerate,
    doConfigFileLoad,
    doLogsFetch,
    doLogsFilter,
    doLogsRefresh,
    doLogsFetchError,
    doControlPanelToggle,
    doLoadingToggle,
}