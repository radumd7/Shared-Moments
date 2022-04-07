import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return(
        <Html lang="en">
            <Head></Head>
            <body className="bg-white text-slate-800 dark:bg-neutral-900 dark:text-white">
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
};