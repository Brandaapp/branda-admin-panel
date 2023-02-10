import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SpecialEventView from '../components/specialevents/SpecialEventView';

export default function Page () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Special Events</title>
      </Head>

      <main className={styles.main}>
        <div ><SpecialEventView /></div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
