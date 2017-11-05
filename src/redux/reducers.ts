import { combineReducers } from 'redux';
import { routerReducer as routing, RouterState } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { FormState } from 'redux-form';
import auth from './auth/reducer';
import { AuthState } from './auth/interface';
import entries from './entries/reducer';
import { EntriesInitialState } from './entries/interface';
import labels from './labels/reducer';
import { LabelsState } from './labels/interface';
import ui from './ui/reducer';
import { UiState } from './ui/interface';

export interface ApplicationState {
  routing: RouterState;
  labels: LabelsState;
  entries: EntriesInitialState;
  auth: AuthState;
  form: FormState;
  ui: UiState;
}

export const appReducers = combineReducers<ApplicationState>({
  form: formReducer,
  entries,
  labels,
  routing,
  auth,
  ui,
});
