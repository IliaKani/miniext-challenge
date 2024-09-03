import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    PhoneAuthProvider,
    RecaptchaVerifier,
    linkWithPhoneNumber,
    signInWithCredential,
    updatePhoneNumber,
} from 'firebase/auth';
import { getFriendlyMessageFromFirebaseErrorCode } from './helpers';
import { showToast } from '../toast/toastSlice';
import { LoadingStateTypes } from '../types';
import { AuthContextType } from '@/components/useAuth';
import { firebaseAuth } from '@/components/firebase/firebaseAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const sendVerificationCode = createAsyncThunk(
    'sendVerificationCode',
    async (
        args: {
            phoneNumber: string;
            auth: AuthContextType;
            recaptchaResolved: boolean;
            recaptcha: RecaptchaVerifier | null;
            callback: (
                args:
                    | { type: 'success'; verificationId: string }
                    | {
                          type: 'error';
                          message: string;
                      }
            ) => void;
        },
        { dispatch }
    ) => {
        if (args.auth.type !== LoadingStateTypes.LOADED) return;
        if (!args.recaptchaResolved || !args.recaptcha) {
            dispatch(showToast({ message: 'First Resolved the Captcha', type: 'info' }));
            return;
        }
        if (args.phoneNumber.slice() === '' || args.phoneNumber.length < 10) {
            dispatch(
                showToast({
                    message: 'Enter the Phone Number and provide the country code',
                    type: 'info',
                })
            );
            return;
        }

        try {
            const sentConfirmationCode = await linkWithPhoneNumber(
                args.auth.user,
                args.phoneNumber,
                args.recaptcha
            );
            dispatch(
                showToast({
                    message: 'Verification Code has been sent to your Phone',
                    type: 'success',
                })
            );

            if (args.callback)
                args.callback({
                    type: 'success',
                    verificationId: sentConfirmationCode.verificationId,
                });
        } catch (error: any) {
            dispatch(
                showToast({
                    message: getFriendlyMessageFromFirebaseErrorCode(error.code),
                    type: 'error',
                })
            );
            if (args.callback)
                args.callback({
                    type: 'error',
                    message: getFriendlyMessageFromFirebaseErrorCode(error.code),
                });
        }
    }
);

export const useSendVerificationCodeLoading = () => {
    const loading = useSelector((state: RootState) => state.loading.sendVerificationCode);
    return loading;
};

export const verifyPhoneNumber = createAsyncThunk(
    'verifyPhoneNumber',
    async (
        args: {
            type: 'login' | 'sign-up';
            OTPCode: string;
            auth: AuthContextType | null;
            verificationId: string;
            callback: (
                args:
                    | { type: 'success' }
                    | {
                          type: 'error';
                          message: string;
                      }
            ) => void;
        },
        { dispatch }
    ) => {
        if (
            args.OTPCode === null ||
            !args.verificationId ||
            (args.type === 'login' && args.auth?.type !== LoadingStateTypes.LOADED)
        )
            return;

        try {
            const credential = PhoneAuthProvider.credential(args.verificationId, args.OTPCode);
            if (args.type === 'login' && args.auth?.type === LoadingStateTypes.LOADED) {
                await updatePhoneNumber(args.auth.user, credential);

                dispatch(
                    showToast({
                        message: 'Logged in Successfully',
                        type: 'success',
                    })
                );
            } else {
                // Signing up with the phone number
                await signInWithCredential(firebaseAuth, credential);
                dispatch(
                    showToast({
                        message: 'Sign-up Successfully',
                        type: 'success',
                    })
                );
            }

            firebaseAuth.currentUser?.reload();

            args.callback({ type: 'success' });
        } catch (error: any) {
            dispatch(
                showToast({
                    message: getFriendlyMessageFromFirebaseErrorCode(error.code),
                    type: 'error',
                })
            );
            if (args.callback)
                args.callback({
                    type: 'error',
                    message: getFriendlyMessageFromFirebaseErrorCode(error.code),
                });
        }
    }
);

export const useVerifyPhoneNumberLoading = () => {
    const loading = useSelector((state: RootState) => state.loading.verifyPhoneNumber);
    return loading;
};
