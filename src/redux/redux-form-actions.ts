import { change } from 'redux-form';

export const setFieldValue = (formName: string, field: string, value: any) => {
  return function (dispatch: any) {
    dispatch(change('manageLabels', field, value));
  };
};