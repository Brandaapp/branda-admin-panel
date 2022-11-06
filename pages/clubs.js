import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ClubsList from '../components/clubs/ClubsList';

export default function Clubs ({ isMobile }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Branda - Club Management</title>
      </Head>

      <main className={styles.main} style={{ width: '100%' }}>
        <ClubsList isMobile={isMobile}/>
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
