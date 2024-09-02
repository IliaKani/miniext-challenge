import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { firebaseAuth } from '@/components/firebase/firebaseAuth';
import { getFriendlyMessageFromFirebaseErrorCode } from './helpers';
import { showToast } from '../toast/toastSlice';
import isPhoneNumber from 'validator/lib/isMobilePhone';
import { useAppSelector } from '../store';

// Define constants for action types
const ACTION_TYPE = {
    LOGIN: 'login',
    SIGN_UP: 'sign-up'
};

// Create an async thunk for logging in with phone number
export const loginWithPhoneNumber = createAsyncThunk(
    'loginPhone',
    async (args: { type: typeof ACTION_TYPE[keyof typeof ACTION_TYPE];
        phoneNumber: string,
        recaptcha: RecaptchaVerifier | null,
        callback: (
            args:
                | { type: 'success'; verificationId: string }
                | {
                      type: 'error';
                      message: string;
                  }
        ) => void,
    }, { dispatch }) => {
        try {
            // Validate phone number
            if (!isPhoneNumber(args.phoneNumber)) {
                dispatch(
                    showToast({
                        message: 'Enter a valid phone number',
                        type: 'info',
                    })
                );
                return;
            }
            // Validate recaptcha
            if (args.recaptcha === null)
            {
                dispatch(
                    showToast({
                        message: 'Captcha is invalid',
                        type: 'info',
                    })
                );
                return;
            }
            // Sign in with phone number
            const confirmationCode = await signInWithPhoneNumber(firebaseAuth, args.phoneNumber, args.recaptcha);
            // Callback on success
            if (args.callback)
                args.callback({
                    type: 'success',
                    verificationId: confirmationCode.verificationId,
                });

        } catch (e: any) {
            // Handle errors
            dispatch(
                showToast({
                    message: getFriendlyMessageFromFirebaseErrorCode(e.code),
                    type: 'error',
                })
            );
            // Callback on error
            if (args.callback)
                args.callback({
                    type: 'error',
                    message: getFriendlyMessageFromFirebaseErrorCode(e.code),
                });
        }
    }
);

// Hook to get the loading state of the loginWithPhoneNumber action
export const useIsLoginWithPhoneNumberLoading = () => {
    const loading = useAppSelector((state) => state.loading.loginWithPhoneNumber);
    return loading;
};
