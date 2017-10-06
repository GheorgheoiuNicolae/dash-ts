import { BaseAction, EntriesFilterBy } from '../types/';
import { deleteFromById, deleteFromAllIds} from '../utils/deleteFromState';
import * as types from '../actions/types';

export interface EntriesInitialState {
  allIds: number[] | string[];
  ui: {
    selectedEntry: any;
    didInvalidate: boolean;
    showAddModal: boolean;
    filterBy: EntriesFilterBy;
    error: boolean;
    view: string;
    firstLoad: boolean;
    isLoading: boolean;
    datesLoaded: {
      past: any,
      future: any,
    }
  };
  byId: any;
}

const initialState = {
  ui: {
    selectedEntry: null,
    didInvalidate: false,
    showAddModal: false,
    view: 'list',
    firstLoad: true,
    isLoading: false,
    datesLoaded: {
      past: null,
      future: null,
    },
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
};

export default function reducer(state: EntriesInitialState = initialState, action: BaseAction) {
  switch (action.type) {

    case types.RECEIVE_ENTRIES: {
      return {
        ...state,
        byId: { 
          ...state.byId,
          ...action.payload.entries 
        },

        allIds: [
          ...state.allIds,
          ...Object.keys(action.payload.entries).map((key) => {
            return key;
          }),
        ],

        ui: {
          ...state.ui,
          firstLoad: false,
          isLoading: false,
          datesLoaded: {
            past: action.payload.dates.past 
              ? action.payload.dates.past 
              : state.ui.datesLoaded.past,
            future: action.payload.dates.future 
              ? action.payload.dates.future 
              : state.ui.datesLoaded.future,
          }
        }
      };
    }

    case types.LOADING_ENTRIES_START: {
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: true,
        }
      };
    }

    case types.RECEIVE_ENTRY: {
      let newEntry = {};
      newEntry[action.payload.id] = {...action.payload};
      return !state.ui.firstLoad ? {
        ...state,
        byId: {
          ...state.byId,
          ...newEntry,
        },
        allIds: [
          ...state.allIds,
          action.payload.id,
        ]
      } : state;
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
    case types.LOGOUT_FIREBASE_USER: {
      return {
        ...initialState
      };
    }

    default: {
      return { ...state };
    }
  }
}