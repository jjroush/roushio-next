import '../styles/globals.css'
import Header from '../components/header'
import Footer from '../components/footer'
import styles from '../styles/Home.module.css'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
        <div className={styles.container}>
            <Component {...pageProps} />
        </div>
      <Footer />
    </>
  )
}

export default MyApp
