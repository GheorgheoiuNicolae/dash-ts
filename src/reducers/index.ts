import { combineReducers } from 'redux';
import { routerReducer as routing, RouterState } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import entries from './entries';
import auth from './auth';

export interface ApplicationState {
  routing: RouterState;
  entries: any;
  auth: any;
  form: any;
}

export const appReducers = combineReducers<ApplicationState>({
  form: formReducer,
  entries,
  routing,
  auth
});
