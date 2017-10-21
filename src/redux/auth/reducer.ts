import * as types from './types';
import { AuthState } from './interface';
import { authInitialState } from './initialState';

export default function reducer(state: AuthState = authInitialState, action: any) {
    switch(action.type) {

        case types.LOGIN_SUCCESS: {
          return {
            ...state,
            isLoading: true,
          };
        }
        case types.LOGIN_SUCCESS: {
          return {
            ...state,
            isLoading: false,
            user: action.payload
          };
        }
        case types.LOGIN_ERROR: {
          return {
            ...state,
            isLoading: false,
            user: null
          };
        }

        case types.LOGOUT: {
          return {
            ...state,
            isLoading: false,
            user: null,
          };
        }

        case types.FETCH_FIREBASE_USER: {
          return {... state, user: action.payload};
        }

        case types.REGISTER_START: {
          return {
            ...state,
            isLoading: true
          };
        }
        case types.REGISTER_SUCCESS: {
          return {
            ...state,
            isLoading: false,
            user: action.payload
          };
        }
        case types.REGISTER_ERROR: {
          return {
            ...state,
            isLoading: false,
            user: null
          };
        }

        case types.RESET_PASSWORD_BY_EMAIL_SUCCESS: {
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
        
        default: {
            return state;
        }
    }
}