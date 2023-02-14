import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ShuttleViewDesktop from '../components/shuttles/desktop/ShuttleViewDesktop';

export default function ShuttlesManagement ({ isMobile, setSnackMeta }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Shuttles Management</title>
      </Head>

      <main className={styles.main}>
        { isMobile
          ? null
          : <ShuttleViewDesktop setSnackMeta={setSnackMeta} />
        }
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps ({ req }) {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const isMobile = Boolean(userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  ));

  return { props: { isMobile } };
}
