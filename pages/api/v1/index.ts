import type { NextApiRequest, NextApiResponse } from 'next';
import { v1APIRoute } from './types/routes';
import { assertUnreachable } from '@/helpers/assertUnreachable';
import NextCors from 'nextjs-cors';

const getHandlerForRoute = async (route: v1APIRoute) => {
    switch (route) {
        case v1APIRoute.fetchHomePageData:
            return await import('./handlers/fetchHomePageData');

        default:
            assertUnreachable(route);
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Flush cache for a new request.
        // nodeCache.flushAll();
        // Run the cors middleware
        await NextCors(req, res, {
            origin: '*',
            optionsSuccessStatus: 200,
        });

        if (req.method === 'POST') {
            const output = await executeRequest('POST', req);

            res.status(200).json(output);
        } else if (req.method === 'OPTIONS') {
            res.status(200).end();
        } else {
            throw new Error('Not implemented yet: ' + req.method);
        }
    } catch (e: any) {
        console.log(e);
        console.trace();
        res.status(200).json({ error: true, message: e.message });
    }
};

export default handler;

const executeRequest = async (method: 'GET' | 'POST', req: NextApiRequest) => {
    const { route } = req.query;

    const typedRoute = route as v1APIRoute;

    const executeApiRequestQueryParams = req.query.executeApiRequestQueryParams ?? '{}';

    if (Array.isArray(executeApiRequestQueryParams)) {
        throw new Error('executeApiRequestQueryParams should not be an array');
    }

    const input =
        method === 'POST' && req.body != null && req.body.length !== 0
            ? JSON.parse(req.body)
            : JSON.parse(executeApiRequestQueryParams);

    /*
    // NOTE(abdul): using body to pass in sessionCookie because
    // I could not get cookies to work with the marketplace app.
    const sessionCookieFromBodyForMarketplace = input[
        firebaseSessionCookieLocalStorageKey
    ] as string | null;

    const allValuesInMiniExtStorage =
        (input[
            storageKeyForMiniExtStorage
        ] as AllValuesInMiniExtStorage | null) ?? {};

    const sessionCookie: string | null =
        sessionCookieFromBodyForMarketplace ??
        allValuesInMiniExtStorage[firebaseSessionCookieLocalStorageKey];

    const verifiedToken = sessionCookie
        ? await verifyFirebaseSessionCookie(sessionCookie)
        : null;

    const { origin: urlOrigin } = absoluteUrl(req);
    nodeCache.set('urlOrigin', urlOrigin); */

    const { handler } = await getHandlerForRoute(typedRoute);

    return await handler(input);
};
