import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { AboutFlex } from '../components/home/about-flex';

export default function Home() {
  return (
    <>
      <Head>
        <title>roush.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{'Jacob Roush'}</h1>
      <h2>
        {
          "I'm a software engineer who is improving the online retail experience @ Hy-Vee."
        }
      </h2>
      <span>
        <h3>{'👀'}</h3>
      </span>
      <AboutFlex />
    </>
  );
}
