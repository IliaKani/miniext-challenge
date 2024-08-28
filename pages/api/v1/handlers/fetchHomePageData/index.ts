import { v1APIHandler } from '../../types/handlers';
import { FetchHomePageDataInput, FetchHomePageDataOutput } from './types';

export const fetchHomePageData: v1APIHandler<
    FetchHomePageDataInput,
    FetchHomePageDataOutput
> = async () => {
    return {
        success: true,
        data: {},
    };
};

export const handler = fetchHomePageData;
