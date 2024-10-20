import { AppProps } from "next/app";
import { wrapper } from '@/store/store';
import '@/styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);