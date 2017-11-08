import * as types from './types';
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

    default: {
      return { ...state };
    }
  }
}