// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { /* connectFirestoreEmulator, */ getFirestore } from 'firebase/firestore';
import { /* connectStorageEmulator, */ getStorage } from 'firebase/storage';
import 'firebase/auth';
// import { isDev } from '../isDev';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);
export const baseBucketName = 'sign-in-form-d02de.appspot.com';

/* if (isDev) {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8081);
} */
