import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getSession } from 'next-auth/client'

export default function Reservations() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Reservations</title>
      </Head>

      <main className={styles.main}>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });
  if (session) {
    return {
      props: { session }
    }
  } else {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return { props: {} }
  }
}