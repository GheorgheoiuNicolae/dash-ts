import { browserHistory } from 'react-router';
import * as actions from './actions';
import { firebaseDb, firebaseAuth } from '../../firebase';

export function resetPasswordByEmail(email: string) {
  return function (dispatch: any) {
    dispatch(actions.resetPasswordByEmailStart());
    firebaseAuth.sendPasswordResetEmail(email)
    .then((res) => dispatch(actions.resetPasswordByEmailSuccess(res)) )
    .catch((e) => (dispatch(actions.resetPasswordByEmailError(e))) );
  };
}

export function login(user: any) {
  return function (dispatch: any) {
    dispatch(actions.loginStart());
    firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
    .then((res) => { 
      dispatch(actions.loginSuccess(res));
      browserHistory.push('/entries');
    })
    .catch((error) => dispatch(actions.loginError(error)));
  };
}

export function register(userDetails: { email: string, password: string}) {
  return (dispatch: any) => {
    dispatch(actions.registerStart());
    firebaseAuth.createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .then((user: any) => {
        firebaseDb.ref().child(`users/${user.uid}/info`)
        .set({
          email: user.email,
          uid: user.uid
        }).then((res) => {
          browserHistory.push('/entries');
          dispatch(actions.registerSuccess(res));
        });
      })
      .catch((error: any) => dispatch(actions.registerError(error)));
  };
}

export function fetchUser() {
  const request = fetchUserWatcher();
  console.log('does this run?');
  return (dispatch: any) => {
    dispatch(actions.fetchUser(request));
  };
}
export const fetchUserWatcher = () => {
  return new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged((user: any) => {
      unsub();
      resolve(user);
    }, (error) => {
      reject(error);
    });
  });
};

export const logoutUser = () => {
  return (dispatch: any) => {
    firebaseAuth.signOut().then(() => dispatch(actions.logout()) );
  };
};
