import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { AboutFlex } from '../components/home/about-flex';

export default function Home() {
  return (
    <>
      <Head>
        <title>roush.io</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <h1>{"Hey, I'm Jacob"}</h1>
      <h2>
        {
          "I'm a software engineer who is improving the online retail experience @ "
        }
        <a href={'https://hy-vee.com/aisles-online'}>{'Hy-Vee'}</a>
      </h2>
      <AboutFlex />
    </>
  );
}
