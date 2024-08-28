import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { store } from '../components/redux/store';
import { Layout } from '@/components';
import { Provider } from 'react-redux';
import '@/styles/global.css';

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

    return getLayout(
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
