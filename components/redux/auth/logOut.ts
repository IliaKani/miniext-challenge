import { createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '@/components/firebase/firebaseAuth';
import { getFriendlyMessageFromFirebaseErrorCode } from './helpers';
import { showToast } from '../toast/toastSlice';

export const logout = createAsyncThunk('logout', async (_, { dispatch }) => {
    try {
        await signOut(firebaseAuth);
    } catch (e: any) {
        dispatch(
            showToast({
                message: getFriendlyMessageFromFirebaseErrorCode(e.code),
                type: 'error',
            })
        );
    }
});
