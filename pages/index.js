import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { AboutFlex } from '../components/home/about-flex';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';

const BigH1 = styled.h1`
  font-size: 4em;
`;

export default function Home() {
  return (
    <>
      <NextSeo
        title="Jacob Roush - Fullstack Developer"
        description="Fullstack Developer. Slinging Javascript in the land of corn (Iowa)."
      />
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <BigH1>{"Hey, I'm Jacob"}</BigH1>
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
