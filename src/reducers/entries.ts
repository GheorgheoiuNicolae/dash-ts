import { BaseAction, Any, EntriesFilterBy } from '../types/';
import { deleteFromById, deleteFromAllIds} from '../utils/deleteFromState';
import * as types from '../actions/types';

export interface EntriesInitialState {
  allIds: number[] | string[];
  ui: {
    selectedEntry: Any;
    didInvalidate: boolean;
    showAddModal: boolean;
    filterBy: EntriesFilterBy;
    error: boolean;
    view: string;
  };
  byId: Any;
}

export default function reducer(state: EntriesInitialState = {
  ui: {
    selectedEntry: null,
    didInvalidate: false,
    showAddModal: false,
    view: 'list',
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
    case types.REMOVE_ENTRY_SUCCESS: {
      return {
        ...state,
        byId: deleteFromById(state.byId, action.payload),
        allIds: deleteFromAllIds(state.allIds, action.payload),
      };
    }
    case types.EDIT_ENTRY: {
      const newState = {...state};
      newState.byId[action.payload.id] = action.payload;

      return {
        ...newState,
      };
    }
    case types.HIDE_MODAL: {
      switch(action.payload) {
        case 'addEntry': {
          return {
            ...state,
            ui: {
              showAddModal: false
            }
          };
        }
        default: {
          return { ...state };
        }
      }
    }

    case types.SHOW_MODAL: {
      switch(action.payload) {
        case 'addEntry': {
          return {
            ...state,
            ui: {
              showAddModal: true
            }
          };
        }
        default: {
          return { ...state };
        }
      }
    }

    case types.SWITCH_ENTRIES_VIEW: {
      return {
        ...state,
        ui: {
          ...state.ui,
          view: action.payload,
        }
      };
    }

    default: {
      return { ...state };
    }
  }
}