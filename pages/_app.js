import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';

import '../styles/globals.css';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';

const Gutter = styled.div`
  margin: 0 auto;
  padding-left: 8px;
  padding-right: 8px;
  max-width: 1000px;
`;

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_ID, {
      includedDomains: ['roush.io'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return (
    <>
      <Header />
      <Gutter>
        <div className={styles.container}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </Gutter>
    </>
  );
}

export default MyApp;
