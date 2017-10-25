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
