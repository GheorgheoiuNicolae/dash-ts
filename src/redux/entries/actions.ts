import * as types from './types';

export const receiveEntry = (entries: any[]) => ({
  type: types.RECEIVE_ENTRY,
  payload: entries,
});

export const loadEntriesStart = (type: 'initial' | 'future' | 'past') => ({
  type: types.LOAD_ENTRIES_START,
  payload: type
});

export const loadEntriesSuccess = (entries: any[], dates: any) => ({
  type: types.RECEIVE_ENTRIES,
  payload: {
    entries,
    dates,
  },
});

export const shouldLoadOneYear = () => ({
  type: types.SHOULD_LOAD_ONE_YEAR
});

export const disableLoadOneYear = () => ({
  type: types.DISABLE_LOAD_ONE_YEAR
});

export const removeEntrySuccess = (entry: any) => ({
  type: types.REMOVE_ENTRY_SUCCESS,
  payload: entry,
});

// what is this?
export const registerError = (reason: any, error: any) => ({
  type: types.RECEIVE_ENTRIES,
  payload: {
    reason: reason,
    error: error,
  }
});

export const saveEntryEdits = (data: any) => ({
  type: types.EDIT_ENTRY,
  payload: data,
});
