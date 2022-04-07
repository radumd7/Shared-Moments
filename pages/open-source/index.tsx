import Head from 'next/head';
import React from 'react';
import { technologies } from '../../lib/open-source/technologies';

export default function OpenSource() {
    return(
        <React.Fragment>
            <Head>
                <title>Open source | Shared Moments</title>
                <meta name="description" content="Shared moments is an open source project. On this page you'll find the source code and technologies used."/>
            </Head>
            <div className="container mx-auto text-center p-4">
                <div className="flex flex-col gap-4 items-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-blue-500 dark:text-blue-300">Shared Moments</h1>
                    <h2 className="text-2xl md:text-3xl">This is a full stack<br/>Open source project.</h2>
                    <p className='max-w-md text-center text-sm'>The codebase is not enterprise-level, but it should teach you the basics if you are starting with NextJS or if you are trying to get familiar with some of the technologies used.</p>
                    <h3 className='text-blue-500 dark:text-blue-300 font-semibold tracking-wide text-2xl'>Techologies used:</h3>
                    <div className="flex flex-col gap-2">
                        {
                            technologies.map((tech,i) => (
                                <React.Fragment key={i}>
                                    <p>{tech.use+' '}
                                        <span className='font-semibold text-blue-500 dark:text-blue-300'>
                                            <a
                                                href={tech.url}
                                                target="_blank"
                                                rel='noreferrer'
                                            >
                                                {tech.name}
                                            </a>
                                        </span>
                                    </p>
                                </React.Fragment>
                            ))
                        }
                    </div>
                    <h4 className='text-xl'>You can find the full code <span className='text-blue-500 dark:text-blue-300 font-semibold'><a href="https://github.com/radumd7/Shared-Moments" target="_blank" rel="noreferrer">here</a></span>.</h4>
                </div>
            </div>
        </React.Fragment>
    );
};