import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from 'next/image';
import React from "react";
import Head from "next/head";

export default function SignIn() {
    const { data: session } = useSession();
    const router = useRouter()
    useEffect(() => {
        if(session){
            router.push('/my-account');
        }
    },[session])
    return(
        <React.Fragment>
            <Head>
                <title>Sign in | Shared Moments</title>
                <meta name="description" content="Sign in to shared moments."/>
            </Head>
            <div className="container mx-auto flex flex-col items-center justify-center h-[calc(100vh-theme(spacing.16))]">
                <h1 className="text-3xl md:text-5xl text-center">Login to <span className="text-blue-500 dark:text-blue-300">Shared Moments</span></h1>
                <button
                    onClick={()=>signIn('google')}
                    className="w-full rounded-full border border-gray-200 dark:border-neutral-600 py-1 bg-gray-50 dark:bg-neutral-800 max-w-xs shadow-md my-2"
                >
                    <div className="flex flex-row items-center justify-start pl-3">
                        <Image src="/google_btn.svg" alt="Google logo" width={16} height={16} objectFit="cover" className="rounded-full"/>
                        <p className="ml-2 pl-2 w-full text-center border-l border-gray-200 dark:border-neutral-600">Continue with Google </p>
                    </div>
                </button>
            </div>
        </React.Fragment>
    );
};