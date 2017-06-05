import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import {appReducers} from '../reducers/index';

const middleware = applyMiddleware(thunk);
console.log('middleware:', middleware);
const store = createStore(appReducers, middleware);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;

store.subscribe(function(){
    console.log('store', store.getState())
});

// , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
