import { BaseAction, Entry } from '../types/';
import * as types from '../actions/types';

export interface EntriesState {
  entries_initial_load: boolean;
  list: Entry[];
}

export default function reducer(state: EntriesState = {
  entries_initial_load: true,
  list: []
}, action: BaseAction) {
  switch (action.type) {
    case types.RECEIVE_ENTRY: {
      return {
        ...state,
        list: [
          ...state.list,
          action.payload
        ]
      };
    }
    default: {
      return { ...state };
    }
  }
}