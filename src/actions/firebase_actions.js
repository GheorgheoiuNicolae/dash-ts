import FireBaseTools, { firebaseDb } from '../utils/firebase';
import * as types from './types';

export function loginWithProvider(provider) {
  const request = FireBaseTools.loginWithProvider(provider);
  return {
    type: types.LOGIN_WITH_PROVIDER_FIREBASE,
    payload: request,
  };
}

export function registerUser(user) {
  const request = FireBaseTools.registerUser(user);
  return {
    type: types.REGISTER_FIREBASE_USER,
    payload: request,
  };
}

export function loginUser(user) {
  const request = FireBaseTools.loginUser(user);
  return {
    type: types.LOGIN_FIREBASE_USER,
    payload: request,
  };
}

function addUserData(data) {
  return {
    type: types.FETCH_FIREBASE_USER,
    payload: data,
  };
}
export function fetchUser() {
  const request = FireBaseTools.fetchUser();
  return {
    type: types.FETCH_FIREBASE_USER,
    payload: request,
  };
}

export function updateUser(user) {
  const request = FireBaseTools.updateUserProfile(user);
  return {
    type: types.UPDATE_FIREBASE_USER,
    payload: request,
  };
}

export function changePassword(newPassword) {
  const request = FireBaseTools.changePassword(newPassword);
  return {
    type: types.CHANGE_FIREBASE_USER_PASSWORD,
    payload: request,
  };
}

export function resetPasswordEmail(email) {
  const request = FireBaseTools.resetPasswordEmail(email);
  return {
    type: types.FIREBASE_PASSWORD_RESET_EMAIL,
    payload: request,
  };
}

export function logoutUser(user) {
  const request = FireBaseTools.logoutUser(user);
  return {
    type: types.LOGOUT_FIREBASE_USER,
    payload: request,
  };
}

export function checkAuthState() {
  const request = FireBaseTools.checkIfAuthed();
  return {
    type: types.CHECK_AUTH,
    payload: request
  };
}

export function onAuthStateChange() {
  const request = FireBaseTools.onAuthStateChanged();
  return {
    type: types.CHECK_AUTH,
    payload: request
  };
}

export const getEntries = (uid) => {
  return function (dispatch) {
    firebaseDb.ref()
    .child(`entries/${uid}`)
    .orderByChild("date")
    .on('child_added', (snapshot) => {
      dispatch(reveiveEntry(snapshot.val()))
    });
  }
}

export const reveiveEntry = (entry) => ({
  type: types.RECEIVE_ENTRY,
  payload: entry,
})