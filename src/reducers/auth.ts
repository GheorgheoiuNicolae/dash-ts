import * as types from '../actions/types';

export default function reducer(state={
    isLoading: false,
    user: null,
    requestedPasswordReset: false,
}, action: any) {
    switch(action.type) {

        case types.LOGIN_FIREBASE_USER: {
          return {
            ...state,
            isLoading: false,
            user: action.payload
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