import Head from 'next/head';
import ScheduleEditor from '../components/schedules/ScheduleEditor';
import styles from '../styles/Home.module.css';

export default function Schedules ({ isMobile }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Schedules</title>
      </Head>

      <main className={styles.main}>
        <ScheduleEditor isMobile={isMobile} />
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
