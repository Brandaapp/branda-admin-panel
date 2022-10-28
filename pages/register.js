import Head from 'next/head';
import styles from '../styles/Home.module.css';
import RegisterForm from '../components/registration/desktop/RegisterForm';

export default function Register ({ isMobile }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Registration</title>
      </Head>

      <main className={styles.main} style={{ width: '100%' }}>
        <RegisterForm isMobile={isMobile}/>
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
