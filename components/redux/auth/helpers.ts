import { debugErrorMap } from 'firebase/auth';

export const getFriendlyMessageFromFirebaseErrorCode = (errorCode: string | null) => {
    const messageFromFirebase: string | null =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        errorCode ? debugErrorMap()[errorCode.replace('auth/', '')] : null;
    return (
        messageFromFirebase ??
        'Something happened while we were processing your request, please try again.'
    );
};
