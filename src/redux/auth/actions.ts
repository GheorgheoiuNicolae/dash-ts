import * as types from './types';

export function resetPasswordByEmailStart() {
  return {
    type: types.RESET_PASSWORD_BY_EMAIL_START,
  };
}
export function resetPasswordByEmailError(error: any) {
  return {
    type: types.RESET_PASSWORD_BY_EMAIL_ERROR,
    payload: error
  };
}
export function resetPasswordByEmailSuccess(res: any) {
  return {
    type: types.RESET_PASSWORD_BY_EMAIL_SUCCESS
  };
}

export function loginStart() {
  return {
    type: types.LOGIN_START
  };
}
export function loginSuccess(res: any) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: res
  };
}
export function loginError(e: any) {
  return {
    type: types.LOGIN_ERROR,
    payload: e
  };
}

export function registerStart() {
  return {
    type: types.REGISTER_START
  };
}
export function registerSuccess(res: any) {
  return {
    type: types.REGISTER_SUCCESS,
    payload: res
  };
}
export function registerError(e: any) {
  return {
    type: types.REGISTER_ERROR,
    payload: e
  };
}

export function fetchUser(request: any) {
  return {
    type: types.FETCH_FIREBASE_USER,
    payload: request,
  };
}

export function logout() {
  return {
    type: types.LOGOUT
  };
}