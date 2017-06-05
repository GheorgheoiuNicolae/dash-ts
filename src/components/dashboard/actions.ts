import { firebaseAuth } from '../../config/constants';
import { browserHistory } from 'react-router';

export function logout(){
  firebaseAuth().signOut().then((res) => {
    browserHistory.push('/login')
    console.log('logout res: ', res);
    return firebaseAuth().signOut().then((res) => {
      return {
        type: "LOGOUT",
        payload: res
      };
    });
  });
}