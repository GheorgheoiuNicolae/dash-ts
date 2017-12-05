import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import { appReducers } from './reducers';
import * as ReduxPromise from 'redux-promise';
import * as logger from 'redux-logger';
const stateMutation = require('redux-immutable-state-invariant');
import * as sm from 'redux-immutable-state-invariant';
console.log('stateMutation: ', stateMutation, sm);

const loggerOptions: logger.ReduxLoggerOptions = {
  collapsed: true,
};

//  require('redux-immutable-state-invariant').default()
const middleware = applyMiddleware(thunk, ReduxPromise, logger(loggerOptions) );

const store = createStore(appReducers, middleware);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
