import * as types from './types';

export const hideModal = (modalName) => ({
  type: types.HIDE_MODAL,
  payload: modalName,
});

export const showModal = (modalName) => ({
  type: types.SHOW_MODAL,
  payload: modalName,
});

export const switchEntriesView = (type) => ({
  type: types.SWITCH_ENTRIES_VIEW,
  payload: type,
});