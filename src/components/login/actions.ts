import { firebaseAuth } from '../../config/constants';
import { browserHistory } from 'react-router';

export function login(user:any, pass: any){
  firebaseAuth().signInWithEmailAndPassword(user, pass).then(function(res){
    browserHistory.push('/dashboard')
    return (dispatch: any) => {
      return {
        type: "LOGIN",
        payload: res
      }
    }
  });
}



// export function logout(data){
//   return dispatch => {
//     firebaseAuth().signOut().then((res) => {
//       browserHistory.push('/login')
//       console.log('logout res: ', res);
//       dispatch({
//         type: "LOGOUT",
//         payload: res
//       });
//     });
//   };
// }

// runs on firebaseAuth.onAuthStateChange
export function checkAuthState(data:any){
  console.log('checkAuthState: ', data, firebaseAuth().currentUser)
  if (data) {
    browserHistory.push('/dashboard')
  } else {
    browserHistory.push('/login')
  }
  return {
    type: 'UPDATE_AUTH_STATE',
    payload: data
  }
}
