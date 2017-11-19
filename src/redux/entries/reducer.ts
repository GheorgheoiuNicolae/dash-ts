import { deleteFromById, deleteFromAllIds, 
  deleteFromDays
} from '../../utils/deleteFromState';
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
      const allEntries = {...state.byId, ...action.payload.entries}
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

        days: mapEntriesToDays(allEntries),

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
      const allEntries = {...state.byId}
      allEntries[action.payload.id] = action.payload;
      
      return !state.ui.firstLoad ? {
        ...state,
        byId: allEntries,
        allIds: [
          ...state.allIds,
          action.payload.id,
        ],
        days: mapEntriesToDays(allEntries),
        ui: {
          ...state.ui,
          numberOfEntries: state.allIds.length + 1,
        }
      } : state;
    }

    case types.REMOVE_ENTRY_SUCCESS: {
      return {
        ...state,
        byId: deleteFromById(state.byId, action.payload),
        allIds: deleteFromAllIds(state.allIds, action.payload),
        days: deleteFromDays(state.days, action.payload),
        ui: {
          ...state.ui,
          numberOfEntries: state.allIds.length + 1,
        }
      };
    }

    case types.EDIT_ENTRY: {
      const newState = {...state};
      newState.byId[action.payload.id] = action.payload;

      return {
        ...newState,
      };
    }

    case types.SELECT_ENTRY: {
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedEntry: action.payload
        }
      };
    }
    case types.DESELECT_ENTRY: {
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedEntry: null
        }
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