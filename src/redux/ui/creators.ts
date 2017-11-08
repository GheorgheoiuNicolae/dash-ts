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

export const getLocation = () => {
  return function (dispatch: any) {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(
          (location) => {
            dispatch(actions.getLocationSuccess(location));
          }, 
          (error: any) => {
            switch(error.code) {
              case error.PERMISSION_DENIED:
                  dispatch(actions.getLocationError({error, message: 'User denied the request for Geolocation.'}));
                  break;
              case error.POSITION_UNAVAILABLE:
                  dispatch(actions.getLocationError({error, message: 'Location information is unavailable.'}));
                  break;
              case error.TIMEOUT:
                  dispatch(actions.getLocationError({error, message: 'The request to get user location timed out.'}));
                  break;
              case error.UNKNOWN_ERROR:
                  dispatch(actions.getLocationError({error, message: 'An unknown error occurred.'}));
                  break;
            }
          },
        );
    } else {
        dispatch(actions.getLocationError({error: '', message: 'Something went wrong while loading location.'}));
    }
  };
};