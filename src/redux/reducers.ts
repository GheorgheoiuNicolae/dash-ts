import { combineReducers } from 'redux';
import { routerReducer as routing, RouterState } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { FormState } from 'redux-form';
import auth from './auth/reducer';
import { AuthState } from './auth/interface';
import entries from './entries/reducer';
import { EntriesInitialState } from './entries/interface';

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
