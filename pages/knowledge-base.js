import Head from 'next/head';
import styles from '../styles/Home.module.css';
import AppKBView from '../components/kb/AppKbView';

export default function Page () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Knowledge Base</title>
      </Head>

      <main className={styles.main}>
        <div ><AppKBView /></div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
