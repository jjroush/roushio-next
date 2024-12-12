import Head from 'next/head';
import { NextSeo } from 'next-seo';

import styles from '../styles/Home.module.css';
import { AboutFlex } from '../components/home/about-flex';

export default function Home() {
  return (
    <>
      <NextSeo
        description="Fullstack Developer. Slinging Javascript in the land of corn (Iowa)."
        title="Jacob Roush - Fullstack Developer"
      />
      <Head>
        <link href="/favicon.ico" rel="icon" />
      </Head>
        <div>

        </div>
      <h1 style={{fontSize: '2em'}}>{"Jacob Roush"}</h1>
        <div className={styles.dot}></div>
      <AboutFlex />
    </>
  );
}
