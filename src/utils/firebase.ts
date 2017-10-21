import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from '../config';

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();

const FireBaseTools = {
  resetPasswordEmail: (email: string) => firebaseAuth.sendPasswordResetEmail(email).then(() => ({
        message: 'Email sent',
    }), error => (error)),
};

export default FireBaseTools;
