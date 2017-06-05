import { ref, firebaseAuth } from '../config/constants'

export function auth (email:any, pw:any) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => console.log('Oops', error))
}

export const logout = function  () {
  console.log('logout called');
  return firebaseAuth().signOut()
}

export function login (email:any, pw:any) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function saveUser (user:any) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}
