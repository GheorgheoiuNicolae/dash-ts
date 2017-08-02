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

// export const getEntries = (uid) => {
//   return function (dispatch) {
//     firebaseDb.ref()
//     .child(`entries/${uid}`)
//     .orderByChild("date")
//     .on('child_added', (snapshot) => {
//       const entry = snapshot.val();
//       dispatch(receiveEntry(entry))
//     });
//   }
// }

export const getEntryOnChildAdded = (uid) => {
  return function (dispatch) {
    firebaseDb.ref()
    .child(`entries/${uid}`)
    .limitToLast(1)
    .on('child_added', (snapshot) => {
      console.log('last entry: ', snapshot.val())
      const entry = snapshot.val();
      dispatch(receiveEntry(entry))
    });
  }
}

export const getInitialEntries = (uid) => {
  return function (dispatch) {
    firebaseDb.ref()
    .child(`entries/${uid}`)
    .orderByChild("date")
    // .startAt(1500130620000)
    // .endAt(1500809940000)
    .once('value', (snapshot) => {
      const entries = snapshot.val();
      dispatch(reveiveEntries(entries))
    });
  }
}

export const removeAllCollections = () => {
  console.log('removeAllCollections: ')
  firebaseDb.ref().remove()
}

export const createEntry = (data, uid) => {
  // add missing fields before saving
  data.geoPlace = {
    lat: '',
    long: '',
  }

  return function (dispatch) {
    let entriesRef = firebaseDb
      .ref()
      .child(`entries/${uid}`)
      .push();

    const pushkey = entriesRef.getKey();
    
    data.id = pushkey;
    entriesRef.set(data);
  };
};

export const editEntry = (data, uid) => {
  return function (dispatch) {
    let entriesRef = firebaseDb
      .ref()
      .child(`entries/${uid}/${data.id}`)
      .update(data)
    dispatch(saveEntryEdits(data));
  };
};

export const removeEntry = (data, uid) => {
  return function (dispatch) {
    firebaseDb
      .ref()
      .child(`entries/${uid}/${data.id}`)
      .remove()
      .then(function() {
        console.log("Remove succeeded.")
        dispatch(removeEntrySuccess(data));
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
        dispatch(registerError('Could not remove entry', error))
      });
  };
};

export const saveEntryEdits = (data) => ({
  type: types.EDIT_ENTRY,
  payload: data,
});

export const receiveEntry = (entries) => ({
  type: types.RECEIVE_ENTRY,
  payload: entries,
});

export const reveiveEntries = (entries) => ({
  type: types.RECEIVE_ENTRIES,
  payload: entries,
});

export const removeEntrySuccess = (entry) => ({
  type: types.REMOVE_ENTRY_SUCCESS,
  payload: entry,
});

export const registerError = (reason, error) => ({
  type: types.RECEIVE_ENTRIES,
  payload: {
    reason: reason,
    error: error,
  }
});

