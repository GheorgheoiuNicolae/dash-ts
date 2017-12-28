import * as types from './types';
import * as entryTypes from '../entries/types';
import * as authTypes from '../auth/types';
import { initialState } from './initialState';
import { UiState } from './interface';

export default function reducer(state: UiState = initialState, action: any) {
  switch (action.type) {

    case types.LIST_SCROLL: {
      return {
        ...state,
        ...action.payload
      };
    }

    case types.GET_LOCATION_SUCCESS: {
      return {
        ...state,
        location: action.payload
      };
    }

    case types.GET_LOCATION_SUCCESS: {
      return {
        ...state,
        location: action.payload
      };
    }

    case types.SHOW_MODAL: {
      switch(action.payload) {
        case 'deleteEntry': {
          return {
            ...state,
            activeModal: action.payload,
          };
        }
        default: {
          return { ...state };
        }
      }
    }

    case types.HIDE_MODAL: {
      switch(action.payload) {
        case 'deleteEntry': {
          return {
            ...state,
            activeModal: null,
          };
        }
        case 'requestAuth': {
          return {
            ...state,
            activeModal: null,
          };
        }
        default: {
          return { ...state };
        }
      }
    }

    case entryTypes.REMOVE_ENTRY_SUCCESS: {
      return {
        ...state,
        activeModal: null
      };
    }

    case authTypes.REQUEST_AUTH: {
      return {
        ...state,
        activeModal: 'requestAuth'
      };
    }

    default: {
      return { ...state };
    }
  }
}