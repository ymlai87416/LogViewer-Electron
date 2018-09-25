import{
    LOGS_REFRESH
} from '../constants/actionTypes'; 
import update from 'immutability-helper';

const INITIAL_STATE = {
    logEntriesList: [],
};

const applyLogRefresh = (state, action) =>{
    const logs = action.logEntries;
    const newState = update(state, {
        logEntriesList: {$set: logs},
    })
    return newState;
}

function logReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case LOGS_REFRESH : return applyLogRefresh(state, action);
        default : return state;
    }
}

export default logReducer;