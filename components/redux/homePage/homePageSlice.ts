import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoadingState, LoadingStateTypes } from '../types';

export interface HomePageData {
    success: boolean;
}

export interface HomePageState {
    data: LoadingState;
}

const initialState: HomePageState = {
    data: { type: LoadingStateTypes.NOT_LOADED },
};

export const homePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        setIsLoading: (state) => {
            state.data = {
                type: LoadingStateTypes.LOADING,
            };
        },
        setIsFailed: (state, action: PayloadAction<{ errorMessage: string }>) => {
            state.data = {
                type: LoadingStateTypes.FAILED,
                errorMessage: action.payload.errorMessage,
            };
        },
        setLogin: (state, action: PayloadAction<{ data: HomePageState }>) => {
            state.data = {
                type: LoadingStateTypes.LOADED,
                data: action.payload.data,
            };
        },
        setLogout: (state) => {
            state.data = {
                type: LoadingStateTypes.NOT_LOADED,
            };
        },
    },
});

export const homePageActions = homePageSlice.actions;

export const homePageReducer = homePageSlice.reducer;
