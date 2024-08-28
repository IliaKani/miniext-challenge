import { FirestoreUserKey } from '..';

export interface FirestoreUser {
    // Timestamp of when the user was created
    createdOn: number;

    // Bio of the user. Null if user has no bio.
    bio: string | null;

    // The UID of the user. This is the same as the key in /firestore.rules
    [FirestoreUserKey]: string;
}
