import * as types from '../actions/types';
import { BaseAction } from '../types/';

export interface User {
  uid: string;
}

export interface AuthState {
  isLoading: boolean;
  user: null | User;
  requestedPasswordReset: boolean;
}

export default function reducer(state: AuthState={
    isLoading: false,
    user: null,
    requestedPasswordReset: false,
}, action: BaseAction) {
    switch(action.type) {

        case types.LOGIN_FIREBASE_USER: {
          return {
            ...state,
            isLoading: false,
            user: action.payload
          };
        }

        case types.LOGOUT_FIREBASE_USER: {
          return {
            ...state,
            isLoading: false,
            user: null,
          };
        }

        case types.FETCH_FIREBASE_USER: {
          return {... state, user: action.payload};
        }

        case types.REGISTER_FIREBASE_USER: {
          return {
            ...state,
            isLoading: false,
            user: action.payload
          };
        }

        case types.FIREBASE_PASSWORD_RESET_EMAIL: {
          return { 
            ...state,
            requestedPasswordReset: true,
          };
        }

        case types.CHECK_AUTH: {
          return { 
            ...state,
            user: action.payload,
          };
        }

        case types.ON_AUTH_STATE_CHANGE: {
          return { ...state };
        }
        
        default: {
            return state;
        }
    }
}