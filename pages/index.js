import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { default as ScheduleViewMobile } from '../components/schedules/mobile/ScheduleView';
import { default as ScheduleViewDesktop } from '../components/schedules/desktop/ScheduleView';

export default function Home ({ isMobile }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Home</title>
      </Head>

      <main className={styles.main}>
        <div className="row">
          { isMobile ? <ScheduleViewMobile /> : <ScheduleViewDesktop />}
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
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
