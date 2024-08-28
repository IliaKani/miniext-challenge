// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { /* connectFirestoreEmulator, */ getFirestore } from 'firebase/firestore';
import { /* connectStorageEmulator, */ getStorage } from 'firebase/storage';
// import { isDev } from '../isDev';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBJ3xNSSXKHUzQsPlYPLvykTW6CbT7C5os',
    authDomain: 'sign-in-form-d02de.firebaseapp.com',
    projectId: 'sign-in-form-d02de',
    storageBucket: 'sign-in-form-d02de.appspot.com',
    messagingSenderId: '351105099129',
    appId: '1:351105099129:web:ff7b1402989a27a76cbba8',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);
export const baseBucketName = 'sign-in-form-d02de.appspot.com';

/* if (isDev) {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8081);
} */
