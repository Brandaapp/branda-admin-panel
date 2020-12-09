import Head from 'next/head'
import styles from '../styles/Home.module.css'
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