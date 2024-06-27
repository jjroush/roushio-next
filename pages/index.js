import Head from 'next/head';
import { NextSeo } from 'next-seo';

import { AboutFlex } from '../components/home/about-flex';
import {useEffect, useState} from "react";

export default function Home() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

  return (
    <>
      <NextSeo
        description="Fullstack Developer. Slinging Javascript in the land of corn (Iowa)."
        title="Jacob Roush - Fullstack Developer"
      />
      <Head>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <h1 style={{fontSize: '4em'}}>{"Hey, I'm Jacob"}</h1>
      <h2>
        {
          "I'm a fullstack software engineer who is slinging Javascript in the land of corn."
        }
      </h2>
        <div id="gradient"
             style={{
                 transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
             }}
        ></div>
      <AboutFlex />
    </>
  );
}
