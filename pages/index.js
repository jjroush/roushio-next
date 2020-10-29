import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{'Jacob Roush'}</h1>
      <h2>{'I\'m a software engineer who is improving the online retail experience @ Hy-Vee.'}</h2>
      <span><h3>{'When I\'m not slinging code at work or for fun; I like to brew beer'}</h3></span>

        <div>
          <div>
            <h1>{'Timeline'}</h1>
          </div>
          <div>
            <h1>{'Projects'}</h1>
          </div>
          <div>
            <h1>{'Contact'}</h1>
            <p>{'I\'d love to chat. Seriously. Ask me about work, JavaScript, cooking...'}</p>
            <p>{'jacob@roush.io'}</p>
          </div>
        </div>
      </>
  )
}
