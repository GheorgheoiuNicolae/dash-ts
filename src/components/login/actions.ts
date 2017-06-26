// import { firebaseAuth } from '../../config/constants';
// import { browserHistory } from 'react-router';

// export const login = (user: string, pass: string) => {
//   return {
//     type: 'LOGIN_START',
//     payload: {user, pass}
//   };
//   // return {
//   //   type: 'LOGIN_START',
//   //   payload: loginFunc(user, pass).then((r: any) => {
//   //     console.log('r', r);
//   //     return {
//   //       type: 'LOGIN_COMPLETE',
//   //       payload: r
//   //     };
//   //   })
//   // };
// };

// export function login(user: string, pass: string) {
//   firebaseAuth().signInWithEmailAndPassword(user, pass).then((res: any) => {
//     console.log('res', res);
//     (dispatch) => ({
//       type: 'LOGIN',
//       payload: res,
//     });
//   });
// }

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
// export function checkAuthState(data:any){
//   console.log('checkAuthState: ', data, firebaseAuth().currentUser);
//   if (data) {
//     browserHistory.push('/dashboard');
//   } else {
//     browserHistory.push('/login');
//   }
//   return {
//     type: 'UPDATE_AUTH_STATE',
//     payload: data
//   };
// }
