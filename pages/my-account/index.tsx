import { useSession } from "next-auth/react";
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import useSWR from 'swr';
import Card from '../../components/UI/Card';
import deleteMoment from '../../lib/deleteMoment';
import { fetcher } from '../../lib/fetcher';

export default function MyAccount() {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if(!session){
            router.push('/auth/signin');
        };
    }, []);
    const { data, error } = useSWR(`/api/user-momets?email=${session!.user!.email}`, fetcher, { refreshInterval: 1 })
    if(!data) return null;
    return(
        <React.Fragment>
            <Head>
                <title>My account | Shared Moments</title>
                <meta name="description" content="You can visualize all the moments created and remove them if desired."/>
            </Head>
            <div className="container mx-auto">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
                    {
                        data.map((moment: any, i: React.Key) => (
                            <React.Fragment key={i}>
                                <div className='relative w-full h-auto'>
                                    <Card moment={moment}/>
                                    <button onClick={() => deleteMoment({_id: moment._id, filename: moment.image.split('/').pop()})} className="absolute top-4 right-4 w-6 aspect-square">
                                        <MdOutlineDeleteOutline/>
                                    </button>
                                </div>
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

MyAccount.auth = true;
