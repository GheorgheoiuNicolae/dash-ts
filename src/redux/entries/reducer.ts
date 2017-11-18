import { deleteFromById, deleteFromAllIds} from '../../utils/deleteFromState';
import * as types from './types';
import * as uiTypes from '../ui/types';
import * as authTypes from '../auth/types';
import { initialState } from './initialState';
import { EntriesInitialState } from './interface';
import { mapEntriesToDays } from './parseEntries';

export default function reducer(state: EntriesInitialState = initialState, action: any) {
  switch (action.type) {
    case types.SHOULD_LOAD_ONE_YEAR: {
      return {
        ...state,
        ui: {
          ...state.ui,
          shouldLoadOneYear: true,
        }
      };
    }

    case types.DISABLE_LOAD_ONE_YEAR: {
      return {
        ...state,
        ui: {
          ...state.ui,
          shouldLoadOneYear: false,
        }
      };
    }
    
    case types.RECEIVE_ENTRIES: {
      console.log('RECEIVE_ENTRIES', state.ui.isLoading);
      const allIds = [...state.allIds];
      let existingId = allIds.find((id: any) => id === action.payload.id);
      if(existingId) {
        console.log('entry already exists', state.byId[existingId]);
      }

      
      var a = mapEntriesToDays(state);
      console.log('RECEIVE_ENTRies: ', a);

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
          isLoading: {
            loading: false,
            type: null,
          },
          // WARNING - not supported by IE9 or lower
          numberOfEntries: action.payload.entries ? Object.keys(action.payload.entries).length : null,
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

    case types.LOAD_ENTRIES_START: {
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: {
            loading: true,
            type: action.payload
          },
        }
      };
    }

    case types.RECEIVE_ENTRY: {
      let newEntry = {};
      newEntry[action.payload.id] = {...action.payload};
      var a = mapEntriesToDays(state);
      console.log('entries have been parsed', a);
      return !state.ui.firstLoad ? {
        ...state,
        byId: {
          ...state.byId,
          ...newEntry,
        },
        allIds: [
          ...state.allIds,
          action.payload.id,
        ],
        ui: {
          ...state.ui,
          numberOfEntries: state.ui.numberOfEntries || state.ui.numberOfEntries === 0 && state.ui.numberOfEntries + 1,
        }
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

    case uiTypes.HIDE_MODAL: {
      switch(action.payload) {
        case 'addEntry': {
          return {
            ...state,
            ui: {
              ...state.ui,
              showAddModal: false
            }
          };
        }
        default: {
          return { ...state };
        }
      }
    }

    case uiTypes.SHOW_MODAL: {
      switch(action.payload) {
        case 'addEntry': {
          return {
            ...state,
            ui: {
              ...state.ui,
              showAddModal: true
            }
          };
        }
        default: {
          return { ...state };
        }
      }
    }

    case uiTypes.SWITCH_ENTRIES_VIEW: {
      return {
        ...state,
        ui: {
          ...state.ui,
          view: action.payload,
        }
      };
    }

    case authTypes.LOGOUT: {
      return {
        ...initialState
      };
    }

    default: {
      return { ...state };
    }
  }
}