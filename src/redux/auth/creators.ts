import { browserHistory } from 'react-router';
import * as actions from './actions';
import * as firebase from 'firebase';
import * as uiActions from '../ui/actions';
import { firebaseDb, firebaseAuth, firebaseStorage } from '../../firebase';

// import * as types from './types';

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
  return (dispatch: any) => {
    dispatch(actions.fetchUser(request));
  };
  // // dispatch(fetchUserStart()); STEP 1
  // console.log('fetchUser called');

  // return (dispatch: any, getState: any) => {
  //   fetchUserWatcher().then((res: any) => {
  //     console.log('fetchUserWatcher()')
  //       dispatch({
  //       type: types.FETCH_FIREBASE_USER,
  //       payload: res,
  //     });
  //   }).catch((err: any) => {
  //     // dispatch({})
  //   })
  // }

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

export function uploadAvatar(file: any) {
  return function (dispatch: any) {
    dispatch(actions.uploadAvatarStart());
    const user = firebaseAuth.currentUser;
    if(user) {
      var uploadTask = firebaseStorage.ref().child(`avatars/${user.uid}`).put(file, {});

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot: any) {
          // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
        }, function(error: any) {
          dispatch(actions.uploadAvatarError(error));
      }, function() {
        var downloadURL = uploadTask.snapshot.downloadURL || '';
        updateUserImageUrl(dispatch, {
          photoURL: downloadURL
        });
        dispatch(actions.uploadAvatarSuccess(downloadURL));
      });
    }
  };
}

export function updateUserImageUrl(dispatch: any, data: any) {
  const user = firebaseAuth.currentUser;
  if(user) {
    user.updateProfile(data).then(function() {
      dispatch(actions.upadteUserPhotoURLSuccess());
    }).catch(function(error: any) {
      dispatch(actions.upadteUserPhotoURLError(error));
    });
  }
}

export function updateUserDisplayName(data: any) {
  const user = firebaseAuth.currentUser;
  console.log('update data: ', data);
  return (dispatch: any) => {
    if(user) {
      user.updateProfile(data).then(function() {
        dispatch(actions.updateUserDisplayNameSuccess());
      }).catch(function(error: any) {
        dispatch(actions.updateUserDisplayNameError(error));
      });
    }
  };
}

export function updateUserEmail(email: string) {
  const user = firebaseAuth.currentUser;
  return (dispatch: any) => {
    if(user) {
      user.updateEmail(email).then(function() {
        dispatch(actions.updateUserEmailSuccess());
      }).catch(function(error: any) {
        if(error.code === 'auth/requires-recent-login') {
          dispatch(actions.requestAuth());
        }
        dispatch(actions.updateUserEmailError(error));
      });
    }
  };
}

export function reauthenticateUser(email: string, password: string) {
  const user = firebaseAuth.currentUser;
  return (dispatch: any) => {
    if(user) {
      var credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
      );
      user.reauthenticateWithCredential(credential).then(function() {
        console.log('reauth success');
        dispatch(actions.reAuthSuccess());
        dispatch(uiActions.hideModal('requestAuth'));
      }).catch(function(error: any) {
        // An error happened.
        dispatch(actions.reAuthError(error));
      });
    }
  };
}

export function sendConfirmationEmail() {
  const user = firebaseAuth.currentUser;
  return (dispatch: any) => {
    if(user) {
      user.sendEmailVerification().then(function() {
        // Email sent.
        dispatch(actions.sendConfirmationEmailSuccess());
      }).catch(function(error: any) {
        // An error happened.
        dispatch(actions.sendConfirmationEmailError(error));
      });
    }
  };
}

export function changePassword(newPassword: string) {
  const user = firebaseAuth.currentUser;
  return (dispatch: any) => {
    if(user) {
      user.updatePassword(newPassword).then(function() {
        // Update successful.
        dispatch(actions.changePasswordSuccess());
      }).catch(function(error: any) {
        // An error happened.
        if(error.code === 'auth/requires-recent-login') {
          dispatch(actions.requestAuth());
        }
        dispatch(actions.changePasswordError(error));
      });
    }
  };
}