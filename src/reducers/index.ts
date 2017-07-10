import { combineReducers } from 'redux';
import { routerReducer as routing, RouterState } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { FormState } from 'redux-form';
import entries from './entries';
import auth from './auth';
import { AuthState } from './auth';
import { EntriesInitialState } from './entries';

export interface ApplicationState {
  routing: RouterState;
  entries: EntriesInitialState;
  auth: AuthState;
  form: FormState;
}

export const appReducers = combineReducers<ApplicationState>({
  form: formReducer,
  entries,
  routing,
  auth
});
