import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updatePassword } from 'firebase/auth';
import { firebaseAuth } from '@/components/firebase/firebaseAuth';
import { getFriendlyMessageFromFirebaseErrorCode } from './helpers';
import { showToast } from '../toast/toastSlice';
import isEmail from 'validator/lib/isEmail';
import { useAppSelector } from '../store';
import { LoadingStateTypes } from '../types';
import { AuthContextType } from '@/components/useAuth';

// Define constants for action types
const ACTION_TYPE = {
    LOGIN: 'login',
    SIGN_UP: 'sign-up',
    LINK: 'link'
};

export const loginWithEmail = createAsyncThunk(
    'loginEmail',
 async (args: { type: typeof ACTION_TYPE[keyof typeof ACTION_TYPE]; auth: AuthContextType | null; email: string; password: string;
    callback: (
        args:
            | { type: 'success'; }
            | {
                  type: 'error';
                  message: string;
              }
    ) => void,
}, { dispatch }) => {
        try {
            if (!isEmail(args.email)) {
                dispatch(
                    showToast({
                        message: 'Enter a valid email',
                        type: 'info',
                    })
                );
                return;
            }
            if (args.password.length < 6) {
                dispatch(
                    showToast({
                        message: 'Password should be atleast 6 characters',
                        type: 'info',
                    })
                );
                return;
            }

             // Handle login action
            if (args.type === ACTION_TYPE.SIGN_UP) {
                await createUserWithEmailAndPassword(firebaseAuth, args.email, args.password);
                args.callback && args.callback({ type: 'success' });
            }
              // Handle link action
            if (args.type === ACTION_TYPE.LINK && args.auth?.type === LoadingStateTypes.LOADED && args.auth?.user){

                    await updatePassword(args.auth.user, args.password);
                    await updateEmail(args.auth.user, args.email);

                    dispatch(
                        showToast({
                            message: 'Email и пароль успешно связаны',
                            type: 'success',
                        })
                    );
                    args.callback && args.callback({ type: 'success' });
            }

            if (args.type === ACTION_TYPE.LOGIN) {
                await signInWithEmailAndPassword(firebaseAuth, args.email, args.password);
            }
        } catch (e: any) {
            dispatch(
                showToast({
                    message: getFriendlyMessageFromFirebaseErrorCode(e.code),
                    type: 'error',
                })
            );
            args.callback && args.callback({
                type: 'error',
                message: getFriendlyMessageFromFirebaseErrorCode(e.code),
            });
        }
    }
);

export const useIsLoginWithEmailLoading = () => {
    const loading = useAppSelector((state) => state.loading.loginWithEmail);
    return loading;
};
