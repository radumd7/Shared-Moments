import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";
import useSWR from "swr";
import Card from "../components/UI/Card";
import { fetcher } from "../lib/fetcher";
//@ts-ignore
import clientPromise from '../lib/mongodb';

export default function Home({ fallbackData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = useSWR('/api/moments', fetcher, { fallbackData })
  return(
    <React.Fragment>
      <Head>
        <title>Shared Moments</title>
        <meta name="description" content="A simple CRUD application created with NextJS & TailwindCSS + Go backend." />
      </Head>
      <div className="container mx-auto">
        <div className="text-center py-4">
          <h1 className="text-4xl md:text-5xl">Shared Moments</h1>
          <h2 className="text-md sm:text-lg">A place where <span className="font-medium text-blue-500 dark:text-blue-300">everyone is welcome</span><br/>To share beautiful moments.</h2>
        </div>
        <div className="grid gridc-cols-1 md:grid-cols-2 xl:grid-cols-4 content-center gap-4 p-4">
          {
            data?.map((moment: any,i: React.Key) => (
              <React.Fragment key={i}>
                <Card moment={moment}/>
              </React.Fragment>
            ))
          }
        </div>
      </div>
    </React.Fragment>
  );
};

export const getServerSideProps:GetServerSideProps =  async () => {
  //@ts-ignore
  const client = await clientPromise;
  const data = await client.db('example1').collection('moments').find({},{
        projection:{
          _id: 0
        }
      }).sort({
        dateCreated: -1
      }).toArray();
  return {
    props: {
      fallbackData: data
    }
  };
};