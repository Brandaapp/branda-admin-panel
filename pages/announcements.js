import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getSession } from 'next-auth/client'
import AnnouncementsView from '../components/AnnouncementsView'

export default function Announcements() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Announcements</title>
      </Head>

      <main className={styles.main}>
        <div className="row"><AnnouncementsView /></div>
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