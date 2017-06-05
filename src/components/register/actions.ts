import { firebaseAuth, DBRef } from '../../config/constants';
import { browserHistory } from 'react-router';

export function register (email: string, pw: string) {
  console.log('register: ', email, pw)
  return (dispatch: any) => {
    firebaseAuth().createUserWithEmailAndPassword(email, pw)
      .then((user) => {
        console.log('user: ', user);
        // Save the user to a users collection
        DBRef.child(`users/${user.uid}/info`)
        .set({
          email: user.email,
          uid: user.uid
        }).then(() => {
          // user was successfully saved into the collection
          browserHistory.push('/dashboard')
          dispatch({
            type: 'LOGIN',
            payload: user
          })
        });  
      })
      .catch((error) => console.log('Failed to register user.', error))
  }
}
