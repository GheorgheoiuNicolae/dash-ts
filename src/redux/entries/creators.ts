import { firebaseDb } from '../../firebase';
import * as actions from './actions';
import { browserHistory } from 'react-router';

export const getInitialEntries = (uid: string) => {
  const today = new Date().setHours(0,0,0,0);

  const dates = {
    past: today - 1000 * 60 * 60 * 24 * 14,
    future: today + 1000 * 60 * 60 * 24 * 14,
  };

  return function (dispatch: any) {
    dispatch(actions.loadEntriesStart('initial'));
    firebaseDb.ref()
    .child(`entries/${uid}`)
    .orderByChild('date')
    .startAt(dates.past)
    .endAt(dates.future)
    .once('value', (snapshot) => {
      const entries = snapshot.val();
      if(entries) {
        dispatch(actions.loadEntriesSuccess(entries, dates));

        // check length for initial load
        var size = 0;
        for (let key in entries) {
          if (entries.hasOwnProperty(key)) {
            size++;
          }
        }
        if(size < 10) {
          dispatch(loadMoreEntries(uid, 'past', dates.past));
        }
      } else {
        dispatch(actions.loadEntriesSuccess([], dates));
      }
    });
  };
};

export const loadMoreEntries = (uid: string, direction: any, date: any) => {
  const fifteenDays = 1000*60*60*24 * 14;
  
  if(direction === 'future') {
    // load more future entries
    return function (dispatch: any) {
      dispatch(actions.loadEntriesStart('future'));

      firebaseDb.ref()
      .child(`entries/${uid}`)
      .orderByChild('date')
      .startAt(date + 24 * 60 * 60 * 1000)
      .endAt(date + fifteenDays)
      .once('value', (snapshot) => {
        const entries = snapshot.val();
        // console.log('FUTURE - Getting entries for the period: ', 
        // new Date(date + fifteenDays), date + fifteenDays, ' - ', 
        // new Date(date + 24 * 60 * 60 * 1000), date + 24 * 60 * 60 * 1000);
        if(entries) {
          dispatch(actions.loadEntriesSuccess(entries, { future: date + fifteenDays}));
        } else {
          dispatch(actions.loadEntriesSuccess([], { future: date + fifteenDays}));
        }
      });
    };
  } else {
    // load more entries from the past
    return function (dispatch: any) {
      dispatch(actions.loadEntriesStart('past'));
      firebaseDb.ref()
      .child(`entries/${uid}`)
      .orderByChild('date')
      .startAt(date - fifteenDays)
      .endAt(date - 24 * 60 * 60 * 1000)
      .once('value', (snapshot) => {
        const entries = snapshot.val();
        if(entries) {
          dispatch(actions.loadEntriesSuccess(entries, { past: date - fifteenDays}));
        } else {
          dispatch(actions.loadEntriesSuccess([], { past: date - fifteenDays}));
        }
      });
    };
  }
};

// load one year in the past to make sure the user does not have entries
export const loadOneYear = (uid: string, direction: any, date: any) => {
  const oneYear = 1000*60*60*24 * 365;
  console.log('+++ date : ', date);
  return function (dispatch: any) {
    dispatch(actions.loadEntriesStart('past'));
    dispatch(actions.disableLoadOneYear());
    firebaseDb.ref()
    .child(`entries/${uid}`)
    .orderByChild('date')
    .startAt(date - oneYear)
    .endAt(date - 
      24 * 60 * 60 * 1000)
    .once('value', (snapshot) => {
      const entries = snapshot.val();
      if(entries) {
        dispatch(actions.loadEntriesSuccess(entries, { past: date - oneYear}));
      } else {
        dispatch(actions.loadEntriesSuccess([], { past: date - oneYear}));
      }
    });
  };
};

export const getEntryOnChildAdded = (uid: string) => {
  return function (dispatch: any) {
    firebaseDb.ref()
    .child(`entries/${uid}`)
    .limitToLast(1)
    .on('child_added', (snapshot: any) => {
      const entry = snapshot.val();
      dispatch(actions.receiveEntry(entry));
    });
  };
};

export const removeAllCollections = () => {
  firebaseDb.ref().remove();
};

export const createEntry = (data: any, uid: string) => {
  return function (dispatch: any) {
    let entriesRef: any = firebaseDb
      .ref()
      .child(`entries/${uid}`)
      .push();

    const pushkey = entriesRef.getKey();
    
    data.id = pushkey;
    entriesRef.set(data);
  };
};

export const editEntry = (data: any, uid: string) => {
  return function (dispatch: any) {
    let entriesRef = firebaseDb
      .ref()
      .child(`entries/${uid}/${data.id}`)
      .update(data);
      console.log(entriesRef);
    dispatch(actions.saveEntryEdits(data));
  };
};

export const removeEntry = (data: any, uid: any) => {
  return function (dispatch: any) {
    firebaseDb
      .ref()
      .child(`entries/${uid}/${data.id}`)
      .remove()
      .then(function() {
        dispatch(actions.removeEntrySuccess(data));
        browserHistory.push('/entries');
      })
      .catch(function(error: any) {
        dispatch(actions.registerError('Could not remove entry', error));
      });
  };
};