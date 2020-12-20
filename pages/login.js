import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Login</title>
      </Head>

      <main className={styles.main}>
        <div><LoginForm /></div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}