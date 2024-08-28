import { createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../toast/toastSlice';
import { executeApiRequest } from '@/pages/api/executeApiRequest';
import { v1APIRoute } from '@/pages/api/v1/types/routes';
import { homePageActions } from './homePageSlice';

export const fetchHomePageData = createAsyncThunk('fetchHomePageData', async (_, { dispatch }) => {
    dispatch(homePageActions.setIsLoading());
    try {
        const response = await executeApiRequest({
            route: v1APIRoute.fetchHomePageData,
            body: {},
        });
        // const data = await response;
        console.log(response);
    } catch (e: any) {
        console.log('error', e);
        dispatch(
            showToast({
                message: 'Error fetching data',
                type: 'error',
            })
        );
    }
});
