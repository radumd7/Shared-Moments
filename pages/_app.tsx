import '../styles/globals.css';
import { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import Protected from '../lib/Protected';

function MyApp({ Component, pageProps: { session, ...pageProps } }:AppProps) {
    return(
        <SessionProvider session={session}>
            <ThemeProvider attribute="class">
                <Layout>
                    {
                        //@ts-ignore
                        Component.auth ? (
                            <Protected>
                                <Component {...pageProps}/>
                            </Protected>
                        ) 
                        :
                        (
                            <Component {...pageProps}/>
                        )
                    }
                    {/* <Component {...pageProps}/> */}
                </Layout>
            </ThemeProvider>
        </SessionProvider>
    );
};
export default MyApp;