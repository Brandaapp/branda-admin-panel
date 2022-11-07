import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { default as DesktopRegisterForm } from '../components/registration/desktop/RegisterForm';
import { default as MobileRegisterForm } from '../components/registration/mobile/RegisterForm';

export default function Register ({ isMobile, setSnackMeta }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Registration</title>
      </Head>

      <main className={styles.main} style={{ width: '100%' }}>
        {
          isMobile
            ? <MobileRegisterForm setSnackMeta={setSnackMeta}/>
            : <DesktopRegisterForm setSnackMeta={setSnackMeta}/>
        }
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
