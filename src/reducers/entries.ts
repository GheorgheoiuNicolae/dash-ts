import { BaseAction, Any, EntriesFilterBy } from '../types/';
import * as types from '../actions/types';

export interface EntriesInitialState {
  allIds: number[] | string[];
  ui: {
    entry: Any;
    didInvalidate: boolean;
    showModal: string | null;
    filterBy: EntriesFilterBy;
    error: boolean;
  };
  byId: Any;
}

export default function reducer(state: EntriesInitialState = {
  ui: {
    entry: null,
    didInvalidate: false,
    showModal: null,
    filterBy: {
      date: {
        from: null,
        to: null,
      },
      kind: '',
      labels: [],
    },
    error: false,
  },
  byId: {},
  allIds: [],
}, action: BaseAction) {
  console.log(action);
  switch (action.type) {

    case types.RECEIVE_ENTRIES: {
      return {
        ...state,
        byId: action.payload,
        allIds: [
          ...state.allIds,
          ...Object.keys(action.payload).map((key) => {
            return key;
          }),
        ]
      };
    }
    case types.RECEIVE_ENTRY: {
      let newEntry = {};
      newEntry[action.payload.id] = {...action.payload};
      return {
        ...state,
        byId: {
          ...state.byId,
          ...newEntry,
        },
        allIds: [
          ...state.allIds,
          action.payload.id,
        ]
      };
    }
    default: {
      return { ...state };
    }
  }
}