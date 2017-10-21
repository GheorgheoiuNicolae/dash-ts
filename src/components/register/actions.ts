import { firebaseDb, firebaseAuth } from '../../utils/firebase';
import { browserHistory } from 'react-router';

export function registerUser (userDetails: any) {
  // console.log('register: ', email, pw);
  return (dispatch: any) => {
    firebaseAuth.createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .then((user: any) => {
        // Save the user to a users collection
        firebaseDb.ref().child(`users/${user.uid}/info`)
        .set({
          email: user.email,
          uid: user.uid
        }).then(() => {
          // user was successfully saved into the collection
          browserHistory.push('/entries');
          dispatch({
            type: 'LOGIN',
            payload: user
          });
        });  
      })
      .catch((error: any) => console.log('Failed to register user.', error));
  };
}
