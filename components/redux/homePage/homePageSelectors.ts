import { useAppSelector } from '../store';
import { LoadingStateTypes } from '../types';

export const useHomePage = () => {
    const homePageData = useAppSelector((state) => state.homePage.data);
    return homePageData;
};

export const useIsHomePageLoading = () => {
    const homePageData = useHomePage();

    switch (homePageData.type) {
        case LoadingStateTypes.LOADING:
            return true;
        case LoadingStateTypes.NOT_LOADED:
        case LoadingStateTypes.FAILED:
        case LoadingStateTypes.LOADED:
        default:
            return false;
    }
};

export const useHomePageData = () => {
    const homePageData = useHomePage();

    switch (homePageData.type) {
        case LoadingStateTypes.NOT_LOADED:
        case LoadingStateTypes.FAILED:
        case LoadingStateTypes.LOADING:
            return null;
        case LoadingStateTypes.LOADED:
            return homePageData.data;
        default:
            return null;
    }
};
