import { /* connectAuthEmulator, */ getAuth } from 'firebase/auth';
// import { isDev } from '../isDev';
import { firebaseApp } from './firebase';

export const firebaseAuth = getAuth(firebaseApp);

/* if (isDev) {
    connectAuthEmulator(firebaseAuth, 'http://127.0.0.1:9099', {
        disableWarnings: true,
    });
} */
