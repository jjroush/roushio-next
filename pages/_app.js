import '../styles/globals.css';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';

const Gutter = styled.div`
  margin: 0 auto;
  padding-left: 8px;
  padding-right: 8px;
  max-width: 1200px;
`;

function MyApp({ Component, pageProps }) {
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
