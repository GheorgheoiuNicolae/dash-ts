// import FireBaseTools, { firebaseDb } from '../utils/firebase';
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

export const getEntryOnChildAdded = (uid) => {
  return function (dispatch) {
    firebaseDb.ref()
    .child(`entries/${uid}`)
    .limitToLast(1)
    .on('child_added', (snapshot) => {
      const entry = snapshot.val();
      dispatch(receiveEntry(entry))
    });
  }
}

export const getInitialEntries = (uid) => {
  const today = new Date().setHours(0,0,0,0);

  const dates = {
    past: today - 1000 * 60 * 60 * 24 * 14,
    future: today + 1000 * 60 * 60 * 24 * 14,
  }


  return function (dispatch) {
    firebaseDb.ref()
    .child(`entries/${uid}`)
    .orderByChild("date")
    .startAt(dates.past)
    .endAt(dates.future)
    .once('value', (snapshot) => {
      const entries = snapshot.val();
      if(entries) {
        // check length for initial load
        var size = 0, key;
        for (key in entries) {
          if (entries.hasOwnProperty(key)) size++;
        }
        if(size < 10) {
          // try to load more entries in the past
          dispatch(loadMoreEntries(uid, 'past', dates.past));
          dispatch(shouldLoadOneYear());
        }
        dispatch(reveiveEntries(entries, dates))
        // dispatch(shouldLoadMoreEntries(dates))
      } else {
        dispatch(reveiveEntries([], dates))
      }
    });
  }
}

export const loadMoreEntries = (uid, direction, date) => {
  const fifteenDays = 1000*60*60*24 * 14;

  if(direction === 'future') {
    // load more future entries
    return function (dispatch) {
      dispatch(loadingEntriesStart());

      firebaseDb.ref()
      .child(`entries/${uid}`)
      .orderByChild("date")
      .startAt(date + 24 * 60 * 60 * 1000)
      .endAt(date + fifteenDays)
      .once('value', (snapshot) => {
        const entries = snapshot.val();
        // console.log('FUTURE - Getting entries for the period: ', new Date(date + fifteenDays), date + fifteenDays, ' - ', new Date(date + 24 * 60 * 60 * 1000), date + 24 * 60 * 60 * 1000);
        if(entries) {
          dispatch(reveiveEntries(entries, { future: date + fifteenDays})) 
        } else {
          dispatch(reveiveEntries([], { future: date + fifteenDays})) 
        }
      });
    }
  } else {
    // load more entries from the past
    return function (dispatch) {
      dispatch(loadingEntriesStart());
      firebaseDb.ref()
      .child(`entries/${uid}`)
      .orderByChild("date")
      .startAt(date - fifteenDays)
      .endAt(date - 24 * 60 * 60 * 1000)
      .once('value', (snapshot) => {
        const entries = snapshot.val();
        if(entries) {
          dispatch(reveiveEntries(entries, { past: date - fifteenDays})) 
        } else {
          dispatch(reveiveEntries([], { past: date - fifteenDays})) 
        }
      });
    }
  }
}

// load one year in the past to make sure the user does not have entries
export const loadOneYear = (uid, direction, date) => {
  const oneYear = 1000*60*60*24 * 365;
  return function (dispatch) {
    dispatch(loadingEntriesStart());
    dispatch(disableLoadOneYear());
    firebaseDb.ref()
    .child(`entries/${uid}`)
    .orderByChild("date")
    .startAt(date - oneYear)
    .endAt(date - 24 * 60 * 60 * 1000)
    .once('value', (snapshot) => {
      const entries = snapshot.val();
      if(entries) {
        dispatch(reveiveEntries(entries, { past: date - oneYear})) 
      } else {
        dispatch(reveiveEntries([], { past: date - oneYear})) 
      }
    });
  }
}

export const removeAllCollections = () => {
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
        dispatch(removeEntrySuccess(data));
      })
      .catch(function(error) {
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

export const reveiveEntries = (entries, dates) => ({
  type: types.RECEIVE_ENTRIES,
  payload: {
    entries,
    dates,
  },
});

export const shouldLoadOneYear = () => ({
  type: types.SHOULD_LOAD_ONE_YEAR
});

export const disableLoadOneYear = () => ({
  type: types.DISABLE_LOAD_ONE_YEAR
});

export const removeEntrySuccess = (entry) => ({
  type: types.REMOVE_ENTRY_SUCCESS,
  payload: entry,
});

export const loadingEntriesStart = () => ({
  type: types.LOADING_ENTRIES_START,
});

export const registerError = (reason, error) => ({
  type: types.RECEIVE_ENTRIES,
  payload: {
    reason: reason,
    error: error,
  }
});

