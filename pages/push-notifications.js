import Head from 'next/head';
import PushNotificationDashboard from '../components/pushnotifications/desktop/PushNotificationDashboard';
import PushNotificationForm from '../components/pushnotifications/mobile/PushNotificationForm';
import styles from '../styles/Home.module.css';

export default function PushNotifications ({ isMobile, setSnackMeta }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Push Notifications</title>
      </Head>

      <main className={styles.main}>
        <div>
          {
            isMobile
              ? <PushNotificationForm setSnackMeta={setSnackMeta} />
              : <PushNotificationDashboard setSnackMeta={setSnackMeta} />
          }
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
