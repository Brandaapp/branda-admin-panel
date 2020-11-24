import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ScheduleView from '../components/ScheduleView'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ScheduleView />
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
