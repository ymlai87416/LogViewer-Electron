import { combineReducers } from 'redux';
import controlPanelReducer from './controlPanel';
import logReducer from './log';

const rootReducer = combineReducers({
    controlPanelState: controlPanelReducer,
    logState: logReducer,
});

export default rootReducer;