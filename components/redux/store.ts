import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { githubReducer } from './github/githubSlice';
import toastReducer from './toast/toastSlice';
import { homePageReducer } from './homePage/homePageSlice';
import { loadingReducer } from './loading/loadingSlice';

export const store = configureStore({
    reducer: {
        github: githubReducer,
        toast: toastReducer,
        homePage: homePageReducer,
        loading: loadingReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
