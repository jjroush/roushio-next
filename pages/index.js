import Head from 'next/head';
import {NextSeo} from 'next-seo';

import {AboutFlex} from '../components/home/about-flex';

export default function Home() {
    return (
        <>
            <NextSeo
                description="Fullstack Developer. Slinging Javascript in the land of corn (Iowa)."
                title="Jacob Roush - Fullstack Developer"
            />
            <Head>
                <link href="/favicon.ico" rel="icon"/>
            </Head>
            <h1 style={{fontSize: '4em'}}>{"Hey, I'm Jacob"}</h1>
            <h2>
                {
                    "I'm a fullstack software engineer who is slinging Javascript in the land of corn."
                }
            </h2>
            <AboutFlex/>
        </>
    );
}
