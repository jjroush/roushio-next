import Head from 'next/head';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';

import { AboutFlex } from '../components/home/about-flex';

const BigH1 = styled.h1`
  font-size: 4em;
`;

// export default function Home() {
//     return (
//         <>
//             <NextSeo
//                 description="Fullstack Developer. Slinging Javascript in the land of corn (Iowa)."
//                 title="Jacob Roush - Fullstack Developer"
//             />
//             <Head>
//                 <link href="/favicon.ico" rel="icon" />
//             </Head>
//             <BigH1>{"Hey, I'm Jacob"}</BigH1>
//             <h2>
//                 {
//                     "I'm a fullstack software engineer who is slinging Javascript in the land of corn."
//                 }
//             </h2>
//             <AboutFlex />
//         </>
//     );
// }