import * as actions from './actions';
import { reset } from 'redux-form';

export const onListScroll = (param: any) => {
  return function (dispatch: any) {
    dispatch(actions.onListScroll(param));
  };
};
export const resetForm = (formName: any) => {
  return function (dispatch: any) {
    dispatch(reset(formName));
  };
};