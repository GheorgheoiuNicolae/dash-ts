import * as types from './types';

export const hideModal = (modalName: string) => ({
  type: types.HIDE_MODAL,
  payload: modalName,
});

export const showModal = (modalName: string) => ({
  type: types.SHOW_MODAL,
  payload: modalName,
});

export const switchEntriesView = (type: string) => ({
  type: types.SWITCH_ENTRIES_VIEW,
  payload: type,
});

export const onListScroll = (obj: any) => ({
  type: types.LIST_SCROLL,
  payload: obj,
});

export const getLocationSuccess = (location: any) => ({
  type: types.GET_LOCATION_SUCCESS,
  payload: location,
});
export const getLocationError = (err: any) => ({
  type: types.GET_LOCATION_ERROR,
  payload: err,
});