import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import createSagaMiddleware1 from 'redux-saga';

const logger = createLogger();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(saga, logger)
);

export default store;