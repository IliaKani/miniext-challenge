import { createSlice } from '@reduxjs/toolkit';

export interface ToastState {
    message: string;
    toast: boolean;
    type: string;
}

const initialState: ToastState = {
    message: '',
    toast: false,
    type: 'success',
};

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (
            state,
            action: {
                payload: {
                    message: string;
                    type: string;
                };
            }
        ) => {
            state.toast = true;
            state.message = action.payload?.message;
            state.type = action.payload?.type;
        },

        hideToast: (state) => {
            state.toast = false;
            state.message = '';
        },
    },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
